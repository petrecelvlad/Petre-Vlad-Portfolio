---
type: Reference
title: Module Design Reference
description: >
  Vocabulary and heuristics for designing individual module interfaces — depth, seams,
  and when an abstraction is paying for itself. Complements HEXAGONAL.md at a different
  altitude: that document governs system-level layering, this one governs the shape of
  an individual module within a layer.
tags: [architecture, reference, project]
timestamp: 2026-07-11T00:00:00Z
constraints:
  - Reference document — not prescriptive for every module, use judgment on when depth matters
agent_instructions: >
  Read when designing a new module's interface, or evaluating whether an existing one is
  worth its complexity. Distinct from HEXAGONAL.md — that document is about the boundary
  between Core and infrastructure; this one is about the boundary between a module and
  its own callers, at any layer.
---

# Module Design Reference

Hexagonal Architecture ([HEXAGONAL.md](./HEXAGONAL.md)) answers "how do layers relate to each other." This document answers a narrower question: "is this specific module's interface well-shaped, regardless of which layer it's in." A system can follow Hexagonal Architecture perfectly at the system level and still be full of individually badly-shaped modules — the two concerns are independent.

---

## The Core Idea: Depth

A module has an **interface** (what callers see: exported functions, types, the contract) and an **implementation** (what's behind it: the logic that fulfills the contract). **Depth** is the ratio between what the implementation does and how much the interface exposes to get it.

A **deep module** does a lot behind a small interface — the caller states what it wants and doesn't need to know how. A **shallow module** exposes nearly as much surface area as it has behavior — using it requires almost as much understanding as reimplementing it would.

Shallow modules aren't free just because they're simple to write. Every shallow module is one more thing a caller has to hold in their head. A codebase of many shallow modules costs more in aggregate reading time than a few deep ones, even though each individual shallow module looks easy in isolation.

---

## The Deletion Test

Before keeping an abstraction — a wrapper, a factory, an interface with one implementation — ask:

> If I deleted this and inlined what's behind it, would the codebase's overall complexity go down, or would the same complexity just move somewhere else, unlabeled?

If deleting it would genuinely simplify things, it wasn't earning its keep. If deleting it would just relocate the same logic to every call site, it's a deep module doing real work — keep it. This is the same question the [Unifier](../../agent/personas/UNIFIER.md) persona asks about proposed consolidations, applied here to modules that already exist rather than duplication being proposed.

---

## Seams and Locality

A **seam** is a point in the code where one implementation could be substituted for another without changing the caller — the thing a Port/Adapter pair in [HEXAGONAL.md](./HEXAGONAL.md) creates at the system level, but seams exist inside a single layer too (a strategy object, an injected comparator, a pluggable formatter).

A seam is only real if there are — or will realistically be — two implementations. One implementation behind an interface is a **hypothetical seam**: speculative flexibility paid for today against a need that may never arrive. Two implementations behind the same interface is a **real seam** — the abstraction is already earning its cost.

**Locality** describes how far a caller has to look to understand what a module does. A module with high locality can be understood by reading its own file. A module with low locality requires jumping through several files or a registry to understand a single call — the same cost the Unifier persona names the **Indirection Tax** when it shows up as a consolidation side effect.

---

## Categorizing Dependencies

When deciding how deep a module's interface should be, or how to test it, the nature of what it depends on matters:

| Category | Description | Testing implication |
|---|---|---|
| **In-process** | Pure logic, no I/O, lives in the same process | Test directly, no substitution needed |
| **Local-substitutable** | A dependency with a cheap, faithful local stand-in (an in-memory store standing in for a database) | Test against the local stand-in, not a mock of the interface |
| **Remote-but-owned** | A network call to a service this codebase also controls | Test against a real instance in CI if feasible; contract-test the interface if not |
| **True-external** | A third-party API or service outside this codebase's control | Isolate behind a Port ([HEXAGONAL.md](./HEXAGONAL.md)) and test the adapter separately from the logic that calls it |

---

## When This Matters

**Worth applying deliberately when:** a module's interface is being designed for the first time, or an existing module has become a common source of confusion or duplicated understanding across the team.

**Not worth the ceremony for:** small, single-purpose utilities where the interface and implementation are already close to the same size — running the deletion test on a five-line pure function is wasted motion.
