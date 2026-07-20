# Universal Design System — Layer 3: Compositions
### Specification Document
**Version 1.0 · 2026 · Companion to `universal_design_system_v1.md`**

> This document specifies Layer 3 of the Universal Design System. It assumes familiarity with L1 (Primitives) and L2 (Constructions) as defined in the core spec. Read those first.

---

## What Layer 3 Is

Layer 3 is the first layer where **domain context enters the system**.

Layers 1 and 2 are domain-agnostic. A `FormField` doesn't know if it lives on a checkout page or a settings panel. A `Modal` doesn't know if it's confirming a purchase or deleting a file. That universality is what makes them valuable.

Layer 3 Compositions are domain-aware. They know something about the world they live in — what kind of content they contain, what user intent they serve, what product context makes them meaningful. But they are still **universal** — meaning they appear across multiple product categories, not just one.

---

## The Universality Test

A Composition earns a place in the universal core if it appears in **3 or more** of these 5 product categories:

| Category | Examples |
|---|---|
| SaaS application | Admin panels, productivity tools, B2B software |
| E-commerce | Stores, marketplaces, product catalogues |
| Editorial / blog | Content sites, news, documentation |
| Mobile app | Native or web-native mobile experiences |
| Dashboard / tooling | Analytics, monitoring, internal tools |

If a Composition appears in fewer than 3 categories, it belongs in a **Domain Pack** — a purchasable extension layer, not the universal core. This is not a failure. It is the system being honest about its scope.

---

## The Four Laws — Adapted for Compositions

| Law | Statement |
|---|---|
| **Named region necessity** | Every named region in the Composition is load-bearing. Remove one and the Composition breaks or collapses to a Construction. |
| **Non-reducibility** | The Composition's meaning cannot be produced by a single Construction. It orchestrates multiple Constructions into something new. |
| **Universal reuse** | Passes the 3/5 category test above. |
| **Semantic singularity** | Serves one thematic purpose. A Composition that serves two purposes is two Compositions — that is a Layout. |

---

## Named Regions

Every Composition declares named internal regions. These are its formal slot contract — the interface that agents, developers, and designers work against.

**Notation used in this document:**

```
[region-name]       — required region
[region-name?]      — optional region
[item ×N]           — repeating region (N instances)
[TypeA | TypeB]     — region accepts either type
```

Named regions specify:
- What the region is called
- Whether it is required or optional
- What Construction or Primitive type fills it
- Any constraints (minimum/maximum instances, ordering rules)

---

## Three Sub-Layers

Applying the same heuristic as L2: if the categorical difference requires a different engineering pattern, it earns a name.

| Sub-Layer | Name | Engineering Pattern | Defining Quality |
|---|---|---|---|
| **3A** | Sections | Composition of Constructions, no cross-region state | Sits in a Layout slot. Static and thematic. |
| **3B** | Flows | Step controller + persistent cross-step state + navigation | Moves the user through a sequence over time. Has completion. |
| **3C** | Panels | Data-bound, stays mounted, responds to ongoing state changes | Lives indefinitely. Reflects data that changes. |

---

## Part A — Sections (16)

**Self-contained page regions that orchestrate Constructions around one thematic purpose.**

A Section sits in one Layout slot, contains a single theme, and manages no state that bleeds outside its boundary. It is static in the sense that it does not sequence the user or respond to live data — it presents authored or fetched content once.

**Test:** Does it sit in one Layout region, contain a single thematic purpose, and compose only Constructions without managing external state? Yes → Section. Moves the user through steps → Flow. Stays mounted and responds to live data → Panel.

---

### NavigationBar

**Universality:** SaaS · E-commerce · Editorial · Mobile · Dashboard (5/5)

**Purpose:** Primary site or application navigation surface. Present on every page. The most universal Composition in the system.

**Named regions:**
```
NavigationBar
├── [brand]          — logo, wordmark, or app name; links to home
├── [navigation]     — primary nav links; NavItem ×N or TabStrip
└── [actions]        — user-facing utilities: search, auth, avatar, notifications
```

**Construction filling each region:**

- `[brand]` → `ButtonWithIcon` Assembly (logo as icon, site name as label) or `MediaImage` Primitive directly for pure logo mark
- `[navigation]` → `TabStrip` Assembly for horizontal nav, or `LayoutStack[row]` of `NavItem` Assemblies
- `[actions]` → `LayoutStack[row]` of `ActionIconButton` Primitives + `AvatarWithLabel` Assembly + `Tooltip` Bridge on each icon

**Accessibility contract:**
- Wrap in `<nav aria-label="Primary navigation">` — not just `<header>`
- `[navigation]` region uses `role="list"` with each NavItem as `role="listitem"` when rendered as a list
- Active item gets `aria-current="page"`
- Mobile collapsed state: the toggle button requires `aria-expanded` and `aria-controls` pointing to the navigation region id
- Skip link (`NavSkipLink` Primitive) must appear as the very first focusable element on the page, before NavigationBar — links directly to `[main-content]`

**Domain Pack extensions:**
- SaaS Pack: notification badge on actions slot, command palette trigger (⌘K), workspace switcher in brand slot
- E-commerce Pack: cart icon with item count badge, currency/region selector
- Dashboard Pack: environment indicator (staging/production pill), help trigger

---

### HeroSection

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Primary page entry point. The first thing a user reads. Communicates value proposition and drives a primary action.

**Named regions:**
```
HeroSection
├── [eyebrow?]       — small category label above headline
├── [headline]       — primary value proposition heading
├── [body?]          — supporting explanatory text
├── [actions]        — primary + optional secondary CTA
└── [media?]         — supporting visual: image, video, illustration
```

**Construction filling each region:**

- `[eyebrow]` → `SurfaceChip` Primitive or `TextCaption` Primitive
- `[headline]` → `TextHeading` Primitive (h1, always — there should be exactly one h1 per page)
- `[body]` → `TextBody` Primitive
- `[actions]` → `LayoutStack[row]` of `ActionButton` Primitives (primary + ghost variant)
- `[media]` → `MediaWithCaption` Assembly or `MediaImage` Primitive directly

**Accessibility contract:**
- `[headline]` must always render as `<h1>`. Never use a heading level other than 1 here.
- `[actions]` primary button should not be labeled "Click here" or "Learn more" — the label must describe the action: "Start free trial", "View pricing"
- `[media]` alt text must describe the image's content contribution, not just "hero image"
- If `[media]` is decorative (purely visual, adds no information), use `alt=""` and `aria-hidden="true"`

---

### FooterSection

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Page-level closing surface. Navigation, legal, brand identity.

