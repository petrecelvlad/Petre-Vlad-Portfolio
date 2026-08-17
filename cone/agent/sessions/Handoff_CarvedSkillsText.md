# Handoff: "SKILLS" Label Carved Into the Wood — RESOLVED

**Status:** Solved 2026-07-23. Kept this file rather than deleting it — the wrong turns below,
especially two silent self-verification traps, are worth knowing if this label ever regresses.

## The task

The heritage skin's Skills section (`src/components/bento/skins/heritage/BentoSkills.tsx`) has a
"SKILLS" label sitting above the row of sticky notes, directly on the wood-plank desk background
(`WoodBackground.tsx`). It needed to look **stamped/engraved into the wood itself** — the same
material as the desk, darker where it's "cut" — not a UI label of a different material floating on
top.

## What was tried, in order

1. **Flat fill + outer `text-shadow`.** The pre-"carved" original — no attempt at an inset look.
2. **`text-shadow` dark-above/light-below to fake a bevel.** Rejected: read as an outer halo, not
   depth inside the letters. `text-shadow` only ever paints a copy of the glyph behind it — there's
   no `inset` for text — so any offset large enough to read as shading also reads as a second shape
   peeking out.
3. **`background-clip: text` with a vertical gradient clipped to the letterforms**, plus a
   zero-blur 1px cream highlight at the bottom edge. Fixed the halo complaint — this mechanism
   survived into the final fix — but read "too grey, no longer wood-like."
4–6. **Three rounds of retuning the gradient's hex values** (darker, then more saturated, then
   reusing `WoodBackground.tsx`'s own knot/plank colors), each verified via pixel-sampled *zoomed*
   screenshots and each concluded "fixed." **All three were false positives.** A real, non-zoomed
   screenshot at actual size kept showing the same pale/grey mismatch no matter which hex values
   were used. The zoomed crops were technically accurate but not representative of what a viewer
   actually sees — see `Handoff_StickyNoteFold.md` for the same trap hit once already.
7. **Diagnosed (correctly, this time) via live devtools patching**: Kalam's strokes at 36px are
   only a couple of pixels wide, so almost the entire glyph was antialiased edge blending with the
   wood, not solid fill — no hex value could fix that. Fix tried: `WebkitTextStroke` bumped from
   0.6px to 2px. This did make the color show up — **but introduced a new bug**: a 2px stroke
   rings the glyph's *entire* outline uniformly (every curve, top and bottom alike), so the letters
   read as a flat cartoon/sticker outline instead of a carved groove. User caught this immediately
   ("weird outline all around the text, looks cheap").
8. **A second, sneakier self-verification trap while chasing the outline fix**: the page renders
   **14 separate "Skills" spans** in the DOM at once — one per timeline project entry, most
   offscreen. Every `document.querySelectorAll('span')` devtools test grabbed `spans[0]`, which was
   *not* the instance currently visible on screen. Every "before/after" comparison screenshot
   during this phase looked identical — including one where the text was set to solid **red** and
   the screenshot still showed brown letters — because the wrong element was being edited the
   whole time. Caught only by checking `red` didn't change the screenshot at all, which shouldn't
   be possible if the edit had hit the visible element. Fix: filter matches by
   `getBoundingClientRect()` against the viewport before editing anything.
9. **Root cause, confirmed on the correct element**: the outline look is inherent to Kalam's shape
   at this weight, not a stroke-width tuning problem. Pixel-sampling the real rendered PNG showed
   the correct dark-brown hex values (e.g. `rgb(107,58,28)`) genuinely present — but scattered as
   isolated points wherever a thin cursive stroke happened to cross the sample line, with plain
   wood color everywhere else. That's exactly what a thin-stroked script font looks like under any
   shading technique: there's no continuous "body" for a two-tone gradient to read as depth, only
   an edge. No amount of stroke width or shadow reinforcement fixes this — a thicker stroke just
   turns the same problem into a uniform ring instead of a washed-out fade.
10. **Actual fix: change the font for this one label.** Live-tested `"Permanent Marker"` (Google
    Font, genuinely thick marker strokes) against the same gradient/backgroundClip technique — it
    immediately read as real carved shading, no color changes needed. Kalam stays everywhere else
    (notes, timeline body text); only this one heading-sized carved label needed a font with real
    stroke mass.

## The fix (current state)

```jsx
fontFamily: '"Permanent Marker", cursive',
background: 'linear-gradient(to bottom, #5C2E10 0%, #7A4520 50%, #9C6530 100%)',
backgroundClip: 'text',
WebkitBackgroundClip: 'text',
WebkitTextStroke: '0.5px #5C2E10',
color: 'transparent',
WebkitTextFillColor: 'transparent',
textShadow: '0 1px 0 rgba(255, 246, 219, 0.55)',
```

`Permanent Marker` added to the Google Fonts `@import` in `src/index.css`. The gradient stays
noticeably darker than the wood at every stop (unlike an earlier attempt that faded up to the
wood's own color and vanished at the bottom) so the whole letter stays visible as carved, not just
its dark end.

## Lessons for next time

- **Pixel-sampled zoomed crops keep producing false "verified" positives** (third confirmed
  instance across this label and the sticky-note-fold work). When a visual complaint doesn't
  resolve after a plausible fix, get a real non-zoomed screenshot at actual render size before
  concluding anything.
- **When there are multiple DOM instances of the "same" element** (here: one per timeline entry,
  most offscreen), always verify a devtools edit landed on the visible one via
  `getBoundingClientRect()` before trusting a before/after comparison. An unmistakable sanity check
  (e.g. setting color to solid red) is a cheap way to catch this — if the screenshot doesn't change
  color at all, you're not looking at the element you think you are.
- **A CSS technique can be sound and still fail because of the font it's applied to.** Kalam's thin
  script strokes simply don't have enough fill area to carry gradient shading at any stroke/shadow
  setting — the fix here was changing the typeface for this one label, not further tuning the
  gradient or stroke.
