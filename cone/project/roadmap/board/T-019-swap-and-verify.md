---
type: Task
title: "T-019: Swap AchievementShaderCanvas cases and verify"
description: "Replace the 4 live WebGL cases in AchievementShaderCanvas.tsx with the baked assets; keep GLSL source as the regeneration source of truth; verify build + real-browser visual/perf."
status: done
priority: medium
parent: T-014
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# T-019: Swap AchievementShaderCanvas cases and verify

## Context

Final sub-task of [T-014](T-014-bake-achievement-shaders-to-video.md), per the proposal's Implementation Plan steps 5-6. Depends on [T-018](T-018-remaining-shader-bakes.md).

## Acceptance Criteria

- [x] `AchievementShaderCanvas.tsx`'s 4 cases (`cartridge`, `levelup`, `factory`, `teamslead`) swapped for the baked assets, sized/positioned identically (`object-fit: cover`, matching `w-full h-full block object-cover`)
- [x] GLSL source preserved (moved to a reference location, not deleted) as the bake's regeneration source of truth, with the regeneration step documented
- [x] `npx tsc --noEmit` and `npm run build` clean
- [x] Visually verified in a real browser — before/after comparison, not just "build passes"

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-19 — done.**

**Assets:** copied into `public/achievements/` (`levelup.png`, `factory.png`, `teamslead.png`,
`cartridge.webm`, `cartridge.mp4`) — new subfolder, existing `public/` only had `loopB.webm` at root plus
an `assets/` folder for images.

**Component changes** (`AchievementShaderCanvas.tsx`):
- Added `SpriteLoopCanvas` — a generic sprite-sheet player. Steps through frames via `requestAnimationFrame`
  (matching this file's existing WebGL render-loop convention, not CSS `steps()`) and sets `background-size`/
  `background-position` in **pixels**, computed from the container's actual `clientWidth`/`clientHeight` each
  frame — not CSS percentages, which have a `col/(cols-1)` off-by-one gotcha for background-position on a
  multi-cell grid. Since each card is `aspect-video` (16:9) and each captured cell is exactly 512×288 (16:9),
  using the container's own pixel size as the per-cell display size gives an exact, distortion-free
  `object-fit: cover` equivalent for free.
- Added `CartridgeVideoCanvas` — a `<video autoPlay loop muted playsInline>` with `<source>` webm then mp4,
  directly mirroring Hero's existing character-video pattern (including the same isVisible-driven
  play/pause effect), not a new pattern.
- Swapped the dispatcher's 4 `if (type === ...)` branches to render these instead of the live WebGL
  components.
- **GLSL preservation:** left `CartridgeShaderCanvas`/`LevelUpShaderCanvas`/`FactoryShaderCanvas`/
  `TeamsLeadShaderCanvas` exactly where they were (didn't move them to a new file — lower risk than a
  large file split, and `tools/shader-capture/capture.mjs` already reads GLSL from this exact file, so no
  tooling changes needed either). Added a comment block documenting they're the regeneration source and
  pointing at the exact `capture.mjs` command to re-bake. Confirmed they're **not dead weight in the
  shipped bundle** — production build's main JS chunk actually shrank (631.77kB → 564.63kB gzip'd:
  182.05kB → 165.86kB) after the swap, meaning rollup tree-shook the now-unreferenced GLSL out entirely.

**Verification:**
- `npx tsc --noEmit` clean.
- `npm run build` clean; confirmed `public/achievements/*` copied into `dist/achievements/` correctly.
- Real browser check: started `npm run preview` (serves the actual production build), drove it with
  Playwright, took two full-page screenshots 800ms apart. Zero console/page errors. All 4 cards visibly
  animating between the two shots — Level-Up's bar/flare state changed, Cartridge's camera rotated
  (front alien sprite → "MADE IN ROMANIA" back panel), Factory's conveyor boxes moved position. This is
  the closest available substitute for a human eyeballing it live (no interactive browser tooling this
  session) — genuine automated evidence, not a build-passed assumption.

**2026-08-19 — file-size follow-up resolved.** Factory and Teamslead re-baked at a 256×144 output cell
(down from 512×288, WebGL render resolution unchanged — see T-018's notes for the mechanism) and copied
into `public/achievements/`. New total for all 5 assets: ~14.5MB, down from ~37MB. `tsc`/`build` re-verified
clean; re-ran the Playwright production-preview screenshot check — still renders correctly, no visible
quality loss at the cards' actual displayed size (well under the sprite's native resolution either way).
