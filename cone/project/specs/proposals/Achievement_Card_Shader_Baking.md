---
type: Proposal
title: Achievement Card Shader Baking
description: Replace the Hero's 4 live WebGL achievement-card shaders with pre-baked looping video/sprite playback.
tags: [spec, performance, hero, proposal]
timestamp: 2026-08-17T00:00:00Z
---

# Proposal: Bake the Hero's 4 Achievement-Card Shaders to Looping Video/Sprite

**Date:** 2026-08-17
**Author:** Claude Sonnet 5 (session), at the user's request
**Status:** DRAFT

---

## Problem

`AchievementShaderCanvas.tsx` renders 4 live WebGL fragment shaders in the Hero banner's achievement row (cartridge, level-up, factory, teamslead), each in its own `<canvas>`/WebGL context, each running its own `requestAnimationFrame` loop continuously for as long as the Hero is visible. The user reports the Hero section still "feels slow and laggy sometimes" even after the segmented-background WebGL→SVG conversion (see session 03, `cone/agent/sessions/08_August/Week_3/2026-08-16/03_GALAXIAN_SVG_CONVERSION.md`) removed one more WebGL context from the page.

These 4 remaining shaders are not good candidates for the same SVG/CSS hand-port technique used for the segmented background:
- **Cartridge** is a true raymarched 3D scene (45-step sphere-tracing loop, computed normals/lighting per pixel, live camera rotation) — SVG/CSS has no raymarching primitive; the closest analog (a flat sprite + CSS 3D transform) would not reproduce the shading identically.
- **Level-up** and **Factory** are each dozens of independently-animated procedural primitives (particle systems, custom-eased chevrons, an 8-segment pulsing/shaking gauge, gears, a scrolling conveyor, a stamping press, SDF-font text) — a faithful hand-port would mean re-authoring ~15-20 tuned CSS animations per card from scratch, a large effort with real risk of visibly drifting from the original.
- Several of these shaders use continuously-evaluated pseudo-random terms (e.g. Level-up's particle field: `sin(id * 43.1 + u_time * 0.5)`) that are recomputed fresh every frame and never truly repeat — CSS/SVG animation is fundamentally loop-based, so a hand port can only approximate this, never reproduce it.

Confirmed with the user: looping is acceptable (these already read as ambient decoration, not literal simulations), which changes the calculus — a **pre-baked capture** of the real shader output becomes a frame-perfect substitute rather than a lossy reimplementation.

---

## Proposed Solution

For each of the 4 shaders, programmatically capture one full loop cycle of its *actual* rendered output (not a reimplementation — a recording), then replace the live `<canvas>` with a pre-baked, looping asset:

1. Build a small standalone HTML harness that mounts a single shader instance, reusing the existing GLSL source and `createProgram`/`createShader` helpers from `webgl.ts` verbatim — but with `u_time` driven by a fixed, explicit step (e.g. `frameIndex * (1/30)`) rather than `performance.now()`, so rendering can be paused/stepped deterministically instead of running in real time.
2. Drive that harness with a headless browser (Playwright or Puppeteer): for each frame across the shader's full loop period, set `u_time`, force one draw call, and capture the canvas (`canvas.toDataURL()` or a locator screenshot of just the canvas element).
3. Encode the captured frame sequence into either:
   - a short looping **WebM/MP4** via `ffmpeg` (best for Cartridge — the one shader with genuinely smooth, continuous 3D motion), reusing the exact `<video autoplay loop muted playsInline>` pattern `Hero.tsx` already uses for the character clip, or
   - a **sprite sheet** (one PNG grid of ~30-60 frames) stepped via CSS `steps()` on `background-position` (a good fit for Level-up/Factory/Teamslead, since those shaders already explicitly quantize color — `finalColor = floor(finalColor * 16.0) / 16.0` in Level-up — and lean into a blocky, non-continuous pixel-art look that doesn't need video's smooth interpolation; also avoids a video codec/decoder entirely, which is cheaper still than video playback).
4. Swap each `AchievementShaderCanvas` case for the corresponding pre-baked asset, sized/positioned identically (`object-fit: cover`, matching the existing canvas's `w-full h-full block object-cover`).
5. Keep the original GLSL source in the codebase (or in this doc / a linked reference file) so the bake can be regenerated if the visual design ever changes — the shader is the source of truth; the baked asset is a build artifact of it, not a replacement design.

---

## Alternatives Considered

| Alternative | Why not |
|---|---|
| Hand-port each shader to SVG/CSS (the technique used for the segmented background) | Cartridge's raymarched 3D lighting can't be reproduced identically in SVG. Level-up/Factory would need ~15-20 individually hand-tuned animations per card — large effort, real risk of visible drift from the original, and still can't replicate the non-repeating particle fields even after all that work. |
| Leave the shaders live, just reduce iteration counts (raymarch steps, particle count) | Cheaper to do, but doesn't remove the WebGL compile-time cost or the 4-live-context overhead — the two things most likely responsible for the reported lag. Smaller win; worth doing only if baking turns out to be infeasible. |
| Do nothing | Lag complaint stands; the segmented-background conversion already proved this category of fix is worth pursuing. |

---

## Impact

**Systems affected:**
- `AchievementShaderCanvas.tsx` — the 4 shader-rendering functions get replaced by asset playback; the GLSL source should be preserved (moved to a reference location, not deleted) as the bake's source of truth.
- Build/tooling — a new one-off (or repeatable) capture script is needed; this is *not* part of the normal `vite build`, it's a generation step run when a shader's design changes, producing checked-in video/sprite assets.
- Hero's asset payload — adds 4 small video/sprite files to `public/` (or wherever `loopB.webm`/`loop1.mp4` currently live), similar in kind to the existing character-video assets.

**Constraints:**
- No new architectural guardrail needed — this follows the existing `<video autoplay loop muted playsInline>` pattern already established for the Hero's character clip, not a new technique.

**Risks:**
- **Loop-seam accuracy is the real risk, and it is non-trivial per shader.** Each shader mixes several `u_time`-scaled terms with *different* periods (e.g. Factory has independent gear-rotation, conveyor-scroll, box-spawn, and stamping-press cycles all running at different `u_time` multipliers). A mathematically perfect loop requires the capture window to be the *least common multiple* of every periodic term in that shader — which may be an inconveniently long duration, or impractical to compute exactly for terms that aren't clean rational multiples of each other. Don't assume a "nice" cycle length (e.g. Level-up's explicit `mod(u_time, 6.5)`) covers every element in that same shader — verify against the full source, not just the most obvious modulo. Where a clean common period isn't practical, capture a longer window (10-20s) and apply a short crossfade/dissolve across the loop boundary — a standard, unremarkable technique for looping ambient background media, not a compromise worth agonizing over.
- **Fixed resolution.** A baked asset is fixed-resolution; export at a headroom multiple of the largest expected on-screen card size (`object-fit: cover` handles the rest, same as the character video already does) rather than the exact current size.
- **Regeneration workflow.** Once baked, the GLSL source and the asset can drift out of sync if someone edits the shader without re-running the bake. Document the regeneration step clearly wherever the GLSL source ends up living.

---

## Implementation Plan

1. Confirm each shader's true composite loop period by reading its full source for every `u_time`-scaled term (not just the first modulo found) — do this per shader before writing any capture tooling, since it determines the capture window length.
2. Build the fixed-timestep capture harness (reuses existing `webgl.ts` + each shader's GLSL verbatim).
3. Script the headless-browser frame capture + `ffmpeg`/sprite-sheet packing for one shader end to end (Level-up is a reasonable first candidate — no raymarching, but complex enough to validate the pipeline).
4. Verify the loop seam is visually clean (play it back, watch the boundary specifically) before repeating for the other 3.
5. Swap `AchievementShaderCanvas`'s 4 cases for the baked assets; keep the GLSL source in the tree as the regeneration source of truth.
6. Verify: `npx tsc --noEmit`, `npm run build`, and an actual visual/perf check in a real browser (before/after frame-time or GPU-usage comparison, not just "looks fine") — this is exactly the kind of change that needs eyes-on verification, not just a clean build.
