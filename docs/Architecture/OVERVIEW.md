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
└── (no styles/ directory — all visual values are tokens in index.css, see Design System below)
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
| **Atoms** | `components/atoms/` | Layout-agnostic building blocks. No domain knowledge. | `Button`, `Badge`, `Avatar`, `InstantPhoto` |
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
- [Skin: Gamified](./design-system/Skin_Gamified.md) — the runtime-default skin's heuristics (tactile RPG/retro-arcade)
- [Skin: Heritage](./design-system/Skin_Heritage.md) — the second live skin's heuristics (desk/clipboard)
- [DeskBoard Panel](./design-system/DeskBoard_Panel.md) — heritage's wood-plank panel chrome: construction, dimensions, colors, and one still-open decision (plank overextension)

**The three pillars:** embossed depth + tactile material chrome, high-contrast vivid palette, deliberate typography hierarchy (Space Grotesk / Outfit / JetBrains Mono). (The Bauhaus/Applet skin — thick flat borders, hard offset shadows — was the site's original identity before it was retired in favor of Gamified; see `Skin_System.md`'s Sequencing Plan, step 8.)

**The skin boundary:** Components reference tokens, never literal values. Swapping the skin means changing token values — nothing else.

---

## Key Constraints

1. **No mocked data.** All content comes from `portfolio.json`. Period.
2. **No generic Tailwind.** Strict token-driven styles — see `Skin_Gamified.md`/`Skin_Heritage.md` for the current skins' aesthetic rules, `Token_Contract.md` for the token system itself.
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
│   │   ├── Skin_Gamified.md            ← Runtime-default skin's heuristics
│   │   ├── Skin_Heritage.md            ← Second live skin's heuristics
│   │   └── DeskBoard_Panel.md          ← Heritage wood-plank panel chrome spec
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
