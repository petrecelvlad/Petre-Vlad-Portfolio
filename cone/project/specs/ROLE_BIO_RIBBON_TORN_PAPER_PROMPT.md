---
type: Spec
title: "Standalone prompts: candy-banner ribbon fused onto the shipped torn-paper panel (2 variants)"
description: >
  Two self-contained prompts, each meant to be copy-pasted on its own into an unrelated tool/agent
  with no access to this project. Both combine two real reference sources instead of inventing a
  shape from scratch: the "GAME PRODUCER" ribbon banner from a model-generated sample
  (`cone/project/reference/data/samples/candy_banner.md`, its `title-ribbon` group only — no badge,
  no scroll caps, no "ROLE" pill, nothing else from that file) fused onto the torn-paper panel
  already shipped in production (`src/components/atoms/TornPaperPanel.tsx`). Prompt 1 is fully
  prescriptive (exact geometry/colors) and reliably produces the two pieces correctly but keeps
  breaking the same way at the seam between them. Prompt 2 is a high-level rewrite that names the
  seam as the actual problem to solve and leaves technique/geometry to the agent's judgment — try
  it when Prompt 1's precision is producing a broken connection point. Supersedes
  `ROLE_BIO_SCROLL_TORN_PAPER_PROMPT.md` — the scroll-cap idea is dropped in favor of this ribbon.
tags: [spec, brief, standalone-prompt]
timestamp: 2026-08-26T00:00:00Z
---

# Prompt 1 — Prescriptive (exact geometry)

Copy everything between the lines below into a separate tool/agent.

---

