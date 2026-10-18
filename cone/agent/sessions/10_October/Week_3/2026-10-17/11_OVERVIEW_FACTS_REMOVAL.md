---
type: Session
title: "Session 11: Overview Facts Removal"
description: Status rundown, restored the hero background fixes lost to a stale VS Code save, removed the facts bullets from the project Overview tab.
tags: [session, projects, overview, hero]
timestamp: 2026-10-17T00:00:00Z
---

# Session 11: Overview Facts Removal

## Metadata

- **Date:** 2026-10-17
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Give the user a status rundown, then remove the facts bullets (studio, team, platform, stage) from the project Overview tab, keeping only the summary.
- **Status:** HANDOFF ✋
- **Previous:** [Session 10](../../Week_2/2026-10-14/10_SKILLTREE_RIBBON_TRIM.md)

---

## Tasks

- [x] Status rundown of the last commits, board and working tree
- [x] Restore `ThreeNatureFieldBackground.tsx` to the committed version (user confirmed the uncommitted copy was an accidental VS Code save of old code)
- [x] Remove the facts bullets from the Overview tab (renderer, `IProjectOverview`, `portfolio.json`) — `tsc --noEmit` clean, JSON parses
- [x] Back sheet tilt eased to 1deg left, mirroring the front sheet's 1deg right
- [x] Early scroll (before the lazy SkillTree/Timeline chunks load) landed on the footer — skills slot moved outside Suspense; verified with a headless Edge repro (chunks delayed 4s: scrollTop 13376 before the fix, 836 = skill tree after)
- [x] PlayMusic (Styngr, 2026-04-13 → 2026-08-31) added as the newest project (T-045); Overview and Details checked at 1440 and 1366 in headless Edge, both fit
- [x] PlayMusic copy pass: stems bullet rewritten for non-specialists (split into two plain bullets, two others merged to keep 8 and fit 1366x768); "Rhythm Games" skill → "Game Development"; YouTube trailer added (embed loads `mrIzOBLPwA0`)
- [x] One icon per skill (2026-10-18): new `SKILL_ICONS` registry shared by the skill tree and the sticky notes, 44 skills / 44 distinct icons; note skills renamed to the tree's names; Flash → Game Development (Newgrounds) / Mechanics Design (Bounzy, Marble Frenzy 2); ActionScript → Self-Publishing; GitHub gets the GitHub logo
- [x] Hero performance investigation (2026-10-18): measured layer by layer in headless Edge on the user's HD 4600 — reports published as artifacts ("Hero Performance Report", "Hero Smoothness Plan")
- [x] Step 1 of the plan: character video now plays as stacked-alpha H.264 (`public/loopB-stacked.mp4`) through `StackedAlphaVideo`; `loopB.webm` stays as the no-WebGL / context-lost fallback. Measured: +42% → +7% CPU for the video; overall fps unchanged (~30) because the 3D background is GPU-bound
- [x] Step 2 of the plan: 3D background antialiasing off, 3/4 pixel ratio, shadows off, Lambert materials. Measured: background alone 17.4 → 2.6 ms/frame (uncapped); full hero ~28 → 52–55 fps, CPU ~162%. Remaining gap to 60 is the SVG cards (step 3). User rejected the look (jagged, blurry): antialiasing and full pixel ratio restored; shadows off and Lambert kept
- [ ] Steps 3–4 of the plan: cards → MP4, safety net
- [ ] PlayMusic follow-ups waiting on the user: role title confirmation, icon, skill tree links

---

## Decisions

- **Facts removed from the data, not only hidden:** user said team, team size etc. are not needed; keeping `facts` in `IProjectOverview` and `portfolio.json` with no reader would be dead data. Git history keeps the old values.
- **Skill icons keyed by exact name in one registry (`src/core/domain/skillIcons.ts`):** the sticky notes guessed icons by substring (18 skills fell through to `Box`) while the tree kept its own per-skill icons, so one skill could show two icons. The `icon` field left `Skill`; both views look up `SKILL_ICONS[name]`. Sticky-note names now match the tree (Systems Design → System Design, Game Balance → Balancing, Community Management → Community Mgmt, User Research → Research).
- **Stacked-alpha H.264 for the character video:** VP9-with-alpha is CPU-decoded on the HD 4600 (no hardware VP9); H.264 is hardware-decoded but has no alpha, so the mask rides beside the color frame and a one-quad WebGL shader recombines them. Beat every alternative measured (600/720 VP9, animated WebP, GIF): GIF and WebP cost +300 MB RAM, GIF also loses color and soft edges. Also fixes the missing `loop1.mp4` Safari fallback (reference removed).
- **Background: visual quality is not negotiable:** antialiasing off and 3/4 pixel ratio were rejected by the user as "low quality … can't show this to recruiters" and reverted. Only invisible savings are acceptable (shadows off, Lambert kept). Any future background saving must be checked side by side against the original before it is reported as done.
- **No 30 fps redraw cap:** it would halve orbit and grass motion smoothness; not proposed to the user as a step.
- **Flash replacements:** Newgrounds was solo work including code, so Game Development holds; Bounzy and Marble Frenzy 2 credit design and art only, so Mechanics Design avoids overclaiming code.

