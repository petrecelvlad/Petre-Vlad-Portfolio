---
type: Task
title: "T-016: Fixed-timestep shader capture harness"
description: "Build a standalone harness that reuses webgl.ts + each shader's GLSL verbatim, driven by a fixed u_time step instead of performance.now(), so frames can be captured deterministically."
status: done
priority: medium
parent: T-014
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# T-016: Fixed-timestep shader capture harness

## Context

Second sub-task of [T-014](T-014-bake-achievement-shaders-to-video.md), per the proposal's Implementation Plan step 2. Depends on [T-015](T-015-shader-loop-period-audit.md)'s capture windows.

New dependencies confirmed with the user: Playwright (headless capture) and `@ffmpeg-installer/ffmpeg` (Cartridge's video encode — no system `ffmpeg` on this machine's PATH).

## Acceptance Criteria

- [x] Standalone harness mounts one shader instance, reusing `createProgram`/`createShader` from `src/components/backgrounds/webgl.ts` verbatim
- [x] `u_time` driven by an explicit `frameIndex * (1/30)` step, not `performance.now()`
- [x] Playwright drives the harness headlessly: for each frame across the shader's loop window, set `u_time`, force one draw call, capture the canvas
- [x] Validated end-to-end on one shader before T-017 attempts the full pipeline

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-19 — done.** `tools/shader-capture/capture.mjs`. Design choice: instead of hand-copying GLSL
into the harness (drift risk over a 400+ line shader), it reads `AchievementShaderCanvas.tsx` and
`webgl.ts` straight off disk and extracts the exact `vsSource`/`fsSource` template-literal text and the
`createProgram`/`createShader` functions (the latter transpiled through esbuild's TS→JS transform, already
a transitive Vite dependency — no new build-tool dependency needed). "Verbatim" is enforced by construction,
not by discipline. New devDependency: `playwright` (chromium binary installed via `npx playwright install
chromium`; incidentally bundles its own `ffmpeg` binary too, worth checking before adding
`@ffmpeg-installer/ffmpeg` for T-018's Cartridge encode).

Validated end-to-end on Level-Up (`node tools/shader-capture/capture.mjs levelup`): 195 frames captured at
512×288/30fps, spot-checked visually (frame 0 = reset state, frame 90 ≈ full gauge/flare — matches the
shader's designed 6.5s cycle). Added an in-browser `diffFrames(t1, t2)` helper (raw `gl.readPixels`
comparison, no extra image-decoding dependency) that closes T-020's open automated-verification criterion
for Level-Up: frame(0) vs frame(T=6.5s) mean abs diff = 0.74/255 (~0.3%) — the loop closes almost exactly;
the higher max-diff outlier is expected hard-edge rasterization noise (a sharp boundary pixel can flip
between two colors from an infinitesimal timing difference — the same thing happens between any two
adjacent frames, not something specific to the loop seam).

Currently only has a config entry for `levelup`; adding Factory/Cartridge/Teamslead configs when T-018
reaches them is a small, mechanical extension of the same script, not new design work.
