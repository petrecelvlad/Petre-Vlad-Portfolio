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
