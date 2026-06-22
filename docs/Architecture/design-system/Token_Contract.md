# Token Contract
### The Parametric Foundation of the Experience Engine

---

## What This Document Is

This is the **contract layer** of the design system. It defines every CSS custom property this project uses — what it controls semantically, its current resolved value under the Bauhaus Skin, and whether it is currently defined or still hardcoded in a component.

**The central rule:** No component at any layer may reference a visual value directly. Every color, size, shadow, border width, and timing value must be a reference to a token defined here. This is what makes the aesthetic swappable — a different Skin replaces the values in this contract without touching a single component.

**The Skin is not the system.** The Bauhaus/Applet aesthetic is one possible resolution of these token slots. The tokens are the contract. The Bauhaus values are one answer to that contract.

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

> **Note:** `applet.ts` uses `text-ink-soft` — this class does not exist. The correct token is `text-ink-subtle`. Fix on next component pass.

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
| `--color-rule` | Divider/separator lines | `→ --color-ink-base` | DEFINED |
| `--color-rule-soft` | Subtle dividers | `#E0D9C6` | DEFINED |
| `--color-focus` | Focus ring color | `→ --color-sky` | GAP — hardcoded as literal `sky` in components |

---

### 05 — Slot Machine Colors
*The tactile "slot machine" UI used in BentoHeader, BentoSkills, and skill displays. A distinct visual motif of the Bauhaus Skin.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--color-slot-casing` | Outer slot housing — the deep surround | `#E2D4C1` | HARDCODED — `bg-[#E2D4C1]` in BentoHeader, BentoSkills |
| `--color-slot-surface` | Inner slot floor — the lighter surface | `#F4ECE1` | HARDCODED — `bg-[#F4ECE1]` in BentoHeader, BentoSkills |
| `--color-slot-text` | Text color inside slot displays | `#2D2A26` | HARDCODED — `text-[#2D2A26]` in BentoHeader, BentoSkills |

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
| `--font-size-label` | Standard mono label (applet titlebar, badges) | `11px` | HARDCODED — `text-[11px]` in applet.ts, multiple components |
| `--font-size-label-sm` | Compact mono label (slot text, skill names) | `10px` | HARDCODED — `text-[10px]` in BentoSkills |
| `--font-size-body-sm` | Small body text | `15px` | HARDCODED — `text-[15px]` in Button.tsx |
| `--font-size-body` | Base body size | `17px` | HARDCODED — literal `font-size: 17px` on html/body in index.css |

> The Tailwind `text-sm` / `text-base` scale is insufficient for this system's precision. Define explicit tokens.

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
| `--radius-slot` | Slot machine roundness — icon slots in bento | `22px` | HARDCODED — `rounded-[22px]` in BentoSkills |

---

### 10 — Border Widths
*The most critical un-tokenized concept. Border thickness IS the Bauhaus aesthetic.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--border-width-sm` | Standard component border | `2px` | HARDCODED — `border-2` across all components |
| `--border-width-md` | Primary/featured component border | `3px` | HARDCODED — `border-[3px]` in WindowCard primary |
| `--border-width-lg` | Heavy Bauhaus border (bauhaus.ts standard) | `4px` | DEAD — `border-4 border-foreground` in bauhaus.ts; `foreground` token never defined |

> A Minimal Skin would use `1px` for `--border-width-sm`. An Ultra-Bold variant might use `4px` everywhere. The Bauhaus Skin uses `2px` as the base.

---

### 11 — Shadows
*Flat offset shadows — the primary depth metaphor in the Bauhaus Skin.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--shadow-applet-sm` | Subtle elevation — small cards | `0 3px 0 0 var(--color-ink-base)` | DEFINED |
| `--shadow-applet-md` | Medium elevation — standard cards | `0 5px 0 0 var(--color-ink-base)` | DEFINED |
| `--shadow-applet-lg` | Strong elevation — windows | `0 8px 0 0 var(--color-ink-base)` | DEFINED |
| `--shadow-applet-xl` | Maximum elevation — primary featured window | `0 12px 0 0 var(--color-ink-base)` | DEFINED |
| `--shadow-bau-sm` | Bauhaus small shadow (bauhaus.ts) | — | DEAD — never defined, bauhaus.ts is broken |
| `--shadow-bau-md` | Bauhaus medium shadow (bauhaus.ts) | — | DEAD — never defined |
| `--shadow-bau-lg` | Bauhaus large shadow (bauhaus.ts) | — | DEAD — never defined |

> The `bauhaus.ts` shadow tokens are completely undefined. `bauhaus.ts` as a whole is currently non-functional. See **Dead File Audit** below.

---

