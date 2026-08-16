---
type: Protocol
title: Board Protocol
description: Governs the Kanban board — card format, states, IDs, and when a card gets created.
tags: [roadmap, board, project]
timestamp: 2026-07-12T00:00:00Z
constraints:
  - Cards are files in board/, not entries in a shared list — never re-flatten this back into one file
agent_instructions: >
  Read before creating, updating, or querying a board card. Governs cone/project/roadmap/board/.
  A card gets created per AGENT.md Phase 2's Deliverable clause — when a plan exceeds 5 steps
  or spans more than the current conversation. Adopt the Planner persona for the granularity
  and WIP judgment calls; this document defines the mechanics.
---

# Board Protocol

The active work tracker for this project, structured as individual Kanban cards rather than a shared flat list. Replaces the old `BACKLOG.md` — "backlog" is now one state among several, not the whole system's name.

---

## Why Cards, Not a List

A shared file trying to hold every task's real substance — links, acceptance criteria, sub-task breakdowns, status history — becomes the monolith this protocol exists to avoid. Each task gets its own file instead, the same way this framework already treats anything that recurs and accumulates detail: `Proposal_N.md`, `ADR-NNN`, `C-NNN`. A card is addressable, linkable, and can carry real content without crowding out every other card.

---

## States

Real Kanban states — objectively determinable, not the relative, fuzzy Now/Next/Later this replaces:

| State | Meaning |
|---|---|
| `backlog` | Identified, not yet ready to start (missing a decision, a prerequisite, or just not prioritized) |
| `ready` | Ready to start — nothing blocking, prioritized |
| `in-progress` | Actively being worked |
| `blocked` | Was ready or in-progress, now stuck on something external (see `blocked_by`) |
| `done` | Complete |

---

## Card Format

Location: `cone/project/roadmap/board/T-NNN-short-slug.md`, copied from [TEMPLATE.md](board/TEMPLATE.md).

**ID scheme:** `T-NNN`, sequential, never reused — same pattern as this framework's `ADR-NNN` and `C-NNN`. Check `board/index.md` for the current highest number.

```yaml
---
type: Task
title: "T-NNN: Short title"
description: One-line summary
status: backlog | ready | in-progress | blocked | done
priority: high | medium | low
parent: T-NNN          # omit if this is a top-level card
blocked_by: T-NNN       # omit if unblocked
tags: [roadmap, task]
timestamp: YYYY-MM-DDT00:00:00Z
---
```

**`parent`** gives task breakdown a real mechanism: an epic is a card with children pointing back to it via `parent`, created as soon as each child is actually identified and scoped — not held back until it's prioritized or started. `backlog` status exists precisely for identified-but-unordered work; withholding a card for something already real is a different mistake than inventing one for something that isn't. **`blocked_by`** should also appear as a real markdown link in the card's body (not just the frontmatter ID) so the OKF visualizer picks it up as a graph edge, the same way any other cross-link does.

---

## When a Card Gets Created

Per `AGENT.md` Phase 2's Deliverable clause: when a plan exceeds 5 steps or clearly spans more than the current conversation. Not every task — a task small enough to finish in one sitting doesn't need a durable card; that's what the Scale Rule already exempts from heavy process.

Before creating a new card, check `board/index.md` for a related open one and extend it rather than starting duplicate, disconnected work. Before creating a card for something that sounds familiar, also check [out-of-scope/](out-of-scope/) — if it was already proposed and rejected, log it there instead.

---

## Viewing the Board

There is no separate maintained "board view" file to keep in sync — that file would go stale the same way the old flat `BACKLOG.md` did. The board is rendered on demand by scanning `board/*.md` frontmatter and grouping by `status`, the same way OKF's own spec allows an `index.md` to be synthesized rather than hand-maintained. Ask for it, or invoke the `board` skill directly.

---

## Closing a Card

Set `status: done` once Phase 4 (Adversarial Review) has actually passed for the work the card represents — not when it looks done. Leave completed cards in place; periodic archival (moving old `done` cards out of the active directory) is a `board`-skill operation, not something to do ad hoc.
