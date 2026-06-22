# Universal Design System — Layer 4: Layouts
### Specification Document
**Version 1.0 · 2026 · Companion to `universal_design_system_v1.md` and `universal_design_system_layer3.md`**

> This document specifies Layer 4 of the Universal Design System. It assumes familiarity with L1–L3. Read those first.

---

## What Layer 4 Is

Layer 4 is the spatial contract layer.

A Layout does not contain content. It does not contain Compositions. It defines **named regions** and the **rules governing what can occupy them**. It is the floor plan — not the furniture, not the rooms' decoration, just the walls, the doors, and the labels on each space.

This is the critical distinction from everything below it:

- A **Primitive** is an indivisible element
- A **Construction** is a slot-grammar pattern
- A **Composition** fills a region with domain-aware content
- A **Layout** defines which regions exist and what Compositions are allowed in each

A Layout contains zero authored content. Zero data. Zero Compositions. When you look at a Layout in isolation, you see labeled empty regions and nothing else. The moment you drop a Composition into a region, you have begun creating an **Instance** (Layer 5).

---

## Why Layout Is Its Own Layer

A reasonable question: why isn't Layout just a very large Composition?

Because Layouts and Compositions have opposite relationships to content.

A Composition **is** content — it has a thematic purpose, it communicates something, it serves a user intent. A `HeroSection` means something. A `DataTable` means something.

A Layout **constrains** content — it has no thematic purpose of its own. A two-column layout with a sidebar doesn't mean anything about what will be in the sidebar or the main area. It only says: there is a sidebar region and a main region, and here are the rules for each.

This means:
- The same Layout can serve radically different product types and purposes
- The same Composition can appear in multiple different Layouts
- Swapping a Layout changes the spatial experience without touching any content
- Swapping a Composition changes the content without touching the spatial structure

That independence is load-bearing. It is what allows the system to be generative rather than additive.

---

## The Anatomy of a Layout

Every Layout specification contains exactly four things:

**1. Named regions**
The spatial slots. Each has a name, a position, and dimensional constraints.

**2. Region rules**
What type of Composition (or Construction, or Primitive) is permitted in each region. Some regions are typed strictly ("accepts exactly one NavigationBar"), others are open ("accepts any Section").

**3. Responsive behavior**
How the regions transform at different viewport widths. This is not optional — a Layout without responsive rules is incomplete.

**4. Constraints**
Minimum and maximum content in each region. Which regions are required vs. optional. Which regions can repeat.

---

## Layout Notation

```
LAYOUT: LayoutName
├── [region-name]          required region
├── [region-name?]         optional region
├── [region-name ×N]       repeating region
└── [region-name | none]   region that may be empty

RULES:
  [region-name] accepts: CompositionType | ConstructionType
  [region-name] constraints: one only | max N | any number

RESPONSIVE:
  ≥1280px (desktop):   [layout description]
  ≥768px  (tablet):    [layout description]
  <768px  (mobile):    [layout description]
```

---

## The Layout Inventory

Layouts emerge from the spatial patterns that recur across product types. Applying the same universality discipline as L3: a Layout earns its place in the core if it represents a spatial pattern that appears across multiple product categories.

The honest count of genuinely universal Layout patterns is small. **Ten layouts** cover the vast majority of real-world pages across all product types. This is by design — Layouts should be few and reusable, not many and specific.

---

### Layout 01 — AppShell

**The fundamental application layout. The skeleton beneath every persistent application.**

```
LAYOUT: AppShell
├── [top-bar]              primary navigation surface
├── [sidebar?]             secondary navigation or context panel
├── [main]                 primary content area
└── [bottom-bar?]          mobile-first bottom navigation
```

**Region rules:**
- `[top-bar]` accepts: `NavigationBar` (3A). One only. Always present on desktop. May transform to `[bottom-bar]` on mobile.
- `[sidebar]` accepts: `SidebarNav` (3C), `DetailPanel` (3C), `FilterFlow` (3B) in panel mode, `SettingsPanel` (3C). One only. Optional.
- `[main]` accepts: any Section, Flow, or Panel Composition. Any number stacked vertically.
- `[bottom-bar]` accepts: `NavigationBar` in mobile bottom variant. Mobile only. Optional on desktop.

