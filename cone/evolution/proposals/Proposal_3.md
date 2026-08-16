---
type: Evolution Proposal
title: "Proposal 3: Progressive Disclosure Gaps & Stale Tooling Scripts"
description: Add missing index.md files, clean up stale package.json scripts, document framework tooling.
tags: [evolution, proposal]
timestamp: 2026-06-24T00:00:00Z
status: IMPLEMENTED
impact: MEDIUM
affected_pillar: both
author: Claude Sonnet 4.6
---

# Proposal 3: Progressive Disclosure Gaps & Stale Tooling Scripts

## Summary

11 directories in cone/ lack index.md files, breaking OKF progressive disclosure — agents entering these directories can't see what's available without listing files. The package.json scripts still reference pre-OKF concepts, and the framework's own tooling (linter, visualizer) isn't documented anywhere an agent would find it.

---

## Findings

### 1. Missing index.md Files in 7 Directories
**Category:** Structure
**Impact:** MEDIUM
**Current state:** 11 directories lack index.md. Of these, 4 are leaf directories with only one file (skill-creator/, evolution/, archive/reports/, archive/decisions/) where an index adds no value. The remaining 7 have multiple files or subdirectories where progressive disclosure helps.
**Problem:** An agent or the OKF visualizer entering these directories has no overview of contents. OKF's progressive disclosure pattern is partially implemented.
**Recommendation:** Add index.md to these 7 directories: `cone/project/operations/`, `cone/project/specs/`, `cone/project/archive/`, `cone/project/roadmap/`, `cone/agent/sessions/`, `cone/project/specs/proposals/`, `cone/project/architecture/systems/`.

### 2. package.json TODO Scripts Reference Stale Concepts
**Category:** Coverage
**Impact:** MEDIUM
**Current state:** `docs:audit` is now largely redundant with `lint:okf`. `docs:atlas` references "frontmatter and first heading" which is closer to correct but the script is still a TODO echo. `graph:sync` and `graph:slice` reference "@propolis blocks from all source files" — still valid for code files but the description doesn't mention OKF.
**Problem:** Stale TODOs mislead agents about what tooling exists vs. what's planned. `docs:audit` duplicates `lint:okf`.
**Recommendation:** Remove `docs:audit` (superseded by `lint:okf`). Update `graph:sync` and `graph:slice` descriptions to mention both @propolis (code) and OKF frontmatter (docs). Keep `docs:atlas` as a valid TODO.

### 3. Framework Tooling Not Documented in Operations
**Category:** Coverage
**Impact:** MEDIUM
**Current state:** `npm run lint:okf` and `npm run visualize` exist but aren't mentioned in any operational doc. SETUP.md is a template with placeholder commands. CLAUDE.md mentions the visualize command but a non-Claude agent won't see that.
**Problem:** An agent looking at SETUP.md's "Common Commands" table won't discover the framework's own quality tools.
**Recommendation:** Add `lint:okf` and `visualize` to SETUP.md's Common Commands table with a note that `visualize` requires the `reference-agent` Python package from GoogleCloudPlatform/knowledge-catalog.

### 4. Evolution Skill Should Reference the Linter
**Category:** Workflow
**Impact:** LOW
**Current state:** The evolution skill's audit checklist (Step 1, category D: "Structural Health") asks about cross-references but doesn't mention running the linter.
**Problem:** The linter answers several audit questions automatically (broken links, missing frontmatter, missing type fields). Not referencing it means agents manually check what a script already verifies.
**Recommendation:** Add a note to Step 1: "Run `npm run lint:okf` first — it answers several structural health questions automatically."

---

## Implementation Order

1. Finding 1 (missing index.md files) — 7 small files, quick
2. Finding 2 (stale package.json scripts) — quick edit
3. Finding 3 (SETUP.md tooling docs) — quick edit
4. Finding 4 (evolution skill linter reference) — one line

---

## Notes

Finding 1 is the bulk of the work by file count but each index.md is 3-6 lines. The remaining findings are single-file edits.