**Named regions:**
```
FooterSection
├── [brand]          — logo + brief descriptor or tagline
├── [link-groups]    — categorized navigation columns; group ×N: heading + NavItem[]
├── [legal]          — copyright, privacy policy, terms links
└── [social?]        — social platform icon links
```

**Construction filling each region:**

- `[brand]` → `AvatarWithLabel` Assembly (logo as avatar, tagline as caption) or `LayoutStack` of `MediaImage` + `TextCaption`
- `[link-groups]` → `LayoutGrid` Structure Primitive containing N `LayoutStack[column]` groups, each with `TextCaption [group heading]` + `NavItem ×N`
- `[legal]` → `LayoutStack[row]` of `TextLink` Primitives + `TextCaption` for copyright
- `[social]` → `LayoutStack[row]` of `ActionIconButton` Primitives with platform icons

**Accessibility contract:**
- Wrap in `<footer>` landmark (not just a div)
- `[link-groups]` headings use `<h2>` or `<h3>` (not bold divs) for screen reader navigation
- `[social]` icon buttons require descriptive `aria-label`: "Follow us on Twitter", not "Twitter"
- `[legal]` copyright year should not be hardcoded — update dynamically

---

### PageHeader

**Universality:** SaaS · E-commerce · Dashboard · Mobile (4/5)

**Purpose:** Sub-page header that orients the user within the application hierarchy. Appears below NavigationBar, above main content.

**Named regions:**
```
PageHeader
├── [breadcrumb?]    — navigation ancestry trail
├── [title]          — current page or resource name
├── [subtitle?]      — contextual description or metadata
└── [actions?]       — page-level primary actions
```

**Construction filling each region:**

- `[breadcrumb]` → `BreadcrumbTrail` Assembly
- `[title]` → `TextHeading` Primitive (h1 when no HeroSection present, h2 otherwise)
- `[subtitle]` → `TextCaption` or `TextBody` Primitive
- `[actions]` → `LayoutStack[row]` of `ActionButton` + `ActionIconButton` Primitives

**Accessibility contract:**
- `[title]` heading level depends on page context — must be the highest-level heading below NavigationBar
- `[actions]` buttons need clear, action-oriented labels. "New project" not "Create"
- If `[breadcrumb]` is present, it provides navigation context that reduces the need for verbose page titles

---

### FeatureGrid

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Communicates product capabilities or benefits in a scannable grid format.

**Named regions:**
```
FeatureGrid
├── [heading?]           — section title
└── [feature-item ×N]    — individual feature cards; typically 3, 6, or 9
    ├── [icon]           — visual anchor for the feature
    ├── [title]          — feature name
    └── [body]           — brief description
```

**Construction filling each region:**

- `[heading]` → `SectionHeader` Assembly
- `[feature-item]` → `SurfaceCard` Surface Primitive containing `LayoutStack[column]` of: `MediaIcon` + `TextHeading[h3]` + `TextBody`
- Grid layout: `LayoutGrid` Structure Primitive with `repeat(auto-fit, minmax(240px, 1fr))`

**Accessibility contract:**
- `[icon]` MediaIcon must be `aria-hidden="true"` — the icon is decorative; the title carries the meaning
- `[feature-item]` cards should not be interactive (no click behavior) unless they navigate somewhere — decorative cards do not get `role="button"` or tabindex
- If cards are navigable, the entire card is a single link, not a link inside a card

---

### PricingTable

**Universality:** SaaS · E-commerce (2/5 — barely included)

**Purpose:** Side-by-side plan comparison. One of the most conversion-critical surfaces in SaaS. Included despite only scoring 2/5 because it is nearly universal within those two categories and sufficiently distinct as a pattern to warrant formal specification.

**Named regions:**
```
PricingTable
├── [heading?]           — section framing
└── [plan ×N]            — individual plan columns; typically 2–4
    ├── [name]           — plan tier name
    ├── [price]          — price display with billing period
    ├── [description?]   — one-line plan summary
    ├── [cta]            — primary plan action
    ├── [features[]]     — feature list with included/excluded states
    └── [badge?]         — "Most popular" or similar highlight
```

**Construction filling each region:**

- `[heading]` → `SectionHeader` Assembly
- `[plan]` → `SurfaceCard` with accent border (`border: 2px solid var(--color-border-info)`) for featured plan
- `[name]` → `TextHeading[h3]` Primitive
- `[price]` → `LayoutStack` of `TextHeading [amount]` + `TextCaption [/month]`
- `[cta]` → `ActionButton` Primitive (primary variant for featured plan, outline for others)
- `[features[]]` → `LayoutStack[column]` of `KeyValueRow` Assemblies with `FeedbackStatusIcon[check|cross]`
- `[badge]` → `SurfaceBadge` Primitive positioned absolutely at top of card

**Accessibility contract:**
- Each `[plan]` should be a `<article>` landmark — plans are self-contained, independently meaningful units
- `[features[]]` included/excluded state must not rely on color alone — icon shape (checkmark vs cross) carries the meaning
- Featured plan badge must be announced: `<span class="sr-only">Most popular plan</span>`
- `[price]` requires aria-label on the full price string: `aria-label="$49 per month, billed annually"`

---

### TestimonialsSection

**Universality:** SaaS · E-commerce · Editorial (3/5)

**Purpose:** Social proof via attributed quotes.

**Named regions:**
```
TestimonialsSection
├── [heading?]               — section framing
└── [testimonial ×N]         — individual testimonials
    ├── [quote]              — the testimonial text
    ├── [avatar]             — customer photo or initials
    ├── [name]               — customer name
    ├── [role?]              — job title or company
    └── [rating?]            — star rating
```

**Construction filling each region:**

- `[testimonial]` → `SurfaceCard` containing `LayoutStack[column]`
- `[quote]` → `TextBlockquote` Primitive
- `[avatar]` + `[name]` + `[role]` → `AvatarWithLabel` Assembly
- `[rating]` → `RatingInput` Controller in read-only mode (value set, non-interactive)

**Accessibility contract:**
- `[quote]` must use `<blockquote>` with `<cite>` for the attribution — not a styled div
- `[rating]` in read-only mode: `aria-label="5 out of 5 stars"` on the container, all star icons `aria-hidden="true"`
- If displayed as a carousel, carousel controls require `aria-label`, current slide requires `aria-live="polite"`

---

### FAQSection

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Expandable question-answer pairs that reduce support load.

**Named regions:**
```
FAQSection
├── [heading?]       — section framing
└── [AccordionGroup] — the Q+A pairs as expandable items
    └── [item ×N]
        ├── [question]   — the trigger/header
        └── [answer]     — the expandable body
```

