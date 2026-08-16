---
type: Skill
title: Quality Audit
description: >
  Line-by-line code hygiene audit — infers a codebase's own dominant conventions, then
  flags naming drift, formatting inconsistency, stale or unclear comments, unreadable
  length or nesting, and unexplained magic values, ranked by actual impact rather than
  raw count. Duplicate-code findings are recorded but handed to the Unifier persona and
  `unify` skill rather than resolved here. Triggers on: "audit code quality", "find code
  smells", "check style consistency", "review for hygiene issues", "clean code review".
tags: [skill, quality, review]
timestamp: 2026-07-07T00:00:00Z
agent_instructions: >
  Procedural workflow for a code hygiene audit. Adopt the Code Quality persona first —
  it makes the materiality and severity judgment calls. This skill defines the scan
  procedure and report format. When duplicate code is found, record it as a finding
  with its occurrence count and stop; do not propose the extraction here — that
  judgment belongs to the Unifier persona and the `unify` skill.
---

# Quality Audit

A procedure for scanning a codebase for hygiene defects and reporting them ranked by consequence, once the Code Quality persona is active to make the materiality calls.

---

## Phase 1: Establish the Baseline

Before flagging anything, infer the conventions actually dominant in the target codebase:
- Naming case (camelCase, snake_case, PascalCase) per identifier kind
- Indentation (tabs vs. spaces) and general spacing
- Existing comment style and density

This baseline — not an external style guide — is what deviations get measured against.

---

## Phase 2: Detection

Scan systematically for each category. Every finding must cite specific file(s) and line numbers.

**Naming inconsistency** — identifiers that deviate from the inferred baseline (e.g., `snake_case` variables in an otherwise `camelCase` project). Includes **Mysterious Name**: a name that's internally consistent with the baseline but still requires reading the implementation to understand — a convention violation isn't the only way a name can fail.

**Formatting inconsistency** — mixed indentation, or spacing so irregular it harms readability.

**Comment hygiene** — comments that are unclear, stale (describing code that no longer matches), or large commented-out blocks left in place.

**Length and nesting** — apply the Developer persona's exact calibration, not a separate number: ~40 lines is a signal to go read the function, not a violation by count; 3+ levels of nested control flow is the same kind of signal. Only report it after confirming the function is genuinely hard to follow. Includes **Divergent Change**: a function or class that keeps growing because it changes for many unrelated reasons — often what excessive length is a symptom of.

**Magic values** — numeric or string literals whose meaning is not recoverable from context (timeouts, rates, status codes, comparison strings). `0`, `1`, `-1`, and self-evident indices are exempt. Includes **Primitive Obsession**: a raw primitive (a string, a number) standing in for a small domain concept, tracked ad hoc at every call site instead of given its own type.

**Duplicate code (handoff only)** — if a block of 3+ lines appears identical or structurally near-identical across two or more locations, record the file(s), lines, and occurrence count as a finding. Do **not** propose the extraction or evaluate whether it's structural — that call belongs to the Unifier persona; invoke the `unify` skill for it. Note in the report: "See `unify` skill for consolidation recommendation." Includes **Shotgun Surgery** (one conceptual change requires edits across many files) and **Repeated Switches** (the same type-based branching appears in multiple places) — both duplicate-code-adjacent and handed off the same way.

**Further named smells (optional vocabulary).** These don't fit the categories above and aren't a checklist to hunt for mechanically — reach for the name only when something already feels off and one of these explains why: **Feature Envy** (a method more interested in another object's data than its own), **Data Clumps** (the same group of values always traveling together as separate parameters instead of one type), **Message Chains** (a caller reaching through a long chain of accessors to get what it needs), **Middle Man** (a class that does nothing but delegate to another), **Refused Bequest** (a subclass that uses almost none of what it inherits), **Speculative Generality** (machinery built for a flexibility need that hasn't materialized — the same failure the [Unifier](../../personas/UNIFIER.md) persona names the Indirection Tax).

---

## Phase 3: Report

Output a single Markdown report with two parts.

### I. Executive Summary
Top 3–5 findings, ordered by actual consequence (what breaks, what misleads, what gets copied forward) — not by discovery order or ease of detection.

### II. Detailed Findings
For each major issue:
- **The Issue** — concise description with file(s) and line numbers.
- **The Impact** — why it matters (e.g., "creates typo risk on every future edit," "obscures the actual control flow").
- **The Solution** — a concrete, actionable fix. For duplicate-code findings, the solution is "hand off to `unify`," not a specific extraction.

### Example

```markdown
# Code Quality Report

### I. Executive Summary of Top Priorities
1. **Magic Timeout:** `useAutoSave.ts:23` hardcodes `5000` for the autosave interval with no named meaning.
2. **Naming Drift:** Several utility functions use `snake_case` in an otherwise `camelCase` codebase.
3. **Duplicate Validation Logic:** The same ~6-line email check appears in two components (3 occurrences total) — see `unify` skill.

---

### II. Detailed Findings

**Issue: Magic Number in `src/features/Diagram/hooks/useAutoSave.ts`**
- **The Issue:** Line 23 passes the literal `5000` to `setTimeout` for the autosave interval.
- **The Impact:** The meaning isn't recoverable from the call site; changing the interval means hunting for this literal.
- **The Solution:** Extract to a named constant, e.g. `AUTOSAVE_INTERVAL_MS = 5000`, and import it at the call site.

**Issue: Duplicate Validation Logic**
- **The Issue:** The same email-validation block appears in `SignupForm.tsx` (lines 45-50), `ProfileSettings.tsx` (lines 62-67), and `InviteForm.tsx` (lines 30-35) — 3 occurrences.
- **The Impact:** A rule change requires editing three call sites; missing one produces silent drift.
- **The Solution:** Defer to the `unify` skill — this meets the Rule-of-Three gate and is a candidate for consolidation.
```

---

## What Not To Do

**Don't flood the report.** A long list of trivial style notes with the real risk buried on page two has failed at the report's purpose.

**Don't invent a consolidation solution.** Duplicate-code findings stop at "here's where it repeats and how many times" — the extraction judgment is the Unifier persona's job.

**Don't import an external style guide.** Measure against the codebase's own dominant convention, not a framework default or personal preference.

**Don't treat a threshold as a rule.** A function past the line-count signal that reads clearly is not a finding; a short function that's genuinely confusing is.