**Responsive behavior:**
```
≥1280px: top-bar (full width) + sidebar (fixed, 240–280px) + main (remaining width)
≥768px:  top-bar (full width) + sidebar (collapsible, icon-only or hidden) + main (full width)
<768px:  top-bar (condensed) OR bottom-bar + main (full width, no sidebar)
```

**Constraints:**
- `[top-bar]` and `[bottom-bar]` are mutually exclusive per viewport — never both visible simultaneously
- `[sidebar]` must not obscure `[main]` on mobile — it overlays as a Drawer Bridge (L2C) or collapses entirely
- `[main]` scroll is independent of `[top-bar]` and `[sidebar]` — those surfaces are sticky

**Used by:** SaaS applications, dashboards, admin panels, mobile apps. The most common application-context Layout in existence.

---

### Layout 02 — MarketingPage

**The public-facing page layout. Used for landing pages, homepages, and marketing surfaces.**

```
LAYOUT: MarketingPage
├── [nav]                  site navigation
├── [sections ×N]          page content sections, stacked
└── [footer]               page footer
```

**Region rules:**
- `[nav]` accepts: `NavigationBar` (3A). One only.
- `[sections]` accepts: any Section Composition (3A). Any number. Ordered by narrative flow.
- `[footer]` accepts: `FooterSection` (3A). One only.

**Responsive behavior:**
```
≥1280px: nav full-width + sections full-width (max-width: 1280px centered) + footer full-width
≥768px:  same structure, sections may reflow internally (e.g. ContentWithMedia stacks)
<768px:  nav collapses to hamburger + sections full-width + footer stacks to single column
```

**Constraints:**
- `[sections]` first item is almost always `HeroSection` — not enforced, but the canonical pattern
- `[sections]` order is meaningful — narrative flow from awareness to conversion
- No `[sidebar]` — marketing pages are full-width by convention

**Used by:** Every public-facing website. The single most universal Layout.

---

### Layout 03 — DocumentPage

**Long-form content with navigational wayfinding. Docs, articles, wikis, changelogs.**

```
LAYOUT: DocumentPage
├── [nav]                  site navigation
├── [doc-nav?]             document-level navigation (table of contents)
├── [main]                 the document content
├── [aside?]               contextual sidebar (related, metadata, ads)
└── [footer?]              page footer
```

**Region rules:**
- `[nav]` accepts: `NavigationBar` (3A).
- `[doc-nav]` accepts: `SidebarNav` (3C) in document mode, or a `TableOfContents` Construction. Left side on desktop.
- `[main]` accepts: `BreadcrumbHeader` (3A) + document content Compositions. Scrolls independently.
- `[aside]` accepts: any Section Composition. Right side on desktop. Optional.
- `[footer]` accepts: `FooterSection` (3A). Optional.

**Responsive behavior:**
```
≥1280px: [doc-nav 240px] + [main flex-1, max-width: 720px] + [aside 240px]
≥768px:  [doc-nav hidden or collapsed] + [main full-width] + [aside hidden]
<768px:  [main full-width] + [doc-nav as sticky bottom drawer or top dropdown]
```

**Constraints:**
- `[main]` max-width should be constrained for readability — 65–75 characters per line is the typographic optimum. 720px at 16px base font achieves approximately this.
- `[doc-nav]` is sticky within the page scroll — it tracks the user's position in the document

**Used by:** Documentation sites, editorial platforms, wikis, blogs, changelogs.

---

### Layout 04 — DashboardPage

**Data-primary layout. Metrics, tables, charts, activity — the workspace for monitoring and analysis.**

```
LAYOUT: DashboardPage
├── [nav]                  application navigation
├── [page-header]          page title, date range, actions
├── [summary-row?]         top-level metrics
├── [main-grid]            primary dashboard content
└── [detail?]              contextual detail panel
```

