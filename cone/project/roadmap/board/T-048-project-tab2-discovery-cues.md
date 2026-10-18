---
type: Task
title: "T-048: Make the Details tab discoverable"
description: "End-of-Overview 'Full breakdown →' link plus a one-time tutorial hand pointing at the Details tab"
status: done
priority: medium
parent: T-040
tags: [roadmap, task, projects, ux]
timestamp: 2026-10-11T00:00:00Z
---

# T-048: Make the Details tab discoverable

## Context

Part of [T-040](T-040-project-section-overhaul.md); depends on [T-044](T-044-project-tabs-standardization.md).
Decided with the user in session 07: a persistent hand alone would nag across 14 projects, and
Overview is designed to stand on its own, so discovery uses three layered cues. Cue 1 (word labels) ships with T-044.

---

## Acceptance Criteria

- [x] "Full breakdown →" link at the end of every Overview that switches to Details *(shipped as "Read more ›" in [T-057](T-057-clipboard-overview-redesign.md))*
- [x] Tutorial hand on the first project only, after a short dwell; disappears on the first tab click anywhere
- [x] Hand dismissal remembered per visitor (`localStorage`, wrapped so blocked storage just shows the hand again)
- [x] Respects `prefers-reduced-motion`

---

## Sub-Tasks

(none — one UX pass)

---

## Notes

- 2026-10-15: the hand (lucide `Pointer`, white with an ink outline) appears 2s after the first project's Overview is on screen, under the Details tab pointing up at it, bobbing gently (still under reduced motion). Any tab click or "Read more" retires it on every clipboard at once (`useDetailsHint`, one shared flag) and stores `details-hint-dismissed` in `localStorage`. Verified at 1920, 1366 and 390: hidden before the dwell, absent on other projects, back on returning to the first, gone after a tab click and after reloading.
