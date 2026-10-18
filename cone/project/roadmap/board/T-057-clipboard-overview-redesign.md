---
type: Task
title: "T-057: Clipboard Overview redesign"
description: "Layout C (photo with title, role, dates and duration beside it; summary and facts under it) on every screen, short summaries, duration under the dates, Read more link, clearer tabs"
status: done
priority: high
parent: T-040
tags: [roadmap, task, projects, layout]
timestamp: 2026-10-15T00:00:00Z
---

# T-057: Clipboard Overview redesign

## Context

Part of [T-040](T-040-project-section-overhaul.md). Proposal artifact:
https://claude.ai/artifact/EU599tQZwXYF7UyTokzygx. The user picked layout C in its 1366 × 768
form for every screen size: the photo with the title, role, dates and duration beside it, the
summary and the facts under the photo, never beside it. Covers the "Read more" link from
[T-048](T-048-project-tab2-discovery-cues.md) and the summary rewrite from
[T-046](T-046-rewrite-project-copy.md).

---

## Acceptance Criteria

- [x] Tabs: the open tab is a deeper shade of its color, at full height and 10% larger; closed tabs keep today's pale color
- [x] Duration (months between start and end, "Present" counting to today) shown under the date badge
- [x] "Read more ›" link at the bottom right of the Overview page opens the Details tab; absent for a project with no details
- [x] Each project's summary is one or two sentences on the game and the role; anything not backed by the project data is marked `[? …]` for the user to correct
- [x] Duration removed from the facts
- [x] Overview in layout C at every screen size, facts in two columns as in the approved 1366 drawing, text on the ruled lines
- [x] Checked at the six audit sizes plus 768×1024 and 844×390, all 14 projects each; tab and link clicks tested

---

## Sub-Tasks

(none — one pass, in the order of the criteria above)

---

## Notes

- The photo takes the largest of three sizes the sheet fits (160px from 480px wide and 600px tall, 112px from 400px wide, else 96px with slightly smaller text), so the page fits a fixed-height clipboard at every size without scrolling inside it.
- To fit, the clipboard column is 46% of the width on sideways tablets (was 40%; laptop and up unchanged) and 470px tall on upright tablets (was 430px).
- On phones the sheet now grows with its page instead of a fixed 500px, since phones scroll normally.
- `formatDuration` matched the duration in all 14 projects' old facts before those were removed.
