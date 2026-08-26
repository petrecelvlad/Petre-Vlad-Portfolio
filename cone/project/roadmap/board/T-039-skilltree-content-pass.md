---
type: Task
title: "T-039: SkillTree content pass (post user research)"
description: "Re-pass the skill tree's content once the user has researched which skills a game producer should actually showcase"
status: backlog
priority: medium
parent: T-033
tags: [roadmap, task, skilltree, content]
timestamp: 2026-08-24T00:00:00Z
---

# T-039: SkillTree content pass (post user research)

## Context

Part of [T-033](T-033-skilltree-section-redesign.md). Companion to
[T-046](T-046-rewrite-project-copy.md)'s project-copy rewrite — same underlying goal (lean the
site's content toward the Game Producer role) applied to skill-tree data instead of project copy.

---

## Acceptance Criteria

- [ ] User has completed their own research into game-producer-relevant skills
- [ ] Skill tree data (`src/core/domain/skillTreeTypes.ts` / wherever the `SKILLS` graph lives)
      reviewed and revised against that research
- [ ] `tsc --noEmit` / `npm run build` clean

---

## Sub-Tasks

(none — single content pass, once unblocked)

---

## Notes

Not actionable yet — waiting on the user's own research, not an engineering dependency.
