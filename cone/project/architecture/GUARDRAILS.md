---
type: Constraint Registry
title: "Guardrails: Constraint Registry"
description: Single source of truth for all architectural constraints, referenced by ID.
tags: [architecture, constraints, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Single source of truth for all architectural constraints
agent_instructions: >
  Central constraint registry. When a @propolis block references a constraint ID (e.g., C-001),
  this is where the full definition lives. Add new constraints with the next available ID.
  Never remove a constraint — deprecate it.
---

# Guardrails: Constraint Registry

This document is the **single source of truth** for all architectural constraints in the project. Every hard rule that governs how the system is built lives here with a unique ID.

## Why This Exists

Architectural rules scattered across multiple documents are invisible rules. They get contradicted, forgotten, or misapplied. A centralized registry with stable IDs makes constraints:

- **Referenceable** — `@propolis` blocks can cite `C-003` instead of restating the rule
- **Discoverable** — one place to check if a constraint exists before adding a new one
- **Auditable** — grep for a constraint ID to find every file that claims to follow it
- **Versionable** — constraints can be deprecated without breaking references

---

## Constraint Table

<!-- TEMPLATE: Add your project's constraints here. Start with C-001. -->

| ID | Name | Applies To | Description |
|---|---|---|---|
| `C-001` | *e.g., Core Isolation* | *Core services* | *Core logic never imports infrastructure types or framework code* |
| `C-002` | *e.g., Boundary Validation* | *All entry points* | *Every external input must be validated before entering the domain layer* |
| `C-003` | *e.g., No any Types* | *All TypeScript* | *All parameters and return types must be explicitly typed. Use unknown with type guards* |

---

## How to Add a Constraint

1. Take the next available `C-NNN` ID
2. Add a row to the table above
3. Add the constraint ID to relevant `@propolis` blocks in source files
4. Document the motivation — WHY this constraint exists, not just WHAT it forbids

## How to Deprecate a Constraint

Never delete a constraint. Mark it as deprecated:

| ID | Name | Applies To | Description |
|---|---|---|---|
| `C-005` | ~~Old Rule~~ | ~~Adapters~~ | **DEPRECATED (YYYY-MM-DD):** *Reason for deprecation. Superseded by C-012.* |

This prevents confusion when old `@propolis` blocks reference the ID.

---

## Constraint Categories

Use these categories to organize constraints as the registry grows:

| Category | Governs |
|---|---|
| **Isolation** | Package boundaries, import rules, layer separation |
| **Performance** | CPU budgets, latency targets, memory limits |
| **Security** | Authentication, encryption, data handling |
| **Data** | Database patterns, state management, caching |
| **Type Safety** | Type discipline, validation requirements |
| **Platform** | Platform-specific constraints (cloud provider, runtime, browser) |
