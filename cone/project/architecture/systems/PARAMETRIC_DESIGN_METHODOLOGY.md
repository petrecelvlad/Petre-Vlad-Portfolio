# Parametric Design System — Methodology Reference

## What this is

A generic, project-agnostic methodology for building token-driven, layered design systems — distilled from a formal design-systems methodology explored for a separate project. Only the reusable logic is kept here. Nothing project-specific to that other project (naming, branding, commercial details) is reproduced in this file or anywhere in this repo.

## The core methodology

A layered model, L0 through L5, each layer strictly built from the one below it:

- **L0 Assets** — raw values only: icon library, type scale, color tokens, spacing scale. Not components.
- **L1 Primitives** — indivisible typed elements. Must pass four tests: indivisible, non-derivable, universally-recurring, semantically singular. Classified along three orthogonal axes: Content↔Structure, Inert↔Transactional, Persistent↔Ephemeral.
- **L2 Constructions** — slot-grammar patterns built from Primitives, three engineering sub-types: Assemblies (props/slots, no shared state), Controllers (shared state machine), Bridges (anchor/portal — tooltips, modals, dropdowns).
- **L3 Compositions** — domain-aware orchestrations of Constructions. Universality test: a Composition belongs at this layer only if it recurs across multiple unrelated product categories — otherwise it's domain-specific and doesn't belong in a universal layer.
- **L4 Layouts** — pure spatial/regional contracts. Zero content, only named regions and their type rules.
- **L5 Instances** — a Layout + a Skin (a fully-resolved token set) + real content. The load-bearing rule: **a Skin is token values only — it never encodes component structure or behavior.**

**Core theoretical stance:** reject the "chemistry" metaphor of atomic design (fixed composition — atoms combine into molecules combine into organisms) in favor of a formal-grammar metaphor: the same structural pattern persists, only its slot-fillers swap. This reframing, not any specific taxonomy, is the actually-portable idea.

**The "Showroom" pattern:** one self-displaying Instance that renders an entire component inventory live, driven purely by whichever token set (Skin) is active — a validation/QA surface that proves the system's claims about itself.

## How this project already reconciled with it

This project ran this exact reconciliation already, on 2026-07-20 — see `DR-009` in `cone/project/archive/decisions/LEGACY_DECISIONS_LOG.md`. Full record there; summary:

- **Adopted:** the Skin-validation discipline — every Skin's token set must pass WCAG AA contrast, and every Layout must be verified at defined breakpoints. Already folded into `SKIN_SYSTEM.md`'s Sequencing Plan.
- **Deliberately rejected:** the L1–L4 component taxonomy and naming. Reasoning on record: the existing hexagonal + atomic component tiers already do this job at this project's scale (`DR-006`); the taxonomy has no concept of a `SkillTree` or `TimelineTrack`; and this project's own design brief (`cone/project/memory/ANTI_PATTERNS_LEGACY.md`) is specifically about escaping "genre-assembly" — adopting a maximally generic taxonomy would cut against that brief, not support it.
- **Convergent, not new:** the token-category split (color/typography/spacing/shape/elevation/motion/icon) already matches `TOKEN_CONTRACT.md`'s Tier 1 — no new information there.
- **A gap this project already closed on its own:** this methodology's Skin model is value-only. `SKIN_SYSTEM.md`'s Tier 2 (structural/variant tokens) has no equivalent in this methodology — and this project's own history (`ANTI_PATTERNS_LEGACY.md`'s five *structurally* different rejected directions, not just palette-different ones) is direct evidence a value-only Skin model would have been insufficient here. Tier 2 is a genuine improvement this project made, not a gap in it.

## Open / unexplored

The Showroom pattern has no equivalent in this project today — there's no live, self-displaying component-inventory page for visual QA across skins. That's the one idea from this methodology not yet evaluated either way. Not proposed here — just flagged as the one open thread, worth a `cone/project/specs/proposals/` entry if it's ever prioritized.

## What was deliberately not carried over

The source material also contained a full commercial productization plan for the other project it was written for — pricing tiers and a revenue-model breakdown. That is not design methodology, does not apply here, and is not reproduced in this file or anywhere else in this repo.
