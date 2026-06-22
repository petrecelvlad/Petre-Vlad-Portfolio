# Universal Design System (UDS)
### A Formal Framework for Interface Composition
**Version 1.0 · 2026**

> Five layers. Three axes. One generative system capable of composing any interface for any product.

---

## Preamble

This document is the canonical specification of the Universal Design System — a framework for building any digital interface from a single coherent set of primitives. It is designed to scale across SaaS products, e-commerce platforms, blogs, native apps, dashboards, and marketing sites without modification to its foundational layer.

This system was derived from first principles. Where it resembles existing frameworks, that resemblance is convergence on truth, not imitation. Where it diverges — and it diverges significantly — that divergence is deliberate and argued.

**The central argument:**

- Atomic Design (Frost, 2013) uses a chemistry metaphor that gives designers the wrong mental model at every layer above atoms
- The correct paradigm is **formal systems and language theory** — the same paradigm used by mathematics, computer science, and linguistics
- A design system built on a formal paradigm is **generative**: from a finite set of well-chosen primitives and composition rules, it can produce any valid interface
- A design system built on a physical assembly metaphor is merely **additive**: it can only produce interfaces that are sums of their parts

---

## Part I — The Paradigm

### Why Chemistry Fails

Brad Frost's Atomic Design defined atoms as "the basic building blocks of matter" and molecules as "groups of atoms bonded together." The metaphor is intuitive. It is also wrong in one critical way.

In chemistry, molecular composition is **fixed**. Water is always H₂O. You cannot have a water molecule with three hydrogens. Composition determines identity.

In interface design, composition is **variable**. A FormField can be:

- `TextLabel` + `InputText` + `FeedbackFieldError`
- `TextLabel` + `InputTextarea` + `TextCaption` + `FeedbackFieldError`
- `TextLabel` + `InputPassword` + `ActionIconButton` + `FeedbackFieldError`
- `TextLabel` + `InputSelect` + `FeedbackFieldError`

These are the same concept — a labeled, accessible form control with validation — with completely different atomic compositions. In chemistry, they would be four different molecules. In interface design, they are **one pattern with configurable slots**.

The chemistry metaphor makes you think identity comes from specific ingredients. In interface design, identity comes from the **pattern** — the slot structure — not the ingredients filling those slots.

---

### The Correct Paradigm: Formal Systems

When you replace "Atom" with "Primitive," you do not perform a word swap. You perform a **paradigm swap**.

**Atom** comes from Greek *atomos* — uncuttable. The metaphor is physical. Matter. Stuff. Things that combine like building blocks. The entire Atomic Design mental model flows from this: you are assembling physical objects into larger physical objects.

**Primitive** comes from mathematics and computer science. A primitive is the simplest irreducible unit of a formal system. It does not combine physically — it **composes logically**. Primitives exist within a type system. They have contracts. They have defined inputs and outputs. They relate to each other through formal rules.

The new paradigm simultaneously invokes three ideas:

- **Type theory** — primitives are typed, with defined domains, operations, and composition rules
- **Formal grammar** — primitives are terminal symbols; the layer above is production rules, not molecules
- **Axiomatic systems** — from a small number of well-chosen primitives, an entire universe is derived. Euclid derived all of geometry from three primitives and five axioms.

This is what "universal" actually means: not "covers many cases," but **formally generative** — capable of producing any valid interface from a finite set of primitives and composition rules.

---

### The Five Layers

Each layer transition is a **phase change** — something categorically new appears that did not exist below it.

| Layer | Name | Replaces | What It Is |
|---|---|---|---|
| 1 | **Primitives** | Atoms | Terminal symbols. Typed. Axiomatic. |
| 2 | **Constructions** | Molecules | Slot-grammar patterns with emergent meaning. |
| 3 | **Compositions** | Organisms | Domain-aware expressions of Constructions. |
| 4 | **Layouts** | Templates | Spatial constraint systems for named regions. |
| 5 | **Instances** | Pages | A Layout materialized with real content and data. |

