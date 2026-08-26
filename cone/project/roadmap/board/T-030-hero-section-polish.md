---
type: Task
title: "T-030: Hero section polish"
description: "Verify perf on older laptops, redesign the middle column's role+description into one unified visual element"
status: backlog
priority: high
parent: T-028
tags: [roadmap, task, epic, hero]
timestamp: 2026-08-24T00:00:00Z
---

# T-030: Hero section polish

## Context

Part of [T-028](T-028-mvp-launch-readiness.md). Two identified pieces of real work, broken out as
children below since they touch different concerns (perf verification vs. visual redesign).

---

## Acceptance Criteria

- [ ] All child cards below reach `done`
- [ ] EXPLORE button recolored — small standalone tweak, not worth its own card: current
      `bg-[#4ADE80] hover:bg-[#22C55E]` in `Hero.tsx`, new color TBD from the user

---

## Sub-Tasks

- [T-031](T-031-hero-perf-verification.md) — Verify Hero performance on older laptops
- [T-032](T-032-hero-column-2-redesign.md) — Redesign Hero's middle column (unify role + description)

---

## Notes

Related but out of scope here: [T-025](T-025-cursor-gaze-broken-handoff.md) (cursor-gaze
verification, blocked on browser tooling) covers a different Hero concern and isn't a child of
this card.
