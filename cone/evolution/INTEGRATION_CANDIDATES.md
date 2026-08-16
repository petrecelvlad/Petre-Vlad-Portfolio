---
type: Survey
title: Integration Candidates
description: >
  GitHub survey of frameworks similar to cone-lite, shortlisted for evaluation against
  PROJECT_IDENTITY.md's fit criteria before any deep dive or integration decision.
tags: [evolution, survey, external-research]
timestamp: 2026-07-12T00:00:00Z
status: SURVEYED
agent_instructions: >
  This is a discovery-stage candidate list, not a proposal. No fit-criteria evaluation
  has been run against any entry yet — that happens per-candidate, the same way
  mattpocock/skills was surveyed for Proposal 5, and results in a numbered Evolution
  Proposal once a candidate clears the fit criteria in PROJECT_IDENTITY.md.
---

# Integration Candidates

A GitHub survey for frameworks worth evaluating against [PROJECT_IDENTITY.md](./PROJECT_IDENTITY.md)'s fit criteria — the same category of research that produced [Proposal 5](./proposals/Proposal_5.md) from `mattpocock/skills`. Star counts and descriptions only; no deep dive has happened yet for any of these. A lot of noise was filtered out first — single-purpose skill repos (trading, video editing, bug hunting, humor/token-reduction gimmicks) that don't compete with cone-lite's actual niche: a structured, self-describing framework for AI-agent institutional memory.

---

## Tier S — Massive, Framework-Level

The four most likely to actually matter. Three of these (spec-kit, OpenSpec, BMAD) are the exact frameworks `mattpocock/skills`' own README positioned itself against — worth checking whether cone-lite's two-pillar/persona-skill approach holds up the same way, or whether these solve a genuinely different problem (spec-driven development vs. cone-lite's institutional-memory framing).

| Repo | Stars | What it is |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | 252,792 | "An agentic skills framework & software development methodology that works." Largest and most directly comparable thing found. |
| [github/spec-kit](https://github.com/github/spec-kit) | 119,750 | Official GitHub toolkit for Spec-Driven Development. |
| [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) | 60,262 | Spec-driven development for AI coding assistants. |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 50,378 | "Breakthrough Method for Agile AI-Driven Development." |

---

## Tier A — Large, Each Maps to a Specific Pillar

| Repo | Stars | Relevant cone-lite pillar |
|---|---|---|
| [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) | 27,832 | Roadmap / Backlog |
| [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | 25,217 | Session continuity — crash-proof plans that survive context loss |
| [agentsmd/agents.md](https://github.com/agentsmd/agents.md) | 22,958 | Constitution — the open `AGENTS.md` standard |

---

## Tier B — Smaller, Narrower, Still Worth a Look

| Repo | Stars | Relevant cone-lite pillar |
|---|---|---|
| [buildermethods/agent-os](https://github.com/buildermethods/agent-os) | 5,051 | Codebase standards injection for spec-driven dev |
| [microsoft/skills](https://github.com/microsoft/skills) | 2,729 | Official Microsoft skills/agent grounding |
| [Kulaxyz/self-learning-skills](https://github.com/Kulaxyz/self-learning-skills) | 841 | Self-evolution — harvests session patterns into skills automatically |

---

## Open Question

Which of these get a full fit-criteria deep dive next, and in what order? A full pass on all ten in one go is the same shape of effort as the `mattpocock/skills` research, times four or more given Tier S's scale. Decide priority, then run each chosen candidate through [PROJECT_IDENTITY.md](./PROJECT_IDENTITY.md)'s Fit Criteria the way [Proposal 5](./proposals/Proposal_5.md) did — accepted findings become a new numbered proposal, rejected ones get their reasoning recorded the same way Proposal 5's Notes section did.
