---
type: Evolution Proposal
title: "Proposal 2: Post-OKF Migration Cleanup"
description: Fix stale content, broken formatting, and gaps surfaced by the OKF migration.
tags: [evolution, proposal]
timestamp: 2026-06-24T00:00:00Z
status: IMPLEMENTED
impact: HIGH
affected_pillar: both
author: Claude Sonnet 4.6
---

# Proposal 2: Post-OKF Migration Cleanup

## Summary

The OKF migration changed how metadata works in the cone/ bundle, but several documents still describe the old system. This proposal fixes stale content that will actively mislead agents, a formatting defect introduced during migration, and gaps that cold-start onboarding exposed.

---

## Findings

### 1. PROPOLIS.md Still Shows @propolis in Markdown Example
**Category:** Coverage
**Impact:** HIGH
**Current state:** `cone/agent/onboarding/PROPOLIS.md` lines 135-145 show a "markdown document" example using `@propolis` JSON in a markdown file.
**Problem:** Markdown files in cone/ now use OKF YAML frontmatter, not @propolis. An agent reading this example will apply the wrong metadata format. The document's own `agent_instructions` mentions OKF, but the examples section contradicts it.
**Recommendation:** Replace the markdown example with an OKF frontmatter example. Add a clear note that @propolis is for code files only; markdown files use OKF frontmatter.

### 2. Evolution SKILL.md Has Broken Formatting
**Category:** Structure
**Impact:** HIGH
**Current state:** Lines 135-138 of `cone/agent/skills/evolution/SKILL.md` contain a stray `**Notes` heading and orphaned code block close from the old inline template that was partially replaced.
**Problem:** The skill document has corrupted content that would confuse any agent trying to follow Step 3.
**Recommendation:** Clean up the remnant — remove the stray `**Notes`, the orphaned body text, and the closing ``` that belonged to the old inline template.

### 3. AGENT.md Propolis Section Doesn't Mention OKF
**Category:** Onboarding
**Impact:** MEDIUM
**Current state:** Section 3 of AGENT.md says "I ensure every source file I create or modify begins with a @propolis metadata block" with no mention of OKF frontmatter for markdown.
**Problem:** An agent reading AGENT.md cold will apply @propolis to markdown files. The OKF context only appears in CLAUDE.md, which is provider-specific — an agent using GEMINI.md or another companion won't see it.
**Recommendation:** Update AGENT.md section 3 to clarify: @propolis for code files, OKF YAML frontmatter for markdown files in cone/. Keep it brief — point to PROPOLIS.md and the OKF adaptation doc for details.

### 4. AGENT.md Placeholder Sections Are Confusing
**Category:** Onboarding
**Impact:** MEDIUM
**Current state:** Sections 1 (Architectural Guardrails) and 2 (Tech Stack) contain only HTML comments saying "CUSTOMIZE: Replace this section" with placeholder text.
**Problem:** An agent reading AGENT.md as "the law" finds two sections that say nothing. For cone-lite as a framework template, these should either describe the framework's own constraints or explicitly state they're template placeholders to be filled when adopted by a real project.
**Recommendation:** Add a brief note at the top of each placeholder section: "This section is a template. When cone-lite is adopted by a project, replace with the project's actual constraints/stack."

### 5. No OKF Awareness in Onboarding Sequence
**Category:** Onboarding
**Impact:** MEDIUM
**Current state:** The onboarding sequence in CLAUDE.md and START_HERE.md doesn't mention OKF. An agent learns about frontmatter conventions only if they happen to read the CLAUDE.md OKF section or encounter a cone/ file.
**Problem:** Agents will encounter OKF frontmatter in every file but won't understand the convention (what fields are required, what extensions exist) until they've already been working.
**Recommendation:** Add a brief OKF note to START_HERE.md's "Why Order Matters" or Phase 1 section: "All cone/ documents use OKF YAML frontmatter — see the OKF section in your companion file for details."

### 6. Dead Structure and Cleanup
**Category:** Structure
**Impact:** LOW
**Current state:** `cone/evolution/.gitkeep` still exists despite the directory now having content. `cone/project/archive/reports/` has only a `.gitkeep` with no foreseeable content.
**Problem:** Dead files add minor noise.
**Recommendation:** Remove `cone/evolution/.gitkeep`. Keep `cone/project/archive/reports/.gitkeep` for now — it signals the directory exists for future use.

---

## Implementation Order

1. Finding 2 (evolution SKILL.md formatting) — quick fix, prevents agent confusion right now
2. Finding 1 (PROPOLIS.md stale example) — quick fix, prevents wrong metadata format
3. Finding 3 (AGENT.md propolis section) — quick fix, one sentence addition
4. Finding 5 (onboarding OKF awareness) — quick fix, one sentence addition
5. Finding 4 (AGENT.md placeholders) — quick fix, one line per section
6. Finding 6 (dead .gitkeep) — trivial cleanup

---

## Notes

All findings are quick fixes (1-3 line edits each). The entire proposal could be implemented in a single pass. Findings 1-3 are the most important — they directly prevent agents from applying the wrong metadata format.