**Region rules:**
- `[nav]` accepts: `AppShell` Layout's `[top-bar]` or `[sidebar]` — DashboardPage typically nests inside AppShell
- `[page-header]` accepts: `PageHeader` (3A). One only.
- `[summary-row]` accepts: `StatsSection` (3A). One only. Optional.
- `[main-grid]` accepts: `DashboardGrid` (Domain Pack), `DataTable` (3C), `ActivityFeed` (3C), `ChartPanel` (Dashboard Domain Pack). Any combination.
- `[detail]` accepts: `DetailPanel` (3C). Optional. Appears on item selection.

**Responsive behavior:**
```
≥1280px: [summary-row full-width] + [main-grid: multi-column] + [detail: right side panel]
≥768px:  [summary-row: 2-col] + [main-grid: reduced columns] + [detail: overlay drawer]
<768px:  [summary-row: single col] + [main-grid: single col] + [detail: full screen]
```

**Used by:** Analytics dashboards, admin panels, monitoring tools, business intelligence surfaces.

---

### Layout 05 — FormPage

**Dedicated form layout. Focused, minimal, distraction-free input experience.**

```
LAYOUT: FormPage
├── [nav?]                 minimal navigation or logo only
├── [form-container]       the form, centered and constrained
└── [footer?]              minimal footer with legal links
```

**Region rules:**
- `[nav]` accepts: `NavigationBar` (3A) in minimal/logo-only mode. Optional — many form pages are fully chrome-free.
- `[form-container]` accepts: any Flow Composition (3B) — `AuthFlow`, `MultiStepForm`, `CheckoutFlow`, `OnboardingWizard`. One only. Centered horizontally. Max-width constrained (480–640px).
- `[footer]` accepts: `FooterSection` (3A) in minimal mode. Optional.

**Responsive behavior:**
```
≥768px:  [form-container centered, max-width: 560px, padding: vertical centering]
<768px:  [form-container full-width, padding: 24px, no vertical centering]
```

**Constraints:**
- `[form-container]` is the only primary content area — no competing content
- This Layout exists specifically to maximize form completion rate by removing distraction
- Background is intentionally plain — no hero images, no feature lists

**Used by:** Login/signup pages, checkout flows, onboarding wizards, standalone survey pages.

---

### Layout 06 — SplitPage

**Two equal or weighted columns. One side fixed/contextual, one side primary.**

```
LAYOUT: SplitPage
├── [panel-a]              left or fixed panel
└── [panel-b]              right or primary panel
```

**Region rules:**
- `[panel-a]` accepts: any Composition. Typically contextual: branding, product preview, testimonials, media.
- `[panel-b]` accepts: any Composition. Typically transactional: `AuthFlow`, `MultiStepForm`, `FormPage` content.
- Split ratio: 50/50, 40/60, or 35/65 depending on content weight.

**Responsive behavior:**
```
≥768px:  [panel-a] + [panel-b] side by side, configurable ratio
<768px:  [panel-a] collapses entirely OR moves above [panel-b] as a compact banner
```

**Constraints:**
- `[panel-a]` is typically decorative or supporting — on mobile it is expendable
- Both panels scroll independently on desktop

**Used by:** Login pages with brand imagery, onboarding with product preview, feature announcement with waitlist form.

---

### Layout 07 — GridPage

**Primary collection layout. Items in a responsive grid — the browsing and discovery layout.**

```
LAYOUT: GridPage
├── [nav]                  navigation
├── [page-header]          page title and actions
├── [filters?]             filter and sort controls
├── [grid]                 the item collection
└── [pagination?]          navigation between pages of results
```

**Region rules:**
- `[page-header]` accepts: `PageHeader` (3A). One only.
- `[filters]` accepts: `FilterFlow` (3B). Optional.
- `[grid]` accepts: repeated card-type Compositions — `MediaGallery` (3C), or a grid of `SurfaceCard` Surfaces containing any Composition. The grid itself is a `LayoutGrid` Structure Primitive.
- `[pagination]` accepts: `PaginationBar` Assembly (L2A). One only. Optional — infinite scroll is an alternative.

**Responsive behavior:**
```
≥1280px: grid columns: 3–4
≥768px:  grid columns: 2–3
<768px:  grid columns: 1–2
```

**Constraints:**
- `[filters]` may be inline above the grid, or in a collapsible drawer on mobile
- Grid items must be uniform in their base footprint — mixed sizes are a Masonry variant, not this Layout

