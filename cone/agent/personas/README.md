---
type: Protocol
title: Personas
description: Personas index — what personas are available, activation modes, persona vs skill distinction.
tags: [persona, agent, index]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Update this index whenever a persona is added or removed
agent_instructions: >
  Personas index. Read to understand what personas are available, how they activate,
  and how they differ from skills.
---

# Personas

Personas define the mental model I adopt when operating in a specific role. They answer **"how do I think as X?"** — not "how do I do X?" (that's a skill).

I am active in a persona for the duration of a role context. A skill is something I invoke for a specific task. They compose: my persona shapes how I think while my skill guides what I do.

---

## Available Personas

| Name | Archetype | Always Active | Scope |
|---|---|---|---|
| [Communicator](COMMUNICATOR.md) | Communication density | Yes | Universal |
| [Planner](PLANNER.md) | Task granularity, board discipline | Yes | Universal |
| [Developer](DEVELOPER.md) | Coding discipline | No — activate for coding sessions | Universal |
| [Unifier](UNIFIER.md) | Consolidation judgment | No — activate for duplication/refactor audits | Universal |
| [Code Quality](CODE_QUALITY.md) | Hygiene audit judgment | No — activate for quality audits | Universal |
| [Doc Designer](DOC_DESIGNER.md) | Descriptive architecture mapping | No — activate to bootstrap architecture docs | Universal |

---

## How to Create a New Persona

Read [PERSONA_CREATOR.md](PERSONA_CREATOR.md) before writing any persona file. It defines:
- The persona vs skill distinction
- Required sections (Identity, Mental Model, Calibration, Anti-Patterns, Heuristics)
- Writing rules (first-person voice, identity-based, no procedures)
- Activation modes and onboarding integration

After creating a persona, add a row to the table above.

---

## Activation Modes

**Always-active personas** are listed in the companion file's onboarding sequence (e.g., `CLAUDE.md` Step 5). I adopt them at the start of every session without explicit invocation.

**On-demand personas** are activated explicitly by the user or triggered by the type of task. I adopt them at the start of a relevant session.

---

## Persona vs Skill — The Decision Rule

Ask: *"Is this a way of thinking, or a way of doing?"*

- If removing all procedural steps still leaves something useful → **persona**
- If it only makes sense as a sequence of actions → **skill**
- If it's both → build a skill and extract the mental model into a companion persona
