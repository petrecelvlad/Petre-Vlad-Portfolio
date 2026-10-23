---
type: Task
title: "T-066: Never an empty phone frame"
description: "Make the phone frame and the Gallery tab follow C-013: full-size YouTube thumbnail or our screenshot while a video loads, every screenshot in the tab"
status: in-progress
priority: high
tags: [roadmap, task, projects, video-frame, gallery]
timestamp: 2026-10-20T00:00:00Z
---

# T-066: Never an empty phone frame

## Context

PlayMusic's phone frame went grey while its video loaded. The cover asks YouTube for the full-size thumbnail (`maxresdefault`), which only some uploads have; for the rest YouTube answers with its 120×90 grey placeholder. Separately, the Gallery tab left out the first screenshot for projects without a video, so a project with one screenshot had no tab. The user set the rule as [C-013](../../architecture/GUARDRAILS.md) "Never an Empty Frame" (2026-10-20). Parent: [T-040](T-040-project-section-overhaul.md); changes the rule [T-049](T-049-project-gallery-tab.md) built.

---

## Acceptance Criteria

- [x] With a video, the cover while it loads is the full-size YouTube thumbnail; when YouTube has none, the first screenshot; with neither, the "No preview" placeholder. YouTube's smaller sizes are never used.
- [x] Without a video, the frame shows the first screenshot, or the placeholder when there is none (unchanged).
- [x] The Gallery tab shows every screenshot, the first one included, and is hidden only when the project has none.
- [x] PlayMusic shows its screenshot while the video loads.
- [ ] Screenshots added for Tap TD, Merge Mansion, Realm of the Mad God and Newgrounds Flash Games (user supplies or approves them). Done for all but Newgrounds (2026-10-22).
- [ ] User side-by-side check on the site.

---

## Notes

- The grey placeholder comes back as a real image, so the frame checks the thumbnail's width (placeholder is 120 wide) before using it.
