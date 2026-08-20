---
type: Spec
title: "Game Plaque — Role Banner Shape & Color Spec"
description: Pre-implementation agreement document for GamePlaque.tsx — a flat-color, embossed banner with an integrated top handle tab. No gradients, ever, without explicit sign-off.
tags: [spec, architecture, hero, ui-component]
timestamp: 2026-08-17T00:00:00Z
constraints:
  - Pre-implementation agreement document — read in full before changing GamePlaque.tsx
  - No gradients anywhere in this component, no exceptions without explicit sign-off
agent_instructions: >
  Single source of truth for GamePlaque.tsx's visual construction. A gradient version was built
  and rejected this session (§6) — do not reintroduce bg-gradient-* on this component. Read §0
  and §7 before writing any code; §7 is an open question that must be answered before implementing.
---

# Game Plaque — Role Banner Shape & Color Spec

**Status: pre-implementation agreement document.** `GamePlaque.tsx`
(`src/components/atoms/GamePlaque.tsx`) is being redesigned to match a reference image
(`image.png`, project root — a "WEEKLY MISSIONS" banner from a mobile game). This is the single
source of truth for that redesign's shape and color. Read this whole file before touching the
component again — a gradient version was already built once this session, shown to Vlad, and
explicitly rejected (§6). Don't repeat that mistake by coding from memory of the reference instead
of from this doc.

## 0. HARD INVARIANT — no gradients, anywhere, ever, without explicit sign-off

**`GamePlaque.tsx` must not use `bg-gradient-*` (or any CSS gradient) on any element, for any
reason.** This was violated once already this session — the first redesign attempt used
`bg-gradient-to-b` for both the main body and the tab, and was flagged directly: *"i said no
gradients, my mockup has no gradients instead it follows the project's style."*

**Why this is a hard rule, not a preference:** every other component in this Hero section —
achievement cards, the text panel, the EXPLORE button — uses a single flat background color plus a
`border` and a hard-offset `box-shadow`, never a gradient. `DeskBoard.tsx` (the other
richly-documented "game chrome" component in this codebase, see `DESKBOARD_PANEL.md` §5) states
this explicitly for its own material: *"No gradients anywhere in this component... full stop."*
Shading is done with **flat, discrete color bands** (a lighter strip, a base color, a darker
strip) or an inset `box-shadow` pair — never a smooth blend. A gradient reads as a different
rendering technique from the rest of the site, even when the color choice itself is otherwise
correct.

## 1. Reference image

`image.png` (project root), a cropped mobile-game screenshot, **601×150px**, confirmed
programmatically (not assumed). The colors in §3 were extracted by loading this exact file into a
headless browser, drawing it to a `<canvas>`, and reading real pixel values via
`getImageData()` — sampled at multiple points per band and averaged, avoiding pixels that land on
the white banner text or the background behind the banner. Not eyeballed.

## 2. The shape

**Corrected a third time now, 2026-08-17 — read this whole section, not just the diagram.** The
banner body is **not** a rounded rectangle with vertical sides. It's a **trapezoid**: the left and
right edges are each one full straight diagonal line, running the entire height between the
top-corner and bottom-corner roundings — not a vertical edge that happens to be rounded only at
its two ends. That part has held across every correction so far.

**The direction has now been flipped back to the first pass.** The first pass said "top wider,
bottom narrower" and was right. A second pass reversed that to "bottom wider, top narrower" and
shipped that way. Vlad corrected it back directly, 2026-08-17, comparing `image.png` against
`image copy.png`: **the top edge (where the tab sits) is the widest part of the shape; the bottom
edge is narrower — the silhouette reads as a funnel pointing down, not up.** Flip the whole
diagram vertically from the previous (second-pass) version, back toward the first.

**On measurement honesty — this is several rounds deep on the same question now:** multiple
independent attempts to pin down the taper direction from the reference images — an automated
pixel threshold scan, a zoomed visual crop of each edge, a gridded-overlay check, and (this
session, 2026-08-17) a fresh fine-resolution edge-detection scan run independently against both
`image.png` and the reference crop embedded in `image copy.png` — have produced contradictory
readings, including a scan this session that measured the bottom edge as slightly wider than the
top at the raw pixel level. **That measurement does not override Vlad's direct call.** The
banner's corner radii are large enough relative to its height that automated edge-scanning keeps
picking up corner-rounding curvature and mid-height bulge instead of the true top-vs-bottom
taper — this crop is not reliably measurable by pixel-scanning, full stop. This section follows
Vlad's direct visual read, not another self-measurement. Don't re-litigate the direction with
another pixel scan — if it still looks wrong, that's a live-screenshot-vs-reference comparison to
make, not more forensics on this small crop.

On top of the trapezoid body sits the smaller tab/handle shape, merged into the top edge (now the
*wide* end), centered horizontally. The tab's own sides flare outward as they descend into the
banner's top edge — a smooth concave fillet, not a square corner. The tab's own construction is
unaffected by any of the corrections; only the main banner body's taper direction changed.

