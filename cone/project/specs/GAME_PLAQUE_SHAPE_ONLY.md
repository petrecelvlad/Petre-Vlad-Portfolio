---
type: Spec
title: "Standalone prompt: game-UI banner plaque shape"
description: >
  A self-contained prompt, meant to be copy-pasted as-is into an unrelated tool/agent that has no
  access to this project. Contains only the shape/color description of the plaque, nothing about
  this codebase.
tags: [spec, brief, standalone-prompt]
timestamp: 2026-08-19T00:00:00Z
---

# Standalone prompt (copy everything below this line)

---

Build an SVG illustration of a "banner plaque" — a flat-color game-UI badge shaped like a small
banner with a tab sticking up out of its top edge, used to display a short text label. Flat vector
style: crisp edges, no gradients, no blur, no drop shadow blur — everything is solid flat color.

## Overall silhouette

Two parts, fused into one seamless outline:

1. **A banner body** — wider at the top, narrower at the bottom, like a funnel pointing down. Each
   side is a single continuous diagonal line (or one very gentle curve) running from the top corner
   straight to the bottom corner — not two segments meeting at a bulge, not a straight-sided
   rectangle. The top corners and bottom corners are both rounded (small radius). The taper should
   be subtle, not steep: the width difference between the top edge and the bottom edge should be
   roughly 5-8% of the banner's width, and the body should be tall enough relative to its width that
   the diagonal reads as a gentle lean rather than a sharply angled cut — if the bottom corners look
   like they've been sliced off at close to 45°, the shape is too short/too tapered; make it taller
   and/or reduce the taper.

2. **A tab** — a smaller rounded rectangle, centered on top of the banner's top edge, roughly a
   third of the banner's total width. Flat-ish top with rounded corners. Its left and right sides
   run straight down for a short distance, then flare outward smoothly into the banner's top edge —
   a concave fillet (like a cove, curving inward/downward), not a sharp square corner and not a
   convex bump. This join must read as one molded piece of plastic, not two shapes glued together.
   The tab needs enough height that whatever sits inside it (see below) has real room and doesn't
   look squeezed.

```
                      .------------.
                     /   [LABEL]    \
                .---'----------------'---.
   .-------------------------------------------------------.  ← top edge — WIDE end
     \                                                   /
       \                                               /
         \                                           /
           \                                       /
             \                                   /
              '-------------------------------'             ← bottom edge — NARROW end
```

## Inside the tab

A smaller, darker, rounded-capsule "slot" or "groove" shape, inset within the tab, horizontally
centered — like a recessed indent. Place a short uppercase text label centered inside this slot,
both horizontally and vertically — the text should look like it was sized to fit the slot, not
overflowing it or floating off-center.

## Color — flat fills only, no gradients anywhere

| Region | Color |
|---|---|
| A highlight band along the top of the banner face (a strip just under the top edge) | `#FFE233` |
| The banner's main face color | `#FBBA0D` |
| An undershadow band along the bottom of the banner face (a strip just above the bottom edge) | `#C99106` |
| The recessed slot inside the tab | `#D06B03` |
| Outline stroke, used on every edge of the whole silhouette | `#1C1610` |
| The label text inside the slot | `#FFFDF7` |

The tab itself and the rest of the banner face share the same main face color (`#FBBA0D`) except
for the top-highlight/bottom-undershadow bands described above, which belong to the banner body,
not the tab. Every fill is a single flat color — no linear/radial gradients, no soft shadows, no
blurred edges. A solid outline stroke (~2-3px at this element's natural size) runs around the whole
combined silhouette (tab + banner as one continuous outline, not two separately outlined shapes).

## Deliverable

A single SVG (or SVG-producing output) of this shape, sized so it could hold a short line of text
inside the tab's slot (e.g. "ROLE") and a larger line of text on the banner's main face (e.g. a
short 2-3 word phrase) — leave room for both, but the text itself doesn't need to be part of the
SVG unless your tool requires it.
