---
type: Session
title: "Session 12: Performance Thinking Gap"
description: Hero performance status, the bobbing name letters explained, why agents miss runtime cost, and the T-058 board epic for a systemic fix.
tags: [session, hero, performance, framework]
timestamp: 2026-10-18T00:00:00Z
---

# Session 12: Performance Thinking Gap

## Metadata

- **Date:** 2026-10-18
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Pick up the hero performance handoff, explain the name-letter animation's cost, and turn the reasoning gap behind it into a board card.
- **Status:** COMPLETE ✅
- **Previous:** [Session 11](../2026-10-17/11_OVERVIEW_FACTS_REMOVAL.md)

---

## Tasks

- [x] Onboarding; found the hero performance artifacts and summarized what's done and left
- [x] Explained Lambert lighting, the "VLAD PETRE" letter animation, and main thread vs GPU
- [x] Traced why the framework let the letters through
- [x] Created the [T-058](../../../../../project/roadmap/board/T-058-performance-common-sense-system.md) epic with five sub-tasks (T-059 to T-063)
- [x] Audited every animation on the site, read from code only: 14 problems (P1–P14) with fixes, published as "Moving Parts Audit" (https://claude.ai/artifact/HiFbFMvshAGcyn9Fo6u3PC), user approved all
- [x] Fixed P1–P5, P7–P14 ([T-064](../../../../../project/roadmap/board/T-064-moving-parts-audit-fixes.md)); P6 cards still parked; `tsc` and `vite build` pass
- [x] User's side-by-side visual check of the fixes: all five pass, T-064 closed
- [x] Committed everything from sessions 11–12 (`5be2c4c`, branch `Unifier`, not pushed)

---

## Decisions

- **Lambert lighting stays:** the user approved the flatter grass. Session 11's open question is closed; `MeshLambertMaterial` remains in `ThreeNatureFieldBackground.tsx` (still uncommitted).
- **Cards → MP4 parked:** the user doesn't want it now.
- **T-058 as an epic with five children:** the five fixes were identified and scoped, so they got `backlog` cards now (Planner: no withheld fragmentation).

---

## Discoveries

- Session 11's handoff step "measure the background and show a before/after" was done after the handoff was written: artifact "Background Before and After" (https://claude.ai/artifact/BrbP1B7ytKDspiP2DYtD9p). Background alone 13.6 → 10.1 ms/frame, whole hero 28 → 31 fps, CPU unchanged.
- The name letters (`Hero.tsx:152-168`, Motion `animate={{ y }}`, `repeat: Infinity`, `.pixel-text-outline` with ~8 text shadows) were never measured on their own. Their cost is unknown; likely small next to the 3D background.
- The CSS-only animation rule in LESSONS.md (2026-08-17) postdates the letters (`b5752f5`, 2026-08-14). No sweep ever applied it to existing code.

---

## Files Modified

- `cone/project/roadmap/board/T-058-performance-common-sense-system.md` — new epic
- `cone/project/roadmap/board/T-059-perf-pattern-checks.md` … `T-063-lesson-promotion-back-sweep.md` — new sub-task cards
- `cone/project/roadmap/board/index.md` — T-058 to T-063 listed

---

*Last updated: 2026-10-18*
