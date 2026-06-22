# Skin: Bauhaus / Applet
### The Visual Identity of the Experience Engine

---

## What This Document Is

This is the Bauhaus Skin — the resolved values for every token defined in `Token_Contract.md`. It is one possible answer to that contract. A different Skin would be a different file with different values; the components, layouts, and architecture would not change.

**The aesthetic thesis:** Pseudo-brutalism inspired by classic Mac OS chrome, Bauhaus geometry, and physical hardware. Elements feel tangible — not blurred or floated, but pressed, clicked, and anchored. The UI should feel like it was manufactured.

---

## The Three Pillars

### 1. Thick Borders + Hard Shadows
Depth through offset, not blur. Every interactive surface casts a flat ink shadow that disappears on press — simulating a physical key press.

### 2. High-Contrast Vivid Palette
Six named palette colors as titlebar and badge fills. No neutrals for decoration — only for ink, surface, and rule. The colors are loud by design; they signal "UI artifact" not "document."

### 3. Deliberate Typography Hierarchy
- **Display / UI chrome:** Space Grotesk — geometric, confident
- **Body / prose:** Outfit — warm, readable
- **Labels / dates / tags:** JetBrains Mono — "system text" feel; signals data, not copy

---

## Resolved Token Values

### Surfaces
| Token | Resolved Value | Notes |
|---|---|---|
| `--color-surface-base` | `#F7F4EB` | Warm off-white — aged paper |
| `--color-surface-elevated` | `#EFEBDF` | Slightly darker — hover fills |
| `--color-surface-soft` | `#FAF8F2` | Near-white — card interiors |
| `--color-surface-inverse` | `#1C1A22` | Near-black — inverted surfaces |

### Ink
| Token | Resolved Value | Notes |
|---|---|---|
| `--color-ink-base` | `#191919` | Near-black — borders, primary text |
| `--color-ink-subtle` | `#4D4D4D` | Mid-grey — secondary text |
| `--color-ink-whisper` | `#8C8C8C` | Light grey — hints, placeholders |

### Palette
| Token | Resolved Value | Personality |
|---|---|---|
| `--color-coral` | `#FF9EBB` | Warm pink — primary accent |
| `--color-mint` | `#C6EE71` | Acid green — success, active |
| `--color-sky` | `#9AE2D8` | Teal — focus, calm |
| `--color-butter` | `#F9E56C` | Warm yellow — highlight, warmth |
| `--color-periwinkle` | `#C8B2F8` | Soft purple — primary action |
| `--color-lilac` | `#DCCDF9` | Light purple — soft secondary |

### Slot Machine Motif
The tactile hardware element — the "coin slot" display used in date ranges and skill icons. Warm parchment tones that feel physical.

| Token | Resolved Value |
|---|---|
| `--color-slot-casing` | `#E2D4C1` |
| `--color-slot-surface` | `#F4ECE1` |
| `--color-slot-text` | `#2D2A26` |

### Typography
| Token | Resolved Value |
|---|---|
| `--font-display` | `'Space Grotesk', sans-serif` |
| `--font-body` | `'Outfit', sans-serif` |
| `--font-mono` | `'JetBrains Mono', monospace` |
| `--text-label` | `11px` |
| `--text-label-sm` | `10px` |

### Geometry
| Token | Resolved Value | Where used |
|---|---|---|
| `--radius-xs` | `4px` | Micro chips |
| `--radius-sm` | `6px` | Tags, badges |
| `--radius-md` | `8px` | Buttons |
| `--radius-lg` | `12px` | Cards, windows — the Applet standard |
| `--radius-pill` | `9999px` | Pill badges |
| `--radius-slot` | `22px` | Slot machine icon containers |

### Shadows
Flat ink-offset — no blur. The Bauhaus Skin uses only the `--color-ink-base` as the shadow color.

| Token | Resolved Value |
|---|---|
| `--shadow-applet-sm` | `0 3px 0 0 var(--color-ink-base)` |
| `--shadow-applet-md` | `0 5px 0 0 var(--color-ink-base)` |
| `--shadow-applet-lg` | `0 8px 0 0 var(--color-ink-base)` |
| `--shadow-applet-xl` | `0 12px 0 0 var(--color-ink-base)` |

### Interaction Physics
The button press is the signature interaction. On `active:`, the element translates down by `--press-depth` and the shadow collapses to zero — simulating a mechanical key.

| Token | Resolved Value |
|---|---|
| `--transition-defaults` | `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` |
| `--press-depth` | `5px` |
| `--press-inset-depth` | `4px` |

### Chrome Dimensions
| Token | Resolved Value |
|---|---|
| `--chrome-navbar-height` | `64px` |
| `--chrome-titlebar-height` | `40px` |
| `--chrome-traffic-light-border` | `1.5px` |
| `--chrome-icon-slot-size` | `90px` |

### Background Texture
The warm dot grid gives the app its physical paper quality. The near-opaque overlay tones it down so it reads as texture, not noise.

| Token | Resolved Value |
|---|---|
| `--texture-dot-size` | `1px` |
| `--texture-dot-gap` | `28px` |
| `--texture-overlay-opacity` | `0.96` |
| `--texture-stripe-width` | `2px` |
| `--texture-stripe-period` | `8px` |

---

## What a Different Skin Would Change

To replace the Bauhaus Skin with e.g. a **Dark OLED** Skin:

| Token | Bauhaus | Dark OLED |
|---|---|---|
| `--color-surface-base` | `#F7F4EB` | `#0A0A0A` |
| `--color-ink-base` | `#191919` | `#FAFAFA` |
| `--shadow-applet-lg` | `0 8px 0 0 #191919` | `0 8px 0 0 rgba(255,255,255,0.15)` |
| `--color-slot-casing` | `#E2D4C1` | `#1A1A1A` |
| `--color-slot-surface` | `#F4ECE1` | `#2D2D2D` |
| `--texture-overlay-opacity` | `0.96` | `0.98` |

The components do not change. The layouts do not change. Only this file's values change.

---

*Skin: Bauhaus / Applet · Experience Engine · 2026*
*One resolution of the Token Contract. Not the system — a choice.*
