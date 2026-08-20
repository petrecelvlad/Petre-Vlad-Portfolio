---
type: Spec
title: Achievement Shader Loop-Period Audit
description: Per-shader true composite loop period for the 4 Hero achievement-card shaders, read from full GLSL source — feeds T-014's capture harness.
tags: [spec, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# Achievement Shader Loop-Period Audit

Source read in full: [`src/components/backgrounds/AchievementShaderCanvas.tsx`](../../../src/components/backgrounds/AchievementShaderCanvas.tsx) (2151 lines — `CartridgeShaderCanvas`, `LevelUpShaderCanvas`, `FactoryShaderCanvas`, `TeamsLeadShaderCanvas`). Produced for [T-014](../roadmap/board/T-014-bake-achievement-shaders-to-video.md) / [T-015](../roadmap/board/T-015-shader-loop-period-audit.md), per the proposal's acceptance criterion: confirm each shader's true composite period from the full source, not just the first `mod(u_time, N)` found.

## Method

Every `u_time`-scaled term falls into one of two families:

- **Discontinuous (`mod`/`fract`-based)** — a hard C0 reset. If the capture window isn't an exact multiple of every such term's period, the loop has a visible snap.
- **Continuous (`sin`/`cos`-based)** — smooth, C∞. Its true period is `2π / k` for a term scaled by `k` — always irrational relative to any rational-second period. A shader mixing both families therefore **never has a mathematically exact full-shader loop period** (a rational number of seconds and an irrational one can't share a common multiple except 0) — this is a general fact about this whole shader set, not a per-shader risk. The practical target is: make every discontinuous term land exactly, and let a short crossfade absorb whatever residual phase mismatch the continuous terms have at that boundary (per the proposal's own fallback).

A third family — **hash-based value noise** (`noise()`/`fbm()` sampled at continuously-drifting coordinates) — has no period at all, ever, at any finite window. Where present, a crossfade isn't a fallback, it's mandatory regardless of window choice.

---

## Cartridge

| Term | Type | Period |
|---|---|---|
| `particlePos` drift (`u_time*0.05`, `u_time*0.08`) | discontinuous (fract wrap) | 20s / 12.5s → LCM **100s** |
| `dashPattern` (`u_time*2.0`) | discontinuous (fract wrap) | **0.5s** (divides 100s evenly) |
| `pathY` sine (`u_time*1.5`) | continuous | 2π/1.5 ≈ 4.189s |
| `cartPos` bob (`u_time*2.0`) | continuous | π ≈ 3.142s |
| camera `rotY` (`u_time*1.0`, fed through `rot2D`) | continuous | 2π ≈ 6.283s |
| `glare` sine (`u_time*3.0`) | continuous | 2π/3 ≈ 2.094s |

Discontinuous LCM = **100s** — but that's driven entirely by the slow background particle drift, not by the shader's dominant visual element (the continuously rotating raymarched cartridge, ~6.283s/rotation). A 100s window buys nothing for the part of the shader people actually look at, and is a lot of frames to capture/encode for a small ambient card.

**Resolved via [T-020](../roadmap/board/T-020-retune-shader-loop-constants.md) — retuned rather than crossfaded.** User chose `N = 1` camera rotation (`T = 2π ≈ 6.283s`) — the shortest, simplest option. With camera rotation as the anchor: `cartPos` bob and `glare` were already exact multiples of the fundamental at any `N`; `pathY` (`1.5 → 1.0`) needed retuning since 1.5 isn't an integer multiple of the anchor. The particle drift (no natural fit to a ~6.28s window) and dash pattern were retuned to the nearest whole-wrap fit: particle x/y both converge to `0.159155` (previously `0.05`/`0.08` — the drift angle changes from ~58° to 45°, and speed increases substantially on both axes), dash `2.0 → 2.069027`. All 4 shaders now loop exactly by construction — no crossfade needed anywhere except Teamslead's water (see below).

---

## Level-Up

Nearly everything derives from one master reset: `cycleTime = mod(u_time, 6.5)` — fillProgress, textProgress, flareProgress, both shockwaves, and the gold-coin burst all key off `cycleTime`, which is exactly periodic at **6.5s** by construction (the shader's own designed "reward cycle," not something inferred).

Two elements bypass `cycleTime` and use raw `u_time` directly — exactly the case the acceptance criterion warned about ("not just the first modulo found"):

| Term | Type | Period | Aligns to 6.5s? |
|---|---|---|---|
| Flanking dash lines (`u_time*4.0`) | discontinuous | 0.5s | Yes — 13 cycles exactly |
| Background streaming micro-chevrons (`u_time*1.2`, modulus 1.8) | discontinuous | modulus/speed = 1.8/1.2 = **1.5s** | **No** — true LCM(6.5, 1.5) = 19.5s |
| Energy particle field (`u_time*speedMult`, `speedMult` itself a function of `cycleTime`) | discontinuous, but with a compounding phase | ~3.2s nominal | **No** — see below |

The particle field is a genuinely non-obvious case: `speedMult` is periodic in `cycleTime` (so it returns to the same *value* every 6.5s), but the term multiplies the *absolute, ever-growing* `u_time` by that value each frame — so the accumulated phase offset per 6.5s cycle isn't constant, and the particle field never lands back exactly where it started. At `T=6.5s` the residual offset works out to ≈0.05s out of a 3.2s cycle (~1.6%) — small, but real.

**Recommendation:** capture **T = 6.5s** (the shader's own cycle). ~~Crossfade absorbs the two flagged residuals~~ — superseded by [T-020](../roadmap/board/T-020-retune-shader-loop-constants.md): both residuals get retuned instead of crossfaded (particle phase drift fixed by keying off `cycleTime` instead of raw `u_time`; micro-chevron speed retuned from 1.2 to ~1.108 so its period becomes 1.625s = 6.5/4, an exact submultiple).

---

## Factory

No single obvious outer cycle (no top-level `mod(u_time, N)`). Three independently-scaled discontinuous terms, all driven off `t_conveyor = u_time * 0.27` or raw `u_time`:

| Term | Type | Period |
|---|---|---|
| Box spawn/conveyor loop (`mod(t_conveyor + offset, 1.8)`) | discontinuous | 1.8 / 0.27 = 20/3 ≈ 6.667s |
| Belt texture scroll (`fract(... - t_conveyor*3.0)`) | discontinuous | (1/3) / 0.27 = 100/81 ≈ 1.235s |
| Stamping press cycle (`fract(u_time*0.6)`) | discontinuous | 1/0.6 = 5/3 ≈ 1.667s |
| Gear rotation (`t_conveyor*6.0`, fed through `rotate2d`) | continuous | 2π / 1.62 ≈ 3.879s |

All three discontinuous terms are **rational** multiples of `u_time` (unlike Cartridge/Teamslead, nothing here is locked to an irrational-period sine) — so an exact common period genuinely exists:

**LCM(20/3, 100/81, 5/3) = 100/3 ≈ 33.33s** — verified: 33.33/6.667 = 5, 33.33/1.235 = 27, 33.33/1.667 = 20, all exact integers.

This is the one shader in the set where every hard-cut element can be made to land exactly, no crossfade *strictly* required for the discontinuous elements — only the smooth gear rotation (2π-periodic, ≈3.879s) has a minor residual phase mismatch at the 33.33s boundary (33.33/3.879 ≈ 8.59 rotations, not integer), invisible enough on a spinning gear that a short crossfade is still cheap insurance.

**Recommendation:** capture **T ≈ 33.33s** (100/3s exactly). This is the longest of the four windows — worth flagging since it's 5-6x the others in frame count/file size, purely because this shader has three staggered mechanical cycles instead of one master cycle like Level-Up.

---

## Teamslead

| Term | Type | Period |
|---|---|---|
| Water/caustic noise (`noise()` at `u_time`-drifting coords) | **aperiodic — no finite period exists** | n/a |
| Wave crest sine (`u_time*2.0`, but argument also includes the aperiodic water noise) | continuous, but noise-contaminated | inherits water noise's aperiodicity |
| Foam pulse (`sin(u_time*3.0 + noise(p*10.0)*6.28)`) | continuous — the noise term here is spatial-only, no `u_time` inside it | 2π/3 ≈ 2.094s (clean) |
| Dashed path (`u_time*0.02`, `dashPeriod=0.09`) | discontinuous | 0.09/0.02 = **4.5s** |
| Boat/pawn journey (`mod(u_time*0.15, 3.0)`) | discontinuous | 3.0/0.15 = **20s** — the shader's clear "story" cycle (node1→node2→node3→node4) |
| Beacon pulse rings (`mod(u_time*1.8, 1.0)` ×2) | discontinuous | 1/1.8 = 5/9 ≈ 0.556s |
| Hero bob / active-node pulse / callout bob | continuous | 2π/8, 2π/6, 2π/4 respectively — all small decoration |

The water/caustic background is **hash-based value noise sampled at a continuously-shifting coordinate** — the same "recomputed fresh every frame, never truly repeats" pattern the proposal already called out for Level-Up's particles, except here it drives the entire background, not a decorative accent. **No capture window makes this exact — a crossfade is mandatory regardless of window choice**, which changes the calculus for the rest of the shader: since we're crossfading either way, chasing an exact LCM elsewhere stops paying for itself.

The boat's node1→4 journey (20s) is the obvious narrative unit, and the beacon pulses coincidentally divide it exactly (20 / (5/9) = 36, integer). The dashed path (4.5s) does not (LCM(20, 4.5) = 180s — impractical, and moot given the water noise already forces a crossfade).

**Recommendation:** capture **T = 20s** (the boat's full journey). Crossfade — already required for the water — absorbs the dashed-path residual for free.

---

## Summary — final capture windows (post T-020 retuning), measured

| Shader | Window | Basis | Measured mean abs diff (0-255) | Crossfade needed? |
|---|---|---|---|---|
| Factory | 33.33s (100/3s exact) | LCM of 3 independent mechanical cycles | **0.0000** (max diff 1 — rounding noise) | **No** |
| Cartridge | ~6.283s (1× camera rotation, user's choice) | dominant visual (camera spin) | **0.0642** | **No** |
| Level-Up | 6.5s | shader's own designed cycle | **0.74** | **No** |
| Teamslead | 20s | boat's story journey | **4.4161** | **Yes, mandatory** — water/caustic noise is genuinely aperiodic, not fixable by retuning |

T-020 eliminated the crossfade requirement for 3 of 4 shaders by retuning source constants rather than patching the bake with a blend — confirmed empirically, not just by algebra, via `tools/shader-capture/capture.mjs`'s automated frame(0)-vs-frame(T) diff (T-016). Teamslead's water noise remains the one unavoidable exception, and its residual is now a measured number rather than a prediction. Remaining open item: a manual in-browser loop check for all 4, which needs actual browser access.
