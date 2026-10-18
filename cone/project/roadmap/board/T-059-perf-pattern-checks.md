---
type: Task
title: "T-059: Automatic checks for known-bad code patterns"
description: "A script that scans the code for known performance mistakes and stops the change when it finds one, so no agent has to remember the rule"
status: backlog
priority: high
parent: T-058
tags: [roadmap, task, performance, tooling]
timestamp: 2026-10-18T00:00:00Z
---

# T-059: Automatic checks for known-bad code patterns

## Context

Part of [T-058](T-058-performance-common-sense-system.md). The strongest layer: a check doesn't depend on any agent remembering anything. Each check enforces a rule from [T-061](T-061-performance-guardrails.md), so that card comes first.

---

## Acceptance Criteria

- [ ] When it runs is decided with the user: before each commit, as an npm script, as a Claude Code hook, or a combination
- [ ] First check: a Motion animation that loops forever (`repeat: Infinity`) on a property that isn't compositor-only (`x`, `y`, `scale`, `rotate`, anything but a full `transform` string or `opacity`)
- [ ] Every check names the guardrail ID it enforces and says what to do instead
- [ ] It flags `Hero.tsx`'s name letters today and passes on code that follows the rule
- [ ] How to run it is documented in [SETUP.md](../../operations/SETUP.md)

---

## Notes

- 2 `repeat: Infinity` loops exist in `src/` today (2026-10-18). Which ones break the rule is T-063's back-sweep.
