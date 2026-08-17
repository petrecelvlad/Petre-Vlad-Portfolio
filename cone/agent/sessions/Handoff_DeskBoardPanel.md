# Handoff: DeskBoard Heritage Panel Style — WORKING, NEEDS SPEC DOC BEFORE FURTHER WORK

**Status:** A working implementation exists in the codebase right now and reproduces the
reference reasonably closely (see "Current state" below) — this is not a rejected/broken handoff
like `Handoff_StickyNoteFold.md`. Vlad's instruction was specifically: **before any further
implementation**, write a proper spec document describing the style and the implementation
method, so this new panel style is tracked the way `Skin_System.md`/`Token_Contract.md` track
everything else, instead of only existing as commit history and code comments. Do that first.

## The task

`SkillTree.tsx` (the "SkillTree" section — categories/skill pills on the left, a selected skill's
description + project photos on the right) got a heritage-skin treatment today: two new panels
("boards") replacing the Bauhaus `WindowCard` chrome when `useSkin().skin === 'heritage'`. The
reference for what these boards should look like is **`image.png`** at the repo root — a
pixel-art mobile-game settings-UI screenshot with a chunky wood-tan board, thick rounded corner
posts, and prominent rivets. Vlad wants this reproduced faithfully, and the resulting panel style
treated as a real, documented part of the heritage skin (not a one-off component).

**Read `image.png` yourself, fresh, before doing anything else.** Do not trust the description
below as a substitute for looking at the actual file — this exact reference was already
misread once this session (see "What was tried" below); a secondhand description compounds that
risk.

## Current state — what's built and where

- **`src/components/bento/skins/heritage/DeskBoard.tsx`** (new) — the panel component itself.
  Two layers: an outer `BOARD_COLOR` frame (thick padding, `p-8 md:p-10`) and an inner
  `BOARD_INSET_COLOR` content area (same warm-tan family, not white paper), plus four corner
  `Rivet` sub-components (bronze ring + darker screw-slot dot). No `border` CSS anywhere — every
  edge reads from `var(--shadow-raised)` (frame) / `var(--shadow-sunken)` (inset), heritage's
  existing embossed-shadow mechanism (documented in `palette.ts`'s big comment block — read that
  before touching any shadow value here). Props: `children`, `className` (outer sizing/position),
  `contentClassName` (inner layer extra classes, e.g. padding/overflow), `fillHeight` (mirrors
  `WindowCard`'s prop — makes the inner layer a flex column filling the board, for pinning content
  to the bottom).
- **`src/components/bento/skins/heritage/palette.ts`** — added `BOARD_COLOR`, `PAPER_COLOR`,
  `BOARD_UNDERSHADOW` (promoted here from `BentoResponsibilities.tsx`, which used to declare them
  locally) and `BOARD_INSET_COLOR` (new, DeskBoard-only). **Do not reuse `PAPER_COLOR` for
  DeskBoard's inset** — that was the first attempt's actual mistake (see below), and the comment
  above `BOARD_INSET_COLOR` explains why.
