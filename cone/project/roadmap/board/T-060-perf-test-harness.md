---
type: Task
title: "T-060: Saved performance test with a baseline"
description: "One command that measures the hero's fps, CPU and RAM and compares them to saved numbers from the user's PC"
status: in-progress
priority: high
parent: T-058
tags: [roadmap, task, performance, tooling]
timestamp: 2026-10-18T00:00:00Z
---

# T-060: Saved performance test with a baseline

## Context

Part of [T-058](T-058-performance-common-sense-system.md). The hero measurements of 2026-10-18 (artifacts "Hero Performance Report", "Hero Smoothness Plan", "Background Before and After") used scripts in a session scratchpad that no longer exist. Without a repeatable measurement, "cheap" stays a guess.

---

## Acceptance Criteria

- [ ] One command (e.g. `npm run perf`) measures the hero: fps, CPU, RAM, and background frame time alone
- [ ] Baseline numbers from the user's PC (i5-4440, HD Graphics 4600) saved in the repo
- [ ] Each run compares against the baseline and reports any regression
- [ ] Method and reading of the numbers documented beside the script (runs alternate, middle of 3, known ±15% CPU noise)
- [ ] The user confirms a run doesn't make their PC lag

---

## Notes

- Watch-out: Playwright was removed at the user's request because it made their PC lag ([PLAYBOOK.md](../../memory/PLAYBOOK.md)). The 2026-10-18 measurements drove headless Microsoft Edge directly; the method is described in the "Hero Smoothness Plan" artifact (https://claude.ai/artifact/PS34wVGoi21rERYxUVvhoE). Don't add Playwright or Puppeteer back without asking.
