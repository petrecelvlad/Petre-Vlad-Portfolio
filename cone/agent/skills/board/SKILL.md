---
type: Skill
title: Board
description: >
  Creates, updates, and renders cards on the Kanban board at cone/project/roadmap/board/.
  Triggers whenever AGENT.md Phase 2's Deliverable clause fires (a plan exceeds 5 steps or
  spans more than the current conversation), and on explicit request: "show me the
  board", "what's in progress", "create a card for this", "break this into tasks",
  "what's blocked".
tags: [skill, roadmap, board]
timestamp: 2026-07-12T00:00:00Z
agent_instructions: >
  Procedural workflow behind the Board Protocol (cone/project/roadmap/BOARD.md). Adopt
  the Planner persona first — it makes the granularity and WIP judgment calls; this
  skill defines the mechanics once those calls are made.
---

# Board

The mechanical procedure behind [BOARD.md](../../../project/roadmap/BOARD.md)'s protocol — creating cards, updating status, rendering a view, and archiving completed work.

---

## Creating a Card

1. Check `board/index.md` for a related open card first. Extend it rather than creating a duplicate.
2. Check [out-of-scope/](../../../project/roadmap/out-of-scope/) if the request sounds like something already considered and rejected.
3. Take the next `T-NNN` number — check `board/index.md` for the current highest.
4. Copy [TEMPLATE.md](../../../project/roadmap/board/TEMPLATE.md), fill in title, description, status (usually `backlog` or `ready`), priority.
5. Write acceptance criteria that are checkable, not aspirational — this is the test for whether the card is actually scoped as one unit of work (see the Planner persona's "a card is a claim about scope" heuristic).
6. Add an entry to `board/index.md` with the card's current status.

---

## Breaking Down an Epic

Create a child card as soon as its piece of work is actually identified and scoped — not gated on whether it's been prioritized or started yet. If an epic's source material (a survey, a spec, a decomposed plan) already names N real, distinct pieces of work, create all N children at `backlog` immediately; `backlog` exists precisely for identified-but-unordered work. Each child:
- Sets `parent: T-NNN` pointing at the epic.
- Gets linked from the epic's own Sub-Tasks section (a real markdown link, so it shows up as a graph edge in the OKF visualizer).

Only hold a child back when it genuinely isn't identified yet — a piece of work nobody has scoped, invented speculatively because breaking things down felt like progress. That's Invented Fragmentation. Holding back a card that's already fully identified because it hasn't been ordered yet is the opposite mistake, Withheld Fragmentation — see the Planner persona and `T-001`'s own Notes for the corrected example.

---

## Updating Status

Change the `status` field the moment the underlying reality changes — not in a batch cleanup later. Add a line to the card's Notes section stating why status changed, especially for `blocked` (name what's blocking, and add a real markdown link to the blocking card if it's another `T-NNN`) and `done` (confirm Phase 4 actually passed for this card's scope).

Update `board/index.md`'s status annotation for that card in the same action.

---

## Rendering a Board View

There's no maintained aggregate file — render on demand:

1. Read every `board/*.md` file's frontmatter (skip `TEMPLATE.md` and `index.md`).
2. Group by `status`: Backlog, Ready, In Progress, Blocked, Done.
3. Within each group, list `T-NNN — title (priority)`, indenting children under their `parent`.
4. Flag anything in `blocked` without a `blocked_by` value — that's a status that isn't actually explaining itself.
5. Flag anything in `in-progress` for longer than feels right relative to the conversation history — a candidate for Silent Staleness, worth confirming with the user rather than assuming.

Present this directly in the response. Don't write it to a file — that recreates the exact staleness problem this design avoids.

---

## Archiving Completed Cards

Once `board/` accumulates enough `done` cards that they crowd out active work when scanning the directory, move them to `board/archive/` (create it the first time it's needed — this itself is a `restructure`-skill-shaped decision: a `done` card is a different kind from an active one once there are enough of them to matter). Don't delete `done` cards — same "never delete blindly" standing rule that governs everything else in this framework.

---

## What Not To Do

**Don't create a card for work that fits in this response.** That's what `AGENT.md`'s Scale Rule already exempts.

**Don't invent child cards for work that isn't identified yet.** Not the same as withholding cards for work that *is* identified but not yet ordered — that belongs at `backlog` now, not held back.

**Don't maintain a separate board-view file.** It will drift from the cards' actual frontmatter the same way the old flat `BACKLOG.md` went unused. Render on demand instead.

**Don't batch status updates.** A status that's true only after a cleanup pass was false in between — update at the moment reality changes.
