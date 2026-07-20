# Token Contract
### The Parametric Foundation of the Experience Engine

---

## What This Document Is

This is the **contract layer** of the design system. It defines every CSS custom property this project uses — what it controls semantically, its current resolved value under the Bauhaus Skin, and whether it is currently defined or still hardcoded in a component.

**The central rule:** No component at any layer may reference a visual value directly. Every color, size, shadow, border width, and timing value must be a reference to a token defined here. This is what makes the aesthetic swappable — a different Skin replaces the values in this contract without touching a single component.

**The Skin is not the system.** The Bauhaus/Applet aesthetic is one possible resolution of these token slots. The tokens are the contract. The Bauhaus values are one answer to that contract.

**Scope note:** this document covers the **value tier** only — concrete colors, sizes, and timings. Structural/variant choices (does a border render at all, hard-offset vs. blurred shadows, motif on/off) are a separate tier, defined in `Skin_System.md`. Read that document before creating a second skin — the "change values, nothing else changes" claim below only holds within this tier.

---

## Status Legend

| Status | Meaning |
|---|---|
| `DEFINED` | Token exists in `index.css` and is used correctly |
| `HARDCODED` | Value exists in a component as a literal — needs to move here |
| `DEAD` | Referenced in a style file but never defined anywhere |
| `GAP` | Concept exists implicitly but has no token at all |

---

## Token Schema

### 01 — Surface Colors
*The backgrounds that content sits on.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--color-surface-base` | Primary app background | `#F7F4EB` | DEFINED |
| `--color-surface-elevated` | Slightly elevated surfaces, hover states | `#EFEBDF` | DEFINED |
| `--color-surface-soft` | Subdued fill inside cards or wells | `#FAF8F2` | DEFINED |
| `--color-surface-inverse` | Dark/inverted surface | `#1C1A22` | DEFINED |

---

### 02 — Ink Colors
*The foreground text and rule colors.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--color-ink-base` | Primary text and borders | `#191919` | DEFINED |
| `--color-ink-subtle` | Secondary text, labels | `#4D4D4D` | DEFINED |
| `--color-ink-whisper` | Muted/placeholder text | `#8C8C8C` | DEFINED |

---

### 03 — Palette Colors
*Vivid mid-tones used for titlebar backgrounds, badges, and semantic highlights. Part of the Bauhaus aesthetic identity.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--color-coral` | Warm pink — header/accent | `#FF9EBB` | DEFINED |
| `--color-coral-deep` | Coral pressed/shadow state | `#E386A2` | DEFINED |
| `--color-mint` | Green — success, active | `#C6EE71` | DEFINED |
| `--color-mint-deep` | Mint pressed/shadow state | `#AAD05C` | DEFINED |
| `--color-sky` | Teal — focus ring, sky tones | `#9AE2D8` | DEFINED |
| `--color-sky-deep` | Sky pressed/shadow state | `#7FC0B6` | DEFINED |
| `--color-butter` | Yellow — warmth, highlight | `#F9E56C` | DEFINED |
| `--color-butter-deep` | Butter pressed/shadow state | `#DEC956` | DEFINED |
| `--color-periwinkle` | Purple — primary action | `#C8B2F8` | DEFINED |
| `--color-periwinkle-deep` | Periwinkle pressed/shadow | `#AC96DB` | DEFINED |
| `--color-lilac` | Light purple — soft accent | `#DCCDF9` | DEFINED |

---

