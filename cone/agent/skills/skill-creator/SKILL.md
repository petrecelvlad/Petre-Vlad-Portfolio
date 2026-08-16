---
type: Skill
title: Skill Creator
description: >
  Meta-skill for creating, modifying, and improving agent skills — reusable instruction
  sets for recurring tasks.
tags: [skill, meta]
timestamp: 2026-06-23T00:00:00Z
agent_instructions: >
  Meta-skill: use this to design, write, and iterate on any new skill.
  Read before creating any skill from scratch.
---

# Skill Creator

A skill for designing, writing, and iteratively improving agent skills — reusable instruction sets that tell an agent exactly how to handle a specific type of task.

---

## What a Skill Is

A skill is a folder containing a `SKILL.md` file — structured instructions an agent reads before tackling a specific category of task. The agent reads it, follows the process, and produces better, more consistent output than freeforming.

**Predictability is the root virtue.** The entire value of a skill is that it produces the same quality of outcome on run 50 as on run 1, regardless of which agent or which session runs it. Every other piece of guidance in this document — description quality, examples, output formats, failure modes — exists in service of that one property. If a change to a skill doesn't make its output more predictable, question whether it belongs.

Skills are useful when:
- A task has a repeatable structure that benefits from a defined process
- Outputs need to be consistent across different prompts or agents
- A workflow has been refined through iteration and the learning should be captured
- An agent keeps making the same mistakes on a task type

Skills are **not** useful for one-off tasks, tasks that vary too much to generalize, or tasks so simple the agent handles them well without guidance.

---

## Step 1 — Capture Intent

Start by understanding what the user wants the skill to do. If the current conversation already contains a workflow being captured (the user says "turn this into a skill"), extract answers from the conversation history first.

Otherwise, answer these four questions before writing anything:

1. **What should this skill enable an agent to do?** The core task or transformation.
2. **When should it trigger?** What user phrases, contexts, or task types should activate it?
3. **What does a good output look like?** Format, length, structure, what must be present.
4. **What are the edge cases?** Inputs that are ambiguous, unusual, or likely to trip up a naive approach.

Don't ask all four as a list. Read the context — if the user's prompt already answers some, skip those and only ask what's genuinely missing.

---

## Step 2 — Write the SKILL.md

### The description field is the most important thing you'll write

The description is what the agent reads to decide *whether to use this skill at all*. A skill with a weak description never triggers.

**Good descriptions:**
- Include both what the skill does AND the specific contexts that should activate it
- List concrete trigger phrases: "triggers on: X, Y, Z"
- Are slightly pushy — err toward over-inclusion rather than under-inclusion
- Avoid vague language like "helps with" or "can be used for"

**Bad description:**
> "Helps create Word documents."

**Good description:**
> "Produces polished .docx files from structured content. Use whenever the user asks for a Word document, report, memo, letter, or any deliverable they'll send to someone else. Triggers on: 'write a report', 'make a Word doc', 'draft a letter', 'create a template'."

### Writing the body

**Use imperative form.** Instructions read as direct commands: "Read the file before writing anything." Not "The agent should read the file before writing anything."

**Explain the why, not just the what.** Agents follow instructions better when they understand the reasoning. Instead of "ALWAYS include a summary section", write "Include a summary section at the top — readers often skim and need the conclusion before the detail."

**Avoid excessive MUST/NEVER/ALWAYS in caps.** If you need heavy-handed emphasis, the instruction isn't clear enough yet. Reframe it: explain why the thing matters.

**Use examples.** For output formats especially, show don't tell:

```markdown
## Commit message format
Good: `feat(auth): implement JWT token refresh`
Bad: `fixed the auth thing`
```

**Define output formats explicitly.** If the skill produces a file or structured output, specify the exact template.

**Keep it lean.** Remove anything that isn't actively guiding behavior. If a sentence doesn't change what the agent does, cut it.

**Domain organization.** If a skill covers multiple variants, organize by variant in `references/`:

```
skill-name/
├── SKILL.md          ← Workflow + which reference to read
└── references/
    ├── variant-a.md
    └── variant-b.md
```

