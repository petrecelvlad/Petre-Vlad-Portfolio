# Skin: Heritage — Aesthetic & Heuristic Specification

---

## 1. Executive Summary & Core Identity

**Heritage** is a tactile, workshop-crafted visual language ("Wood, Paper, Metal, Ink, and Cloth") designed to give digital software physical presence, weight, and tangible craft. 

Unlike modern flat UI or synthetic glassmorphism, Heritage treats every component as a physical object anchored to a solid craftsman's workstation. Interfaces are constructed from overlapping wooden planks, brass hardware rivets, spring-binder clipboards, folded parchment paper, instant polaroid photos with tape, and rich cloth ribbon banners.

---

## 2. Fundamental Design Heuristics

### A. The Tactile Object Metaphor
Every UI container represents a physical workshop object:
- **Desk Canvas**: The foundation of the viewport (`WoodBackground`), simulating a continuous teak/warm mahogany workbench with organic wood grain.
- **DeskBoard (Wood Frames & Planks)**: Framed boards constructed from interlocking vertical posts and horizontal rails fastened with brass rivets.
- **Clipboards & Parchment**: Information cards behave like real paper clipped to wood, complete with metal binder springs and subtle paper folds.
- **Instant Photos**: Project assets and icons are presented as physical polaroids angled naturally with scotch tape on top.
- **Ribbon Banners**: Section titles are held in hand-stitched crimson fabric banners with folded swallowtail ends and curved typographic paths.

### B. The Absolute "No Gradients" Rule
- **No Digital Color Gradients**: CSS `linear-gradient`, `radial-gradient`, or SVG `<linearGradient>` are strictly forbidden for surface shading or depth.
- **Depth via Beveled Insets**: Form and volume are created exclusively through solid, dual-tone inset shadows (`var(--shadow-raised)` / `var(--shadow-sunken)`):
  - **Top Edge (Light Catch)**: `inset 0 1.5px 0 0 rgba(255, 246, 219, 0.5)`
  - **Bottom Edge (Shadow Fall)**: `inset 0 -3px 0 0 rgba(36, 26, 16, 0.3)`
  - **Ambient Soft Shadow**: `0 4px 12px rgba(20, 14, 8, 0.4)`
- **Texture over Wash**: Natural material variation is achieved via vector line-grain paths (`PlankGrain`), subtle noise, or physical geometry layering.

### C. Physical Anchoring & Embedded Geometry
- **Corner Reveals**: Outer wooden frames do not hide the desk underneath. The four corners of a `DeskBoard` feature explicit cutouts (Corner Reveals) where the underlying wood canvas shows through. This grounds the frame *into* the workbench rather than letting it float in space.
- **Recessed Interior Panels**: Content sits in sunken felt/canvas sockets surrounded by elevated plank rails.

### D. Hardware & Fasteners
- **Brass Rivets**: Planks are joined at structural intersections with dark-rimmed brass studs.
- **Scotch Tape**: Photos and loose notes are anchored using semi-translucent tape strips with frayed edges and slight rotational offsets (-5° to +5°).
- **Metal Binder Clips**: Multi-page documents use top-mounted metallic clips with spring tension handles.

---

## 3. Color Palette & Token Contract

| Token Role | Color Hex / Value | Semantic Material |
|---|---|---|
| **Workbench Base** | `#7C4A26` | Deep Teak / Oak Canvas |
| **Plank Surface** | `#B97640` | Sanded Mahogany Wood |
| **Plank Highlight** | `#F0C489` | Beveled Light Edge |
| **Plank Elevation / Shadow**| `#6B4423` | Beveled Dark Edge |
| **Parchment / Paper** | `#FAF4E8` / `#FFF6DB` | Cream Paper & Cardboard |
| **Ink Text / Outlines** | `#241A10` / `#3A0808` | Dark Warm Charcoal Ink |
| **Banner Crimson** | `#F33A48` | Main Ribbon Fabric |
| **Banner Ribbon Shade** | `#D32531` | Ribbon Wings |
| **Banner Ribbon Fold** | `#710C15` | Under-Fold Shadow |
| **Hardware Brass** | `#E5A83B` | Rivet Core & Metallic Accents |

---

## 4. Component Construction Guidelines

When building new Heritage elements, strictly follow these structural blueprints:

### 1. Framed Wood Panels (`DeskBoard`)
- Always use outer `Post` (vertical) and `Rail` (horizontal) plank components with heavy dark outlines (`#6B4423` or `#241A10`).
- Ensure corner intersections feature brass rivets.
- Interior content area must use a recessed socket shadow (`var(--shadow-sunken)`).

### 2. Physical Banners (`SkillTreeBanner`)
- Construct banners with 3-dimensional ribbon geometry: Main Face, Left/Right Ribbon Wings, and Under-Fold Triangles.
- Place text on curved SVG text paths (`<textPath>`) to emulate physical cloth draping.
- Anchor banner ends under a background wood plank (`SkillTreeBannerPlank`).

### 3. Photo & Asset Cards (`InstantPhoto`)
- White/cream paper frame around thumbnail imagery.
- Subtle tilt angle (`rotate-[-4deg]`, `rotate-[3deg]`).
- Top scotch tape overlay extending across the frame edge.

### 4. Direct Connectors & Skill Nodes (`SkillTree`)
- Tree connectors use solid 2px dark ink strokes with 90° orthogonal steps.
- Node pills use solid desaturated background tints with dark ink borders (`border-ink-base`).
- Spacing between hierarchy columns should be generous (`GAP_X >= 80px`) to maximize connector visibility and horizontal canvas balance.

---

## 5. Extension Rules for Future Components

When adding new UI features to the Heritage skin:
1. **Modal Dialogs**: Render as a hinged wooden box with brass latch or a heavy parchment document pinned to a wood plank block.
2. **Buttons & Controls**: Render as carved wooden tiles or brass press-studs with tactile inset active states (`translate-y-[2px]`).
3. **Progress Bars & Meters**: Render as carved wooden grooves with solid brass or crimson fill strips.
4. **Tooltips**: Render as small sticky notes with a folded bottom corner and tape header.

---
*Document Version: 1.0 — Standardized for AI Studio Build & Heritage Skin Architecture.*