### 04 — Semantic/State Colors
*System communication — not decorative.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--color-theme-accent` | Primary brand accent | `#FF9EBB` | DEFINED |
| `--color-theme-accent-hover` | Accent hover/active state | `#E386A2` | DEFINED |
| `--color-success` | Positive state | `→ --color-mint` | DEFINED |
| `--color-warning` | Caution state | `#FFB84D` | DEFINED |
| `--color-error` | Destructive/failure state | `#E8554A` | DEFINED |
| `--color-rule` | Divider/separator lines | `→ --color-ink-base` | **BROKEN** — `index.css` defines it as `var(--color-ink)`, which does not exist (should be `var(--color-ink-base)`). Currently resolves to nothing. |
| `--color-rule-soft` | Subtle dividers | `#E0D9C6` | DEFINED |
| `--color-focus` | Focus ring color | `→ --color-sky` | GAP — `:focus-visible` in `index.css` hardcodes `var(--color-sky)` directly instead of through a semantic `--color-focus` indirection |

---

### 05 — Slot Machine Colors
*The tactile "slot machine" UI used in BentoHeader, BentoSkills, and skill displays. A distinct visual motif of the Bauhaus Skin.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--color-slot-casing` | Outer slot housing — the deep surround | `#E2D4C1` | DEFINED |
| `--color-slot-surface` | Inner slot floor — the lighter surface | `#F4ECE1` | DEFINED |
| `--color-slot-text` | Text color inside slot displays | `#2D2A26` | DEFINED |

> These three colors define the "physical hardware" feel of the Bauhaus Skin. A different Skin would change them entirely (e.g. dark OLED slots would be `#1A1A1A` / `#2D2D2D`).

---

### 06 — Typography
*Font families. Sizes are defined per-component tier below.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--font-display` | Headings, UI labels, buttons | `'Space Grotesk', sans-serif` | DEFINED |
| `--font-body` | Prose, descriptions, running text | `'Outfit', sans-serif` | DEFINED |
| `--font-mono` | Technical labels, dates, tags, code | `'JetBrains Mono', monospace` | DEFINED |

---

### 07 — Font Sizes
*Explicit size tokens for the label tiers used across the system.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--text-label` | Standard mono label (applet titlebar, badges) | `11px` | DEFINED — note: actual token name is `--text-label`, not `--font-size-label` as this doc previously implied. Naming convention drift — reconcile the next time this category is touched. |
| `--text-label-sm` | Compact mono label (slot text, skill names) | `10px` | DEFINED — same naming note as above |
| `--font-size-body-sm` | Small body text | `15px` | HARDCODED — `text-[15px]` in Button.tsx |
| `--font-size-body` | Base body size | `17px` | HARDCODED — literal `font-size: 17px` on html/body in index.css |

> The Tailwind `text-sm` / `text-base` scale is insufficient for this system's precision. Define explicit tokens for the two still-hardcoded rows, and reconcile naming (`--text-*` vs `--font-size-*`) across all four.

---

### 08 — Spacing Scale

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--spacing-xs` | Micro gap — icon-to-label, tight pairs | `4px` | DEFINED |
| `--spacing-sm` | Small gap — intra-component | `8px` | DEFINED |
| `--spacing-md` | Standard gap — between elements | `16px` | DEFINED |
| `--spacing-lg` | Section padding — card internals | `24px` | DEFINED |
| `--spacing-xl` | Large gap — between cards or sections | `32px` | DEFINED |

---

### 09 — Border Radius

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--radius-xs` | Micro radius — tight chips | `4px` | DEFINED |
| `--radius-sm` | Small radius — tags, badges | `6px` | DEFINED |
| `--radius-md` | Standard radius — buttons | `8px` | DEFINED |
| `--radius-lg` | Card/window radius — the Applet standard | `12px` | DEFINED |
| `--radius-pill` | Full pill — for pill-shaped elements | `9999px` | DEFINED |
| `--radius-slot` | Slot machine roundness — icon slots in bento | `22px` | DEFINED |

---

