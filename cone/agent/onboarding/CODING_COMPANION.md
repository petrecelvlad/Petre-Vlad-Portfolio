---
type: Protocol
title: Universal Coding Companion
description: Universal coding behavior guide — governs HOW to write code, not WHAT system to build.
tags: [onboarding, coding, agent]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Technology-agnostic
  - Read at the start of any coding session
agent_instructions: >
  Universal coding behavior guide. Governs HOW I write code, not WHAT system I'm building.
  Read this before writing or modifying any source file.
---

# Universal Coding Companion

> **What this is:** Behavioral guidance for coding sessions — the HOW layer. It is technology-agnostic and applies to any project.
>
> **What this is not:** Architecture rules (those live in `AGENT.md` and [architecture/](../../project/architecture/OVERVIEW.md)). This document governs how you write code, not what system you're building.
>
> **When to read it:** At the start of any session where you will write or modify code.

---

## 1. The Prime Directive

**Write for the next reader, not for the compiler.**

The compiler accepts anything that type-checks. The next reader — an agent or human six months from now — needs to understand what the code does, why it exists, and what it would break if changed. Every decision below flows from this.

---

## 2. Naming

Names are the primary form of documentation. A good name makes a comment unnecessary.

**Variables and functions:**
- Name what a thing *is* or *does*, not how it's implemented: `userHasAccess` not `checkBool`
- Boolean names start with `is`, `has`, `can`, `should`: `isExpired`, `hasPermission`
- Functions that return a value are named for the value: `getSessionId()`, `buildPayload()`
- Functions with side effects are named for the action: `saveMessage()`, `flushBuffer()`
- Avoid abbreviations unless universally understood in the domain (`id`, `url`, `jwt` are fine; `msgBuf`, `tmpRef` are not)

**Collections:**
- Name collections in the plural: `messages`, `cells`, `handlers`
- Name a single item from a collection with the singular: `message`, `cell`, `handler`

**Anti-patterns:**
- `data`, `info`, `stuff`, `thing`, `temp` — these carry zero information
- `manager`, `service`, `util`, `helper` as suffixes without a qualifier — `AuthService` yes, `Service` no
- Hungarian notation: no `strName`, `bIsValid`, `arrItems`

---

## 3. Function Discipline

**One function, one job.** If you need "and" to describe what a function does, split it.

**Size heuristic:** A function that doesn't fit on one screen (roughly 40 lines) is a signal — not a rule — that it's doing too much. Examine it. Sometimes 50 lines of sequential transformation is fine. A 20-line function with three nested conditionals may be worse.

**The three categories of code:**
- **Pure transformations** — input in, output out, no side effects. These are trivially testable and composable. Maximize their use.
- **Effectful operations** — I/O, mutations, network calls. Isolate these at the edges. Never mix transformation logic inside an effect.
- **Orchestrators** — coordinate pure transformations and effectful operations. They should contain almost no logic of their own, just sequencing.

**Arguments:**
- 3 or fewer positional arguments. Beyond that, use an options object.
- Don't use boolean arguments to switch behavior: `processMessage(message, true)` — what does `true` mean? Use two functions or an options object with a named field.
- If a function requires the same argument as every other function in a class, it belongs in the constructor.

---

## 4. Error Handling

**Fail loudly, fail early.** Silent failures are the hardest class of bug to diagnose.

**The three failure modes:**
- **Expected failures** — validate inputs, return typed error results or throw typed errors. The caller knows what to handle.
- **Unexpected failures** — let them propagate. Catching `unknown` exceptions and swallowing them hides bugs. Catch only what you can meaningfully handle.
- **Impossible states** — use the type system to make them unrepresentable. An exhaustive type union is better than a runtime check.

**Error messages:**
- Include context: what was being attempted, what went wrong, what the caller can do.
- Bad: `"Error: failed"`. Good: `"User lookup failed: userId=${userId} not found in database after migration 004"`.
- Error messages are read during incidents. Write them for that context.

**Never silently discard:**
- Don't catch and re-throw without adding context
- Don't swallow errors in `catch` blocks with only a comment
- Don't return `null` when an exception would be more informative

---

