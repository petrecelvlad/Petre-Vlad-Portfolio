# DeskBoard Diagnosis — Why the Current Build Is Wrong, and What Actually Needs to Change

**Status: for Vlad's review. No code changes yet.** Second pass at this document — the first pass
(previous version of this file) diagnosed a color problem and completely missed the actual
structural problem. Corrected below, with the zoomed crops that show it.

## What I missed the first time

I described `DeskBoard` as "a frame color + an inset color," i.e. two flat rectangles nested inside
each other. That's not what `image.png` is. **The frame itself is built out of four separate wooden
planks** — two vertical corner posts and two horizontal rails — physically joined at the corners,
not a single continuous rounded-rect ring with four decorative rivet dots glued to its corners. I
looked at the whole image at once and pattern-matched it to "rounded frame, corner rivets" without
actually tracing what each piece was. Zooming into the corners individually made it unambiguous.

## The evidence

Cropped and upscaled four corners of `image.png` directly (not eyeballing the full image at
normal size):

**Left edge, full height** — a single vertical plank runs the *entire* height of the panel, with a
rivet near its top end and a **second, separate rivet near its bottom end**. That's two rivets on
one post, not one rivet per corner.

**Top-right corner** — a horizontal plank (lighter tan) runs along the top, and there's a visible
horizontal seam/groove where it meets the darker interior panel below it. The vertical right post
is drawn crossing over/in front of that horizontal plank's end, with its own rivet placed on the
post at the height where the rail joins it.

**Bottom-right corner** — same pattern mirrored: a horizontal bottom rail (lighter tan, separated
from the interior by a groove) runs along the bottom, and the vertical right post overlaps in front
of it and extends its rounded cap *below* the rail's bottom edge — the post is visibly taller than
the rail structure it's joined to, like a fence post that the crossbar is set into partway down, not
flush with it.

So the actual construction is:

1. **Two vertical posts** (left, right) — full panel height, rounded end-caps at top and bottom that
   sit *proud* of (extend beyond) the horizontal rails, each with **two rivets**: one near the top
   where the top rail joins it, one near the bottom where the bottom rail joins it. Four rivets
   total, but they belong to the posts, not to "the corners of a frame."
2. **Two horizontal rails** (top, bottom) — span the width between the posts, sit *behind* the posts
   at their ends (posts overlap in front), and are separated from the interior panel by a visible
   groove/seam — this is the darker line I saw but didn't correctly identify in the first pass.
3. **One recessed interior panel** — darker, more saturated brown, filling the rectangular opening
   the posts+rails frame, sitting behind/below that frame (the sunken groove is the depth cue).
4. A separate raised lighter tray (holding the face-icon row) overlaid near the top — not part of
   the 4-plank frame itself, a distinct piece on top of it. Unrelated to SkillTree today (see open
   question, unchanged from before).

## Why the current build doesn't have this

`DeskBoard.tsx` today is two nested `<div>`s: one outer rounded-rect (`BOARD_COLOR`, `p-8/p-10`,
`rounded-[28px]`) and one inner rounded-rect (`BOARD_INSET_COLOR`), plus four `Rivet` components
absolutely positioned at `top-4 left-4` / `top-4 right-4` / etc. — i.e. **one single frame shape**
decorated with four identical corner dots. There is no left post, no right post, no top rail, no
bottom rail as distinct pieces; there's no overlap (nothing sits "in front of" anything else); there
are no rivet pairs per post; nothing extends proud of anything else. A single `border-radius` ring
can *color-match* the reference but it structurally cannot produce what makes the reference read as
built wood — jointed, overlapping pieces with their own edges and shadows — no matter what colors go
into it. That's why fiddling with hex values across two attempts didn't fix it: the color was never
the load-bearing mistake.

(The color-value inversion I flagged in the first diagnosis — `BOARD_INSET_COLOR` at L≈85% being
*lighter* than `BOARD_COLOR` at L≈69%, when the interior should read darker/richer than the frame —
is still real and still needs fixing. It's just secondary to the construction problem above, not the
main event.)

## What I intend to build

Restructure `DeskBoard` from "2 nested rectangles + 4 rivet dots" to 5 layered pieces:

1. **Interior panel** — positioned first (behind everything else), fills the full board area, darker
   richer tan-brown (corrected value, see above), `var(--shadow-sunken)` for the recessed groove
   against whatever overlaps its edges.
2. **Top rail** — a horizontal plank absolutely positioned along the top edge, spanning between
   (not under) the two posts, lighter tan (`BOARD_COLOR`), sits in front of the interior panel's top
   edge.
3. **Bottom rail** — mirror of the top rail, along the bottom edge.
4. **Left post** — a vertical plank absolutely positioned along the left edge, taller than the rails
   (extends above the top rail and below the bottom rail with rounded caps), drawn in front of both
   rails at the corner, lighter tan, carrying two `Rivet`s (near its top end, near its bottom end).
5. **Right post** — mirror of the left post.

Z-order: interior panel (back) → rails → posts (front), matching what the corner crops show.

Still using the existing `var(--shadow-raised)`/`var(--shadow-sunken)` emboss mechanism for every
piece's edge (no gradients, no `border`) — that mechanism itself isn't in question, only the shape
and layering of what it's applied to.

I have **not** written any code yet. Confirming this structural read is right before touching
`DeskBoard.tsx` — this is a real rebuild (5 positioned pieces instead of 2), not a value tweak, so I
want it right before starting.

## Open question, unchanged from before

Does either of SkillTree's two boards want the raised icon-tray element from the reference, or is
that out of scope for now? Still defaulting to "skip it" absent a concrete use for it.
