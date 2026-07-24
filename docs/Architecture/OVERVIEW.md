# Experience Engine — Architecture Overview

## What This Is

An interactive portfolio for a Game Designer/Producer rendered as a spatial canvas with timeline-based navigation. Not a website — an Experience Engine. The medium is the message: the UI itself feels like a game UI artifact.

**Stack:** React 19 + TypeScript + Vite, Tailwind CSS V4 (`@tailwindcss/vite`), Motion (`motion/react`), `lucide-react`, `react-helmet-async`. Static JSON data source — no API, no backend.

**Deployment target:** Static build. `vite build` → `dist/`.

---

## Hexagonal Architecture

The codebase follows Ports & Adapters (hexagonal architecture). The dependency rule is strict: core imports nothing from infrastructure or adapters.

```
src/
├── core/domain/           ← Pure domain models (IExperience, IProject)
├── ports/                 ← Interfaces (IExperienceRepository)
├── adapters/
│   ├── primary/components/ ← UI adapters (Hero, Navbar, SkillTree, Timeline, BacklogView)
│   └── secondary/          ← Data adapters (JsonExperienceRepo → portfolio.json)
├── infrastructure/data/    ← Static data (portfolio.json, newgrounds_scraped.json)
├── components/             ← Presentational component tiers (see Component Tiers below)
├── hooks/                  ← Orchestration (useTimelineOrchestrator)
├── context/                ← React contexts (VideoPrefsContext)
└── styles/                 ← Style definitions (applet.ts)
```

**The Leak Test:** If you can replace any external dependency by creating a new adapter file and updating `App.tsx` — without modifying any core file — the architecture is sound.

### Data Flow

```
portfolio.json → JsonExperienceRepo (implements IExperienceRepository)
                      ↓
                  App.tsx (composition root — wires repo to state)
                      ↓
              Primary adapters (Hero, Timeline, SkillTree, etc.)
                      ↓
              Presentational components (bento/, timeline/, atoms/)
```

`App.tsx` is the composition root. It instantiates `JsonExperienceRepo`, fetches experiences, and distributes them to primary adapter components.

---

## The Managed Stage

The application uses a shell architecture that separates fixed chrome from scrollable content.

```
┌─────────────────────────────────────────────┐
│              NAVBAR (fixed, 64px)            │
├─────────────────────────────────────────────┤
│         SCROLL ENVELOPE                     │
│    height: calc(100vh - navbar height)      │
│    snap-type: y mandatory                   │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  HERO (snap section, full height)   │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  SKILL TREE (snap section)          │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  PROJECT CARD 1 (snap section)      │    │
│  │  ┌──────┐ ┌──────────────────┐      │    │
│  │  │ TL   │ │  BENTO GRID      │      │    │
│  │  │ Track│ │  (ProjectDetails) │      │    │
│  │  └──────┘ └──────────────────┘      │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  PROJECT CARD N ...                 │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  FOOTER (snap section)              │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**The Envelope Rule:** Every snap section uses `h-[calc(100vh-var(--chrome-navbar-height))]` explicitly. Not `h-full` — it cascades fail through React fragments (see Logs.md, Attempt 3). This is the settled solution after 4 attempts.

---

## Component Tiers

Atomic design with strict unidirectional data flow:

| Tier | Location | Responsibility | Example |
|---|---|---|---|
| **Atoms** | `components/atoms/`, `components/applet/Primitives.tsx` | Layout-agnostic building blocks. No domain knowledge. | `WindowCard`, `Button`, `Badge`, `Avatar` |
| **Molecules** | `components/bento/` | Combine atoms for a specific UI slice. Take isolated props. | `BentoHeader`, `BentoSkills`, `BentoVideoFrame` |
| **Organisms** | `components/timeline/` | Coordinate multiple molecules, manage meaningful state. | `ProjectDetails`, `TimelineTrack`, `TimelineMarker` |
| **Stage** | `components/layout/Scene.tsx` | Scene wrapper for snap sections. | `Scene` |
| **Primary Adapters** | `adapters/primary/components/` | Top-level sections wired to domain data. | `Hero`, `Navbar`, `Timeline`, `SkillTree` |

**Rule:** If an atom imports from `core/domain/`, it isn't an atom — promote it.

---

## Orchestration

`useTimelineOrchestrator` is the single source of truth for timeline state:
- Active index (which project is in view)
- Scroll direction tracking
- Progress percentage per section
- Auto-scroll triggers

The Navbar and TimelineTrack both consume orchestrator state — they never maintain independent active-index states.

---

## Design System

The design system is token-driven and skin-swappable. Full details in the design system docs:

- [Token Contract](./design-system/Token_Contract.md) — the parametric contract, value tier (all CSS custom properties)
- [Skin System](./design-system/Skin_System.md) — the structural/variant tier, the Tier 3 component-slot registry for full structural swaps, runtime swap mechanism, and locked constraints (skill tree chrome, optional hero slot)
- [Skin: Bauhaus](./design-system/Skin_Bauhaus.md) — current resolved values
- [Design System Rules](./design-system/Design_System.md) — aesthetic pillars and interaction guidelines

**The three pillars:** thick borders + hard shadows, high-contrast vivid palette, deliberate typography hierarchy (Space Grotesk / Outfit / JetBrains Mono).

**The skin boundary:** Components reference tokens, never literal values. Swapping the skin means changing token values — nothing else.

---

## Key Constraints

1. **No mocked data.** All content comes from `portfolio.json`. Period.
2. **No generic Tailwind.** Strict Bauhaus/Applet styles from `src/styles/applet.ts` and the token system.
3. **The navbar height is load-bearing.** `--chrome-navbar-height` (64px) feeds into `calc()` expressions across every snap section. Changing it propagates everywhere — that's intentional.
4. **Navbar and TimelineTrack must not maintain disconnected active-index states.** Both read from the orchestrator.
5. **Log architectural changes** to `docs/Logs.md`.

---

## Documentation Map

```
docs/
├── Architecture/
│   ├── OVERVIEW.md                     ← You are here
│   ├── design-system/                  ← Visual system
│   │   ├── Token_Contract.md           ← CSS custom property schema (value tier)
│   │   ├── Skin_System.md              ← Structural/variant tier, runtime swap mechanism, locked constraints
│   │   ├── Skin_Bauhaus.md             ← Current skin values
│   │   └── Design_System.md            ← Aesthetic rules and pillars
│   ├── specs/                          ← Technical specifications
│   │   ├── Component_Architecture.md   ← Tier rules and data flow
│   │   ├── System_Design.md            ← Managed Stage architecture
│   │   ├── Timeline_Animation_Spec.md  ← Symmetric fill logic
│   │   ├── Project_Viewer_Evolution.md ← Persistent shell + swapped content (replaces per-project cards)
│   │   ├── Project_Template.md         ← Bento grid and IProject layout
│   │   ├── Technical_Implementation.md ← SRP and modularity strategy
│   │   └── Experience_Guidelines.md    ← Motion, typography, interaction
│   └── Workflow_and_Logs.md            ← Agent/developer workflow protocols
├── Logs.md                             ← Architectural decision diary
└── ...                                 ← Content docs (Design/, Data/, etc.)
```
