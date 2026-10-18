---
type: Task
title: "T-056: Screen tiers proposal"
description: "Proposal for the four tiers, their values, the mobile scrolling model, and every section drawn at every tier"
status: done
priority: high
parent: T-055
tags: [roadmap, task, responsive, proposal]
timestamp: 2026-10-14T00:00:00Z
---

# T-056: Screen tiers proposal

## Context

First step of [T-055](T-055-screen-tiers.md). Proposal artifact:
https://claude.ai/artifact/J7N3sEbnCVjLWyaARDYjgH

---

## Acceptance Criteria

- [x] Artifact shows the four tiers (desktop ≥1600, laptop 1280–1599, tablet 768–1279 upright and sideways, mobile <768 or under 600 tall), their values, and hero / skill tree / projects / footer at each tier
- [x] v2 (user feedback): tablet added as a tier; small laptops shown as two drawn versions (A: tree shrinks, B: details column narrows); projects redrawn from the real components (clipboard alone on the left, no invented header or thumbnail strip)
- [x] Mobile scrolling (user): normal scrolling on mobile; snap stays on desktop, laptop and tablet
- [x] Small laptops (user): version B, the tree stays at 100% and from 1280 to 1365 wide the details column narrows to what the tree leaves, between 330 and 400px
- [x] Rail on phones (user): shown, turned horizontal and pinned under the navbar while in the projects, over the existing background with no panel of its own; it slides down from behind the navbar instead of in from the left (v4 of the artifact)
- [x] Approved tier values recorded in the project docs: `TOKEN_CONTRACT.md` §15

---

## Notes
