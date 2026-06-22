# Universal Design System — Layer 5: Instances
### Specification Document
**Version 1.0 · 2026 · Companion to the UDS specification series**

> This document specifies Layer 5 of the Universal Design System. It is the final layer — the bridge between the specification and the real world.

---

## What Layer 5 Is

An Instance is a Layout populated with real Compositions, real tokens, and real content.

It is the thing a user actually sees and uses.

Everything in Layers 0–4 has been specification. Primitives, Constructions, Compositions, Layouts — all of these are abstract patterns. They have no color. They contain no real text. They show no actual data. They are the rules of the language, not the sentences written in it.

Layer 5 is where the language produces something real.

---

## The Phase Change Into Layer 5

Every layer transition in this system introduces exactly one new property. The transition from Layout to Instance introduces: **specificity**.

A `MarketingPage` Layout with a `HeroSection` in its `[sections]` region is a specification. It says: there is a hero region, it has a headline slot, a body slot, an actions slot.

A `MarketingPage` Instance has a hero region with the headline "Ship better software, faster," a body that reads "The only project management tool built for engineering teams," and two buttons labeled "Start free trial" and "See how it works." It has a specific background color. A specific typeface. A specific illustration in the media slot.

The specification became a sentence. The sentence is an Instance.

---

## Instances Are Not In The Inventory

Every layer above this one has an inventory — a list of named, defined elements. Layer 5 does not.

Instances are infinite. Every page of every product built on UDS is a unique Instance. Attempting to inventory them would be category confusion — it would be like a grammar book trying to list every valid sentence in a language.

What this document specifies instead:

1. The protocol for materializing an Instance from the layers below
2. The three decisions that define every Instance
3. How the token system resolves visual identity
4. What an agent needs to create a valid Instance
5. The relationship between Instances and the Domain Packs

---

## The Three Decisions That Define An Instance

Every Instance is fully determined by three decisions, made in this order:

### Decision 1 — Choose a Layout

Which of the ten Layout patterns is this page?

```
MarketingPage | AppShell | DocumentPage | DashboardPage |
FormPage | SplitPage | GridPage | DetailPage |
OverlayLayout | ErrorPage
```

This decision establishes the spatial structure. It determines which named regions exist, what the responsive behavior is, and what types of Compositions can fill each region.

### Decision 2 — Apply a Skin

Which token set governs the visual identity?

A Skin is a complete set of resolved token values from the L0 Asset Layer. It specifies:

- Color palette (primary, secondary, neutral, semantic colors)
- Typography (typeface, scale, weight, line-height)
- Spacing scale
- Border radii
- Elevation / shadow system
- Motion curves and durations
- Icon weight (Phosphor default — Thin through Duotone)

The same Layout with two different Skins produces two visually distinct Instances with identical structure and behavior. This is the parametric core of the system — structure and skin are genuinely independent.

### Decision 3 — Fill The Regions

Which Compositions (or Constructions, or Primitives) occupy each named region, with what real content?

This decision is made per region, in order of the Layout's region hierarchy. Each region is filled according to its type rules. Each Composition is populated with real authored content, real data, or real user-generated content.

When all three decisions are made, the Instance is fully specified. An agent or developer can materialize it.

---

## The Materialization Protocol

This is the formal process for creating a valid Instance. It applies whether a human designer is working in a design tool, a developer is writing code, or an agent is generating a project from a prompt.

```
STEP 1 — Select Layout
  Input:  project type + page purpose
  Output: one of the 10 named Layouts
  Test:   does the Layout's region structure match the page's spatial needs?

STEP 2 — Select or Create Skin
  Input:  brand identity requirements
  Output: a complete token set resolving all L0 token variables
  Test:   do all token values satisfy WCAG AA contrast requirements?

STEP 3 — Map Compositions to Regions
  Input:  Layout's named regions + available Compositions from L3 + Domain Packs
  Output: one Composition (or Construction) per required region
  Test:   does each Composition match the region's type rule?

STEP 4 — Populate Content Slots
  Input:  real content (copy, data, media, user content)
  Output: each Composition's named regions filled with actual content
  Test:   does every required slot in every Composition have real content?

STEP 5 — Validate Accessibility
  Input:  the fully populated Instance
  Output: WCAG AA compliance check against the accessibility contracts
          defined per Composition in L3
  Test:   see individual Composition accessibility contracts

STEP 6 — Verify Responsive Behavior
  Input:  the Instance at three viewport widths (mobile / tablet / desktop)
  Output: confirmation that the Layout's responsive rules produce
          a valid spatial arrangement at each breakpoint
  Test:   no region overflow, no content collision, no loss of function
```

A valid Instance passes all six steps. An Instance that fails any step is incomplete — not a finished product.

---

## Skins: The Visual Identity Layer

A Skin is the primary commercial product this system generates. Every Instance needs one. A bare Instance without a Skin has no color, no typography choices resolved, no visual identity — it is structurally correct but visually undefined.

