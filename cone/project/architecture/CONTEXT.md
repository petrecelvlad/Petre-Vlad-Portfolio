---
type: Glossary
title: Context — Ubiquitous Language
description: >
  Living glossary of terms whose meaning has caused or could cause ambiguity across
  cone-lite's own documentation. Grows reactively as terms get resolved, not batched.
tags: [architecture, glossary, project]
timestamp: 2026-07-11T00:00:00Z
constraints:
  - Add an entry the moment a term is used ambiguously and gets resolved — don't batch
  - Point to the canonical doc for a term rather than redefining it here, when one exists
agent_instructions: >
  Consult this before assuming the meaning of a term that appears in multiple cone/
  documents without one obvious source of truth. When a conversation resolves an
  ambiguous term, add it here immediately, not at end of session. This file documents
  cone-lite's own vocabulary — not the adopting project's domain vocabulary, which
  belongs in a project-specific CONTEXT.md if the adopting project needs one.
---

# Context — Ubiquitous Language

This is a glossary of terms specific to how *this framework* uses them — not a general dictionary. An entry exists here because the term has been used ambiguously somewhere in `cone/`, or is easy to misread by analogy to its everyday meaning. If a term already has one canonical, unambiguous source, this file points there instead of redefining it.

Add an entry the moment a term causes confusion and gets resolved in conversation. Don't wait to batch updates — an unresolved ambiguity that isn't written down here will resurface for the next agent exactly as it did for this one.

---

## `cone/` vs. cone-lite

**`cone/`** is the directory — the OKF-conformant knowledge bundle itself. **cone-lite** is the name of the framework/project that directory belongs to. A sentence like "add this to cone" means "add a file under `cone/`"; "cone-lite's philosophy" refers to the framework's principles, which live partly outside `cone/` (in `AGENT.md`, at the repo root).

## Pillar

One of the two top-level halves of `cone/`: the **agent pillar** (`cone/agent/` — onboarding, personas, skills, sessions; how an agent operates) and the **project pillar** (`cone/project/` — architecture, specs, memory, roadmap, archive; what was built). See [PHILOSOPHY.md](../../PHILOSOPHY.md) for why they're split. A "pillar" is never a subdirectory within one of these two — it's specifically this top-level division.

## Guardrail vs. Constraint

These are used almost interchangeably but aren't quite synonyms. A **constraint** is the formal unit: a row in [GUARDRAILS.md](./GUARDRAILS.md)'s table with a stable `C-NNN` ID, a name, and a description. A **guardrail** is the informal, collective term for the constraint system as a whole — "the project's guardrails" means "everything in `GUARDRAILS.md`." `AGENT.md`'s "Architectural Guardrails" section is a summary pointer at the constraint table, not a second, separate list — don't populate both independently.

## System (as in `systems/*.md`)

A subsystem large or complex enough to have earned its own doc under [systems/](./systems/TEMPLATE.md) — not every module or folder. See the Doc Designer persona's heuristic: a system doc is warranted only if reconstructing that subsystem from source would cost a future agent real time. "System" and "subsystem" are used interchangeably in this framework; there's no distinction between the two words.

## OKF vs. Propolis

Two separate metadata systems with a strict scope split, easy to conflate. **OKF** (Open Knowledge Format) YAML frontmatter governs every markdown file in `cone/` (except `index.md` and `log.md`). **Propolis** (`@propolis` JSON blocks) governs source *code* files only — it does not apply to markdown. See [OKF_METADATA_MIGRATION_GUIDE.md](../../evolution/OKF/OKF_METADATA_MIGRATION_GUIDE.md) for the full history of this split.

## Concept (OKF term)

In OKF's model, every non-reserved markdown file in `cone/` is a "concept" — its ID is derived from its file path (e.g., `cone/agent/personas/DEVELOPER.md` is the concept `agent/personas/DEVELOPER`). "Concept" in this framework always means "a markdown file with OKF frontmatter," not a general idea or topic.

## Proposal

Ambiguous by design across two different meanings — check which kind before reading or writing one. A **project proposal** ([specs/proposals/TEMPLATE.md](../specs/proposals/TEMPLATE.md)) proposes a feature or design change to the *project being built*. An **evolution proposal** ([evolution/proposals/PROPOSAL_TEMPLATE.md](../../evolution/proposals/PROPOSAL_TEMPLATE.md)) proposes a change to *the cone-lite framework itself* — new personas, skills, structural improvements. They live in different directories (`cone/project/specs/proposals/` vs. `cone/evolution/proposals/`) and are never interchangeable.

## Canon — not cone-lite vocabulary

An earlier, borrowed draft of the [Doc Designer](../../agent/personas/DOC_DESIGNER.md) persona used "Architectural Canon" to describe the set of generated architecture documents. That term was removed as contaminated language carried over from an unrelated project's prompt during the persona's rewrite. Use "architecture docs" or name the specific file (`OVERVIEW.md`, a `systems/*.md` entry) instead. If "Canon" reappears in a draft, it's drift from the removed version, not a reintroduced convention.