### 10 — Border Widths
*The most critical un-tokenized concept. Border thickness IS the Bauhaus aesthetic.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--border-width-sm` | Standard component border | `2px` | HARDCODED — `border-2` across all components |
| `--border-width-md` | Primary/featured component border | `3px` | HARDCODED — `border-[3px]` in WindowCard primary |

> `bauhaus.ts` (previously the source of a proposed `--border-width-lg` / `4px` variant) has since been deleted from the codebase — see Dead File Audit below, now resolved. A Minimal Skin would use `1px` for `--border-width-sm`; a different variant could reintroduce a heavier border weight as a new row here if a skin actually needs one. Also see `Skin_System.md`'s `--border-presence` token — a skin can now turn borders off entirely, not just resize them.

---

### 11 — Shadows
*Flat offset shadows — the primary depth metaphor in the Bauhaus Skin.*

**Superseded design:** the original plan below (four escalating shadow tiers, sm→xl) has been replaced in code by a **unified single-depth system** — one `--ui-depth` value drives every raised/sunken shadow expression, rather than four independently-tuned tiers. This is a stronger fit for the parametric skin model than the original design: swapping one number (`--ui-depth`) re-tunes the entire UI's physical depth in one step, instead of requiring four coordinated edits per skin.

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--ui-depth` | The single physical depth value for the entire UI | `4px` | DEFINED |
| `--shadow-color` | Raised-shadow color | `#000000` | DEFINED |
| `--inset-color` | Sunken-shadow color | `#E4DAC4` | DEFINED |
| `--shadow-raised` | Standard raised elevation, any component | `0 var(--ui-depth) 0 0 var(--shadow-color)` | DEFINED |
| `--shadow-sunken` | Inset/pressed elevation | `inset 0 calc(var(--ui-depth) * 2) 0 0 var(--inset-color)` | DEFINED |
| `--shadow-applet-sm` / `-md` / `-lg` / `-xl` | Legacy tier names, kept for call-site compatibility | all four resolve to `0 var(--ui-depth) 0 0 var(--shadow-color)` | DEFINED, but degenerate — the four names no longer produce four different values. Any component still choosing between `-sm`/`-md`/`-lg`/`-xl` for visual differentiation is not getting one; consider migrating call sites to `--shadow-raised` directly and retiring these four names once nothing depends on the old tiering. |

> This is the token-level implementation of the two recent shadow-depth fixes ("Double sunken shadow depth to visually match raised shadow", "Fix skill slot — single emboss, remove overlapping depth trick") — those commits are what produced this unified system. `Skin_System.md`'s `--depth-style` token (Tier 2) builds on top of this: `hard-offset` uses `--shadow-raised`/`--shadow-sunken` as defined here, `soft-blur` and `none` are alternate expressions a future skin defines.

---

### 12 — Interaction Physics
*The motion parameters that give the UI its tactile feel.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--transition-defaults` | Standard easing for hover/state transitions | `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` | DEFINED |
| `--hover-transform` | Lift on hover | `translateY(-2px)` | DEFINED |
| `--active-transform` | Compress on press | `scale(0.98)` | DEFINED |
| `--press-depth` | Button active translate-y (the "key press" distance) | `→ --ui-depth` (`4px`) | DEFINED — now unified with the shadow depth system (Section 11) rather than an independent hardcoded value |
| `--press-inset-depth` | Button inset shadow offset (the "key bottom" depth) | `→ --ui-depth` (`4px`) | DEFINED — same unification |

---

### 13 — Chrome Dimensions
*Fixed measurements for structural UI chrome.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--chrome-titlebar-height` | WindowCard titlebar height | `40px` | DEFINED |
| `--chrome-navbar-height` | Fixed Navbar height (load-bearing for the scroll envelope) | `64px` | DEFINED, and confirmed in use — every `calc(100vh-...)` snap section (`App.tsx`, `Timeline.tsx`, `BacklogView.tsx`) already references `var(--chrome-navbar-height)`, not a literal. |
| `--chrome-traffic-light-size` | MacOS-style traffic light button diameter | `12px` (0.75rem / w-3) | HARDCODED — `w-3 h-3` in WindowCard |
| `--chrome-traffic-light-border` | Traffic light button border width | `1.5px` | DEFINED |
| `--chrome-icon-slot-size` | Skill/icon slot square max-width in bento | `90px` | DEFINED |
| `--chrome-icon-size` | Icon size inside skill slots | `36px` | HARDCODED — `size: 36` prop in BentoSkills |

