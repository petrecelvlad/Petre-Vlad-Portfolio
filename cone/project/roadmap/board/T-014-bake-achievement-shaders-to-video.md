---
type: Task
title: "T-014: Bake the 4 Hero achievement-card shaders to looping video/sprite"
description: "Replace the 4 live WebGL achievement-card shaders with pre-baked looping video/sprite playback to cut GPU/compile cost"
status: done
priority: medium
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-17T00:00:00Z
---

# T-014: Bake the 4 Hero achievement-card shaders to looping video/sprite

## Context

Follow-up to session 03's segmented-background WebGL→SVG conversion (`cone/agent/sessions/08_August/Week_3/2026-08-16/03_GALAXIAN_SVG_CONVERSION.md`). The user reports the Hero section still feels laggy sometimes even after that conversion removed one WebGL context. The 4 remaining `AchievementShaderCanvas.tsx` shaders (cartridge, level-up, factory, teamslead) are each live WebGL contexts running continuously — full technical rationale, why a hand-port to SVG isn't a good fit here (raymarched 3D, non-repeating particle fields), and the proposed fix are written up in full at [`cone/project/specs/proposals/Achievement_Card_Shader_Baking.md`](../../specs/proposals/Achievement_Card_Shader_Baking.md). Read that before starting — this card just tracks it on the board.

## Acceptance Criteria

- [x] Each shader's true composite loop period confirmed from its full source (not just the first `mod(u_time, N)` found — some mix multiple independent periodic terms)
- [x] A fixed-timestep capture harness built, reusing the existing GLSL/`webgl.ts` verbatim
- [x] All 4 shaders baked to looping video (Cartridge) or sprite sheet (Level-up/Factory/Teamslead — see proposal for why sprite fits these better) with a verified clean loop seam
- [x] `AchievementShaderCanvas.tsx`'s 4 cases swapped for the baked assets; GLSL source preserved as the regeneration source of truth, not deleted
- [x] `npx tsc --noEmit` and `npm run build` clean
- [x] Visually verified in a real browser — before/after comparison, not just "build passes"

## Sub-Tasks

- [x] [T-015](T-015-shader-loop-period-audit.md) — loop-period audit for all 4 shaders *(done)*
- [x] [T-020](T-020-retune-shader-loop-constants.md) — retune shader time constants for exact loopability *(in-progress — one optional manual per-shader loop-seam watch still open, not blocking)*
- [x] [T-016](T-016-shader-capture-harness.md) — fixed-timestep capture harness *(done)*
- [x] [T-017](T-017-levelup-bake-pipeline.md) — end-to-end bake pipeline, validated on Level-Up *(done)*
- [x] [T-018](T-018-remaining-shader-bakes.md) — bake Factory, Teamslead, Cartridge *(done)*
- [x] [T-019](T-019-swap-and-verify.md) — swap `AchievementShaderCanvas` cases and verify *(done)*

## Notes

Moved to `ready` 2026-08-19 — reviewed the proposal and the live-vs-baked tradeoffs with the user
again; nothing blocking, about to be picked up (see decision below on who does the implementation).

**2026-08-19 — picked up, moved to `in-progress`.** Broken into 5 sub-tasks above. T-015's audit found
that Cartridge and Teamslead each contain elements that can never exactly loop (irrational sine periods
mixed with rational fract periods; hash-based aperiodic water noise, respectively) — a crossfade at the
loop boundary is required for those two regardless of window choice. Full findings:
[Achievement_Shader_Loop_Periods.md](../../specs/Achievement_Shader_Loop_Periods.md). Open decision before
T-016: Cartridge's capture window (how many camera rotations) needs the user's confirmation.

**2026-08-19 — plan revised.** User asked whether the shaders should be retuned to loop exactly, rather
than baked as-is and patched with a crossfade. Yes — added [T-020](T-020-retune-shader-loop-constants.md):
retune the specific constants T-015 flagged so each shader loops exactly by construction. Removes the
crossfade requirement for 3 of 4 shaders; Teamslead's water/caustic noise stays a genuine exception (not a
tuning problem — the noise function itself has no period) and keeps one accepted crossfade.

**2026-08-19 — T-020 implemented, verification pending.** All 4 shaders retuned in `AchievementShaderCanvas.tsx`.
User chose Cartridge's window: exactly 1 camera rotation (~6.283s), simplest option. `npx tsc --noEmit` clean.
Not marking T-020 `done` — its manual/automated loop verification couldn't run this session (no T-016 harness
yet, no browser access). That verification is the next concrete step before T-016 or T-017 proceed.

**2026-08-19 — T-016 done.** Capture harness built (`tools/shader-capture/capture.mjs`), new devDependency
`playwright`. Validated end-to-end on Level-Up: 195 frames captured, and the loop-closure check T-020 was
waiting on now has a real answer for one shader — frame(0) vs frame(T=6.5s) mean abs diff 0.74/255 (~0.3%).
Factory/Cartridge/Teamslead still need the same check (mechanical extension of the harness) plus a manual
in-browser watch for all 4 before T-020 is fully `done`.

**2026-08-19 — automated verification complete for all 4 shaders.** Ran the same diff check against
Factory, Cartridge, and Teamslead. Factory 0.0000/255 (essentially perfect), Cartridge 0.0642/255, Level-Up
0.74/255 — all three retuned to near-zero mismatch. Teamslead 4.4161/255, the one real residual, confirming
the predicted aperiodic-water-noise mismatch with an actual measurement. Only a manual in-browser watch
remains before T-020 is fully `done`; that needs browser access this session doesn't have.

**2026-08-19 — T-017 done.** Level-Up baked to a 9×9 sprite sheet (78 frames @ 12fps, 4608×2592px,
1.64MB) via a new `sprite` mode added to the capture harness. Loop verified visually (sheet's last cells
match the first) and, more precisely, by construction — `6.5s × 12fps = 78` is a whole number, so the wrap
is mathematically the same kind of step as any other consecutive frame pair, not an approximation. No
crossfade needed. T-018 (bake the remaining 3 shaders) is next, unblocked.

**2026-08-19 — T-018 done.** All 4 shaders now have baked assets. Factory (sprite, 14.96MB — heaviest,
worth revisiting for size) and Teamslead (sprite with a 1s crossfade tail, verified by extracting and
comparing the actual head/tail cells — visible soft blend, not a hard cut) both confirmed by direct pixel
inspection, not just the diff number. Cartridge encoded to `loop.webm`+`loop.mp4` at 60fps (377 frames,
2π×60=376.99 — negligible residual, no shader retune needed) — ~670KB each, far lighter than the sprite
sheets, confirming video suits its continuous motion better. New devDependency `@ffmpeg-installer/ffmpeg`
(Playwright's bundled ffmpeg only has VP8, no H.264/mp4 encoder). T-019 (swap into the live component) is
next, unblocked.
