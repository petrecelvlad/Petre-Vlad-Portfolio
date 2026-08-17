---
type: Architecture
title: System Architecture Overview
description: Experience Engine — an interactive, spatial-canvas portfolio for a Game Designer/Producer. Purpose, hexagonal structure, data flow, constraints.
tags: [architecture, project]
timestamp: 2026-08-16T00:00:00Z
constraints:
  - Must be kept current with the actual system design
agent_instructions: >
  This is the system architecture overview. An agent reading this should understand the
  system's intent without reading source code.
---

# System Architecture Overview

## System Purpose

An interactive portfolio for a Game Designer/Producer, rendered as a spatial canvas with
timeline-based navigation rather than traditional web "page" flows — an **Experience Engine**.
The medium is the message: the UI itself feels like a game UI artifact.

**Stack:** React 19 + TypeScript + Vite, Tailwind CSS V4 (`@tailwindcss/vite`), Motion
(`motion/react`), `lucide-react`, `react-helmet-async`. Static JSON data source — no API, no
backend.

**Deployment target:** Static build. `vite build` → `dist/`.

---

**Domain vocabulary:** terms like "Managed Stage," "Global Chrome," "Skin," or "the Envelope Rule" are defined in [PROJECT_GLOSSARY.md](./PROJECT_GLOSSARY.md).

---

## Key Architectural Decisions

| Decision | Rationale |
|---|---|
| Hexagonal architecture (Ports & Adapters) | Core domain must stay swappable/testable independent of UI or data source; see Module Structure below. |
| Static JSON data source, no backend | Content is a fixed portfolio, not a live dataset — no need for API/DB complexity. |
| Token-driven, skin-swappable design system | The same component tree renders as either the "Gamified" or "Heritage" skin purely by swapping token values — see Design System below. |
| `useTimelineOrchestrator` as single source of truth | Navbar and TimelineTrack must not maintain disconnected active-index states; both read from one orchestrator. |

For detailed rationale on any of these, see `cone/project/archive/decisions/LEGACY_DECISIONS_LOG.md` (migrated decision diary) or create a new ADR in `cone/project/archive/decisions/`.

---

## Package / Module Structure

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

### Component Tiers

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

## Data Flow

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

### The Managed Stage

The application uses a shell architecture that separates fixed chrome from scrollable content:

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

**The Envelope Rule:** Every snap section uses `h-[calc(100vh-var(--chrome-navbar-height))]` explicitly, never `h-full` — it cascades fail through React fragments. Settled after 4 attempts (see `cone/project/archive/decisions/LEGACY_DECISIONS_LOG.md`).

---

## External Dependencies

| Dependency | Purpose | Criticality |
|---|---|---|
| `portfolio.json` (static) | Sole content source — all Hero/SkillTree/Project data | Critical |
| `newgrounds_scraped.json` (static) | Game metadata generated by `cone/project/reference/scripts/scraper.py` | Non-critical |
| Motion (`motion/react`) | All animation/transition logic | Critical |
| Tailwind CSS V4 | Utility classes + token plumbing | Critical |

No live/runtime external services — everything is static, build-time data.

---

## Design System

The design system is token-driven and skin-swappable. Full details now live under `cone/project/architecture/systems/`:

- [Token Contract](./systems/TOKEN_CONTRACT.md) — the parametric contract, value tier (all CSS custom properties)
- [Skin System](./systems/SKIN_SYSTEM.md) — the structural/variant tier, the Tier 3 component-slot registry for full structural swaps, runtime swap mechanism, and locked constraints (skill tree chrome, optional hero slot)
- [Skin: Gamified](./systems/SKIN_GAMIFIED.md) — the runtime-default skin's heuristics (tactile RPG/retro-arcade)
- [Skin: Heritage](./systems/SKIN_HERITAGE.md) — the second live skin's heuristics (desk/clipboard)
- [DeskBoard Panel](./systems/DESKBOARD_PANEL.md) — heritage's wood-plank panel chrome: construction, dimensions, colors

**The three pillars:** embossed depth + tactile material chrome, high-contrast vivid palette, deliberate typography hierarchy (Space Grotesk / Outfit / JetBrains Mono). (The Bauhaus/Applet skin — thick flat borders, hard offset shadows — was the site's original identity before it was retired in favor of Gamified.)

**The skin boundary:** Components reference tokens, never literal values. Swapping the skin means changing token values — nothing else.

---

## Orchestration

`useTimelineOrchestrator` is the single source of truth for timeline state:
- Active index (which project is in view)
- Scroll direction tracking
- Progress percentage per section
- Auto-scroll triggers

The Navbar and TimelineTrack both consume orchestrator state — they never maintain independent active-index states.

---

## Constraints & Non-Negotiables

- **No mocked data.** All content comes from `portfolio.json`. Period.
- **No generic Tailwind.** Strict token-driven styles — see `systems/SKIN_GAMIFIED.md`/`systems/SKIN_HERITAGE.md` for the current skins' aesthetic rules, `systems/TOKEN_CONTRACT.md` for the token system itself.
- **The navbar height is load-bearing.** `--chrome-navbar-height` (64px) feeds into `calc()` expressions across every snap section. Changing it propagates everywhere — that's intentional.
- **Navbar and TimelineTrack must not maintain disconnected active-index states.** Both read from the orchestrator.
- **`core/` never imports from `adapters/` or `infrastructure/`** (the Leak Test above).

These same constraints should eventually be registered with stable `C-NNN` IDs in `cone/project/architecture/GUARDRAILS.md` (not yet populated — see roadmap).
