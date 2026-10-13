---
type: Task
title: "T-054: Scale the skill tree to fit its board"
description: "At 1440x900 and below the tree (976px) is wider than the board's content box (~630px); centered, its left edge is clipped and the category badges are invisible"
status: done
priority: high
parent: T-033
tags: [roadmap, task, skilltree, layout, bug]
timestamp: 2026-10-13T00:00:00Z
---

# T-054: Scale the skill tree to fit its board

## Context

Part of [T-033](T-033-skilltree-section-redesign.md). Found 2026-10-13: at 1440×900 the
DESIGN/PRODUCTION/LEADERSHIP badges render at x = −93px. At 1920×1080 they show.

---

## Acceptance Criteria

- [x] The tree scales uniformly down to the board's content box when it is wider, never up
- [x] Category badges visible at 1366×768, 1440×900, 1920×1080
- [x] Click targets and connector animations still line up with the scaled pills

---

## Notes

User decision (2026-10-13): scale to fit, chosen over a camera-follow pan and over narrowing
the right column — accepting smaller text at narrow widths.
