# Developer Logs

### Date: 2026-07-20
**Author:** AI Agent (Claude)
**Focus:** Planning the parametric skin system — architecture and decisions only, no implementation yet.
**Problem:** `Token_Contract.md` already claimed to be "the parametric foundation" but only covered value tokens (colors/sizes/timing); it had no answer for structural differences between skins (borders on/off, hard-offset vs. blurred shadows, motif on/off), which is exactly what would be needed the moment a genuinely divergent second visual direction gets attempted — a real risk given `docs/Research` documents 5 prior full-mockup visual directions all rejected in a row.
**Solution:** Defined a two-tier token model — Tier 1 (existing value tokens, unchanged) and a new Tier 2 (structural/variant tokens: `--depth-style`, `--border-presence`, `--motif-slot-machine`, `--motif-dot-texture`) documented in the new `docs/Architecture/design-system/Skin_System.md`, swappable at runtime via `[data-skin="..."]` on `<html>` rather than build-time bundles. Locked two constraints explicitly rather than leaving them ambiguous: the Skill Tree's literal game-tree visual chrome is permanent across every skin (not skin-variable — see `docs/Research/DECISIONS.md` DR-008), and the Hero reserves an empty optional slot for a future bespoke centerpiece visual without requiring one (DR-007). Sequencing is lean-now/deepen-later (DR-006): close `Token_Contract.md`'s remaining gaps first, wire Tier 2 into shared primitives only, then build one throwaway stress-test skin to find where the model breaks before any real second skin gets designed. Also audited `Token_Contract.md` against the actual current `index.css` — found it had drifted in both directions (some HARDCODED-flagged tokens are now DEFINED via unrelated work like the `--ui-depth` shadow unification; found one live bug, `--color-rule` resolving to an undefined `--color-ink` reference) — updated it to match reality and cut the open gap count from 23 to 8. Also restructured `docs/Research`'s ad hoc numbered files (`01-04`) into a durable `BRIEF.md` / `DECISIONS.md` / `ANTI_PATTERNS.md` / `LESSONS.md` split, modeled on the `cone-lite` documentation framework's memory/archive pattern (adopted selectively — just this pattern and the `unify` skill's consolidation method, not a full framework retrofit).
**Result/Impact:** No code changed. Architecture and decisions are now fully documented ahead of implementation, per explicit request. Next session should start at `Skin_System.md`'s Sequencing Plan step 1 (closing `Token_Contract.md`'s remaining 8 gaps) rather than jumping to Tier 2 wiring.

