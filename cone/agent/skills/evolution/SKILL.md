---
type: Skill
title: "Evolution: Framework Self-Improvement"
description: >
  Audit the cone-lite framework and propose improvements. Produces proposal files
  in cone/evolution/.
tags: [skill, meta, evolution]
timestamp: 2026-06-23T00:00:00Z
agent_instructions: >
  Meta-skill for framework self-improvement. Generates numbered proposals in cone/evolution/.
  Read the full skill before running — the audit categories and proposal format are specific.
---

# Evolution: Framework Self-Improvement

This skill enables any agent to audit the cone-lite framework and propose structured improvements. The goal is to make the framework itself better — not to fix project code or add project features, but to improve the documentation system, agent workflows, and knowledge architecture that make the project easier to work on.

---

## What This Skill Is For

The cone-lite framework is a living system. It should grow and adapt as the project matures. This skill provides a structured process for identifying gaps, inefficiencies, and missing patterns in the framework, then proposing concrete improvements.

**In scope:**
- Missing documentation patterns (things that should be documented but aren't)
- Structural improvements (folders, files, or organization that could be better)
- New personas or skills that recurring work patterns suggest
- Onboarding gaps (things that trip up agents during context acquisition)
- Process improvements (session protocol, handoff quality, memory curation)
- Missing heuristics or best practices the coding companion should include

**Out of scope:**
- Project code changes (that's normal development work)
- Bug fixes (that's a session task)
- Feature requests (that's the project backlog)

---

## Step 1 — Audit the Framework

Start by running `npm run lint:okf` — it answers several structural health questions automatically (missing frontmatter, missing type fields, broken links). Then perform a systematic audit across these categories, noting findings.

### A. Onboarding Efficiency

*Does the onboarding sequence get an agent productive in minimum reads?*

- Read `AGENT.md` → companion → `START_HERE.md` cold. Was anything confusing or missing?
- Are there concepts referenced in later documents that aren't established in earlier ones?
- Does the phased sequence still match the actual document structure?
- Are there documents an agent always needs but aren't in the sequence?

### B. Coverage Gaps

*Is everything that should be documented actually documented?*

- Are there major systems or components without architecture docs in [systems/](../../../project/architecture/systems/TEMPLATE.md)?
- Are there repeated decisions being made that should be an ADR?
- Are there recurring debugging patterns not captured in [PLAYBOOK.md](../../../project/memory/PLAYBOOK.md)?
- Are there known pitfalls not in [ANTI_PATTERNS.md](../../../project/memory/ANTI_PATTERNS.md)?
- Are there confirmed practices not in [LESSONS.md](../../../project/memory/LESSONS.md)?

### C. Agent Workflow Gaps

*Are agents doing things manually that should be captured as skills or personas?*

- Are there task types that agents encounter repeatedly but handle ad-hoc each time?
- Are there thinking patterns that agents should adopt but don't have a persona for?
- Are existing skills still accurate, or have workflows evolved past what's documented?
- Are skill trigger descriptions specific enough to actually fire?

### D. Structural Health

*Does the folder structure still serve the project's current scale?*

Run the `restructure` skill's classify-by-kind check against every directory, not just the ones that feel crowded — kind-mixing often trips before a directory looks large. In addition:

- Are any folders empty and likely to stay empty (dead structure)?
- Does the agent/project pillar split still make sense for every document?
- Are there cross-references between documents that point to wrong or stale paths?

### E. Propolis Coverage

*Is the codebase self-describing?*

- What percentage of source files have `@propolis` blocks?
- Are the role taxonomy and constraint vocabulary still sufficient?
- Are `agent_instructions` in propolis blocks actually useful, or are they generic filler?
- Are there file types that need propolis but don't have a good role category?

### F. Session & Memory Quality

*Is institutional knowledge being captured effectively?*

- Are session files using semantic titles, or are they generic?
- Are handoff sections precise enough for the next agent to continue?
- Is `cone/project/memory/` growing with real entries, or is it stale?
- Are discoveries from sessions being distilled into memory files?

### G. Best Practices & Heuristics

*Are there development best practices the framework should capture but doesn't?*

- Review the coding companion — are there patterns the team follows that aren't documented?
- Are there testing, deployment, or review practices that should be standardized?
- Are there platform or technology-specific constraints that should be guardrails?
- Are there naming or structural conventions that have emerged organically but aren't written down?

---

## Step 2 — Prioritize Findings

Rank findings by impact:

**High impact** — Affects every session or every agent. Missing this causes repeated wasted effort. Examples: an onboarding gap that confuses every new agent, a missing architecture doc for the most-modified subsystem.

**Medium impact** — Affects some sessions or some agents. Would improve quality but absence isn't causing active harm. Examples: a missing skill for a monthly process, an anti-pattern that's been hit twice.

**Low impact** — Nice to have. Would marginally improve the framework but isn't causing problems. Examples: reorganizing a folder, adding a persona for a rare task type.

---

## Step 3 — Write the Proposal

Create a new proposal file in `cone/evolution/proposals/`:

**Template:** Copy [PROPOSAL_TEMPLATE.md](../../../evolution/proposals/PROPOSAL_TEMPLATE.md) — it defines the OKF frontmatter and body structure.

**Naming:** `Proposal_N.md` where N is the next number in sequence. Check the `proposals/` folder for the current highest number.

**Key frontmatter fields:**
- `type: Evolution Proposal` — makes proposals OKF concepts, queryable by type
- `status` — `PROPOSED` | `ACCEPTED` | `REJECTED` | `IMPLEMENTED`
- `impact` — `HIGH` | `MEDIUM` | `LOW`
- `affected_pillar` — `agent` | `project` | `both`

---

## Step 4 — Present to the User

After writing the proposal, present a summary to the user:
- How many findings, grouped by impact level
- The top 3 recommendations
- Whether any findings are quick wins that could be done immediately

Do not implement any changes without user approval. The proposal is a recommendation, not an action.

---

## What to Look For — Heuristics

These patterns often signal framework improvement opportunities:

- **"I had to search for 5 minutes to find..."** → Missing documentation or broken navigation
- **"I see this pattern in every session..."** → Missing skill or persona
- **"The handoff didn't tell me..."** → Session protocol gap
- **"I made the same mistake as last time..."** → Missing anti-pattern entry
- **"I assumed X but it was actually Y..."** → Missing non-obvious pointer in companion file
- **"There's no doc for the most complex part..."** → Coverage gap in architecture docs
- **"I kept re-reading this doc and it didn't help..."** → Document quality issue
- **"Every agent sets this up manually..."** → Missing onboarding step or configuration doc
- **"The folder structure doesn't match how I think about this..."** → Structural improvement needed

---

## After the Proposal

Once a proposal is accepted:
1. Create a session file for the implementation work
2. Implement findings in the order specified in the proposal
3. Update the proposal's status to `IMPLEMENTED`
4. If findings lead to new questions, they feed the next evolution proposal

The framework evolves one proposal at a time. Each proposal makes the next session slightly more efficient.
