---
type: Bootloader
title: "Start Here: Onboarding Sequence"
description: Framework entry point — the phased onboarding sequence agents follow on first load.
tags: [onboarding, agent]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Must be read before any other cone/ document
agent_instructions: >
  This is the framework entry point. Follow the phased onboarding sequence exactly.
  Each phase gives you a specific capability — do not skip ahead.
---

# Start Here: Onboarding Sequence

This document defines the order in which you read the framework. The sequence is dependency-ordered — each document builds on the previous one. Skipping ahead means operating without context that later documents assume you have.

---

## The Two Pillars

This framework is organized into two pillars:

- **`cone/agent/`** — Everything the agent needs to operate: onboarding, personas, skills, sessions. This is YOUR operating system.
- **`cone/project/`** — Everything about what was built: architecture, specs, memory, roadmap, archive. This is the PROJECT's documentation.

The separation matters. Agent docs change when workflows improve. Project docs change when the system changes. They evolve independently.

---

## Why Order Matters

This framework applies the Single Responsibility Principle to documentation. Each document has one job:

- `AGENT.md` gives you your operational rules and constraints
- `PHILOSOPHY.md` gives you the framework's purpose and principles
- Your companion file (`CLAUDE.md`, etc.) gives you your provider-specific protocols
- `CODING_COMPANION.md` gives you your coding discipline
- `OVERVIEW.md` gives you the system's architecture
- Personas give you your mode of thinking

Reading them out of order means reading a document that references concepts you haven't encountered yet. Reading them in order means each document clicks into place.

**Note:** All documents in `cone/` use OKF (Open Knowledge Format) YAML frontmatter. See the OKF section in your companion file for details on required fields and cone-specific extensions.

---

## Phase 1: Rules (How I Operate)

**Goal:** Understand the project's constraints, my behavioral standards, and my operational protocols.

| Step | Document | What I gain |
|---|---|---|
| 1 | `AGENT.md` | My constitution: phases, guardrails, standing rules |
| 2 | [PHILOSOPHY.md](../../PHILOSOPHY.md) | Framework purpose, principles, and evolution model |
| 3 | `CLAUDE.md` (or provider companion) | My onboarding sequence, session protocol, memory rules |
| 4 | [CODING_COMPANION.md](./CODING_COMPANION.md) | My coding discipline: naming, functions, errors, types |

After Phase 1, I can operate safely on any task. I know the rules, the constraints, and how to write code that meets the project's standards.

---

## Phase 2: Territory (What Was Built)

**Goal:** Understand the system's architecture, components, and key relationships.

| Step | Document | What I gain |
|---|---|---|
| 5 | [OVERVIEW.md](../../project/architecture/OVERVIEW.md) | System design, key decisions, component structure |
| 6 | [systems/*.md](../../project/architecture/systems/TEMPLATE.md) | Deep-dive into specific subsystems (read as needed) |
| 7 | `GRAPH_SPINE.md` (when available) | Dependency graph, god nodes, blast radius awareness |

After Phase 2, I understand what was built and why. I can assess blast radius before making changes and navigate the codebase with context.

---

## Phase 3: Identity (How I Think)

**Goal:** Adopt the mental models that shape my reasoning for this session.

| Step | Document | What I gain |
|---|---|---|
| 8 | [COMMUNICATOR.md](../personas/COMMUNICATOR.md) | Information density, response calibration (always-active) |
| 9 | [PLANNER.md](../personas/PLANNER.md) | Task granularity, board-card discipline, WIP hygiene (always-active) |
| 10 | [DEVELOPER.md](../personas/DEVELOPER.md) | Coding mental model (activate if coding this session) |
| 11 | Other personas as needed | Task-specific mental models |

After Phase 3, I'm fully onboarded. I have rules, territory, and identity. I can begin work.

---

## On-Demand Reading

These documents are consulted during work, not during onboarding:

| When I need to... | I read... |
|---|---|
| Create or manage a session file | [SESSIONS.md](./SESSIONS.md) |
| Add code file metadata | [PROPOLIS.md](./PROPOLIS.md) |
| Understand hex architecture | [HEXAGONAL.md](../../project/architecture/HEXAGONAL.md) |
| Check architectural constraints | [GUARDRAILS.md](../../project/architecture/GUARDRAILS.md) |
| Document a subsystem | [systems/TEMPLATE.md](../../project/architecture/systems/TEMPLATE.md) |
| Write a technical spec | `cone/project/specs/` |
| Propose a project feature/change | [proposals/TEMPLATE.md](../../project/specs/proposals/TEMPLATE.md) |
| Set up local dev environment | [SETUP.md](../../project/operations/SETUP.md) |
| Understand deployment | [DEPLOYMENT.md](../../project/operations/DEPLOYMENT.md) |
| Check env vars or platform quirks | [ENVIRONMENT.md](../../project/operations/ENVIRONMENT.md) |
| Check known failure modes | [PLAYBOOK.md](../../project/memory/PLAYBOOK.md) |
| Check anti-patterns | [ANTI_PATTERNS.md](../../project/memory/ANTI_PATTERNS.md) |
| Check confirmed practices | [LESSONS.md](../../project/memory/LESSONS.md) |
| Make an architectural decision | [decisions/TEMPLATE.md](../../project/archive/decisions/TEMPLATE.md) |
| Create a new persona | [PERSONA_CREATOR.md](../personas/PERSONA_CREATOR.md) |
| Create a new skill | [skill-creator/SKILL.md](../skills/skill-creator/SKILL.md) |
| Propose framework improvements | [evolution/SKILL.md](../skills/evolution/SKILL.md) |

---

## Continuing a Previous Session

Before creating a new session file, check `cone/agent/sessions/` for any file with `IN-PROGRESS` or `HANDOFF` status.
- `IN-PROGRESS` → continue from it. Do not create a new file.
- `HANDOFF` → read the handoff section to understand remaining work, then create a new session file.

See [SESSIONS.md](./SESSIONS.md) for the full session protocol.
