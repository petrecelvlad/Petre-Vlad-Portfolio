---
type: Task
title: "T-049: Optional Gallery tab"
description: "Screenshot gallery section, rendered as InstantPhoto polaroids, only for projects with screenshots beyond the video frame's"
status: done
priority: low
parent: T-040
tags: [roadmap, task, projects, content]
timestamp: 2026-10-11T00:00:00Z
---

# T-049: Optional Gallery tab

## Context

Part of [T-040](T-040-project-section-overhaul.md); depends on [T-044](T-044-project-tabs-standardization.md)'s
section types. The gallery shows whichever screenshots the video frame isn't showing (`getGalleryScreenshots` in `core/domain/projectMedia.ts`): all of them when the project has a playable YouTube video, else everything after `keyScreenshots[0]`.

---

## Acceptance Criteria

- [x] `gallery` section type rendered as `InstantPhoto` polaroids on the clipboard paper
- [x] Present only on projects with screenshots the video frame isn't already showing
- [ ] (Later, content) more screenshots for projects the user picks

---

## Sub-Tasks

(none)

---

## Notes

2026-10-11: done — live on Formula E, Clash of Towers, Castellum, Bounzy, Marble Frenzy 2; verified via headless Edge screenshots. Adding screenshots to other projects is a content task, no code.
