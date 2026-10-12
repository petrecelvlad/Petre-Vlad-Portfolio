---
type: Task
title: "T-048: Make the Details tab discoverable"
description: "End-of-Overview 'Full breakdown →' link plus a one-time tutorial hand pointing at the Details tab"
status: backlog
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

- [ ] "Full breakdown →" link at the end of every Overview that switches to Details
- [ ] Tutorial hand on the first project only, after a short dwell; disappears on the first tab click anywhere
- [ ] Hand dismissal remembered per visitor (`localStorage`, wrapped so blocked storage just shows the hand again)
- [ ] Respects `prefers-reduced-motion`

---

## Sub-Tasks

(none — one UX pass)

---

## Notes

(none yet)