| Transition | What Appears | Test |
|---|---|---|
| 1 → 2 | Slot relationships | Can atoms combine with a slot contract? |
| 2 → 3 | Domain context | Does it only exist in certain product types? |
| 3 → 4 | Spatial grammar | Does it define regions rather than fill them? |
| 4 → 5 | Real content | Is it materialized with actual data? |

---

## Part II — Layer 1: Primitives

**80 total · Terminal symbols · Typed contracts · Axiomatic**

### Definition

A Primitive is an interface element that satisfies all four of the following laws simultaneously. Fail any one law — not a Primitive.

| Law | Statement |
|---|---|
| **Indivisibility** | Remove any part and the element stops functioning. Not "it looks simpler" — it breaks. |
| **Non-derivability** | Cannot be composed from other Primitives in the same system. If it can, it is a Construction. |
| **Universal reoccurrence** | Appears in virtually every interface category: SaaS, e-commerce, blog, app, dashboard. |
| **Semantic irreducibility** | Carries exactly one semantic role. Two roles means two Primitives. |

### The Three Axes

Every Primitive is locatable on three orthogonal axes. These are metadata — they do not determine cluster membership, but enable filtering and architectural reasoning.

| Axis | Poles | What It Describes |
|---|---|---|
| **Axis 1 — Semantic Role** | Content ↔ Structure | Does it carry authored meaning, or organize other elements? |
| **Axis 2 — Interaction Contract** | Inert ↔ Transactional | Does it respond to user input and mutate state? |
| **Axis 3 — Temporal Existence** | Persistent ↔ Ephemeral | Does it exist continuously, or only during a conditional lifecycle? |

---

### Cluster 01 — Content Primitives
*Content · Inert · Persistent*

These Primitives ARE the meaning. They carry authored information and map directly to HTML semantics and ARIA roles.

| Primitive | Description | Axes |
|---|---|---|
| `TextHeading` | Hierarchical section title. Level (h1–h6) is a prop, not a separate Primitive. | Content · Inert |
| `TextBody` | Paragraph prose block. The default reading unit. | Content · Inert |
| `TextCaption` | Subordinate annotation. Shorter and dimmer than body. | Content · Inert |
| `TextLabel` | Identifies a UI control. Paired via for/id or aria-labelledby. | Content · Inert |
| `TextLink` | Inline navigational text. Semantic anchor without button role. | Content · Responsive |
| `TextCode` | Inline monospace code fragment within prose. | Content · Inert |
| `TextBlockquote` | Attributed external quotation with cite semantics. | Content · Inert |
| `TextHighlight` | Inline marked text span. Maps to HTML mark element. | Content · Inert |
| `TextKbd` | Keyboard shortcut or key combination display. | Content · Inert |
| `TextListItem` | Single item within an ordered or unordered list. | Content · Inert |

---

### Cluster 02 — Media Primitives
*Content · Inert→Responsive · Persistent*

Non-text content Primitives. Each carries information through a distinct medium. `MediaIcon` is separate from text because icons communicate through visual glyph recognition — a different cognitive contract from character reading.

| Primitive | Description | Axes |
|---|---|---|
| `MediaImage` | Raster image with src, alt, and loading semantics. | Content · Inert |
| `MediaIcon` | Single SVG glyph from a unified icon system. | Content · Inert |
| `MediaAvatar` | User identity: image with initials fallback. Distinct semantic role from MediaImage. | Content · Inert |
| `MediaVideo` | Video player with native controls surface. | Content · Responsive |
| `MediaAudio` | Audio player with native controls surface. | Content · Responsive |
| `MediaSVG` | Inline SVG illustration or diagram, accessible with title. | Content · Inert |
| `MediaEmbed` | Third-party iframe content — maps, widgets, documents. | Content · Inert |
| `MediaCanvas` | Programmatic drawing surface. No semantic content of its own. | Structure · Inert |
| `MediaLottie` | JSON-driven vector animation frame. Animated illustration. | Content · Inert |
| `MediaColorSwatch` | Single color specimen. Communicates a color value as content. | Content · Inert |

---

### Cluster 03 — Structure Primitives
*Structure · Inert · Persistent*