---

## Discoveries

- The uncommitted `ThreeNatureFieldBackground.tsx` edit (saved 2026-10-16 19:44, ~18h after `a3df5cb`) was the pre-`617e935` code: it undid the cloud ring and the long-session shader precision fix. Cause: VS Code's save-on-close wrote a stale open buffer over the committed file.
- Early-scroll-to-footer cause: SkillTree and Timeline shared one `Suspense fallback={null}`, so until their chunks arrived `<main>` held only Hero + footer; snap took the footer, then scroll anchoring kept it in view as 12k px of sections loaded above it. Still open by design: a second scroll before the Timeline chunk arrives would hit the footer the same way (its height isn't known before it loads).

---

## Files Modified

- `src/components/bento/shared/BentoResponsibilities.tsx` — facts list removed from the Overview renderer; back sheet tilt -3deg → -1deg
- `src/core/domain/models.ts` — `facts` dropped from `IProjectOverview`
- `src/App.tsx` — skills snap slot outside Suspense; SkillTree and Timeline each get their own Suspense
- `src/infrastructure/data/portfolio.json` — 14 `facts` arrays removed; `exp-styngr-2026` / `proj-playmusic` added; skill renames and Flash/ActionScript swaps
- `cone/project/specs/PROJECT_TAB1_OVERVIEW_COPY.md` — format note: Overview is summary only
- `src/components/atoms/StackedAlphaVideo.tsx` — new: stacked-alpha video player with WebM fallback
- `src/adapters/primary/components/Hero.tsx` — character uses `StackedAlphaVideo`; old play/pause effects and `loop1.mp4` reference removed
- `public/loopB-stacked.mp4` — new asset (4.2 MB), ffmpeg recipe beside `stackedSrc` in Hero
- `src/components/backgrounds/ThreeNatureFieldBackground.tsx` — first restored to `HEAD` (stale VS Code save); then shadow map and all cast/receive flags removed, every `MeshStandardMaterial` → `MeshLambertMaterial` (roughness/metalness dropped)
- `src/core/domain/skillIcons.ts` — new: skill name → icon registry
- `src/core/domain/skillTreeTypes.ts` — per-skill `icon` removed (category icons stay)
- `src/adapters/primary/components/skilltree/SkillTreeNode.tsx`, `src/components/bento/shared/BentoSkills.tsx` — read icons from `SKILL_ICONS`; `getIcon` substring matcher removed

---

## Handoff

**Topic: hero performance.** The user wants the hero as smooth as possible (no lag, no crash risk, even on weak machines) **without any visible quality loss**: it is shown to recruiters.

**State (nothing committed):**
- Character video: done. Stacked-alpha H.264 via `StackedAlphaVideo`, WebM fallback. Verified.
- 3D background: shadows off and Lambert lighting are in, with full antialiasing and full pixel ratio. **This exact combination has not been measured or screenshotted.** Expected from the single-setting runs: ~17.4 → ~11 ms/frame (shadows −3.9 ms, Lambert −2.4 ms), an estimate only. Measure it first (`bg-breakdown.mjs "as is"` and the full-page `hero-cost-all.mjs`, both in the session scratchpad, which won't survive; the method is in the published "Hero Smoothness Plan" artifact).
- The user hasn't confirmed they accept Lambert's slightly flatter grass. If they don't, restore `MeshStandardMaterial` with the original roughness/metalness values (in `git diff`).

**Next, in the user's order, one step at a time, each only on their go:**
1. Background: measure the current state and show the user a before/after screenshot. If more saving is needed, only invisible options are acceptable. Untested candidates: rendering the 3D scene into a 2× MSAA render target instead of the default (usually 4×); an automatic step-down that kicks in only on machines whose measured frame time is too slow.
2. Cards → MP4 (step 3), then the safety net (step 4: context-loss fallback for the 3D background, frame-time step-down, reduced motion). Don't raise these while the user is working on the background.

**How to work with the user on this:**
- Stay strictly on the part being worked on; mentioning other parts mid-step angered them.
- I was a stupid agent: asked only about bringing the background back to full quality, I recommended the cards → MP4 step bundled with the background fix. The cards have nothing to do with the background's quality. Answer only for the part being worked on.
- Keep terminal answers short, with no wide tables and no condescension.
- Never report a visual change as done without a side-by-side check against the original.

---

*Last updated: 2026-10-18*
