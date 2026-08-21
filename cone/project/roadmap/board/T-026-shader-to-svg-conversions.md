---
type: Task
title: "T-026: Hand-author real SVG/CSS recreations for the remaining achievement-card shaders"
description: "One-by-one replacement of the SVG path's placeholders with real hand-authored animations, closely matching each live shader. All 4 (Factory from T-021, plus Level-Up, Teams Lead, Cartridge here) now have real SVG assets."
status: done
priority: medium
tags: [roadmap, task, hero, svg, achievements]
timestamp: 2026-08-21T00:00:00Z
---

# T-026: Hand-author real SVG/CSS recreations for the remaining achievement-card shaders

## Context

Follow-on to [T-021](./T-021-animation-path-switcher.md), which built the runtime shader/baked/svg
path switcher and shipped Factory's real SVG. The other 3 achievement cards (`cartridge`, `levelup`,
`teamslead`) were still rendering the generic `AchievementSvgPlaceholder` on the SVG path. The user
asked to convert the remaining shaders to hand-authored SVG one at a time, as close to the original
shader as possible, keeping the shader version intact as a reference (the path switcher already makes
that free — nothing to do there, just don't delete `AchievementLiveShaders.tsx`).

Unlike Factory (which started from an externally-generated draft in
`cone/project/reference/anims/factory/conveyer.md`), there was no external draft for the others — each
is authored directly off its corresponding function in `AchievementLiveShaders.tsx`, using
[SVG_Recreation_Prompts.md](../../specs/SVG_Recreation_Prompts.md) as supplementary plain-language
brief, not as the primary source of truth (the shader's actual cycleTime math wins when the two
disagree).

## Acceptance Criteria

- [x] All 3 remaining cards (`cartridge`, `levelup`, `teamslead`) have a real SVG asset wired into
      `AchievementShaderCanvas.tsx`'s `animationPath === 'svg'` branch, matching the
      `AchievementFactorySvg` pattern (self-contained static asset, `<img>`-rendered, zero JS)
- [x] Each recreation is verified live (Playwright screenshot sampling across the loop, since
      `mcp__claude-in-chrome__*` browser tools are still broken this session too — see
      [T-025](./T-025-cursor-gaze-broken-handoff.md)) before being called done
- [x] `tsc --noEmit` clean after each swap

## Sub-Tasks

- [x] Level-Up — `public/achievements/levelup-animated.svg`, wired via `AchievementLevelUpSvg`
- [x] Cartridge — `public/achievements/cartridge-animated.svg`, wired via `AchievementCartridgeSvg`
- [x] Teams Lead — `public/achievements/teamslead-animated.svg`, wired via `AchievementTeamsLeadSvg`

## Notes

**2026-08-21 — Cartridge done, all 4 conversions complete.** `CartridgeShaderCanvas` raymarches a
real 3D signed-distance-field box with a continuous 360° Y-axis spin — genuinely not reproducible in
CSS/SVG with correct perspective and face-occlusion (SVG doesn't support `preserve-3d`/`rotateY`
reliably, and a real-3D version would've had to break the "self-contained `.svg` asset" pattern the
other 3 use). Walked the user through the actual options (real CSS 3D via a non-SVG HTML component,
a flat face-swap/squash "flip card" illusion, or a no-full-turn wobble) before writing any code; user
picked **wobble, no full spin, front face only** — never reveals the back "MADE IN ROMANIA" panel,
stays on the alien-sticker face the whole time, explicitly to keep this cheap to render like the
other 3.

Body silhouette (box + 2 top notches), the sticker panel bounds, and the 8×8 alien bitmap are all
read directly off `mapCartridge()`/`getAlienPixel()` in the shader (not off
`SVG_Recreation_Prompts.md` Prompt 4, which specs the abandoned full-rotation approach). The shader's
`pLip` bottom extension turned out to be a Z-depth-only detail — its XY footprint is fully contained
inside the main box, so it's invisible from a straight-on front view and was correctly left out
rather than fabricated.

Depth illusion: a shared 4.2s keyframe cycle animates `scaleX` between 1 and 0.88 with
`transform-origin` alternating between the left edge (25%) and right edge (75%) — anchoring the scale
to one edge, rather than the center, makes the *other* edge visibly recede instead of both sides
shrinking symmetrically (symmetric center-anchored scaleX was tried first and just read as "getting
thinner," not "turning"). A thin `#B45309` (shader's own extrude/shadow color) sliver reveals on
whichever side is receding. First implementation nested the sliver rects inside the same scaled group
as the body, so they shrank/moved inward along with it instead of staying at the body's true outer
edge — moved them to be siblings of the scaled group instead, verified via zoomed edge crops at the
25%/75% marks that the correct sliver now shows on the correct receding side. Also layered a top
highlight / bottom-and-right shadow bevel directly on the flat gold body (classic pixel-art emboss
trick) for a baseline "chunky and dimensional" read even at the animation's rest pose, plus a
periodic diagonal glare sweep and a soft blurred outer-silhouette glow.

Since Cartridge was the last placeholder type, `AchievementSvgPlaceholder`/`PLACEHOLDER_STYLE` in
`AchievementSvgPlaceholders.tsx` are now unreachable dead code (`PlaceholderType` resolves to
`never`) — left in place since removing them wasn't in scope here.

Verified via a local Playwright script sampling the wobble cycle plus tight zoomed crops on both
edges at the 25%/75% keyframe marks, `console --errors` clean, `tsc --noEmit` clean.
`mcp__claude-in-chrome__*` still unavailable this session (same as T-025 and the other 3 cards).

**2026-08-21 — Teams Lead done.** Recreated `TeamsLeadShaderCanvas`'s 4-island archipelago map:
node positions, path segments and the hero's 3-leg walk (node1→2→3→4, instant reset to node1) all
pulled from the shader's `NODE1..4`/`tLoop` constants; badge colors follow the shader's per-index
rule (index 0,1 gold/completed, index 2 red/pulsing/current, index 3 gray/upcoming), including the
bobbing "!" notification callout on the current stage. The shader's FBM-noise coastlines aren't
reproducible as vector math, so islands use one hand-drawn irregular blob path (`#islandBlob`)
reused per island via `<use>` with per-instance rotate/scale for variety, layered sand-cliff-shadow
→ sand-top-with-foam-outline → grass-top to fake the 2.5D beveled-island look. First pass at this
blob (8 points, radius swinging 55-78px) read as a rounded square rather than round — user flagged
it looked too different from the shader's soft circular islands. Rebuilt with 12 points and a much
gentler radius profile (58-80px, mostly ±8px between neighbors) — reads as clearly round/organic now
without needing to reproduce the shader's exact FBM coastline math. Also fixed: island 4's cliff
shadow was pointing up-left instead of down-right like the other 3 — its `translate(5,14)` shadow
offset was nested inside the same group as its `rotate(200)` silhouette-variety rotation, so the
200° turn flipped the offset direction too. Rescoped every island so rotate/scale only ever applies
to the blob shapes, while the shadow's screen-space offset is applied in the outer, unrotated frame
— all 4 islands now shade consistently. Water caustics are approximated with a few slow-breathing
blurred
ellipses instead of true noise. No single 6.5s-style master loop this time — matches the shader's
own structure, where only the hero's walk is tied to a cycle (20s, `tLoop` at its original rate) and
everything else (beacon pulses, dash flow, badge breathing, notification bob, water shimmer) runs on
its own independent period, same as the source.

Verified via a local Playwright script sampling the dev server across the walk cycle plus zoomed
crops on individual badges/the mid-path hero token — all 4 islands, path, badge color-coding,
notification callout, and the hero token (subtle when co-located with a badge, matches the shader's
own hero/badge size ratio; clearly a distinct gold/red/white token over open water) all confirmed
rendering correctly, `console --errors` clean. `mcp__claude-in-chrome__*` still unavailable this
session (same as T-025/Level-Up).

**2026-08-21 — Level-Up done.** Recreated `LevelUpShaderCanvas`'s full 6.5s cycle: 8-segment
discrete-fill gauge with the yellow→orange→red ramp (colors computed directly from the shader's
`mix()` calls), escalating step-bump per segment, the two staggered ease-in chevron launches (3.10s /
3.38s, matching flight curves sampled at several points), the "LEVEL UP" pixel-outline text
slide/hold/retract, dashed flanking lines, drifting particles, twin shockwave rings, and a gold-coin
burst. All timing expressed as absolute `%` keyframes against a shared `animation: … 6.5s linear
infinite` timeline (same technique as `factory-animated.svg`'s gear/press timing), except purely
decorative continuous motion (particles, dash-scroll, coin/chevron drift) which — like the source
shader itself — runs on its own independent period rather than being phase-locked to the master loop.

Verified via a local Playwright script (`chromium-cli` isn't installed on this box) sampling the live
dev server across the loop: 8-tick fill order, reverse-empty order, and the chevron/text payoff window
all confirmed rendering correctly and in the right sequence, `console --errors` clean. Browser tools
(`mcp__claude-in-chrome__*`) were unavailable all session (same environment-level failure as T-025) —
this is the fallback path from `run`'s skill doc, not a new discovery.