**Construction filling each region:**

- `[heading]` → `SectionHeader` Assembly
- `[AccordionGroup]` → `AccordionGroup` Controller (L2B) with `mode: single` (one answer open at a time) or `mode: multi`
- `[question]` → `ActionToggleButton` Primitive (the accordion trigger) containing `TextBody`
- `[answer]` → `TextBody` Primitive within the panel body

**Accessibility contract:**
- The `AccordionGroup` Controller handles ARIA automatically: `aria-expanded`, `aria-controls`, `aria-labelledby` on trigger/panel pairs
- `[question]` must be a button, not a styled div — keyboard activation (Enter/Space) must work
- Each panel must have a unique id for `aria-controls` to reference
- Search engines read accordion content even when collapsed — no SEO value hidden by the pattern itself

---

### CallToActionBanner

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Full-width conversion prompt. Higher visual weight than a button, lower than a HeroSection.

**Named regions:**
```
CallToActionBanner
├── [headline]       — primary action prompt
├── [body?]          — supporting rationale
├── [actions]        — primary + optional secondary CTA
└── [media?]         — optional decorative visual
```

**Construction filling each region:**

- `[headline]` → `TextHeading[h2]` Primitive
- `[body]` → `TextBody` Primitive
- `[actions]` → `LayoutStack[row]` of `ActionButton` Primitives
- `[media]` → `MediaImage` or `MediaLottie` Primitive, decorative (`aria-hidden="true"`)

**Accessibility contract:**
- Background color contrast against text must meet WCAG AA (4.5:1 for body text, 3:1 for large text)
- If banner has a background image, text must have sufficient contrast against the image — not just the fallback color

---

### ContentWithMedia

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Paired text block and media. The workhorse of marketing and editorial layouts. Often appears in alternating left/right arrangements.

**Named regions:**
```
ContentWithMedia
├── [text]
│   ├── [eyebrow?]   — category or section label
│   ├── [heading]    — section heading
│   ├── [body]       — explanatory prose
│   └── [actions?]   — optional CTA
└── [media]          — image, video, or illustration
```

**Construction filling each region:**

- `[text]` → `LayoutStack[column]` of Primitives
- `[heading]` → `TextHeading` Primitive
- `[body]` → `TextBody` Primitive
- `[actions]` → `ButtonWithIcon` Assembly or `ActionButton` Primitive
- `[media]` → `MediaWithCaption` Assembly (if caption needed) or `MediaImage` / `MediaVideo` Primitive directly

**Accessibility contract:**
- `[media]` image alt text must describe the content's contribution to the message, not just its subject
- If the media and text are in two columns, the reading order in the DOM must match the visual reading order — left column content before right column content in source

---

### StatsSection

**Universality:** SaaS · E-commerce · Editorial · Dashboard (4/5)

**Purpose:** Communicates scale, credibility, or performance through headline metrics. One thematic purpose: "here are the numbers that matter."

**Named regions:**
```
StatsSection
├── [heading?]           — optional section framing
├── [subheading?]        — optional supporting line
└── [stat-item ×N]       — the metric grid; N typically 3–6
    ├── [value]          — the number itself
    ├── [label]          — what the number measures
    ├── [trend?]         — directional change indicator
    └── [context?]       — secondary annotation (e.g. "Last 30 days")
```

**Construction filling each region:**

- `[heading]` → `SectionHeader` Assembly
- `[subheading]` → `TextBody` or `TextCaption` Primitive directly (simple enough to not need a Construction wrapper)
- `[stat-item]` → `MetricCard` Assembly — the key mapping. Each stat item is a `MetricCard`: `SurfaceCard` + `TextCaption[label]` + `TextHeading[value]` + `FeedbackStatusIcon?`
- `[trend]` slot inside MetricCard fills with:
  - `FeedbackStatusIcon` (success/warning/error) for binary directional signal
  - `TextCaption` with delta value ("+12% vs last month") for quantitative trend
  - `StatBadge` Assembly when both icon and delta value are needed together
- `[context]` → `TextCaption` Primitive directly ("Updated daily", "Last 30 days")

**Grid layout contract:**

The stat grid is part of the named region specification — not left to the implementer:

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
gap: var(--spacing-md);
```

`auto-fit` with `minmax` means: 4 stats side-by-side on desktop, 2 per row on tablet, 1 per row on mobile. This responsive behavior is part of the Composition's contract.

**Accessibility contract:**

The core problem: a screen reader encountering "10M", "99.9%", "$2.4M", "1,247" with small labels underneath has no way to understand the relationship between a number and its label unless that relationship is encoded in markup.

The correct pattern uses a description list:

```html
<dl class="stats-grid">
  <div>
    <dd aria-label="10 million">10M</dd>
    <dt>Active users</dt>
  </div>
  <div>
    <dd aria-label="99.9 percent">99.9%</dd>
    <dt>Uptime</dt>
  </div>
</dl>
```

Or using `<figure>` / `<figcaption>`:

```html
<figure>
  <p aria-label="10 million users">10M</p>
  <figcaption>Active users</figcaption>
</figure>
```

Critical rules:
- `[value]` must have `aria-label` with the human-readable version: "10 million" not "10M", "99.9 percent uptime" not "99.9%", "2.4 million dollars" not "$2.4M"
- `[trend]` `FeedbackStatusIcon` must have `aria-label` describing the trend: "Increased 12% vs last month" — color alone is not an accessible signal
- If `[heading]` is present, wrap the entire Composition in `<section aria-labelledby="[heading-id]">` so screen reader users navigating by landmarks hear the section label

**Domain Pack extensions:**

SaaS Pack adds:
- Real-time update behavior: WebSocket or polling, stats refresh without page reload
- Sparkline slot inside each MetricCard: tiny inline trend chart, not just a directional icon
- Comparison mode: current period vs. previous period within each card

Dashboard Pack adds:
- Date range selector that rebinds all stat values simultaneously
- Drill-down click behavior: each MetricCard becomes a Bridge trigger opening a DetailPanel with full breakdown
- Export action at the section level
- Loading skeleton state that mirrors the grid layout exactly (critical for async data)

E-commerce Pack adds:
- Currency formatting tokens: locale-aware number display
- Conversion-specific MetricCard variants: CTR, AOV, cart abandonment rate
- Goal indicator: `FeedbackProgressFill` showing actual vs. target within each card

Editorial Pack: no meaningful extension — editorial metrics ("3 min read", "12K shares") are handled by the base Composition without modification.

---

### TeamSection

**Universality:** SaaS · Editorial (2/5)

**Purpose:** Grid of people with identity and role. Included at 2/5 because team pages are near-universal within SaaS and editorial products specifically.

**Named regions:**
```
TeamSection
├── [heading?]           — section framing
└── [member ×N]          — individual team members
    ├── [avatar]         — photo or initials
    ├── [name]           — full name
    ├── [role]           — job title
    └── [links?]         — social or contact links
