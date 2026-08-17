---
type: Session
title: "Session 03: Galaxian Background WebGL-to-SVG/CSS Conversion"
description: >
  Picked up session 02's handoff — converted the galaxian segmented-background from a
  WebGL shader to pure SVG/CSS, removed the now-single-option variant selector. Typecheck
  and build verified clean; visual confirmation in a real browser still pending.
tags: [session, backgrounds, svg, performance]
timestamp: 2026-08-16T00:00:00Z
---

# Session 03: Galaxian Background WebGL-to-SVG/CSS Conversion

## Metadata

- **Date:** 2026-08-16
- **Agent:** Claude Sonnet 5
- **Goal:** Continue session 02's `HANDOFF` — convert the surviving galaxian segmented-background variant from WebGL to SVG/CSS, eliminating one more WebGL context from Hero's first-paint cost.
- **Status:** COMPLETE ✅

---

## Tasks

- [x] Port the jagged comic-panel-divider math (`hash11`/`cellDrift`/`cellTilt`/`jaggedLine`) from GLSL to pure JS
- [x] Build a new SVG/CSS `SegmentedGalaxianBackground` component replacing `Segmented3ShaderBackground` for the `segmented3` background
- [x] Wire it into `Segmented3BackgroundStrategy.tsx` (full pass) and `Hero.tsx` (overlay pass)
- [x] Delete `Segmented3ShaderBackground.tsx` entirely (including the already-dead `draw3DPedestal()` and variants 0-3, which went with it)
- [x] Remove the now-single-option segmented-variant selector: `SEGMENTED_VARIANTS`/`SegmentedVariantId`/`segmentedVariant` from `SkinContext.tsx`, the dropdown from `Navbar.tsx`
- [x] `tsc --noEmit` and `vite build` both clean
- [x] Fix the mount-order stagger: column 1/2/dividers now carry real geometry on their very first paint instead of starting empty and waiting for an effect
- [x] Replace column 1's motif with a user-authored parallax cloud scene (`CloudColumnBackground.tsx`), fix the resulting skew via real-aspect-ratio measurement
- [x] Visual confirmation — Chrome automation was never available this session, but the user verified every visual change directly in their own browser/IDE across multiple iterations (mount-stagger fix, skew fix) and drove several of the corrections from what they observed
- [x] Set the floating island's default position (`offsetX: -18, offsetY: 190, scale: 1.1`)

---

## Decisions

- **Divider line: exact JS port, not a CSS clip-path approximation.** Asked the user directly (two options presented); user chose the exact port. Rationale: the organic multi-oscillator drift is the one part of this effect that's genuinely load-bearing to the site's look, and recomputing a ~48-point path once per frame is cheap enough that there's no real performance argument for the approximation.
- **Segmented-variant dropdown: removed entirely, not hidden.** Asked the user directly; user confirmed removal over keeping dormant plumbing. `SkinContext.tsx` no longer exports `SEGMENTED_VARIANTS`/`SegmentedVariantId`/`segmentedVariant`/`setSegmentedVariant`.
- **Rays/dots/sparkles: CSS-native techniques, not per-frame JS.** This matches session 02's already-agreed CSS/SVG split (see that session's Decisions section) — only the divider needed exact-math treatment; rays use a static SVG wedge `<g>` with a CSS `rotate` keyframe, dots use an SVG `<pattern>`, sparkles use CSS `translateY` keyframes with staggered `animation-delay`. None of these needed re-litigating this session.
- **Kept the existing `pass="full" | "overlay"` two-layer API** rather than collapsing to one component. Hero.tsx sandwiches `FloatingIslandBackdrop` between these two layers specifically so the divider strokes and column 2 art stay visually on top of the backdrop — same reason the original WebGL version used two passes. Preserves the existing z-index architecture in Hero.tsx with a minimal diff.
- **Fixed the column-1/2/dividers-vs-galaxian mount stagger by precomputing a real t=0 shape at module load, not by adding another deferred/synchronized-clock mechanism.** User reported column 3 (`GalaxianBackground`, plain static SVG) visibly appearing before columns 1/2 + the divider strokes. Root cause: the animated clip/stroke `<path>` elements started with no `d` attribute and only got one from a `useEffect` that runs after React's first paint — so there were two paints (empty, then geometry-set) where the old WebGL canvas effectively had one (draw happened synchronously inside its own mount effect too, but was masked by shader-compile time). Fix: compute the divider curve at time=0 once at module load (`INITIAL_EDGE1`/`INITIAL_EDGE2` and the derived `INITIAL_*_D` path strings in `SegmentedGalaxianBackground.tsx`) and set them as the paths' initial `d` prop, so every instance has correct geometry on its very first render — no empty-then-materialize gap, and no dependency on `useEffect` timing at all for the first frame. The `useEffect`/rAF loop still takes over immediately after to animate from there.

