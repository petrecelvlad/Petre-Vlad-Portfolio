---
type: Session
title: "Session 09: Skill Tree Photo Region"
description: Skill tree section work — first, split the right column into a details row and a separate project-photos row.
tags: [session, skilltree, layout]
timestamp: 2026-10-13T00:00:00Z
---

# Session 09: Skill Tree Photo Region

## Metadata

- **Date:** 2026-10-13
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Skill tree section work; first task: the right column becomes two rows — the details panel (unchanged position) and a separate region for the project photos, so the section stays modular for a future mobile layout.
- **Status:** HANDOFF ✋
- **Previous:** [Session 08](../2026-10-12/08_OVERVIEW_TAB_PLACEHOLDERS.md) (HANDOFF — its items are not this session's scope)

---

## Tasks

- [x] `SkillProjectPhotos` component owns photo selection + strip; `SkillDetailsPanel` drops photos and `projectsById`
- [x] `SkillTree` right column = panel row + photo region row (`flex-1`)
- [x] Verify: `tsc` (only the 4 pre-existing `MotionStyle` errors). Panel rect identical before/after (789/715, 124→521, 600×398) at 1440×900 and 1366×768. Photos: 1440 = exactly the old size (186×217 bbox), tape top 45px below the panel; 1366 = 136×160, tape top 11px below the panel, bottom 23px above the region's end (T-035 done — card already existed)
- [x] Declutter the details panel (T-034): only name + description left; header line, stars/MASTERED, years text, 3 bars, unreachable empty state removed; `Skill.proficiency` deleted. Verified skill + category views at 1440, `tsc` clean (4 pre-existing)
- [x] User correction: decoration was never in scope — wax seal restored (moved into the parchment body at its exact old position) and the dashed divider under the title restored; "ABILITY EFFECT:" / "DISCIPLINE OVERVIEW:" labels restored too (also not named by the user); the inner stitching border was never touched
- [x] Planned the experience bar with the user: T-050 (career clock) + T-051 (skill months from project dates, audit-gated) created
- [x] `cone/agent/onboarding/Retard.md` (gitignored, local only) — mandatory agent-mistake lessons, onboarding step 2 in CLAUDE.md + START_HERE.md; terminal one-screen ceiling added to COMMUNICATOR.md; Claude's feedback memories erased (user)
- [x] "ABILITY EFFECT:" label removed from the skill view (user); the category view's "DISCIPLINE OVERVIEW:" stays
- [x] Details panel taller (min-h 260 → 336px) and description `text-xs` → `text-sm` → `text-base` (user). Verified 1440×900 + 1366×768: photos stay 172px at both (region 398 / 266px)
- [x] Skill tree photos no longer crop the icons' sides (user): `InstantPhoto photoAspect={1}` (same as the clipboard thumbnail) replaces the 5/6 frame; footprint constant 1.35 → 1.26. Verified: rendered img 155×155 for square sources at 1440 + 1366; every project icon is square
- [x] UI design audit (user, no code): full-site scan at 1440×900 (18 sections + 2× crops); visual-style findings and redesign direction reported in chat, skill tree first
- [x] Skill tree redesign to the toy-box style: T-054 scale-to-fit (fit what's open), T-038 banner + board, T-052 panel, T-053 pills + connectors, T-036 category badges. Verified at 1366×768, 1440×900, 1920×1080, 820×1180 with real mouse clicks; `tsc` clean (4 pre-existing)
- [x] Pushed: two commits on `Unifier`, PR #7 merged by the user, Pages deploy green
- [x] Hero ribbon bevel (user): `RibbonBanner`'s `bevelWidth` prop removed, every ribbon draws the 3px bevel (the Hero's 16%-of-body bands are gone). Verified at 1440×900 against the Explore button
- [x] Detail panel redesign reverted (user hated it: "that panel should not have been changed"): `SkillDetailsPanel.tsx` + `GamifiedParchmentPanel.tsx` rebuilt from this session's transcript to their exact pre-T-052 state (parchment, seal, divider, `min-h-[336px]`, `text-base`, no "ABILITY EFFECT:"); `GamifiedWaxSeal.tsx` deleted. Verified at 1440×900, `tsc` clean (4 pre-existing)
- [x] Selected pill/badge state reverted (user): category fill + 2px white outline; `aria-pressed` and the `.raised-button[aria-pressed]` rule removed. Verified at 1440×900, `tsc` clean (4 pre-existing)
- [x] Wax seal moved to the panel's bottom-right, flaps ~10px below the parchment's bottom edge (user); moved out of the parchment's `overflow-hidden` into the panel wrapper. Verified 1440×900 + 1366×768 (clears the photo tape)
- [x] Asset Whiteboard artifact created (user): a design canvas for asset experiments, one page per asset, one row per round — https://claude.ai/artifact/9P12TiHuNr6ZWTQA6pzLiY. Banners · Round 1: the current ribbon + 8 designs
- [x] Hero ribbon → design 07, 8-bit Ribbon (user): new `PixelRibbonBanner` atom (fixed 6px grid, grows in length only), Press Start 2P label with ink outline; paper untouched. Verified 1440×900, 1366×768, 390×844; `tsc` clean (4 pre-existing)
- [x] Skill tree banner → `PixelRibbonBanner` too; Hero ribbon + paper un-rotated (user). Label typography moved into the atom; `RibbonBanner.tsx` deleted (no callers). Verified 1440×900, `tsc` clean (4 pre-existing)
- [x] Ribbon's two pixel sparkles removed (user)
- [x] Hero ribbon as three layers (user, `image.png`): body over the paper (12px overhang each side), tails behind it; `PixelRibbonBanner` split into a z-0 tail layer and a z-20 body layer. Verified 1440×900 (hero + skill tree banner), `tsc` clean (4 pre-existing)
- [x] Hero ribbon top aligned to the first achievement card's bottom on desktop (user, `image copy.png`): measured offset, clamped at 0. Verified 1440×900 + 1920×1080 aligned; 1366×768 can't align because the title already wraps to two lines there (pre-existing)
- [x] Cloud breathing restored (user): a stray `the` at the start of the shader's `breathe` line had broken the cloud shader compile; removed, user's values kept. Verified in-browser (shader compiles, uTime advances)
- [x] Clouds evenly spaced (user): one shared ring radius (76), the whole `cloudGroup` rotates at one time-based speed (`CLOUD_ORBIT_SPEED`, the old average) instead of per-cloud per-frame speeds that drifted into clumps, each cloud turned along the ring's tangent. Verified two frames 20s apart
- [x] Floating island repair (user, `image copy 2.png`): Asset Whiteboard page "Floating Island", Round 1 — current (gaps + blades marked) and three fixes A rim drips / B grass fringe / C moss skirt. All share one rock fix: silhouette widened to tuck under the whole grass cap (the old rock was narrower than the cap, so the black drop shadow read as missing rock), shadow redrawn as the true island outline. Awaiting the user's pick before touching `FloatingIslandBackdrop.tsx`. Round 2: user picked A (rim drips). Right gap recoloured by extending the right facet (#1E293B) instead of a near-black patch; island made still (no float/turn/sway/glow/drift), waterfalls keep flowing, the two pebbles float instead. Gap-check board shows before/after for all three gaps. Approved and implemented in `FloatingIslandBackdrop.tsx` (rim drips as one shared path + a transform list); verified in the live hero, island body static apart from the waterfall dashes
- [ ] T-050 career clock
- [ ] T-051 skill→project audit (user confirms) + derived experience bar

---

## Decisions

- **Panel keeps only name + description (user):** everything else was decorative or derived from the hand-typed rank/years.
- **Experience = months covered by the skill's projects / career months since 2007-01-01 (user):** one project list per skill (order = photo priority), a bar never reaching 100% is accepted, label "2y 5m".
- **Paper props keep the "desk exception" (user):** polaroids, sticky notes, clipboard sheets stay unoutlined with soft shadows; every UI element gets ink outline + hard bottom edge.
- **One bevel: 3px light line on top, 3px dark line at the bottom, at every size (user):** the Explore button is the reference; the hero ribbon's 9px bands are too tall and get the same fix.
- **Skill tree redesign decisions (user):** tree scales to fit (fitting the open columns, not the deepest branch), steel brackets → flat outlined corner caps, wax seal stays, pill labels Jersey 15 16px (pills 208px), category icons PenTool / Factory / Crown on 96×72 tiles. Selected pill = white + pressed (the lighter tint read weaker than the on-path outline) — reverted by the user, see below.
- **Selected pill keeps its category color, white 2px outline, not pressed (user):** the white-fill + pressed state was reverted to the pre-redesign look; badges too.
- **The detail panel stays the parchment panel (user, 2026-10-13):** the T-052 ribbon-over-paper rebuild was reverted; the toy-box redesign covers the board, banner, tree and badges only.
- **Assets are explored on the Asset Whiteboard artifact before touching the project (user):** variants side by side in their real contexts; the user picks, then it's built.
- **Photo region fills the column's remaining height; photos centered and fit to it, never larger than before (user choice):** the space under the panel is 337px at 1440×900 but 205px at 1366×768, so fixed-size photos would spill out of their own region on short screens.
- **Photo region is a sibling of the panel in `SkillTree`, not a child of `SkillDetailsPanel`:** each row is an independent module a future mobile layout can reflow.

---

## Discoveries

- `Skill.years` is hand-typed, not derived. Deriving from today's `projects` lists collapses the big numbers (System Design 19y → 4y 2m; FTUE 7y → 2y 5m) because the lists were curated for photos; Flash-era projects link to no skill; projects cover 196 of 238 career months.
- Container query units (`cqw`/`cqh`) resolve against the container's content box, so padding on the container itself must not be subtracted again — the first pass shrank the 1440 photos to 167px by doing so.
- Two depth languages coexist: hard unblurred slab (hero cards, `Button`, phone frame) vs `--shadow-raised` (inset lines + blurred ambient — skill board, parchment panel, clipboard, achievement bar). The latter reads flat. `SKIN_GAMIFIED.md` §3B still prescribes gradients + medieval props, contradicting the user's flat cartoon direction.
- At ≤1440 the tree (976px) was wider than the board's ~630px content box; centered, its left edge — the category badges — rendered at x = −93px. Unnoticed because earlier checks only looked at the right column.
- `InstantPhoto` takes no `style`, so a computed width needs a wrapper element (used instead of widening the atom's API).

---

## Files Modified

- `src/adapters/primary/components/skilltree/SkillProjectPhotos.tsx` (new) — photo region; `[container-type:size]`, photo width = min(a third of the row, what the region's height allows)
- `src/adapters/primary/components/skilltree/SkillDetailsPanel.tsx` — photo strip and `projectsById` prop removed
- `src/adapters/primary/components/SkillTree.tsx` — right column renders the panel row + `SkillProjectPhotos` (`flex-1 min-h-0`)
- `src/adapters/primary/components/skilltree/SkillDetailsPanel.tsx` — name + description only; empty state removed
- `src/components/bento/skins/gamified/GamifiedParchmentPanel.tsx` — header line and its props removed; wax seal kept, re-anchored to the parchment body
- `src/core/domain/skillTreeTypes.ts` — `proficiency` removed from type and all skills
- `cone/project/architecture/systems/SKILLTREE.md` — `Skill` type + detail panel spec
- `cone/project/roadmap/board/` — T-034/T-035 done, T-050/T-051 new, index
- `cone/agent/onboarding/Retard.md` (new, gitignored), `.gitignore`, `CLAUDE.md`, `cone/agent/onboarding/START_HERE.md` + `index.md` — lessons file wired in as onboarding step 2
- `cone/agent/personas/COMMUNICATOR.md` — terminal one-screen ceiling
- Skill tree redesign: `src/components/layout/ScaleToFit.tsx` (new), `gamified/GamifiedCornerCaps.tsx` (new), `gamified/GamifiedBoard.tsx`, `skilltree/SkillDetailsPanel.tsx`, `SkillTreeNode.tsx`, `SkillTreeConnections.tsx`, `arcadeStyle.ts`, `SkillTree.tsx`, `atoms/RibbonBanner.tsx` (`bevelWidth` prop), `core/domain/skillTreeGeometry.ts` (`PILL_W` 208), `skillTreeTypes.ts` (`CategoryConfig.icon`), `index.css` (`--ui-depth-lg`, `--bevel-width`, `aria-pressed` on `.raised-button`); deleted `GamifiedBannerPlaque.tsx`, `GamifiedSVGAssets.tsx`
- Docs: `SKILLTREE.md` §6.4.1 + panel, `SKIN_GAMIFIED.md` §2A/§4; board T-036/T-038/T-052/T-053/T-054 done
- Panel revert: `SkillDetailsPanel.tsx`, `GamifiedParchmentPanel.tsx` (restored), `GamifiedWaxSeal.tsx` (deleted); `SKILLTREE.md` panel section, `SKIN_GAMIFIED.md` §2A/§4, T-052 marked REVERTED
- Selected-state revert: `arcadeStyle.ts`, `SkillTreeNode.tsx`, `SkillTree.tsx`, `index.css`; `SKILLTREE.md`, T-053
- Hero + board ribbon: `atoms/PixelRibbonBanner.tsx` (new), `Hero.tsx`, `GamifiedBoard.tsx`, `atoms/RibbonPaperSeam.tsx` (comments), `atoms/RibbonBanner.tsx` (deleted); T-032 note, `SKILLTREE.md`, `SKIN_GAMIFIED.md`
- Clouds: `backgrounds/ThreeNatureFieldBackground.tsx`
- Floating island: `backgrounds/FloatingIslandBackdrop.tsx`
- Ribbon bevel: `atoms/RibbonBanner.tsx` (`bevelWidth` prop → fixed 3px), `GamifiedBoard.tsx`

---

## Handoff

- **Completed:** skill tree toy-box redesign + its partial reverts (panel, selected pills), wax seal, the 8-bit `PixelRibbonBanner` on hero + skill tree, cloud breathing fix + even spacing, floating island repair. All committed on `Unifier`.
- **Remaining:** T-050 career clock and T-051 skill→project audit + derived experience bar (`cone/project/roadmap/board/`); T-051 needs the user to confirm the audit before the bar is built.
- **Decisions not to re-litigate:** the parchment panel and pill selected-state stay as originally designed; asset experiments go to the Asset Whiteboard (https://claude.ai/artifact/9P12TiHuNr6ZWTQA6pzLiY), one page per asset, one row per round; the island holds still, only waterfalls and the two pebbles move.
- **Watch-outs (pre-existing, unrequested):** at 1366×768 the hero title wraps to two lines, so the ribbon can't align to the first achievement card there; on mobile the navbar overlaps the hero and the ribbon tails clip.

---

*Last updated: 2026-10-14*
