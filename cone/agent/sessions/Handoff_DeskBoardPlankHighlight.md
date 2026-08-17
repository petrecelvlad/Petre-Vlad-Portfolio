# Handoff: DeskBoard Plank Highlight — ~~NOT YET IMPLEMENTED~~ IMPLEMENTED 2026-07-28

**~~Status: requested by Vlad, not started.~~ Implemented same day, see `DeskBoard_Panel.md` §22 and
`Logs.md`'s matching entry for the full build/verification record.** Left this file in place as the
historical record of the ask and the prerequisite reading, rather than deleting it — the content
below (except this status line) is unchanged from when it was written.

## The task, in Vlad's own words

> "adding a lighter hue line on top of the planks, like the undershadow, just do that"

A lighter-hue highlight strip on the TOP of each plank's wood face (`Post` and `Rail`) — the mirror
image of the existing darker "undershadow" strip already built at the BOTTOM of each plank. Same
construction technique, opposite edge, lighter color instead of darker.

## What already exists (read `DeskBoard_Panel.md` for the full history, this is the short version)

- **§16/§17 — the "standardized elevation" mechanism.** A darker strip attached to the BOTTOM of
  `Post`'s and `Rail`'s wood face, built via `darken()` (`palette.ts`) applied to the plank's own
  base fill (`BOARD_COLOR`), sized by `ELEVATION_HEIGHT_PX` (currently `6`). This is the direct
  model to copy for the new top strip — same idea, opposite edge, lighter instead of darker.
- **§16b/§17b/§20 — how the outline ring is built.** Evolved from a CSS `outline` attempt (reverted
  — a sub-pixel rendering bug) to the current `backgroundColor` + `padding` real-geometry approach.
  This is the established, reliable pattern in this file now for adding any colored strip/ring —
  real DOM geometry, not `box-shadow` or `outline`.
- **§18 — root font-size is 17px, not 16.** Every numeric constant in this file derives from
  `ROOT_FONT_SIZE_PX`, never a bare literal assuming the Tailwind default.
- **§20 — whole pixels only.** Any dimension that participates in real box-model geometry (as
  opposed to a blended shadow effect) must be a whole pixel, or it rounds inconsistently per
  edge/device. This bit hard once already (`OUTLINE_WIDTH_PX` was `2.5`, planks rendered with
  visibly uneven border thickness until fixed).
- **§21 — wood vs. outer-box, a distinction that already caused a real bug.** `POST_WIDTH_PX` and
  `RAIL_THICKNESS_PX` must both represent the WOOD's own thickness alone, with any ring/strip added
  OUTSIDE that value (growing the box, moving its anchor outward) — never carved OUT of it via
  padding on the wood's own box. Getting this backwards on `Post` once already made its visible wood
  6px narrower than `Rail`'s despite the two constants sharing a number. Apply the same discipline
  to whatever new constant sizes the top highlight.

**Important context on why the top strip was removed in the first place:** heritage's original
shared "embossed" mechanism (`var(--shadow-raised)`, documented in `palette.ts`'s big comment block
and `index.css`) is a light line at the top and dark line at the bottom of a raised element. Earlier
in the same session that built the bottom elevation strip, Vlad explicitly asked to remove that
mechanism's top "shine" from `Post`/`Rail`/`Rivet` and keep only a redone bottom effect — see doc
§16's opening. **This new ask is not a request to restore `var(--shadow-raised)`** — it's a request
to add a NEW light strip using the SAME real-geometry construction as the bottom elevation strip,
not the old shared shadow mechanism. Re-enabling `var(--shadow-raised)` would also reintroduce the
exact "a `box-shadow` gets painted over by full-coverage children" problem §16b already found and
fixed once for the outline ring.

## What to actually build

- A strip attached to the TOP of `Post`'s and `Rail`'s wood face, built as a real DOM child (same
  technique as the bottom elevation strip), not a `box-shadow`/`outline`.
- Color: needs to be a LIGHTER shade derived from the plank's own base fill (`BOARD_COLOR`), the
  same way the bottom strip derives its darker shade via `darken()`. `palette.ts` doesn't currently
  have a lighten counterpart — check whether one is worth adding (`lighten(hex, deltaPct)`, mirroring
  `darken()`'s own lightness-axis approach) rather than reaching for the old `EMBOSS_LIGHT` rgba
  constant, which is a fixed value unrelated to any particular plank's own color. Consistency with
  this file's established pattern (derive from the base fill, don't hardcode a separate value)
  points toward the `lighten()` route, but this hasn't been decided, just flagged as the likely
  right call.
- Scope to `Post` and `Rail` only, matching how the bottom elevation strip was originally scoped
  (it started on those two, `Rivet` got its own simpler treatment separately) — don't extend to
  `Rivet` unless asked.
- Whole-pixel height only, no exceptions (§20).
- If the outline ring needs to encapsulate this new top strip too (the way it already encapsulates
  the bottom elevation strip), apply the exact same "grow the box outward, don't carve space from
  the wood" pattern §16b/§17b/§21 already established — this specific mistake has already caused two
  real, reported bugs in this file. Read those sections before writing the construction.

## What NOT to do

- Don't re-enable `var(--shadow-raised)` on `Post`/`Rail`/`Rivet` as a shortcut — deliberately
  removed earlier this session, and it has the same "hidden by full-coverage children" problem the
  outline ring already ran into once.
- Don't guess a fractional pixel value for the new strip's height or any anchor it requires. Every
  numeric constant in this file is a whole pixel now — derive from `ROOT_FONT_SIZE_PX` if the value
  is meant to match a real Tailwind class, or use a plain chosen whole-pixel constant with a
  documenting comment if it's a deliberate custom size (§19's pattern for exactly this situation).
- Don't implement without reading `DeskBoard_Panel.md` in full first. This file accumulated a long,
  hard-won history in one session (§0's Corner Reveals invariant, §18's root-font-size bug, §20's
  whole-pixel rule, §21's wood-vs-outer-box distinction) — skipping it risks repeating a mistake
  that's already been made and fixed once, sometimes twice.

## Verification standard

Per this session's own established practice (doc §17's explicit instruction, written after a
screenshot-based verification failure): a full, unscaled screenshot actually looked at, plus
`getComputedStyle` cross-checks on multiple plank instances across both boards on the page — not
just one sampled instance — before calling this done. `tsc --noEmit` clean, no
`assertPlankGeometryInSync` console errors. If a fresh dev server + fresh browser profile shows a
different result than what's being reported, consider a stale browser cache before assuming the
code is wrong — this happened twice already in the same session.

## Current code state as of this handoff

**No code has been written for this feature.** `DeskBoard.tsx` as of this handoff has ONLY the
bottom elevation/undershadow strip on `Post` and `Rail` — there is no top highlight strip yet. Don't
assume partial work exists; start from `DeskBoard.tsx`'s current state as the baseline.