```

**Construction filling each region:**

- `[member]` → `SurfaceCard` containing `LayoutStack[column]`
- `[avatar]` + `[name]` + `[role]` → `AvatarWithLabel` Assembly (extended with larger avatar size token)
- `[links]` → `LayoutStack[row]` of `ActionIconButton` Primitives with social icons

**Accessibility contract:**
- `[avatar]` image alt text: the person's name. The name is also visible in `[name]` so `alt=""` is acceptable if the name is always visible — avoid redundancy
- `[links]` icon buttons require descriptive `aria-label`: "Maya Rodriguez on LinkedIn", not "LinkedIn"

---

### LogoBanner

**Universality:** SaaS · E-commerce · Editorial (3/5)

**Purpose:** Row of partner, client, or integration logos. Communicates trust and ecosystem.

**Named regions:**
```
LogoBanner
├── [label?]         — "Trusted by" or "Used at" framing text
└── [logo ×N]        — individual logo marks
```

**Construction filling each region:**

- `[label]` → `TextCaption` Primitive
- `[logo]` → `MediaImage` Primitive (SVG preferred for resolution independence)
- Layout: `LayoutStack[row, wrap, justify-center]` with consistent height constraint on all logos

**Accessibility contract:**
- Each `[logo]` image must have alt text of the company name: `alt="Stripe"`, not `alt="logo"`
- If logos link to partner pages, each is an `<a>` wrapping the image with `aria-label="Visit Stripe's website"`
- If logos are purely decorative (no link, no information beyond brand recognition), `alt=""` is acceptable but company name alt is always better

---

### NewsletterSignup

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Email capture with value proposition.

**Named regions:**
```
NewsletterSignup
├── [heading]        — value proposition headline
├── [body?]          — supporting rationale or frequency note
├── [form]
│   ├── [email-field]    — FormField wrapping InputText[email]
│   └── [submit]         — ActionButton
└── [disclaimer?]    — privacy note or unsubscribe mention
```

**Construction filling each region:**

- `[heading]` → `TextHeading` Primitive
- `[body]` → `TextBody` Primitive
- `[email-field]` → `FormField` Assembly: `TextLabel` + `InputText[type=email]` + `FeedbackFieldError?`
- `[submit]` → `ActionButton` Primitive
- `[disclaimer]` → `TextCaption` Primitive with `TextLink` for privacy policy

**Accessibility contract:**
- `[email-field]` label must always be visible — never placeholder-only labeling
- `[submit]` button label must describe the action: "Subscribe" or "Get updates", not "Submit"
- `[disclaimer]` privacy link must be descriptive: "Read our privacy policy", not "Privacy policy" as bare text
- After successful submission, focus management: announce success state via `aria-live="polite"`

---

### BreadcrumbHeader

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Sub-page header for deep navigation contexts. Combines wayfinding with page identity.

**Named regions:**
```
BreadcrumbHeader
├── [BreadcrumbTrail]    — navigation ancestry
├── [title]              — current resource name
├── [subtitle?]          — metadata or description
└── [actions?]           — resource-level actions
```

**Construction filling each region:**

- `[BreadcrumbTrail]` → `BreadcrumbTrail` Assembly (L2A)
- `[title]` → `TextHeading[h1]` Primitive
- `[subtitle]` → `TextCaption` or `TagGroup` Assembly (for multi-tag metadata)
- `[actions]` → `LayoutStack[row]` of `ActionButton` + `MenuButton` Bridge

**Accessibility contract:**
- `[BreadcrumbTrail]` must be wrapped in `<nav aria-label="Breadcrumb">` — separate from primary navigation
- Current page in breadcrumb gets `aria-current="page"`
- `[title]` is the h1 for the page — there should be exactly one h1 per page

---

### NotificationCenter

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** Grouped notification list with read/unread state and actions.

**Named regions:**
```
NotificationCenter
├── [heading]            — "Notifications" or similar
├── [filter?]            — all/unread/type filter controls
└── [notification ×N]
    ├── [icon]           — notification type indicator
    ├── [title]          — notification headline
    ├── [body?]          — supporting detail
    ├── [timestamp]      — relative time
    └── [actions?]       — mark read, dismiss, navigate
