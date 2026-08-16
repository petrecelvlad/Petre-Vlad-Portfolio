---
type: Template
title: Proposal Template
description: Template for project feature/design proposals — not framework evolution proposals.
tags: [spec, template, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Template — copy for each new project proposal
agent_instructions: >
  Feature/design proposal template. These are proposals for the PROJECT (new features, design
  changes, integrations) — not for the framework itself. Framework improvement proposals go
  in cone/evolution/ via the evolution skill.
---

# Proposal: [Title]

**Date:** YYYY-MM-DD
**Author:** [name]
**Status:** DRAFT | PROPOSED | ACCEPTED | REJECTED | IMPLEMENTED

---

## Problem

<!-- What problem does this proposal solve? Why does it need solving now? -->

---

## Proposed Solution

<!-- What do you want to build or change? Be specific enough to implement. Same staleness
     caution as the Impact section below applies here. -->

---

## Alternatives Considered

<!-- What other approaches were evaluated? Why were they rejected? -->

| Alternative | Why not |
|---|---|
| *Option A* | *Reason* |

---

## Impact

<!-- What does this change affect? Which systems, files, or behaviors? A proposal can sit
     for weeks before implementation — prefer naming behavioral contracts and interfaces
     over hard file paths or line numbers here, since those go stale by the time someone
     implements this. (This caution is specific to proposals; SESSIONS.md handoffs
     deliberately do the opposite — they're read within a session or two, so precise file
     paths and line numbers there are a feature, not a staleness risk.) -->

**Systems affected:**
- [system name] — [how]

**Constraints:**
- [Any guardrails that apply or need to be added]

**Risks:**
- [What could go wrong]

---

## Implementation Plan

<!-- High-level steps. Detailed implementation belongs in session files. -->

1. [Step]
2. [Step]
3. [Step]