**Used by:** Product catalogues, media galleries, team pages, blog post archives, search results.

---

### Layout 08 — DetailPage

**Single-item deep-dive layout. The full record or content view after selecting from a Grid or List.**

```
LAYOUT: DetailPage
├── [nav]                  navigation
├── [breadcrumb-header]    wayfinding back to collection
├── [primary]              the main content or record
├── [secondary?]           related content, metadata, or actions
└── [footer?]              footer
```

**Region rules:**
- `[breadcrumb-header]` accepts: `BreadcrumbHeader` (3A). One only.
- `[primary]` accepts: any Panel or Section Composition appropriate to the content type. One main content region.
- `[secondary]` accepts: `DetailPanel` (3C), `CommentThread` (3C), `ActivityFeed` (3C), related content Sections. Optional.

**Responsive behavior:**
```
≥1280px: [primary: ~65% width] + [secondary: ~35% width, sticky]
≥768px:  [primary: full width] + [secondary: below primary, full width]
<768px:  [primary: full width] + [secondary: below primary, full width]
```

**Used by:** Product detail pages, blog post pages, user profiles, document views, record detail screens.

---

### Layout 09 — OverlayLayout

**The modal and drawer layout. Not a page — a spatial layer above an existing page.**

```
LAYOUT: OverlayLayout
├── [trigger-context]      the page behind (any other Layout)
├── [scrim?]               OverlayScrim Primitive
└── [overlay-region]       the modal, drawer, or sheet content
```

**Region rules:**
- `[trigger-context]` is the existing page — OverlayLayout layers above it, not replacing it
- `[scrim]` accepts: `OverlayScrim` Primitive (L1). Optional — not all overlays use a scrim.
- `[overlay-region]` accepts: any Flow Composition (3B), `DetailPanel` (3C), or any Construction. Delivered via `Modal`, `Drawer`, or `CommandPalette` Bridge (L2C).

**Responsive behavior:**
```
≥768px:  [overlay-region: centered dialog or side drawer]
<768px:  [overlay-region: full-screen or bottom sheet]
```

**Constraints:**
- OverlayLayout does not replace the page Layout — it layers above it
- Focus is trapped within `[overlay-region]` while open — page behind is inert
- Scroll is locked on `[trigger-context]` while overlay is open

**Used by:** Every product type. OverlayLayout is universal because modals, drawers, and sheets exist everywhere.

---

### Layout 10 — ErrorPage

**The fallback layout. 404, 500, maintenance, empty state at page level.**

```
LAYOUT: ErrorPage
├── [nav?]                 minimal navigation
├── [error-content]        the error or empty state
└── [footer?]              minimal footer
```

**Region rules:**
- `[nav]` accepts: `NavigationBar` (3A) in minimal mode. Optional.
- `[error-content]` accepts: `EmptyState` Assembly (L2A). One only. Centered on page.
- `[footer]` accepts: `FooterSection` (3A) minimal. Optional.

**Responsive behavior:**
```
All viewports: [error-content] centered vertically and horizontally in remaining viewport height
```

**Used by:** Every product type. 404, 500, maintenance mode, empty search results at page level.

---

## Layout Composition Rules

These rules govern how Layouts combine and nest. They are not suggestions — they are the formal rules of the system.

**Rule 1 — Layouts do not nest (with one exception)**

A Layout defines the top-level spatial structure of a page. You do not put a Layout inside a Layout. The one exception is OverlayLayout, which explicitly layers above another Layout — but this is layering, not nesting.

Nesting Layouts creates spatial ambiguity and breaks the responsive contract. If you feel the need to nest Layouts, what you actually need is a Composition with its own internal layout structure (which uses Layout Primitives — LayoutBox, LayoutStack, LayoutGrid — not a named Layout).

**Rule 2 — AppShell is the container for application Layouts**

DashboardPage and other application-context Layouts typically nest their content inside AppShell's `[main]` region. The NavigationBar and SidebarNav live in AppShell. The page-specific content lives in the Layout. This two-level structure is the correct pattern for application products.

```
AppShell
├── [top-bar] → NavigationBar
├── [sidebar] → SidebarNav
└── [main] → DashboardPage | GridPage | DetailPage | FormPage
```