## 5. Comment Discipline

**Default to no comments.** Well-named code is self-documenting. A comment that explains WHAT code does is a failure of naming.

**Write a comment when:**
- The WHY is non-obvious: a hidden constraint, a business rule, a platform quirk, a workaround for a specific bug
- The code would surprise a reasonable reader who understands the domain
- There is a subtle invariant that the code relies on but doesn't enforce

**Never write a comment when:**
- It restates what the code already says: `// increment counter` above `counter++`
- It references the current task or PR: `// added for the auth fix` — this belongs in the commit message
- It could be eliminated by renaming the variable or function

**The test:** Remove the comment. If a future reader would be confused, put it back. If they'd be fine, leave it out.

---

## 6. State Discipline

**Minimize state.** Every piece of state is a variable that can be wrong.

- Derive values rather than storing them: if `fullName` can be derived from `firstName + lastName`, don't store `fullName`
- State lives at the lowest level that needs it — not globally unless it truly is global
- Single source of truth: the same data in two places is an eventual consistency bug waiting to happen
- Prefer immutable data structures where the language supports it efficiently
- Mutations should be explicit, local, and short-lived

---

## 7. Dependency Discipline

**Dependencies flow in one direction.** High-level policy does not depend on low-level implementation. Infrastructure does not leak into domain logic.

**Import discipline:**
- If you're reaching across a module boundary to grab an internal implementation detail, you've violated encapsulation
- Circular imports indicate missing abstractions. When A imports B and B imports A, something belongs in C
- Don't import for side effects unless you're at the composition root

**Dependency injection over hardcoded dependencies:**
- A function that `import`s a concrete service is tightly coupled to it. A function that *receives* a service as an argument can be tested with a substitute.
- This doesn't mean every function needs DI — only those where the dependency could change, vary by environment, or needs to be tested in isolation.

---

## 8. Type Discipline

**Types are documentation that never goes stale.**

- Prefer explicit types at module boundaries: function signatures, exported values, API contracts
- `any` at a boundary is a contract hole — a place where the type system can no longer help
- `unknown` with a type guard is almost always the right alternative to `any`
- Avoid type assertions (`as Type`) unless you have verified the shape at runtime immediately above
- Enums and discriminated unions make impossible states impossible — use them for state machines and result types

**The boundary rule:** External inputs (API responses, user input, environment variables) must be validated and typed at entry. Once inside the system boundary, trust the types.

---

## 9. Refactoring Heuristics

**Refactor to improve understanding, not to satisfy a pattern.**

**When to refactor:**
- The code is about to be changed and is hard to change safely
- The same logic appears in three or more places
- A name no longer reflects what the code does
- A function has grown beyond its original responsibility

**When NOT to refactor:**
- The code is stable and not being changed — leave it alone
- You're refactoring "while you're here" and it's unrelated to the task — put it in a separate commit at minimum
- The refactor would require touching many files and no test coverage exists to verify correctness

**Sequence:** Refactor in a separate commit from feature changes. A commit that adds behavior AND restructures code is hard to review and hard to revert.

**Wide refactors: expand-contract.** Some refactors are mechanical but touch too many call sites to land as one vertical slice — renaming a widely-used type, changing a function's signature across dozens of callers. Don't do these as one large commit, and don't abandon them partway with the codebase in a mixed state. Sequence them in three phases: **expand** (add the new form alongside the old — nothing breaks yet), **migrate** (move callers in blast-radius-sized batches, each independently shippable, tests green throughout), **contract** (delete the old form once no caller references it). Each phase is a separate commit; the migrate phase can be several.

---

## 10. Code Review Mindset

When reading code (your own or others'), ask in this order:

1. **Does it do what it claims to do?** Does the name match the behavior? Does the function do one thing?
2. **Can it fail silently?** Are errors handled? Are inputs validated at boundaries?
3. **Can it be changed safely?** Are dependencies clear? Is the state minimal and explicit?
4. **Would the next reader understand it?** Would a developer six months from now understand why this exists?
5. **Is anything being repeated?** Can the duplication be eliminated without making the code harder to understand?

These five questions catch most problems. Detailed style checks belong in a linter, not a human review.
