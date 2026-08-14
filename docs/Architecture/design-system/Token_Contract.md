# Token Contract
### The Parametric Foundation of the Experience Engine

---

## What This Document Is

This is the **contract layer** of the design system. It defines every CSS custom property this project uses — what it controls semantically, its current resolved value under the Gamified Skin (`SkinContext.tsx`'s runtime default), and whether it is currently defined or still hardcoded in a component.

**The central rule:** No component at any layer may reference a visual value directly. Every color, size, shadow, border width, and timing value must be a reference to a token defined here. This is what makes the aesthetic swappable — a different Skin replaces the values in this contract without touching a single component.

**The Skin is not the system.** Gamified's aesthetic is one possible resolution of these token slots (the retired Bauhaus/Applet skin was another, before it was removed — see `Skin_System.md`'s Sequencing Plan, step 8). The tokens are the contract. The values below are one answer to that contract, not the only one — Heritage stays a second live skin with its own answer for the few tokens it genuinely diverges on (see `Skin_Heritage.md`).

**Scope note:** this document covers the **value tier** only — concrete colors, sizes, and timings. Structural/variant choices (does a border render at all, hard-offset vs. blurred shadows, motif on/off) are Tier 2, defined in `Skin_System.md`. A third tier — full component swap per project-card region, for a skin that needs a genuinely different shape, not just different values — is Tier 3, added 2026-07-21 (DR-015), also in `Skin_System.md`. Read that document before creating a second skin — the "change values, nothing else changes" claim below only holds for a skin that stays within Tier 1/2.

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

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--color-surface-base` | Primary app background | `#F6EEDC` | DEFINED |
| `--color-surface-elevated` | Slightly elevated surfaces, hover states | `#EDE0BE` | DEFINED |
| `--color-surface-soft` | Subdued fill inside cards or wells | `#FBF7EC` | DEFINED |
| `--color-surface-inverse` | Dark/inverted surface | `#241C12` | DEFINED |

---

### 02 — Ink Colors
*The foreground text and rule colors.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--color-ink-base` | Primary text and borders | `#2B2016` | DEFINED |
| `--color-ink-subtle` | Secondary text, labels | `#5C4A34` | DEFINED |
| `--color-ink-whisper` | Muted/placeholder text | `#8C7A5C` | DEFINED |

---