### Date: 2026-07-20 (same day, follow-up)
**Author:** AI Agent (Claude)
**Focus:** Reconciling `docs/Parametric Unification/` (a separate Universal Design System spec for a different platform, "Hive") against `Skin_System.md`, after it surfaced unexpectedly while staging `docs/` for its first commit.
**Problem:** Two documents could plausibly describe the same subsystem (skin/token parametrization) incompatibly if left unreconciled — UDS has its own Skin concept, its own token naming, and a much larger L1-L4 component taxonomy.
**Solution:** Read the full UDS spec series. Found genuine convergence at the value-tier level (both treat structure and skin as independent) but confirmed UDS has no equivalent to `Skin_System.md`'s Tier 2 structural/variant tokens — validating that tier as this project's own necessary addition. Rejected adopting UDS's L1-L4 taxonomy for three reasons: disproportionate migration cost for a single-product site (conflicts with DR-006's lean-now stance), no domain fit (UDS has no concept of a SkillTree or TimelineTrack), and a philosophical conflict (UDS optimizes for formal genericity across products; this project's brief is escaping genre-assembly). Adopted one concrete piece: UDS's Skin-validation discipline (WCAG AA contrast check + breakpoint verification), folded into `Skin_System.md`'s stress-test-skin step. Recorded as DR-009.
**Result/Impact:** `Skin_System.md` gained a "Relationship to UDS" section; `docs/Research/DECISIONS.md` gained DR-009; memory updated so a future session doesn't rediscover this folder cold or start migrating component naming toward UDS's taxonomy without cause.

### Date: 2026-07-20 (same day, implementation)
**Author:** AI Agent (Claude)
**Focus:** Implementing `Skin_System.md`'s Sequencing Plan steps 1 and 2 — closing `Token_Contract.md`'s remaining gaps, then wiring the Tier 2 structural tokens.
**Problem:** Step 1: 8 tracked Tier 1 gaps (border widths, font sizes, chrome dimensions, a broken `--color-rule` reference, missing `--color-focus` indirection) meant large parts of the visual surface still ignored the token contract. Step 2: Tier 2 tokens (`--border-presence`, `--motif-dot-texture`, `--depth-style`, `--motif-slot-machine`) existed only as a plan, not implemented.
**Solution:** Step 1 — added the missing tokens to `index.css`'s `@theme`, then wired all 13 consuming component files (found several more hardcoded occurrences than originally tracked — `BacklogView`'s table borders, `App.tsx`'s footer, two mis-wired `text-label` call sites in `Navbar`/`BentoSkills` that were using raw arbitrary values despite the token already existing). Step 2 — implemented `--border-presence` and `--motif-dot-texture` as real 0/1 multipliers consumed only inside `index.css` at the point Tier 1 tokens are defined (`calc()` for border widths, `color-mix()` for the dot texture's color alpha), leaner than the originally planned shared-primitive-routing approach. `--depth-style`/`--motif-slot-machine` implemented as documentation-only contracts realized via direct `--shadow-raised`/`--shadow-sunken`/`--color-slot-*` overrides — no component branches on either. See DR-010.
**Result/Impact:** Zero component files touched for Tier 2 (all in `index.css`). Verified via `tsc --noEmit`, a headless-browser pass across Hero/SkillTree/first project card (no console errors, no visual regressions), and a live runtime toggle test proving `--border-presence: 0` / `--motif-dot-texture: 0` correctly zero every border and hide the dot texture app-wide while leaving `--depth-style`-governed shadows untouched. `Skin_System.md`'s Sequencing Plan steps 1-2 marked done; step 3 (the throwaway stress-test skin) is next.

### Date: 2026-07-20 (same day, step 3 + skin switcher)
**Author:** AI Agent (Claude)
**Focus:** Building the stress-test skin (Sequencing Plan step 3), scoped to the project-card section per session direction, plus a real skin-switcher UI.
**Problem:** Step 3 needed a real second `[data-skin]` value to prove the mechanism end-to-end, and there was no way to actually switch skins other than a devtools override.
**Solution:** Added `:root[data-skin="stress-test"]` to `index.css` — all four Tier 2 tokens plus a Tier 1 palette swap reusing `Skin_Bauhaus.md`'s existing Dark OLED example. Added a `<select>` to `Navbar.tsx` (`SKINS` array, `useState` + `useEffect` setting `document.documentElement.dataset.skin`), defaulting to `data-skin="bauhaus"` set on `<html>` in `index.html` to avoid a flash on load.
**Result/Impact:** Verified against the real project card via headless browser + the actual dropdown control (not a script override) — borders, shadows, and slot motif all switch correctly, text stays legible, no console errors. Found one real gap outside the reviewed scope: `SkillTree`'s pastel pill backgrounds lose contrast against the flipped ink color — logged as DR-011, not fixed (out of scope this pass). `Skin_System.md` updated to mark step 3 done-for-project-section; step 4 (pulling reference from Vlad's shipped games) still gated on step 3 holding up *everywhere*, not just here.

