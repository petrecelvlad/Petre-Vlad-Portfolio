---
type: Task
title: "T-035: Move SkillTree project photos into their own section"
description: "The photo strip currently rendered stuck under the detail board should become its own dedicated section below the board, not attached to it"
status: done
priority: medium
parent: T-033
tags: [roadmap, task, skilltree, visual-design]
timestamp: 2026-08-24T00:00:00Z
---

# T-035: Move SkillTree project photos into their own section

## Context

Part of [T-033](T-033-skilltree-section-redesign.md). `SkillDetailsPanel.tsx`'s `photosContent`
currently renders directly beneath the `DeskBoard`/`GamifiedParchmentPanel`, visually reading as
attached to it. User wants it broken out into its own independent section instead.

---

## Acceptance Criteria

- [x] Photos render in their own distinct section below the detail board, not visually stuck to it
- [x] ~~Works for both skins~~ — the skill tree only has the gamified branch now

---

## Sub-Tasks

(none — single-scope layout task)

---

## Notes

2026-10-13 (Session 09): `skilltree/SkillProjectPhotos.tsx` is a sibling row of the panel in
`SkillTree.tsx`'s right column (`flex-1`), so a future mobile layout can reflow it independently.
Photos centered, fit to the region's height, never larger than before (user choice).
