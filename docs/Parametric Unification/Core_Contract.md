# Universal Design System — Showroom Template Contract
### Technical Specification
**Version 1.0 · 2026 · Implementation-ready**

> This document specifies the Showroom Template — a parametrized Instance that displays the entire UDS inventory with live token binding.

---

## Executive Summary

The Showroom is an Instance of the UDS system that displays all 175+ components of the system itself. It is not a static documentation site. It is a living, interactive, fully token-bound application that updates in real-time when tokens change.

**Key principle:** The Showroom uses the same component library it is displaying. Every UI surface of the Showroom is built from L1–L4 components. This creates a bootstrap effect — the system proves itself by displaying itself.

---

## What Is The Showroom

The Showroom is a web application that:

1. **Displays the full UDS inventory** — all 80 Primitives, 47 Constructions, 38 Compositions, 10 Layouts, infinitely parametrizable Instances
2. **Renders live previews** — each component is shown running, not as an image or screenshot
3. **Binds to tokens** — every color, spacing, font, radius, shadow, and motion value is a token variable, not hardcoded
4. **Supports multiple Skins** — the same Showroom renders completely differently when you swap token sets
5. **Proves the system** — by being built entirely from the components it displays, it validates that the system is complete and self-consistent

**Not a Showroom:**
- A static documentation site (though it can generate one)
- A component library UI (though it includes component organization)
- A design tool mockup (though it can connect to Figma)

**Is a Showroom:**
- A fully functional web application that is itself an Instance of Layer 5
- An interactive reference that responds to token changes in real time
- A proof-of-concept that the system works end-to-end

---

## Architecture Overview

```
SHOWROOM APPLICATION
│
├── L4 Layout: AppShell
│   ├── [top-bar] → NavigationBar (3A Section)
│   ├── [sidebar] → SidebarNav (3C Panel) — inventory navigation
│   ├── [main] → one of:
│   │   ├── PrimitiveGallery (displays all 80 Primitives)
│   │   ├── ConstructionGallery (displays all 47 Constructions)
│   │   ├── CompositionGallery (displays all 38 Compositions)
│   │   ├── LayoutGallery (displays all 10 Layouts)
│   │   ├── SkinEditor (token editor + live preview)
│   │   └── SettingsPanel (3C Panel)
│   └── [bottom-bar] → mobile navigation
│
├── Token Binding System
│   ├── Token values (JSON or CSS Custom Properties)
│   └── Real-time cascade to all component previews
│
└── State Management
    ├── Current section (Primitives / Constructions / etc.)
    ├── Current filter/search
    ├── Current Skin selection (single or comparison)
    ├── Viewport breakpoint (mobile / tablet / desktop)
    └── Accessibility metadata display toggle
```

---

## Component Display Contract

Every component in every gallery follows a standardized card layout. This layout is itself built from Constructions.

### Primitive Card

```
╔═════════════════════════════════════╗
║ TextHeading                         ║  [component-name] — TextBody
║ L1 · Content Cluster              ║  [layer] · [cluster]
╠═════════════════════════════════════╣
║ ┌───────────────────────────────┐  ║
║ │ The quick brown fox           │  ║  [preview-region]
║ │ jumps over the lazy dog       │  ║  live rendered component instance
║ │                               │  ║
║ └───────────────────────────────┘  ║
╠═════════════════════════════════════╣
║ Content                             ║  [metadata-region]
║ Inert                               ║  axis labels + tags
║ Persistent                          ║
╠═════════════════════════════════════╣
║ Axiomatically indivisible. Defines  ║  [description-region]
║ section hierarchy via level prop.   ║  semantic definition
╠═════════════════════════════════════╣
║ <h1 class="text-heading">content</h1>║ [code-region]
║ <!-- Renders at: textHeading() -->  ║  code snippet
╚═════════════════════════════════════╝
```

**Regions in detail:**

**[component-name]** — TextBody Primitive
The name of the component in monospace. Clickable to open detail view.

**[layer] · [cluster]** — TextCaption Primitive
Example: "L1 · Content Cluster" or "L2A · Assembly" or "L3B · Flow"

**[preview-region]** — SurfaceCard Primitive
The live, functional instance of the component. For Primitives and Constructions, this is a single instance. For Compositions and Layouts, this may be multiple instances or a full section layout. Fully interactive — if it is a Button, you can click it. If it is a Form, you can type in it.