> `--chrome-navbar-height` is especially critical — it is the root value of the `calc(100vh-64px)` envelope. Now defined in `@theme`; confirm `calc()` call sites reference the variable, not the literal.

---

### 14 — Background Texture
*The dot grid that gives the app its physical paper feel.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--texture-dot-size` | Diameter of each background dot | `1px` | DEFINED |
| `--texture-dot-gap` | Grid repeat size | `28px` | DEFINED |
| `--texture-overlay-opacity` | Semi-transparent surface overlay on dot grid | `0.96` | DEFINED |
| `--texture-stripe-width` | Width of each stripe in titlebar pattern | `2px` | DEFINED |
| `--texture-stripe-period` | Repeat period of the stripe pattern (renamed from the originally-proposed `--texture-stripe-gap`) | `8px` | DEFINED |

> `--motif-dot-texture` (Tier 2, `Skin_System.md`) governs whether this texture renders at all for a given skin; these five tokens govern its appearance when it does.

---

## Dead File Audit

### `bauhaus.ts` — Resolved
This file was flagged as non-functional (referenced undefined `shadow-bau-*` and `border-foreground` tokens) and has since been **deleted from the codebase**. No further action needed.

---

## Gap Summary

*Updated 2026-07-20. Most of the September gap list has closed since this contract was first written — several categories below were resolved by unrelated work (the `--ui-depth` unification, chrome dimensions moving into `@theme`) rather than by anyone working through this list directly. Re-verify against `index.css` before trusting old counts in the future; don't assume this doc stays accurate on its own.*

| Category | Tokens Missing | Impact |
|---|---|---|
| Border widths | 2 (`--border-width-sm`, `--border-width-md`) | Every component border is a hardcoded Tailwind class |
| Font sizes | 2 (`--font-size-body-sm`, `--font-size-body`) + naming drift on the 2 that exist (`--text-label*` vs. the `--font-size-label*` names this doc originally proposed) | Label sizes mostly tokenized; body sizes and naming consistency remain |
| Chrome dimensions | 2 (`--chrome-traffic-light-size`, `--chrome-icon-size`) | Minor — both are small, low-risk literals |
| Broken reference | 1 (`--color-rule`) | Resolves to nothing; divider styling relying on it currently falls through to inherited/browser default, not the intended ink color |
| Focus color indirection | 1 (`--color-focus`) | Cosmetic — swapping skins won't re-theme the focus ring without this |
| **Total remaining gaps** | **8** | Down from 23 at last audit |

~~Slot machine colors~~, ~~interaction physics~~, and ~~background texture~~ are fully resolved — removed from this table.

---

## The Skin Boundary

Everything above this line is the **value-tier contract** — the what. The Bauhaus Skin is the **resolution** — the how. When you create a new Skin for this project:

1. Copy the Bauhaus Skin's value-tier table (this document)
2. Copy `Skin_System.md`'s Tier 2 structural/variant table
3. Change values in both

For skins that only differ in color/size/timing, components genuinely don't change — only this document's values change. For skins that differ structurally (no borders, blurred shadows, no slot motif), the components still don't change, but the Tier 2 tokens do — see `Skin_System.md` for the full model, the runtime swap mechanism (`[data-skin="..."]`), and the sequencing plan for building a second skin without risking the first.

A second Skin (`Skin_Dark.md`, `Skin_Minimal.md`) would specify alternate values for every Tier 1 token in this table plus every Tier 2 token in `Skin_System.md`.

---

*Token Contract v1.1 · Experience Engine · 2026-07-20*
*Next: close the 8 remaining gaps in the Gap Summary above, then wire Tier 2 structural tokens per `Skin_System.md`'s sequencing plan.*