### Date: 2026-07-21
**Author:** AI Agent (Claude)
**Focus:** Fixing a real regression Vlad reported live — every element's black border/outline had disappeared.
**Problem:** Two distinct Tailwind v4 bugs, found by bisection rather than guessed. (1) `border-[var(--border-width-sm)]`-style arbitrary values (used everywhere since the Tier 1 gap-closing pass) compile to `border-color` instead of `border-width`, since Tailwind can't infer the property from a bare `var()` reference — every border rendered at 0 width. Earlier visual verification missed it because `shadow-raised`'s hard-offset shadow visually mimics a border. (2) While fixing this, the Tier 2 tokens' location (moved outside `@theme` in the prior session per DR-010) turned out to break the whole CSS build — Tailwind's build corrupts when an `@theme` value references a `var()` defined outside `@theme`, surfacing as a full-page 500.
**Solution:** Added `length:` type hints to every border-width arbitrary value across all 13 consuming files. Moved Tier 2 default tokens back inside `@theme`, and added `, 1` fallbacks at every consumption site so the mechanism stays correct despite a separate, unrelated Tailwind quirk that drops `--border-presence`'s own declared value from computed output (namespace collision with `--border-*`, not the same bug as the crash).
**Result/Impact:** Verified via `getComputedStyle` (not just screenshots this time) in both skins — Bauhaus shows correct 2px/3px solid borders, Test skin correctly zeroes them. `tsc --noEmit` clean, no console errors. `Token_Contract.md` and `Skin_System.md` updated with both gotchas documented prominently so they don't get rediscovered the hard way. Logged as DR-012.

### Date: 2026-07-21 (same day, documentation)
**Author:** AI Agent (Claude)
**Focus:** Creating `docs/Research/Philosophy/` — a dedicated home for standing, site-wide creative pillars, distinct from `DECISIONS.md`'s discrete accept/reject entries.
**Problem:** Directional/philosophical ideas about what the site is trying to be (beyond any single resolved decision) existed only scattered across `DECISIONS.md` entries, `LESSONS.md` notes, and separate design docs, with no place naming them as ongoing pillars rather than one-off resolutions.
**Solution:** New folder with a `README.md` explaining its role relative to the rest of `docs/Research/`, `PILLARS.md` capturing three site-wide pillars (the site as UI/UX proof, gamification, personal style), and per-section files added only when a section has real elaborated direction — `Hero.md` (new: the collectible-character-card concept) and `SkillTree.md` (mostly a pointer to already-scattered existing content: `docs/Design/SkillTree_Proposal.md`, DR-003, DR-008).
**Result/Impact:** No code changed. `BRIEF.md` cross-links the new folder. Did not create empty stub files for sections without real content yet (e.g. the project section) — per this project's own "grow, don't scaffold" convention, those get added when there's something real to put in them.

### Date: 2026-07-21 (same day, scoping fix + per-component mockup prep)
**Author:** AI Agent (Claude)
**Focus:** Vlad reported the stress-test skin was recoloring the *entire* portfolio, not just the project card as intended — plus he wants to start generating real mockup variants of Header/Responsibilities/Skills/Achievement independently (everything except the phone frame, which should never change).
**Problem:** `:root[data-skin="stress-test"]` cascades from `<html>` regardless of which element carries the attribute — the earlier "scoped to project-card section" claim in `Skin_System.md` (2026-07-20) was aspirational, never actually true in CSS. Separately, the four project-card sub-panels all shared one skin block with no way to vary any single one independently, and `BentoVideoFrame`'s shell used the same skin-driven `--color-ink-base`/`shadow-raised` as everything else, so it would visibly change under any future dark/alternate skin even though it's meant to stay fixed as a piece of permanent chrome.
**Solution:** (1) Scoping: new `SkinContext` (mirrors `VideoPrefsContext`) holds skin state; `Navbar`'s `<select>` writes to it instead of `document.documentElement`; `ProjectDetails.tsx`'s own root renders `data-skin={skin}` directly. CSS selector dropped `:root` so the override scopes via ordinary custom-property inheritance to whatever subtree actually carries the attribute. (2) Lock: `--chrome-device-shell`/`--chrome-device-shadow` added as hardcoded literals (not `var()` aliases — an alias would still re-resolve against the active skin) in the same permanent `--chrome-*` namespace as navbar height; `BentoVideoFrame`'s shell, hardware buttons, and notch now consume these instead of `--color-ink-base`/`shadow-raised`. (3) Standardize: new component-identity token layer — `--role-header-accent`/`--role-responsibilities-accent`/`--role-skills-accent`/`--role-achievement-accent` — sits between the raw palette and `WindowCard`/`Badge`'s existing `color` enum. Added an additive `accentToken` prop to both so each of the four bento components reads its own token; a future mockup skin retargets any one of them in pure CSS with no component edits.
**Result/Impact:** Verified via Playwright against the live dev server: `<html>` stays `data-skin="bauhaus"` (`--color-ink-base` `#191919`) while the project card's own root correctly carries `data-skin="stress-test"` (`--color-ink-base` resolves to `#FAFAFA` only within that subtree) — Hero/SkillTree/Navbar screenshots identical between skins, only the card changes. Device frame pixel-identical in both skins. `tsc --noEmit` clean, no console errors. `Skin_System.md` and `Token_Contract.md` updated (new Locked Constraint, corrected scoping claim, §03.5 and the two new `--chrome-device-*` rows). This unblocks generating real per-component mockup skins next — a new `data-skin="..."` block overriding one or more `--role-*` tokens, nothing else required.