**[metadata-region]** — TagGroup Assembly
For Primitives: the three axis tags (e.g., "Content · Inert · Persistent").
For Constructions: the sub-type tag (e.g., "2A · Assembly") and applicable axes.
For Compositions: the sub-type tag (e.g., "3C · Panel") and universality score ("4/5 categories").
For Layouts: the category tags (e.g., "Application" / "Public" / "Specialized").

**[description-region]** — TextBody Primitive
The semantic definition or purpose statement. Taken directly from the specification document.

**[code-region]** — SurfaceCode Primitive
HTML or JSX snippet showing how to use the component. For simple Primitives, one line. For Compositions, the full slot structure with comments indicating which regions are filled.

### Construction Card (Example: FormField Assembly)

```
╔═════════════════════════════════════╗
║ FormField                           ║
║ L2A · Assembly                     ║
╠═════════════════════════════════════╣
║ ┌───────────────────────────────┐  ║
║ │ Email Address                 │  ║ label
║ │ ┌─────────────────────────────┤  ║
║ │ │ user@example.com            │  ║ input + helper
║ │ └─────────────────────────────┤  ║
║ │ Must include @ symbol         │  ║ error message
║ └───────────────────────────────┘  ║
╠═════════════════════════════════════╣
║ [TextLabel] + [InputText] +         ║ [slots-region]
║ [TextCaption?] + [FeedbackFieldError?] ║ named slot recipe
╠═════════════════════════════════════╣
║ Labeled, accessible form control.   ║
║ Slot contract defines label,        ║
║ control, helper, error regions.     ║
╠═════════════════════════════════════╣
║ <FormField label="Email"            ║
║   input={InputText}                 ║
║   helper="Include @ symbol"         ║
║   error={fieldError} />             ║
╚═════════════════════════════════════╝
```

**Additional region: [slots-region]**
For all non-Primitive components, a named slot visualization showing which Constructions/Primitives fill each slot. Format: `[SlotName] + [SlotName?] + [SlotName ×N]`

### Composition Card (Example: DataTable Panel)

```
╔═════════════════════════════════════╗
║ DataTable                           ║
║ L3C · Panel                        ║
║ 3/5 categories (SaaS, E-com, Dash) ║
╠═════════════════════════════════════╣
║ ┌───────────────────────────────┐  ║
║ │ Search  [Filter] [Export]     │  ║ toolbar region
║ ├───────────────────────────────┤  ║
║ │ Name      │ Status  │ Actions │  ║ table region
║ ├───────────────────────────────┤  ║
║ │ Project A │ Active  │ [⋯]     │  ║
║ │ Project B │ Paused  │ [⋯]     │  ║
║ ├───────────────────────────────┤  ║
║ │ ← 1 2 3 →                     │  ║ pagination
║ └───────────────────────────────┘  ║
╠═════════════════════════════════════╣
║ [toolbar] + [table] + [pagination]  ║
║ Persistent, data-bound surface      ║
╠═════════════════════════════════════╣
║ Use in: SaaS (admin panels),        ║
║ E-commerce (order mgmt),            ║
║ Dashboard (monitoring)              ║
╠═════════════════════════════════════╣
║ <DataTable                          ║
║   data={rows}                       ║
║   onSort={handler}                  ║
║   pagination={{page, pageSize}} /> ║
╚═════════════════════════════════════╝
```

**Universality score display**
Shows the 5 category dots with colors: SaaS · E-commerce · Editorial · Mobile · Dashboard. Filled dot = present in that category. Empty dot = not present. Cards with < 3 filled dots are flagged as "Domain Pack candidate."

### Layout Card (Example: AppShell)

