---
type: Task
title: "T-068: Timeline bar changes width while scrolling (handover)"
description: "The vertical timeline bar draws about 1 px narrower while the page scrolls and snaps back 1 px wider when it settles; two fix attempts failed"
status: in-progress
priority: medium
tags: [roadmap, task, timeline, bug, handover]
timestamp: 2026-10-24T00:00:00Z
---

# T-068: Timeline bar changes width while scrolling (handover)

## The bug, as the user reports it

On desktop, the vertical timeline bar on the left of the project section (the line joining the
dots, `src/components/timeline/TimelineRail.tsx`) changes width with every scroll:

- While the page scrolls from one project to another, the whole bar is about 1 px narrower.
- When the scroll finishes and everything settles, the bar is 1 px wider again.

So at every scroll the bar visibly shrinks and grows back, and the user describes it as
"breathing". It is subtle (one pixel) but noticeable.

## Status

- Two fix attempts by the previous agent failed; the user confirmed the bug is still there.
- The previous agent misread the report twice (first as a sliver of a second colour beside the
  line, then as only the purple fill animating); read the description above as written.
- The second attempt is still in `TimelineRail.tsx`, uncommitted. Check the file against
  `git diff` before starting.
- Only the user's own check on the site counts as fixed.
- 2026-10-24 (session 14): third attempt. Cause: the 17px root font made the rem widths fractional
  (line 6.375px at x 40.81). Line and button widths are now px; normal and GPU-layer renders were
  pixel-identical in Chrome. Waiting for the user's check.
