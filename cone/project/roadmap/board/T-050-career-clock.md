---
type: Task
title: "T-050: Career clock"
description: "One pure source for career length anchored at 2007-01-01 — drives the Hero's years card and bio, and the skill tree's experience bar"
status: backlog
priority: medium
parent: T-028
tags: [roadmap, task, hero, skilltree, domain]
timestamp: 2026-10-13T00:00:00Z
---

# T-050: Career clock

## Context

From Session 09 (2026-10-13). The career start is fixed at 2007-01-01; the career length must grow
on its own (whole years tick over every Jan 1). Today `Hero.tsx` computes the years inline and the
bio hardcodes "19+ years". [T-051](T-051-skilltree-experience-bar.md) needs the same clock in months.

---

## Acceptance Criteria

- [ ] `core/domain/career.ts`: career start constant, `getCareerYears(now)`, `getCareerMonths(now)` — pure, `now` injected
- [ ] Hero's YEARS OF EXPERIENCE card uses `getCareerYears`
- [ ] Hero bio's hardcoded "19+ years" uses `getCareerYears`
- [ ] `tsc --noEmit` clean

---

## Sub-Tasks

(none)

---

## Notes

(none yet)