```
                 .------------------.
                /   .============.   \      ← tab: rounded top corners, sides
               |   (   ROLE     )    |         flare outward into the banner
               |                     |         (concave fillet, not a square
          .----'---------------------'----.     corner) — unchanged by all three fixes
  \                                               /      ← TOP edge — WIDEST point
   \░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░/       (corrected back a third time, 2026-08-17 —
    \                                           /        see the direction note above)
      \           BANNER FACE TEXT            /          ← left/right edges are ONE full
        \                                   /            diagonal line each, straight
         \▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓/             from top-corner to bottom-
          \                               /              corner — NOT vertical with
            '---------------------------'                rounding only at the ends
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                 ↑ BOTTOM edge — NARROWEST
                                                        ← hard offset drop shadow
                                                        (flat, like the site's
                                                        shadow-[0_4px_0_0_#1C1610]),
                                                        same silhouette, offset down
```

Legend: `░` = flat lighter band (top highlight). Plain fill = flat mid-tone banner face. `▓` =
flat darker band (bottom undershadow) / drop shadow. No symbol represents a gradient anywhere —
every region in this diagram is one flat color.

Inside the tab: a darker, recessed oval/capsule indent (a groove, not a gradient-shaded dome) —
this is where the "ROLE" label text goes, in this adaptation (the reference's own tab indent is
empty; we're repurposing that space for the label).

**Proportions, from pixel-scanning `image.png` at y=40** (a row that crosses the tab without
crossing its text): the tab's fill spans roughly `x=216` to `x=392` at that height (≈176px, out of
the banner's ~500px visible face width) — call it **roughly a third of the banner's width**,
centered. Treat this as "about a third," not a literal ratio to hit exactly. (This proportion is
about the tab specifically, not the taper direction — unaffected by the correction above.)

**Taper magnitude — still just an approximate feel, not a trustworthy measured number** given the
history above: something in the range of a **10-20% width difference between the bottom and top
edges** is a reasonable starting point, not a locked-in ratio. Tune this against a live render and
eyeball it next to the reference directly, rather than trusting a fourth measurement attempt on
the source crop.

## 3. Color — flat only, pixel-sampled from `image.png`

| Role | Representative hex | How sampled |
|---|---|---|
| Top highlight band | `#FFE233` | Averaged from the tab's top edge (`x=295, y=0-2`) and the banner's own top-edge highlight either side of the tab (`y=40, x=200-212` and `x=396-416`) — consistently `R≈255, G≈225-230, B≈36-42` across all three locations |
| Banner face (mid-tone) | `#FBBA0D` | Averaged from a long, text-free vertical strip (`x=560, y=70-124`) — extremely consistent cluster, `R≈250-255, G≈186-190, B≈10-15` |
| Bottom undershadow band | `#C99106` | Averaged from the same strip's lower edge (`x=560, y=126-132`), just before the banner's true bottom edge |
| Tab indent (recessed groove) | `#D06B03` | Averaged from the tab's own darker band (`x=300, y=15-39`) |
| Outline | `#1C1610` | **Not** sampled from the reference — the reference's outline is thin and heavily anti-aliased at this image's resolution, unreliable to sample precisely. Using the project's own standing outline color instead, per §0's reasoning: matching the site's convention matters more here than matching this specific low-res crop pixel-for-pixel. `#1C1610` is used for every other outline on this Hero section already. |
| Label/value text | `#FFFDF7` or plain white | Project's existing paper/cream tone (matches the achievement text panel), with the same dark drop-shadow-on-text treatment already used for "VLAD PETRE" (`pixel-text-outline` / `drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]`) rather than inventing a new text-outline technique |

## 4. Technique — how to build the bands without a gradient

Two live precedents already exist in this codebase for "flat color + light/dark banding, no
gradient" — worth choosing between deliberately, not defaulting to whichever is fastest to type:

**Option A — reuse `var(--shadow-raised)` directly** (`index.css`):
```css
--shadow-raised:
  inset 0 3px 0 0 rgba(255,246,219,0.5),
  inset 0 -3px 0 0 rgba(36,26,16,0.3),
  0 var(--ui-depth) calc(var(--ui-depth) * 3) rgba(20,14,8,0.4);
```
This is the exact token `DeskBoard`'s clipboard board, the achievement bar, and the page tabs all
already use — a single flat background color plus a thin (3px) inset highlight/shadow line pair.
Cheapest, most literally "the same method," but a 3px line is noticeably thinner than the banded
look in the reference (§2's diagram bands look closer to 8-12px in the source image, not 3px).

**Option B — follow `DeskBoard`'s more recent technique** (`DESKBOARD_PANEL.md` §16b): real
stacked flat-color regions — a top cap div, the main face div, a bottom cap div — instead of a
box-shadow line. `DeskBoard` moved to this specifically because a `box-shadow`-based bevel read as
too thin/subtle once real content sat on top of it, and because a `box-shadow` on an element with
full-coverage children gets silently painted over (the exact bug documented in that file's §16b/§7
notes — a real `outline`, not `box-shadow`, is needed once an element has opaque children tiling
its full box). Thicker, closer to the reference's actual proportions, more consistent with this
codebase's more battle-tested approach — but more construction (three stacked pieces instead of
one shadow value).

**Superseded by §7's SVG decision** — once the whole shape is one SVG path, both Option A and B
(both CSS/`box-shadow` techniques) became moot. What was actually built: flat-color `<rect>`
bands inside a `<g clipPath={...}>` referencing the same outline path, so the bands can never spill
past a rounded corner or the tab's fillet. Left this section as-is (rather than deleting it) as the
record of why that wasn't a hard requirement from the start — it fell out naturally once §7 was
decided, not a decision made independently.

## 5. Where this is wired in

- `src/components/atoms/GamePlaque.tsx` — the component itself. Props (`children`, `label`,
  `className`) stay the same; only the internal shape/color construction changes.
- `src/adapters/primary/components/AnimatedRoleTitle.tsx` — the only consumer, unchanged:
  `<GamePlaque label="ROLE">...</GamePlaque>`.
- Rendered inside Hero's middle column, directly under the "VLAD PETRE" title (see `Hero.tsx`).

## 6. Rejected approach (this session) — don't re-try

A first redesign used `bg-gradient-to-b from-[#FFDE66] via-[#FFC531] to-[#F5A417]` for the main
body and a matching gradient for the tab, with the tab positioned `absolute -top-[13px]` and given
`rounded-t-lg` (no bottom rounding) so it would sit flush against the banner's top edge. The color
family (gold/amber) and the general "tab grows out of the top edge" positioning were reasonable
starting points — **the gradient fill itself is what was wrong**, flagged directly by Vlad as
inconsistent with both the reference (which has no gradients) and this project's own established
flat-color-plus-shadow convention. Any future attempt should keep the shape/positioning instinct
from that version but replace every `bg-gradient-*` with a flat color per §3/§4.

## 7. Open question — blocking further implementation

The tab's concave "shoulder" curve (§2) — where it flares outward into the banner rather than
meeting it at a square corner — is the one part of this shape plain CSS (rounded rectangles,
`border-radius`) cannot reproduce exactly. Two paths, not yet decided between:

- **CSS approximation:** a flat-topped tab with generous `rounded-t-*` corners, sized and
  positioned to sit flush on the banner. Cheap, ships fast, will read as *close* to the reference
  but not an exact seamless fillet — more like two rounded shapes meeting cleanly than one molded
  piece.
- **SVG path:** exact fidelity to the reference's curve, using the same hand-drawn-path technique
  this codebase already uses for `TornPaperPanel`'s torn edges and `segmentedDivider.ts`'s jagged
  column dividers. More work — tuning bezier curves for the shoulders, making the path scale with
  the plaque's width/content responsively.

**Do not pick one of these silently and start coding.** Ask first — this is a real fidelity/effort
tradeoff, not a detail to default on.

**Resolved 2026-08-17 — Vlad chose the SVG path**, exact fidelity. Built as `GamePlaque.tsx`: one
continuous `<path>` (`ResizeObserver`-driven `W`/`H`, `useId()`-scoped defs — same pattern as
`TornPaperPanel.tsx`), ​with the tab's two concave fillet arcs, flat-color bands via a `<clipPath>`
of that same outline, no gradients. Screenshotted and confirmed the fillet curve itself reads
correctly, matching the reference.

## 8. Known bug in the current implementation — banner body shape, found 2026-08-17

**The SVG built for §7 uses the wrong base shape for the banner body.** It draws a rounded
rectangle (vertical left/right edges, `border-radius`-style arcs only at the four corners) — but
§2 (corrected above, same date) establishes the body is actually a **trapezoid** with full
diagonal sides. This was approved and shipped before the trapezoid correction was made; Vlad
caught it afterward on a second look at the reference (`image copy.png`, a side-by-side crop of
the reference banner and the built result — the width/proportion mismatch is visible there).

**What needs to change in `GamePlaque.tsx`'s `outlinePath`, once implementation resumes:** the
four `L`/`A` segments currently tracing the left and right edges as vertical runs
(`L 0 ${H - bannerCornerRadius}` / `L ${W} ${H - bannerCornerRadius}`, i.e. a fixed `x` for both
the top-side and bottom-side points) need to become genuinely diagonal, per §2's trapezoid.

**Direction, per §2's third correction (flipped back to the first pass):** the
**bottom-left/bottom-right corner `x` positions must be inset further toward the center than the
top-left/top-right corner `x` positions** — the top (where the tab sits) is the wide end, the
bottom is the narrow end. If an earlier read of this section is cached anywhere (memory,
an open diff, a half-written patch), it likely has this backwards — re-read §2 itself, not a
summary of it, before writing the actual path coordinates. Not yet implemented — recorded here so
the fix target is explicit before touching code again, not rediscovered from scratch.
