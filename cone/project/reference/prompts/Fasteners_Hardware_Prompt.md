# Fasteners & Hardware Library Prompt

## Purpose
This document provides a specialized agent prompt for generating a exhaustive, high-precision SVG component library dedicated exclusively to **Fasteners, Joinery, and Mechanical Hardware**. 

These micro-components are essential for securing panels, ornamenting corners, and adding physical joinery to Tactile and Steampunk interfaces.

---

## Copy-Paste Agent Prompt

```markdown
You are tasked with building a dedicated, highly versatile React/SVG component library of **Fasteners, Joinery, & Mechanical Hardware** for a Tactile UI system.

### Design Standards & Physics
Every fastener must feel three-dimensional at microscopic UI scales (from 8px micro-rivets to 48px heavy corner plates):
1. **Multi-Stop Metallic Gradients:** Support selectable alloys (`brass`, `steel`, `copper`, `chrome`, `bronze`).
2. **Directional Screw Slots:** Flathead, Phillips (cross), Hex/Allen, and Star (Torx) slots aligned at realistic 30° to 45° angles.
3. **Specular Bevels:** Light source fixed at Top-Left (135° angle), producing a 1px bright highlight edge on top-left rims and dark cast shadow on bottom-right edges.
4. **Dark Grounding Outline:** 1.5px to 2px `#1C1610` dark contour stroke.

---

### Hardware Taxonomy to Implement

#### 1. Rivets & Nails
- **FlushRivet:** Smooth hemispherical dome rivet with subtle drop-shadow ring.
- **PyramidRivet:** Square-base 4-faceted pyramid stud with specular facet highlights.
- **RivetStrip:** Horizontal, vertical, or grid array of uniform rivets (configurable count: 2 to 10).
- **SquareForgedNail:** Hand-hammered square nail head with organic irregular facets.

#### 2. Screws & Bolts
- **FlatheadScrew:** Countersunk flush screw with single directional slot.
- **PhillipsScrew:** Cross-recessed machine screw head with deep shadow center.
- **HexBolt:** Heavy 6-sided bolt cap with washer base ring and center slot option.
- **AllenCapScrew:** Cylindrical socket head cap screw with recessed hexagonal drive hole.
- **WingNut:** Butterfly-winged threaded nut with twin curved thumb tabs.

#### 3. Washers & Retainers
- **FlatWasher:** Circular metallic backing ring placed under bolt heads or rivets.
- **LockWasher:** Split helical spring washer with offset gap gap detail.
- **StarWasher:** External-tooth lock washer with radiating lock teeth.

#### 4. Joinery Plates & Brackets
- **LBracket:** 90-degree corner mounting plate with dual counter-sunk screw holes.
- **TStrapPlate:** T-shaped structural joining plate for intersecting wood/iron beams.
- **CornerCap3D:** 3D corner bracket designed to wrap around panel corners with triple rivet mounts.
- **HingedLeafPlate:** Mortise hinge leaf with barrel knuckles and pin cap.

---

### Technical Specification
- Location: `/src/components/bento/skins/gamified/hardware/`
- Component Props:
  - `size?: number` (default: `16`)
  - `alloy?: 'brass' | 'steel' | 'copper' | 'chrome' | 'bronze'` (default: `'steel'`)
  - `rotation?: number` (degrees to turn slot/head)
  - `className?: string`
- Export clean, reusable React components with SVG gradient namespaces (`useId()`).
```
