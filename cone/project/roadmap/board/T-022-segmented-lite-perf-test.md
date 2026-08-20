---
type: Task
title: "T-022: Segmented3 'Lite' background fork — remove per-frame SVG path rebuild"
description: "A frozen-geometry fork of SegmentedGalaxianBackground, set as the new default background, to test whether its per-frame requestAnimationFrame path rewrite was the source of Hero's remaining scroll-in/out sluggishness."
status: done
priority: medium
tags: [roadmap, task, performance, hero]
timestamp: 2026-08-20T00:00:00Z
---

# T-022: Segmented3 "Lite" background fork — remove per-frame SVG path rebuild

## Context

After [T-021](T-021-animation-path-switcher.md) confirmed (via real network evidence) that the achievement
cards cost nothing when an unselected path is chosen, the user still felt Hero lag when scrolling it in/out
of view. Reading the code (not guessing) found `SegmentedGalaxianBackground.tsx` — the background already
converted from WebGL to SVG in an earlier session — still runs a continuous `requestAnimationFrame` loop
that recomputes a 48-point wavy edge curve and rewrites an SVG `<path d="...">` attribute every frame, for
2 simultaneous instances (`pass="full"` + `pass="overlay"`, both gated by the same Hero-visibility
IntersectionObserver the achievement cards use — so it resumes at full intensity exactly when the user
scrolls Hero into view, i.e. exactly when the browser is already busy with scroll/compositor work).

This card is the fork built to test that hypothesis directly, not a permanent fix.

## Acceptance Criteria

- [x] A new background variant, `segmented3-lite`, forking `SegmentedGalaxianBackground` with the geometry
      frozen at its already-existing module-load-time static value — no `requestAnimationFrame` loop, no
      per-frame `setAttribute('d', ...)` calls
- [x] Set as the new default background (was `segmented3`)
- [x] Visually equivalent to the original at a glance (same jagged-edge composition, same cloud column,
      same rotating sunburst rays — those are pure CSS, untouched)
- [x] Quantified, not just felt: measured actual SVG path-attribute writes per second, lite vs. original

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-20 — scaffolding done, awaiting the user's felt-experience verdict.**

**New file:** `src/components/backgrounds/SegmentedGalaxianBackgroundLite.tsx` — a near-identical copy of
`SegmentedGalaxianBackground.tsx` with the `tick()`-driven `useEffect` deleted entirely. The static
`INITIAL_*` path values that component already computed at module load (originally just to avoid an
empty-path pop-in on first paint) become the *permanent* geometry here — nothing recomputes them again.
Kept the `ResizeObserver` (cheap, fires only on actual container resize, needed for `CloudColumnBackground`'s
aspect-ratio correction) and the sunburst rays' CSS `@keyframes` rotation (already compositor-only, not a
per-frame cost). Gave its `<clipPath>`/`<gradient>`/`<pattern>` ids a `segLite*` prefix distinct from the
original's `seg*` ids, since the anti-pattern this project already hit once — [duplicate SVG ids across
simultaneously-mounted instances](../../memory/ANTI_PATTERNS.md) — is cheap to avoid even though these two
variants are mutually exclusive today.

**Wiring (fork, not replacement — original `segmented3` still fully exists and selectable):**
- `SkinContext.tsx`: added `segmented3-lite` to `BACKGROUNDS`, changed the default `background` state
- `Segmented3LiteBackgroundStrategy.tsx` (new) + registered in `BackgroundStrategyRegistry.ts`
- `GlobalBackground.tsx`: the existing hero-only scoping (`segmented3` falls back to `wood` outside Hero)
  extended to also cover `segmented3-lite`
- `Hero.tsx`: the two `background === 'segmented3'` gates (GalaxianBackground column-3 layer, overlay pass)
  generalized to an `isSegmented` check covering both variants, with the overlay pass picking whichever
  component matches the active variant

**Measured, not assumed:** `tools/shader-capture/verify-segmented-lite.mjs` patches
`SVGPathElement.prototype.setAttribute` to count `d`-attribute writes over a fixed 2-second window, real
Playwright browser against the production preview build.

| Variant | `d` attribute writes / 2s |
|---|---|
| `segmented3-lite` (new default) | **0** |
| `segmented3` (original) | **112** |

Confirms the fork actually eliminates the per-frame DOM/geometry cost it was built to test — not just "no
rAF loop in the source," a real measurement that nothing is rewriting path geometry at runtime. Visually
equivalent in a screenshot (jagged edges, cloud column, rotating rays all present and correctly clipped).
`tsc --noEmit` and `npm run build` both clean.

**What this card can't measure:** whether removing this cost actually fixes the *felt* scroll sluggishness
is inherently perceptual — that's the user's call to make by using the site with `segmented3-lite` active.
If it does feel better, the natural next step is deciding whether to keep the original geometry-animated
`segmented3` at all, or promote a cheaper *animated* version (e.g. a slow CSS-only sway instead of full
per-frame recompute) as the real default rather than a fully frozen one. If it doesn't feel better, this
rules the segmented background out and the search for the remaining cost continues elsewhere.