```

**Construction filling each region:**

- `[heading]` → `SectionHeader` Assembly with count badge
- `[filter]` → `SegmentedControl` Controller (L2B)
- `[notification]` → `LayoutStack[row]` of `FeedbackStatusIcon` + `LayoutStack[column]` of content + `TextCaption[timestamp]`
- `[actions]` → `LayoutStack[row]` of `ActionIconButton` Primitives

**Accessibility contract:**
- The notification list must be an `aria-live` region: `aria-live="polite"` so new notifications are announced
- `[timestamp]` should use `<time datetime="ISO-8601-value">` — "2 hours ago" as visible text with the machine-readable value in the datetime attribute
- Unread state must not rely on color alone — use a visual indicator (dot, bold text) plus `aria-label="Unread: [notification title]"`

---

## Part B — Flows (10)

**Multi-step sequences with persistent cross-step state.**

A Flow moves the user through a defined sequence. It owns an internal step machine, manages state that persists between steps, and has a defined completion or exit state. The user cannot jump arbitrarily between steps — the Flow enforces or guides sequence.

**Engineering pattern:** Step controller + persistent state across Constructions + back/forward navigation logic. The step controller is the invisible orchestrator, analogous to the Controller in L2B but operating across Constructions rather than Primitives.

---

### AuthFlow

**Universality:** SaaS · E-commerce · Editorial · Mobile · Dashboard (5/5)

**Purpose:** The entry gate. Login, signup, password recovery — the most universal Flow in existence.

**Named regions:**
```
AuthFlow
├── [brand?]             — logo/identity for standalone auth pages
├── [StepIndicator?]     — only if multi-step signup
├── [step]               — current active step surface
│   ├── [LoginForm]      — email + password + remember me + forgot
│   ├── [SignupForm]     — name + email + password + terms
│   └── [RecoveryForm]   — email input + instructions
├── [social-auth?]       — OAuth provider buttons
└── [step-switch]        — "Already have an account?" / "Create account"
```

**Construction filling each region:**

- `[LoginForm]` → `MultiStepForm` Flow reduced to a single step, or directly: `FormField[email]` + `FormField[password: InputPassword]` + `InputCheckbox[remember]` + `TextLink[forgot password]`
- `[SignupForm]` → `FormField[name]` + `FormField[email]` + `FormField[password]` + `InputCheckbox[terms agreement]`
- `[social-auth]` → `LayoutStack[column]` of `ButtonWithIcon` Assemblies (Google, GitHub, etc.)
- `[step-switch]` → `TextBody` + `TextLink` Primitive

**Accessibility contract:**
- Autofocus the first field on mount — reduces friction for keyboard users
- Password field: reveal toggle must be `aria-label="Show password"` / `aria-label="Hide password"` and toggle `input[type]` between "password" and "text"
- Error states: `aria-describedby` linking each field to its `FeedbackFieldError` Primitive
- "Forgot password" link must be clearly labeled — not just an icon
- Social auth buttons require full provider name: "Continue with Google", not just the Google icon

---

### OnboardingWizard

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** First-run setup sequence. Guides new users to activation.

**Named regions:**
```
OnboardingWizard
├── [StepIndicator]      — progress through steps
├── [step-content]       — current step's primary content
├── [step-actions]
│   ├── [back?]          — not present on first step
│   ├── [skip?]          — optional escape hatch
│   └── [next|complete]  — advances or finishes
└── [progress-label?]    — "Step 2 of 4"
```

**Accessibility contract:**
- `[StepIndicator]` must have `aria-label="Step 2 of 4, Profile setup"` — not just visual dots
- `[back]` and `[next]` buttons must announce where they navigate: "Go back to account setup", "Continue to profile"
- On step transition, focus moves to the top of `[step-content]` — not left behind on the button that was clicked
- `[skip]` if present: "Skip this step" is acceptable; "Skip" alone is not

---

### MultiStepForm

**Universality:** SaaS · E-commerce · Editorial · Mobile · Dashboard (5/5)

**Purpose:** Any long form split into sequential steps. The most reusable Flow pattern.

**Named regions:**
```
MultiStepForm
├── [StepIndicator]          — progress; can be numeric, named, or dot style
├── [step-heading]           — current step title
├── [FormSection]            — the fields for this step
├── [step-actions]
│   ├── [back?]              — absent on first step
│   └── [next|submit]        — advances or submits
└── [save-indicator?]        — auto-save state
```

**Construction filling each region:**

- `[StepIndicator]` → `StepIndicator` Assembly (L2A)
- `[step-heading]` → `SectionHeader` Assembly
- `[FormSection]` → `LayoutStack[column]` of `FormField` Assemblies (L2A) and `RadioGroup`/`CheckboxGroup` Controllers (L2B) as needed
- `[next|submit]` → `ActionButton` Primitive
- `[save-indicator]` → `FeedbackStatusIcon` + `TextCaption` ("Saved" / "Saving…")

**Accessibility contract:**
- Each step is a `<fieldset>` with a `<legend>` matching the `[step-heading]` — this provides semantic grouping for the step's fields
- On validation error: focus moves to the first errored field, not the submit button
- `[save-indicator]` uses `aria-live="polite"` for auto-save announcements

---

### SearchFlow

**Universality:** SaaS · E-commerce · Editorial · Mobile · Dashboard (5/5)

**Purpose:** Query → results → detail. The universal information retrieval pattern.

**Named regions:**
```
SearchFlow
├── [SearchBar]          — query input (L2A Assembly)
├── [FilterFlow?]        — refinement controls (L3B Flow)
├── [results-meta?]      — "142 results for 'design system'"
├── [ResultsList]        — the results themselves
└── [DetailPanel?]       — selected result detail (L3C Panel)
```

**Construction filling each region:**

- `[SearchBar]` → `SearchBar` Assembly (L2A)
- `[FilterFlow]` → `FilterFlow` Composition (L3B) — a nested Flow within a Flow
- `[results-meta]` → `TextCaption` Primitive with result count
- `[ResultsList]` → `LayoutStack[column]` of result items (Construction type varies by domain)
- `[DetailPanel]` → `DetailPanel` Composition (L3C)

**Accessibility contract:**
- `[SearchBar]` `InputText[search]` must have `role="searchbox"` and be wrapped in `<search>` landmark or `<form role="search">`
- `[results-meta]` must be `aria-live="polite"` — result count updates must be announced when search executes
- `[ResultsList]` must be a list (`<ul>` / `<ol>`) — each result is a `<li>`
- Keyboard: Enter in search field submits; results receive focus after loading

---

### FilterFlow

**Universality:** SaaS · E-commerce · Mobile · Dashboard (4/5)

**Purpose:** Multi-dimension filter selection with apply/reset behavior.

**Named regions:**
```
FilterFlow
├── [filter-groups ×N]       — individual filter dimensions
│   ├── [group-label]        — dimension name ("Category", "Price", "Status")
│   └── [controls]           — the filter input(s) for this dimension
├── [active-filters]         — currently applied filters as dismissible tags
└── [footer-actions]
    ├── [apply?]             — explicit apply (vs. live filtering)
    └── [reset]             — clear all filters
```

**Construction filling each region:**

- `[controls]` → `CheckboxGroup` Controller (L2B) for multi-select, `RadioGroup` Controller for single-select, `SliderRange` Controller for range, `ToggleGroup` Controller for tag-style
- `[active-filters]` → `TagGroup` Assembly (L2A) — each tag is dismissible, removing it removes the filter
- `[apply]` → `ActionButton` Primitive
- `[reset]` → `ActionButton[ghost variant]` Primitive

**Accessibility contract:**
- Each `[filter-groups]` uses `<fieldset>` + `<legend>` matching `[group-label]`
- `[active-filters]` dismiss buttons: `aria-label="Remove Category: Electronics filter"`
- `[reset]` button: `aria-label="Reset all filters"` — "Reset" alone is ambiguous
- Live filtering (no explicit apply): changes announce via `aria-live="polite"` on `[results-meta]`

---

### SettingsFlow

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** Grouped settings with persistent save state.

**Named regions:**
```
SettingsFlow
├── [nav]                    — settings section navigation
│   └── [NavItem ×N]
├── [active-section]         — currently selected settings group
│   ├── [SectionHeader]
│   └── [setting-rows ×N]
│       ├── [label]
│       ├── [description?]
│       └── [control]       — any Input or Action Primitive
└── [save-actions?]          — save/cancel for non-auto-save sections
```

**Construction filling each region:**

- `[nav]` → `SidebarNav` Panel (L3C) in narrow mode, or `TabStrip` Assembly for horizontal layout
- `[setting-rows]` → `KeyValueRow` Assembly extended with a `[control]` slot: `InputSwitch`, `InputSelect`, `ActionButton`, `InputText`
- `[save-actions]` → `LayoutStack[row]` of `ActionButton[save]` + `ActionButton[cancel, ghost]`

---

### UploadFlow

**Universality:** SaaS · E-commerce · Mobile · Dashboard (4/5)

**Purpose:** File selection → preview → confirm sequence.

**Named regions:**
```
UploadFlow
├── [FileUploadZone]     — drag-drop + click upload surface (L2B Controller)
├── [preview?]           — file preview before confirmation
├── [metadata-form?]     — optional metadata entry post-selection
└── [flow-actions]
    ├── [cancel]
    └── [confirm]
