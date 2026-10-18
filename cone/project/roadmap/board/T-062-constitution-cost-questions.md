---
type: Task
title: "T-062: Cost questions in the constitution"
description: "AGENT.md asks about runtime cost when planning and when reviewing, and stops telling agents to copy conventions that a rule contradicts"
status: backlog
priority: high
parent: T-058
tags: [roadmap, task, performance, framework]
timestamp: 2026-10-18T00:00:00Z
---

# T-062: Cost questions in the constitution

## Context

Part of [T-058](T-058-performance-common-sense-system.md). `AGENT.md` defines the phases every agent works through. Today none of them asks what a change costs while it runs, and Phase 1's "Conventions: 2-3 existing patterns I must replicate" copies bad defaults along with good ones.

---

## Acceptance Criteria

- [ ] Phase 1 asks: does this run continuously (every frame, scroll or render)? If so, what's its cheapest correct mechanism?
- [ ] Phase 4 adds a cost audit: was what runs continuously measured?
- [ ] The Conventions item says to replicate existing patterns unless a guardrail or lesson contradicts them
- [ ] Wording approved by the user

---

## Notes

- Universal, not project-specific: a candidate to port to pinecone's `AGENT.md` once proven here.
