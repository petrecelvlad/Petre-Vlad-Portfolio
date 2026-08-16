---
type: Template
title: ADR Template
description: Architecture Decision Record template — copy and rename for each new decision.
tags: [archive, decisions, template, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Template — copy this file for each new ADR
agent_instructions: >
  Architecture Decision Record template. Copy this file, rename it, and fill in the sections.
  ADRs are immutable once accepted — if a decision is superseded, create a new ADR that
  references the old one. Before creating one, apply the gate below — not every decision
  warrants an ADR.
---

# ADR-NNN: [Decision Title]

**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-NNN

**Date:** YYYY-MM-DD

---

## Should This Be an ADR?

Write one only if all three are true:

- **Hard to reverse** — undoing this later would be costly, not a quick edit.
- **Surprising without context** — a future reader would ask "why did we do it this way?" without an explanation.
- **The result of a real trade-off** — a genuine alternative existed and was consciously rejected, not the only reasonable option.

If any of the three is missing, don't write an ADR — record the decision in the session file's Decisions section instead. That's enough for anything reversible, unsurprising, or without a real alternative.

When it does clear the gate, default to a **short form**: 1-3 sentences per section below is normal. Expand into fuller prose only when the trade-off genuinely needs the space to explain.

---

## Context

*What is the issue that we're seeing that motivates this decision? What forces are at play?*

---

## Decision

*What is the change that we're proposing and/or doing?*

---

## Consequences

### Positive
*What becomes easier or better as a result?*

### Negative
*What becomes harder or worse as a result? What are we giving up?*

### Neutral
*What other effects does this have that are neither clearly positive nor negative?*