These Primitives have no content of their own. They organize other Primitives in space. Invisible to screen readers as content but constitute the scaffolding on which all layout rests. Critical distinction from Surface Primitives: Structure Primitives carry **zero visual identity**.

| Primitive | Description | Axes |
|---|---|---|
| `LayoutBox` | Generic block container. The universal layout Primitive. | Structure · Inert |
| `LayoutStack` | Vertical or horizontal flex sequence with uniform gap. | Structure · Inert |
| `LayoutGrid` | CSS grid container with configurable tracks and gaps. | Structure · Inert |
| `LayoutContainer` | Max-width constrained, horizontally centered page wrapper. | Structure · Inert |
| `LayoutDivider` | Semantic separator line (hr). Orientation is a prop. | Structure · Inert |
| `LayoutSpacer` | Explicit whitespace unit. Absorbs flex or grid space. | Structure · Inert |
| `LayoutAspectRatio` | Enforces a W:H ratio regardless of content or container. | Structure · Inert |
| `LayoutScrollArea` | Overflow-scroll container with custom scrollbar slot. | Structure · Inert |
| `LayoutTableRow` | Table row. The atomic unit of tabular structure. | Structure · Inert |
| `LayoutTableCell` | Table cell (td/th). Carries scope and colspan semantics. | Content · Inert |

---

### Cluster 04 — Surface Primitives
*Structure→Content · Inert→Responsive · Persistent*

The inflection point between pure layout and visual design. A Surface is structure that also carries visual identity: elevation, background, border, shape. Where `LayoutBox` has no visual presence, a Surface always does. **Themes live in Surfaces, not Layout Primitives.**

| Primitive | Description | Axes |
|---|---|---|
| `SurfaceCard` | Elevated bounded container. The canonical content grouping unit. | Structure · Inert |
| `SurfacePanel` | Flat-elevation surface. Page sections or sidebar panes. | Structure · Inert |
| `SurfaceHeader` | Semantically marked page or section header surface. | Structure · Inert |
| `SurfaceFooter` | Semantically marked page or section footer surface. | Structure · Inert |
| `SurfaceCode` | Monospace code block surface with syntax region semantics. | Content · Inert |
| `SurfaceChip` | Compact labeled token. Carries a single categorical value. | Content · Responsive |
| `SurfaceBadge` | Non-interactive count or status label attached to a parent. | Content · Inert |
| `SurfaceTag` | Closeable metadata label. Like Chip but dismissable. | Content · Responsive |
| `SurfaceAccordionPanel` | Collapsible content region with header and body slot structure. | Structure · Responsive |
| `SurfaceTableHeader` | Sortable column header. Distinct from TableCell semantically. | Structure · Responsive |

---

### Cluster 05 — Input Primitives
*Content · Transactional · Persistent*

Primitives that receive and hold **value state** from the user. Their defining contract: they have a value property that persists between interactions. This is what separates them from Action Primitives — Input Primitives **store state**, Action Primitives **fire events**.

| Primitive | Description | Axes |
|---|---|---|
| `InputText` | Single-line text entry. The type prop handles email, url, search, tel — these are not separate Primitives. | Content · Transactional |
| `InputPassword` | Masked text entry with reveal toggle slot. | Content · Transactional |
| `InputNumber` | Numeric entry with min, max, step. Semantically distinct from InputText. | Content · Transactional |
| `InputTextarea` | Multi-line text entry with resize behavior. | Content · Transactional |
| `InputFile` | File selection trigger. Holds FileList value state. | Content · Transactional |
| `InputCheckbox` | Binary or tri-state boolean selector. Holds checked value. | Content · Transactional |
| `InputRadio` | Single-select within a named group. Holds selection value. | Content · Transactional |
| `InputSwitch` | Binary toggle. Same semantic role as Checkbox, different affordance. | Content · Transactional |
| `InputSlider` | Range selector along a track. Holds numeric value. | Content · Transactional |
| `InputSelect` | Native dropdown selector. Holds option value. | Content · Transactional |

---

### Cluster 06 — Action Primitives
*Structure · Transactional · Persistent*

