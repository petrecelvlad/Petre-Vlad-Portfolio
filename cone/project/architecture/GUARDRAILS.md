---
type: Constraint Registry
title: "Guardrails: Constraint Registry"
description: Single source of truth for all architectural constraints, referenced by ID.
tags: [architecture, constraints, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Single source of truth for all architectural constraints
agent_instructions: >
  Central constraint registry. When a @propolis block references a constraint ID (e.g., C-001),
  this is where the full definition lives. Add new constraints with the next available ID.
  Never remove a constraint — deprecate it.
---

# Guardrails: Constraint Registry

This document is the **single source of truth** for all architectural constraints in the project. Every hard rule that governs how the system is built lives here with a unique ID.

## Why This Exists

Architectural rules scattered across multiple documents are invisible rules. They get contradicted, forgotten, or misapplied. A centralized registry with stable IDs makes constraints:

- **Referenceable** — `@propolis` blocks can cite `C-003` instead of restating the rule
- **Discoverable** — one place to check if a constraint exists before adding a new one
- **Auditable** — grep for a constraint ID to find every file that claims to follow it
- **Versionable** — constraints can be deprecated without breaking references

---

## Constraint Table

| ID | Name | Applies To | Description |
|---|---|---|---|
| `C-001` | Core Isolation | `src/core/domain/` | Core never imports from `adapters/` or `infrastructure/`. The Leak Test: replacing any external dependency should only require a new adapter file + an `App.tsx` wiring change, never a core edit. |
| `C-002` | No Mocked Data | All components | All content comes from `src/infrastructure/data/portfolio.json`. Add/edit data there — never inject mock/placeholder data directly into a component. |
| `C-003` | Token-Only Styling | All visual code | No generic/arbitrary Tailwind values. Every visual value routes through the skin-token contract (`architecture/systems/TOKEN_CONTRACT.md`); swapping a skin means changing token values, nothing else. |
| `C-004` | Navbar Height Is Load-Bearing | Snap-section layout | `--chrome-navbar-height` feeds `calc()` expressions across every snap section. Changing it propagates everywhere — that's intentional, not a bug to "fix" by hardcoding a section's height. |
| `C-005` | Single Orchestrator | Navbar, TimelineTrack | Both must read active-index/scroll state from `useTimelineOrchestrator` — neither may maintain an independent, disconnected active-index state. |
| `C-006` | Envelope Rule | Every snap section | Snap sections use `h-[calc(100vh-var(--chrome-navbar-height))]` explicitly, never `h-full` — `h-full` cascades fail through React fragments. Settled after 4 attempts (see `archive/decisions/LEGACY_DECISIONS_LOG.md`). |
| `C-007` | Never Delete Setup Blindly | `package.json`, build config | Never remove or modify `package.json` or setup configuration unless explicitly requested and verified safe. |
| `C-008` | Cheap Motion | All animation | Anything that moves only moves or fades (`transform`/`opacity`), and the browser runs it: CSS animations and transitions, or Motion with a full `transform` string or `opacity`. Never animate width, height or position, never Motion's `x`/`y`/`scale` shorthands, never move elements from JavaScript every frame. Exceptions: canvas, WebGL and video, which have to draw. *Why:* only these reach the GPU without repainting; the hero's name letters broke this (Moving Parts Audit, T-064). |
| `C-009` | Measured Before Done | Anything that runs nonstop while visible | Not done until measured on the reference PC (Core i5-4440, Intel HD Graphics 4600): with the saved performance test ([T-060](../roadmap/board/T-060-perf-test-harness.md)) once it exists, until then with the method in the "Hero Smoothness Plan" artifact. *Why:* cheap-looking things add up, and only measuring shows it. |
| `C-010` | Reduced Motion | Nonstop or decorative motion | Stops when the visitor's system asks for less motion. CSS animations are covered by the global rule in `index.css`, Motion's `x`/`y`/`scale` by `MotionConfig reducedMotion="user"` (`main.tsx`). A Motion animation written as a `transform` string must check `useReducedMotion()` itself: Motion's switch doesn't cover it. *Why:* accessibility; the audit found most of the site ignored the setting. |
| `C-011` | Pause and Resume Cleanly | Every animation loop (rAF, WebGL, canvas, video) | Stops when off screen and resumes where it left off: time spent paused is dropped, never applied on resume. *Why:* the 3D background used to jump by the whole pause (the camera ~45° after a minute away). |
| `C-012` | Invisible Savings Only | Every performance change | Ships only after a side-by-side check against the original shows no visible quality loss. *Why:* the site is shown to recruiters; a background saving (antialiasing off, lower resolution) was rejected as visibly worse and reverted. |
| `C-013` | Never an Empty Frame | Every project, `BentoVideoFrame`, the clipboard's Gallery tab | Every project has at least one screenshot (`keyScreenshots`). Without a video, the phone frame shows the first one. With a YouTube video, the cover while it loads is the video's full-size YouTube thumbnail (`maxresdefault`); when the video has none, the first screenshot covers instead. YouTube's smaller thumbnail sizes are never used. Every project has a Gallery tab showing all its screenshots, the first one included. Until a project has a screenshot: the tab is hidden, and the frame shows the "No preview" placeholder wherever a screenshot would go. *Why:* the frame went grey while PlayMusic's video loaded (no full-size thumbnail, so YouTube sent its grey placeholder), its smaller thumbnail was a generic company card, and projects without a video lost their only screenshot from the tab. |

---

## How to Add a Constraint

1. Take the next available `C-NNN` ID
2. Add a row to the table above
3. Add the constraint ID to relevant `@propolis` blocks in source files
4. Document the motivation — WHY this constraint exists, not just WHAT it forbids

## How to Deprecate a Constraint

Never delete a constraint. Mark it as deprecated:

| ID | Name | Applies To | Description |
|---|---|---|---|
| `C-005` | ~~Old Rule~~ | ~~Adapters~~ | **DEPRECATED (YYYY-MM-DD):** *Reason for deprecation. Superseded by C-012.* |

This prevents confusion when old `@propolis` blocks reference the ID.

---

## Constraint Categories

Use these categories to organize constraints as the registry grows:

| Category | Governs |
|---|---|
| **Isolation** | Package boundaries, import rules, layer separation |
| **Performance** | CPU budgets, latency targets, memory limits |
| **Security** | Authentication, encryption, data handling |
| **Data** | Database patterns, state management, caching |
| **Type Safety** | Type discipline, validation requirements |
| **Platform** | Platform-specific constraints (cloud provider, runtime, browser) |
