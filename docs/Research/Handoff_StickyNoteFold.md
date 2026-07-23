# Handoff: Sticky Note "Fold" Corner Effect — UNRESOLVED

**Status:** Not solved. The previous agent (Claude, this session) made five attempts in a row,
all rejected by Vlad, and was told to stop and hand this off rather than attempt a sixth fix
blind. **Do not trust that agent's judgment on this specific effect** — including its own
"verified against the reference" claims below. It was wrong every time, including the one time it
directly pixel-cropped the reference image to check itself.

## The task

One of the six sticky notes in the heritage skin's Skills component has a "folded/peeled paper
corner" effect (a dog-ear), alongside three other notes that already work correctly (tape corner,
thumbtack, paperclip — Vlad approved all three of those, no changes needed there). Only the fold
is wrong.

**Component:** `src/components/bento/skins/heritage/BentoSkills.tsx`
**Where:** `FoldFlap` component, plus the `FOLD_NOTCH_CLIP` / `FOLD_FLAP_CLIP` constants and the
`isFold` branch inside `StickyNote`. Effect is assigned to slot index 3 (`NOTE_EFFECTS[3] ===
'fold'`), which only renders as an *active* fold (not a dashed empty placeholder) on a project
with 4+ skills — e.g. **"Formula E High Voltage"** in `portfolio.json`. Testing against a
3-skill project (most of them) will only show the tape/pin/clip notes and an empty dashed
placeholder where the fold would be — you will not see the actual fold effect there.

## The reference

**`image.png`** at the repo root is still the correct reference — nothing about the reference has
changed, only the implementation attempts have failed. It's a Freepik stock sticky-note asset
sheet (3×3 grid, various colors), **not Vlad's own work** — used purely as a structural/style
reference for how a paper fold corner should look, the same way the tape/pin/paperclip notes were
built from the same sheet (and those are correct). The clearest fold examples in it are the
**orange note** (middle row, left column) and the **purple note** (bottom row, left column) — both
have the fold at the **bottom-left** corner.

Two other files in the repo root, `image copy.png` and `image copy 2.png`, are **not references**
— they're throwaway zoomed crops of this agent's own broken output from earlier in the debugging
session (screenshots taken to show Vlad what was wrong at the time). Safe to ignore or delete.

## What's been tried, in order, and why each was rejected

1. **Overlay triangle decal on an intact rectangle.** Two nested `clip-path` triangles drawn on
   top of the note, note itself still a perfect uncut rectangle. Rejected: looked like a printed
   triangle/stain, not paper — no relationship between the "flap" shape and the note's own
   silhouette.

2. **Real notch cut in the note + flap behind it, sized bigger than the notch, overhanging past
   the note's own outer edge.** Rejected — Vlad: *"the shadow triangle is supposed to be rotated
   by 90 degrees as now it's corner doesn't match the effect it should create, like the triangle
   should be inwards in placed inside the sticky note not be extended as if a corner."*

3. **Notch + flap both contained fully inside the note's silhouette** (flush, no overhang), flap
   sized *larger* than the notch so it was fully hidden behind the opaque front layer except
   exactly inside the hole (meaning the extra size was invisible and pointless). Rejected — Vlad:
   *"still not inward."*

4. **Attempt 3 plus an inward-fading dark `linear-gradient` composited into the note's own
   background**, meant to simulate a cast shadow from the lifted corner. Explicitly rejected as a
   regression, not an improvement — Vlad: *"even worse you just added a wird gradient."*

5. **(Current committed state.)** Cropped `image.png` directly at the pixel level (PowerShell +
   `System.Drawing.Bitmap`, saved to a temp file, read back) instead of working from a verbal
   impression of the reference, specifically to stop guessing. Read from that crop: the note's own
   corner really is cut away (revealing whatever's behind — a thin gap), and the visible flap
   sitting in that hole is **smaller** than the hole itself and anchored at the same corner — not
   filling the hole edge-to-edge, not overhanging past the note's silhouette. That gap between the
   note's own cut edge and the flap's edge (revealing the wood-desk background behind the note)
   was read as the depth cue that sells "peeled." Implemented as:
   ```
   FOLD_NOTCH_CLIP = 'polygon(0% 0%, 68% 0%, 100% 32%, 100% 100%, 0% 100%)'
   FOLD_FLAP_CLIP  = 'polygon(82% 0%, 100% 0%, 100% 18%)'
   ```
   This agent compared a live zoomed screenshot of the rendered result against a zoomed crop of
   `image.png`'s own corner and believed they matched. **Vlad says this is still wrong.** No
   further specifics were given before this handoff was requested instead.

## Instruction for whoever picks this up next

Do not start from attempt 5's code believing it's "close." Before writing any CSS:

1. Read the **current** `FoldFlap`/`FOLD_NOTCH_CLIP`/`FOLD_FLAP_CLIP` code in `BentoSkills.tsx`
   fresh, with no assumption it's nearly correct.
2. Get a real, non-magnified live screenshot of the current rendered fold (navigate to "Formula E
   High Voltage," scroll to its project card, zoom into the 4th sticky note — "UX Design").
3. Separately crop/zoom `image.png` itself at a comparable scale — either via a screenshot zoom
   tool or by cropping the file directly (PowerShell's `System.Drawing.Bitmap` worked fine for
   this: load the file, `Graphics.DrawImage` into a smaller target rect, save, then read the
   result back as an image). Use the orange or purple note's bottom-left fold as the reference
   crop.
4. Put both images side by side and describe, in plain concrete language, every geometric
   difference — which corner, how big the cut is relative to the note, whether there's a visible
   gap and what shows through it, what color/shade the flap is, whether anything extends past the
   note's own edge — **before** touching any code. This project's own `ANTI_PATTERNS.md` /
   `LESSONS.md` exist for exactly this kind of repeated-guessing failure mode; worth a read before
   starting.
5. Only change code once the discrepancy between current-state and reference is stated precisely
   enough that success/failure will be obvious from the next screenshot — not from a description.