Primitives whose sole purpose is to **fire an event**. They do not hold value state. The test: after the user interacts, does the Primitive hold any changed value? If yes — Input. If no — Action. This distinction separates Button from Checkbox permanently.

| Primitive | Description | Axes |
|---|---|---|
| `ActionButton` | Primary event trigger. The universal call-to-action surface. | Structure · Transactional |
| `ActionIconButton` | Button with icon content only. Requires aria-label. | Structure · Transactional |
| `ActionToggleButton` | Stateful button with pressed/unpressed state. Does not hold form value. | Structure · Transactional |
| `ActionSegmentItem` | Single item within a segmented control group. | Structure · Transactional |
| `ActionStepperButton` | Increment or decrement trigger. Paired with InputNumber. | Structure · Transactional |
| `ActionMenuTrigger` | Opener for dropdown or context menus. aria-haspopup. | Structure · Transactional |
| `ActionDragHandle` | Initiates drag-and-drop. Mousedown or pointerdown only. | Structure · Transactional |
| `ActionResizeHandle` | Initiates panel resize via pointer delta. | Structure · Transactional |
| `ActionCopyButton` | Writes content to clipboard. Distinct pattern from navigation. | Structure · Transactional |
| `ActionFAB` | Floating primary action. Fixed-position trigger with elevated z-index. | Structure · Transactional |

---

### Cluster 07 — Feedback Primitives
*Content · Inert · Persistent*

System-to-user communication Primitives. They reflect system state — they do not carry authored content. Their defining property is **reactivity**: they exist because something in the system changed, not because an author placed them.

| Primitive | Description | Axes |
|---|---|---|
| `FeedbackSpinner` | Indeterminate loading indicator. Signals ongoing async work. | Content · Inert |
| `FeedbackProgressTrack` | Container rail for linear progress. Holds no value itself. | Structure · Inert |
| `FeedbackProgressFill` | Determinate fill layer within a ProgressTrack. Width is value-driven. | Content · Inert |
| `FeedbackProgressCircle` | Circular determinate progress. SVG stroke-dashoffset driven. | Content · Inert |
| `FeedbackStatusDot` | Smallest system state signal. Color encodes status semantics. | Content · Inert |
| `FeedbackStatusIcon` | Icon-level status signal. Variants: success, warning, error, info. | Content · Inert |
| `FeedbackSkeleton` | Shape-preserving loading placeholder. Shape prop: text, block, circle. | Structure · Inert |
| `FeedbackMeter` | Bounded scalar value display — storage, strength. HTML meter semantics. | Content · Inert |
| `FeedbackPulseRing` | Radial attention pulse. Signals live or active system state. | Content · Inert |
| `FeedbackFieldError` | Inline validation error text. aria-live, linked to input by id. | Content · Inert |

---

### Cluster 08 — Ephemeral Primitives
*Structure→Content · Inert→Transactional · Ephemeral*

Primitives that exist outside normal document flow. Their primary design contract is **conditional existence**: entering, positioning relative to an anchor, and exiting. The Temporal axis cleanly separates every element here from its persistent equivalent.

| Primitive | Description | Axes |
|---|---|---|
| `OverlayScrim` | Full-screen dimming layer behind modals. Blocks interaction below. | Structure · Ephemeral |
| `OverlayPositioner` | Anchor-relative floating container. Handles placement and flip logic. | Structure · Ephemeral |
| `OverlayArrow` | Directional caret on positioned overlays. Separately themed element. | Structure · Ephemeral |
| `OverlayTooltipBubble` | Non-interactive hover label surface. role="tooltip". | Content · Ephemeral |
| `OverlayPopoverSurface` | Focusable floating content surface. Triggered by ActionMenuTrigger. | Structure · Ephemeral |
| `OverlayMenuSurface` | Dropdown or context menu container. role="menu". | Structure · Ephemeral |
| `OverlayDialogSurface` | Modal dialog container. role="dialog" with focus trap. | Structure · Ephemeral |
| `OverlayDrawerSurface` | Side-anchored slide-in panel surface. role="dialog". | Structure · Ephemeral |
| `OverlayToastShell` | Ephemeral notification container. Auto-dismisses with aria-live. | Content · Ephemeral |
| `OverlaySheetGrabber` | Bottom sheet drag handle. Initiates vertical pan gesture. | Structure · Ephemeral |

