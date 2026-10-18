---
type: Task
title: "T-064: Fix the Moving Parts Audit findings"
description: "Fix the junior-style animations found by the Moving Parts Audit (P1–P14), except the parked cards (P6)"
status: in-progress
priority: high
parent: T-058
tags: [roadmap, task, performance, animation]
timestamp: 2026-10-18T00:00:00Z
---

# T-064: Fix the Moving Parts Audit findings

## Context

Part of [T-058](T-058-performance-common-sense-system.md): the first back-sweep that [T-063](T-063-lesson-promotion-back-sweep.md) describes, done before the performance guardrails exist. Audit artifact: https://claude.ai/artifact/HiFbFMvshAGcyn9Fo6u3PC. The user asked for all findings fixed (session 12).

---

## Acceptance Criteria

- [x] P1 name letters: CSS `transform` animation, same timing (`index.css` `.hero-name-letter`)
- [x] P2 island: false "compositor-only" comment corrected
- [x] P3 background: paused time dropped, not applied on resume; frame step clamped
- [x] P4 background: mouse ignored while paused
- [x] P5 character video: drawn at its displayed size
- [ ] P6 cards: parked by the user (MP4 step of the Hero Smoothness Plan)
- [x] P7 skill tree resize: centering and scale on one transform, no width/height easing
- [x] P8 skill pills: pop-in as a `transform` string (GPU)
- [x] P9 rail progress line: `scaleY`/`scaleX` instead of height/width
- [x] P10 rail slide-in and dots: `transform` strings (spring kept)
- [x] P11 details hint hand: CSS animation (`.hint-bob`)
- [x] P12 hero no longer re-renders on every scroll (scroll pause moved into the background). The per-frame position checks in `useTimelineOrchestrator` were left: see Notes
- [x] P13 video play icon: `transition-colors`
- [x] P14 reduced motion: `MotionConfig reducedMotion="user"`; background holds a still frame; video shows its first frame; GPU `transform` animations check the setting themselves
- [x] `tsc --noEmit` clean, `vite build` passes
- [ ] Side-by-side visual check by the user (letters, video, skill tree open/close, rail)

---

## Notes

- P12: on closer reading the timeline's per-scroll position checks are near free (layout is already computed during a scroll, and React skips identical state updates). Rewriting them onto observers would risk the rail's documented edge cases for no measurable gain, so they stay.
- P7: the audit's trade-off was wrong. The details panel's width doesn't depend on the tree's box, so nothing moves differently.
- P1: the outline is 22 text shadows including one blurred, not "about 8" as the audit said, which makes the GPU move worth more.
- Motion's reduced-motion switch covers x/y/scale and width/height only, not `transform` strings. Every GPU `transform` animation checks `useReducedMotion()` itself. `useReducedMotion` reads the setting once per mount (a Motion limitation), so a change applies on reload.