```
╔═════════════════════════════════════╗
║ AppShell                            ║
║ L4 · Application Layout            ║
╠═════════════════════════════════════╣
║ DESKTOP (≥1280px)                   ║
║ ┌───────────────────────────────┐  ║
║ │ top-bar (NavigationBar)       │  ║
║ ├──────┬───────────────────────┤  ║
║ │ side │         main           │  ║
║ │ bar  │   [content regions]    │  ║
║ │(Nav) │                        │  ║
║ └──────┴───────────────────────┘  ║
║                                    ║
║ TABLET (≥768px)                    ║
║ ┌───────────────────────────────┐  ║
║ │ top-bar (condensed)           │  ║
║ ├───────────────────────────────┤  ║
║ │        main (sidebar hidden)   │  ║
║ └───────────────────────────────┘  ║
║                                    ║
║ MOBILE (<768px)                    ║
║ ┌───────────────────────────────┐  ║
║ │ top-bar (icon only)           │  ║
║ ├───────────────────────────────┤  ║
║ │        main (full width)       │  ║
║ ├───────────────────────────────┤  ║
║ │ bottom-bar (navigation)       │  ║
║ └───────────────────────────────┘  ║
╠═════════════════════════════════════╣
║ Named regions:                      ║
║ [top-bar] → NavigationBar (3A)     ║
║ [sidebar?] → SidebarNav (3C)       ║
║ [main] → any Section/Flow/Panel    ║
║ [bottom-bar?] → NavigationBar (3A) ║
╠═════════════════════════════════════╣
║ Responsive constraint: sidebar      ║
║ becomes drawer on mobile.           ║
║ top-bar + bottom-bar are mutually   ║
║ exclusive per viewport.             ║
╚═════════════════════════════════════╝
```

**Responsive preview**
Shows the Layout at three breakpoints side-by-side. The preview is interactive — resize the browser and see the Layout respond. This proves the responsive contract works.

---

## Token Binding System

Every visual attribute in every component preview is bound to a token variable. Token binding is the mechanism that makes Skins work.

### Token Variable Naming Convention

```
--color-{semantic}-{variant}
--font-family-{semantic}
--font-size-{scale}
--font-weight-{value}
--spacing-{scale}
--border-radius-{scale}
--elevation-{level}
--duration-{speed}
--easing-{name}
--icon-weight-{weight}
```

Examples:
- `--color-brand-primary` (primary brand color)
- `--color-text-primary` (foreground text)
- `--color-border-tertiary` (subtle borders)
- `--font-size-base` (16px typically)
- `--spacing-md` (24px typically)
- `--border-radius-lg` (12px typically)
- `--elevation-2` (subtle shadow)
- `--duration-normal` (200ms)
- `--icon-weight-regular` (Phosphor Regular weight)

### Implementation

**Option A — CSS Custom Properties (recommended for live token binding):**

```css
:root {
  --color-brand-primary: #6366F1;
  --color-text-primary: #1F2937;
  --font-family-sans: 'Inter', sans-serif;
  --font-size-base: 16px;
  --spacing-md: 24px;
  --border-radius-lg: 12px;
  /* ... all tokens ... */
}

/* Primitives use tokens */
.text-heading {
  font-family: var(--font-family-sans);
  color: var(--color-text-primary);
}

.action-button {
  background: var(--color-brand-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
}
```

**Option B — JavaScript token object (for dynamic theme switching):**

```javascript
const tokens = {
  colors: {
    brandPrimary: '#6366F1',
    textPrimary: '#1F2937',
    // ...
  },
  typography: {
    fontSans: 'Inter, sans-serif',
    sizeBase: '16px',
    // ...
  },
  spacing: {
    md: '24px',
    // ...
  },
  // ...
};
```

### Live Token Updates

The Showroom supports real-time token updates. When a user changes a token value in the SkinEditor (e.g., changes primary color from blue to indigo), all 175+ component previews update immediately without page reload.

Implementation:
```javascript
// When a token changes
updateToken('--color-brand-primary', newValue);

// All component previews re-render
// Because they read tokens via CSS variables or the token object
// No component code changes required
```

---

## Gallery Views

The Showroom has five main gallery views, each displaying a subset of the inventory.

### Gallery 1 — Primitives

**Layout:** L4 GridPage
**Content:** 80 Primitive cards organized into 8 clusters

```
Navigation:
├── Content (10 primitives)
├── Media (10 primitives)
├── Structure (10 primitives)
├── Surface (10 primitives)
├── Input (10 primitives)
├── Action (10 primitives)
├── Feedback (10 primitives)
└── Ephemeral (10 primitives)

For each cluster:
├── Cluster header (TextHeading + description)
└── Grid of 10 PrimitiveCard components
```

Each PrimitiveCard shows:
- Live preview of the Primitive
- Name, layer, cluster
- Axis tags (Content/Structure, Inert/Responsive/Transactional, Persistent/Ephemeral)
- Definition from spec
- HTML/JSX usage
- Token dependencies (what tokens does this use?)

### Gallery 2 — Constructions

**Layout:** L4 GridPage
**Content:** 47 Construction cards organized into 3 sub-types

