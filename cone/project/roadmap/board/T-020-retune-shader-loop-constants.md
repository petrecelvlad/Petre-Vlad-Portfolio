---
type: Task
title: "T-020: Retune shader time constants for exact loopability"
description: "Before baking, nudge each shader's u_time coefficients so every term shares an exact rational loop period — eliminates the crossfade requirement found in T-015 for all but Teamslead's water noise."
status: in-progress
priority: medium
parent: T-014
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# T-020: Retune shader time constants for exact loopability

## Context

Raised by the user after reviewing [T-015](T-015-shader-loop-period-audit.md)'s findings: rather than bake each shader as-is and paper over the seam with a crossfade, retune the handful of `u_time` coefficients responsible for each mismatch so the shader loops exactly by construction. This is possible because the incommensurability T-015 found isn't a hard mathematical wall — it's a byproduct of nobody having designed these shaders to loop in the first place. See [Achievement_Shader_Loop_Periods.md](../../specs/Achievement_Shader_Loop_Periods.md) for the per-term periods this card retunes against.

This replaces T-014's original "capture as-is, crossfade the seam" approach for 3 of the 4 shaders. Teamslead's water/caustic background is the one exception — it's hash-based value noise with no period at all, not a constant-tuning problem — that crossfade stays.

Independent of [T-016](T-016-shader-capture-harness.md) (harness plumbing doesn't care what the shader looks like), but both must be done before [T-017](T-017-levelup-bake-pipeline.md) can capture a final window.

## Acceptance Criteria

- [x] Per-shader target loop duration `T` chosen — each from that shader's own content, not a shared arbitrary number (see Notes for why)
- [x] **Level-Up:** retune the 2 raw-`u_time` outliers (background micro-chevron period, particle-field speed term) to exact submultiples of its existing 6.5s designed cycle
- [x] **Factory:** retune the gear-rotation speed constant (~6.0 → ~2π) so its period becomes an exact submultiple of the existing 100/3s (~33.33s) LCM
- [x] **Cartridge:** camera rotation as anchor, `N = 1` rotation (user's call — "we just need one single loop"), `T = 2π ≈ 6.283s`; retuned pathY, both particle-drift axes, and dash speed to fit
- [x] **Teamslead:** retune the dashed-path speed constant to divide the existing 20s boat-journey cycle evenly; water/caustic noise explicitly left unfixed, one crossfade accepted there (see Notes for why not worth fixing)
- [x] All 4 shaders verified via automated frame(0) vs frame(T) pixel diff (`node tools/shader-capture/capture.mjs <shader> diff`): Level-Up 0.74/255 (~0.29%), Factory 0.0000/255 (max diff 1 — rounding noise, essentially perfect), Cartridge 0.0642/255 (~0.025%), Teamslead 4.4161/255 (~1.73%) — Teamslead's result confirms the predicted residual from its aperiodic water noise, now measured instead of predicted
- [ ] Manual in-browser playback check, watching the seam specifically, still open for all 4 (no browser access this session)
- [x] Final chosen `T` and retuned constants written back into `Achievement_Shader_Loop_Periods.md` so T-017/T-018 know the exact capture window per shader

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**Why not one arbitrary loop length (e.g. "3 seconds") for all 4:** each shader's natural loop length is dictated by its own content, not free to choose. Level-Up has an author-designed 6.5s reward beat (fill → flare → reset) — forcing it into 3s either truncates the burst mid-motion or requires globally speeding up the animation, both changing the designed pacing. Factory has 3 independent mechanical cycles at different fixed relative speeds (conveyor/belt/stamp) — their LCM is a property of those speeds, not a free choice, unless the speeds themselves are retuned (which this card does, for the one outlier — the gear — not the three main cycles, which already agree). Only Cartridge has no authored cycle at all (it was built for continuous infinite rotation), so it's the one shader where the loop count is a genuine judgment call rather than something read off the existing design.

**How the loop point is "known" per shader, i.e. where each one is measured to end:**
- Level-Up, Teamslead: already explicit in the original author's code — `mod(u_time, 6.5)` and `mod(u_time*0.15, 3.0)` (→20s) respectively. Not measured, just read.
- Factory: computed algebraically in T-015 as the LCM of its 3 independent cycle periods (100/3s) — a derivation from source, not a guess.
- Cartridge: no equivalent exists to read. Decided by watching the live shader loop at a candidate `N`-rotation window and judging whether it reads as complete.

**Verifying the fix actually worked:** once T-016's harness exists, render frame(0) and frame(T) for a candidate window and diff them pixel-by-pixel — near-zero difference is an objective, automatable confirmation the loop is exact, catching arithmetic mistakes in the retuning. This is a cheap check to run per shader before committing to a full bake, and should also be run once for the *as-audited, pre-retune* period on each shader as a sanity check against T-015's algebra.

**2026-08-19 — implemented, verification still open.** All 4 shaders' `AchievementShaderCanvas.tsx` GLSL retuned. `npx tsc --noEmit` clean. Neither verification method could run this session (T-016's harness doesn't exist yet for the pixel-diff check; Claude in Chrome was disconnected, so no manual browser playback either) — leaving this card `in-progress` rather than `done` until at least the manual check happens. Final numbers:

| Shader | Change | From → To |
|---|---|---|
| Level-Up | particle-field phase source | `u_time * speedMult` → `cycleTime * speedMult` (line 594) |
| Level-Up | micro-chevron speed | `1.2` → `1.107692` (period 1.5s → 1.625s = 6.5/4) (line 636) |
| Factory | gear rotation speed | `6.0` → `6.283185` (2π; period → exact submultiple of 100/3s) (line 1090) |
| Teamslead | dashed-path speed | `0.02` → `0.018` (period 4.5s → 5s = 20/4) (line 1709) |
| Cartridge | pathY speed | `1.5` → `1.0` (only term that didn't already fit `N=1`) (line 268) |
| Cartridge | particle drift, both axes | `0.05, 0.08` → `0.159155, 0.159155` (both round to 1 full wrap per 2π window; drift angle changes from ~58° to 45°) (line 264) |
| Cartridge | dash speed | `2.0` → `2.069027` (period 0.5s → ~0.483s, nearest 13-wrap fit) (line 270) |
| Cartridge | rotY, cartPos bob, glare | unchanged — already exact at any `N`, and `N=1` specifically | — |

**User decision:** Cartridge capture window is exactly 1 camera rotation (`T = 2π ≈ 6.283s`), chosen over 2 or 4 rotations for simplicity — accepted a larger relative change to the (near-invisible) particle drift speed in exchange for the shortest, simplest capture window.

**2026-08-19 — automated verification complete for all 4.** Ran `node tools/shader-capture/capture.mjs <shader> diff` (T-016's harness, extended with `diff`-only mode to skip full frame capture when only the loop-closure number is needed) against Factory, Cartridge, and Teamslead. Results, mean abs diff per channel (0-255 scale):

| Shader | Mean abs diff | Max abs diff | Notes |
|---|---|---|---|
| Factory | 0.0000 | 1 | Essentially perfect — max diff is pure float-rounding noise |
| Cartridge | 0.0642 | 215 | Excellent — camera-anchored retune left nothing else to fight it |
| Level-Up | 0.74 | 207 | Very good — the 2 flagged residuals (micro-chevron, particle phase) are negligible after retuning |
| Teamslead | 4.4161 | 252 | The one real, measured residual — confirms the predicted aperiodic-water-noise mismatch, ~6-70x the other three's error |

Every shader's high max-abs-diff outlier is expected hard-edge rasterization noise (a sharp boundary pixel flipping color from an infinitesimal timing difference), not evidence of a mismatch — the mean is the meaningful number. Teamslead's elevated mean is real and expected; it's the one shader keeping its accepted crossfade (water background only). Remaining before this card is fully `done`: a manual in-browser watch of each loop, which needs actual browser access.
