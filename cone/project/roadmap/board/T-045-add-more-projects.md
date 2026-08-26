---
type: Task
title: "T-045: Add more projects (recent jobs)"
description: "Portfolio needs additional project entries covering more recent jobs"
status: backlog
priority: high
parent: T-040
tags: [roadmap, task, projects, content]
timestamp: 2026-08-24T00:00:00Z
---

# T-045: Add more projects (recent jobs)

## Context

Part of [T-040](T-040-project-section-overhaul.md). Content gap — current project set doesn't
cover the user's more recent roles.

---

## Acceptance Criteria

- [ ] User has identified which additional projects/roles to add
- [ ] New entries added to `src/infrastructure/data/portfolio.json`, typed per `IProject`
- [ ] New entries conform to whatever tab structure [T-044](T-044-project-tabs-standardization.md)
      lands on

---

## Sub-Tasks

(none — single content-addition task)

---

## Notes

Worth sequencing after [T-044](T-044-project-tabs-standardization.md) so these are authored
directly into the final tab structure instead of needing a second pass.
