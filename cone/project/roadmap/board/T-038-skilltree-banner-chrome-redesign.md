---
type: Task
title: "T-038: Redesign SkillTree banner + board chrome"
description: "Banner should just say 'Skilltree'; the board/container UI element should move away from the current gradient look toward the site's established visual style"
status: done
priority: high
parent: T-033
tags: [roadmap, task, skilltree, visual-design]
timestamp: 2026-08-24T00:00:00Z
---

# T-038: Redesign SkillTree banner + board chrome

## Context

Part of [T-033](T-033-skilltree-section-redesign.md). Flagged by the user as "a pretty major
thing" — possibly a full redesign of the SkillTree's container chrome
(`SkillTreeBanner.tsx`, `GamifiedBoard`/`DeskBoard`), not just a copy change.

---

## Acceptance Criteria

- [x] Banner text simplified to just "Skilltree"
- [x] Banner is the Hero's `RibbonBanner`, about twice today's size, with a 3px bevel (new
      opt-in prop — the Hero's own ribbon keeps its current bands until the redesign reaches it)
- [x] Board frame: flat wood, ink outline, 3px bevel, 8px hard bottom edge (no blurred shadow)
- [x] Steel corner brackets replaced by flat, ink-outlined corner caps (user, 2026-10-13)

---

## Sub-Tasks

(none yet — may need its own design pass before implementation; possible split into more cards
later if it turns out to be larger than one card once scoped)

---

## Notes

No concrete visual direction chosen yet — user described the current state as needing to go
"less gradient and more similar to our style" but hasn't specified a target design.
