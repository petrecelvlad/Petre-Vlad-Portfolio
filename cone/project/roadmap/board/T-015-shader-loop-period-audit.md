---
type: Task
title: "T-015: Loop-period audit for the 4 achievement shaders"
description: "Confirm each shader's true composite loop period from its full GLSL source, not just the first mod(u_time, N) found."
status: done
priority: medium
parent: T-014
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# T-015: Loop-period audit for the 4 achievement shaders

## Context

First sub-task of [T-014](T-014-bake-achievement-shaders-to-video.md) — the proposal's Implementation Plan step 1. Must happen before the capture harness (T-016) is built, since it determines each shader's capture window length.

## Acceptance Criteria

- [x] Every `u_time`-scaled term in all 4 shaders read and classified (discontinuous `mod`/`fract` vs. continuous `sin`/`cos` vs. aperiodic noise)
- [x] True composite period computed per shader, not just the first modulo found
- [x] Findings written up with a recommended capture window per shader

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-19 — complete.** Full findings in [Achievement_Shader_Loop_Periods.md](../../specs/Achievement_Shader_Loop_Periods.md). Headline results:
- Level-Up and Teamslead each have an obvious "designed" cycle (6.5s, 20s respectively) that most terms key off cleanly, with 1-2 small background elements that don't divide evenly.
- Factory has no single obvious cycle but all its discontinuous terms are rational multiples of `u_time`, so an exact LCM exists: 100/3s (~33.33s) — the longest window of the four.
- Cartridge and Teamslead each contain elements that can never exactly loop (Cartridge mixes irrational sine periods with rational fract periods; Teamslead's water background is hash-noise, genuinely aperiodic) — a crossfade at the loop boundary is mandatory for both regardless of window choice, confirming the proposal's fallback guidance applies broadly here, not as a rare edge case.
- Cartridge's exact discontinuous-term LCM (100s) is driven by slow background particle drift, not by the shader's actual focal point (the rotating cartridge, ~6.28s/rotation) — recommended a shorter window sized to camera rotations instead, flagged as needing human confirmation before T-016.
