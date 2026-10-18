---
type: Task
title: "T-058: Make performance part of how every agent works"
description: "Systemic fix for runtime-cost blind spots: automatic pattern checks, a saved performance test, performance guardrails, cost questions in the constitution, and lessons promoted to rules with a back-sweep"
status: backlog
priority: high
tags: [roadmap, task, performance, framework, epic]
timestamp: 2026-10-18T00:00:00Z
---

# T-058: Make performance part of how every agent works

## Context

Raised in session 12 (2026-10-18). The hero's "VLAD PETRE" letters bob forever through Motion `animate={{ y }}`, which runs on the main thread every frame (`src/adapters/primary/components/Hero.tsx:152-168`). The rule that would have prevented it was already in [LESSONS.md](../../memory/LESSONS.md) ("a fixed shape that merely moves, rotates, or fades should always be CSS-only"), written 2026-08-17, three days after the letters were committed (`b5752f5`, 2026-08-14). Nobody applied it back, and no later agent was stopped by it.

The user's ask is not this animation but the reasoning gap behind it: if it happened here, it can be anywhere. Root causes found in the framework:

- "Done" never includes runtime cost: `AGENT.md` Phase 4 attacks correctness only; [DEVELOPER.md](../../../agent/personas/DEVELOPER.md) covers readability, types and state; [GUARDRAILS.md](../../architecture/GUARDRAILS.md) lists a Performance category with no constraints.
- `AGENT.md` Phase 1 tells agents to replicate existing conventions, which copies bad defaults as faithfully as good ones.
- Memory files are on-demand reading, and the lesson was scoped to "decorative background/motif animation", so an agent animating a title wouldn't match it.
- Learning a rule never triggers a check of existing code.
- Performance measuring isn't saved: the hero scripts lived in a session scratchpad and are gone.

Fixes, strongest first: mechanical checks and measurement catch mistakes without relying on recall; rules and constitution questions remind; promotion keeps the first four fed.

---

## Acceptance Criteria

- [ ] All five sub-tasks done
- [ ] Run against commit `b5752f5`, the new checks flag the bobbing name letters

---

## Sub-Tasks

- [T-059](T-059-perf-pattern-checks.md) — Automatic checks for known-bad code patterns *(backlog, after T-061)*
- [T-060](T-060-perf-test-harness.md) — Saved performance test with a baseline *(backlog)*
- [T-061](T-061-performance-guardrails.md) — Performance rules in the guardrails *(backlog)*
- [T-062](T-062-constitution-cost-questions.md) — Cost questions in the constitution *(backlog)*
- [T-063](T-063-lesson-promotion-back-sweep.md) — Lessons become rules, plus a back-sweep of existing code *(backlog, after T-061)*
- [T-064](T-064-moving-parts-audit-fixes.md) — Fix the Moving Parts Audit findings *(done)*

---

## Notes

- T-062 and T-063 change cone's own constitution and memory protocol. They are universal, not project-specific, so they're candidates to port to pinecone once proven here.
- Not to be confused with [T-031](T-031-hero-perf-verification.md) (verify the hero on the testers' old laptops). T-060's harness could feed it, but they are separate.
