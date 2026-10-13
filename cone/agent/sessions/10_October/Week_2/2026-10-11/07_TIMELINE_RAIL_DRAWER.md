---
type: Session
title: "Session 07: Timeline Rail Drawer"
description: Repair corrupt git objects; gate the project TimelineRail on full-view and give it a slide-in/out drawer animation.
tags: [session, timeline, animation, git]
timestamp: 2026-10-11T00:00:00Z
---

# Session 07: Timeline Rail Drawer

## Metadata

- **Date:** 2026-10-11
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Stop the TimelineRail from overlapping the Skill Tree mid-transition — show it only once the project region fills the viewport, sliding in from offscreen-left and back out on exit.
- **Status:** HANDOFF ✋

---

## Tasks

- [x] Repair two empty (0-byte) loose objects in `.git/objects` (both old `package-lock.json` blobs) from `origin`; `git fsck` clean
- [x] `useTimelineOrchestrator`: add `isTimelineInFullView` (project trigger stack fully covers the `<main>` scrollport)
- [x] `TimelineRail`: gate on it via `AnimatePresence`, slide on `x` from offscreen-left
- [x] `Timeline.tsx`: pass the flag through
- [x] `tsc --noEmit` — no errors from changed code (4 pre-existing `MotionStyle` errors, one being the uncommitted rail-dot `boxShadow`)
- [x] Visual verification of the drawer by the user — confirmed "looks good"
- [x] Darken the site purple onto the skill-tree leadership pill ramp (user chose site-wide over timeline-only)
- [x] Point skill tree `CATEGORIES.leadership` colors at the purple tokens (`var(--color-*)`) instead of literal hex
- [x] Visual verification of the new purple by the user
- [x] Design conversation: clipboard tabs → typed sections (T-044 rescoped; T-048, T-049 created; T-046 in-progress)
- [x] Tab 1 (Overview) first drafts for all 14 projects → `cone/project/specs/PROJECT_TAB1_OVERVIEW_COPY.md`
- [x] User picked icon-only top tabs; built Details + Gallery sections with top-edge icon tabs (T-044 partial, T-049 done), verified via headless Edge screenshots at 1440/1024
- [x] User corrections: tabs behind the board (not the paper), constant outline thickness, no scrolling on the sheet — applied, sheet tilt wrapper reverted, verified via screenshots
- [x] Measured Details overflow per project at 1920/1440/1366 (fixed sheet, no scroll)
- [x] Removed every visitor-facing em dash (portfolio.json, 19 skill-tree descriptions, clipboard date badge, empty-achievement placeholder); BacklogView debug placeholders left
- [x] Rewrote 63 of 70 Details bullets to fit 2 lines at 1366px (user rule: max 2 lines per bullet, reference = 1366/1440 laptops); verified 0 bullets over 2 lines at 1366/1440/1920
- [ ] Still spilling after the bullet pass: 1440 → Lead Level Designer +2, Tap TD +10, AlphaBetty +2; 1366 → also Lucky Slots +2, FitKin +4, Castellum +2 (Lead LD +6, Tap TD +14, AlphaBetty +6). User to decide next condensing step
- [x] Tap TD: dropped "100K installs" (already the achievement) and "across dozens of stages". Still +9 at 1440, +14 at 1366
- [x] Tap TD: applied the 5 merges/cuts (12 → 7 bullets). Fits at 1440, +4 at 1366
- [ ] **MISSED:** Overview (tab 1) never shipped — see Handoff
- [ ] Remaining spill after Tap TD: 1440 → Lead Level Designer +2, AlphaBetty +2; 1366 → Lead LD +6, AlphaBetty +6, Tap TD +4, FitKin +4, Lucky Slots +2, Castellum +2

---

## Decisions