### What a Skin Contains

A complete Skin resolves every token variable defined in the L0 Asset Layer:

**Color tokens (minimum required set):**
```
--color-brand-primary
--color-brand-secondary
--color-neutral-50 through --color-neutral-900
--color-background-primary
--color-background-secondary
--color-background-tertiary
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-border-primary
--color-border-secondary
--color-border-tertiary
--color-semantic-success
--color-semantic-warning
--color-semantic-error
--color-semantic-info
```

**Typography tokens:**
```
--font-family-sans
--font-family-mono
--font-size-xs through --font-size-4xl
--font-weight-regular
--font-weight-medium
--line-height-tight
--line-height-normal
--line-height-relaxed
--letter-spacing-tight
--letter-spacing-normal
--letter-spacing-wide
```

**Shape tokens:**
```
--border-radius-sm
--border-radius-md
--border-radius-lg
--border-radius-xl
--border-radius-full
```

**Elevation tokens:**
```
--elevation-0 through --elevation-4
```

**Motion tokens:**
```
--duration-fast:     100ms
--duration-normal:   200ms
--duration-slow:     400ms
--easing-standard:   cubic-bezier(0.4, 0, 0.2, 1)
--easing-decelerate: cubic-bezier(0, 0, 0.2, 1)
--easing-accelerate: cubic-bezier(0.4, 0, 1, 1)
```

**Icon tokens:**
```
--icon-weight:  regular (Phosphor default)
--icon-size-sm: 16px
--icon-size-md: 20px
--icon-size-lg: 24px
```

### What a Skin Does Not Contain

A Skin does not contain:
- Component structure (that is L1–L3)
- Layout structure (that is L4)
- Content (that is Instance-specific)
- Behavior or interaction logic (that is L2B Controllers and L2C Bridges)

A Skin is pure visual values. Nothing else.

### Skin Examples

A SaaS product Skin and an editorial blog Skin built on the same system:

```
SaaS Dark Skin                    Editorial Warm Skin
─────────────────────────         ─────────────────────────
primary:     #6366F1 (indigo)     primary:     #B45309 (amber)
background:  #0F0F11 (near-black) background:  #FFFBF5 (warm white)
text:        #F4F4F5 (near-white) text:        #1C1917 (warm black)
radius-md:   6px (tighter)        radius-md:   12px (softer)
font-sans:   Inter                font-sans:   Lora (serif body)
font-weight: 400/500              font-weight: 400/600
elevation:   colored glow         elevation:   warm shadow
icon-weight: regular              icon-weight: light
```

Same 175 system elements. Same ten Layouts. Completely different product feel. The structure is invariant. The skin is everything visible.

---

## What An Agent Needs To Create A Valid Instance

When an agent (Claude or any other) is given a prompt to build a page or product using this system, the minimum required inputs are:

**Required:**
- Project type (SaaS / e-commerce / editorial / mobile / dashboard)
- Page purpose (landing page / auth / dashboard / detail / etc.)
- A Skin (or enough brand parameters to derive one)
- Content for each region (copy, data structure, media references)

**Optional but recommended:**
- Domain Pack selection (if the project needs domain-specific Compositions)
- Accessibility level target (AA minimum, AAA preferred)
- Primary user flow (what is the page trying to accomplish)

**The agent's decision sequence:**
```
1. Project type + page purpose → select Layout
2. Brand parameters → resolve or select Skin
3. Layout regions + available Compositions → map Compositions to regions
4. Content inputs → populate Composition slots
5. Run materialization protocol Steps 5–6 (accessibility + responsive check)
6. Output: valid Instance
```

An agent that follows this sequence produces consistent, accessible, correctly structured output regardless of which specific page it is building. The system does the architectural thinking. The agent does the instantiation.

---

## Instances and Domain Packs

Domain Packs extend the available Compositions for specific product types. When an Instance is being created for an e-commerce product, the E-Commerce Domain Pack's Compositions become available to fill regions.

The protocol is identical — Domain Pack Compositions slot into Layout regions following the same type rules as core Compositions. They are not special cases. They are just additional vocabulary available in specific contexts.

```
Core system:           80 + 47 + 38 + 10 = 175 elements
E-Commerce Pack:       + ~12 additional Compositions
Editorial Pack:        + ~8 additional Compositions
SaaS Pack:             + ~10 additional Compositions
Dashboard Pack:        + ~10 additional Compositions
```

A project using one Domain Pack has access to 175 + pack size elements. The system's generative capacity scales with the packs installed without any changes to the foundational layers.

---

## The Relationship Between Instances and Skins (The Product Model)

This is where the specification meets the business.

The system produces two separable commercial products:

**Product 1 — The Skeleton**
Layers 0–4: the full structural specification. Primitives, Constructions, Compositions, Layouts, and the token system. This is what a developer or agent implements once to have a fully functional, accessible, responsive component library.

