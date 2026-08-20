---
type: Task
title: "T-017: End-to-end bake pipeline, validated on Level-Up"
description: "Script the headless-browser frame capture + ffmpeg/sprite-sheet packing for Level-Up first, to validate the full pipeline before repeating for the other 3 shaders."
status: done
priority: medium
parent: T-014
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# T-017: End-to-end bake pipeline, validated on Level-Up

## Context

Third sub-task of [T-014](T-014-bake-achievement-shaders-to-video.md), per the proposal's Implementation Plan step 3. Level-Up chosen as the first candidate — no raymarching, but complex enough (its 6.5s designed cycle plus 2 flagged residuals from T-015) to validate the pipeline honestly. Depends on [T-016](T-016-shader-capture-harness.md).

## Acceptance Criteria

- [x] Level-Up baked to a sprite sheet (per the proposal's rationale — it already quantizes color in 16 steps and leans into a blocky look, no need for video's smooth interpolation)
- [x] Loop seam verified visually clean (play back, watch the boundary specifically), including whether the 2 residuals flagged in T-015 (background micro-chevrons, particle phase drift) need the crossfade or are imperceptible without it

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-19 — done.** `node tools/shader-capture/capture.mjs levelup sprite` — new `sprite` mode in
T-016's harness: packs frames into a single sheet via in-browser 2D-canvas compositing (`drawImage` per
frame onto an offscreen canvas), no new image-processing dependency. Chose 12fps for the sprite (down from
the 30fps used for the loop-closure/full-frame capture) — Level-Up's animation is a blocky, discretely-timed
game-UI reward beat (color already quantized to 16 steps in the shader itself), not smooth continuous
motion, so a lower sprite fps is an intentional size/fidelity tradeoff, not a corner cut. Result: 78 frames,
9×9 grid, 4608×2592px, **1.64MB** — small for a card asset. `spritesheet.json` manifest written alongside
(frame count, grid, cell size, fps) for T-019's CSS `steps()` playback.

**Loop verified two ways:**
1. Visual: the sheet's last few populated cells (bar reset to nearly empty) read as the same state as the
   first cell — inspected directly, not just inferred from a number.
2. Exact by construction: `6.5s × 12fps = 78` — a whole number, zero remainder. The wrap from frame 77 back
   to frame 0 is mathematically the *same kind of step* as any other consecutive frame pair in the clip
   (the shader is exactly 6.5s-periodic, confirmed in T-020/T-016's diff check), not an approximation that
   happens to look close.

The 2 residuals T-015 flagged (background micro-chevrons, particle phase drift) are not visible as any kind
of seam here — T-020's retune already fixed both, and the sheet confirms it, so no crossfade needed for
Level-Up.
