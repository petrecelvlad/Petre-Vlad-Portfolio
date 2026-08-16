---
type: Protocol
title: Skills
description: Skills index — what skills are available, when to use them, skill vs persona distinction.
tags: [skill, agent, index]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Update this index whenever a skill is added or removed
agent_instructions: >
  Skills index. Read to understand what skills are available and when to use them.
  A skill is a procedural workflow — it tells you HOW to do something.
  A persona tells you HOW to think.
---

# Skills

Skills are reusable procedural workflows — structured instructions for recurring tasks. An agent reads a skill's `SKILL.md`, follows the process, and produces consistent, high-quality output.

---

## Available Skills

| Skill | Purpose | Invoke when |
|---|---|---|
| [skill-creator](skill-creator/SKILL.md) | Create new skills or improve existing ones | "create a skill", "turn this into a skill", "improve this skill" |
| [evolution](evolution/SKILL.md) | Audit the framework and propose improvements | "improve the framework", "audit the docs", "what's missing from cone", "evolve the documentation" |
| [unify](unify/SKILL.md) | Consolidate structural duplication into a parametric form | "find duplication", "unify this", "can this be parametrized", "consolidate these", "DRY this up" |
| [quality-audit](quality-audit/SKILL.md) | Line-by-line hygiene audit, ranked by impact | "audit code quality", "find code smells", "check style consistency", "clean code review" |
| [bootstrap-architecture](bootstrap-architecture/SKILL.md) | Populate architecture docs from an existing codebase | "document this codebase", "set up cone architecture docs", "bootstrap the architecture docs", "fill in OVERVIEW.md" |
| [project-identity](project-identity/SKILL.md) | Distill pillars, philosophy, and fit criteria into one reference doc | "describe this project", "create a project identity doc", "what are our core pillars", "prepare for scanning similar projects" |
| [restructure](restructure/SKILL.md) | Reorganize a directory into subfolders by kind when it no longer fits flat | "reorganize this folder", "clean up this directory structure", "does this folder need subfolders" |
| [board](board/SKILL.md) | Create, update, and render Kanban cards | "show me the board", "what's in progress", "create a card for this", "break this into tasks" |

---

## When to Add a New Skill

A new skill is warranted when:
- The same multi-step process has been executed 2+ times
- The steps are stable (not experimental)
- The process would take a new agent more than 30 minutes to figure out independently
- An agent keeps making the same mistakes on a task type

A skill is NOT needed for:
- One-off tasks
- Tasks that vary too much to generalize
- Tasks so simple the agent handles them well without guidance

---

## Skill Anatomy

```
skill-name/
├── SKILL.md          ← Required. The agent reads this.
├── references/       ← Optional. Supporting docs loaded as needed.
│   ├── schema.md
│   └── examples.md
└── evals/            ← Optional. Test cases for the skill.
    └── evals.json
```

**`SKILL.md`** has two parts:
1. **Frontmatter** (YAML) — name, description, trigger phrases
2. **Body** (Markdown) — the actual instructions, steps, rules, output formats

Keep `SKILL.md` under ~500 lines. If it grows beyond that, move supporting material into `references/`.

---

## Persona vs Skill Reminder

| Dimension | Persona | Skill |
|---|---|---|
| Answers | "How do I think as X?" | "How do I do X?" |
| Contains | Mental models, heuristics | Steps, procedures, checklists |
| Persists | Duration of role context | Duration of task |

They compose. An Architect persona shapes how I think while an architecture-review skill guides what I do.