---

## Part III — Layer 2: Constructions

**47 total · Slot grammar patterns · Emergent meaning**

### Definition

A Construction is a **pattern with a slot contract**. It has a defined slot structure, slot constraints, and emergent meaning — something the individual Primitives do not have alone.

The linguistic insight: just as `[Subject] [Verb] [Object]` exists independently of which words fill the slots, a `FormField` exists independently of which specific Input Primitive fills the control slot. Identity belongs to the **pattern**, not the ingredients.

| Law | Statement |
|---|---|
| **Slot necessity** | Every slot is load-bearing. Remove one and the Construction breaks or collapses to a Primitive. |
| **Non-reducibility** | The emergent meaning cannot be produced by any single Primitive. |
| **Universal reuse** | Appears across SaaS, e-commerce, blog, app. Domain-specific → belongs in Compositions. |
| **Semantic singularity** | One interaction concept only. Two concepts = two Constructions = a Composition. |

### Three Sub-Layers

| Sub-Layer | Name | Engineering Pattern |
|---|---|---|
| **2A** | Assemblies | Props + Slot composition. No shared state between Primitives. |
| **2B** | Controllers | Context + Reducer. Controller owns state. Primitives are consumers. |
| **2C** | Bridges | floating-ui + Portal. Anchor + Positioner + floating surface. |

---

### 2A — Assemblies (22)

Primitives combined via slot roles. No shared state. The meaning emerges from the arrangement.

**Test:** Can you build it with pure props drilling and named slots, zero shared state? Yes → Assembly. Primitives need to know each other's state → Controller. Need different DOM locations → Bridge.

| Construction | Description | Slot Recipe |
|---|---|---|
| `FormField` | Labeled accessible form control with validation | `TextLabel` + `[any Input]` + `TextCaption?` + `FeedbackFieldError?` |
| `InputWithAdornment` | Text input with prefix or suffix slot | `LayoutBox` + `MediaIcon\|TextCaption` + `InputText` + `ActionIconButton?` |
| `SearchBar` | Search input with icon and clearable state | `LayoutBox` + `MediaIcon` + `InputText[search]` + `ActionIconButton[clear]?` |
| `AvatarWithLabel` | User identity with name and secondary line | `MediaAvatar` + `LayoutStack[TextBody + TextCaption?]` |
| `ButtonWithIcon` | Action button with leading or trailing icon | `ActionButton` + `MediaIcon[leading\|trailing]` |
| `MetricCard` | Single KPI: label, value, trend | `SurfaceCard` + `TextCaption` + `TextHeading` + `FeedbackStatusIcon?` |
| `StatBadge` | Compact number and label pair | `SurfaceBadge` + `FeedbackStatusDot?` + `TextCaption` |
| `BreadcrumbTrail` | Ordered navigation ancestry path | `LayoutStack[row]` + `[TextLink + LayoutDivider][×N]` |
| `PaginationBar` | Page navigation with prev, next, numbers | `ActionIconButton[prev]` + `ActionButton[×N]` + `ActionIconButton[next]` |
| `TabStrip` | Horizontal tab navigation bar | `LayoutStack[row, tablist]` + `ActionToggleButton[×N]` + `SurfaceBadge?` |
| `CodeBlock` | Syntax-highlighted code with copy action | `SurfaceCode` + `TextCode` + `ActionCopyButton` |
| `MediaWithCaption` | Image or video with semantic caption | `LayoutStack` + `MediaImage\|MediaVideo` + `TextCaption[figcaption]` |
| `TagGroup` | Wrapping collection of dismissible tags | `LayoutBox[flex-wrap]` + `SurfaceTag[×N]` |
| `AlertBanner` | Full-width inline status message | `SurfacePanel` + `FeedbackStatusIcon` + `TextBody` + `ActionButton?` + `ActionIconButton[dismiss]?` |
| `SkeletonCard` | Loading placeholder matching card footprint | `SurfaceCard` + `FeedbackSkeleton[circle]` + `FeedbackSkeleton[text×2]` + `FeedbackSkeleton[block]` |
| `EmptyState` | Zero-content placeholder with CTA | `LayoutStack[centered]` + `MediaSVG\|MediaLottie` + `TextHeading` + `TextBody` + `ActionButton?` |
| `KeyValueRow` | Single label–value pair for detail lists | `LayoutStack[row, space-between]` + `TextCaption[key]` + `TextBody\|SurfaceBadge[value]` |
| `SectionHeader` | Titled section with subtitle and action slot | `LayoutStack[row]` + `LayoutStack[TextHeading + TextCaption?]` + `ActionButton?` |
| `NavItem` | Sidebar or menu navigation link with icon | `ActionButton[role=link]` + `MediaIcon` + `TextBody` + `SurfaceBadge?` |
| `StepIndicator` | Linear multi-step progress display | `LayoutStack[row]` + `[SurfaceBadge + TextCaption + LayoutDivider][×N]` |
| `ProgressWithLabel` | Linear progress with percentage label | `LayoutStack` + `LayoutStack[row][TextCaption + TextCaption]` + `FeedbackProgressTrack` + `FeedbackProgressFill` |
| `InlineError` | Icon and message error display | `LayoutStack[row]` + `FeedbackStatusIcon[error]` + `TextBody` |

