# Architecture Documentation

**Start here:** [OVERVIEW.md](./OVERVIEW.md) — system architecture, hexagonal boundaries, component tiers, orchestration, and key constraints.

---

## Design System
The token-driven, skin-swappable visual system.

1. [Token Contract](./design-system/Token_Contract.md) — the CSS custom property schema. Every color, size, shadow, and timing value as a parametric contract.
2. [Skin: Gamified](./design-system/Skin_Gamified.md) — resolved values and heuristics for the runtime-default skin.
3. [Skin: Heritage](./design-system/Skin_Heritage.md) — resolved values and heuristics for the second live skin.
4. [Skin System](./design-system/Skin_System.md) — the structural/variant tier and Tier 3 slot-registry mechanism.

## Technical Specs
Deep-dives into specific subsystems and patterns.

1. [Component Architecture](./specs/Component_Architecture.md) — atomic tier rules and data flow.
2. [System Design & The Managed Stage](./specs/System_Design.md) — shell architecture and the scroll envelope.
3. [Project Template (Bento Layout)](./specs/Project_Template.md) — `IProject` data model and bento grid rules.
4. [Timeline Animation Spec](./specs/Timeline_Animation_Spec.md) — symmetric fill logic and directional triggers.
5. [Technical Implementation](./specs/Technical_Implementation.md) — SRP decomposition and modularity strategy.
6. [Experience Guidelines](./specs/Experience_Guidelines.md) — motion principles, typography rhythm, micro-interactions.

## Process
- [Workflow & Logs Protocol](./Workflow_and_Logs.md) — how to log architectural changes.
- [Developer Logs](../Logs.md) — the architectural decision diary (scroll snap attempts, animation refinements).
