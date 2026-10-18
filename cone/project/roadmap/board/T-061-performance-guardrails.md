---
type: Task
title: "T-061: Performance rules in the guardrails"
description: "Fill GUARDRAILS.md's empty Performance category with real constraints, cited in the files they govern"
status: backlog
priority: high
parent: T-058
tags: [roadmap, task, performance, guardrails]
timestamp: 2026-10-18T00:00:00Z
---

# T-061: Performance rules in the guardrails

## Context

Part of [T-058](T-058-performance-common-sense-system.md). [GUARDRAILS.md](../../architecture/GUARDRAILS.md) lists a Performance category ("CPU budgets, latency targets, memory limits") but holds no performance constraint. [T-059](T-059-perf-pattern-checks.md) and [T-063](T-063-lesson-promotion-back-sweep.md) both build on these rules.

---

## Acceptance Criteria

- [ ] Performance constraints added with the next `C-NNN` IDs, each with its motivation, wording approved by the user. Candidates from session 12:
  - continuous animation moves or fades only (`transform`/`opacity`), run by CSS or the browser, never recomputed in JavaScript every frame
  - an always-on visual isn't done until measured with [T-060](T-060-perf-test-harness.md)'s test
  - continuous motion respects the reduced-motion setting
- [ ] Every component that animates continuously cites the IDs in its `@propolis` block

---

## Notes
