---
type: Task
title: "T-021: Runtime-switchable animation path for the 4 achievement cards"
description: "A Navbar dropdown lets the user pick Live Shader / Baked (MP4/PNG) / SVG for the 4 Hero achievement-card animations, each unselected path costing zero network/runtime resources until chosen."
status: done
priority: medium
tags: [roadmap, task, performance, hero, shaders]
timestamp: 2026-08-20T00:00:00Z
---

# T-021: Runtime-switchable animation path for the 4 achievement cards

## Context

Follow-up to [T-014](T-014-bake-achievement-shaders-to-video.md). After baking the 4 achievement-card
animations (video/sprite) and separately drafting [SVG recreation
prompts](../../specs/SVG_Recreation_Prompts.md) for an external model, the user wanted all 3
implementations kept side by side and switchable at runtime via a dropdown — live WebGL shader, the baked
mp4/png assets, and (once ready) hand-authored SVG/CSS — with a hard requirement: whichever path isn't
selected must cost the browser nothing, not just be invisible. Default path: SVG.

## Acceptance Criteria

- [x] A Navbar dropdown (matching the existing skin/background/plank-style selector pattern) switches all
      4 achievement cards between `svg` / `baked` / `shader` at once, default `svg`
- [x] Selecting "Live Shader" is the only path with real per-frame runtime cost (WebGL compile + draw) —
      its code must not be fetched or executed until selected
- [x] Selecting "Baked" only then fetches the mp4/png assets — never on an unselected page load
- [x] SVG path renders *something* now (simple placeholders), swappable for real animations later without
      touching the switching logic
- [x] Verified with real network-request evidence, not just visual inspection

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-20 — done.**

**The one piece that needed real engineering: the live-shader path.** Its cost isn't just bytes — it's
GLSL string weight *and* actual WebGL context/compile work, which conditional rendering alone doesn't
prevent (the code would still ship in the main bundle and could still be imported eagerly). Moved the 4
GLSL components (Cartridge/Level-Up/Factory/Teamslead — previously left in `AchievementShaderCanvas.tsx`
as an unused-but-present regeneration source per T-019) out into their own file,
`src/components/backgrounds/AchievementLiveShaders.tsx`, and load it via `React.lazy(() =>
import('./AchievementLiveShaders'))` wrapped in `Suspense`. Vite automatically splits a dynamic `import()`
into its own chunk — confirmed in the build output as a standalone `AchievementLiveShaders-*.js`
(69.19kB / 17.04kB gzip), not merged into the main bundle. The file move was done as a pure text-level
split (`sed`/Python, not read-and-retype through the assistant) specifically to avoid any transcription
risk in ~1800 lines of GLSL — verified byte-identical afterward by re-running the existing loop-closure
diff check against the new file location and getting the exact same number as before the move (0.7361/255
for Level-Up).

**The baked and SVG paths needed no code-splitting** — their cost is just asset fetches
(`<video>`/background-image), and browsers are already lazy about only fetching what's actually mounted.
Conditional rendering in the dispatcher is sufficient there.

**New files:**
- `src/context/AnimationPathContext.tsx` — new context, `'svg' | 'baked' | 'shader'`, default `'svg'`,
  mirrors the existing `SkinContext` pattern exactly (same shape, same `useX()` hook convention)
- `src/components/backgrounds/AchievementLiveShaders.tsx` — the 4 live GLSL components, moved verbatim,
  plus a small `LiveAchievementShader` dispatcher as the module's default export (what `React.lazy` needs)
- `src/components/backgrounds/AchievementSvgPlaceholders.tsx` — one component, 4 simple colored-circle +
  label placeholders (one per animation), explicitly marked as swap-out-later stand-ins

**Changed files:**
- `src/components/backgrounds/AchievementShaderCanvas.tsx` — dispatcher now reads `useAnimationPath()` and
  routes `cartridge`/`levelup`/`factory`/`teamslead` through one of the 3 implementations; the 5 unrelated
  canvas-2D shader types (`grid`/`plasma`/`matrix`/`polyhedron`/`animate`, used elsewhere, not part of this
  3-path system) are untouched
- `src/main.tsx` — wired `AnimationPathProvider` alongside the existing `SkinProvider`
- `src/adapters/primary/components/Navbar.tsx` — added the "Achievement Animation Path" `<select>`,
  identical styling/pattern to the 3 existing dropdowns already there
- `tools/shader-capture/capture.mjs` — `componentPath` updated to read GLSL from the new file location
  (confirmed working — see the byte-identical diff check above)

**Verification — real network evidence, not inspection:** `tools/shader-capture/verify-paths.mjs`
(Playwright against the actual `npm run preview` production build, request listener attached *before* each
dropdown change to avoid a timing miss):

| State | Shader chunk requests | Baked asset requests |
|---|---|---|
| Default page load (SVG) | **0** | **0** |
| After selecting "Baked" | **0** | **4** (levelup.png, factory.png, teamslead.png, cartridge.webm) |
| After selecting "Live Shader" | **1** (`AchievementLiveShaders-*.js`) | — |

