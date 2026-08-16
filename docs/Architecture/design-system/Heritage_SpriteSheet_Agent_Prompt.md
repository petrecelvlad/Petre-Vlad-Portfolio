# Agent Prompt: Heritage & Tactile Workshop Sprite Sheet & Material Catalog

> **Copy and paste the prompt below into another AI agent prompt window to generate a full interactive Sprite Sheet / Material Catalog component library.**

---

```markdown
You are an expert Frontend Architect and UI Designer specializing in tactile, skeuomorphic-minimalist ("Heritage Workshop") web interfaces.

### Goal
Build an interactive, modular "Sprite Sheet & Material Catalog" playground for a cute, tactile, web-based portfolio design system. This playground should display a rich assortment of UI components, materials, textures, hardware elements, and interactive controls all crafted in pure CSS/Tailwind and inline SVG—with ZERO external image dependencies.

---

### Core Aesthetic Philosophy ("Heritage Workshop")
- **Material Metaphor**: Interfaces are physical workshop objects crafted from Wood, Paper, Metal, Ink, and Fabric.
- **The "No Gradient" Rule**: Never use CSS linear/radial gradients or SVG gradient washes for shading. Depth is created strictly using dual-tone light/dark inset bevel shadows (`inset 0 1.5px 0 0 ...` and `inset 0 -3px 0 0 ...`) and solid ink outlines (`#241A10`).
- **Tactile Fasteners**: Planks join with brass rivets, notes stick with semi-translucent scotch tape, documents clip with metal binder springs, titles drape on stitched cloth ribbons.
- **Cute & Minimal Proportion**: Clean, balanced negative space, smooth rounded corners (capped at 12–16px for cards, pills for controls), playful tilt angles (-4° to +4°), and high-contrast, scannable typography.

---

### Components & Objects to Include in the Sprite Sheet

Organize the sprite sheet into clear visual sections or tabs:

#### 1. Wood & Timber Samples
- **Sanded Mahogany Plank**: Standard warm plank with light-bevel top and dark-bevel bottom.
- **Teak Workbench Base**: Heavy dark wood grain texture block for canvas backgrounds.
- **Birch Wood & Light Oak**: Light desaturated wood variant.
- **DeskBoard Frame Assembly**: Interlocking vertical post + horizontal rail with corner reveals and corner brass rivets.

#### 2. Paper & Stationery
- **Instant Photo (Polaroid)**: Cream paper frame, tilted aspect ratio, semi-translucent scotch tape header, photo slot.
- **Clipboard & Parchment**: Wood clipboard backing with spring-loaded metallic binder clip and folded parchment document.
- **Sticky Note**: Square yellow/pastel note with a folded bottom-right corner fold.
- **Stamped Index Card**: Heavy cardstock with rounded corners and faint red/blue ledger lines.

#### 3. Hardware & Metal Fasteners
- **Brass Rivets & Studs**: Dark-rimmed metallic circles used at plank junctions.
- **Metal Spring Clip**: Metallic top-binder clip with wire tension handle.
- **Brass Latch & Keyhole**: Decorative interactive toggle mechanism.
- **Stamped Metallic Badge**: Engraved metal plaque with inset text.

#### 4. Cloth & Ribbons
- **Swallowtail Crimson Ribbon**: 3D draped ribbon banner with swallowtail ends and curved text path.
- **Stitched Felt Badge**: Soft cloth patch with white dash stitching around borders.
- **Bookmark Ribbons**: Hanging cloth tabs extending from bottom frame edges.

#### 5. Interactive UI Controls
- **Carved Wooden Buttons**: Raised wood button with hover lift and tactile active press (`translate-y-[2px]`).
- **Lever & Rocker Toggles**: Workshop switch toggles with clear ON/OFF visual feedback.
- **Carved Wooden Meter / Progress Bar**: Sunken wooden groove with brass or crimson fill.
- **Skill Nodes & Tree Connectors**: Orthogonal 90° dark ink connector paths joining pill nodes.

#### 6. Material Variations & Color Skins
Provide a skin switcher to preview the entire sprite sheet in 3 distinct themes:
1. **Classic Heritage**: Warm teak wood `#7C4A26`, crimson ribbon `#F33A48`, cream parchment `#FFF6DB`.
2. **Cute Toy Box / Pastel**: Light pine wood `#E8C999`, mint/pastel accents `#A8E6CF`, cotton paper `#FFFFFF`.
3. **Midnight Mahogany**: Dark chocolate wood `#3A2312`, brass hardware `#E5A83B`, dark slate canvas `#1E1B18`.

---

### Technical Requirements
1. **Framework**: React + Tailwind CSS + Lucide Icons + `motion/react` (for subtle hover/active animations).
2. **Pure Code Implementation**: All wood grains, tape strips, rivets, and ribbons must be created using Tailwind utility classes, CSS box-shadows, or inline SVG vectors. Do not rely on external raster PNG images.
3. **Interactive Playground Controls**:
   - Filter components by material category (All, Wood, Paper, Hardware, Ribbons, Controls).
   - Live skin/theme selector toggle.
   - Copyable Tailwind snippet preview modal for any selected object on the sheet.

```