```

**Accessibility contract:**
- `[FileUploadZone]` drag-drop must have a keyboard-accessible alternative — click to open file picker
- File type and size constraints must be communicated before upload, not only on error
- Upload progress: `FeedbackProgressTrack` + `FeedbackProgressFill` with `aria-valuenow` / `aria-valuemax`

---

### VerificationFlow

**Universality:** SaaS · E-commerce · Mobile (3/5)

**Purpose:** Identity or email verification via OTP or code entry.

**Named regions:**
```
VerificationFlow
├── [instruction]        — where the code was sent + instructions
├── [PinInput]           — the OTP entry (L2B Controller)
├── [resend-action]      — re-send code with cooldown timer
└── [confirm]            — submit button
```

**Construction filling each region:**

- `[instruction]` → `AlertBanner` Assembly (L2A) — informs user what to expect
- `[PinInput]` → `PinInput` Controller (L2B) — handles auto-advance, paste, backspace
- `[resend-action]` → `ActionButton[ghost]` with `FeedbackSpinner` during cooldown, `FeedbackMeter` for countdown
- `[confirm]` → `ActionButton` Primitive

**Accessibility contract:**
- `[PinInput]` each input: `aria-label="Digit 1 of 6"` through "Digit 6 of 6"
- Auto-advance must not skip focus notification — screen readers must announce each field
- `[resend-action]` cooldown: `aria-live="polite"` announces when resend becomes available again

---

### DeleteConfirmFlow

**Universality:** SaaS · E-commerce · Mobile · Dashboard (4/5)

**Purpose:** Destructive action confirmation with deliberate friction. Forces conscious acknowledgment.

**Named regions:**
```
DeleteConfirmFlow
├── [warning]
│   ├── [icon]           — FeedbackStatusIcon[error]
│   ├── [title]          — "Delete [resource name]?"
│   └── [consequence]    — what will be permanently lost
├── [confirmation-input?]    — type resource name to confirm
└── [flow-actions]
    ├── [cancel]             — safe exit
    └── [confirm-destructive]    — destructive action button
```

**Construction filling each region:**

- `[warning]` → `AlertBanner` Assembly (L2A) with error variant
- `[confirmation-input]` → `FormField` Assembly with `InputText` + instruction label
- `[cancel]` → `ActionButton[ghost]` Primitive
- `[confirm-destructive]` → `ActionButton[destructive variant]` Primitive — visually distinct (red)

**Accessibility contract:**
- This Flow is almost always delivered inside a `Modal` Bridge (L2C) — the Modal handles focus trap and scroll lock
- `[confirm-destructive]` must require explicit activation — no accidental trigger via Enter on the confirmation input
- `[consequence]` text must be specific: "This will permanently delete 47 files and cannot be undone" — not "This action is irreversible"
- `[confirmation-input]` if present: `aria-describedby` linking to the instruction that tells the user what to type

---

### CheckoutFlow

**Universality:** E-commerce · Mobile (2/5 — Domain Pack)

Specified here for completeness but does not pass the universality test. **Belongs in the E-commerce Domain Pack.**

Named regions follow the MultiStepForm pattern with domain-specific steps: `[CartReview]` → `[AddressForm]` → `[PaymentForm]` → `[Confirmation]`.

---

## Part C — Panels (12)

**Persistent application surfaces that stay mounted and reflect changing state.**

A Panel is alive. It stays mounted across user actions, responds to data that changes over time, and is often the primary workspace rather than content within it. Unlike Sections (authored, static) and Flows (sequential, completion-driven), Panels are the ongoing, data-driven workspaces of applications.

**Engineering pattern:** Data-bound with ongoing state subscription. Often real-time via WebSocket or polling. Own internal layout that may itself use Layout Primitives. State does not reset on navigation within the Panel.

---

### SidebarNav

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** Persistent primary navigation in application contexts. The application's spine.

**Named regions:**
```
SidebarNav
├── [brand?]             — app logo and name
├── [nav-groups ×N]      — grouped navigation sections
│   ├── [group-label?]   — section heading (e.g. "Workspace")
│   └── [NavItem ×N]     — individual navigation links
├── [separator?]         — visual divider between groups
└── [user-section?]      — current user identity + account actions
```

**Construction filling each region:**

- `[brand]` → `AvatarWithLabel` Assembly or `ButtonWithIcon` Assembly
- `[nav-groups]` → `LayoutStack[column]` of `NavItem` Assemblies with `TextCaption[group-label]`
- `[user-section]` → `AvatarWithLabel` Assembly + `MenuButton` Bridge for account menu

**Accessibility contract:**
- Entire SidebarNav wraps in `<nav aria-label="Application navigation">` — distinct from the page-level NavigationBar nav landmark
- Active NavItem: `aria-current="page"`
- Collapsed mobile state: the toggle is `aria-expanded` + `aria-controls` pointing to the nav region
- `[group-label]` headings: use `<h2>` or appropriate heading level — not bold divs

---

### DataTable

**Universality:** SaaS · E-commerce · Dashboard (3/5)

**Purpose:** The workhorse Panel of data-heavy applications. Sortable, filterable tabular data with row actions.

**Named regions:**
```
DataTable
├── [toolbar]
│   ├── [search?]        — inline table search
│   ├── [filters?]       — column or global filters
│   └── [table-actions]  — bulk actions, export, add row
├── [table]
│   ├── [SurfaceTableHeader ×N]  — column headers with sort
│   └── [rows ×N]
│       ├── [selection?] — checkbox per row
│       ├── [cells ×N]   — data cells
│       └── [row-actions?] — inline row action menu
└── [PaginationBar]      — page navigation
```

**Construction filling each region:**

- `[search]` → `SearchBar` Assembly (L2A)
- `[filters]` → `FilterFlow` Composition (L3B) in compact mode
- `[table-actions]` → `LayoutStack[row]` of `ActionButton` + `MenuButton` Bridge
- `[SurfaceTableHeader]` → `SurfaceTableHeader` Primitive (L1 — carries sort state)
- `[selection]` → `InputCheckbox` Primitive (per row) + `InputCheckbox[indeterminate]` in header
- `[row-actions]` → `MenuButton` Bridge (L2C) with `ContextMenu` or `Dropdown`
- `[PaginationBar]` → `PaginationBar` Assembly (L2A)

**Accessibility contract:**
- Use `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` — not div-based tables
- `[SurfaceTableHeader]` sort: `aria-sort="ascending"` / `"descending"` / `"none"` on `<th>` elements
- `[selection]` header checkbox (select all): `aria-label="Select all rows"` or `aria-label="Deselect all rows"`
- Row `[selection]` checkbox: `aria-label="Select [row identifier]"`
- `[row-actions]` trigger: `aria-label="Actions for [row identifier]"`
- Keyboard: full keyboard navigation within table — arrow keys between cells is standard browser behavior for `<table>` elements

---

### DetailPanel

**Universality:** SaaS · E-commerce · Dashboard (3/5)

**Purpose:** Right-side record detail. Appears when a row or item is selected. Shows full record without navigating away.

**Named regions:**
```
DetailPanel
├── [header]
│   ├── [title]          — record identity
│   └── [actions]        — edit, delete, close
├── [section ×N]         — grouped detail sections
│   ├── [heading]        — section label
│   └── [KeyValueRow ×N] — field-value pairs
└── [related?]           — related records or activity
```

**Construction filling each region:**

- `[header]` → `SectionHeader` Assembly
- `[section]` → `SurfacePanel` Surface Primitive wrapping `LayoutStack[column]` of `KeyValueRow` Assemblies
- `[related]` → `ActivityFeed` Panel (L3C) in compact mode, or `DataTable` Panel in minimal mode

**Accessibility contract:**
- When DetailPanel opens, focus moves to the Panel's `[title]` or first interactive element
- `[actions]` close button: `aria-label="Close detail panel"`
- Panel should be a `<aside>` landmark with `aria-label="[record type] details"`

---

### ActivityFeed

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** Reverse-chronological event stream. Shows what happened, when, and by whom.

**Named regions:**
```
ActivityFeed
├── [header]
│   ├── [title]          — "Activity" or "Recent events"
│   └── [filter?]        — filter by event type
└── [event ×N]
    ├── [avatar]         — actor identity
    ├── [action]         — what happened (rich text with actor/object links)
    ├── [timestamp]      — relative time with absolute on hover
    └── [detail?]        — optional expandable detail
