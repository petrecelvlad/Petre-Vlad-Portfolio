---
type: Task
title: "T-031: Verify Hero performance on older laptops"
description: "Confirm the WebGL background + overall Hero section actually run acceptably on the low-end hardware that originally reported lag/crashes"
status: backlog
priority: high
parent: T-030
tags: [roadmap, task, hero, performance]
timestamp: 2026-08-24T00:00:00Z
---

# T-031: Verify Hero performance on older laptops

## Context

Part of [T-030](T-030-hero-section-polish.md). Several perf fixes have already shipped this
project (grass count reductions, shadow removal on trees, the `isVisible`/scroll-pause fixes, the
WebGL-unavailable fallback + Error Boundary) in response to two separate real-tester lag/crash
reports, but none of it has been re-verified live on the actual reporting hardware since.

---

## Acceptance Criteria

- [ ] Site tested live on the older laptop(s) that originally reported lag/crashes
- [ ] No crash, and framerate/scroll feel reported as acceptable by the actual tester(s)
- [ ] Any remaining issues captured as new cards rather than silently accepted

---

## Sub-Tasks

(none — verification task, not further decomposable)

---

## Notes

Depends on the user (or the original testers) actually running the site on that hardware — no
agent in this session has access to real device testing.