---

## Discoveries

- **Real bug caught during self-review, fixed before it shipped:** the first draft defined `<linearGradient id="segCol1Grad">`/`<linearGradient id="segCol2Grad">`/`<pattern id="segHalftone">` unconditionally in every instance's `<defs>`, regardless of `pass`. Since Hero.tsx mounts a `pass="full"` and a `pass="overlay"` instance simultaneously, this produced duplicate `id` attributes across two separate `<svg>` roots in the same document — `url(#id)` resolution with duplicate IDs is undefined behavior. Fixed by gating each `<defs>` entry to the pass that actually uses it (`src/components/backgrounds/SegmentedGalaxianBackground.tsx`).
- **The original two-pass shader's "overlay" trick (making column 1 transparent-except-divider-stroke) doesn't need porting.** As separate DOM/SVG elements rather than one full-screen shader, the same visual result — divider always on top of the island backdrop, column 2 always opaque over it — falls out naturally from ordinary z-index layering. The `pass="full"` layer only ever needs to draw column 1; the `pass="overlay"` layer only ever needs to draw column 2 + both divider strokes. Simpler than the shader's alpha-masking approach, same output.
- **Both layers independently run their own `requestAnimationFrame` loop with their own `startTime`, exactly like the original WebGL component did** (it was also mounted twice, once per pass, each with its own `useEffect`/`gl` context/`startTime`). The two clocks drift by microseconds, not perceptibly, for a slow organic animation — verified this was already the original's actual behavior before assuming a shared-clock mechanism was needed.

---

## Files Modified

- `src/components/backgrounds/segmentedDivider.ts` — new. Pure-function port of the GLSL divider math (`jaggedLineOffset`, `buildEdgeSamples`, `buildStrokePath`, `buildColumn1FillPath`, `buildColumn2FillPath`).
- `src/components/backgrounds/SegmentedGalaxianBackground.tsx` — new. SVG/CSS replacement for `Segmented3ShaderBackground`.
- `src/components/backgrounds/Segmented3ShaderBackground.tsx` — deleted (WebGL shader, all 5 variants + dead `draw3DPedestal()`).
- `src/components/backgrounds/strategies/Segmented3BackgroundStrategy.tsx` — renders `SegmentedGalaxianBackground` instead of the deleted shader component.
- `src/adapters/primary/components/Hero.tsx` — swapped import/usage to `SegmentedGalaxianBackground`; the galaxian-SVG layer's render condition dropped its now-gone `segmentedVariant === 'galaxian'` check (galaxian is the only look now, gated on `background === 'segmented3'` alone).
- `src/context/SkinContext.tsx` — removed `SEGMENTED_VARIANTS`, `SegmentedVariantId`, `segmentedVariant`, `setSegmentedVariant`.
- `src/adapters/primary/components/Navbar.tsx` — removed the segmented-variant `<select>` and its now-unused imports.
- `src/components/backgrounds/CloudColumnBackground.tsx` — new. Self-contained parallax pixel-cloud SVG scene, ported verbatim from user-authored `cone/project/reference/data/samples/clouds.md` (all ids/classes prefixed `cloud-` to avoid collisions). Nested `<svg viewBox="0 0 800 600" preserveAspectRatio="none">` so it drops into any clipped region and fills it.
- `src/components/backgrounds/SegmentedGalaxianBackground.tsx` — column 1's `pass="full"` content replaced: the purple gradient wash + rising star sparkles are gone, replaced by `<CloudColumnBackground />` inside the same `clipPath="url(#segCol1Clip)"` group. Removed now-dead `segCol1Grad` gradient, `SPARKLE_COUNT`/`STAR_PATH` constants, and the `segRise` keyframe/`.seg-sparkle` class. Also gained a `containerRef`/`ResizeObserver` pair (measuring real rendered aspect ratio) and a `containerAspect` prop passed to `CloudColumnBackground`.
- `src/context/IslandPositionContext.tsx` — `DEFAULT_ISLAND_POSITION` updated to `{ offsetX: -18, offsetY: 190, scale: 1.1 }` (was `{ offsetX: -18, offsetY: 200, scale: 1.3 }`), at the user's explicit direction.

