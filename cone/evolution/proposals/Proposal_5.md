---
type: Evolution Proposal
title: "Proposal 5: Adopt Patterns from mattpocock/skills"
description: >
  Findings from surveying github.com/mattpocock/skills (Matt Pocock's Claude Code
  skills collection) for patterns worth importing or adapting into cone-lite.
tags: [evolution, proposal, external-research]
timestamp: 2026-07-11T00:00:00Z
status: IMPLEMENTED
impact: HIGH
affected_pillar: both
author: Claude Sonnet 5
---

# Proposal 5: Adopt Patterns from mattpocock/skills

## Summary

Surveyed `github.com/mattpocock/skills` (~40 skill files across engineering/productivity/misc, plus meta-conventions in `.agents/` and `.out-of-scope/`) against cone-lite's actual current structure. Ten findings are recommended for adoption, each mapped to a specific existing file or a specific new file — nothing here is a wholesale import. Two of the ten touch `AGENT.md` itself (the constitution) and are flagged as needing explicit sign-off before implementation, since everything else in this framework treats the constitution as higher-stakes than a leaf persona or skill. Seven candidates were considered and rejected or deferred, with reasoning, so they aren't re-litigated later.

The source repo's philosophy is close enough to cone-lite's (small, composable, first-person, self-describing) that the comparison was mostly apples-to-apples — most rejections are "this solves a problem we've deliberately solved differently," not "this is bad."

---

## Findings

### 1. Ubiquitous-language glossary (`CONTEXT.md`)
**Category:** Coverage
**Impact:** HIGH
**Current state:** `OVERVIEW.md` documents architecture — purpose, decisions, module structure. Nothing in the project pillar documents *vocabulary*: what "session" means vs. a generic use of the word, what a domain term like "constraint" or "guardrail" precisely denotes in this codebase.
**Problem:** Ambiguous terms get silently reinterpreted differently by different agents across sessions, and the drift is invisible until it causes a real disagreement mid-task.
**Recommendation:** Add `cone/project/architecture/CONTEXT.md` — a living glossary. Populate it reactively: the moment a term is used ambiguously in conversation and gets resolved, it's added immediately, not batched at end of session. This is a genuinely new file type, not a rewrite of anything existing.

### 2. ADR gate heuristic
**Category:** Coverage
**Impact:** MEDIUM
**Current state:** `cone/project/archive/decisions/TEMPLATE.md` has Context/Decision/Consequences sections but no heuristic for *whether a decision warrants an ADR at all*.
**Problem:** Without a gate, either every decision gets a full ADR (ceremony overload) or the template goes unused because nothing ever feels "big enough."
**Recommendation:** Add a 3-condition gate to the template's `agent_instructions`: write an ADR only if the decision is **hard to reverse** *and* **surprising without context** *and* **the result of a real trade-off**. If any condition is missing, skip it or fold it into a session file's Decisions section instead. Also permit a short-form ADR (1-3 sentences per section) as the default, reserving full prose for genuinely complex trade-offs.

### 3. Operational upgrade to `AGENT.md` Phase 5 (Recovery)
**Category:** Practices
**Impact:** HIGH — touches the constitution, needs explicit sign-off before implementation
**Current state:** Phase 5 is four sentences: Minimal Reproduce, Falsifiable Hypothesis, Evidence-based Fix, Stop Rule. Correct in spirit, not operational.
**Problem:** "Falsifiable Hypothesis" (singular) invites forming one theory and confirming it, rather than ranking alternatives. There's no instruction to build a repeatable feedback loop before theorizing at all — which is usually where debugging time actually goes.
**Recommendation:** Expand Phase 5 with two concrete additions: (a) before forming any hypothesis, build a **tight feedback loop** — fast, deterministic, agent-runnable, capable of going red — since a good loop makes most bugs obvious without a theory; (b) require 3-5 ranked, falsifiable hypotheses, not one. This changes the constitution's own wording, so it's listed separately from the leaf-file findings below — recommend reviewing the exact replacement text before it's written.

