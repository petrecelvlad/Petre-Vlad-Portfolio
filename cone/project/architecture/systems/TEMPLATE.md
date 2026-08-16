---
type: Template
title: "System Documentation Template"
description: Template for per-subsystem documentation — copy and rename for each new system.
tags: [architecture, template, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Template — copy and rename for each new system doc
agent_instructions: >
  System documentation template. Copy this file, rename to the system name (e.g., AUTH.md,
  PAYMENTS.md), and fill in each section. A system doc should let an agent understand a
  subsystem without reading its source code.
---

# System: [System Name]

<!-- Copy this template for each major subsystem. Name the file after the system: AUTH.md, PAYMENTS.md, DATA_PIPELINE.md, etc. -->

---

## Purpose

<!-- One paragraph: what does this system do and why does it exist? What problem does it solve? -->

---

## Boundaries

<!-- Where does this system start and end? What packages/modules/files comprise it? -->

**Owns:**
- `src/path/to/module/`
- `src/path/to/related/`

**Does NOT own (but interfaces with):**
- `src/other/module/` — [nature of the interface]

---

## Key Components

<!-- List the major files/classes and their roles. Not every file — just the ones an agent needs to know about. -->

| Component | File | Role |
|---|---|---|
| *e.g., AuthService* | `src/auth/authService.ts` | *Orchestrates login, token refresh, and session management* |
| *e.g., TokenAdapter* | `src/adapters/tokenAdapter.ts` | *JWT signing and verification via platform crypto API* |

---

## Data Flow

<!-- How does data move through this system? A text trace or simple diagram. -->

```
[Input] → [Step 1] → [Step 2] → [Output]
```

---

## Constraints

<!-- Which guardrails from GUARDRAILS.md apply to this system? Reference by ID. -->

- `C-001` — [how it applies here]
- `C-003` — [how it applies here]

---

## Common Operations

<!-- The 3-5 things an agent is most likely to do in this system. Not a full SOP — just enough to orient. -->

**Adding a new [entity/feature]:**
1. [Step]
2. [Step]

**Modifying [common change]:**
1. [Step]
2. [Step]

---

## Known Gotchas

<!-- Things that trip up agents or developers working in this system. Non-obvious behaviors, edge cases, or historical quirks. If these are project-wide, they belong in cone/project/memory/ instead. -->

- [Gotcha — what happens and why]
