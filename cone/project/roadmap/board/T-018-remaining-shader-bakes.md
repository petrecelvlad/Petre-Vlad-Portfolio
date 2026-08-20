---
type: Task
title: "T-018: Bake Factory, Teamslead, and Cartridge"
description: "Repeat the validated T-017 pipeline for the remaining 3 shaders — Factory and Teamslead to sprite sheets, Cartridge to looping video."
status: done
priority: medium
parent: T-014
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# T-018: Bake Factory, Teamslead, and Cartridge

## Context

Fourth sub-task of [T-014](T-014-bake-achievement-shaders-to-video.md). Depends on [T-017](T-017-levelup-bake-pipeline.md) proving the pipeline. Per [T-015](T-015-shader-loop-period-audit.md)'s windows: Factory ~33.33s (sprite sheet), Teamslead 20s (sprite sheet, mandatory crossfade for the aperiodic water noise), Cartridge ~12.57s pending confirmation (looping video — smooth continuous 3D motion suits video over `steps()`).

## Acceptance Criteria

- [x] Factory baked to sprite sheet, loop seam verified
- [x] Teamslead baked to sprite sheet with crossfade applied at the loop boundary, verified
- [x] Cartridge baked to looping WebM/MP4 via `ffmpeg`, verified

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-19 — done.** New devDependency `@ffmpeg-installer/ffmpeg` (Playwright's own bundled ffmpeg only
has a VP8 encoder — no H.264/mp4 support — so a full static build was needed for the mp4 output; kept both
in play rather than dropping Playwright's, since it's already there for Playwright's own use).

**Factory** — `node tools/shader-capture/capture.mjs factory sprite`. 200 frames @ 6fps (100/3s × 6 = 200
exactly), 15×14 grid, originally 7680×4032px/14.96MB. Loop-closure diff: 0.0000/255 (max diff 1 — rounding
noise), matching T-020's prediction that Factory's exact rational LCM needs no crossfade. Visually verified
— conveyor, gears, stamping press, box faces all render correctly across the sheet.

**Teamslead** — same command with `crossfadeSeconds: 1` in its config (12 frames @ 12fps blended). 240
frames, 16×15 grid, originally 8192×4320px/19.7MB (heaviest — water/noise texture compresses worse in PNG
than Factory's flat colors).

**2026-08-19 — file sizes addressed (follow-up in the same session).** Factory and Teamslead's cell
resolution dropped from 512×288 to 256×144 (WebGL still renders at full 512×288 for quality; `packSpriteSheet`
now downscales per-frame via canvas `drawImage`, using the browser's default bilinear smoothing rather than
rendering natively at a lower resolution). Grid/frame count unchanged. New sizes: **Factory 4.54MB** (was
14.96MB, 3.3×), **Teamslead 6.92MB** (was 19.7MB, 2.85×) — combined with Level-Up's untouched 1.64MB, all 3
sprite sheets now total ~13.1MB, down from ~36.3MB. Re-verified: `cell_head.png`/`cell_tail.png` spot checks
at the new resolution still show crisp text ("FUN"), legible smiley faces, and the crossfade ghosting still
visible in Teamslead's tail. `SpriteLoopCanvas` needed zero code changes — it sizes purely from the
displayed container's `clientWidth`/`clientHeight`, never the source image's own pixel dimensions. Loop-closure diff 4.4161/255 confirms the real, expected residual from aperiodic
water noise — but the *packed sheet's* actual seam was verified directly: extracted the first and last grid
cells (`cell_head.png`/`cell_tail.png`) and compared them side by side. The crossfade is visibly working —
the tail cell shows a soft double-exposure/ghosting right where the pawn sits (blending toward the head
frame's pawn position) instead of a hard jump; island terrain and water are otherwise near-identical between
the two.

**Cartridge** — `node tools/shader-capture/capture.mjs cartridge video`. Chose 60fps: `2π × 60 = 376.99`,
~0.15ms off a whole 377 frames — negligible, no need to retune the shader again for a cleaner fps fit (30fps
would have left a ~16.5ms residual, about half a frame). Encoded both `loop.webm` (VP9) and `loop.mp4`
(H.264, `+faststart`) to match Hero's existing dual-`<source>` `<video>` pattern for the character clip.
**~666-682KB each** — far lighter than the sprite sheets, confirming the proposal's original reasoning that
video suits Cartridge's smooth continuous motion better than a sprite grid. Spot-checked frame 0 (cartridge
front) and frame 188 (~half rotation, back panel — "MADE IN ROMANIA" text renders correctly) — raymarching
and rotation both hold up.

All 4 assets now exist in `tools/shader-capture/out/<shader>/` (gitignored — build artifacts, not checked
in yet). [T-019](T-019-swap-and-verify.md) is next: swap these into `AchievementShaderCanvas.tsx`, decide
where the checked-in assets actually live (`public/`, matching `loopB.webm`/`loop1.mp4`'s existing location).
