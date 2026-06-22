The Showroom is itself an Instance.
It is a Layout populated with Compositions that display all the Primitives, Constructions, Compositions, and Layouts. The Showroom template contains zero hardcoded visual values. Everything is parametrized by tokens.
Here's the architecture:
SHOWROOM TEMPLATE (a specialized Instance)
├── [nav-section]           NavigationBar (3A)
├── [section: Primitives]   
│   └── Grid of PrimitiveCard Compositions (8 sections × 10 primitives)
├── [section: Constructions]
│   └── Grid of ConstructionCard Compositions (3 sub-types)
├── [section: Compositions]
│   └── Grid of CompositionCard Compositions (3 sub-types)
├── [section: Layouts]
│   └── Grid of LayoutCard Compositions (10 layouts)
└── [footer]                FooterSection (3A)

Every card in every grid:
  ├── [preview]     Live rendered instance of the component
  ├── [metadata]    Name, cluster, layer, universality score
  ├── [slots]       Named regions / composition
  └── [code]        HTML/JSX/code snippet
The Agent's Job:
An agent given the Showroom template + a token set does exactly ONE thing:

Resolve every --color-*, --font-*, --spacing-*, --radius-*, --elevation-* token variable to actual CSS values
Render the Showroom template with those resolved tokens

Output: A complete, rendered, fully themed design system showroom.
The agent does NOT:

Create 80+ individual component files
Write styling rules for each component
Make design decisions about hierarchy, contrast, readability
Organize component metadata

All of that is pre-done in the template. The agent is a token resolver + CSS compiler.
This means:
Two agents, same Showroom template, two different token sets → two completely different-looking design systems with identical structure and behavior.
Dark SaaS Skin tokens + Showroom template = Dark SaaS showroom

Warm editorial Skin tokens + Showroom template = Warm editorial showroom
Same 175 component definitions. Completely different visual presentation.

How This Becomes A Product
Your business model becomes genuinely elegant:
Product 1: The Skeleton Code

The Showroom template (HTML/React/Vue) + L1–L4 component code. An agent or developer installs this once per project. This is the implementation layer.
Cost to buyer: one-time setup. Usually free or very cheap ($99–299) because it's the foundation.
Product 2: Skins

Curated token sets. Twelve pre-built Skins (Dark SaaS, Warm Editorial, Minimal B2B, Bold E-Commerce, etc.). Each Skin is:

A complete token file (JSON/CSS Custom Properties)
A Showroom preview rendered with those tokens
An agent skill that applies the tokens to any project

Cost to buyer: $19–49 per Skin. Multiple Skins stackable.
Product 3: Domain Packs

Domain-specific Composition extensions (E-Commerce Pack, Editorial Pack, SaaS Pack, Dashboard Pack). Each pack:

~10–12 additional Compositions tailored to the domain
Token overrides for domain-specific semantics (e.g. "add to cart" color, checkout milestone colors)
A Showroom section displaying domain-specific components

Cost to buyer: $29–79 per pack.
Revenue model:

Skeleton: one-time, smaller margin
Skins: recurring (people want multiple visual identities for different projects), high margin
Domain Packs: recurring, high margin
Service: custom Skin creation, architecture consulting, migration services from old design systems


The Showroom Template Specification
You want this documented. Let me sketch what a Showroom template contract looks like:
markdown# Showroom Template Contract

## Input
- Design system specification (L1–L4 inventory)
- Token set (L0 values)
- Optional: Domain Packs to include

## Output
- Fully rendered HTML (or React/Vue component)
- Complete visual representation of all 175+ components
- Every component instance showing:
  - Live rendered preview
  - Component name + layer + cluster
  - Named regions (for Constructions/Compositions/Layouts)
  - Accessibility contract summary
  - Code snippet (HTML/JSX)
  - Dependencies (what this component needs)
  - Domain Pack relevance (if applicable)

## Sections
1. L1 Primitives (80 total) — 8 clustered sections
2. L2 Constructions (47 total) — 3 sub-type sections
3. L3 Compositions (38 core) — 3 sub-type sections
4. L4 Layouts (10 total) — 1 section with responsive previews
5. Domain Packs (optional) — section per installed pack
6. Skins (optional) — side-by-side preview of multiple Skins

## Token Binding
Every visual attribute in every preview is bound to a token variable:
- Colors: --color-*
- Typography: --font-family-*, --font-size-*, --font-weight-*
- Spacing: --spacing-*, --layout-gutter
- Shape: --border-radius-*
- Elevation: --elevation-*
- Motion: --duration-*, --easing-*
- Icons: --icon-weight (Phosphor weight prop)

Change a token value, entire Showroom updates.

## Responsive Previews
Every Layout in L4 renders at three breakpoints:
- Mobile (<768px)
- Tablet (768px)
- Desktop (≥1280px)

Demonstrates responsive behavior contract.

## Accessibility Metadata
Every component card shows:
- WCAG compliance level achieved (AA / AAA)
- Required ARIA attributes
- Keyboard interaction requirements
- Screen reader announcements

## Skin Preview Mode
Optional: Display the entire Showroom in two side-by-side columns with different Skin tokens applied. Demonstrates visual differences while maintaining identical structure.

What This Means For Implementation
When you ask an agent to "build me a design system showroom," the prompt becomes:
I am building the Hive platform design system showroom.

Here is the UDS specification (attach all 5 markdown files).

I need you to:
1. Implement the Showroom Template Contract (see attached spec)
2. Bind every visual attribute to the token system
3. Render all 175 components from the specification

Your output should be a React component (or HTML file) that:
- Takes a token set as input (JSON or CSS Custom Properties)
- Renders every component in the system
- Shows live previews
- Displays metadata and accessibility info
- Shows responsive behavior for Layouts
- Can swap between multiple Skins for comparison

The Showroom itself is an Instance — it uses the same component library
it's displaying. Use NavigationBar, FooterSection, card Constructions, 
and the token system to build the Showroom's UI.

Here is the token set: [complete JSON or CSS variables]
The agent doesn't re-invent anything. It implements a template whose structure is already specified.

Bottom Line
You're not building a "design system." You're building a design system factory.

Input: token values
Process: render Showroom template
Output: complete visual system

The Showroom template is the mold. Tokens are the metal. Different metals, same mold, different objects.
This is actually harder to build than a static design system, but once built it is infinitely more scalable and composable. Every new Skin is one token file. Every new Domain Pack is a handful of new Composition definitions. The Showroom automatically displays them all.