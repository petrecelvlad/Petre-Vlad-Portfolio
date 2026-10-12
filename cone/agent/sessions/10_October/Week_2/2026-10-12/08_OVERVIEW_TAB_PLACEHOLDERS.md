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