```

**Construction filling each region:**

- `[header]` → `SectionHeader` Assembly
- `[filter]` → `SegmentedControl` Controller (L2B)
- `[event]` → `LayoutStack[row]` of `MediaAvatar` Primitive + `LayoutStack[column]` of `TextBody[action]` + `TextCaption[timestamp]`
- `[timestamp]` → `TextCaption` wrapping `<time datetime="ISO-8601">` with `Tooltip` Bridge showing absolute time

**Accessibility contract:**
- Feed is `aria-live="polite"` for real-time updates — new events are announced without interruption
- `[timestamp]` `<time>` element: `datetime` attribute contains ISO 8601 value; visible text is human-relative ("2 hours ago")
- `[avatar]` images: `alt="[actor name]"`
- Feed updates: only announce the new event text, not the entire feed — use targeted `aria-live` regions

---

### ChatPanel

**Universality:** SaaS · Mobile (2/5)

Specified for completeness. **Belongs in the SaaS Domain Pack** as a common but not universal pattern.

Named regions: `[header: identity, status]` + `[MessageList]` + `[ComposerBar: InputTextarea, attach?, send]`.

---

### MediaGallery

**Universality:** SaaS · E-commerce · Mobile (3/5)

**Purpose:** Grid of media items with selection state and view controls.

**Named regions:**
```
MediaGallery
├── [toolbar]
│   ├── [view-toggle]    — grid vs. list view
│   ├── [sort]           — sort control
│   └── [filter?]        — type or tag filter
├── [grid]               — the media items
│   └── [MediaCard ×N]
│       ├── [media]      — thumbnail
│       ├── [label]      — file name or title
│       └── [selection?] — checkbox overlay
└── [selection-bar?]     — bulk action bar (appears when items selected)
```

**Construction filling each region:**

- `[view-toggle]` → `SegmentedControl` Controller (L2B)
- `[sort]` → `Dropdown` Bridge (L2C)
- `[MediaCard]` → `SurfaceCard` with `MediaImage` + `TextCaption` + `InputCheckbox[overlay]`
- `[selection-bar]` → `AlertBanner` Assembly in selection mode with bulk actions

**Accessibility contract:**
- `[selection]` checkboxes: `aria-label="Select [media name]"`
- `[MediaCard]` images: descriptive alt text — not filename; "Product photo showing red sneaker on white background"
- `[view-toggle]` announces current view: `aria-label="Switch to list view"` / `"Switch to grid view"`

---

### KanbanBoard

**Universality:** SaaS · Dashboard (2/5)

Specified for completeness. **Belongs in the SaaS Domain Pack.**

Named regions: `[column ×N: header, SortableList of cards, add-card?]` + `[add-column?]`.

---

### ProfilePanel

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** User identity hub with key stats and primary actions.

**Named regions:**
```
ProfilePanel
├── [cover?]             — background image or color
├── [identity]
│   ├── [avatar]         — user photo or initials
│   ├── [name]           — display name
│   └── [meta]           — username, role, location, join date
├── [stats?]             — key profile metrics
├── [actions]            — follow, message, edit (context-dependent)
└── [tab-sections?]      — posts, activity, about (TabController)
```

**Construction filling each region:**

- `[identity]` → `AvatarWithLabel` Assembly (extended with larger avatar token)
- `[stats]` → `StatsSection` Composition (L3A) in compact inline mode
- `[actions]` → `LayoutStack[row]` of `ActionButton` Primitives
- `[tab-sections]` → `TabController` Controller (L2B)

**Accessibility contract:**
- `[cover]` decorative images: `aria-hidden="true"`, `alt=""`
- `[actions]` buttons must have context: "Follow Maya Rodriguez", not just "Follow"

---

### SettingsPanel

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** Persistent settings surface. The full settings experience as an application Panel.

**Named regions:**
```
SettingsPanel
├── [SidebarNav]         — settings section navigation (L3C Panel)
└── [main]               — active settings section
    └── [SettingsSection ×N]  — from SettingsFlow (L3B)
