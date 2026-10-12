---
type: Task
title: "T-041: Fix project timeline color"
description: "The timeline's current color is wrong/needs fixing — specifics TBD"
status: done
priority: medium
parent: T-040
tags: [roadmap, task, projects, visual-bug]
timestamp: 2026-08-24T00:00:00Z
---

# T-041: Fix project timeline color

## Context

Part of [T-040](T-040-project-section-overhaul.md). Likely touches the timeline components under
`src/adapters/primary/components/timeline/` (e.g. `ProjectStage.tsx`) — not yet diagnosed which
specific element/color is wrong.

---

## Acceptance Criteria

- [x] Timeline color issue identified and confirmed with the user
- [x] Fixed for both skins if the timeline is skin-aware

---

## Sub-Tasks

(none — single-scope fix, once diagnosed)

---

## Notes

Root cause: `--color-periwinkle`/`--color-periwinkle-deep`/`--color-lilac` (purple originally) had
been silently repointed to navy/tan hex values in `src/index.css` during an earlier palette pass —
`TimelineRail.tsx`'s `bg-lilac`/`bg-periwinkle-deep` rail line and dots inherited that, reading as
black/near-black instead of purple. Not skin-specific — these tokens aren't overridden per-skin.

Fixed 2026-08-27: restored the 3 tokens to their original purple values, and gave
`BentoResponsibilities`' `BinderClip` (the one consumer that actually wanted navy) its own
dedicated `--color-navy` token instead of borrowing periwinkle — see `TOKEN_CONTRACT.md` §03/§03.5.
This also incidentally fixes the same navy regression in the footer's "APPS"/"HAPPY" text and
`Badge`/`Avatar`'s `periwinkle` option, which shared the same broken token.