```
Navigation:
├── 2A Assemblies (22 constructions)
├── 2B Controllers (14 constructions)
└── 2C Bridges (11 constructions)

For each sub-type:
├── Sub-type header + engineering pattern explanation
└── Grid of ConstructionCards
```

Each ConstructionCard shows:
- Live interactive preview
- Name, sub-type, slot recipe visualization
- Definition and purpose
- Which Primitives fill each slot
- Component dependencies
- JSX component API

### Gallery 3 — Compositions

**Layout:** L4 GridPage
**Content:** 38 Composition cards + 12 Domain Pack candidates

```
Navigation:
├── 3A Sections (16 compositions)
├── 3B Flows (10 compositions)
├── 3C Panels (12 compositions)
└── Domain Packs (12 candidates, expandable by pack)
   ├── E-Commerce Pack
   ├── Editorial Pack
   ├── SaaS Pack
   └── Dashboard Pack

For each sub-type/pack:
├── Header + description
└── Grid of CompositionCards
```

Each CompositionCard shows:
- Live preview (or interactive walkthrough for Flows)
- Name, sub-type, universality score (3/5 categories with colored dots)
- Named region visualization with slot types
- Detailed description
- Common use cases
- Accessibility contract summary
- Related Domain Packs (if applicable)

### Gallery 4 — Layouts

**Layout:** Custom (a Composition built specifically for showing Layouts, since Layouts are spatial not content-based)
**Content:** 10 Layout cards with responsive previews

```
Navigation:
├── Application (AppShell)
├── Public (MarketingPage)
├── Long-form (DocumentPage)
├── Data (DashboardPage)
├── Forms (FormPage)
├── Dual-panel (SplitPage)
├── Collections (GridPage)
├── Details (DetailPage)
├── Overlays (OverlayLayout)
└── Errors (ErrorPage)

For each Layout:
├── Interactive responsive preview (three breakpoints side-by-side)
├── Region diagram with type rules
├── Responsive behavior specification
└── Example Instance (a real page using this Layout)
```

Each LayoutCard shows:
- Three-column responsive preview (desktop / tablet / mobile)
- Named regions with visual annotation
- Type rules per region (what can go here?)
- Constraints and composition rules
- Token dependencies (spacing breakpoints, gutter sizes)
- Example real pages using this Layout

### Gallery 5 — Skins (Optional Comparison View)

**Layout:** Split-column comparison or tabbed switcher
**Content:** Two or more Skins rendered side-by-side

Shows the same Showroom component grid rendered with different token sets. User can:
- Compare visual differences between Skins
- See that structure is identical, only tokens differ
- Preview what their project looks like with each Skin

```
[Skin A: Dark SaaS]        [Skin B: Warm Editorial]
┌──────────────────┐      ┌──────────────────┐
│ TextHeading      │      │ TextHeading      │
│ in indigo        │      │ in amber         │
│                  │      │                  │
│ ActionButton     │      │ ActionButton     │
│ with dark bg     │      │ with warm bg     │
└──────────────────┘      └──────────────────┘
```

---

## Navigation And Organization

The Showroom has a persistent sidebar navigation (SidebarNav 3C Panel) that allows jumping between galleries and filtering within galleries.

### Primary Navigation
```
└── Primitives
    ├── Content (10)
    ├── Media (10)
    ├── Structure (10)
    ├── Surface (10)
    ├── Input (10)
    ├── Action (10)
    ├── Feedback (10)
    └── Ephemeral (10)

└── Constructions
    ├── 2A Assemblies (22)
    ├── 2B Controllers (14)
    └── 2C Bridges (11)

└── Compositions
    ├── 3A Sections (16)
    ├── 3B Flows (10)
    ├── 3C Panels (12)
    └── Domain Packs
        ├── E-Commerce (12 candidates)
        ├── Editorial (8 candidates)
        ├── SaaS (10 candidates)
        └── Dashboard (10 candidates)

└── Layouts (10)

└── Skins
    ├── Current Skin: [dropdown]
    ├── Comparison Mode: [toggle]
    └── Skin Library (future)

└── Settings
    ├── Accessibility: [toggle WCAG info]
    ├── Code Format: [HTML | JSX | Vue]
    ├── Viewport: [Mobile | Tablet | Desktop]
    └── Dark Mode: [toggle]
```

### Search And Filter