---

### 2B — Controllers (14)

Primitives governed by a shared state machine. The Primitives are broken without the Controller. The Controller is invisible — pure logic.

**Test:** Do the Primitives need to know each other's state to function correctly? Yes → Controller.

| Construction | Description | Slot Recipe + Behavior |
|---|---|---|
| `RadioGroup` | Mutually exclusive InputRadio selection | `Controller[name, value]` + `FormField[×N wrapping InputRadio]` · Roving tabindex |
| `CheckboxGroup` | Multi-select with optional indeterminate parent | `Controller[values[]]` + `InputCheckbox[parent, tri-state]` + `InputCheckbox[×N]` |
| `TabController` | Manages TabStrip selection and panel visibility | `Controller[activeTab]` + `TabStrip[Assembly]` + `SurfaceAccordionPanel[×N, tabpanel]` |
| `AccordionGroup` | Expandable panels with single or multi mode | `Controller[openPanels[], mode]` + `SurfaceAccordionPanel[×N]` · Arrow + Enter keyboard |
| `SegmentedControl` | Single-select exclusive button group | `Controller[value]` + `LayoutStack[row, group]` + `ActionSegmentItem[×N]` |
| `RatingInput` | Star rating with hover preview state | `Controller[value, hoverValue]` + `LayoutStack[row]` + `ActionToggleButton[star ×N]` |
| `SliderRange` | Dual-thumb range selector | `Controller[low, high]` + `FeedbackProgressTrack` + `InputSlider[×2]` · low ≤ high always |
| `FileUploadZone` | Drag-and-drop upload with file list state | `Controller[files[], dragActive]` + `LayoutBox[dropzone]` + `InputFile[hidden]` + `TagGroup` |
| `StepperInput` | Number input governed by stepper actions | `Controller[value, min, max, step]` + `ActionStepperButton[−]` + `InputNumber` + `ActionStepperButton[+]` |
| `SortableList` | Drag-to-reorder list with position tracking | `Controller[items[], onReorder]` + `LayoutStack` + `[item + ActionDragHandle][×N]` |
| `PinInput` | OTP entry with auto-advance focus flow | `Controller[value[], length]` + `InputText[×N, maxLength=1]` · paste-split, backspace-retreat |
| `ToggleGroup` | Multi or single select toggle button set | `Controller[value\|values[], mode]` + `LayoutStack[group]` + `ActionToggleButton[×N]` |
| `ColorPicker` | HSV selection with hex input sync | `Controller[hsv, hex]` + `MediaCanvas[gradient]` + `InputSlider[hue]` + `InputSlider[alpha]` + `FormField[hex]` |
| `TreeView` | Recursive expand/collapse with selection | `Controller[expandedIds[], selectedId]` + `TreeNode[recursive: ActionToggleButton + NavItem + children?]` |