### 03 — Palette Colors
*Burnt-orange/olive/dusty-teal/gold/navy mid-tones used for titlebar backgrounds, badges, and semantic highlights. Formerly the Bauhaus skin's pink/mint/sky/butter/periwinkle identity — same token names, repointed to Gamified/Heritage's shared palette when Bauhaus was retired (see `Skin_System.md`'s Sequencing Plan, step 8).*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--color-coral` | Warm accent — header/accent | `#D9622F` | DEFINED |
| `--color-coral-deep` | Coral pressed/shadow state | `#B14A20` | DEFINED |
| `--color-mint` | Green — success, active | `#6C8F3E` | DEFINED |
| `--color-mint-deep` | Mint pressed/shadow state | `#506B2C` | DEFINED |
| `--color-sky` | Teal — focus ring, sky tones | `#3E7C8C` | DEFINED |
| `--color-sky-deep` | Sky pressed/shadow state | `#2C5C68` | DEFINED |
| `--color-butter` | Gold — warmth, highlight | `#F0B429` | DEFINED |
| `--color-butter-deep` | Butter pressed/shadow state | `#C98F1A` | DEFINED |
| `--color-periwinkle` | Navy — primary action | `#33415C` | DEFINED |
| `--color-periwinkle-deep` | Periwinkle pressed/shadow | `#232D40` | DEFINED |
| `--color-lilac` | Soft accent | `#DCCB9E` | DEFINED |

---

### 03.5 — Component Identity Tokens (added 2026-07-21)
*A thin indirection layer, not a new value tier: each token below is just `var(--color-*)` pointing at one of the raw palette colors above. Exists so a mockup skin can retarget one project-card component's accent without touching the shared palette (which other, unrelated consumers of e.g. `--color-periwinkle` also read) or any component file. See `Skin_System.md` §Sequencing Plan step 3.5.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--role-header-accent` | `BentoHeader`'s title pill background | `→ --color-coral` | DEFINED — consumed via `Badge`'s `accentToken` prop |
| `--role-responsibilities-accent` | `BentoResponsibilities`' titlebar background | `→ --color-periwinkle` | DEFINED — consumed via `WindowCard`'s `accentToken` prop |
| `--role-skills-accent` | `BentoSkills`' titlebar background | `→ --color-sky` | DEFINED — consumed via `WindowCard`'s `accentToken` prop |
| `--role-achievement-accent` | `BentoAchievement`'s fill background | `→ --color-butter` | DEFINED — consumed directly as `bg-[var(--role-achievement-accent)]` (not a `WindowCard`, no shared component to route through) |

> `WindowCard`/`Badge`'s original `color` enum prop (`periwinkle`/`sky`/`coral`/etc.) is untouched and still used by every other consumer (`SkillTree`, `Hero`, ...) — `accentToken` is additive, not a replacement.

---

### 04 — Semantic/State Colors
*System communication — not decorative.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--color-theme-accent` | Primary brand accent | `#D9622F` | DEFINED |
| `--color-theme-accent-hover` | Accent hover/active state | `#B14A20` | DEFINED |
| `--color-success` | Positive state | `→ --color-mint` | DEFINED |
| `--color-warning` | Caution state | `#FFB84D` | DEFINED |
| `--color-error` | Destructive/failure state | `#E8554A` | DEFINED |
| `--color-rule` | Divider/separator lines | `→ --color-ink-base` | DEFINED — fixed 2026-07-20, was referencing the undefined `var(--color-ink)` |
| `--color-rule-soft` | Subtle dividers | `#DCCB9E` | DEFINED |
| `--color-focus` | Focus ring color | `→ --color-sky` | DEFINED — `:focus-visible` in `index.css` now references `var(--color-focus)` |

---

### 05 — Slot Machine Colors
*The tactile "slot machine" UI used in BentoHeader, BentoSkills, and skill displays.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--color-slot-casing` | Outer slot housing — the deep surround | `#33415C` | DEFINED |
| `--color-slot-surface` | Inner slot floor — the lighter surface | `#24304A` | DEFINED |
| `--color-slot-text` | Text color inside slot displays | `#F6EEDC` | DEFINED |

> These three colors define the "physical hardware" feel of the active skin. A different Skin would change them entirely (e.g. dark OLED slots would be `#1A1A1A` / `#2D2D2D`).

---

### 06 — Typography
*Font families. Sizes are defined per-component tier below.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--font-display` | Headings, UI labels, buttons | `'Space Grotesk', sans-serif` | DEFINED |
| `--font-body` | Prose, descriptions, running text | `'Outfit', sans-serif` | DEFINED |
| `--font-mono` | Technical labels, dates, tags, code | `'JetBrains Mono', monospace` | DEFINED |
| `--font-hand` | Handwriting register — added 2026-07-21 (DR-019), only ever consumed by heritage's clipboard paper text | `var(--font-body)` (default; heritage overrides to `'Kalam', cursive'`) | DEFINED and wired (`skins/heritage/BentoResponsibilities.tsx`) — must be consumed via inline `style={{ fontFamily: 'var(--font-hand)' }}`, not a Tailwind arbitrary class; see `Skin_System.md`'s note on the `Text` atom's default `font-body` class winning the specificity race |

---

### 07 — Font Sizes
*Explicit size tokens for the label tiers used across the system.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--text-label` | Standard mono label (applet titlebar, badges) | `11px` | DEFINED and wired (`BentoSkills`, `Navbar`, and other mono-label call sites) — actual token name is `--text-label`, not `--font-size-label`; naming convention drift from `--font-size-*` noted but not worth a rename churn on its own |
| `--text-label-sm` | Compact mono label (slot text, skill names) | `10px` | DEFINED and wired (`BentoSkills`, `Navbar`) |
| `--font-size-body-sm` | Small body text | `15px` | DEFINED — wired into `Button.tsx`'s `md` size |
| `--font-size-body` | Base body size | `17px` | DEFINED — wired into `html, body` in `index.css` |

> The Tailwind `text-sm` / `text-base` scale is insufficient for this system's precision. All four rows now closed as of 2026-07-20.

---

### 08 — Spacing Scale

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--spacing-xs` | Micro gap — icon-to-label, tight pairs | `4px` | DEFINED |
| `--spacing-sm` | Small gap — intra-component | `8px` | DEFINED |
| `--spacing-md` | Standard gap — between elements | `16px` | DEFINED |
| `--spacing-lg` | Section padding — card internals | `24px` | DEFINED |
| `--spacing-xl` | Large gap — between cards or sections | `32px` | DEFINED |

---

### 09 — Border Radius

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--radius-xs` | Micro radius — tight chips | `4px` | DEFINED |
| `--radius-sm` | Small radius — tags, badges | `6px` | DEFINED |
| `--radius-md` | Standard radius — buttons | `10px` | DEFINED |
| `--radius-lg` | Card/window radius | `16px` | DEFINED |
| `--radius-pill` | Full pill — for pill-shaped elements | `9999px` | DEFINED |
| `--radius-slot` | Slot machine roundness — icon slots in bento | `12px` | DEFINED |

---

### 10 — Border Widths
*The most critical un-tokenized concept — border thickness is a core part of the site's tactile identity.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--border-width-sm` | Standard component border | `3px` | DEFINED — wired into every consumer (`Button`, `Card`, `Badge`, `Avatar`, `AppIcon`, `BentoAchievement`, `BentoVideoFrame`, `Navbar`, `SkillTree`, `BacklogView`) |
| `--border-width-md` | Primary/featured component border | `4px` | DEFINED — `TimelineMarker` mobile state |
| `--border-width-lg` | Heavy border — footer, TimelineMarker desktop state | `5px` | DEFINED — sourced from real usage (`App.tsx` footer, `TimelineMarker` desktop breakpoint) |

> A Minimal Skin would use `1px` for `--border-width-sm`. `BentoVideoFrame`'s 8px device-bezel border is a deliberate outlier (a device-frame effect, not a UI-card border) and was left off this scale rather than forced into it. Also see `Skin_System.md`'s `--border-presence` token — a skin can now turn borders off entirely, not just resize them.

> **Tailwind v4 gotcha (found 2026-07-21, real regression, not hypothetical):** `border-[var(--border-width-sm)]` compiles to `border-color: var(--border-width-sm)`, silently dropping border-width and border-style entirely — Tailwind can't infer the intended CSS property from a bare `var()` reference and defaults ambiguous `border-[...]` arbitrary values to color. Every border on the site rendered invisible (0-effective-width) until this was caught. **The fix, required for every border-width arbitrary value in this codebase: use the type hint, `border-[length:var(--border-width-sm)]`** (same pattern already used correctly for font sizes: `text-[length:var(--font-size-body-sm)]`). Screenshots alone did not catch this the first time — the hard-offset `shadow-raised` box-shadow visually mimics a border at a glance. Verify border fixes with `getComputedStyle(el).borderWidth`, not just a screenshot.

---

### 11 — Shadows
*Embossed layered shadows (DR-017) — the primary depth metaphor since Bauhaus's flat hard-offset shadow was retired along with the rest of that skin.*

**Superseded design:** the original plan below (four escalating shadow tiers, sm→xl) has been replaced in code by a **unified single-depth system** — one `--ui-depth` value drives every raised/sunken shadow expression, rather than four independently-tuned tiers. This is a stronger fit for the parametric skin model than the original design: swapping one number (`--ui-depth`) re-tunes the entire UI's physical depth in one step, instead of requiring four coordinated edits per skin.

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--ui-depth` | The single physical depth value for the entire UI | `4px` | DEFINED |
| `--shadow-color` | Legacy raised-shadow color, only feeds the degenerate `--shadow-applet-*` names below | `#000000` | DEFINED, but only consumed by the dead `--shadow-applet-*` names |
| `--inset-color` | Legacy sunken-shadow color, unused by the current embossed formula | `#E4DAC4` | DEFINED but unconsumed — kept as a defined fallback, not deleted |
| `--shadow-raised` | Standard raised elevation, any component | `inset 0 3px 0 0 rgba(255,246,219,0.5), inset 0 -3px 0 0 rgba(36,26,16,0.3), 0 var(--ui-depth) calc(var(--ui-depth)*3) rgba(20,14,8,0.4)` | DEFINED — must be consumed via `shadow-[var(--shadow-raised)]` or an inline style, never the bare `.shadow-raised` utility class (see `Skin_System.md`'s DR-017 correction) |
| `--shadow-sunken` | Inset/pressed elevation | `inset 0 3px 6px rgba(20,14,8,0.5), inset 0 -1px 0 0 rgba(255,246,219,0.15)` | DEFINED — same consumption caveat as `--shadow-raised` |
| `--shadow-applet-sm` / `-md` / `-lg` / `-xl` | Legacy tier names from the retired Bauhaus skin, kept only for call-site compatibility | all four resolve to `0 var(--ui-depth) 0 0 var(--shadow-color)` (the old flat hard-offset formula, not the current embossed one) | DEFINED, degenerate, and now confirmed to have zero consumers in `src/` — candidates for deletion the next time this section is touched |

> `Skin_System.md`'s `--depth-style` token (Tier 2) is the declarative label for this: `embossed` is the value both Heritage and Gamified currently resolve to; `hard-offset` was the retired Bauhaus skin's value; `soft-blur`/`none` remain alternate expressions a future skin could define.

---

### 12 — Interaction Physics
*The motion parameters that give the UI its tactile feel.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--transition-defaults` | Standard easing for hover/state transitions | `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` | DEFINED |
| `--hover-transform` | Lift on hover | `translateY(-2px)` | DEFINED |
| `--active-transform` | Compress on press | `scale(0.98)` | DEFINED |
| `--press-depth` | Button active translate-y (the "key press" distance) | `→ --ui-depth` (`4px`) | DEFINED — now unified with the shadow depth system (Section 11) rather than an independent hardcoded value |
| `--press-inset-depth` | Button inset shadow offset (the "key bottom" depth) | `→ --ui-depth` (`4px`) | DEFINED — same unification |

---

### 13 — Chrome Dimensions
*Fixed measurements for structural UI chrome.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
|---|---|---|---|
| `--chrome-navbar-height` | Fixed Navbar height (load-bearing for the scroll envelope) | `64px` | DEFINED, and confirmed in use — every `calc(100vh-...)` snap section (`App.tsx`, `Timeline.tsx`, `BacklogView.tsx`) already references `var(--chrome-navbar-height)`, not a literal. |
| `--chrome-icon-slot-size` | Skill/icon slot square max-width in bento | `90px` | DEFINED |
| `--chrome-icon-size` | Icon size inside skill slots | `36px` | DEFINED — `BentoSkills` now sizes cloned icons via `className` (`w-[var(--chrome-icon-size)] h-[var(--chrome-icon-size)]`) instead of Lucide's numeric `size` prop, so it participates in the token system |
| `--chrome-device-shell` | `BentoVideoFrame`'s device shell/hardware-button/notch color | `#191919` (literal, not `→ --color-ink-base`) | DEFINED — deliberately a hardcoded literal, not an alias. See `Skin_System.md`'s Locked Constraints: an alias would still re-resolve against an active skin at its point of use, which defeats the point of locking this frame |
| `--chrome-device-shadow` | `BentoVideoFrame`'s device shell shadow | `0 4px 0 0 #000000` (literal, not `→ --shadow-raised`) | DEFINED — same reasoning as above |

> `--chrome-navbar-height` is especially critical — it is the root value of the `calc(100vh-64px)` envelope. Now defined in `@theme`; confirm `calc()` call sites reference the variable, not the literal.

---

### 14 — Background Texture
*The dot grid that gives the app its physical paper feel.*

| Token | Semantic Purpose | Current Value (Gamified) | Status |
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

### `--chrome-titlebar-height` / `--chrome-traffic-light-size` / `--chrome-traffic-light-border` — Resolved 2026-08-11
These three existed only to serve `WindowCard`'s macOS-chrome titlebar and traffic-light dots. `WindowCard` was deleted along with the rest of the Bauhaus skin (see `Skin_System.md`'s Sequencing Plan, step 8) — these tokens had zero remaining consumers (confirmed by grep) and were removed from `src/index.css`'s `@theme` block in the same pass rather than left as orphaned declarations.

---

## Gap Summary

*Updated 2026-07-20 (second pass, same day). All 8 gaps from the first pass closed — tokens defined in `@theme` and wired into their real call sites, not just declared. One new token added along the way (`--border-width-lg`, sourced from live usage in `App.tsx`'s footer and `TimelineMarker`'s desktop state) that wasn't previously tracked at all.*

| Category | Status |
|---|---|
| Border widths | Closed — `--border-width-sm/md/lg` defined and wired into every real consumer, including several (`BacklogView`, `App.tsx` footer, `Navbar`'s `border-b`) not on the original hardcode list |
| Font sizes | Closed — `--font-size-body`/`--font-size-body-sm` defined and wired; `--text-label`/`--text-label-sm` were already defined but two consumers (`Navbar`, `BentoSkills`) were found still using raw arbitrary values instead of the token — now wired |
| Chrome dimensions | Closed — `--chrome-traffic-light-size` and `--chrome-icon-size` defined and wired (the latter required switching `BentoSkills`' icon sizing from Lucide's numeric `size` prop to a token-driven `className`) |
| Broken reference | Fixed — `--color-rule` now correctly points at `--color-ink-base` |
| Focus color indirection | Closed — `:focus-visible` now references `--color-focus` |
| **Total remaining gaps** | **0** |

One deliberate exception, not a gap: `BentoVideoFrame`'s `border-[8px]` device-bezel is a distinct visual concept (a device frame, not a UI-card border) and was left off the border-width scale intentionally rather than forced into it.

---

## The Skin Boundary

Everything above this line is the **value-tier contract** — the what. Gamified's resolution (this document's values) is the **default** — the how, for now. When you create a new Skin for this project:

1. Copy the current value-tier table (this document)
2. Copy `Skin_System.md`'s Tier 2 structural/variant table
3. Change values in both

For skins that only differ in color/size/timing, components genuinely don't change — only this document's values change. For skins that differ structurally (no borders, blurred shadows, no slot motif), the components still don't change, but the Tier 2 tokens do. For skins that need a different DOM shape entirely — not just different values or on/off structural treatment — a component's `Bento*` implementation itself can be swapped per project-card region via Tier 3's slot registry, without any of the other regions or skins changing. See `Skin_System.md` for the full model, the runtime swap mechanism (`[data-skin="..."]`), the Tier 3 slot registry, and the sequencing plan for building a second skin without risking the first.

A second Skin (`Skin_Dark.md`, `Skin_Minimal.md`) would specify alternate values for every Tier 1 token in this table plus every Tier 2 token in `Skin_System.md`.

---

*Token Contract v1.5 · Experience Engine · 2026-07-21, updated 2026-08-11 (Bauhaus retirement — see `Skin_System.md`'s Sequencing Plan, step 8)*
*Next: `header` is a deliberate no-op absorbed into the `responsibilities` clipboard for both Heritage and Gamified, `responsibilities`/`skills` have real Tier 3 adapters (Heritage's, borrowed by Gamified), `achievement` is a skin-neutral shared component (`bento/shared/BentoAchievement.tsx`). Live threads: giving Gamified its own bespoke slot adapters and making its components token-driven (see `Skin_Gamified.md` §5), and true audience-lens tab content (blocked on data authoring, not mechanism — see DECISIONS.md's Open section).*