Global search across all 175+ components. Search by:
- Component name
- Layer (L1, L2A, L2B, L2C, L3A, L3B, L3C, L4)
- Category/cluster
- Purpose/keyword
- Universality score

Example searches:
- "form" → all form-related components (FormField, MultiStepForm, InputText, etc.)
- "L3C" → all Panels
- "3/5" → all components appearing in 3 categories
- "navigation" → NavigationBar, NavItem, SidebarNav, BreadcrumbTrail, etc.

---

## Code Display

Every component card can display implementation code in multiple formats.

### Code Snippet Variants

**For Primitives:**
```html
<!-- Simple HTML -->
<h1 class="text-heading">Section Title</h1>
```

```jsx
// React
<TextHeading level={1}>Section Title</TextHeading>
```

**For Constructions:**
```html
<!-- Named slots pattern -->
<FormField
  label="Email"
  input={<InputText type="email" />}
  helper="We'll never share your email"
  error={null}
/>
```

```jsx
// React with hooks
<FormField
  label="Email"
  input={<InputText type="email" {...field} />}
  helper="We'll never share your email"
  error={errors.email}
/>
```

**For Compositions:**
```jsx
// DataTable example
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status' }
  ]}
  data={rows}
  onSort={handleSort}
/>
```

**For Layouts:**
```jsx
// AppShell layout wrapper
<AppShell
  nav={<NavigationBar />}
  sidebar={<SidebarNav />}
  main={<ContentPage />}
/>
```

### Code Copy And Integration

User can:
- Copy code snippet to clipboard
- Download component file (with all dependencies)
- See dependency tree ("This component depends on: TextLabel, InputText, FeedbackFieldError")

---

## Accessibility Information Display

When "Show Accessibility Info" is toggled on, every component card displays:

**For each component:**
- WCAG compliance level achieved (AA / AAA / not yet tested)
- Required ARIA attributes (role, aria-label, aria-describedby, etc.)
- Keyboard interaction contract (which keys do what?)
- Screen reader announcements (what does it say when focused?)
- Color contrast ratios (for components with background colors)

Example for FormField:
```
Accessibility Requirements
─────────────────────────
WCAG Level: AA
ARIA Contract:
  - Label: use <label for="input-id"> or aria-labelledby
  - Input: must have accessible name
  - Helper: aria-describedby linking to helper text
  - Error: aria-describedby linking to error message
Keyboard:
  - Tab: focus input
  - Escape: (if applicable, close related overlay)
Screen Reader:
  "Email Address, edit text, invalid entry, must include @ symbol"
Color Contrast:
  - Text / background: 4.5:1 (AA compliant)
  - Label / background: 4.5:1 (AA compliant)
```

---

## Responsive Behavior Validation

The Showroom proves that responsive design works correctly by rendering every Layout at three breakpoints and allowing user resizing.

**Three standard breakpoints:**
- Mobile: 375px (iPhone SE size)
- Tablet: 768px
- Desktop: 1280px

**User can:**
- View side-by-side comparisons of each breakpoint
- Manually drag a resize handle to see how components respond between breakpoints
- Verify that nothing breaks or overflows at any size

---

## Token Editor / Skin Creator (Optional Feature)

An advanced section where users can edit token values and see live previews.

```
Token Editor Interface
─────────────────────
[Skin Name Input]

Colors Section
  --color-brand-primary    [color picker]  #6366F1
  --color-brand-secondary  [color picker]  #8B5CF6
  --color-text-primary     [color picker]  #1F2937
  [... all color tokens ...]

Typography Section
  --font-family-sans       [font selector] Inter
  --font-size-base         [number input]  16 px
  [... all typography tokens ...]

Spacing Section
  --spacing-xs             [number input]  4 px
  --spacing-sm             [number input]  8 px
  [... all spacing tokens ...]

[SAVE SKIN]  [EXPORT JSON]  [SHARE LINK]

Live Preview
[Shows current state of entire Showroom with these tokens applied]
```

---

## Hive OS Integration

The Showroom runs as a dedicated app inside Hive OS.

**App manifest:**
```json
{
  "name": "UDS Showroom",
  "id": "uds-showroom",
  "version": "1.0.0",
  "icon": "palette",
  "author": "Hive Systems",
  "description": "Universal Design System component library and documentation",
  "permissions": [
    "read:design-system-spec",
    "write:skins",
    "read:installed-apps"
  ],
  "routes": {
    "/primitives": "PrimitiveGallery",
    "/constructions": "ConstructionGallery",
    "/compositions": "CompositionGallery",
    "/layouts": "LayoutGallery",
    "/skins": "SkinEditor",
    "/settings": "Settings"
  }
}
```

