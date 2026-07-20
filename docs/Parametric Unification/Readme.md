# UDS Integration README
### For: Hive Platform & Hive OS
**Instruction document for agents working on this codebase**

---

## What This Document Is

This is an instruction file for any agent (or developer) working on the Hive platform or any app running inside Hive OS. It explains what the Universal Design System (UDS) is, why it exists, how it replaces the previous atomic design implementation, and how to use it correctly going forward.

Read this before touching any UI code.

---

## Context: The Hive Platform

The Hive is the meta-platform. Everything is built on top of it. Hive OS is the operating system layer — a platform where individual apps are installed and run. UDS is one of those apps, but it is also the design foundation that governs the UI of every other app on the platform, including the Hive platform itself.

This means:

- The Hive platform UI is built using UDS
- Every app installed on Hive OS is expected to use UDS as its UI foundation
- UDS the app is the living reference implementation of the system — the canonical source of truth for all components, tokens, and patterns

---

## What Changed: UDS vs. The Previous Atomic System

The Hive platform previously used an implementation based on Brad Frost's Atomic Design methodology (Atoms → Molecules → Organisms → Templates → Pages). That system has been superseded.

**Do not use the old atomic system for any new work.**

If you are refactoring existing code, migrate it to UDS conventions. If you are building new UI, use UDS from the start.

### Why it changed

The atomic system used a chemistry metaphor that produced the wrong mental model. In chemistry, molecules have fixed composition — water is always H₂O. In UI, the same pattern (say, a form field) can be composed from different elements depending on context. The chemistry metaphor makes this feel wrong when it is actually correct.

The new system uses a **formal systems paradigm** — the same paradigm used by mathematics, computer science, and linguistics. Primitives are typed contracts. Constructions are slot-grammar patterns. The system is generative, not additive.

### Naming changes

| Old Name | New Name | Notes |
|---|---|---|
| Atom | Primitive | Typed contract, not a particle |
| Molecule | Construction | Slot pattern — 3 sub-types: Assembly, Controller, Bridge |
| Organism | Composition | Domain-aware — 3 sub-types: Section, Flow, Panel |
| Template | Layout | Spatial constraint system, zero content |
| Page | Instance | A Layout materialized with real content |

These are not cosmetic renames. Each new name signals a different way of thinking about the element. Use the new names in all code, documentation, comments, and conversation.

---

## The Five Layers

The full system specification lives in four companion documents (listed at the end of this file). Here is the summary every agent needs to hold in working memory:

### L0 — Asset Layer
Tokens and asset decisions that sit beneath all components. Color, spacing, typography scale, border radii, elevation, motion curves. Icon library: **Phosphor Icons** (MIT, ~7000 icons, 6 weights). Set once per project. Everything inherits from here.

### L1 — Primitives (80 total)
The indivisible, typed UI elements. Cannot be broken down further. Eight clusters: Content, Media, Structure, Surface, Input, Action, Feedback, Ephemeral. Every Primitive satisfies four laws: indivisible, non-derivable, universally reoccurring, semantically singular.

### L2 — Constructions (47 total)
Patterns with slot contracts. Three sub-types:
- **2A Assemblies (22)** — slot composition, no shared state. Engineering: props + slots.
- **2B Controllers (14)** — shared state machine. Engineering: Context + Reducer.
- **2C Bridges (11)** — anchor/portal relationships. Engineering: floating-ui + Portal.

### L3 — Compositions (38 core + Domain Pack extensions)
Domain-aware orchestrations of Constructions. Three sub-types:
- **3A Sections (16)** — self-contained page regions, no cross-region state
- **3B Flows (10)** — multi-step sequences with completion state
- **3C Panels (12)** — persistent data-bound surfaces

Universality rule: a core Composition appears in 3+ of 5 product categories (SaaS, e-commerce, editorial, mobile, dashboard). Domain-specific patterns live in Domain Packs, not the core.

### L4 — Layouts (10 total)
Spatial constraint systems. Define named regions and type rules. Contain zero content. The ten layouts: AppShell, MarketingPage, DocumentPage, DashboardPage, FormPage, SplitPage, GridPage, DetailPage, OverlayLayout, ErrorPage.

### L5 — Instances (∞)
A Layout populated with real Compositions, a resolved Skin (token set), and real content. Every actual page the user sees is an Instance. The materialization protocol: select Layout → apply Skin → map Compositions to regions → populate content slots → validate accessibility → verify responsive behavior.

---

## How To Use This System: Decision Tree

When building any UI element, work through this decision tree:

```
What am I building?

├── A single indivisible element (a button, an input, an icon)?
│   └── → L1 Primitive. Check the Primitive inventory first.
│       If it doesn't exist and truly cannot be derived from existing
│       Primitives, it may be a new Primitive. Apply the four laws test.

├── A combination of Primitives with a slot contract?
│   ├── No shared state between Primitives → L2A Assembly
│   ├── Primitives need shared behavioral state → L2B Controller
│   └── Primitives render in different DOM locations → L2C Bridge

├── A domain-aware pattern that orchestrates Constructions?
│   ├── Self-contained page region, no sequence → L3A Section
│   ├── Multi-step sequence with completion → L3B Flow
│   └── Persistent, data-bound surface → L3C Panel
│   Apply universality test: appears in 3+ of 5 categories?
│   Yes → core L3. No → Domain Pack.

├── A page-level spatial structure?
│   └── → L4 Layout. Use one of the ten named Layouts.
│       If none fit, ask whether this is genuinely a new spatial
│       pattern or a variant of an existing one.

└── A real page with real content?
    └── → L5 Instance. Follow the materialization protocol.
```

