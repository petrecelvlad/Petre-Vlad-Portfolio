---
type: Skill
title: Bootstrap Architecture
description: >
  Scans an existing, undocumented (or under-documented) codebase and populates
  cone/project/architecture/ — OVERVIEW.md, GUARDRAILS.md constraints, and per-subsystem
  systems/*.md docs — plus AGENT.md's Architectural Guardrails and Tech Stack sections.
  Documents what the codebase actually does, not an invented ideal. Triggers on:
  "document this codebase", "set up cone architecture docs", "bootstrap the architecture
  docs", "this project has no docs, set it up", "fill in OVERVIEW.md".
tags: [skill, documentation, architecture, onboarding]
timestamp: 2026-07-07T00:00:00Z
agent_instructions: >
  Procedural workflow for populating cone/project/architecture/ and AGENT.md's
  placeholder sections from an existing codebase. Adopt the Doc Designer persona first —
  it makes the descriptive-vs-drift and which-subsystems-earn-a-doc judgment calls. This
  skill defines the scan procedure and exactly which file gets which content. Writes
  directly to target files; the user reviews via the resulting diff.
---

# Bootstrap Architecture

A procedure for populating cone's project-pillar architecture docs from an existing codebase, once the Doc Designer persona is active to keep the output descriptive rather than aspirational.

---

## Phase 1: Ingest

Before writing anything, establish ground truth:

- **Entry points** — main files, package manifest scripts, deployment/runtime configs.
- **Module structure** — actual top-level folders and what each one contains, not what a typical project of this kind "should" contain.
- **External dependencies** — databases, APIs, queues, third-party services, found by reading actual imports and config, not assumed from the stack's usual defaults.
- **Data flow** — trace one or two primary flows end-to-end from a real entry point to its output.
- **Dominant conventions** — naming, layering, error handling actually in use. If a Code Quality audit has already run, reuse its baseline instead of re-inferring it.

---

## Phase 2: Map Findings to cone/project/architecture/

### OVERVIEW.md

- **System Purpose** — one paragraph derived from actual entry points and the problem the code solves.
- **Key Architectural Decisions** — 3-5 decisions actually reflected in the code, with rationale inferred from comments, commit history, or structure. If no rationale is recoverable, say so rather than inventing one.
- **Package/Module Structure** — the real top-level layout with one-line responsibilities per folder, taken from Phase 1.
- **Data Flow** — the flow(s) actually traced in Phase 1, not a generic input-processing-output placeholder.
- **External Dependencies** — what Phase 1 actually found, with criticality judged by how deeply each is wired into the core.
- **Constraints & Non-Negotiables** — only patterns confirmed dominant enough for `GUARDRAILS.md`; reference by `C-NNN` ID rather than restating.

### GUARDRAILS.md

For each pattern that is dominant across the codebase (not a single instance) or explicitly confirmed by the user as an intended rule:
1. Assign the next available `C-NNN` ID.
2. Name it, state what it applies to, describe it in one sentence.
3. File it under an existing category (Isolation, Performance, Security, Data, Type Safety, Platform) or add a new category if none fits.

### systems/*.md

For each subsystem that clears the Doc Designer's "would cost a future agent real time to reconstruct" bar:
1. Copy `systems/TEMPLATE.md`, rename to the subsystem name.
2. Fill Purpose, Boundaries (real paths — owns vs. interfaces-with), Key Components (actual files/classes), Data Flow (actual trace), Constraints (cite real `GUARDRAILS.md` IDs), Common Operations (patterns actually observed, e.g. how a new endpoint is typically added, only if that pattern repeats), Known Gotchas (only with evidence — a workaround comment, a `TODO`, a historical bug reference).

Typical candidates: the core domain engine, any module with high fan-in, anything with non-obvious data flow. Skip subsystems a future agent could understand from a two-minute read of the source.

### AGENT.md placeholders

- **Section 1 (Architectural Guardrails)** — a summary pointing at what was just written to `GUARDRAILS.md`, not a duplicate list.
- **Section 2 (Tech Stack)** — the actual language, framework, database, and hosting found in manifests and config.

---

## Phase 3: Handle Drift

When part of the codebase doesn't follow its own dominant pattern:

1. Document the dominant pattern as the real convention in `OVERVIEW.md` / `GUARDRAILS.md`.
2. Record the exception explicitly — file, what it does differently, why if inferable — as a "Known Drift" note in the relevant `systems/*.md`'s Known Gotchas section, or in `ANTI_PATTERNS.md` if it's a project-wide recurring issue rather than a one-off.
3. Never silently pick the "correct" version and document that as if it's universally true.

---

## Phase 4: Write and Report

Write directly to the target files. After writing, summarize for the user:

- Files created or modified.
- Constraints added, with their new `C-NNN` IDs.
- Subsystems documented, and any subsystems considered but skipped, with why.
- Any drift findings recorded, and where.

---

## What Not To Do

- **Don't invent a `docs/` folder** or new top-level files outside `cone/project/architecture/`'s existing structure.
- **Don't promote a single-instance pattern** to a `GUARDRAILS.md` law — dominance across the codebase, or explicit user confirmation, is the bar.
- **Don't describe an idealized architecture** the code doesn't actually follow — that's Aspirational Fiction, the exact failure this skill replaces.
- **Don't regenerate `HEXAGONAL.md`** — it's a static reference document, not per-project content.
