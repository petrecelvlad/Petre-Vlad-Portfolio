---
type: Task
title: "T-001: Evaluate GitHub integration candidates"
description: Run each shortlisted candidate from INTEGRATION_CANDIDATES.md through PROJECT_IDENTITY.md's fit criteria and decide what to integrate.
status: backlog
priority: high
tags: [roadmap, task, evolution]
timestamp: 2026-07-12T00:00:00Z
---

# T-001: Evaluate GitHub integration candidates

## Context

[INTEGRATION_CANDIDATES.md](../../../evolution/INTEGRATION_CANDIDATES.md) shortlisted 10 frameworks from a GitHub survey, tiered by scale and relevance. None have been deep-dived yet. This is the epic tracking that whole effort — too large for one card, per [PROJECT_IDENTITY.md](../../../evolution/PROJECT_IDENTITY.md)'s own Fit Criteria #5 (earns its complexity) applied to the work itself, not just the candidates.

---

## Acceptance Criteria

- [ ] Priority order decided across the 10 candidates
- [ ] Each child card deep-dived, in whatever order gets chosen
- [ ] Each evaluated candidate produces either a numbered Evolution Proposal (accepted findings) or a recorded rejection with reasoning (same shape as Proposal 5's Notes section)

---

## Sub-Tasks

All 10 candidates from the survey — every one is already identified and scoped, so every one gets a card at `backlog` now. `ready` is a separate, later decision per card, not a gate on the card existing at all.

**Tier S (high priority):**
- [T-002](T-002-superpowers.md) — obra/superpowers
- [T-003](T-003-spec-kit.md) — github/spec-kit
- [T-004](T-004-openspec.md) — Fission-AI/OpenSpec
- [T-005](T-005-bmad-method.md) — bmad-code-org/BMAD-METHOD

**Tier A (medium priority):**
- [T-006](T-006-claude-task-master.md) — eyaltoledano/claude-task-master
- [T-007](T-007-planning-with-files.md) — OthmanAdi/planning-with-files
- [T-008](T-008-agents-md.md) — agentsmd/agents.md

**Tier B (low priority):**
- [T-009](T-009-agent-os.md) — buildermethods/agent-os
- [T-010](T-010-microsoft-skills.md) — microsoft/skills
- [T-011](T-011-self-learning-skills.md) — Kulaxyz/self-learning-skills

---

## Notes

**2026-07-12 — corrected an error in the initial design.** This card originally withheld all child cards until each candidate was "prioritized," conflating two different things: hypothetical work that doesn't exist yet (correctly held back) vs. already-identified, already-scoped work that just hasn't been ordered yet (what `backlog` status exists for). All 10 candidates were already fully identified in `INTEGRATION_CANDIDATES.md` — they should have been created immediately. Fixed by creating T-002 through T-011 at `backlog`, priority mirroring tier. `PLANNER.md` and `board/SKILL.md` corrected to reflect the right distinction.