The value: any Interface built from this skeleton is structurally correct, accessibility-compliant, and responsive by default. The builder does not need to make architectural decisions — the system makes them.

**Product 2 — The Skins**
Named, fully resolved token sets that plug into the Skeleton and produce a specific visual identity. Each Skin is a complete set of token values plus a short agent prompt that explains the design intent and constraints.

The value: a buyer applies a Skin to their existing Skeleton implementation (or an agent applies it for them) and gets a complete visual identity in one operation. No design decisions required. No inconsistency between components.

**The Agent Skill Product**

Both products are distributed as agent skills — structured prompts that give an agent everything it needs to either implement the Skeleton from scratch, apply a Skin to an existing codebase, or do both.

Skill 1 — Skeleton Setup Skill:
Gives the agent the full L1–L4 specification and instructs it to implement the component library in a specified framework (React, Vue, Svelte, etc.) with the correct Primitive contracts, Construction patterns, and Layout structures.

Skill 2 — Skin Application Skill:
Gives the agent a complete token set and instructs it to apply those tokens to an existing codebase — whether it uses this system's structure or not. Lower fidelity than Skeleton + Skin together, but useful for projects that cannot or will not adopt the full system.

Skill 3 — Instance Generation Skill:
Gives the agent the full system knowledge and instructs it to build a specific page from a content brief. Input: page purpose + content. Output: valid Instance.

---

## Layer 5 Is Where The System Proves Itself

The test of any design system is not how elegant its specification is. It is whether a builder — human or agent — can take the specification and produce something real that works.

The materialization protocol above is that test. Six steps. Clear inputs, clear outputs, clear validation criteria at each step. If a builder follows the protocol and cannot complete a step, the system has a gap. That gap is either a missing Primitive, a missing Construction, a missing Composition, or a missing Layout.

This is the completeness test stated in the core spec: if you cannot build any Instance you need from the elements defined in L1–L4, something is missing. That missing thing — and only that thing — justifies adding to the system.

Everything else is an Instance.

---

## Full System Summary

The Universal Design System is complete at this specification level.

| Layer | Name | Count | What it is |
|---|---|---|---|
| L0 | Asset Layer | — | Tokens · Phosphor Icons · Typography |
| L1 | Primitives | 80 | Terminal symbols. Indivisible, typed, universal. |
| L2A | Assemblies | 22 | Slot composition. No shared state. |
| L2B | Controllers | 14 | Shared state machine. Context + Reducer. |
| L2C | Bridges | 11 | Anchor/portal. floating-ui + Portal. |
| L3A | Sections | 16 | Self-contained page regions. |
| L3B | Flows | 10 | Multi-step sequences with completion. |
| L3C | Panels | 12 | Persistent data-bound surfaces. |
| L4 | Layouts | 10 | Spatial constraint systems. Zero content. |
| L5 | Instances | ∞ | Layouts materialized with real content. |
| **Total (L0–L4)** | | **175** | Every element defined and load-bearing. |

**Domain Packs (extensions):**

| Pack | Status | Approx. additions |
|---|---|---|
| E-Commerce Pack | Specified (candidates in L3 doc) | ~12 Compositions |
| Editorial Pack | Specified (candidates in L3 doc) | ~8 Compositions |
| SaaS Pack | Specified (candidates in L3 doc) | ~10 Compositions |
| Dashboard Pack | Specified (candidates in L3 doc) | ~10 Compositions |

**Commercial products derived from this system:**

| Product | What it is | Delivery |
|---|---|---|
| UDS Core | Full L0–L4 specification | Markdown spec + Agent Skill |
| Skeleton Setup Skill | Agent prompt implementing L1–L4 in a framework | Prompt |
| Skin — [Name] | Complete token set + design intent | Token file + Agent Skill |
| Skin Application Skill | Applies a Skin to any codebase | Prompt |
| Domain Pack — [Type] | Domain-specific Composition extensions | Spec + Agent Skill |
| Instance Generation Skill | Builds a specific page from a brief | Prompt |

---

## Closing Statement

This system was derived from first principles. It does not inherit its structure from Atomic Design, Material Design, or any other prior framework. Where it resembles them, that is convergence on correct answers. Where it diverges, that divergence is argued and documented.

The paradigm is formal systems, not chemistry. The layers are Primitives, Constructions, Compositions, Layouts, and Instances — not atoms, molecules, organisms, templates, and pages. The naming is not cosmetic. It signals a different way of thinking about interface design: generative, typed, formally complete.

A system built this way can be learned once and applied to any product. That is what universal means.

---

*Universal Design System · Layer 5 Specification · Version 1.0 · 2026*
*Final document in the UDS specification series*
*Companion documents: `universal_design_system_v1.md` · `universal_design_system_layer3.md` · `universal_design_system_layer4.md`*