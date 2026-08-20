---
type: Task
title: "T-024: Segmented3 'Banded' background fork — transform-only sway (REVERTED)"
description: "A fourth segmented-background fork: divider edges sliced into 5 independent static bands, each swayed via CSS transform only — genuinely as cheap as the fully-frozen variant, continuously, since transforms never touch layout."
status: done
priority: medium
tags: [roadmap, task, performance, hero]
timestamp: 2026-08-20T00:00:00Z
---

# T-024: Segmented3 "Banded" background fork — transform-only sway

## Context

Follow-up to [T-023](T-023-segmented-loop-perf-test.md). The user reported the SMIL-based looped fork
reintroduced some stagger versus the fully-static version. Root cause, on reflection: SMIL removed the
JS-side computation but `calcMode="linear"` still continuously interpolates the path `d` attribute every
rendered frame — and rendering a changed SVG path goes through the same expensive layout/geometry pipeline
regardless of whether JS or the browser's own SMIL engine requested the change. "Zero JavaScript" was true
but not the same claim as "zero cost."

Presented 3 options read-only (discrete SMIL snapping, transform-only sway on a static path, and a
banded/segmented version of the transform approach for richer motion). User picked the banded option.

## Acceptance Criteria

- [x] Divider edge geometry (`d` attribute) is computed once at module load and **never** animated again,
      by any mechanism — no rAF, no SMIL, nothing touches `d` after mount
- [x] Visible organic motion via CSS `transform` (compositor-only, never touches layout) on a handful of
      independent static segments, so different regions of the divider sway out of phase
- [x] Set as the new default background
- [x] Verified: 0 JS-side `d` writes (same instrumentation as T-022/T-023) + visual confirmation of
      genuine, independent per-band motion

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-20 — done.**

**New file:** `src/components/backgrounds/SegmentedGalaxianBackgroundBanded.tsx`. Each divider edge (49
points) is sliced into `BAND_COUNT = 5` contiguous chunks, adjacent chunks sharing their boundary point (so
there's no gap when all bands are at rest). Each band becomes its own static `<path>` — for the column-fill
clip paths, a closed band-local polygon (left/right border + this band's slice of the curve); for the
overlay pass's decorative stroke lines, just `buildStrokePath` on the chunk directly (already exported from
`segmentedDivider.ts`, no changes needed there). Each band gets a CSS `transform: translateX(...)` sway via
one shared `@keyframes segBandSway` rule, driven per-band by a CSS custom property (`--seg-band-amp`) plus
per-band `animationDuration`/`animationDelay`, deterministically varied by band index so they don't move in
lockstep (that would look identical to the single rigid sway option one level down).

**Deliberate, not a bug:** adjacent bands drift out of phase, so a slight kink is visible at each band seam
when their sway diverges. This is called out explicitly in the file's own `@propolis` block — it's a
low-fidelity echo of the original noise function's own per-cell "kink" discontinuities (see
`segmentedDivider.ts`'s `kinkPoint`/`kinkWidth` logic), not something to try to hide.

**Wiring:** same pattern as T-022/T-023 — `SkinContext.tsx` (`segmented3-banded` added, now default),
`Segmented3BandedBackgroundStrategy.tsx` (new, registered), `GlobalBackground.tsx`/`Hero.tsx`'s
segmented-variant checks extended to include it.

**Verified, not assumed:**
- `tools/shader-capture/verify-segmented-banded.mjs`: **0 JS-side `d`-attribute writes over 2s** —
  matches the fully-static variant's number, confirming nothing (not even SMIL this time) is touching path
  geometry after mount.
- Two screenshots 3 seconds apart show real, independent per-band motion — comparing the divider near the
  character's shoulder vs. its lower body confirms they're visibly out of phase, not moving as one rigid
  shape.
- Zero console/page errors. `tsc --noEmit` and `npm run build` both clean. Bundle cost: **+4.2kB
  (~0.6kB gzip'd)** on the main chunk — smaller than T-023's, since band data is just 5 short static
  strings rather than a 30-pose animated list.

**2026-08-20 — reverted at the user's request.** The user tried it and reported it looked bad and broke
other things; asked for an immediate revert rather than a debugging cycle. Reverted cleanly: deleted
`SegmentedGalaxianBackgroundBanded.tsx` and `Segmented3BandedBackgroundStrategy.tsx`, removed all wiring
(`BackgroundStrategyRegistry.ts`, `GlobalBackground.tsx`, `Hero.tsx`, `SkinContext.tsx`), default background
reverted to `segmented3-loop` (T-023's state). Verified the revert is byte-identical to the pre-T-024 build
— same output chunk hash (`index-MxTZjHww.js`) as T-023's own build. Did not attempt to diagnose what
specifically "broke other stuff" before reverting, per the user's explicit ask to stop and revert rather
than keep iterating — if that diagnosis becomes relevant later, the deleted code is still recoverable from
this session's history (nothing was ever committed, but the file contents are preserved in this card's
sibling session log).

Board now has 3 segmented-background variants again: `segmented3` (original, live, 112 writes/2s),
`segmented3-lite` (frozen, 0 writes/2s, zero motion — the only one the user has unambiguously confirmed both
fixes the lag *and* looks right), `segmented3-loop` (SMIL, 0 JS writes/2s but still some felt stagger from
continuous browser-side interpolation, current default). The banded approach is not recommended for reuse
without first understanding what visually broke — flagged in
[ANTI_PATTERNS.md](../../memory/ANTI_PATTERNS.md) is the *performance* lesson from this card, not a
visual-correctness one; that gap is still open.