```

This Composition composes two other Compositions: `SidebarNav` (3C) for navigation and the section content pattern from `SettingsFlow` (3B). This is the first example in the system of Compositions composing other Compositions — valid at L3, and a signal that the pattern is approaching Organism-level complexity at scale.

---

### DashboardGrid

**Universality:** SaaS · Dashboard (2/5)

Specified for completeness. **Belongs in the Dashboard Domain Pack** — configurable widget grids are too specific to data-heavy products to be universal.

Named regions: `[toolbar: range, refresh, add-widget]` + `[grid: widget ×N with resize handles]`.

---

### CommentThread

**Universality:** SaaS · E-commerce · Editorial · Mobile (4/5)

**Purpose:** Nested comment tree with reply and reactions.

**Named regions:**
```
CommentThread
├── [comment ×N]
│   ├── [AvatarWithLabel]    — author identity + timestamp
│   ├── [body]               — comment text content
│   ├── [reactions?]         — emoji reaction counts
│   ├── [actions]            — reply, like, report
│   └── [replies?]           — nested CommentThread (recursive)
└── [ComposerBar]            — new comment input
    ├── [avatar]             — current user avatar
    ├── [InputTextarea]      — comment input
    └── [submit]             — post button
```

**Construction filling each region:**

- `[AvatarWithLabel]` → `AvatarWithLabel` Assembly (L2A)
- `[body]` → `TextBody` Primitive
- `[reactions]` → `LayoutStack[row]` of `SurfaceChip` Primitives with count
- `[actions]` → `LayoutStack[row]` of `ActionButton[ghost, small]` Primitives
- `[ComposerBar]` → `FormField` Assembly wrapping `InputTextarea` + `ActionButton[submit]`

**Accessibility contract:**
- Nested replies: indentation must be `padding-left`, never `margin-left` on the list — screen reader reading order must match visual nesting
- `[actions]` reply button: `aria-label="Reply to [author name]'s comment"`
- `[ComposerBar]` submit: `aria-label="Post comment"` not just "Post"
- New comments added to thread: `aria-live="polite"` announces addition

---

### CommandBar

**Universality:** SaaS · Mobile · Dashboard (3/5)

**Purpose:** Persistent quick-action toolbar. The application's most-used actions always one click away.

**Named regions:**
```
CommandBar
├── [primary-actions ×N]     — most frequent actions as icon buttons
├── [separator?]             — visual grouping divider
├── [secondary-actions?]     — less frequent actions
└── [overflow?]              — "more actions" menu for overflow
```

**Construction filling each region:**

- `[primary-actions]` → `ActionIconButton` Primitives with `Tooltip` Bridge on each
- `[separator]` → `LayoutDivider` Primitive (vertical orientation)
- `[overflow]` → `MenuButton` Bridge (L2C)

**Accessibility contract:**
- Every `ActionIconButton` in the bar requires an `aria-label` — icon-only buttons have no visible text
- `Tooltip` Bridge on each action: provides visible label on hover/focus — redundant with aria-label but valuable for discoverability
- Wrap in `<toolbar role="toolbar" aria-label="Document actions">` — this enables arrow key navigation between buttons per ARIA toolbar pattern

---

## Domain Packs

The following Compositions failed the universality test (fewer than 3 product categories) and belong in Domain Pack extensions, not the universal core.

This is not a failure of these patterns. It is the system being honest about what "universal" means.

| Composition | Categories | Domain Pack |
|---|---|---|
| `ProductCard` | E-commerce · Mobile | E-Commerce Pack |
| `ProductListingGrid` | E-commerce | E-Commerce Pack |
| `CartDrawer` | E-commerce · Mobile | E-Commerce Pack |
| `CheckoutFlow` | E-commerce · Mobile | E-Commerce Pack |
| `ArticleLayout` | Editorial | Editorial Pack |
| `BlogPostGrid` | Editorial | Editorial Pack |
| `VideoPlayer` | Editorial · Mobile | Editorial Pack |
| `InvoicePanel` | SaaS · Dashboard | SaaS Pack |
| `MapPanel` | Dashboard | Dashboard Pack |
| `KanbanBoard` | SaaS · Dashboard | SaaS Pack |
| `ChatPanel` | SaaS · Mobile | SaaS Pack |
| `DashboardGrid` | SaaS · Dashboard | Dashboard Pack |

### Domain Pack Structure

Each pack is a self-contained extension to the UDS core. A project using the E-Commerce Pack assumes L1–L3 core is already in place and adds domain-specific Compositions on top.

| Pack | Core Compositions Added | Key Extensions |
|---|---|---|
| **E-Commerce Pack** | ProductCard, ProductListingGrid, CartDrawer, CheckoutFlow | Currency tokens, cart state, payment form patterns |
| **Editorial Pack** | ArticleLayout, BlogPostGrid, VideoPlayer, TableOfContents | Reading time, share actions, related content |
| **SaaS Pack** | InvoicePanel, KanbanBoard, ChatPanel, ApiKeyPanel | Billing patterns, team management, usage meters |
| **Dashboard Pack** | DashboardGrid, MapPanel, ChartPanel, ReportBuilder | Date range tokens, real-time data patterns, export flows |

---

## Layer 3 Summary

| Sub-Layer | Count | Engineering Pattern |
|---|---|---|
| 3A Sections | 16 | Composition of Constructions, no cross-region state |
| 3B Flows | 10 | Step controller + persistent cross-step state |
| 3C Panels | 12 | Data-bound, mounted, responds to ongoing state |
| **Total L3 core** | **38** | |
| Domain Pack candidates | 12 | Specified separately per pack |

### Cumulative system inventory to this point

| Layer | Count | What it is |
|---|---|---|
| L0 Asset Layer | — | Tokens, Phosphor Icons, typography decisions |
| L1 Primitives | 80 | Terminal symbols. Indivisible, typed, universal. |
| L2A Assemblies | 22 | Slot composition. No shared state. |
| L2B Controllers | 14 | Shared state machine. Context + Reducer. |
| L2C Bridges | 11 | Anchor/portal relationships. floating-ui + Portal. |
| L3A Sections | 16 | Self-contained page regions. |
| L3B Flows | 10 | Multi-step sequences with completion state. |
| L3C Panels | 12 | Persistent data-bound surfaces. |
| **Total (L0–L3)** | **165** | Every element defined, tested, load-bearing. |

---

*Universal Design System · Layer 3 Specification · Version 1.0 · 2026*
*Companion document to `universal_design_system_v1.md`*
*Layers 4–5 (Layouts and Instances) specified separately*