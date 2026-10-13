---
type: Session
title: "Session 08: Overview Tab Placeholders"
description: Ship the clipboard Overview page on every project, with every unconfirmed fact rendered in red so the user can see exactly what still needs an answer.
tags: [session, clipboard, content, projects]
timestamp: 2026-10-12T00:00:00Z
---

# Session 08: Overview Tab Placeholders

## Metadata

- **Date:** 2026-10-12
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Build the Overview section on all 14 projects (picks up Session 07's handoff, item 2), using the draft copy, with every unconfirmed fact shown in red instead of waiting for the user's answers.
- **Status:** HANDOFF ✋

---

## Tasks

- [x] Audit every draft fact in `PROJECT_TAB1_OVERVIEW_COPY.md` against the user-authored copy (committed `portfolio.json`)
- [x] `IProjectOverview` on `IProject`; `[? …]` marker parser in `core/domain`
- [x] Overview section first in `SECTIONS` + renderer (markers in `--color-error`)
- [x] Overview copy for all 14 projects in `portfolio.json`
- [x] Verify: `tsc` (only the 4 pre-existing `MotionStyle` errors), all 14 projects show ≥2 tabs, Details fits everywhere at 1366/1440
- [x] ~~Overview clips at 1366 on 10 projects~~ — gone after the rework below
- [x] User correction: Overview repeated Details (impact bullets, role line). Reworked to facts strip + one `summary` line; anything with no distinct high-level content left is a red `[? …]`
- [x] User correction: Details jumped sides when Gallery was absent. Tabs now have a fixed `side` in `SECTIONS`
- [x] Mockup of live-UI captures approved by the user before coding: https://claude.ai/artifact/NPSDzFj7Wf4NsJAjRPKyXb
- [x] Verified all 14 projects at 1366/1440: Overview @x=118 and Details @x=169 on every project, Gallery right only when present, 0px overflow on Overview and Details

- [x] Committed and pushed to `Unifier` in 6 commits (timeline rail, clipboard tabs, T-013 scaffolding, T-032 Hero ribbon, T-047 LinkedIn, T-025 index line)
- [x] T-038 / T-039 board cards were 0-byte on disk (interrupted write); restored from HEAD on the user's go-ahead
- [x] Navbar name restyled to the Hero title's pixel style (static) and made a button that scrolls `<main>` back to the Hero (also leaves the backlog view); verified: scrollTop 5016 → 0, and from backlog → main remounted at 0

- [x] Hero: "CRAFTED LEVELS" → "SHIPPED LEVELS"; EXPLORE button green → `--color-periwinkle` with the skill-pill bevel (cream top inset, `--color-periwinkle-darkest` bottom inset), press shadow kept
- [x] Navbar: debug controls (Edit Island, animation-path select, Backlog) removed; centered SKILLTREE / PROJECTS / CONTACT buttons + right-edge LinkedIn icon. `App.navigateTo` scrolls `<main>` to each section's `offsetTop` (refs on the SkillTree wrapper, Timeline root, footer); backlog view branch removed from `App`. Verified: every button lands on its section's exact offset from any start (1672 / 13376 / 836 / 0)
- [x] Clipboard project photo: square (was 90×79 of frame width, cropped top/bottom) via `InstantPhoto`'s new `photoAspect` (frame aspect derived from the mat constants); photo inset shadow/ring removed (drew a grey square around transparent rounded corners). Verified 130×130, `box-shadow: none`; Gallery unchanged (174×104)
- [x] Nav links restyled as wood carvings: SKILLS label's deboss recipe moved into a shared `.carved-text` class (BentoSkills now uses it, computed style unchanged); `.carved-text-button:active` = deeper groove + 1px drop. Verified rest/pressed screenshots and click still navigates
- [x] User correction: "pressed" = the current section's button stays marked, not a mouse-down effect; and nav must jump, not smooth-scroll through every project. `:active` rule removed; current section = white letter outline only (`.carved-text-selected`). `useTimelineOrchestrator` now also reports `activeSection` (Timeline forwards it to App → Navbar); `navigateTo` uses `behavior: 'instant'`. Verified: every click lands in one scroll event, outline correct on click and on manual scroll, none on Hero
- [x] User: outline looked wrong — `-webkit-text-stroke` traced only the fill, cutting between the letters and their own carve shadows. Replaced with a 1.5px white text-shadow ring around fill + carve shadows; carve shadows pre-flattened onto the navbar wood (#A36952 / #EBC182) so the ring can't show through their alpha
- [x] User: selected nav label = flat dark brown, no carve bevel, 1.5px white ring around the letters only
- [x] User: selected outline looked cut off at the top. Cause: 1.5px ring from half-pixel offsets on a square — half-pixels round away unevenly at 1x (measured 0.6 solid px above vs 0.8 below) and a square dilation is thinnest above/below. Replaced with 20 whole-pixel offsets on a radius-2 disc; measured ~2.2 / 2.5 solid px top/bottom at 1x, even contour at 1x and 2x
- [x] EXPLORE: ▼ arrow removed; label centered on its ink (`-mr-[0.1em]` cancels trailing tracking, `-translate-y-[0.11em]` cancels the arcade font's low glyph placement — measured 2.4px low at 1440). Verified gaps L/R 45.25/44.75, T/B 25.0/24.75 at 1440 and 24.5/25.25 at 1024
- [x] LinkedIn link: new tokens `--color-linkedin` (#0A66C2) / `--color-linkedin-deep` (#004182) in index.css + TOKEN_CONTRACT; blue fill, white icon, pill-style bevel (2px cream top, 2px deep-blue bottom — 2px not 3px for the small control), existing press behaviour kept
- [x] LinkedIn border 3px → 2px via new `--border-width-xs` token (index.css + TOKEN_CONTRACT); computed borderWidth verified 2px
- [x] Standard raised button: `.raised-button` in index.css (bevel = cream top line + `--btn-deep` bottom line, hard `--btn-depth` undershadow; hover/active slides the face down exactly `--btn-depth` and drops the undershadow, so the lowest edge never moves). `atoms/Button.tsx` rewritten as the only raised button (props: `color` {fill, deep}, `shape`, `size`, optional `highlight`; old unused variants removed). Explore, LinkedIn, skill pills and category badges migrated; pill hover-scale and Explore's colour hover removed; skill-tree selection outline/scale kept (`arcadeStyle.ts` now only supplies colour, highlight, outline). Verified lowest edge fixed on hover for all four (Explore 858.25, LinkedIn 50.88, pill 339.26 incl. its 1.04 scale, badge 745.5 via forced :hover)
- [ ] Noticed, pre-existing, not touched: the skill tree's category badges render off the left edge of the board at 1440 (x ≈ -94)
- [x] Astrocade button left of LinkedIn (standard Button, `BUTTON_COLORS.white` via new `--color-button-white` / `--color-button-white-deep` tokens, icon `public/assets/icons/astrocade.webp`); same 33.75px size as LinkedIn, verified on screen
- [x] Astrocade button links to https://www.astrocade.com/profile/Octo (new tab)
- [x] Skill tree: System Design selected by default now also opens its branch (`expandedSkillIds` starts with it in `useSkillTreeState.ts`), so default = clicked; verified default, toggle-off and re-click
- [x] Skill tree clicks are select-only: a pill click always selects + expands (never deselects/collapses), a badge click always selects it (`useSkillTreeState.ts`, `getNextExpandedSkillIds`); fixes selection and expansion flipping out of step. Verified an 11-click sequence
---

## Decisions

- **Red = anything the user hasn't confirmed (user's rule):** every `[?]` in the spec, the 4 achievement-card repeat bullets (open question 3, whole bullet red), and every draft fact not traceable to the user's own committed copy.
- **Marker convention `[? …]` in the JSON strings, shown verbatim in red:** one rule for gaps, unverified facts and pending bullets; answering one = editing that string. No separate "pending" field to keep in sync. An unclosed `[?` runs to the end of the string, so a typo still shows red.
- **Overview is always present (`isPresent: () => true`):** `overview` is required on `IProject`, which restores the ≥2-tabs invariant.
- **Overview = what the project is, Details = what was done; no fact in both (user rule):** `IProjectOverview` is `facts` + `summary`. Team size and stage stay in facts even where a Details bullet mentions them (approved in the mockup).
- **Fixed tab sides (user rule):** a tab's position never depends on which other tabs exist.
- **Mockups reproduce the live UI exactly (user rule):** captured from the running app with only the proposed change applied in-browser; never redrawn. Icon-only tabs stay icon-only.

---

## Discoveries

- The spec's drafts were derived from the committed (pre-condense) `portfolio.json`, not the current shortened one: "within 3 months", "backlog", "first major update", "content strategy", "before implementation" all trace to HEAD. Untraceable: RotMG "PC"; Lead LD "Mobile", "Live content", "live"; Tap TD and Clash "Self-published"; FitKin "Mobile"; AlphaBetty "Mobile".

---

## Files Modified

- `src/core/domain/models.ts` — `IProjectOverview`, required `overview` on `IProject`
- `src/core/domain/unconfirmedCopy.ts` (new) — `splitUnconfirmed`
- `src/components/bento/ports.ts`, `src/components/timeline/ProjectDetails.tsx` — pass `overview`
- `src/components/bento/shared/BentoResponsibilities.tsx` — `overview` section + renderer, `CopyWithGaps`, fixed `side` per section
- `src/infrastructure/data/portfolio.json` — `overview` on all 14 projects
- `cone/project/specs/PROJECT_TAB1_OVERVIEW_COPY.md`, `cone/project/roadmap/board/T-044-…` — red-marker list, status
- `src/adapters/primary/components/Navbar.tsx`, `src/App.tsx` — pixel-style name button, `onNavigateHome`
- `src/adapters/primary/components/Hero.tsx` — levels label, EXPLORE button colour + bevel
- `src/adapters/primary/components/Navbar.tsx`, `src/App.tsx`, `src/adapters/primary/components/Timeline.tsx` — section nav, LinkedIn link, `ref` on Timeline root
- `src/components/atoms/InstantPhoto.tsx`, `src/components/bento/shared/BentoResponsibilities.tsx` — `photoAspect`, mat constants, no photo shadow
- `src/index.css`, `src/components/bento/shared/BentoSkills.tsx` — `.carved-text` / `.carved-text-button` shared by SKILLS label and nav links
- `src/hooks/useTimelineOrchestrator.ts`, `src/adapters/primary/components/Timeline.tsx`, `src/App.tsx`, `src/adapters/primary/components/Navbar.tsx` — `activeSection`, instant nav, selected outline
- `src/components/atoms/Button.tsx`, `src/index.css` (`.raised-button`), `Hero.tsx`, `Navbar.tsx`, `SkillTree.tsx`, `skilltree/SkillTreeNode.tsx`, `skilltree/arcadeStyle.ts`, `core/domain/skillTreeTypes.ts` (comment) — standard button
- `src/index.css` — `.pixel-text-outline` offsets scale with `--pixel-outline-unit` (default 1px, Hero unchanged); navbar sets 0.3125px (its 30px text / the Hero's 96px)

---

## Handoff

### Remaining work
1. User answers the red items (spec's "Live copy and red markers"); edit the `[? …]` strings in `portfolio.json`.
2. Make the active tab unmistakable (Session 07 handoff item 3) — show the user options first.
3. Discovery cues (T-048).
4. Pre-existing, not touched: at 1366 the cover header's title truncates ("Merge Mar…") and a long role wraps onto the title line.

Verification script (not in repo): headless Edge via CDP, per project: tab list, Overview/Details overflow, red-span count, screenshots.

---

*Last updated: 2026-10-12*