**Rule 3 — One NavigationBar per page**

A page has exactly one primary navigation surface. Multiple NavigationBars at the same level are an antipattern — they split the user's spatial model of the application.

**Rule 4 — Regions are typed, not free-form**

Every region in a Layout specifies what it accepts. You cannot put a Panel Composition in a region typed for a Section. This constraint is what gives the system its generative power — the rules create the combinatorics, not infinite freedom.

**Rule 5 — Responsive behavior is part of the Layout contract**

A Layout without responsive rules is incomplete. Responsive behavior belongs in the Layout specification, not in each individual Composition. Compositions should be responsive in their internal layout, but the spatial relationship between regions is the Layout's responsibility.

---

## The Token Layer and Layouts

Layouts are the primary consumer of **spacing tokens** and **breakpoint tokens** from the L0 Asset Layer. Every Layout's responsive behavior is expressed in terms of these tokens, not hardcoded pixel values.

The minimum token set required for Layouts:

```
Breakpoints
  --breakpoint-sm:   480px
  --breakpoint-md:   768px
  --breakpoint-lg:   1024px
  --breakpoint-xl:   1280px

Layout spacing
  --layout-gutter:        24px (space between regions)
  --layout-padding-x:     24px (outer horizontal padding)
  --layout-padding-x-sm:  16px (mobile)

Region constraints
  --sidebar-width:         256px
  --detail-panel-width:    360px
  --content-max-width:     720px  (readable text)
  --page-max-width:        1280px (full page)
  --form-max-width:        560px  (focused forms)
```

These tokens are set once in the Asset Layer (L0) and inherited by all Layouts. Changing a single token updates the spatial contract across every Layout that uses it.

---

## What Layer 4 Is Not

To be explicit about scope:

**Layouts are not themes.** Visual identity (color, typography, border radii) lives in L0 tokens, not in Layouts.

**Layouts are not page templates.** A template (in the colloquial design sense) is a Layout populated with placeholder Compositions. That is an Instance (L5) with placeholder content — not a Layout.

**Layouts are not responsive frameworks.** CSS Grid and Flexbox are the implementation tools. The Layout is the specification of what regions exist and how they relate. The implementation is a separate concern.

**Layouts do not own scroll behavior.** Which regions scroll, and how, is specified per Layout in its responsive rules — but the scrolling mechanism itself is a browser and CSS concern, not a Layout concern.

---

## Layer 4 Summary

| Layout | Primary Use | Universality |
|---|---|---|
| `AppShell` | Application wrapper | SaaS · Mobile · Dashboard |
| `MarketingPage` | Public landing pages | All categories |
| `DocumentPage` | Long-form content | Editorial · SaaS · Dashboard |
| `DashboardPage` | Data and monitoring | SaaS · Dashboard |
| `FormPage` | Focused input flows | All categories |
| `SplitPage` | Auth / dual-panel | SaaS · E-commerce · Editorial |
| `GridPage` | Collection browsing | All categories |
| `DetailPage` | Single-item view | All categories |
| `OverlayLayout` | Modal / drawer layer | All categories |
| `ErrorPage` | Fallback states | All categories |
| **Total** | **10 Layouts** | |

### Cumulative system inventory

| Layer | Count | What it is |
|---|---|---|
| L0 Asset Layer | — | Tokens, Phosphor Icons, typography |
| L1 Primitives | 80 | Terminal symbols. Indivisible, typed, universal. |
| L2A Assemblies | 22 | Slot composition. No shared state. |
| L2B Controllers | 14 | Shared state machine. Context + Reducer. |
| L2C Bridges | 11 | Anchor/portal. floating-ui + Portal. |
| L3A Sections | 16 | Self-contained page regions. |
| L3B Flows | 10 | Multi-step sequences. |
| L3C Panels | 12 | Persistent data-bound surfaces. |
| L4 Layouts | 10 | Spatial constraint systems. Zero content. |
| **Total (L0–L4)** | **175** | |

---

*Universal Design System · Layer 4 Specification · Version 1.0 · 2026*
*Companion to `universal_design_system_v1.md` and `universal_design_system_layer3.md`*
*Layer 5 (Instances) specified separately*