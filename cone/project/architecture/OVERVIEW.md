---
type: Architecture
title: System Architecture Overview
description: System design overview — purpose, key decisions, module structure, data flow, constraints.
tags: [architecture, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Must be kept current with the actual system design
agent_instructions: >
  This is the system architecture overview. Fill in each section for your project.
  An agent reading this should understand the system's intent without reading source code.
---

# System Architecture Overview

<!-- TEMPLATE: Fill in each section below for your project. Delete this comment when done. -->

---

## System Purpose

<!-- One paragraph: what does this system do, who is it for, and what problem does it solve? -->

*Describe your system's core purpose here.*

---

## Key Architectural Decisions

<!-- List the 3-5 most important design choices and WHY they were made. For detailed rationale, create ADRs in cone/project/archive/decisions/. -->

| Decision | Rationale |
|---|---|
| *e.g., Hexagonal Architecture* | *e.g., Need to swap database implementations without touching business logic* |
| *e.g., Monorepo with workspaces* | *e.g., Shared types across frontend and backend, atomic deployments* |

---

## Package / Module Structure

<!-- Describe the major modules, packages, or directories and their responsibilities. -->

```
src/
├── core/          — [describe]
├── adapters/      — [describe]
├── api/           — [describe]
└── ui/            — [describe]
```

---

## Data Flow

<!-- Describe the primary data flow through the system. Use a simple diagram or text trace. -->

```
[Input] → [Validation] → [Processing] → [Storage] → [Response]
```

*Describe each step briefly.*

---

## External Dependencies

<!-- List external systems this project depends on (databases, APIs, services). -->

| Dependency | Purpose | Criticality |
|---|---|---|
| *e.g., PostgreSQL* | *Primary data store* | *Critical* |
| *e.g., Stripe API* | *Payment processing* | *Critical* |
| *e.g., SendGrid* | *Email notifications* | *Non-critical* |

---

## Constraints & Non-Negotiables

<!-- List hard constraints that shape every decision in this project. These should also appear in AGENT.md under Architectural Guardrails. -->

- *e.g., All API responses must complete within 200ms*
- *e.g., No PII stored outside the encrypted user table*
- *e.g., The core/ package never imports from adapters/ or api/*