**Information hierarchy.** When a skill needs supporting detail, add it in this order of preference, and stop as soon as one level is enough: (1) inline in the `SKILL.md` body — the default; (2) a reference file inside the skill's own folder, pointed to by name, read only when that variant applies; (3) an external document elsewhere in the repo, linked by path. Each level costs more for an agent to reach — don't reach for level 2 or 3 when level 1 would do.

**Hard vs. soft dependencies.** If a skill fails outright without some prior setup (a config file, an installed tool, an established convention it reads), say so explicitly and point at what to run first — don't let the agent discover the failure mid-task. If a skill just degrades gracefully without that setup (falls back to a sane default, asks instead of assuming), don't spend tokens hedging about it — state the default and move on.

---

## Step 3 — Write Test Cases

Before declaring the skill done, write 2-4 test cases and save them to `evals/evals.json`.

Test cases should be:
- **Realistic** — the kind of prompt a real user would actually write
- **Specific** — include context, file names, constraints
- **Varied** — cover different phrasings of the same intent
- **Edge-case-weighted** — the easy cases don't tell you much; the hard ones do

For each test case, write 2-4 **expectations** — specific, observable things the output should include. Not "the output is good" but "the output includes a Minimum Feature Set section with at least 5 testable items."

---

## Step 4 — Test the Skill Manually

Run each test case yourself: read the skill's SKILL.md, follow its instructions, and produce the output. Evaluate the result against the expectations.

**What to look for:**
- Did the skill's instructions guide you to the right output, or did you fill in gaps from general knowledge?
- Were any steps ambiguous enough that you had to guess?
- Did the output format match what the expectations required?
- Was anything in the skill instructions ignored because it felt redundant?

Anything you had to reason around is a gap in the skill.

---

## Step 5 — Iterate

Improve the skill based on what the manual test revealed:

**Generalize from failures.** Don't just patch the exact failing case — understand why it failed and fix the underlying instruction.

**Look for repeated improvisation.** If you did the same thing across multiple test cases that the skill didn't tell you to do, that thing belongs in the skill.

**Cut before you add.** Before adding a new instruction, check whether an existing instruction can be clarified instead. Longer skills are not better skills.

**Test again after each meaningful change.**

---

## Step 6 — Optimize the Description (if triggering is unreliable)

If the skill exists but isn't being used when it should be:

1. Write 8-10 prompts that **should** trigger the skill — realistic, casual phrasing
2. Write 8-10 prompts that **should not** trigger — near-misses that share keywords but need something else
3. Read both lists: does the current description predict correctly? Revise where it over- or under-triggers
4. Repeat until the description handles the edge cases

---

## Failure Modes to Check a Draft Against

Before shipping a skill, check it against these named failure modes — recognizing which one you're looking at is faster than re-deriving the problem from scratch each time:

- **Premature completion** — the skill lets the agent report success before the actual completion criteria are met. Fix by making completion criteria explicit and checkable, not implied.
- **Duplication** — the same guidance exists in two skills (or a skill and a persona), and they'll drift out of sync the first time one gets edited. Fix by having one reference the other instead of restating it.
- **Sediment** — instructions that made sense for an earlier version of the workflow are still there after the workflow changed, quietly misleading anyone who follows them literally. Fix by re-reading the whole skill during any edit, not just the section being changed.
- **Sprawl** — the skill has grown to cover cases far outside its original trigger, and now under-serves its core case to accommodate edge cases that rarely occur. Fix by splitting into a second skill, or cutting the rare cases back out.
- **No-op** — the skill's instructions don't actually change what the agent would have done anyway. If a skill isn't measurably shaping behavior, it isn't earning its token cost.
- **Negation** — the skill is a list of things not to do, with no positive action stated. Prohibitions alone don't tell the agent what to do instead, so it improvises — often right back into the prohibited behavior. Reframe every "don't X" as "do Y."

## What Not To Do

**Don't write a checklist.** A skill that's a list of 20 rules produces mechanical box-checking. Write process and reasoning instead.

**Don't over-specify.** Leave room for agent judgment. Cookie-cutter results fail on anything unexpected.

**Don't name the skill for implementation.** Name it for what it does for the user.

**Don't make the description too narrow.** Write for the range of ways a person might ask.

**Don't ship the first draft.** A skill that hasn't been tested is a hypothesis.

---

## After Creating a Skill

Add an entry to [README.md](../README.md) with the skill name, purpose, and trigger phrases.
