---
type: Task
title: "T-012: Fix sticky-note 'fold' corner effect in heritage skin"
description: "The peeled-paper fold corner on the 4th sticky note (heritage skin) still doesn't match the reference after 5 rejected attempts"
status: backlog
priority: medium
tags: [roadmap, task, heritage-skin, visual-bug]
timestamp: 2026-08-16T00:00:00Z
---

# T-012: Fix sticky-note "fold" corner effect in heritage skin

## Context

Migrated from `docs/Research/Handoff_StickyNoteFold.md` — the only unresolved item in that
handoff-notes batch, so it becomes an active card instead of an archived session record.

One of the six sticky notes in the heritage skin's Skills component has a "folded/peeled paper
corner" effect (a dog-ear), alongside three other notes that already work correctly (tape corner,
thumbtack, paperclip — approved, no changes needed there). Only the fold is wrong.

**Component:** `src/components/bento/skins/heritage/BentoSkills.tsx` — the `FoldFlap` component,
the `FOLD_NOTCH_CLIP` / `FOLD_FLAP_CLIP` constants, and the `isFold` branch inside `StickyNote`.
Effect is assigned to slot index 3 (`NOTE_EFFECTS[3] === 'fold'`), which only renders as an
*active* fold (not a dashed empty placeholder) on a project with 4+ skills — e.g. "Formula E High
Voltage" in `portfolio.json`. Testing against a 3-skill project will only show the empty dashed
placeholder, not the actual fold.

**Reference:** a Freepik stock sticky-note asset sheet (3×3 grid) — the orange note (middle row,
left column) and purple note (bottom row, left column) both show the fold at the bottom-left
corner. (The original handoff referenced `image.png` at the repo root plus two throwaway debug
crops — check whether those files still exist before relying on this pointer.)

## Acceptance Criteria

- [ ] Fold reads as an actual cut-and-lifted paper corner (visible gap between the note's own cut
      edge and the smaller flap sitting in the hole, anchored at the same corner) — not a printed
      triangle decal, not an overhanging flap past the note's silhouette.
- [ ] Verified against a real side-by-side of a live screenshot (Formula E High Voltage, 4th
      sticky note) and a comparable-scale crop of the actual reference image — not a verbal
      description or a self-reported "matches" claim.
- [ ] Approved by Vlad directly — 5 prior attempts were each independently rejected; do not mark
      this done based on the implementing agent's own visual judgment.

## Sub-Tasks

<!-- none yet -->

## Notes

Five prior attempts, all rejected, in order: (1) overlay triangle decal on an intact rectangle —
read as a printed stain, no relationship to the note's silhouette; (2) real notch + oversized flap
overhanging past the note's edge — rejected, "should be inward, not extended as a corner"; (3)
notch + flap both flush inside the silhouette (flap hidden behind the front layer, pointless) —
rejected, "still not inward"; (4) attempt 3 plus an inward dark gradient to fake a cast shadow —
rejected as a regression ("wird gradient"); (5) pixel-cropped the actual reference image directly
(PowerShell `System.Drawing.Bitmap`) instead of working from a verbal impression, implemented
`FOLD_NOTCH_CLIP = 'polygon(0% 0%, 68% 0%, 100% 32%, 100% 100%, 0% 100%)'` /
`FOLD_FLAP_CLIP = 'polygon(82% 0%, 100% 0%, 100% 18%)'` — still rejected, no further specifics
given before handoff.

Before touching code again: get a real (non-magnified) live screenshot of the current render,
separately crop/zoom the reference at a comparable scale, and describe every geometric difference
in plain language first — which corner, how big the cut is relative to the note, what shows
through the gap, whether the flap extends past the note's own edge. Only change code once the
discrepancy is precise enough that success/failure will be obvious from the next screenshot alone.
Check `cone/project/memory/ANTI_PATTERNS_LEGACY.md` / `LESSONS_LEGACY.md` first — this is exactly
the repeated-guessing failure mode those exist to prevent.
