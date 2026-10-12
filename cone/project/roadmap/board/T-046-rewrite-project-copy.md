---
type: Task
title: "T-046: Rewrite project copy toward Game Producer framing"
description: "Rewrite all project descriptions to lean toward the Game Producer role where it fits naturally, without forcing it"
status: in-progress
priority: high
parent: T-040
tags: [roadmap, task, projects, content, copywriting]
timestamp: 2026-08-24T00:00:00Z
---

# T-046: Rewrite project copy toward Game Producer framing

## Context

Part of [T-040](T-040-project-section-overhaul.md). Companion to
[T-039](T-039-skilltree-content-pass.md)'s skill-tree content pass — same underlying positioning
goal applied to project copy instead of skill data. User was explicit this should read naturally,
not be forced into every entry.

---

## Acceptance Criteria

- [ ] All project descriptions in `src/infrastructure/data/portfolio.json` reviewed
- [ ] Copy leans toward game-producing framing (leadership, cross-functional coordination,
      shipping, player experience) where it genuinely fits — not forced where a project doesn't
      naturally support it
- [ ] User has reviewed/approved the rewritten copy
- [x] Tab 1 (Overview) first draft for all 14 projects — [PROJECT_TAB1_OVERVIEW_COPY.md](../../specs/PROJECT_TAB1_OVERVIEW_COPY.md)
- [x] Overview copy live in `portfolio.json` (facts + summary line); unconfirmed parts render red
- [ ] User answers every red `[? …]` item (list in the spec)
- [ ] Tab 2 (Details) edit pass: cut filler bullets, group long lists, no word-for-word repeats of the achievement card

---

## Sub-Tasks

(none — single content pass)

---

## Notes

2026-10-11: moved to in-progress. Scope now split across the two tabs decided in [T-044](T-044-project-tabs-standardization.md): Overview copy (recruiter-facing, drafted) and a Details edit pass.

Consider doing this alongside [T-045](T-045-add-more-projects.md) (new projects should be
authored directly in this voice) and [T-043](T-043-project-cards-polish.md) if their scopes end
up overlapping.
