---
type: Task
title: "T-032: Redesign Hero's middle column (unify role + description)"
description: "Merge the role title and the bio note into one unified visual element instead of two visually separate pieces"
status: done
priority: medium
parent: T-030
tags: [roadmap, task, hero, visual-design]
timestamp: 2026-08-24T00:00:00Z
---

# T-032: Redesign Hero's middle column (unify role + description)

## Context

Part of [T-030](T-030-hero-section-polish.md). Today the middle column stacks the name, then a
separate `GamePlaque`-framed role label (`AnimatedRoleTitle.tsx`, now static "GAME PRODUCER"),
then a separate torn-paper bio panel — three visually distinct elements rather than one cohesive
piece.

---

## Acceptance Criteria

- [x] Role label and bio description read as one unified visual element, not two disconnected ones
- [x] Final direction confirmed with the user before implementation

---

## Sub-Tasks

(none — single-scope visual redesign)

---

## Notes

Landed 2026-08-26/27: `AnimatedRoleTitle`/`GamePlaque` badge removed. New atoms
`src/components/atoms/RibbonBanner.tsx` (a swallow-tailed ribbon reading "GAME PRODUCER",
styled after a model-generated reference) and `src/components/atoms/RibbonPaperSeam.tsx` (a
joinery accent bridging the seam, modeled on `BentoResponsibilities.tsx`'s `BinderClip`) now fuse
onto the existing `TornPaperPanel` bio card in `Hero.tsx`. Went through several corrective rounds
with the user (initial layout too small/offset, then a full outline/shadow rework after the
ribbon read as "three shapes taped together" instead of one molded object — fixed by merging the
tails+body into one stroked/shadowed silhouette, matching `GamePlaque`'s documented
one-continuous-outline principle in `GAME_PLAQUE.md` §7).
