---
type: Task
title: "T-050: Career clock"
description: "One pure source for career length anchored at 2007-01-01 — drives the Hero's years card and bio, and the skill tree's experience bar"
status: done
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

- [x] `core/domain/career.ts`: career start constant, `getCareerYears(now)`, `getCareerMonths(now)` — pure, `now` injected
- [x] Hero's YEARS OF EXPERIENCE card uses `getCareerYears`
- [x] Hero bio's hardcoded "19+ years" uses `getCareerYears`
- [x] `tsc --noEmit` clean

---

## Sub-Tasks

(none)

---

## Notes

- 2026-10-15: `getCareerMonths` counts whole calendar months with both ends included, the same rule as a project's duration (`formatDuration`), so T-051's bar compares like with like: 238 in October 2026. Checked: 19 years on 2026-10-15 and 2026-12-31, 20 on 2027-01-01; the live Hero shows 19 on the card and "19+ years" in the bio.