- **Separate signal for the rail, not a stricter `activeIndex`:** `ProjectStage` is sticky in-flow content and must render as soon as the first project starts entering (it scrolls in naturally); only the viewport-`fixed` rail needs "fully in view". Two consumers, two thresholds — both owned by the orchestrator (single source of truth guardrail).
- **Coverage of the whole trigger stack, not "some trigger ≥ ratio X":** a per-section threshold would flip the rail out between two projects mid-snap. Union coverage stays true for the entire project region.
- **`AnimatePresence` over always-mounted + animate:** exit keeps the last-rendered props frozen, so the dots/fill don't reset when `activeIndex` drops to -1 partway through the slide-out.
- **Easing reuses `--transition-defaults`' curve** `cubic-bezier(0.16, 1, 0.3, 1)`, 0.4s.
- **Purple ramp = skill-tree leadership pill ramp, site-wide (user's call):** `lilac`→`#D8B4FE` (pill bgTop), `periwinkle`→`#C084FC` (pill bgBase), `periwinkle-deep`→`#9333EA`, `periwinkle-darkest`→`#7E22CE` (pill bgBottom). Shared `--color-periwinkle` also recolors footer wordplay text, Badge/Avatar `periwinkle`, BacklogView, and makes the leadership badge an exact match for its pill.
- **Rail emboss now `color-mix()` over the tokens** instead of literal rgba copies — the literals are how the emboss could silently drift from the palette. No new browser floor: Tailwind v4's opacity modifiers already depend on `color-mix`.
- **Clipboard tabs = typed, named sections (user approved all three recommendations):** `overview` / `details` / optional `gallery`, one renderer per type, a tab only if the project declares it, word labels. Overview format: facts strip + project line + role line + 2–3 outcome-first bullets; design roles reframed toward producer-relevant skills, never retitled. Details discovery: word labels + end-of-Overview "Full breakdown →" link + one-time tutorial hand (not a persistent hand).
- **Tabs move to the clipboard's top edge (user):** word labels need horizontal room. Proposed: folder tabs split around the centred binder clip, active tab paper-coloured and joined to the sheet, inactive behind the board, equal widths, icon-only fallback on narrow clipboards — user then picked icon-only; "joined to the sheet" later rejected (see Superseded). Proposal + clickable mock: https://claude.ai/artifact/DdJz4fJUHHJGq6mfGpTWSB
- **Sections derived from content, not declared in JSON:** a `SECTIONS` registry (type, label, icon, `isPresent`) in `BentoResponsibilities.tsx`; no data migration. Gallery = screenshots the video frame isn't showing — the frame only shows `keyScreenshots[0]` when there's no playable video, so `getYoutubeId` moved to `core/domain/projectMedia.ts` and both share it.
- **Superseded:** ~~Front-sheet tilt moved to a wrapper~~ — reverted once the user moved tabs behind the board. Rule now: tabs sit behind the board (board `z-10`), same 4px outline in both states, active = full height, inactive = 3px lower + `brightness-95`; only ~27px of tab can show (the column's `py-7` clips anything higher), so icons are 16px.
- **No em dashes anywhere visitor-facing (user rule).** Date ranges use a spaced hyphen.
- **Bullets max 2 lines at a 1366px laptop (user rule):** ≈80 characters in the handwriting font; capitalization of discipline names (Game Design, Level Design) kept as the user writes them.
- **The clipboard sheet never scrolls (user rule):** content must fit; overflow is a copy problem, solved by condensing, not by scroll or pagination.
- **Leadership pills read `var(--color-*)` directly; design/production left on literal hex:** only purple has matching site tokens — butter/sky tokens differ from the pills' yellow/blue, so pointing those would recolor them.

---

## Discoveries

- `.git/objects` had two 0-byte loose objects (likely an interrupted write); `git diff` failed with `fatal: unable to read bca35c80…`. Recovered byte-identical blobs (hash-verified) from a temp bare clone of `origin/Unifier`.
- CSS custom properties resolve inside SVG presentation attributes (`stroke="var(--color-periwinkle)"` → `rgb(192, 132, 252)`), verified in headless Edge/Chromium — so `SkillTreeConnections`' `stroke={catConfig.stroke}` needed no change.
- The clipboard's "tabs" were never sections: `BentoResponsibilities.tsx` paginates `responsibilities` in chunks of 3 (`CHUNK_SIZE`), which is why bullets spilled across tabs. `IProject.description` exists for every project but is rendered nowhere; `BentoHeader` returns null.
- Details overflow with no scroll (ruled lines over the page; page height 876/696/564px at 1920/1440/1366): Tap TD +6/+23/+29, AlphaBetty 0/+14/+20, Lead Level Designer 0/+10/+17, FitKin 0/+6/+10, Lucky Slots 0/+3/+7, Formula E 0/+2/+8, Castellum 0/+2/+7, Newgrounds 0/0/+2; the rest fit everywhere. The header (photo/title/role/date) takes 6 of those lines.
- Tailwind 4.2.2 implements `translate-*` via the CSS `translate` property, not `transform` — so motion's `x` (which writes `transform`) composes with `-translate-x-1/2` instead of overwriting it.

---

## Files Modified

- `.git/objects/bc/a35c80…`, `.git/objects/5d/9bef5b…` — restored from origin
- `src/hooks/useTimelineOrchestrator.ts` — new `isTimelineInFullView` state + scroll-driven measurement effect
- `src/components/timeline/TimelineRail.tsx` — `isInFullView` prop; `AnimatePresence` + `motion.div` drawer slide
- `src/adapters/primary/components/Timeline.tsx` — passes the flag to the rail
- `src/index.css` — purple tokens repointed to the pill ramp
- `src/components/timeline/TimelineRail.tsx` — dot emboss derived from tokens via `color-mix`
- `src/core/domain/skillTreeTypes.ts` — leadership colors → purple tokens; stale "no matching badge purple" comment corrected
- `cone/project/architecture/systems/TOKEN_CONTRACT.md` — purple rows: new values, roles, pill-ramp cross-reference
- `src/components/bento/shared/BentoResponsibilities.tsx` — section registry, top-edge icon tabs, gallery body; chunked pagination removed
- `src/core/domain/projectMedia.ts` (new) — `getYoutubeId` (moved), `getGalleryScreenshots`
- `src/components/bento/BentoVideoFrame.tsx`, `src/components/bento/ports.ts`, `src/components/timeline/ProjectDetails.tsx` — wiring
- `cone/project/specs/PROJECT_TAB1_OVERVIEW_COPY.md` (new) + `cone/project/specs/index.md` — Overview copy drafts
- `cone/project/roadmap/board/T-044…`, `T-046…`, `T-040…`, `index.md` — rescoped/updated; `T-048…`, `T-049…` — new

---

## Handoff

### What the user asked for

Every project's clipboard has typed pages, chosen by icon tabs on the clipboard's top edge:

1. **Overview (every project):** recruiter summary. Facts strip (Studio · Team · Platform · Stage · Duration), one project line, one role line, 2–3 outcome-first impact bullets.
2. **Details (every project):** the full `responsibilities` bullet list.
3. **Gallery (optional):** screenshots the video frame isn't already showing.
4. Extensible: new page types slot in as new section types.

Plus discovery cues (T-048): word labels, a "Full breakdown →" link at the end of Overview, a one-time tutorial hand.

Because Overview + Details exist on every project, **every project always shows ≥2 tabs** — that invariant is what makes the design coherent.

### What was shipped vs. missed

- Shipped: Details, Gallery, the `SECTIONS` registry, top-edge icon tabs behind the board.
- **Missed: the Overview page.** The copy exists only as drafts in `cone/project/specs/PROJECT_TAB1_OVERVIEW_COPY.md`; it was never added to `portfolio.json`, `IProject`, or `SECTIONS`. No project shows high-level copy.
- The agent held Overview back because the drafts contain `[?]` gaps, and **did not tell the user**. Shipping without it broke the ≥2-tabs invariant, causing the bugs the user reported:
  - **Tabs on some projects, not others.** With only Details + Gallery, tabs appear only when `getGalleryScreenshots` is non-empty (video + a screenshot: Formula E, Clash of Towers, Castellum, Bounzy, Marble Frenzy 2). Bubble Witch Saga and Marble Frenzy 2 have near-identical copy, yet only Marble Frenzy 2 has tabs — a hidden media rule the visitor can't see.
  - **A tab that "does nothing".** The left tab is Details, the page already showing; the active state (full height vs. 3px lower + `brightness-95`) is too subtle to read as selected.

### Remaining work

1. **User supplies facts** for the Overview drafts (never guess them — spec's `agent_instructions`):
   - Team size: Merge Mansion, Realm of the Mad God, Formula E, Lucky Slots, Bubble Witch Saga, AlphaBetty, Bounzy, Marble Frenzy 2
   - Platform: Formula E, Lucky Slots, Castellum, Bubble Witch Saga
   - Stage: Formula E, Lucky Slots, FitKin
   - Metrics marked `[? …]` inside bullets (e.g. Merge Mansion events shipped, Marble Frenzy 2 plays)
   - Plus the spec's 4 open questions (rename "Lead Level Designer"; achievement-card repeats; merge the Flash entries)
   - Lines in the spec carrying `[?]`: 34, 41, 58, 75, 93, 101, 109, 116, 132, 140, plus in-bullet `[? …]`
2. **Build Overview** (T-044 remainder): add an overview field to `IProject` in `src/core/domain/models.ts`, the copy to `src/infrastructure/data/portfolio.json`, an `overview` entry first in `SECTIONS` and a renderer in `renderSectionBody` (`src/components/bento/shared/BentoResponsibilities.tsx`). Must fit the fixed sheet without scrolling at 1366/1440.
3. **Make the active tab unmistakable** without changing outline thickness and keeping tabs behind the board (user rules).
4. **Discovery cues** (T-048).
5. **Condense the remaining Details spill** (see Tasks) by trimming copy only.

### User rules (do not violate)

- "Don't code" = no code, no mockups, no new files; answer in the conversation.
- Never propose layout changes. The sheet never scrolls; overflow is fixed by condensing copy.
- No em dashes anywhere visitor-facing. Bullets max 2 lines at 1366px (~80 chars).
- Tabs sit behind the board; same outline thickness in every state.
- Keep replies very short — the user can't scroll the terminal.
- Report gaps up front: never ship a partial version of an agreed design without saying what's missing and how it will look.

### Verification tooling

Headless Edge via CDP scripts (not in the repo): screenshots, per-project page overflow, per-bullet line counts. Dev server: `http://localhost:3000/Petre-Vlad-Portfolio/`. Project trigger selector: `main div[aria-hidden="true"].snap-always`.

---

*Last updated: 2026-10-12*
