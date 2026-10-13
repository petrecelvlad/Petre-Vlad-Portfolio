---
type: Task
title: "T-051: Skill experience bar from project dates"
description: "One bar per skill = months covered by the skill's projects / career months; replaces the hand-typed Skill.years"
status: backlog
priority: medium
parent: T-033
blocked_by: T-050
tags: [roadmap, task, skilltree, content, domain]
timestamp: 2026-10-13T00:00:00Z
---

# T-051: Skill experience bar from project dates

## Context

From Session 09 (2026-10-13). `Skill.years` is hand-typed and wrong (FTUE says 7y; its projects —
Tap TD + AlphaBetty — cover 2y 5m). Each skill's `projects` list was curated for the photo strip,
not as a complete record, so deriving from today's lists collapses big numbers (System Design
19y → 4y 2m) and the Flash-era projects (2008–2013) are linked to no skill.

---

## Acceptance Criteria

- [ ] Audit: every skill's `projects` lists every project where it was practised (Flash era
      included). Agent drafts from project responsibilities; **user confirms before it ships**.
      List order stays photo priority (first 3 shown)
- [ ] Pure `getMonthsCovered(projects, now)` — union of inclusive calendar months (no double count on
      overlap; "Present" = now)
- [ ] Unknown project id in a skill's list fails loudly
- [ ] `Skill.years` deleted; panel shows one bar = skill months / `getCareerMonths(now)`, labelled
      "2y 5m" ("10m" under a year), between the name and the description
- [ ] Ships together with the audit (otherwise numbers visibly collapse in between)
- [ ] `tsc --noEmit` clean; verified live

---

## Sub-Tasks

(none)

---

## Notes

User decisions (Session 09): one list per skill (not separate photo/experience lists); a full bar =
whole career so far, and no bar reaching 100% is accepted (projects cover 196 of 238 career months).
