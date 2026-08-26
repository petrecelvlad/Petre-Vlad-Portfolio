---
type: Task
title: "T-044: Standardize project tabs (2 tabs, defined content)"
description: "Every project should have exactly 2 tabs; decide what content goes on each tab"
status: backlog
priority: high
parent: T-040
tags: [roadmap, task, projects, content-architecture]
timestamp: 2026-08-24T00:00:00Z
---

# T-044: Standardize project tabs (2 tabs, defined content)

## Context

Part of [T-040](T-040-project-section-overhaul.md). Structural/content-architecture decision —
affects every project entry, including new ones added via
[T-045](T-045-add-more-projects.md), so worth sequencing before that card.

---

## Acceptance Criteria

- [ ] Exactly 2 tabs defined per project, with a clear purpose for each (decided with the user)
- [ ] `IProject`/domain model updated if the current data shape doesn't already support this
- [ ] All existing projects conform to the new 2-tab structure

---

## Sub-Tasks

(none — single content-architecture decision + rollout)

---

## Notes

No tab content decided yet — needs a design conversation with the user first. Consider
sequencing this before [T-045](T-045-add-more-projects.md) so new projects are authored directly
into the final structure instead of needing a second pass.