### Date: 2026-07-21 (same day, first real mockup skin from Vlad's own reference material)
**Author:** AI Agent (Claude)
**Focus:** Testing the mockup pipeline end-to-end — extract style from Vlad's own shipped games (`dist/assets/screenshots/SS_Castellum.jpg`, `SS_Castellum_2.png`, `SS_COT_2.png`) and build it into a real second skin, per Vlad's explicit request to "give this a test" and, separately, to standardize the extraction process itself for repeat use.
**Problem:** No process existed yet for going from reference images to actual token values — doing this freehand once would repeat the exact "one-shot mockup, no way to compare or recover" failure mode `ANTI_PATTERNS.md` already documents five times over, just inside the new system instead of outside it.
**Solution:** Read all three references against `Token_Contract.md`'s own section list (not freehand impressions), separated traits that appeared across both games (thick ink outlines, chunky rounding, sunken-socket icon motif, warm saturated palette — extracted) from traits specific to one reference (Castellum's blackletter logo font, its parchment texture — flagged, not extracted) — this split is what actually serves Pillar 3 (voice, not borrowed genre). Built the result into `[data-skin="heritage"]`. Found and logged one real gap instead of faking it: both games use an embossed/gradient bevel for depth that `--depth-style`'s enum has no mechanism for yet; approximated with the existing `hard-offset` value and said so in the code comment. Mid-build, `getComputedStyle` verification (not the screenshot, which looked plausible) caught a real bug: the `--role-*` tokens from the prior session don't actually retarget when a skin overrides the palette they alias, because a CSS `var()`-aliased custom property resolves once at its declaration site, not per-consuming-element — fixed by requiring every skin to explicitly restate any role token it wants to change, corrected in `Skin_System.md`, `index.css`'s comments, and `Style_Extraction.md`.
**Result/Impact:** "heritage" verified working — parchment card, deep red/slate-blue/sky-blue/gold role accents, dark slate item slots, chunkier radius, thicker borders, page background and device frame both unaffected outside/within the card respectively. The extraction process itself is now written down (`Style_Extraction.md`, v0.1, worked example included) instead of living only in this session's judgment calls — that document is the actual deliverable Vlad asked for, not just the skin. Logged as DR-014. `Skin_System.md`'s Sequencing Plan step 4 marked done-as-first-pass; next pass should widen the reference set before treating any single-pass finding as confirmed personal voice.