Zero console/page errors across the whole run, including after the live shader path loads and renders.
Screenshots confirm all 4 cards render correctly in both the default SVG-placeholder state and the
live-shader state (side by side with the Navbar's new dropdown showing the active selection).
`tsc --noEmit` and `npm run build` both clean throughout.

**Next step, not part of this card:** swap `AchievementSvgPlaceholders.tsx`'s 4 placeholders for the real
hand-authored SVG animations as they come back from the prompts in
[SVG_Recreation_Prompts.md](../../specs/SVG_Recreation_Prompts.md) — no changes needed anywhere else when
that happens.

**2026-08-20 — Factory done.** First real animation swapped in: `AchievementFactorySvg` (new, in
`AchievementSvgPlaceholders.tsx`) renders `public/achievements/factory-animated.svg` — the artwork from
`cone/project/reference/anims/factory/factory_1.md` — via `<img>`, so the file's own CSS animations run
natively with zero JS. Two real bugs found and fixed in the source SVG, not just wiring:
1. Its native aspect ratio is 4:3 (800×600) with a drawn bezel around an inner 16:9 "screen" region
   (screen height 450 = 800×9/16 exactly — clearly deliberate) — `viewBox` narrowed to `0 50 800 450` so
   the asset crops to exactly that region with no further math needed.
2. A raw `&` inside a `<style>` block's CSS comment made the file invalid XML — browsers silently fail to
   render a malformed SVG loaded via `<img>` (shows as a broken-image icon, `naturalWidth`/`naturalHeight`
   both `0`), which first looked like a sizing bug and wasted a diagnostic pass before the real cause
   surfaced. See [Anti-Patterns](../../memory/ANTI_PATTERNS.md) for the write-up and the fast way to check
   this next time (navigate to the SVG's own URL directly, or `python3 -m xml.dom.minidom` it).

Level-Up, Cartridge, and Teamslead still show the generic placeholder — same swap-in pattern applies
whenever their real animations are ready.

**2026-08-20 — Factory's conveyor belt swapped for an alternate design.** User asked to replace just the
conveyor-belt subsystem (support legs, main belt frame + scrolling texture, gears/pulleys) in
`factory-animated.svg` with the equivalent from `cone/project/reference/anims/factory/conveyer.md`, leaving
the hopper, stamping press, blocks, and scoreboard untouched. Both designs target the identical footprint
(belt span x=130–670, gears at x=170/630) — clearly designed as a drop-in swap — so positions lined up with
no adjustment needed. Replaced: the `beltStripes`/`beltClip` defs → `belt-stripes` pattern + inline
`belt-clip` (conveyer.md's own placement, clipPath defined inside the group it clips — unusual but valid
SVG, kept faithful to the source); the `.rotate-gear`/`.belt-scroll` CSS → `.spin-gear`/`.scroll-belt`
(same gear speed, `--gear-dur` unchanged; belt scroll now `--belt-dur: calc(100s/40)` ≈0.833s, conveyer.md's
own speed — verified this is *also* an exact submultiple of the 33⅓s master loop, so the loop-closure
property from T-015/T-018 isn't broken by the swap). Validated with `python3 -m xml.dom.minidom` (still
well-formed) and a direct-URL screenshot (belt/gears render and animate correctly, blocks sit properly on
the new surface). Not yet re-baked to the sprite/mp4 path (T-018's pipeline) or re-verified for loop-closure
diff — this edit only affects the SVG path's asset.

**2026-08-20 — removed the top scoreboard banner.** User flagged the yellow-framed banner (with cyan/green
"LED meter" bars) at the top as redundant — the stamping press's own gantry sits directly behind/above it,
so it visually competed with the press for the same screen space. Removed the whole `<g id="scoreboard">`
block; also removed `.led-pulse-2`/`pulseLed2` (only ever used by the banner's green meter) but kept
`.led-pulse-1`/`pulseLed1`, since that one is shared with the hopper's status light and the bottom cabinet
LED — checked usages before removing anything, not just deleted the whole style block. Re-validated
well-formed XML, re-screenshotted (direct URL + the actual Hero card) — scene reads cleaner with the press
now unobstructed at the top.

**2026-08-20 — belt sped up 2x, blocks scaled 50% larger.** Both isolated to just what was asked:
- **Belt speed:** doubling required halving `--belt-dur`. In the process, found and fixed a real bug from
  the earlier conveyor swap — `--belt-dur` had been set to `calc(100s/40)` (2.5s) while the comment claimed
  0.833333s; the correct fraction for conveyer.md's actual `0.8333333s` value is `100s/120`, not `100s/40`
  (an algebra slip converting "40 cycles across the loop" into the `100/N` form). Fixed the baseline to
  `100s/120`, then doubled from *that* to `100s/240` (0.416667s) — still an exact submultiple of the
  33⅓s master loop (80 cycles, confirmed by division). `--gear-dur` (the wheels) is a separate variable,
  untouched, exactly as asked.
- **Block size:** wrapped each of the 4 blocks' visual content (body, bevels, face, "+1" text) in an inner
  `<g transform="scale(1.5)">`, leaving the outer `.block-group` — which carries the existing journey/squash
  animation — untouched. The blocks' own coordinate origin is already their bottom-center point (matches
  where they sit on the belt), so scaling around it grows the block upward/outward while keeping its "feet"
  planted on the belt surface, rather than needing to recompute belt-contact math by hand.

Re-validated well-formed XML, screenshotted (direct URL, two frames apart, and the actual Hero card) —
blocks are visibly larger and still correctly seated on the belt.