### 12 — Interaction Physics
*The motion parameters that give the UI its tactile feel.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--transition-defaults` | Standard easing for hover/state transitions | `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` | DEFINED |
| `--hover-transform` | Lift on hover | `translateY(-2px)` | DEFINED |
| `--active-transform` | Compress on press | `scale(0.98)` | DEFINED |
| `--press-depth` | Button active translate-y (the "key press" distance) | `5px` | HARDCODED — `active:translate-y-[5px]` and `active:translate-y-[4px]` scattered across Button.tsx and applet.ts |
| `--press-inset-depth` | Button inset shadow offset (the "key bottom" depth) | `4px` | HARDCODED — `inset_0_-4px_0` in button variant shadows |

---

### 13 — Chrome Dimensions
*Fixed measurements for structural UI chrome.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--chrome-titlebar-height` | WindowCard titlebar height | `40px` | HARDCODED — `h-[40px]` in WindowCard |
| `--chrome-navbar-height` | Fixed Navbar height (load-bearing for the scroll envelope) | `64px` | HARDCODED — `calc(100vh-64px)` appears in multiple snap sections; no token |
| `--chrome-traffic-light-size` | MacOS-style traffic light button diameter | `12px` (0.75rem / w-3) | HARDCODED — `w-3 h-3` in WindowCard |
| `--chrome-traffic-light-border` | Traffic light button border width | `1.5px` | HARDCODED — `border-[1.5px]` in WindowCard |
| `--chrome-icon-slot-size` | Skill/icon slot square max-width in bento | `90px` | HARDCODED — `max-w-[90px]` in BentoSkills |
| `--chrome-icon-size` | Icon size inside skill slots | `36px` | HARDCODED — `size: 36` prop in BentoSkills |

> `--chrome-navbar-height` is especially critical — it is the root value of the `calc(100vh-64px)` envelope. Tokenizing it means changing the navbar height propagates everywhere automatically.

---

### 14 — Background Texture
*The dot grid that gives the app its physical paper feel.*

| Token | Semantic Purpose | Bauhaus Skin Value | Status |
|---|---|---|---|
| `--texture-dot-size` | Diameter of each background dot | `1px` | HARDCODED — literal in `index.css` body style |
| `--texture-dot-gap` | Grid repeat size | `28px` | HARDCODED — `background-size: 28px 28px` in index.css |
| `--texture-overlay-opacity` | Semi-transparent surface overlay on dot grid | `0.96` | HARDCODED — `opacity: 0.96` in index.css `body::before` |
| `--texture-stripe-gap` | Gap between stripes in titlebar stripe pattern | `8px` | HARDCODED — `transparent 2px 8px` in WindowCard inline style |
| `--texture-stripe-width` | Width of each stripe in titlebar pattern | `2px` | HARDCODED — `currentColor 0 2px` in WindowCard inline style |

---

## Dead File Audit

### `bauhaus.ts`
This file is currently **non-functional**. It references:
- `shadow-bau-sm`, `shadow-bau-md`, `shadow-bau-lg` — none defined in `index.css`
- `border-foreground` — `foreground` is not a defined color token

Nothing in the project currently imports or uses `bauhaus.ts` successfully. Resolution options:
1. **Absorb and delete** — merge any needed Bauhaus concepts into the token contract and delete the file
2. **Fix** — define the missing tokens in `index.css` if the Bauhaus border/shadow variants are still wanted as distinct from Applet variants

Current recommendation: absorb into token contract and delete `bauhaus.ts`. The Applet shadow scale already covers what bauhaus.ts intended.

---

## Gap Summary

| Category | Tokens Missing | Impact |
|---|---|---|
| Slot machine colors | 3 | BentoHeader, BentoSkills non-portable |
| Border widths | 3 | Every component border is hardcoded |
| Font sizes | 4 | Label sizes scatter across components |
| Interaction physics | 2 | Press depth inconsistent (4px vs 5px) |
| Chrome dimensions | 6 | Navbar height change requires global find-replace |
| Background texture | 5 | Dot pattern un-themeable |
| **Total gaps** | **23** | |

---

## The Skin Boundary

Everything above this line is the **contract** — the what. The Bauhaus Skin is the **resolution** — the how. When you create a new Skin for this project:

1. Copy the Bauhaus Skin values
2. Change the token values
3. Nothing else changes

The components don't change. The layout doesn't change. The architecture doesn't change. Only the token file changes.

A second Skin (`Skin_Dark.md`, `Skin_Minimal.md`) would specify alternate values for every token in this table. The portfolio could switch between them at runtime by swapping a CSS class on `<html>`.

---

*Token Contract v1.0 · Experience Engine · 2026*
*Next: resolve all HARDCODED and DEAD status tokens into this contract, then audit components for direct value usage*