**Integration points:**
- Other apps can link directly to specific component cards in the Showroom
- The Showroom reads the Hive platform's current Skin and displays it live
- New apps installed on Hive OS can be configured to use a specific Domain Pack

---

## Performance Considerations

The Showroom displays 175+ interactive component previews. Performance is critical.

**Optimization strategies:**

1. **Lazy loading** — only render cards visible in viewport
2. **Component memoization** — Primitive previews don't re-render unless their props change
3. **Token caching** — token values computed once and cached, not recomputed per render
4. **Virtual scrolling** — for galleries with 50+ cards
5. **Code splitting** — load gallery views on-demand, not all at once

**Target metrics:**
- Initial page load: < 2 seconds
- Token update cascade: < 200ms (all previews update)
- Component card render: < 100ms per card
- Search results: instant (< 50ms)

---

## Future Extensibility

**Planned features (not in v1.0):**

1. **Dark / Light mode toggle** — entire Showroom respects system preference
2. **Skin marketplace** — browse and purchase pre-built Skins from within the Showroom
3. **Interactive Figma export** — generate Figma components from Showroom definitions
4. **Usage analytics** — track which components are most viewed / used
5. **Feedback system** — users can report issues or request new components
6. **Version history** — compare UDS v1.0 to v2.0, see what changed
7. **Custom Domain Packs** — users can create and share their own domain-specific Compositions
8. **Real codebase integration** — show which components are used in the Hive platform itself

---

## Showroom Implementation Checklist

An agent or developer implementing the Showroom Template should verify:

- [ ] All 80 Primitives render with live previews
- [ ] All 47 Constructions render with interactive demonstrations
- [ ] All 38 core Compositions render with navigation between Flow steps
- [ ] All 10 Layouts render at three breakpoints (375px, 768px, 1280px)
- [ ] Token binding system works (changing a token updates all previews)
- [ ] Search and filter functionality works across all 175+ components
- [ ] Code snippets are accurate and copyable
- [ ] Accessibility information displays correctly
- [ ] Responsive previews are interactive (user can resize)
- [ ] Navigation between galleries works smoothly
- [ ] Skin comparison mode (if implemented) displays correctly
- [ ] Performance metrics meet targets (< 2s initial load, < 200ms token updates)
- [ ] Hive OS integration works (app installs, reads platform Skin, etc.)
- [ ] Mobile experience is functional and usable at 375px
- [ ] All links to specification documents resolve
- [ ] Error states handled gracefully (missing tokens, broken previews, etc.)

---

## Prompt For Agent Implementation

When asking an agent to implement the Showroom Template, use this prompt:

```
You are building the UDS Showroom for the Hive platform.

The Showroom is a web application that displays all 175+ components 
from the Universal Design System, with live token binding.

Here is the full specification:
- UDS specification documents (all 5 files)
- Showroom Template Contract (this document)
- List of 80 Primitives with definitions
- List of 47 Constructions with slot recipes
- List of 38 Compositions with region maps
- List of 10 Layouts with responsive specs
- Token naming convention and sample values

Your task is to implement:

1. The Application Shell (L4 AppShell layout + NavigationBar 3A)
2. Five gallery views (Primitives, Constructions, Compositions, Layouts, optional Skins)
3. Component card components (PrimitiveCard, ConstructionCard, CompositionCard, LayoutCard)
4. Token binding system (CSS Custom Properties or JS token object)
5. Live preview rendering for each component type
6. Search and filter system
7. Code snippet display with copy functionality
8. Accessibility metadata display toggle
9. Responsive preview for Layouts
10. Mobile responsiveness (works at 375px viewport)

Framework: [React | Vue | Svelte]
Token format: [CSS Custom Properties | JSON]
Target breakpoints: 375px, 768px, 1280px

You should NOT:
- Hardcode any visual values (use tokens)
- Create custom component implementations (use the UDS definitions)
- Make architectural decisions (the Showroom Template specifies them)
- Add features not in the Template Contract

Output: A functional web application that passes all checklist items.
```

---

*Universal Design System — Showroom Template Contract · Version 1.0 · 2026*
*Implementation-ready specification*