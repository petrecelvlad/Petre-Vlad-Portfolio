---
type: Task
title: "T-034: Simplify SkillDetailsPanel content"
description: "Right-side detail panel has too much distracting/irrelevant detail — keep title + description, remove the rest, but only after confirming exactly what to cut with the user"
status: done
priority: medium
parent: T-033
tags: [roadmap, task, skilltree, visual-design]
timestamp: 2026-08-24T00:00:00Z
---

# T-034: Simplify SkillDetailsPanel content

## Context

Part of [T-033](T-033-skilltree-section-redesign.md). `SkillDetailsPanel.tsx` currently renders,
per skill: name, category badge, proficiency dots/stars, years of experience, a description, and
(gamified skin) mastery/experience/impact progress bars. The user wants this cut down to mainly
title + description, but explicitly wants to be asked which specific fields survive before
anything is removed.

---

## Acceptance Criteria

- [x] **Before any implementation**: ask the user explicitly which of the current fields
      (category badge, proficiency dots, years, mastery/experience/impact bars) to keep vs. cut —
      do not decide this unilaterally
- [x] Panel simplified per that decision (only the gamified branch still exists)
- [x] `tsc --noEmit` clean (only the 4 pre-existing `MotionStyle` errors)

---

## Sub-Tasks

(none — single-scope task, gated on a user decision)

---

## Notes

Explicit user instruction: "you must ask me first what we keep and we remove." Do not skip this
step when this card is picked up.

2026-10-13 (Session 09): user decision — keep only the skill name + description. Removed: parchment
header line (branch badge, "SKILL INSPECTOR", rank), stars + MASTERED,
years text, mastery/experience/impact bars, the
unreachable empty state, and the now-unused `Skill.proficiency`. Decoration stays (user correction: the wax seal was wrongly removed
at first, then restored). The three bars are replaced later by
one career-relative experience bar: [T-051](T-051-skilltree-experience-bar.md).
