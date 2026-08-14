# Tactile Ornament Library: Agent Generation Prompt

## Purpose
This document provides a structured agent prompt and architectural breakdown for building an expansive library of **Tactile & Steampunk-adjacent UI Ornaments**. 

These micro-components (pipes, valves, pressure gauges, screws, hinges, wax stamps, brackets, indicators) act as modular decorative sprites that can be snapped onto panels, bento tiles, header ribbons, and skill trees to enrich the physical world-feel of the application.

---

## Copy-Paste Agent Prompt

```markdown
You are tasked with generating a comprehensive SVG Sprite Sheet & Component Library of Tactile UI Ornaments for a game-inspired web application.

### Aesthetic Style: Tactile & Steampunk-Adjacent
Adhere strictly to the **Tactile Design System heuristics**:
1. **Hard Grounding Strokes:** Dark `#1C1610` contours (1.5px to 2.5px) around every physical element.
2. **Multi-Stop Metallic Gradients:** 
   - Blued Steel / Iron (`#CBD5E1` -> `#64748B` -> `#334155` -> `#1E293B`)
   - Antiqued Brass (`#FFE5A3` -> `#D4A047` -> `#8C5828` -> `#4A2A0C`)
   - Copper / Bronze (`#FFD1B3` -> `#C86432` -> `#783014` -> `#3B1204`)
   - Polished Silver (`#FFFFFF` -> `#CBD5E1` -> `#64748B` -> `#1E293B`)
3. **Specular Edge Line Highlights:** Subtle 1px inner strokes catching light along top/left edges.
4. **Physical Assembly:** Screws have cross/slot heads, pipes have flange couplings with tiny bolts, gauges feature needle dials and glass sheen reflections.

---

### Target Ornament Taxonomy

Generate a modular React component library (`/src/components/bento/skins/gamified/ornaments/`) providing vector implementations for the following categories:

#### 1. Hardware & Fasteners
- **Hex Bolt & Flathead / Phillips Screws:** 45-degree angled slots, metallic gradient heads, dark outline shadow ring.
- **Rivet Strips:** Horizontal and vertical rows of 3 to 5 flush rivets with subtle shadow cast.
- **Corner Clasps & L-Brackets:** Reinforced 90-degree metal angle brackets with dual screw mounts.

#### 2. Pipes, Flanges & Valves
- **Straight & Elbow Pipe Segments:** Cylindrical gradient fill with raised flange connectors at the ends.
- **Rotary Valve Wheels:** 4-spoke brass/iron handwheels attached to pipe junctions, with directional shadow.
- **Steam Pressure Vent:** T-junction pipe with a slotted exhaust cap emitting subtle ambient glow/steam.

#### 3. Gauges & Instruments
- **Analog Pressure Gauge:** Circular brass dial with Roman/Arabic numerals, red/gold needle indicator, and diagonal glass reflection overlay.
- **Glass Fluid Indicator Tube:** Vertical bronze cage containing glowing liquid level (cyan, amber, or crimson).
- **Mechanical Counter Wheels:** Inset dual-digit tumbler wheel slot with metallic border.

#### 4. Seals, Stamps & Emblems
- **Wax Seal with Ribbon:** Dripped crimson/burgundy wax stamp with impressed guild crest and parchment ribbon tails.
- **Brass Crest Plate:** Blank rectangular or oval brass nameplate with corner rivets for mounting custom text or icons.
- **Steampunk Gear Emblem:** Interlocking 8-tooth and 12-tooth spur gears with center axle cap.

#### 5. Hinges & Joints
- **Heavy Iron Strap Hinge:** Horizontal mortised hinge with leaf plate, barrel pin, and decorative teardrop tip.
- **Pneumatic Cylinder Rod:** Telescoping chrome/steel piston assembly for panel margins.

---

### Technical Guidelines
- Export each ornament as an isolated, self-contained React SVG component.
- Support standard sizing props (`size?: number`, `className?: string`, `alloy?: 'steel' | 'brass' | 'copper' | 'silver'`).
- Ensure all SVG gradient IDs are uniquely namespaced or generated via `useId()` to prevent cross-component gradient bleeding in DOM.
- Maintain high performance: pure SVG markup, vector path efficiency, zero external image assets.
```

---

## Component Architecture & Usage Plan

To seamlessly integrate this ornament library into the application, components should be organized under a dedicated directory:

```
src/components/bento/skins/gamified/ornaments/
├── HexScrew.tsx
├── RivetStrip.tsx
├── CornerClasp.tsx
├── PipeSegment.tsx
├── ValveWheel.tsx
├── AnalogGauge.tsx
├── FluidTube.tsx
├── WaxSeal.tsx
├── BrassNameplate.tsx
├── GearEmblem.tsx
└── index.ts
```

### Example Integration Pattern
```tsx
import { CornerClasp, ValveWheel, AnalogGauge, WaxSeal } from './ornaments';

// Snapping ornaments onto a GamifiedBoard or GamifiedParchmentPanel:
<GamifiedBoard className="relative">
  <AnalogGauge alloy="brass" className="absolute top-2 right-4 z-20" size={36} value={75} />
  <ValveWheel alloy="copper" className="absolute bottom-2 left-2 z-20" size={28} />
  <WaxSeal className="absolute -bottom-3 right-6 z-30" />
</GamifiedBoard>
```
