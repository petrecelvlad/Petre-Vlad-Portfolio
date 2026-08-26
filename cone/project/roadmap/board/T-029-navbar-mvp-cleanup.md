---
type: Task
title: "T-029: Navbar MVP cleanup"
description: "Remove internal debug controls from the navbar, replace with real site navigation, make the title a clickable link back to Hero"
status: backlog
priority: high
parent: T-028
tags: [roadmap, task, navbar]
timestamp: 2026-08-24T00:00:00Z
---

# T-029: Navbar MVP cleanup

## Context

The navbar (`src/adapters/primary/components/Navbar.tsx`) currently exposes internal testing
controls (plank style, skin, achievement animation-path selectors, EDIT ISLAND, DEBUG BACKLOG
toggle) that have no place in a shipped MVP. Part of
[T-028](T-028-mvp-launch-readiness.md).

---

## Acceptance Criteria

- [ ] Debug-only controls (plank style / skin / animation-path selectors, EDIT ISLAND, DEBUG
      BACKLOG toggle) removed or hidden from the production navbar
- [ ] Real site-navigation buttons added (Hero / SkillTree / Projects / Contact-Footer, or
      whatever the final section set turns out to be)
- [ ] "Vlad Petre" title is a clickable element that scrolls back to the Hero section
- [ ] `tsc --noEmit` / `npm run build` clean

---

## Sub-Tasks

(none — single-scope task)

---

## Notes

Decision needed before implementing: whether any of the current debug controls should stay
available in some dev-only form rather than being deleted outright. Not decided yet — ask the
user when this card is picked up.