### Date: 2026-07-21 (same day, heritage redirected to a desk/clipboard concept)
**Author:** AI Agent (Claude)
**Focus:** Rebuilding `heritage` around a new concept per Vlad's direction — a top-down desk with the phone beside a clipboard/notepad carrying the project's title, role, time period, thumbnail, and responsibilities, with tabs to page through it. Reference was `image.png`, a Behance-style brand-identity mood-board.
**Problem:** Two open questions before building: whether this became a third skin or redirected `heritage` (redirect chosen — Castellum/Crown-of-Thrones parchment identity superseded, not extended), and how closely to follow a reference that is someone else's brand identity, not Vlad's own material — flagged directly against `ANTI_PATTERNS.md`'s "Genre-Assembly in Disguise" (a previously-rejected direction with a similar warm-cream-palette-plus-lens-tabs shape) before building anything. Separately, `header`'s title/dates/icon content needed to live inside the `responsibilities` region's clipboard rather than its own slot, and DR-001's original lens-tab concept had no real per-lens content behind it to build against.
**Solution:** Widened `ResponsibilitiesSlotProps` additively (title/icon/startDate/endDate, optional — Bauhaus unaffected); heritage's `header` adapter became an intentional no-op. Rebuilt `skins/heritage/BentoResponsibilities.tsx` as a clipboard: inline-SVG bulldog clip, CSS ring row, ruled-paper background, a taped attached photo, and `motion/react`-driven page-flip pagination through the existing responsibilities list (tabs only render past one page) — pagination, not audience-lens switching, since no lens content exists in `portfolio.json` and fabricating placeholder content would violate the no-mocked-data rule. Replaced heritage's Tier 1 palette with original hex values in a warm-paper/burnt-orange/navy family (not color-matched to the reference), and added a new `--font-hand` token (defaults to `--font-body`; heritage overrides to `Kalam`) for the clipboard's own handwritten-notes register. Along the way, applied DR-017's previously-undeployed `shadow-[var(--shadow-raised)]` bracket fix for real (first live use, `getComputedStyle`-verified), and found a related but distinct gotcha: the same bracket syntax for `--font-hand` silently lost to the `Text` atom's own `font-body` utility class (a specificity/ordering race, not a token problem) — fixed with an inline `style={{ fontFamily: 'var(--font-hand)' }}` instead.
**Result/Impact:** Verified live in both skins — Bauhaus pixel-unaffected, heritage's clipboard renders correctly with working pagination/flip on a 5-item project (Formula E High Voltage) and a clean single-page layout on shorter ones (Merge Mansion), `tsc --noEmit` clean, no console errors, embossed shadow and handwriting font both confirmed via `getComputedStyle`. `skills`/`achievement` deliberately left on their DR-016-era shapes this pass. Logged as DR-019 — also marks `ME_Skin.md`/DR-018's "desk scene" concept as substantially resolved (via Tier 3, not that document's Tier 4), with `ME_Skin.md` kept as historical record and Tier 4's mechanism doc rather than deleted.

### Date: 2026-07-22 (same day, sticky-note skills redesign + UNRESOLVED fold effect)
**Author:** AI Agent (Claude)
**Focus:** Redesigning `heritage`'s Skills component as loose sticky notes (per Vlad's direction — drop the panel, keep the 6-slot concept, each skill on its own colored note with a handwritten label), then adding varied per-note realism effects (tape corner, thumbtack, paperclip, folded corner) referencing `image.png`, a Freepik stock sticky-note sheet (not Vlad's own work — style/structure reference only).
**Problem:** The sticky notes initially had a flat, uniform look with a hard black outline that read as "printed," not physical. Separately, the "folded corner" effect specifically never converged on looking like a real paper fold across five attempts — see `docs/Research/Handoff_StickyNoteFold.md` for full detail.
**Solution:** Tape/pin/paperclip effects, the removal of the black outline in favor of a soft elevation shadow, and a shared "glossy" top-light/bottom-shadow gradient (reusing the same standardized mechanism from the clipboard's board/clip) were all built, verified live, and accepted by Vlad without further changes. The fold effect went through five rejected iterations (decal triangle → notch+overhang → notch+hidden-oversized-flap → notch+flap+gradient → notch+undersized-inset-flap after a direct pixel-crop of the reference) and is still wrong per Vlad's last review. Rather than attempt a sixth blind fix, this was handed off explicitly.
**Result/Impact:** Skills component redesign otherwise complete and accepted (tape/pin/clip notes, no-border elevation shadow, glossy gradient, centered handwritten "Skills" tag, 6-slot concept with dashed empty placeholders). The fold effect on slot 4 (`NOTE_EFFECTS[3]`) remains broken — do not assume the current `FoldFlap`/`FOLD_NOTCH_CLIP`/`FOLD_FLAP_CLIP` code in `BentoSkills.tsx` is close to correct. Next agent should start at `docs/Research/Handoff_StickyNoteFold.md`, not from this session's code or reasoning.

---

## Issue Tracking: Bento Grid Layout Offset (Scroll Native Snap Bug)

### The Problem
Users observed that when scrolling the timeline downwards, the Bento Grid inside the project card appeared "offset lower", whereas when scrolling upwards from the bottom, it appeared perfectly centered.

### Previous Attempts & Why They Failed

1. **Attempt 1**: Removing `justify-center` from the inner wrapper and replacing it with `justify-start` while keeping `min-h-0` and `flex-grow`.
   - **Why it failed**: The issue was not merely internal CSS Flexbox distribution. The core issue lies at the macro-level of how the native CSS scroll snapping (`snap-type: y mandatory`) interoperates with the fixed Navbar and intersection observers. Because the snapping sections were styled with `h-screen` (meaning `100vh`), and the parent container `main` was also `100vh` stretching from the absolute top of the viewport, the sections were actually rendering "underneath" the 64px fixed Navbar. 
   - **Result**: Depending on scroll inertia, browser scroll anchoring mechanisms, or address bar dynamic heights (like Chrome mobile/desktop), snapping perfectly to `top: 0` meant the top 64px of the card was obscured. Furthermore, if the content exceeded `100vh - 160px` of padding, the native scrolling mechanism would inconsistently assign internal scroll offsets.

2. **Attempt 2**: Tweaking `pt-[100px]` constraints and aligning timelines based on hardcoded heights.
   - **Why it failed**: It treated the symptom rather than the disease. Adjusting offsets inside an element that is inherently misaligned inside its overarching scroll container just created fragile magic numbers that break across different screen aspect ratios.

---

## Proposed Macro-Architecture (The Shell)

To eliminate scroll snapping bugs and ensure perfect alignment regardless of scroll direction, we must decouple the fixed UI (Navbar) from the Scrolling Viewport.

Here is the ASCII representation of the proposed architecture:

```text
=======================================================================
|                        FIXED NAVBAR (H: 64px)                       |
=======================================================================
|                        SCROLLABLE ENVELOPE                          |
|                       (Height: calc(100vh - 64px))                  |
|                        snap-type: y mandatory                       |
|                                                                     |
|  +---------------------------------------------------------------+  |
|  |                   STANDARD SECTION (Hero/Footer)              |  |
|  |                 snap-align: start, Height: 100%               |  |
|  |                                                               |  |
|  |   [   Section Content (Perfectly Centered or Justified)   ]   |  |
|  |                                                               |  |
|  +---------------------------------------------------------------+  |
|                                                                     |
|  +---------------------------------------------------------------+  |
|  |                 TIMELINE CONTAINER (Wrapper)                  |  |
|  |                                                               |  |
|  |     +---------------------------------------------------+     |  |
|  |     |               PROJECT CARD (snap-align: start)    |     |  |
|  |     |                 Height: 100% (of Envelope)        |     |  |
|  |     |                                                   |     |  |
|  |     |  ========   ==================================    |     |  |
|  |     |  | TL   |   |   BENTO GRID (Canvas)          |    |     |  |
|  |     |  |      |   |   (Centers flawlessly via      |    |     |  |
|  |     |  | Track|   |    flex without top-padding    |    |     |  |
|  |     |  |      |   |    hacks)                      |    |     |  |
|  |     |  ========   ==================================    |     |  |
|  |     +---------------------------------------------------+     |  |
|  +---------------------------------------------------------------+  |
|                                                                     |
=======================================================================
```

### Architectural Principles

1. **The Envelope Restriction**: 
   The `<main>` scroll container will NO LONGER span `100vh` and start at `top: 0`. It will sit exactly *below* the Navbar (`mt-[64px]`) and be exactly `h-[calc(100vh-64px)]` (or `flex-1` in an `h-screen` column). 

2. **The 100% Rule**:
   Sections inside the scroll container will use `h-full` rather than `h-screen`. This guarantees that `snap-start` aligns the top of the section with the top of the *accessible viewport*, not the monitor edge, removing any possibility of the Navbar obscuring content.

3. **Macro-Organisms**:
   - **Type A: Regular Sections** (Hero, Achievements, SkillTree, Footer). These occupy `w-full h-full` and use standard flexbox or grid centering. No complex offsets.
   - **Type B: Project Card Sections**. These are strictly `w-full h-full` flex layouts containing two columns:
     - *Column 1 (Fixed Width Segment)*: Dedicated purely to the timeline track and marker.
     - *Column 2 (Fluid Segment)*: Dedicated strictly to the Canvas containing the Bento Grid. Because the viewport height precisely matches the visible area, we no longer need `pt-[120px]` spacing to manually push the box out from under the Navbar. We simply apply standard, symmetrical padding.

By implementing this architecture, we neutralize the inconsistent scrolling behavior and gain pixel-perfect control over every macro-organism.

### Attempt 3: The `h-full` Cascade Trap
- **What we did:** We moved the `Navbar` out of the scroll container to be relatively positioned at the top, and put all sections in a `flex-1` `main` container using `h-full` wrappers.
- **Why it failed:** While the `Navbar` was successfully decoupled, the `h-full` constraint in CSS fails if the parent container doesn't have an explicit height constraint. Because `<Timeline>` was a wrapper component without an explicit height (rendering a `div` without `h-full`), the `h-full` applied to its internal looped children fell back to "intrinsic content size". This caused the project cards to expand vertically to accommodate all their content, breaking the viewport restriction.
- **Result:** The `ProjectDetails` grid expanded vertically past the screen height instead of shrinking internally. The user had to scroll past a giant, non-viewport-constrained Bento Grid, fundamentally breaking the 'one card per screen' snap mechanism.

### Attempt 4: The Explicit Envelope Constraint (Current)
- **What we are doing:** Instead of relying on CSS `h-full` cascades through React component fragment layers, we enforce `h-[calc(100vh-64px)]` on EVERY macro-organism wrapper directly. 
  - `App.tsx` macro-sections: `<div className="snap-start snap-always h-[calc(100vh-64px)] w-full">`
  - `Timeline.tsx` project cards: `<div className="snap-start snap-always h-[calc(100vh-64px)] w-full flex relative">`
- **Why this works:** `calc(100vh-64px)` is exactly the height of the `main` envelope regardless of parent structure. Flexbox calculation is bypassed and intrinsic growth is halted perfectly at the viewport boundary. This correctly enables the `min-h-0` truncations to take effect down the tree, restoring the scrolling inside `ProjectDetails` while the snap sections remain rigidly screen-sized. 
  - *Timeline marker check*: The top spacing has been adjusted precisely (`py-6` + `p-2`) to align with the `BentoHeader`'s profile icon.

---

## Technical Log: Timeline Animation Symmetry Refinement (2026-05-17)

### The Problem
The current timeline track is a single vertical bar that grows from top to bottom. While this works well for downward scrolling, it feels inconsistent when scrolling back up (the bar just "shrinks" back).

### The Solution: Symmetric Filling
We are moving towards a **Segmented Tracking** model where each section manages its own fill animation:
1. **Down-Scroll:** Fill grows Top $\rightarrow$ Center (Marker).
2. **Up-Scroll:** Fill grows Bottom $\rightarrow$ Center (Marker).

This ensures that entering a section from either direction provides the same visual satisfaction of "filling" towards the node.

### Files Created/Modified
- `docs/Architecture/Timeline_Animation_Spec.md`: Created to detail the collision logic and directional triggers.
- `docs/Architecture/README.md`: Updated to include the new spec.
