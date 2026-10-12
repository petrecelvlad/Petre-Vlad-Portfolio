---
type: Task
title: "T-044: Semantic project tabs (Overview / Details / optional Gallery), moved to the top edge"
description: "Replace the clipboard's numbered 3-bullet pagination with typed, named sections declared per project in portfolio.json, with labelled tabs on the clipboard's top edge"
status: in-progress
priority: high
parent: T-040
tags: [roadmap, task, projects, content-architecture]
timestamp: 2026-10-11T00:00:00Z
---

# T-044: Semantic project tabs (Overview / Details / optional Gallery), moved to the top edge

## Context

Part of [T-040](T-040-project-section-overhaul.md). Today `BentoResponsibilities.tsx` chunks
`responsibilities` into groups of 3 (`CHUNK_SIZE`) and numbers each group as a tab, so tab count
varies by project (Tap TD 4, Merge Mansion 0) and related bullets split across tabs. Designed
with the user in session 07 (`cone/agent/sessions/10_October/Week_2/2026-10-11/07_TIMELINE_RAIL_DRAWER.md`).

**Decided:**
- Typed, named section types, not free-form tabs: `overview` (facts strip + project line + role
  line + 2–3 impact bullets), `details` (today's responsibilities, scrolling inside the sheet, no
  pagination), `gallery` (optional, see [T-049](T-049-project-gallery-tab.md)). One renderer per
  type; adding a 4th type (e.g. a postmortem) adds a type + renderer, nothing else.
- A tab only renders if the project declares that section.
- Word labels, not numbers.
- Tabs move to the top edge as icon-only squares (user's pick), split around the binder clip,
  active tab paper-coloured and joined to the sheet, inactive tabs lower and beneath it.
- Sections are derived from content, not declared: a project gets a tab for each section it has
  content for (`SECTIONS` registry in `BentoResponsibilities.tsx`). No `portfolio.json` migration.

---

## Acceptance Criteria

- [x] Section registry (`SECTIONS`) with one renderer per type; no `CHUNK_SIZE` pagination left
- [x] Details content scrolls inside the sheet; nothing splits across tabs
- [x] Icon tabs on the clipboard's top edge, verified at 1440px and 1024px (headless Edge screenshots)
- [x] Projects without a section show no tab for it
- [x] `overview` section type + renderer, first tab on all 14 projects: facts strip + one summary line, nothing repeated from Details (unconfirmed copy shown in red, see [T-046](T-046-rewrite-project-copy.md))
- [x] Overview and Details fit the sheet at 1366/1440 on all 14 projects
- [x] Fixed tab positions: Overview + Details always left of the clip, Gallery always right; a missing Gallery leaves its spot empty

---

## Sub-Tasks

- Tab 1 copy: [T-046](T-046-rewrite-project-copy.md)
- Tab 2 discovery cues: [T-048](T-048-project-tab2-discovery-cues.md)
- Gallery tab: [T-049](T-049-project-gallery-tab.md)

---

## Notes

2026-10-12: Overview cut to facts + summary and tabs given fixed sides, after the user's mockup approval (https://claude.ai/artifact/NPSDzFj7Wf4NsJAjRPKyXb).
2026-10-12: Overview shipped (session 08) with draft copy; every unconfirmed fact is a `[? …]` marker rendered in `--color-error`. Details lost the cover header (the header shows on the first tab only), which cleared every Details spill at 1366/1440.
2026-10-11: moved to in-progress; Details + Gallery sections and top-edge icon tabs shipped, Overview waits on T-046.
2026-10-11: rescoped from "exactly 2 tabs" to typed sections (2 core + optional, extensible) after the design conversation in session 07.
