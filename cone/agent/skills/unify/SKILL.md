---
type: Skill
title: Unify
description: >
  Detects hard-scaffolded duplication (magic values, divergent twins, switch-statement
  gods) that has proven structural across three or more occurrences, and proposes a
  parametric replacement (schema, factory, or registry) with an explicit before/after and
  an honest cost accounting. Triggers on: "find duplication", "unify this", "can this be
  parametrized", "consolidate these", "DRY this up", "these are the same thing three
  times", "turn this into config".
tags: [skill, refactoring, consolidation]
timestamp: 2026-07-06T00:00:00Z
agent_instructions: >
  Procedural workflow for detecting and consolidating structural duplication. Adopt the
  Unifier persona first — it makes the judgment call on whether consolidation is
  warranted at all. This skill defines how to execute once that call is made. Do not run
  this skill's detection heuristics as a constant background scan; invoke it only when
  the user is explicitly doing a consolidation/refactor pass.
---

# Unify

A procedure for consolidating duplicated logic into a parametric form, once the Unifier persona has judged the duplication structural rather than coincidental.

---

## Before You Start

This skill does not run on its own judgment — it runs on the Unifier persona's. Do not detect duplication and propose consolidation as a side effect of unrelated work. Two gates must both be true before you proceed:

1. **Three or more occurrences.** Two similar-looking blocks are not evidence of a pattern. If you only have two, stop and note it as something to watch, not something to act on.
2. **Same reason to change.** Confirm the occurrences vary only in value, not in control flow, and that they are driven by the same underlying rule. If any occurrence branches differently or serves a different purpose that happens to look similar, it fails this gate — exclude it rather than forcing it into the pattern.

If either gate fails, the correct output is "no consolidation warranted" — not a smaller or hedged version of the refactor.

---

## Phase 1: Detection

Scan for these three anti-patterns. Each requires the three-or-more-occurrences gate above.

**Magic Value Scattering** — the same hardcoded string, number, or flag (a validation limit, a tax rate, a timeout) appears in three or more files or call sites, always meaning the same thing.
→ Solution: Configuration Injection (Form A).

**Divergent Twins** — three or more functions share the same control-flow shape and differ only in specific values or a single conditional branch, and share the same reason to change.
→ Solution: Strategy Pattern / Functional Composition (Form B).

**Switch-Statement God** — a large `switch`/`if-else` routes behavior off a type or status field (`user.type`), and adding a new case means editing this same block every time.
→ Solution: Registry / Map-Driven Execution (Form C).

If what you're looking at doesn't cleanly fit one of these three, don't force it into one — say what you actually see instead.

---

## Phase 2: The Parametric Forms

### Form A — Definition Schema (data-driven logic)
Extract the varying rules into a data object; write one generic function that reads the schema at runtime.
- **Before:** validation logic hardcoded inside a submit function, repeated per form.
- **After:** `validate(schema, data)` — the schema is the only thing that differs per call site.
- **Cost:** the rule is no longer visible at the call site; a reader must open the schema to know what's actually enforced.

### Form B — Factory Engine (generative construction)
Collapse repeated structure into one function/component parametrized by a blueprint.
- **Before:** `UserService`, `ProductService`, `OrderService` — same shape, different endpoint details.
- **After:** `createApiService(endpointDefinition)`.
- **Cost:** stack traces and "go to definition" now point at the generic factory, not the specific service; debugging requires knowing which instantiation you're in.

### Form C — Registry Pattern (inversion of control)
Core code iterates a dynamic list of registered handlers instead of branching on type.
- **Before:** a hardcoded `switch` over integration types.
- **After:** `registry.getAll()`, with each integration registering itself.
- **Cost:** "what happens for type X" now requires finding the registration site, not just reading the switch — tracing one code path costs a file jump it didn't before.

Pick the form that matches what actually varies. Don't reach for Form C when Form A would do — a registry is the heaviest form and should match a genuine open-ended extension point, not three known cases.

---

## Phase 3: Output

Report findings in this format:

**1. The Target**
- File(s): affected files and call sites
- Pattern: which of the three anti-patterns, and the occurrence count that cleared the Rule-of-Three gate
- Complexity: Low / Medium / High to execute

**2. The Trade** (not just "the abstraction")
- The engine: the generic code that replaces the specific instances
- The parameter: the concrete schema/blueprint/registry entry shape
- What a reader loses: tooling, grep-ability, or single-file readability given up by this trade
- What a reader gains: the specific drift risk or maintenance cost this removes

**3. The Verdict**
- Reduction: lines removed, stated plainly, not inflated
- Velocity: what becomes possible without new logic (e.g., "new endpoints are one JSON entry")
- Recommendation: proceed, or — if the cost side outweighs the gain — say so and recommend leaving the duplication alone

A report that only lists benefits has not done the job. The cost side is not optional.
