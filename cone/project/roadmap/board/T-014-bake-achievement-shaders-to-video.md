---
type: Task
title: "T-014: Bake the 4 Hero achievement-card shaders to looping video/sprite"
description: "Replace the 4 live WebGL achievement-card shaders with pre-baked looping video/sprite playback to cut GPU/compile cost"
status: backlog
priority: medium
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-17T00:00:00Z
---

# T-014: Bake the 4 Hero achievement-card shaders to looping video/sprite

## Context

Follow-up to session 03's segmented-background WebGL→SVG conversion (`cone/agent/sessions/08_August/Week_3/2026-08-16/03_GALAXIAN_SVG_CONVERSION.md`). The user reports the Hero section still feels laggy sometimes even after that conversion removed one WebGL context. The 4 remaining `AchievementShaderCanvas.tsx` shaders (cartridge, level-up, factory, teamslead) are each live WebGL contexts running continuously — full technical rationale, why a hand-port to SVG isn't a good fit here (raymarched 3D, non-repeating particle fields), and the proposed fix are written up in full at [`cone/project/specs/proposals/Achievement_Card_Shader_Baking.md`](../../specs/proposals/Achievement_Card_Shader_Baking.md). Read that before starting — this card just tracks it on the board.

## Acceptance Criteria

- [ ] Each shader's true composite loop period confirmed from its full source (not just the first `mod(u_time, N)` found — some mix multiple independent periodic terms)
- [ ] A fixed-timestep capture harness built, reusing the existing GLSL/`webgl.ts` verbatim
- [ ] All 4 shaders baked to looping video (Cartridge) or sprite sheet (Level-up/Factory/Teamslead — see proposal for why sprite fits these better) with a verified clean loop seam
- [ ] `AchievementShaderCanvas.tsx`'s 4 cases swapped for the baked assets; GLSL source preserved as the regeneration source of truth, not deleted
- [ ] `npx tsc --noEmit` and `npm run build` clean
- [ ] Visually verified in a real browser — before/after comparison, not just "build passes"

## Sub-Tasks

<!-- none yet -->

## Notes

Not yet prioritized/started — `backlog`, not `ready`. The user asked for this to be documented for whoever picks it up next, not implemented in this session.