- **`src/adapters/primary/components/SkillTree.tsx`** — now calls `useSkin()` and branches:
  - `heritage`: renders `<WoodBackground />` behind the section (`data-skin={skin}` on the
    `motion.section` root so heritage's CSS custom-property overrides in `index.css` actually
    apply — this scoping detail matters, see `Skin_System.md`'s note on `data-skin` not being
    global), and wraps both the tree canvas and the description panel (`DetailPanel`) in
    `DeskBoard`.
  - `bauhaus`: unchanged — still the original `WindowCard title="skill.detail.app"` chrome, no
    wood background. This fallback is intentional (Vlad's instruction: keep Bauhaus reachable via
    the navbar's skin dropdown for possible future reuse) — **do not remove it** while
    "implementing DeskBoard further" unless explicitly told to.
- **`src/components/atoms/InstantPhoto.tsx`** (new, separate but related sub-feature from earlier
  in this same session) — the shared "instant photo" recipe (frame + top-only scotch tape + soft
  photographic shadow, no border) used by both the clipboard's project icon
  (`BentoResponsibilities.tsx`) and SkillTree's project photos. Not part of DeskBoard's mechanism
  (photos use a soft blurred shadow deliberately, boards use the embossed one — see
  `InstantPhoto.tsx`'s own top comment for why) but worth knowing about since it lives in the same
  two consumer files.
- **`src/components/atoms/WindowCard.tsx`** — gained an additive `fillHeight` prop (off by
  default, zero effect on other consumers) so `DetailPanel`'s Bauhaus branch and `DeskBoard`'s
  heritage branch both support the same "pin content to the bottom" contract.

## What was tried, and the correction that matters most

The first DeskBoard pass (built earlier in this session, since replaced) read `image.png` as "a
darker wood outer frame around a lighter inset panel" and built it that way — thin frame
(`p-3/p-4`), white/near-white inset (reusing the clipboard's `PAPER_COLOR`), small rivets.
Vlad rejected this as "extremely bad" and pointed back at `image.png` directly.

Re-examining the reference with actual pixel sampling (not a visual guess) showed the first
reading was wrong: `image.png`'s board is **one continuous wood-tan color family throughout** —
outer frame and inner panel are both close to `#DCB98A`, differentiated by a **thick** frame and a
recessed groove, not a light/dark color swap. The corrected version (current state, above) fixed
two things: frame thickness (`p-3/p-4` → `p-8/p-10` — this was the bigger miss) and inset color
(`PAPER_COLOR` → new `BOARD_INSET_COLOR`, a close warm-tan cousin of `BOARD_COLOR` instead of a
different material entirely). Confirmed via a zoomed screenshot crop compared directly against a
zoomed crop of `image.png` itself — get in the habit of doing that same side-by-side pixel check
before declaring any future refinement done, per this project's own `LESSONS.md`/
`ANTI_PATTERNS.md` on trusting verbal impressions over direct comparison.

**Not yet re-confirmed by Vlad** — the corrected version above is this agent's own read of
"closer to the reference," not something Vlad has explicitly signed off on. Don't assume it's
finished/perfect; treat it as the current best attempt, worth another close comparison pass.

## Instruction for whoever picks this up next

1. **First**, write a spec document — not code — covering:
   - The visual style itself, re-derived from your own fresh look at `image.png` (colors, the
     thick-frame/recessed-center construction, rivet treatment, and how this differs from — or
     relates to — the clipboard's existing board treatment in `BentoResponsibilities.tsx`).
   - The implementation method: the component (`DeskBoard.tsx`), its props/contract, which shared
     tokens/mechanisms it deliberately reuses (`var(--shadow-raised)`/`var(--shadow-sunken)`, the
     embossed mechanism from `palette.ts`) and why (consistency with every other hard-surface
     heritage element — the achievement bar, the clipboard board, the page tabs), and which colors
     are new to this component (`BOARD_INSET_COLOR`, `RIVET_COLOR`, `RIVET_SLOT_COLOR`) versus
     promoted/shared (`BOARD_COLOR`, `BOARD_UNDERSHADOW`).
   - Where it's wired in today (`SkillTree.tsx` only) and the explicit skin-branching contract
     (`bauhaus` keeps `WindowCard`, `heritage` gets `DeskBoard` + `WoodBackground` — don't collapse
     this to a single always-heritage path).
   - An open question worth resolving in the doc rather than by assumption: where does this fit in
     the existing Tier 1/2/3 model `Skin_System.md` already defines? DeskBoard isn't a project-card
     slot adapter (Tier 3 is specifically about the four `Bento*` slots), it's a new shared
     chrome primitive used by a primary adapter outside the bento skin system entirely — closer in
     spirit to `WoodBackground`/`InstantPhoto` (heritage-specific shared pieces reused across
     unrelated components) than to anything the existing Tier system names. Worth deciding whether
     this needs a new documented category, or just an entry in `Skin_System.md`'s existing prose.
   - Save it under `docs/Architecture/design-system/` (matching `Skin_System.md`/
     `Token_Contract.md`'s home — this is a design-system-level mechanism, not a one-off research
     note) — `DeskBoard_Panel.md` is a reasonable name, but use your own judgment. Link it from
     `OVERVIEW.md`'s Documentation Map once written, the same way every other design-system doc is
     indexed there.
2. **Only after** that document exists, continue with whatever further refinement or rollout Vlad
   asks for (e.g., applying this panel style elsewhere, adjusting proportions/colors again, etc.).
   Don't start speculative implementation work beyond what's already built and described above.

## Verification method used this session (environment note)

No browser automation tool (`claude-in-chrome`) was available in this environment. Verification
was done via a headless Edge instance (`msedge.exe --headless=new --remote-debugging-port=...
--remote-allow-origins=*`) driven directly over the Chrome DevTools Protocol with a small Python
websocket script (`pip install websocket-client pillow` — both needed installing fresh), used to
navigate, scroll the snap-scrolling `<main>` via `Runtime.evaluate`, click skill pills by text
match, and capture/crop screenshots for pixel-level comparison against the reference. If this
environment still has no browser tool when you pick this up, that's the fallback path — it works,
but budget time for it (headless Chromium's `whileInView`/IntersectionObserver-driven entrance
animations need a real settle delay after a scripted `scrollTo`, or you'll see false-looking gaps
in a screenshot that aren't actually bugs — this tripped up an earlier check this session before
being ruled out as a timing artifact, not a real rendering issue).