---

## Addendum — Column 1 Replaced with User-Authored Cloud Animation

**Follow-up fix #1 (wrong diagnosis, corrected by fix #2 below):** the first cloud integration stretched the 800x600 `clouds.md` art non-uniformly to fill the full parent viewBox, then clipped the result to column 1's ~30% width — this skewed every cloud and only showed the leftmost 30% of the original layout. First attempted fix: size `CloudColumnBackground`'s own viewBox as a *square* (`800 / visibleWidthFraction`), reasoning that a square nested viewBox matches the parent's square `viewBox="0 0 1000 1000"` and cancels the stretch.

**Follow-up fix #2 — the actual root cause:** that reasoning was wrong. The parent's viewBox being "1000x1000" is irrelevant to skew — what matters is the *rendered pixel* aspect ratio of Hero, which is never square (it's a wide landscape banner) and is responsive besides. The outer `<svg preserveAspectRatio="none">` stretches its 1000x1000 viewBox non-uniformly onto that real, non-square pixel box; a nested square viewBox only cancels skew if the thing it's nested inside is *also* square in real pixels, which it never is here. Fixed properly by measuring Hero's actual rendered aspect ratio at runtime: `SegmentedGalaxianBackground` now holds a `containerRef` + `ResizeObserver` (same pattern as `TornPaperPanel.tsx`) tracking `getBoundingClientRect().height / width`, passed down as `containerAspect`. `CloudColumnBackground` now computes `viewBoxW = TARGET_VISIBLE_UNITS / visibleWidthFraction` and `viewBoxH = viewBoxW * containerAspect` — matching the nested viewBox's aspect ratio to Hero's *real* aspect ratio is what actually cancels the outer stretch, independent of any coincidental relationship to "1000x1000." Holds correctly across window resizes since the observer re-fires.

Also produced, at the user's direction, several rounds of iteration on `cone/project/reference/prompts/Segmented_3Column_SVG_Background_Prompts.md` (self-contained, project-agnostic prompts for generating column-1-style animations with a fresh agent) before the user hand-authored `clouds.md` themselves and asked to wire it in directly. Key correction from that iteration worth remembering for future prompt-writing in this project: prompts meant for an agent with zero access to this codebase must never reference file paths, component names, or internal implementation details (e.g. "column 2's rays sit at 0.15 opacity") — describe constraints and neighboring visual context in plain, self-contained terms instead. Also: don't prescribe a motion pattern when the ask is for creative variety across parallel agents — state the hard constraint (e.g. "must be a seamless bottom-to-top loop," "must use real multi-layer parallax") and leave everything else open.

---

## Closing Summary

Session complete — no handoff needed. Full WebGL-to-SVG/CSS conversion of the galaxian segmented background landed end-to-end: the shader is gone, column 1 now runs the user's own hand-authored parallax cloud animation (correctly scaled/unskewed via real-aspect-ratio measurement), column 2/dividers carry the ported divider math, and the now-single-option variant selector is fully removed. `npx tsc --noEmit` and `npm run build` are clean as of every change in this session. The floating island's default position was also updated per explicit user instruction.

**For whoever picks up backgrounds/Hero work next:** `src/components/backgrounds/SegmentedGalaxianBackground.tsx`, `segmentedDivider.ts`, and `CloudColumnBackground.tsx` are the live implementation; `src/adapters/primary/components/Hero.tsx` owns layer ordering/z-index. If the divider curve or cloud scaling ever needs re-deriving, both were ported/derived carefully in this session's diff (and session 02's) rather than guessed — check there before re-deriving from scratch.

---

*Last updated: 2026-08-17*
