---
type: Spec
title: "Project copy patterns"
description: >
  The writing patterns every project's copy in portfolio.json follows: high-level, ownership
  and value first, never a narrated process. Extracted from the Merge Mansion and Realm of the
  Mad God rewrites (2026-10-24), which the user approved as the reference tone for all projects.
tags: [spec, content, copywriting, projects]
timestamp: 2026-10-24T00:00:00Z
agent_instructions: >
  Apply these patterns whenever you write or rewrite a project's description, overview.summary,
  responsibilities or achievements. Draft for the user first; only the user supplies facts.
---

# Project copy patterns

Parent work: [T-046](../roadmap/board/T-046-rewrite-project-copy.md). Field formats (what the
Overview page shows) stay in [PROJECT_TAB1_OVERVIEW_COPY.md](./PROJECT_TAB1_OVERVIEW_COPY.md);
this file governs how the words read.

## The principle

A recruiter reads a project to learn what was owned and why it mattered, not how the work was
done. Copy that narrates steps, gives examples or justifies decisions reads junior, as if
explaining homework. Write at the level of ownership and value; Details is where the reader
looks for depth, and even there one line covers one area of ownership.

## Patterns

1. **Own, don't narrate.** One line per area of ownership: strong verb + scope + value.
   Cut the steps any competent designer would take to get there.
   - Before: "Read player feedback and cross-referenced it with the data to find the real problems"
   - After: "Diagnosed progression pain points from KPIs and player feedback"
2. **Value, not mechanics.** Say what a system achieved, never how it works inside. No
   examples, numbers-in-brackets or formulas.
   - Before: "Modifiers mix freely (x2 enemy damage with x3 better loot), so each event is distinct"
   - After: "Designed Crucibles, a modular event system that multiplies live event variety at minimal cost"
3. **Don't justify.** Drop "so that…" clauses defending a decision nobody questioned
   ("so the story still fit", "for variety without power creep").
4. **One achievement, one line.** Don't split a single piece of work across several bullets.
   Fold the supporting work into one "Owned it end to end: …" line when it matters.
   - Before: five bullets for Crucibles (system, modifiers, scheduling, stakeholders, tool UX)
   - After: one bullet for the system, one for "Owned it end to end: requirements, technical
     scoping with engineering, and the internal tool's UX"
5. **Collaboration as alignment.** Name who was aligned, not the checking that was done.
   - Before: "Checked how items shared with other regions would be affected, with their designers"
   - After: "Aligned the changes across regions with fellow designers and the Narrative team"
6. **Accurate status, without apology.** Never present unshipped work as shipped, and never
   explain why it didn't ship. State the true stage in the line itself.
   - Before: "Set the stat system up as an A/B test for the large community; left as it launched"
   - After: "Proposed a dynamic weapon stat system to make every loot drop feel unique, prepared as an A/B test"
7. **Titles and terms are exact.** The role is the real title (Level Designer, not Game
   Designer). No "contract" or "contracted" wording anywhere on the site; employment type
   isn't a selling point.
8. **The skill tree follows the copy.** When copy adds or drops a skill (live events, research,
   A/B testing), update that project's links in `src/core/domain/skillTreeTypes.ts` to match.

## Field budget

- **description:** what the game is, then the headline contribution. Two short sentences.
- **overview.summary:** what the game is, then the role at a high level, naming areas
  ("live event systems, loot design and new class content"), not individual features.
- **responsibilities:** up to 12 bullets, each up to 120 characters.
- **achievements:** one line, the most concrete shipped result.

## Checklist before handing a draft to the user

- Every bullet starts with an ownership verb (Led, Designed, Owned, Diagnosed, Restructured,
  Aligned, Proposed).
- No brackets, examples, formulas or "so that" clauses.
- No piece of work takes more than one bullet, apart from an "Owned it end to end" line.
- Nothing unshipped reads as shipped.
- No "contract" wording; the role matches the real title.
- Skill tree links match the copy.
