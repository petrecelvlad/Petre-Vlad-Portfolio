---
type: Identity
title: Project Identity
description: >
  Condensed identity snapshot of cone-lite — core pillars, philosophy, purpose, and the
  criteria used to judge whether an external project's pattern is worth integrating.
tags: [evolution, identity, reference]
timestamp: 2026-07-12T00:00:00Z
agent_instructions: >
  Read this before evaluating an external project for potential integration into
  cone-lite — e.g. via the `project-identity` skill's own comparison use, or a future
  GitHub-survey skill. Not part of the mandatory onboarding sequence: PHILOSOPHY.md
  covers onboarding; this document exists specifically to support judging outside work
  against what cone-lite actually is. Keep it condensed — link out to PHILOSOPHY.md,
  AGENT.md, and README.md for depth rather than restating them.
---

# Project Identity

## What This Is

cone-lite is a documentation framework that turns an AI coding agent's context from disposable to cumulative. Every session, decision, and institutional lesson feeds a structured knowledge system instead of evaporating when the conversation ends. It's project-agnostic — fork it and it works the same way regardless of language, stack, or team size.

This document is deliberately condensed. For the full reasoning behind any claim here, read [PHILOSOPHY.md](../PHILOSOPHY.md).

---

## Core Pillars

1. **Constitution (`AGENT.md`)** — a phased operating discipline (Orient → Plan → Implement → Review → Recover) an agent adopts as identity, not a checklist it consults.
2. **Two-Pillar Split** — `cone/agent/` (how to operate) vs. `cone/project/` (what was built). SRP applied at the directory level; the two evolve independently.
3. **Personas vs. Skills** — mental models (how to think) compose with procedures (how to do). Conflating the two produces the exact rigid, second-person, unstructured prompts this framework has repeatedly had to rewrite.
4. **OKF Self-Description** — every document carries YAML frontmatter; cross-links form a real graph; the graph renders as a live, zero-custom-code visualizer.
5. **Institutional Memory** — sessions (chronological, dual-purpose), `memory/` (curated anti-patterns/lessons/playbook), gated ADRs. Findings accumulate; nothing is silently lost between conversations.
6. **Self-Evolution** — the framework improves itself through evolution proposals with explicit accept/reject reasoning — not silent drift, not unreviewed autonomous change.

---

## Philosophy, Condensed

- **SRP on documentation** — one document, one job, one reason to change.
- **First-person voice** — agents adopt rules as identity ("I ensure...") not external commands ("the agent should...").
- **Phased, not exhaustive, ingestion** — read what the current step needs, not everything up front.
- **Grow, don't scaffold** — ship structure empty; fill it only when a real, demonstrated need arrives. Front-loading structure creates maintenance debt from day one.
- **Judgment over automation** — the framework amplifies an agent's judgment; it does not replace it with a fixed, deterministic pipeline. This explicitly rules out workflow-execution engines, mandatory node graphs, or anything that removes an agent's ability to deviate mid-task based on what it actually finds.
- **Reality wins** — documentation describes what a system actually does. An aspirational ideal the code doesn't follow is worse than no documentation.

---

## Purpose

Solo developers and small teams using AI coding agents lose context between sessions — decisions get re-litigated, mistakes get repeated, and every new agent re-explores the same codebase from zero. cone-lite exists to make that accumulated understanding durable and structured, so an agent arriving cold can operate at the level of one who's been on the project for months, and a human can trust what the agent produces because the judgment behind it is visible and auditable, not opaque.

---

## What This Is Not

- **Not a wiki.** Structured and machine-readable, not free-text and unsearchable.
- **Not a documentation generator.** It doesn't auto-generate docs from code — it captures what code can't express: decisions, constraints, institutional memory.
- **Not a project management tool.** Lightweight tracking, not Jira.
- **Not prescriptive about technology.** Framework- and language-agnostic; stack-specific choices belong in the adopting project's own pillar, never in the template.
- **Not a workflow-execution engine.** No node graphs, no deterministic pipelines, no removing the agent's judgment from the loop — see Judgment over automation above.

---

## Fit Criteria — Evaluating an External Pattern for Integration

Before importing anything from an outside project, check it against all of these. They're not abstract — each is grounded in an actual past decision.

1. **Judgment-preserving.** Does it leave the agent's discretion intact, or does it try to force a fixed, deterministic path regardless of what the agent actually finds? A rigid pipeline fails this even if it's well-designed.
2. **Docs-native, not tooling.** Does it belong in `cone/` as knowledge, or is it actually infrastructure that belongs in `.github/`, `package.json`, or elsewhere? (Precedent: `git-guardrails-claude-code`'s `PreToolUse` hook was kept out of `cone/` for exactly this reason — real enforcement, but tooling, not knowledge.)
3. **Persona/skill separable.** Can its mental model and its procedure be told apart? If a candidate is a single undifferentiated prompt mixing both, that's a signal to split it during import, not evidence it doesn't fit. (Precedent: `UNIFIER.md`, `CODE_QUALITY.md`, `DOC_DESIGNER.md` all needed this split.)
4. **Project-agnostic.** Is it genuinely portable, or does it carry one specific stack's assumptions baked in as if universal? (Precedent: the original `DOC_DESIGNER.md` draft hardcoded a Zustand store path and a "backtester/compiler" domain from an unrelated project.)
5. **Earns its complexity.** Has cone-lite actually hit this problem more than once, or is this premature? (Precedent: an `ask-matt`-style router skill was rejected as premature at 6 personas + 5 skills — "revisit once the count roughly doubles," not "never.")
6. **Composes into an existing pillar.** Does it map onto `agent/` or `project/` cleanly, or does it demand a genuinely new structural concept? Most things map. New top-level concepts should be rare and each one justified on its own.
7. **Tracker/infrastructure-independent.** Does it assume an issue tracker, a CI runner, or other infrastructure cone-lite doesn't mandate? If so, it likely needs to be stripped to its infrastructure-independent core rather than imported wholesale. (Precedent: `wayfinder` and `triage` from `mattpocock/skills` were rejected whole — built entirely on issue-tracker-native blocking links — while their tracker-independent pieces, like the Agent Brief discipline, were extracted separately.)

A candidate that fails (1) is disqualified outright, regardless of how well-designed it is otherwise. Failing 2-7 doesn't mean rejection — it usually means the candidate needs adaptation before it fits, not that it has nothing to offer.

---

## Related Documents

- [PHILOSOPHY.md](../PHILOSOPHY.md) — the full principles this document condenses
- [AGENT.md](../../AGENT.md) — the constitution (root level)
- [README.md](../../README.md) — the external-facing pitch and quickstart
- [CODING_COMPANION.md](../agent/onboarding/CODING_COMPANION.md) — the coding-specific discipline layer
- [Proposal 5](./proposals/Proposal_5.md) — the fullest worked example of these fit criteria applied to a real external repo
