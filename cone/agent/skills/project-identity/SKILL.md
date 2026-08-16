---
type: Skill
title: Project Identity
description: >
  Distills a project's core pillars, philosophy, and purpose into a condensed,
  comparison-ready reference document — including fit criteria for judging whether an
  external project's pattern is worth integrating. Triggers on: "describe this project",
  "create a project identity doc", "summarize our pillars and philosophy", "what are our
  core pillars", "write an identity document", "prepare for scanning similar projects".
tags: [skill, identity, evolution]
timestamp: 2026-07-12T00:00:00Z
agent_instructions: >
  Procedural workflow for producing a project identity document. Reuses the Doc Designer
  persona's descriptive-not-aspirational discipline for Step 2 and Step 3 — this skill
  extracts what the project's own docs actually claim, it does not invent an idealized
  version. Portable to any project, not cone-lite-specific; cone-lite's own instance is
  cone/evolution/PROJECT_IDENTITY.md, referenced below as a worked example.
---

# Project Identity

A procedure for distilling a project down to its structural pillars, stated philosophy, and purpose — producing a single condensed document two audiences can both use: a human or agent who needs instant orientation, and a future evaluation pass comparing this project against outside work.

---

## Before You Start

Adopt the same discipline the Doc Designer persona uses for reverse-engineering an undocumented codebase, applied here to a documented one: **extract what the project's own docs actually claim, don't write the idealized version.** If the project's stated philosophy and its actual practice have drifted apart, note the drift — don't silently paper over it by describing the aspiration as if it's already true.

---

## Step 1: Gather Source Material

Read, in this order, whatever the project actually has:

1. The project's constitution or top-level instruction file, if one exists (an `AGENT.md`-equivalent, a `CONTRIBUTING.md`, a root prompt file).
2. A philosophy or "why this exists" document, if one exists.
3. The README — usually the most externally-honest statement of purpose, even if written for marketing rather than operation.
4. Core architecture or structure documentation.
5. A history of past decisions if one exists (ADRs, changelogs, proposal archives) — these matter more than they look. They're evidence of what the project actually values when a real trade-off came up, not just what it claims to value.

If a project has none of these, the identity document's job shifts: infer pillars from the actual code/directory structure instead, and flag every inferred (rather than stated) claim explicitly.

---

## Step 2: Extract Pillars

A pillar is a **structural component** — something that, if removed, would make the project a fundamentally different thing. It is not a feature, not a nice-to-have, not a marketing bullet point.

Test each candidate: "if this were deleted, would everything else still work the same way?" If yes, it's a feature, not a pillar. Aim for 4-7 pillars — fewer and you're not being specific enough, more and you're listing features.

---

## Step 3: Distill Philosophy

Pull the project's actual stated principles — not principles you think it *should* have. Look specifically for:
- Explicit rules stated as absolutes ("never," "always," "only")
- Named anti-patterns or things the project explicitly rejects
- Recurring justifications across multiple documents (if three different docs independently justify a choice the same way, that justification is a real principle, not a one-off rationalization)

Condense each to one line. If a principle needs more than one sentence to state, it's either two principles or not yet well understood — don't force it into the document until it is.

---

## Step 4: Articulate Purpose

One paragraph. Who is this for, what problem does it solve for them, and what does the world look like without it? Avoid restating the pillars here — purpose is about the person using the project, pillars are about how the project is built.

---

## Step 5: State What This Is Not

The explicit negative space prevents the most common failure mode of an identity document: someone reads it, sees a plausible-sounding but out-of-scope idea, and can't tell whether it fits without asking. Name the 3-5 things people most often mistake this project for, and say plainly that it isn't that.

---

## Step 6: Derive Fit Criteria

This is the step that makes the document useful for evaluating outside work, not just describing this project in isolation.

For each pillar and philosophy line, ask: "what would violate this?" Turn the answer into a checkable question. Ground every criterion in a real precedent if one exists — a past decision where something was accepted or rejected for exactly this reason. A criterion with a cited precedent is trustworthy; a criterion invented in the abstract is a guess about what this project would think, and should be flagged as unvalidated until it's actually been tested against a real candidate.

If the project has no decision history yet, write the criteria anyway from the stated philosophy, but mark the whole section as provisional.

---

## Step 7: Output Format

```markdown
# Project Identity

## What This Is
[1 paragraph]

## Core Pillars
[4-7 items, 1 line each]

## Philosophy, Condensed
[bullet list, 1 line each, link to the fuller philosophy doc if one exists]

## Purpose
[1 paragraph]

## What This Is Not
[3-5 items]

## Fit Criteria — Evaluating an External Pattern for Integration
[numbered list, each with its grounding precedent named inline]

## Related Documents
[links out — this document should be short specifically because it doesn't restate what's linked]
```

Keep the whole document short enough to read in under three minutes. If it's taking longer, something in Steps 2-6 wasn't condensed enough — cut before you add.

---

## Step 8: Save and Register

Place it as an on-demand reference near wherever the project's own decision/evolution history lives — not in a mandatory onboarding sequence. This document is read *before an evaluation task*, not during general onboarding; forcing every onboarding pass through it violates phased-ingestion discipline for no benefit.

For cone-lite itself, the canonical instance is [`cone/evolution/PROJECT_IDENTITY.md`](../../../evolution/PROJECT_IDENTITY.md) — use it as a worked example of the output format and tone. Register the new file in whatever index covers its directory.

---

## What Not To Do

**Don't restate linked documents.** If a claim needs more than one sentence to justify, that justification belongs in the document being linked to, not duplicated here.

**Don't invent fit criteria in the abstract.** An ungrounded criterion is a guess dressed as a rule. Cite the precedent or mark it provisional.

**Don't describe the aspiration.** If the project's practice has drifted from its stated philosophy, say so — don't quietly write the version that makes the project look more consistent than it is.
