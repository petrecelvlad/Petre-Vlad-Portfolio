---
type: Task
title: "T-061: Performance rules in the guardrails"
description: "Fill GUARDRAILS.md's empty Performance category with real constraints, cited in the files they govern"
status: done
priority: high
parent: T-058
tags: [roadmap, task, performance, guardrails]
timestamp: 2026-10-18T00:00:00Z
---

# T-061: Performance rules in the guardrails

## Context

Part of [T-058](T-058-performance-common-sense-system.md). [GUARDRAILS.md](../../architecture/GUARDRAILS.md) lists a Performance category ("CPU budgets, latency targets, memory limits") but holds no performance constraint. [T-059](T-059-perf-pattern-checks.md) and [T-063](T-063-lesson-promotion-back-sweep.md) both build on these rules.

---

## Acceptance Criteria

- [x] Performance constraints added with the next `C-NNN` IDs, each with its motivation, wording approved by the user: C-008 Cheap Motion, C-009 Measured Before Done, C-010 Reduced Motion, plus two the user added, C-011 Pause and Resume Cleanly and C-012 Invisible Savings Only
- [x] Every component that animates continuously cites the IDs in its `@propolis` block: `Hero.tsx`, `ThreeNatureFieldBackground.tsx`, `FloatingIslandBackdrop.tsx`, `StackedAlphaVideo.tsx`, `AchievementSvgPlaceholders.tsx`, `BentoResponsibilities.tsx`, `SkillTreeNode.tsx`

---

## Notes

- Done 2026-10-18 (session 12). Known violations are cited as such rather than hidden: the island's in-SVG animation (C-008 exception, measured near zero) and the parked cards (C-008, C-010, C-011).
- Components with brief motion only (rail, skill pills, ScaleToFit) follow C-008 and C-010 but carry no `@propolis` block yet; the card scoped citations to continuous animation.
