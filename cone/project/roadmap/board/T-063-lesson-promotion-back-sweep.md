---
type: Task
title: "T-063: Lessons become rules, plus a back-sweep of existing code"
description: "A lesson that is really a general rule gets promoted to a guardrail (and a check when possible), and each promotion triggers a sweep of existing code"
status: backlog
priority: high
parent: T-058
tags: [roadmap, task, performance, memory, framework]
timestamp: 2026-10-18T00:00:00Z
---

# T-063: Lessons become rules, plus a back-sweep of existing code

## Context

Part of [T-058](T-058-performance-common-sense-system.md). The CSS-only animation rule sat in [LESSONS.md](../../memory/LESSONS.md) as a story about one background, scoped too narrowly to match a bobbing title, and nobody checked code written before it. A sweep at the time would have caught the name letters three days after they were made.

---

## Acceptance Criteria

- [ ] The memory protocol (`CLAUDE.md` Memory Rules and the [LESSONS.md](../../memory/LESSONS.md) / [ANTI_PATTERNS.md](../../memory/ANTI_PATTERNS.md) headers) says: a lesson that is a general rule gets promoted to a guardrail, plus a check in [T-059](T-059-perf-pattern-checks.md) when it can be written as one, and the promotion opens a back-sweep card
- [ ] Current LESSONS and ANTI_PATTERNS entries reviewed for promotion, the CSS-only animation lesson included
- [ ] Back-sweep: `src/` checked against every rule promoted here and in [T-061](T-061-performance-guardrails.md), findings listed with file and line, each fix its own card (the name letters in `Hero.tsx:152-168` are one known finding)

---

## Notes

- Universal, not project-specific: a candidate to port to pinecone's memory protocol once proven here.