---

## Hive Platform Specific Rules

### The Hive platform UI

The Hive platform itself (the OS layer, the app launcher, the settings, the navigation between apps) uses UDS with the following Layout assignments:

- App launcher / home screen → `AppShell` + `GridPage` for installed apps
- Platform settings → `AppShell` + `SettingsPanel` (L3C)
- Onboarding → `FormPage` with `OnboardingWizard` (L3B)
- Error and fallback states → `ErrorPage`

### UDS as a Hive OS app

UDS itself runs as an app inside Hive OS. This app is the living component library — the canonical reference implementation. It contains:

- The full Primitive inventory with interactive examples
- The full Construction inventory with slot documentation
- The full Composition inventory with region maps
- The ten Layouts with responsive previews
- A Skin editor for creating and previewing token sets
- A Skin marketplace (future) for browsing and purchasing Skins

When any other Hive OS app needs a component reference, it points to the UDS app. The UDS app is the single source of truth. It does not duplicate documentation — it is the documentation, running live.

### Cross-app consistency

Every app installed on Hive OS inherits the platform-level Skin (the Hive platform's token set). Individual apps may apply their own Skin overrides for their specific identity, but they must:

1. Use the same Primitive set (L1) — no custom primitives per app
2. Use the same Construction patterns (L2) — no custom interaction patterns per app
3. May add Domain Pack Compositions (L3 extensions) for their specific domain
4. Use a Layout from the ten defined Layouts (L4)
5. Apply their Skin as a token override on top of the platform Skin, not a replacement

This guarantees that all apps on Hive OS feel like they belong to the same system while allowing individual visual identities.

---

## What An Agent Should Do When Encountering Existing Code

If you are working in a codebase that predates UDS and uses the old atomic system:

**Step 1 — Identify the layer**
Map each existing component to its UDS equivalent using the naming table above. Old atoms → Primitives. Old molecules → Constructions. Old organisms → Compositions.

**Step 2 — Check for violations**
Does the existing component satisfy the layer's laws? A component claiming to be a Primitive that is actually composed of multiple Primitives is a Construction. Rename and restructure accordingly.

**Step 3 — Migrate incrementally**
Do not attempt a full rewrite in one pass. Migrate at the layer boundary — start with Primitives, then Constructions, then Compositions. The layers are designed to be independently stable.

**Step 4 — Apply the token system**
Replace all hardcoded color, spacing, and typography values with token variables from L0. This is the prerequisite for Skin support.

**Step 5 — Document the migration**
For each migrated component, add a comment noting the old name, the new name, the layer, and the date of migration. This creates a traceable history.

---

## What An Agent Should NOT Do

- **Do not invent new Primitives** without applying the four laws test. Most things that feel like new Primitives are actually Constructions (composed of existing Primitives).

- **Do not skip the layer decision.** Every UI element lives in exactly one layer. Ambiguity about which layer something belongs to is a signal that the element is not yet well-defined.

- **Do not hardcode token values.** All colors, spacing, radii, and typography must reference L0 token variables. Hardcoded values break Skin support.

- **Do not use the old atomic naming** (atom, molecule, organism, template, page) in new code, comments, or documentation. The old system is retired.

- **Do not nest Layouts.** A Layout defines a page's top-level spatial structure. Layouts do not go inside Layouts (with the sole exception of OverlayLayout, which layers above a page).

- **Do not add domain-specific Compositions to the core.** If a Composition only makes sense for one product type, it belongs in a Domain Pack, not the universal core.

---

## Specification Documents

The full UDS specification lives in four documents. Read them in order:

| Document | Contents |
|---|---|
| `universal_design_system_v1.md` | Core spec: paradigm shift, L1 Primitives (all 80), L2 Constructions (all 47), reference summary |
| `universal_design_system_layer3.md` | L3 Compositions (all 38): full named regions, Construction mappings, accessibility contracts, Domain Pack extensions |
| `universal_design_system_layer4.md` | L4 Layouts (all 10): region rules, responsive behavior, composition rules, token requirements |
| `universal_design_system_layer5.md` | L5 Instances: materialization protocol, Skin specification, product model, agent decision sequence |

These documents are the source of truth. If this README conflicts with the specification documents, the specification documents win.

---

## Quick Reference: The Four Laws (apply to every layer)

**For Primitives (L1):**
1. Indivisible — remove any part and it breaks
2. Non-derivable — cannot be composed from other Primitives
3. Universal — appears in virtually every project type
4. Semantically singular — carries exactly one role

**For Constructions (L2):**
1. Slot necessity — every slot is load-bearing
2. Non-reducibility — emergent meaning cannot come from one Primitive alone
3. Universal reuse — appears across project types
4. Semantic singularity — one interaction concept only

**For Compositions (L3):**
1. Named region necessity — every region is load-bearing
2. Non-reducibility — cannot be produced by a single Construction
3. Universality — passes the 3/5 product category test
4. Semantic singularity — one thematic purpose only

**For Layouts (L4):**
1. Region necessity — every named region serves a spatial purpose
2. Zero content — a Layout contains no authored content
3. Type rules — every region specifies what it accepts
4. Responsive completeness — responsive behavior is part of the contract

---

*UDS Integration README · Hive Platform · Version 1.0 · 2026*
*Update this document when the UDS specification advances to v2.0*