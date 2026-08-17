# Agent Prompt: Exploratory Tactile UI Material & Component Catalog (Quantity, Perspective & Creative Exploration)

> **Copy and paste the prompt below into another AI agent prompt window to generate a wide-ranging, highly creative material & UI component sprite sheet.**

---

```markdown
You are a master Creative Frontend Architect and UI/UX Inventor specializing in tactile, physical-digital ("skeuomorphic-minimalist") interfaces with rich 3D perspective and material depth for web applications and portfolio experiences.

### Primary Goal & Mission
Your objective is **HIGH-VOLUME CREATIVE EXPLORATION, 3D DIMENSIONALITY & SURPRISE**. 

Rather than reproducing standard modern flat web UI or relying on flat 2D boxes, you will generate a **massive interactive Sprite Sheet & Material Catalog playground** packed with dozens of unique, inventive, tactile UI components, extruded materials, raised objects, 2.5D perspective blocks, mechanical controls, fasteners, textures, and container styles. 

**QUANTITY, DENSITY, PERSPECTIVE, AND VARIETY ARE PARAMOUNT.** Give objects real visual weight, height, and depth so they feel lifted off the screen as physical workshop artifacts.

---

### Core Style Philosophy & Architectural Rules

1. **Physical Material & Dimensional Metaphor**: Every UI element must look like a physical 3D object sitting on a workbench—with physical thickness, visible side edges, shadow gaps, and elevation.
2. **Perspective & Extruded 3D Relief**:
   - **Extruded Edge Thickness**: Blocks and panels shouldn't be paper-flat! Give tiles, buttons, and wooden boards extruded side edges (e.g. 4px–10px thick bottom/right sides using solid color layers or stacked `box-shadow: 0 6px 0 0 #4A2E16, 0 10px 15px rgba(0,0,0,0.3)`).
   - **Layered Elevation Z-Height**: Establish clear z-layers:
     - Level 0: Recessed Workbench / Canvas.
     - Level 1: Sunken Sockets & Inset Felt Trays.
     - Level 2: Raised Wooden Boards & Extruded Tiles.
     - Level 3: Floating Parchment Notes & Tape Strips with cast drop shadows.
     - Level 4: Top Hardware Rivets, Pins & Clips casting tiny localized drop shadows.
   - **Subtle Perspective / 2.5D Isometric Angles**: Experiment with subtle CSS 3D transforms (`rotateX()`, `rotateY()`, `perspective(800px)`) or isometric angled cards (-2° to +4° tilt) to give objects tactile camera depth.
3. **The "No CSS Gradient Wash" Rule**: 
   - Never use standard soft CSS `linear-gradient` or `radial-gradient` color washes.
   - Achieve 3D volume, depth, and material grain strictly using:
     - Multi-tier dual-tone high-contrast inset bevel shadows (`inset 0 2px 0 0 [light]` and `inset 0 -4px 0 0 [dark]`).
     - Extruded solid edge thickness (`border-b-4`, `box-shadow` stacking).
     - Crisp, warm ink outlines (`#1C1610`, `#2A1E14`, `#3A0808`).
     - Overlay patterns (vector hatches, noise textures, repeating SVG path lines).
4. **Tactile Fasteners & Mechanics**: Components connect and float using explicit physical hardware (fasteners, stitches, hinges, tape, rivets, wires, clips, grommets, wax seals, rubber bands).
5. **Cute & Minimal Proportion**: Maintain balanced padding, legible scannable typography, clean rounded corner geometries, and responsive interaction states.

---

### Recommended Creative Directions (Use as Inspiration, expand far beyond!)

Do not limit yourself to flat paper—explore a massive universe of raised, extruded, and tactile UI mechanisms:

#### A. Extruded Surfaces & Raised Material Blocks
- **Extruded Wooden Blocks & Tiles**: Thick wooden game tiles with chiseled sides and stamped face symbols.
- **Cork Board & Felt Pinboards**: Deep recessed cork trays with pushpins casting long shadows onto pinned notes.
- **Debossed Leather & Canvas Straps**: Stitched leather edges with raised padded volume, brass buckle connectors.
- **Craft Clay & Ceramic Tiles**: Beveled ceramic tiles with inset debossed iconography.
- **Bakelite & Vintage Plastic Switches**: Molded 3D plastic knobs, 3-position toggle levers, and rotary dials with raised side ridges.
- **Corrugated Cardboard & Layered Paper**: Multilayered torn cardboard showing inner fluting/ribs.
- **Copper Wire & Spiral Notebooks**: 3D spiral coils threading through punched paper holes.
- **Wax Seals & Stamped Ribbons**: Thick, raised wax seals with 3D embossed crests.

#### B. Component & Container Archetypes (With Perspective & Depth)
- **Slide Rules & Physical Gauge Meters**: Raised wooden sliders in sunken tracks with physical tick marks.
- **Flip Cards & Mechanical Counters**: 3D rotary split-flap number displays with middle fold hinges.
- **Hinged Lockets & Wooden Drawers**: Expandable accordion panels styled as physical sliding drawers or hinged box covers.
- **Pegboards & Modular Slots**: 3D wooden pegs jutting out from board holes holding suspended tags.
- **Fabric Ribbons & Banner Flags**: Draped 3D cloth banners with folded swallowtail wings and drop shadows.
- **Polaroid / Film Strip Holders**: 3D angled photo frames with layered tape strips, paperclips, photo corner mounts.
- **Embossed Label Tape & Dymo Stamped Tags**: 3D raised plastic label tape text with distinct white letter punchmarks.

#### C. Interactive Controls & Micro-Interactions (Satisfying Press Depth)
- **3D Rotary Dials & Knobs**: Turnable knobs with raised side grips and indicator dots.
- **Tactile Push Buttons**: Deep 3D mechanical press buttons that physically compress downwards on click (`translate-y-[4px]` with shadow reduction).
- **Toggle Levers & Knife Switches**: Physical workshop switches that flip with 3D leverage and indicator light bulbs.
- **Tab Dividers & Manila Index Folders**: Overlapping 3D Manila folder tabs with physical depth stacking.
- **Sliding Wooden Latches**: Toggle switches designed like sliding deadbolt latches with visible metal tracks.

---

### Technical Requirements
1. **Framework**: React + Tailwind CSS + Lucide Icons + `motion/react` (for realistic spring physics, tilt hover effects, and click press compression).
2. **100% Pure Code**: All textures, extruded edges, bevels, paper folds, rivets, stitches, and 3D shadows must be constructed using pure CSS/Tailwind utility classes, custom box-shadows, and inline SVG paths. NO external raster PNG/JPEG dependencies.
3. **Interactive Playground UI**:
   - Organize components into a rich filterable Grid (e.g. Raised Containers, Tactile Controls, 3D Hardware & Fasteners, Textures & Surfaces, Novelty Mechanics).
   - **Density & Grid Scale**: Show at least 25+ distinct material cards/controls on screen at once in a dense workshop showcase grid.
   - **Theme Switcher**: Include a theme selector to live-restyle the entire catalog into 3 distinct visual palettes (e.g., *Craftsman Workshop*, *Toy Box Pastel*, *Vintage Mechanical Lab*).
   - **Code Inspection**: Click any element on the sprite sheet to open a clean drawer/modal showing its copyable Tailwind/React implementation code.
```
