---
type: Task
title: "T-067: Screenshot slideshow in the phone frame"
description: "A project without a video crossfades through all its screenshots in the phone frame"
status: in-progress
priority: medium
tags: [roadmap, task, projects, video-frame]
timestamp: 2026-10-22T00:00:00Z
---

# T-067: Screenshot slideshow in the phone frame

## Context

Some entries cover many games (Amber, Newgrounds, and the coming Upit and Astrocade). Of four options (slideshow, mosaic, a Games tab with sub-items, one timeline entry per game) the user chose the slideshow on 2026-10-22, with screenshots named per the standard in [PROJECT_TEMPLATE.md](../../architecture/systems/PROJECT_TEMPLATE.md) "Screenshot Files". Parent: [T-040](T-040-project-section-overhaul.md); builds on [T-066](T-066-never-an-empty-frame.md).

---

## Acceptance Criteria

- [x] A project without a video and with more than one screenshot crossfades through them in order in the phone frame, then loops.
- [x] Only the project in view runs it; the others show their first screenshot ([C-011](../../architecture/GUARDRAILS.md)).
- [x] The crossfade is opacity only ([C-008](../../architecture/GUARDRAILS.md)); with reduced motion requested, the frame stays on the first screenshot ([C-010](../../architecture/GUARDRAILS.md)).
- [x] Projects with a video, or with one screenshot, look exactly as before.
- [x] Each screenshot can carry a caption (the game's name), shown under it and fading with it.
- [x] Dots under the screenshots show how many there are and which one is showing; clicking one jumps straight to it, and the 4 s wait restarts from there.
- [ ] Measured with the performance test ([C-009](../../architecture/GUARDRAILS.md), [T-060](T-060-perf-test-harness.md)).
- [ ] User side-by-side check on the site.

---

## Notes

- Captions live per screenshot in the data (`{ src, caption }`), not in the file name: Amber's `SS_BWS_2` and `SS_BWS_3` are two different games (Bubble Witch 2 and 3 Saga). Added at the user's request on 2026-10-22, with the dots; checked in the browser (Frozen dot jumps there, next slide 4 s after the click).
- Checked 2026-10-22 with Amber temporarily given FEHV's five screenshots (data restored after): slides advance every 4 s in order and loop; slides load one ahead (2 mounted at start, 5 after a full loop); leaving and returning restarts at the first; with reduced motion the frame stays on the first. Amber is the first real slideshow (six games), since every other project with several screenshots also has a video.
- Each screenshot can carry its game's links (2026-10-22, user). The clipboard shows them as tags only while that screenshot shows (the frame and the clipboard share the shown slide through `ProjectDetails`), swapping instantly with it (a fade made the old and new rows overlap and jump, user called it glitchy, 2026-10-22). Amber's six games: King's page for the four King games, App Store and Google Play for all six (all live), plus Amber Studio's Diamond Diaries case study and Wild Things video. An earlier button in the frame itself was dropped once the tags followed the slide. Checked in the browser.