---

### 2C — Bridges (11)

Two or more Primitives in an anchor/portal relationship, rendered in different DOM locations. A Bridge component owns the anchor reference, show/hide state, and positioning logic. Neither Primitive knows about the other directly.

**Test:** Do the Primitives render in different DOM locations? Does positioning logic connect them? Remove the Bridge — do you have two unrelated Primitives? Then it's a Bridge.

| Construction | Description | Slot Recipe |
|---|---|---|
| `Tooltip` | Hover/focus non-interactive label on any Primitive | `Bridge[anchor, hover/focus]` + `[trigger, aria-describedby]` + `OverlayPositioner` + `OverlayArrow` + `OverlayTooltipBubble` |
| `Popover` | Click-triggered focusable floating panel | `Bridge[anchor, open, onClose]` + `ActionMenuTrigger` + `OverlayPositioner` + `OverlayPopoverSurface[dialog]` |
| `Dropdown` | Select-style overlay with navigable option list | `Bridge[anchor, value, onChange]` + `ActionMenuTrigger\|InputText` + `OverlayPositioner` + `OverlayMenuSurface[listbox]` |
| `ContextMenu` | Right-click menu anchored to pointer position | `Bridge[pointer coords, contextmenu event]` + `OverlayPositioner[anchor=pointer]` + `OverlayMenuSurface[menu]` |
| `Combobox` | Text input with filtered suggestion overlay | `Bridge[query, suggestions[]]` + `FormField[InputText, aria-autocomplete]` + `OverlayPositioner` + `OverlayMenuSurface[listbox]` |
| `HoverCard` | Hover-triggered rich preview card | `Bridge[anchor, hover+delay]` + `[trigger]` + `OverlayPositioner` + `OverlayPopoverSurface[complementary]` |
| `MenuButton` | Button that opens a keyboard-navigable command menu | `Bridge[anchor, open]` + `ActionMenuTrigger[aria-haspopup=menu]` + `OverlayPositioner` + `OverlayMenuSurface[menu]` |
| `Toast` | Auto-dismissing ephemeral notification | `Bridge[duration, queue]` + `OverlayPositioner[fixed corner]` + `OverlayToastShell[aria-live]` + `FeedbackStatusIcon` + `TextBody` |
| `Modal` | Focus-trapped dialog over scrim | `Bridge[open, onClose, returnFocus]` + `OverlayScrim` + `OverlayDialogSurface[dialog]` + FocusTrap + scroll-lock |
| `Drawer` | Side-anchored slide-in focus-trapped panel | `Bridge[open, side, onClose]` + `OverlayScrim` + `OverlayDrawerSurface` + FocusTrap |
| `CommandPalette` | Global ⌘K search and command overlay | `Bridge[open on ⌘K, query, commands[]]` + `OverlayScrim` + `OverlayDialogSurface` + `SearchBar` + `OverlayMenuSurface` |

---

## Part IV — Reference Summary

### Complete Inventory

| Layer | Count | Purpose |
|---|---|---|
| **L1 Primitives** | 80 | Terminal symbols. Indivisible, typed, universal, semantically singular. |
| **L2A Assemblies** | 22 | Slot composition. No shared state. Props and named slots. |
| **L2B Controllers** | 14 | Shared state machine. Context + Reducer. Primitives are consumers. |
| **L2C Bridges** | 11 | Anchor/portal relationships. floating-ui + Portal. |
| **L3 Compositions** | TBD | Domain-aware orchestrations of Constructions. |
| **L4 Layouts** | TBD | Spatial constraint systems. Named regions. Zero content. |
| **L5 Instances** | ∞ | Layouts materialized with real content and data. |
| **Total (L1–L2)** | **127** | Every element defined, tested, and load-bearing. |

### Paradigm Comparison