### 4. Skill-authoring theory upgrade (`skill-creator/SKILL.md`)
**Category:** Workflow
**Impact:** MEDIUM
**Current state:** `skill-creator/SKILL.md` covers description-writing, imperative body style, test cases, and iteration — solid but flat. It doesn't distinguish failure *modes*, doesn't have an information-hierarchy principle, and has no concept of hard vs. soft dependencies.
**Problem:** As cone-lite's skill count grows, skills will start failing in ways the current guidance doesn't name or guard against.
**Recommendation:** Fold in four concepts: **predictability as the root virtue** (same process every run is the point, not a side effect); an **information hierarchy** (steps in the skill body → optional in-skill reference file → external reference, in that order of preference); **named failure modes** to check a draft skill against — premature completion, duplication, sediment (stale instructions nobody removes), sprawl, no-op, and negation (prohibitions alone backfire — state the positive action instead); and a **hard vs. soft dependency** note — a skill that fails outright without prior setup should say so explicitly, a skill that just degrades gracefully shouldn't spend tokens hedging.

### 5. Module-level design vocabulary (new reference doc)
**Category:** Coverage
**Impact:** MEDIUM
**Current state:** `HEXAGONAL.md` covers system-level separation — Core, Adapters, Composition Root. Nothing in the project pillar covers module/interface design *within* a layer.
**Problem:** "Design a good interface" is currently left to instinct. There's no shared vocabulary for depth, seams, or when an abstraction is paying for itself.
**Recommendation:** Add `cone/project/architecture/MODULE_DESIGN.md` as a reference doc (same status as `HEXAGONAL.md` — read on demand, not regenerated per project) covering: module/interface/implementation/depth/seam/locality, and the **deletion test** — would removing this abstraction concentrate complexity somewhere else, or just move it? This complements `HEXAGONAL.md` rather than duplicating it; the two operate at different altitudes. Not recommending a paired persona/skill for this yet — a reference doc is enough until a recurring workflow around it emerges (see [[unifier]] for why: personas earn their existence from a demonstrated recurring judgment call, not from having a topic).

### 6. Durable "already rejected" registry
**Category:** Structure
**Impact:** MEDIUM
**Current state:** Evolution proposals can be marked `REJECTED`, but that status is buried inside an individual proposal file. There's no browsable surface for "we already considered and said no to this" at the product/feature level (as opposed to framework-evolution level).
**Problem:** The same feature request or framework tweak can get re-proposed and re-litigated because nothing surfaces that it was already decided.
**Recommendation:** Add `cone/project/roadmap/out-of-scope/` — one file per rejected *concept* (not per issue), each stating what was requested, why it was rejected, and a running list of "asked again on [date]" entries instead of a duplicate file. This is deliberately concept-deduplicated, not a flat log.

### 7. Staleness warning for `specs/proposals/TEMPLATE.md`
**Category:** Practices
**Impact:** LOW
**Current state:** The template's Impact section invites listing "systems, files, or behaviors" affected, with no caution about how those references age.
**Problem:** A proposal can sit for weeks before implementation; file paths and line numbers cited in the Proposed Solution section go stale and mislead whoever implements it later.
**Recommendation:** Add a short caution to the template: prefer describing behavioral contracts and interfaces over hard file paths/line numbers in the *Proposed Solution* and *Impact* sections specifically. **Do not** apply this to `SESSIONS.md`'s handoff section — that protocol deliberately requires file paths and line numbers (`SESSIONS.md` Rule 5), because a handoff is read within the next session or two, not weeks later, and precision there is a feature, not a staleness risk. These are different time horizons and should stay different.

