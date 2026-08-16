---
type: Protocol
title: cone-lite Philosophy
description: The framework's philosophy and evolution principles — WHAT this system is and WHY it exists.
tags: [philosophy, foundational]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Foundational document — changes here affect the entire framework
agent_instructions: >
  Read during onboarding (Phase 1, Step 2). This document defines WHAT this system is
  and WHY it exists. It does not define HOW to use it — that's in the onboarding docs.
---

# cone-lite Philosophy

## What This Is

This is not a documentation folder. It is the project's operating system.

Code is the most visible artifact of a software project, but it is not the most important. Code changes daily. The understanding of WHY it exists, HOW it should evolve, and WHAT constraints it operates under — that understanding is what makes the difference between a codebase that grows and one that rots.

This framework captures that understanding in a structured, composable, agent-readable system. It is the accumulated intelligence of every session, every mistake, every decision — made accessible to any agent or human who walks in cold.

---

## The Core Premise

**Documentation precedes code.** Not in the waterfall sense of "write a spec before you code." In the sense that the documentation system is the foundation upon which productive coding happens. An agent that understands the architecture, the constraints, the patterns, and the institutional memory of a project will write better code in less time and with fewer tokens than one that explores the codebase from scratch every session.

**"Documentation" is an umbrella term.** It includes:
- **Project documentation** — architecture, specs, design docs, ADRs. What was built and why.
- **Agent documentation** — onboarding sequences, personas, skills, session protocols. How agents operate.
- **Institutional knowledge** — anti-patterns, lessons learned, debugging playbooks. What was learned the hard way.
- **Process documentation** — workflows, methodologies, evolution proposals. How work gets done.

The framework treats all of these as first-class concerns, organized into two pillars.

---

## The Two Pillars

### `cone/agent/` — The Agent Pillar

Everything the agent needs to operate effectively. This pillar answers: "How do I work on this project?"

- **Onboarding** — the phased reading sequence, coding standards, metadata protocols, session management
- **Personas** — mental models that shape HOW the agent thinks (Communicator, Developer, Architect, etc.)
- **Skills** — procedural workflows that guide WHAT the agent does (skill-creator, evolution, etc.)
- **Sessions** — the chronological archive of all work, decisions, and handoffs

The agent pillar changes when workflows improve, new personas emerge, or operational processes evolve. It is independent of what the project builds.

### `cone/project/` — The Project Pillar

Everything about what was built and how to work with it. This pillar answers: "What is this system and how does it work?"

- **Architecture** — system design, component relationships, key decisions
- **Specs** — technical specifications, API contracts, data models
- **Memory** — institutional knowledge distilled from experience (anti-patterns, lessons, playbooks)
- **Roadmap** — active work queue and priorities
- **Archive** — historical record, ADRs, deprecated documentation

The project pillar changes when the system changes. It is independent of how agents operate.

**Why separate them?** Because they evolve at different rates and for different reasons. Improving how agents onboard doesn't change the system architecture. Refactoring a module doesn't change the session protocol. Coupling them creates documents that serve two masters and serve neither well.

---

## Founding Principles

### 1. SRP on Documentation

Every document has one responsibility and one reason to change. Documents compose like code modules — each is independently readable, independently valuable, and independently replaceable.

A document that explains both "what the system does" and "how agents should work on it" will eventually fail at both. Split it.

### 2. First-Person Voice

Agents adopt rules as identity ("I ensure strict isolation between core and infrastructure") rather than following external commands ("The agent should ensure strict isolation"). This is not stylistic — it changes how language models process instructions. First-person creates ownership; third-person creates distance.

### 3. Phased Ingestion

Not every document is relevant at every moment. The onboarding sequence is dependency-ordered: each document builds on the previous one. An agent reads only what it needs for the current phase and consults on-demand docs as work requires.

This is the difference between "read everything" (expensive, low retention) and "read what you need in the right order" (efficient, high retention).

### 4. Grow, Don't Scaffold

The framework ships with structure but not content. Empty template files exist to show what COULD go there, but nobody is expected to fill everything on day one. The framework grows with the project — add documents as the project creates the need for them.

A framework that front-loads structure creates maintenance debt from day one. A framework that grows with the project is always the right size.

### 5. Dual-Purpose Sessions

Session files serve two masters simultaneously: they are a live workspace during a conversation AND a permanent archive after it ends. This dual purpose is intentional. The structure that helps an agent track work in real-time (tasks, decisions, file modifications) is exactly the structure that helps a future agent understand what happened.

### 6. Self-Evolution

The framework includes a mechanism for its own improvement. The [evolution skill](./agent/skills/evolution/SKILL.md) enables any agent to propose improvements to the framework itself — new personas, new skills, structural changes, missing documentation patterns.

A framework that cannot evolve becomes a constraint. A framework that evolves with its users becomes an asset.

---

## What This Framework Is NOT

- **Not a wiki.** Wikis are unstructured and unsearchable by agents. This framework is structured, composable, and machine-readable.
- **Not a documentation generator.** It doesn't auto-generate docs from code. It captures the knowledge that code cannot express: decisions, constraints, patterns, institutional memory.
- **Not a project management tool.** The backlog and session files provide lightweight tracking, but this is not Jira. It's a knowledge system that happens to track work.
- **Not prescriptive about technology.** The framework is technology-agnostic. It works with any language, any framework, any platform. The `AGENT.md` constitution and project pillar are where technology-specific choices live.

---

## How It Evolves

The framework evolves through three mechanisms:

1. **Organic growth** — As the project develops, new documents are added to address emerging needs. A new subsystem gets an architecture doc. A recurring mistake gets an anti-pattern entry. A complex workflow gets a skill.

2. **Evolution proposals** — The [evolution skill](./agent/skills/evolution/SKILL.md) enables structured improvement proposals. Any agent can audit the framework and propose changes: missing documentation, structural improvements, new personas or skills, process gaps.

3. **Session feedback** — Each session is an opportunity to notice what's working and what isn't. If an agent consistently can't find what it needs, that's a signal the framework needs to grow. If an agent reads a document that doesn't help, that's a signal the document needs to change.

The framework is alive. It gets better with use. The worst thing that can happen to it is neglect.