| Atomic Design (Frost) | UDS (This System) | What Changed |
|---|---|---|
| Atoms | Primitives | Chemistry → Computer science. Typed contracts, not particles. |
| Molecules | Constructions (2A/2B/2C) | Fixed compounds → Slot grammars with three engineering patterns. |
| Organisms | Compositions | Biology → Formal expressions. Domain context is the test. |
| Templates | Layouts | Wireframes → Spatial constraint systems with zero content. |
| Pages | Instances | Static documents → Dynamic materializations of a Layout. |

### The Central Claim

> A design system built on a formal paradigm is **generative**: from a finite set of well-chosen Primitives and composition rules, it can produce any valid interface for any product type. This is what *universal* actually means.

**Completeness test:** If you can build any Construction you need from the 80 Primitives, the Primitive layer is complete. If you cannot, a Primitive is missing. That is the only valid reason to add to L1.

---

*Universal Design System · Version 1.0 · 2026 · Layers 3–5 specified separately*

---

## Part V — Layer 0: Asset Foundations

**The layer beneath Primitives. Not components — decisions.**

Layer 0 is not part of the component hierarchy. It defines the raw material that Primitives are built on top of. Every project using UDS makes these decisions once, at the start, and the rest of the system inherits them.

There are four asset foundations:

| Foundation | What It Is | Primitive Layer Dependency |
|---|---|---|
| **Icon Library** | The SVG glyph set that populates `MediaIcon` | Cluster 02 — Media Primitives |
| **Type Scale** | The font family and size ramp that populates all Text Primitives | Cluster 01 — Content Primitives |
| **Color Tokens** | The semantic color decisions (brand, surface, status, text) | Cluster 04 — Surface Primitives |
| **Spacing Scale** | The spacing unit ramp used by all Layout Primitives | Cluster 03 — Structure Primitives |

These are not Primitives. They cannot be composed into Constructions. They are the values that Primitives reference.

---

### Icon Library — Default: Phosphor Icons

The `MediaIcon` Primitive is **icon-library agnostic**. It defines the contract — a single SVG glyph with a semantic name, a size prop, and an accessible label — not the specific glyph set. The library is a project-level asset decision.

**Default library: [Phosphor Icons](https://phosphoricons.com)**

| Property | Value |
|---|---|
| License | MIT — free for commercial use, no attribution required |
| Library size | ~7,000 icons |
| Weights | Thin, Light, Regular, Bold, Fill, Duotone (6 per icon) |
| Formats | SVG, React, Vue, Vanilla JS web components |
| Maintained by | Community — actively maintained as of 2026 |

**Why Phosphor as the UDS default:**

- **Scale** — 7,000 icons covers virtually every UI need across SaaS, e-commerce, dashboards, and marketing without gaps
- **Weight variants** — six weights per icon means the same glyph adapts to both a lightweight marketing site and a dense data-heavy SaaS UI without switching libraries
- **Visual neutrality** — carries no platform fingerprint. Material reads as Google. SF Symbols reads as Apple. Phosphor reads as nothing, which is correct for a universal system
- **MIT license** — no usage restrictions, no attribution wall, no licensing complexity at scale
- **Consistent geometry** — all icons share the same underlying grid and corner radius logic, which means mixed icon usage never looks inconsistent

**Alternative libraries and when to choose them:**

| Library | Icons | License | Best For |
|---|---|---|---|
| Google Material Symbols | 3,000+ | Apache 2.0 | Projects already in the Material ecosystem; variable font weight control |
| Lucide | ~1,400 | MIT | Clean minimal SaaS; consistent stroke; smaller footprint |
| Heroicons | ~300 | MIT | Tailwind-based projects; limited set but exceptional quality |
| Tabler Icons | 5,000+ | MIT | High icon-count needs; consistent stroke; neutral aesthetic |
| Remix Icon | 2,800+ | Apache 2.0 | Line + fill pairs needed; neutral aesthetic |

**The rule:** whichever library a project chooses, it satisfies the `MediaIcon` contract identically. The Primitive layer does not change. Only the asset filling it changes.

---

*Universal Design System · Version 1.0 · 2026 · Layer 0 added*