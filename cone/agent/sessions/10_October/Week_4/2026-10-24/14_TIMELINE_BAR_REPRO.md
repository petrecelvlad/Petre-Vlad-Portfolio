---
type: Session
title: "Session 14: Timeline Bar Repro"
description: Found the last handover (T-068) after misreading it once, then reproduced the timeline bar "breathing" in Chrome and traced it to fractional line geometry.
tags: [session, timeline, bug, repro]
timestamp: 2026-10-24T00:00:00Z
---

# Session 14: Timeline Bar Repro

## Metadata

- **Date:** 2026-10-24
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Find the last handover and explain why the T-068 timeline bar changes width while scrolling.
- **Status:** COMPLETE ✅
- **Previous:** [Session 13](./13_OUTPUT_LENGTH_RULES.md)

---

## Tasks

- [x] Identify the last handover: [T-068](../../../../../project/roadmap/board/T-068-timeline-bar-breathing.md) (first answered Session 11 by mistake: searched only session HANDOFF statuses, never the board)
- [x] Repro in the user's Chrome (Claude in Chrome) against the dev server on :3000
- [ ] Mid-scroll capture: not possible, `Page.captureScreenshot` times out while the page scrolls
- [x] Fix: `TimelineRail.tsx` line widths `w-1.5` → `w-[6px]`, button `w-10` → `w-[40px]` (h-10 kept, `--rail-inset` depends on it); stale will-change comment replaced. `tsc` clean; in Chrome the line is at x 41, 6px, and normal vs GPU-layer captures are pixel-identical
- [ ] User's own check on the site — tracked on T-068, which stays in-progress until then
- [ ] Retard.md lesson (read the user's words literally; sort "latest" by date): proposed, not confirmed

---

## Discoveries

- Root font size is 17px, so `w-1.5` = 6.375px and the rail container is 42.5px wide; `-translate-x-1/2` puts it at x = 22.75. The line spans x 40.8125 → 47.1875: both edges fall between pixels.
- Settled (normal paint): 6 solid pixels + two partial edge pixels (coverage 0.44 / 0.56).
- Rail forced onto a GPU layer (`will-change: transform`, standing in for the layer Chrome uses while scrolling): the line shifts a fraction of a pixel and is resampled, giving 5 solid pixels + softer edges (0.05 / 0.39 … 0.95 / 0.61). Reads as ~1px narrower. This matches the user's report.
- With whole-pixel geometry (rail 42px, lines 6px → line at x 41, width 6), layered and normal renders are pixel-identical (6 solid, no fringe).
- Not proven: that Chrome actually layerizes the rail during a real wheel scroll (the mid-scroll frame can't be captured). Inference from the layer test only.
- The `will-change` comment in `TimelineRail.tsx` describes a fix that is not in the code.
- User's display is 1920×1080 at 100% scaling (96 DPI), DPR 1: the previous agent's "fractional display scaling" theory doesn't apply; the fractions come from the 17px rem.

---

## Files Modified

- `src/components/timeline/TimelineRail.tsx` — px widths for the desktop rail line and buttons
- `cone/project/roadmap/board/T-068-timeline-bar-breathing.md` — status in-progress, attempt 3 noted
- Repro script: `railwidth.py` in the session scratchpad (measures blue-channel coverage across the line in saved zoom captures).

---

*Last updated: 2026-10-24*
