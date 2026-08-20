---
type: Spec
title: "Agent Brief: Rebuild GamePlaque as SVG (3 alternatives)"
description: >
  Handoff brief for a fresh agent to rebuild GamePlaque.tsx's shape from scratch. Two prior
  attempts (hand-coded SVG path, then a trapezoid-taper patch) both shipped visually wrong or
  unsatisfying despite passing typecheck and matching the written spec's numbers. This brief
  asks for three independent implementation attempts so at least one is visually correct.
tags: [spec, brief, hero, ui-component, handoff]
timestamp: 2026-08-17T00:00:00Z
constraints:
  - Do not trust hand-derived pixel measurements of image.png/image copy.png as ground truth —
    they have already produced contradictory readings across multiple attempts (see
    GAME_PLAQUE.md §2's "measurement honesty" note). Judge correctness by live visual
    comparison, not by matching written numbers.
  - No gradients anywhere in this component, no exceptions — see GAME_PLAQUE.md §0.
agent_instructions: >
  Read this whole file before writing any code. Build all three alternatives (§Alt A/B/C) as
  three separate, independently-viewable outputs — do not pick one up front and only build that
  one. Screenshot each against the reference before reporting back.
---

# Agent Brief: Rebuild GamePlaque as SVG

## Why this brief exists

`GamePlaque.tsx` (`src/components/atoms/GamePlaque.tsx`) is a small banner/tab UI element in the
Hero section, styled after a mobile-game "role" plaque. It has been implemented twice already
this project — once as a rounded-rectangle SVG path, once patched into a tapered trapezoid — and
both times the result was judged wrong or ugly by the person who has to look at it, despite
type-checking cleanly and technically matching the numbers written down in
`cone/project/architecture/systems/GAME_PLAQUE.md`. That doc is worth reading for context (shape
history, color values, why it's SVG not CSS) but **do not treat its coordinates as gospel** — this
is now its third attempted correction, and pixel-measurement of the reference crop has repeatedly
produced contradictory results. What matters is: does it look right, side by side with the
reference image, to a human looking at a screenshot.

## The task

Rebuild the shape construction inside `GamePlaque.tsx` — a flat-color banner with an integrated
top tab holding a "ROLE" label — so it visually matches `image.png` (project root, a 601×150px
crop of a mobile game's "WEEKLY MISSIONS" banner) as closely as reasonably achievable. Keep the
component's existing external contract: same props (`children`, `label`, `className`, plus the
color/geometry props already on the component), same consumer
(`src/adapters/primary/components/AnimatedRoleTitle.tsx`, unchanged), same general role inside
`Hero.tsx`. Only the internal shape construction is in scope.

**Known constraints, already settled — do not re-litigate these:**
- No CSS gradients anywhere in this component (flat color bands or SVG only). See
  `GAME_PLAQUE.md` §0.
- The shape is a tapered trapezoid, not a rounded rectangle: **wide at the top (where the tab
  sits), narrowing toward the bottom** — like a funnel pointing down. This direction was
  corrected directly by the project owner after visual review and should not be re-derived from
  pixel-scanning the reference crop again.
- The tab merges into the banner's top edge via a concave fillet (the tab's sides flare outward
  as they descend into the banner, not a square corner).
- Flat color bands only: a lighter top-highlight strip, the mid-tone face, a darker
  bottom-undershadow strip. No smooth blends.

**What's actually still open:** the *quality* of the curve — does the fillet read as one smooth
molded piece or as two shapes crudely touching, does the taper look intentional or accidental,
does the overall silhouette read as polished "game UI" or as a rough approximation. That's what
went wrong both previous times, and that's what these three alternatives are meant to fix by
giving three different ways of getting there.

## Build all three, not just one

Create three separate, directly comparable outputs — for example three variants of the component
(`GamePlaqueAltA`, `GamePlaqueAltB`, `GamePlaqueAltC`, or equivalent storybook-less isolated
render) that can each be screenshotted independently against `image.png`, so the outcome is a
side-by-side choice, not a single bet. Do not skip straight to "the one that seems best" —
build all three far enough to screenshot and compare, then report which one(s) actually match.

### Alt A — Manual vector tracing, screenshot-driven iteration

Hand-author a single continuous SVG `<path>` (lines + cubic/quadratic beziers, not just arcs) by
treating this as tracing a reference image, not computing coordinates from written specs. Loop:
render at the component's actual size → screenshot it next to a crop of `image.png` → adjust
control points → repeat, until the silhouette (especially the tab-to-banner fillet) visually
reads as one smooth molded shape. This is the most likely to get a faithful curve because it's
visually driven end to end, but it's manual and slower.

### Alt B — Primitive composition with a boolean/goo merge

Build the banner body as one simple shape (a flat-sided trapezoid or rounded polygon — straightforward
corner arcs, no hand-tuned fillet math) and the tab as a separate simple rounded shape positioned
overlapping the banner's top edge. Merge them into one seamless silhouette mechanically — either
an SVG boolean union (e.g. via a path-boolean utility/library) computed once and baked into a
static path, or a "goo"/metaball-style filter (`feGaussianBlur` + `feColorMatrix` threshold) at
render time. This trades hand-tuned bezier precision for letting the merge operation produce the
fillet, which may look more organic with less manual tuning — but confirm the filter approach
doesn't blur the crisp outline the rest of the site's chrome uses; bake to a static path if it
does.

### Alt C — Traced from the source image programmatically

Extract the actual banner outline from `image.png` with code, not eyeballing: threshold/segment
the banner's pixels (Python + Pillow/OpenCV or equivalent), run contour extraction (e.g. marching
squares), simplify the resulting polygon and fit a smooth bezier path to it (a curve-fitting /
path-simplification step — many small libraries do this, e.g. `svg-path-simplify`,
`potrace`-style tracing, or a manual Ramer–Douglas–Peucker pass plus corner smoothing). Normalize
the traced coordinates to the component's own coordinate space. This removes human judgment from
the curve shape entirely — the risk is that it faithfully traces this specific low-resolution
crop's compression artifacts and anti-aliasing rather than the "true" intended shape, so sanity
check the result doesn't look noisy or overly organic.

## Verification — required before reporting back

For each alternative: start the dev server (`npm run dev`), render it in the actual Hero context
(or an isolated equivalent at the same size), take a real screenshot, and visually compare it
against `image.png` and the "GAME 1" plaque crop in `image copy.png`. A `tsc --noEmit` pass is
necessary but nowhere near sufficient — both prior attempts type-checked fine and still looked
wrong. Report back with the three screenshots side by side with the reference, plus your own
read on which one(s) are usable.

## Where this is wired in

- `src/components/atoms/GamePlaque.tsx` — the component. Props stay the same shape as they are
  now (see the file for the current prop list); only the internal `outlinePath`/rendering
  construction is in scope.
- `src/adapters/primary/components/AnimatedRoleTitle.tsx` — the only consumer:
  `<GamePlaque label="ROLE">...</GamePlaque>`. Do not change this file.
- Rendered inside Hero's middle column, directly under the "VLAD PETRE" title — see `Hero.tsx`.
- Color values, band technique, and full shape history: `cone/project/architecture/systems/GAME_PLAQUE.md`.
