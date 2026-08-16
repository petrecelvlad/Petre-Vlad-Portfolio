---
type: Evolution Proposal
title: "Proposal 4: Remove the original project References, Update Adoption Guides for OKF"
description: Erase all the original project provenance, update START_NEW.md and APPLY_TO_EXISTING.md for the OKF metadata model, improve linter.
tags: [evolution, proposal]
timestamp: 2026-06-24T00:00:00Z
status: IMPLEMENTED
impact: HIGH
affected_pillar: both
author: Claude Sonnet 4.6
---

# Proposal 4: Remove the original project References, Update Adoption Guides for OKF

## Summary

The README still traces cone-lite's origin to "the original project" — this must be removed entirely. The two adoption guides (START_NEW.md and APPLY_TO_EXISTING.md) still describe the pre-OKF metadata model exclusively, telling users to add @propolis blocks to all files including markdown. The linter produces false-positive warnings on links inside code blocks.

---

## Findings

### 1. README.md Contains the original project References
**Category:** Coverage
**Impact:** HIGH
**Current state:** Line 3: "Born from the [the original project](https://github.com/petrecelvlad) pinecone system". Line 73: "Origin: Distilled from the the original project pinecone documentation system."
**Problem:** User explicitly wants zero the original project references anywhere in the project.
**Recommendation:** Rewrite the opening paragraph to describe cone-lite on its own terms. Remove the origin line entirely.

### 2. START_NEW.md Describes Pre-OKF Metadata Only
**Category:** Onboarding
**Impact:** MEDIUM
**Current state:** Step 7 says "Every new source file gets a @propolis block" with no mention that markdown files in cone/ use OKF frontmatter instead.
**Problem:** A user following this guide for a new project will apply @propolis to markdown files in cone/, which is wrong post-migration.
**Recommendation:** Update Step 7 to clarify: @propolis for code files, OKF frontmatter for cone/ markdown. Add lint:okf and visualize to the "What to Add as You Grow" table.

### 3. APPLY_TO_EXISTING.md Describes Pre-OKF Metadata Exclusively
**Category:** Onboarding
**Impact:** MEDIUM
**Current state:** Step 4 is entirely about @propolis adoption for all files. Multiple paragraphs describe adding @propolis blocks to source files and reaching a 60% threshold for graph generation.
**Problem:** Same as finding 2 — no mention that cone/ markdown uses OKF frontmatter. The graph:sync reference is also stale since the visualizer now handles the graph.
**Recommendation:** Update Step 4 to clarify the split: @propolis for code, OKF frontmatter is already in place for cone/ docs. Mention the visualizer as the existing graph tool. Update the integration summary checklist.

### 4. Linter Warns on Links Inside Code Blocks
**Category:** Workflow
**Impact:** LOW
**Current state:** The linter regex matches markdown links inside fenced code blocks (e.g., the example in OKF_ADAPTATION.md). This produces 4 persistent false-positive warnings.
**Problem:** Noise that trains users to ignore linter output. The 6 warnings have been "same illustrative warnings" across 3 proposals — that's a signal they should be suppressed.
**Recommendation:** Update the linter to skip content inside fenced code blocks (``` ... ```) before extracting links.

---

## Implementation Order

1. Finding 1 (the original project removal) — immediate, user-critical
2. Finding 4 (linter code block awareness) — quick, eliminates persistent noise
3. Finding 2 (START_NEW.md) — quick edit
4. Finding 3 (APPLY_TO_EXISTING.md) — moderate edit, most content

---

## Notes

Findings 2 and 3 affect how new adopters experience the framework. Since cone-lite is a template project meant to be forked, these guides are the primary user-facing surface — getting them right matters more than in a typical project.