### 8. Expand-contract sequencing for wide refactors
**Category:** Practices
**Impact:** LOW
**Current state:** `CODING_COMPANION.md` section 9 (Refactoring Heuristics) covers when to refactor and sequencing relative to feature commits, but has no guidance for mechanical, blast-radius-wide changes that can't be done as one vertical slice.
**Problem:** Wide refactors either get done as one large, hard-to-review commit, or get abandoned partway with the codebase in a mixed state.
**Recommendation:** Add the **expand-contract** pattern to section 9: expand (add the new form alongside the old, nothing breaks yet) → migrate in blast-radius-sized batches, each independently shippable with the suite green throughout → contract (delete the old form once no caller remains).

### 9. Decisions-vs-facts interview loop for `AGENT.md` Phase 1
**Category:** Practices
**Impact:** MEDIUM — touches the constitution, needs explicit sign-off before implementation
**Current state:** Phase 1's Uncertainties clause: "I ask one question if the missing fact changes the design; otherwise, I document my assumption."
**Problem:** This doesn't distinguish *facts* (recoverable from the codebase — look them up, don't ask) from *decisions* (genuinely the user's call), and doesn't require offering a recommended default when a question is asked — so questions can land as open-ended rather than a fast yes/no.
**Recommendation:** Sharpen the clause: look up anything that's a fact rather than asking; for genuine decisions, ask one at a time, always with a recommended default attached; never proceed on an assumed decision, only on an assumed *fact*. Same caveat as finding 3 — this edits the constitution's wording directly.

### 10. Fowler smell vocabulary for `quality-audit/SKILL.md`
**Category:** Workflow
**Impact:** LOW
**Current state:** `quality-audit`'s detection categories (naming, formatting, comments, length/nesting, magic values) are coarser than the classic named-smell vocabulary.
**Problem:** "Long function" and "deep nesting" don't capture smells like Feature Envy, Data Clumps, Primitive Obsession, or Shotgun Surgery — real patterns the current categories would miss or mislabel.
**Recommendation:** Add the Fowler smell names as reference vocabulary within the existing detection categories (not a new category) — with the same rule already in the Code Quality persona: the project's own convention is the baseline, named smells are judgment calls, not a checklist to enforce mechanically.

---

## Considered and Rejected (with reasoning, so these aren't re-raised)

**User-invoked vs. model-invoked skill axis.** cone-lite skills already function as model-invoked in effect — they're matched by description/trigger phrases, not by requiring the user to type a literal name. Formalizing a second axis on top of that would add ceremony without closing a real gap. The one real piece of value (hard vs. soft dependencies) is folded into finding 4.

**`ask-matt`-style router skill.** Their repo has 40+ skills and needs a router. cone-lite has 6 personas and 5 skills — the existing `personas/README.md` and `skills/README.md` index tables serve the same purpose at this scale. Revisit once the count roughly doubles; premature now.

**`wayfinder`'s fog-of-war ticket tracking.** Built entirely on issue-tracker-native blocking links. cone-lite is deliberately docs-and-session-file native, not tracker-native — importing this would require adopting a tracker abstraction cone-lite doesn't have and doesn't need. `roadmap/BACKLOG.md` plus the session protocol already cover the same ground differently.

**`triage`'s full issue-state-machine workflow.** Same reasoning as `wayfinder` — tracker-native, foreign to a tracker-agnostic framework.

**`handoff/SKILL.md`'s ephemeral temp-dir design.** This is the opposite of `SESSIONS.md`'s deliberate choice — permanent in-repo archive, dual-purpose by design (`PHILOSOPHY.md`'s "Dual-Purpose Sessions" principle). Not a gap, a considered divergence; don't import the mechanism. (Two small pieces — explicit secret redaction and a "suggested next-session skills" line — are worth folding into `SESSION_TEMPLATE.md` separately if useful, but weren't scored as standalone findings here since they're minor.)

**Formal prototype/spike discipline.** Interesting, but `AGENT.md` Phase 2 already covers the core of it ("Riskiest Assumption: I verify this before step 1"). Not enough of a gap to warrant a new skill yet.

**TDD skill.** Generic good practice, not cone-lite-differentiating. `CODING_COMPANION.md` could eventually get a short testing-discipline addition, but it's lower priority than anything above.

---

## Implementation Order

1. ~~Finding 1 (`CONTEXT.md`)~~ — **DONE (2026-07-11).** Added `cone/project/architecture/CONTEXT.md`, seeded with 7 terms already ambiguous across cone-lite's own docs (pillar, guardrail vs. constraint, system, OKF vs. propolis, concept, proposal, and a note retiring "Canon" as borrowed language).
2. ~~Finding 2 (ADR gate)~~ — **DONE (2026-07-11).** Added the 3-condition gate and short-form default to `archive/decisions/TEMPLATE.md`.
3. ~~Finding 6 (`out-of-scope/` registry)~~ — **DONE (2026-07-11).** Added `cone/project/roadmap/out-of-scope/` with `TEMPLATE.md` and `index.md`, cross-linked from `BACKLOG.md` (check before re-adding a rejected item) and distinguished from `cone/evolution/`'s framework-level `REJECTED` status in the registry's own index.
4. ~~Finding 4 (skill-creator upgrade)~~ — **DONE (2026-07-11).** Added the predictability framing, information hierarchy, hard-vs-soft dependency note, and a new "Failure Modes to Check a Draft Against" section (premature completion, duplication, sediment, sprawl, no-op, negation) to `skill-creator/SKILL.md`.
5. ~~Finding 10 (Fowler vocabulary)~~ — **DONE (2026-07-11).** Folded named smells into `quality-audit/SKILL.md`'s existing categories (Mysterious Name, Divergent Change, Primitive Obsession, Shotgun Surgery, Repeated Switches), plus an "optional vocabulary" block for the ones with no natural category fit (Feature Envy, Data Clumps, Message Chains, Middle Man, Refused Bequest, Speculative Generality — the last cross-linked to Unifier's Indirection Tax).
6. ~~Finding 7 (staleness warning)~~ — **DONE (2026-07-11).** Added to `specs/proposals/TEMPLATE.md`'s Proposed Solution and Impact sections, with an explicit note that this does *not* apply to `SESSIONS.md` handoffs (different time horizon, precision is a feature there).
7. ~~Finding 8 (expand-contract)~~ — **DONE (2026-07-11).** Added to `CODING_COMPANION.md` section 9 as a new "Wide refactors: expand-contract" subsection.
8. ~~Finding 5 (`MODULE_DESIGN.md`)~~ — **DONE (2026-07-11).** Added as a project-pillar reference doc, cross-linked from `HEXAGONAL.md`'s Further Reading (explicitly scoped as one altitude below it — module interfaces, not system layering) and from the deletion test back to [[unifier]].
9. ~~Findings 3 and 9 (`AGENT.md` edits)~~ — **DONE (2026-07-11).** User reviewed exact wording before writing. Phase 5 gained a "Tight Feedback Loop" clause before hypothesizing and now requires 3-5 ranked hypotheses instead of one; Phase 1's Uncertainties clause now splits facts (look up) from decisions (ask one at a time with a recommended default, never assumed).

All ten findings implemented. Proposal complete.

---

## Notes

Not evaluated in depth: `skills/personal/*`, `skills/in-progress/*`, and most of `skills/misc/*` — skimmed by title only, nothing there looked structurally relevant to a documentation-and-persona framework.

One item outside cone-lite's own scope but worth flagging separately: `git-guardrails-claude-code/SKILL.md` in the source repo is a `PreToolUse` hook that hard-blocks destructive git commands (`push --force`, `reset --hard`, `clean -f`, `branch -D`) before execution — a technical enforcement layer, not a documentation pattern. cone-lite's git safety rules currently live as prose in the global `CLAUDE.md`. This doesn't belong in `cone/` (it's tooling, not knowledge), but it's a legitimate stronger guarantee than a prose rule an agent could still slip on. If wanted, it should be set up via the `update-config` skill against `.claude/settings.json`, as a separate task from this proposal.