Design and build a single SVG UI panel for a friendly, colorful mobile game's hero/profile screen.
It sits in a narrow-to-medium vertical column, below a large name title (not part of what you're
building — leave clear space above for it) and above a call-to-action button (also not part of
what you're building — leave clear space below for it).

This panel is an assembly of exactly two elements, described in full detail below — **do not add
anything beyond these two**: no separate badge/medallion, no "ROLE" label anywhere, no rolled
scroll caps, no extra inner frame, no decorative stars/gems/sparkles.

## Element 1 — the ribbon banner (reproduce this shape/style closely)

A wide horizontal ribbon banner reading **"GAME PRODUCER"**, in this exact style:

- **Silhouette:** a rounded rectangular main body, with both left and right ends flaring outward
  into a classic **swallow-tail ribbon cut** — each end extends past the main rectangle and is
  notched with a shallow inward V, the way a medal ribbon or banner flag end looks. Each tail is
  built from two overlapping layers: a **back tail piece** (a simple triangle, pointing outward,
  peeking out from behind) in a darker shade, and a **front tail piece** (with the V-notch cut into
  its inner edge) in a slightly lighter shade than the back piece but still darker than the ribbon's
  main face — this two-layer offset is what gives the fold its depth.
- **Shading (flat bands, not gradients):** the main rectangular body is drawn as two stacked flat
  shapes of the same rounded-rect silhouette — a darker "rim" rectangle sitting a few pixels lower,
  with a brighter main-color rectangle on top of it — so a thin flat darker band shows along the
  bottom edge only. Add one thin flat lighter highlight bar near the top of the ribbon face, inset
  from the edges.
- **Color family:** bright saturated pink/magenta. Main face a vivid pink/magenta, the bottom rim
  band a deeper rose-red, the tails' back layer a dark maroon-red, the tails' front layer a mid
  rose-red, and the highlight bar a pale pink. (Reproduce this exact hot-pink/magenta/maroon family
  — don't substitute a different hue.)
- **Outline:** one uniform, thick, dark outline stroke traces the entire ribbon silhouette — main
  body plus both tails — as a single continuous read, not disconnected per-piece outlines, with
  rounded joins/caps throughout (never a sharp mitered corner).
- **Text:** "GAME PRODUCER" bold, centered, in white, large enough to fill most of the ribbon's
  height. Give it a subtle "chunky sticker" depth by drawing a second copy of the exact same text a
  couple pixels below/behind it in a dark maroon-red, then the white copy on top — a hard offset
  duplicate, never a blur or a glow.
- **No badge, no circle, no "ROLE" tag anywhere on or near this ribbon** — it carries only the one
  line of text, nothing else.

## Element 2 — the torn-paper panel (match the shipped component as closely as possible)

The ribbon banner sits fused onto the top of a paper panel that holds the bio text. Reproduce this
paper exactly — it is a real, already-shipped component, not a free interpretation:

- **Paper color:** warm off-white/cream, close to `#FFFDF7` — not stark white, not tan/aged.
- **Outline:** one continuous, medium-thick (roughly 3px at this panel's scale) dark charcoal
  stroke (`#1C1610`-ish, near-black with a warm tint), rounded joins and rounded caps, tracing the
  entire silhouette described next.
- **Shape:** the top-left and top-right corners are gently rounded (a small radius, clearly softened
  but not pill-shaped), connected by a straight top edge. The left and right sides are straight
  vertical edges. The bottom edge is **not straight** — see the torn edge below.
- **The torn bottom edge (the signature detail — get this right):** a continuous row of irregular
  triangular teeth hanging down from the bottom of the paper, reading as a hand-torn edge, not a
  decorative printed zig-zag trim:
  - Vary each tooth's **width** noticeably and irregularly — neighboring teeth should have visibly
    different widths, no repeating uniform pattern. Roughly 8-14 teeth across a panel 320-480px
    wide feels right.
  - Vary each tooth's **peak depth** slightly (a few pixels of jitter tooth to tooth) rather than
    every point reaching exactly the same depth.
  - Offset each tooth's peak **left-right position** unevenly within its own span — not centered in
    every tooth — so the teeth don't look mechanically symmetric.
  - The valleys between teeth (the shallow points) sit at a consistent baseline, but the peaks (the
    deep points) hang down further, roughly 10-15px below that baseline at this panel's scale.
  - The teeth are filled with the exact same paper color as the rest of the panel, right up to the
    torn edge, and share the panel's single continuous outline stroke — this is a torn *silhouette*,
    not a separate texture or line drawn on top of a rectangle.
- **Drop shadow:** duplicate the entire paper silhouette — torn bottom edge included, so the shadow
  itself is jagged, not a plain rectangle — filled solid dark, offset straight down a few pixels
  directly behind the main paper shape. Flat and hard-edged, no blur, no glow.
- **Ruled notebook lines:** thin, subtle horizontal lines in a light slate-blue/grey tone, evenly
  spaced (roughly every 28px at this panel's scale), inset a bit from the left and right edges,
  starting a little below the top edge and stopping before the torn teeth begin at the bottom —
  like faint ruled paper.
- **Punch holes:** a row of small round holes near the top of the paper, evenly spaced with a
  margin from the left/right edges. Each hole is a genuine cutout — whatever sits behind the panel
  should show through it, it's not just a colored dot — outlined with the same dark stroke as the
  rest of the panel, and each hole has a small dark crescent/half-moon shading shape tucked along
  its upper inside rim (suggesting the punched paper edge catching a slight shadow), rather than
  being a flat solid circle.
- **Rotation:** the whole paper sits very slightly rotated (a subtle counter-clockwise tilt, well
  under 1 degree) rather than perfectly axis-aligned — a casually-placed note, not a rigid rectangle.

## How the two elements fuse together

- The ribbon banner sits near the top of the composition, overlapping down into the paper's top
  edge by a small, deliberate amount — like a sticker clipped onto a notepad — rather than floating
  above it with a visible gap.
- Keep the two elements' color palettes **distinct on purpose**: the ribbon stays in its bright
  candy pink/magenta family, the paper stays in its warm cream/notebook family. Don't try to unify
  them into one palette — the contrast between "bright sticker" and "plain paper" is the intended
  look, matching how it will sit against a page in production.
- Both elements keep their own flat drop shadow, offset in the same downward direction, so together
  they read as one assembled object sitting on the page rather than two unrelated pieces.

## Text placement

- "GAME PRODUCER" centered on the ribbon banner — the only text on it.
- The bio paragraph — **"Game Producer & Senior Designer with 19+ years creating engaging games,
  leading cross-functional teams, and crafting memorable player experiences across mobile and
  casual platforms."** — inside the paper panel below the ribbon, clear of the ruled lines' top
  margin, the punch-hole row, and the torn bottom edge, with comfortable margins on all sides.

Text doesn't need to be rendered as part of the SVG unless your tool requires it — reserving the
space and describing where each piece goes is enough.

## Deliverable

A single SVG (or SVG-producing output) of this two-element assembly, proportioned for a vertical
column roughly 320-480px wide, tall enough to comfortably fit the ribbon and the bio paragraph with
room to breathe.

---

# Prompt 2 — High-level (creative freedom on the seam)

Copy everything between the lines below into a separate tool/agent. Use this instead of Prompt 1
when Prompt 1's exact geometry keeps producing the two pieces correctly but broken at the seam
between them.

---

Design and build a single SVG UI component for a friendly, colorful mobile game's hero/profile
screen. It sits in a narrow-to-medium vertical column, below a large name title (not part of what
you're building) and above a call-to-action button (also not part of what you're building) —
roughly 320-480px wide.

## What it's made of

Two pieces, fused into one object:

1. **A ribbon banner reading "GAME PRODUCER."** Look at
   `cone/project/reference/data/samples/candy_banner.md` — specifically its `title-ribbon` group —
   as your style and motif reference. Take from it: the general idea of a bold, pointed
   ribbon/ribbon-banner shape (not a plain rectangle), a saturated candy pink/magenta color family,
   flat cartoon shading (crisp highlight and shadow bands — no gradients, no blur), a thick uniform
   dark outline, and chunky rounded game-UI typography. Don't copy its exact coordinates or path
   data — treat it as "this is the family of shape and style," and use your own judgment for the
   precise silhouette, tail shape, and shading bands. It holds one line of text only: "GAME
   PRODUCER." No "ROLE" label, no badge, nothing else on it.

2. **A torn-paper card holding a bio paragraph.** Look at
   `src/components/atoms/TornPaperPanel.tsx` (already built and shipped on this same site) as your
   style and motif reference. Take from it: a warm cream paper color, a dark uniform outline, an
   irregular hand-torn zig-zag edge along the *bottom only* (the top and sides stay clean/rounded),
   ruled horizontal notebook lines, a row of cutout punch holes near the top, a flat offset drop
   shadow, and a slight casual counter-rotation. Again, don't copy its exact numbers — match the
   *feel* of that existing component closely enough that this new piece looks like it belongs to
   the same object family, while using your own judgment for the exact tooth pattern, hole
   placement, and shading technique.

## The actual problem to solve

Prior attempts at this got each piece looking right on its own, but the same thing kept breaking:
**the point where the ribbon meets the top of the paper never reads as one connected object** — it
comes out looking like two things glitching through each other, or like the paper's own shape gets
distorted/incomplete right where the ribbon sits. That connection point is the real design
challenge here, more than either piece individually.

Think about it like a physical object: the ribbon is fused onto the top of the paper card, banner
overlapping down into the page a bit, not floating above it with a gap. Before you lock in a
technique, consider things like:

- Does the paper's own outline need to change near the top-center to accommodate the ribbon sitting
  there (e.g., a gap in the outline, a small tab, a change in the top edge's curve), or can the
  paper's shape stay simple and let the ribbon simply layer on top of it?
- Do the ribbon and the paper need to share anything (shadow direction, outline weight, a bit of
  overlap depth) to visually read as "one assembled sticker on a page" rather than "two shapes that
  happen to be near each other"?
- What's actually visible on the paper directly behind/under the ribbon — does anything there need
  special handling so nothing looks cut off or unfinished at the seam?

You have real creative freedom on how you solve this — there's no single correct technique. What
matters is the result: when someone looks at this component, the ribbon and the paper need to read
as one deliberately-designed, physically coherent object, especially right at the point they touch.
That seam holding up under scrutiny is the main thing this prompt is testing for.

## Content

- Ribbon: "GAME PRODUCER" — the only text on it.
- Paper: "Game Producer & Senior Designer with 19+ years creating engaging games, leading
  cross-functional teams, and crafting memorable player experiences across mobile and casual
  platforms." — comfortably margined, clear of any ruled lines, punch holes, or the torn edge.

Text doesn't need to be rendered as part of the SVG unless your tool requires it — reserving the
space and describing where each piece goes is enough.

## Deliverable

A single SVG (or SVG-producing output) of this two-piece assembly, sized for the vertical column
described above, with a seam between the ribbon and the paper that holds up as one coherent object
from a normal viewing distance — not just from a forgiving crop.
