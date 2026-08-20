---
type: Task
title: "T-023: Segmented3 'Looped' background fork — precomputed SMIL animation, motion with zero per-frame JS"
description: "A middle-ground fork between the fully static segmented3-lite and the expensive live segmented3: precomputes a fixed set of wavy-edge poses once and hands them to the browser's native SVG SMIL <animate> engine, keeping visible motion with zero per-frame JavaScript."
status: done
priority: medium
tags: [roadmap, task, performance, hero]
timestamp: 2026-08-20T00:00:00Z
---

# T-023: Segmented3 "Looped" background fork — precomputed SMIL animation

## Context

Follow-up to [T-022](T-022-segmented-lite-perf-test.md). The user confirmed the fully-static `lite` fork
did fix Hero's scroll-in/out sluggishness — but didn't want a static background either. Asked for a middle
ground: real motion, but "a fixed predictable loop that doesn't require constant computation." Presented as
options (see session log); the user chose option 1 — precompute a fixed pose set once, play it back via
native browser animation instead of continuous JS recomputation.

## Acceptance Criteria

- [x] A new background variant, `segmented3-loop`, keeps the organic wavy-edge motion but computes it
      once at module load instead of every frame
- [x] Loop closes exactly by construction (first pose repeated as the last in the values list), not by
      finding a true mathematical period
- [x] Zero JavaScript runs per frame — motion is driven entirely by the browser's native SVG `<animate>`
      (SMIL) engine
- [x] Set as the new default background
- [x] Verified with the same instrumentation used for T-022 (path-write counting) plus a visual
      before/after to confirm real motion despite zero JS involvement

## Sub-Tasks

<!-- none — this is a leaf card -->

## Notes

**2026-08-20 — done.**

**New file:** `src/components/backgrounds/SegmentedGalaxianBackgroundLooped.tsx`. Precomputes 30 poses of
each wavy edge across a 10-second window (`POSE_COUNT = 30`, `LOOP_SECONDS = 10` — arbitrary, tunable
constants, not derived from the underlying wave math's "true" period) using the exact same
`buildEdgeSamples`/`buildColumn1FillPath`/etc. functions the original component already uses — no new math,
just called once per pose instead of once per frame. Each pose array gets its first entry appended again at
the end before being joined into a SMIL `values` string — this is what makes the loop exact: the animation
returns to a literally identical shape, not an approximately-matching one, regardless of whether the
underlying wave function is "truly" periodic at 10s (it isn't — same kind of hash-driven, multi-frequency
mix as the achievement shaders had before T-020, but here we don't need a closed-form period at all, just a
deliberately closed loop).

**Why this needed no new tooling:** unlike the achievement shaders (which had to be captured via headless
browser + ffmpeg into video/sprite files), this is small enough to precompute directly in the component
file at module load, in plain TypeScript — no `tools/shader-capture` involvement, no external assets, no
`public/` files. Bundle size cost: **main JS chunk grew by ~3.7kB (~0.45kB gzip'd)** — far smaller than
initially estimated, because the pose-string text (many small numeric path commands) compresses very well.

**Verified, not assumed:**
- `tools/shader-capture/verify-segmented-loop.mjs` (same `SVGPathElement.prototype.setAttribute`
  instrumentation as T-022): **0 JS-side `d`-attribute writes over 2s** — identical to the fully-static
  `lite` variant's number, confirming no JavaScript drives this animation at all.
- Two screenshots 3 seconds apart show the divider's jagged shape has visibly, genuinely changed (compare
  the curve near the character's shoulder) — real motion despite the zero-JS measurement above. This
  distinction (visibly animating, zero script involvement) is the entire point of using native SMIL instead
  of a JS-driven pose swap.
- Zero console/page errors. `tsc --noEmit` and `npm run build` both clean.

**Board now has 3 segmented-background variants selectable from the same dropdown for direct comparison:**
`segmented3` (original, live per-frame recompute, 112 writes/2s), `segmented3-lite` (T-022, frozen, 0
writes/2s, no motion), `segmented3-loop` (this card, 0 writes/2s, real motion). All three remain available;
this one is just the current default.

**Open, not this card's to answer:** whether the *felt* motion quality is close enough to the original for
the user's taste — `POSE_COUNT`/`LOOP_SECONDS` are easy follow-up tuning knobs (more poses = smoother
interpolation at more bundle-size cost; longer loop = motion feels less repetitive at the cost of a bigger
`values` list) if the current numbers don't land right.
