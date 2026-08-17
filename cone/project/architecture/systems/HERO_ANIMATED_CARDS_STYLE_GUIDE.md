# Tactile Retro-Arcade Shader Cards: Visual Style & Animation Guide

## Overview

This document specifies the universal visual style, rendering heuristics, spatial models, color systems, and animation mechanics for the **Tactile Retro-Arcade Shader Cards** featured in the Hero banner section.

These cards translate professional accomplishments (*Years of Experience, Games Produced, Crafted Levels, Teams Lead*) into self-contained, highly physical, animated retro game micro-vignettes.

By identifying the underlying common patterns across all 4 implementations, this guide serves as a blueprint to replicate this aesthetic and apply it to new animations, cards, or interactive UI widgets.

---

## 1. Reference Card Case Studies

The system is derived from 4 primary WebGL shader card implementations in `AchievementShaderCanvas.tsx`:

| Card ID | Theme / Metaphor | Perspective Model | Primary Mechanics & Micro-Details |
| :--- | :--- | :--- | :--- |
| **`levelup`** *(Years of Exp)* | 16-Bit Experience Gauge & Reward Level Up | 2.5D Slanted Gauge Tube | 8-tick LED progress bar with escalating tension shake, launch-phase 3D chevrons, floating gold coins burst, sliding capslock pixel text, and screen cooling release. |
| **`cartridge`** *(Games Produced)* | Retro Game Boy / NES 3D Golden Cartridge | Raymarched 3D Perspective | Floating/rotating 3D gold game cartridge with tilt, pixel sprite alien sticker, custom vector text stamp ("MADE IN ROMANIA"), ambient space grid, and particle dashes. |
| **`factory`** *(Levels Crafted)* | Perpetual Casual Game Assembly Line | Orthographic 2D Side-View | Hopper dispenser cannon, rotating gears & belt, squish-and-stretch game blocks with 4 unique facial expressions, heavy "FUN" stamping press, and floating "+1" point popups. |
| **`teamslead`** *(Teams Lead)* | 2.5D Island Overworld Archipelago | 2.5D Top-Down Terraced Map | 4 organic islands with 4 height tiers (Water/Sand/Grass/Stone), 2.5D cliff drop-offs, animated dashed waypoint paths, traveling hero pawn with radar pulses, and active stage badges. |

---

## 2. Structural & Framing Heuristics (Container System)

All shader cards share a strict, unified outer framing system that connects the WebGL/Canvas surface to the tactile UI environment.

```
┌─────────────────────────────────────────────────────────────┐  ▲
│  Tactile Card Container (2xl Rounded, 3px Line Art)          │  │ Aspect ~16:9
│  ┌───────────────────────────────────────────────────────┐  │  │ (Compact Badge)
│  │ WebGL / Canvas Surface                                │  │  │
│  │  - Deep Dark Base Background                          │  │  │
│  │  - Radial Edge Vignette                               │  │  │
│  │  - Central Focal Game Vignette                        │  │  │
│  │  - Bold Dark Contour Outlines (SDF Strokes)           │  │  │
│  └───────────────────────────────────────────────────────┘  │  │
└─────────────────────────────────────────────────────────────┘  ▼
   └─► Hard Offset Drop Shadow (0 4px 0 0 #1C1610)
```

### Key Framing Rules:
1. **Compact Aspect Ratio**: Horizontal rectangular badge geometry (`min-h-[75px]` to `min-h-[95px]`, aspect ratio roughly 16:9 or 2:1).
2. **Tactile Outline**: 3px solid dark line-art border (`border-3 border-[#1C1610]`) with smooth rounded corners (`rounded-2xl`).
3. **Hard Directional Shadow**: Flat, unblurred offset shadow (`shadow-[0_4px_0_0_#1C1610]`) projecting directly down or down-right, grounding the card physically onto the page.
4. **Deep Base Canvas**: Deep navy, violet, or dark indigo canvas background (`#0D0D14`, `#020617`, `#111029`) ensuring bright, saturated foreground elements pop with extreme contrast.
5. **Radial Vignetting**: Soft radial corner darkening (`smoothstep(1.1, 0.35, length(uv))`) inside the fragment shader to focus visual weight onto the center.

---

## 3. Color System & Palette Rules

Rather than hardcoded static hex values, the style relies on **Color Roles** and **Quantized Color Economy**.

### Color Economy & Quantity Limits
* **Maximum 4 to 6 Color Roles** per card animation.
* **Color Quantization**: Smooth continuous gradients are avoided in favor of discrete 16-bit or 8-bit color bands (`floor(color * 16.0) / 16.0`).

### Universal Color Roles

| Role Name | Visual Purpose & Characteristics | Example Tones across Cards |
| :--- | :--- | :--- |
| **Canvas Dark** | Background foundation; dark, cool, saturated. | Deep Royal Navy, Dark Violet, Deep Ocean Blue. |
| **Primary Structure** | Main body of game props, landmasses, or machinery. | Gold/Amber, Industrial Silver/Gray, Grass Green, Sand. |
| **Extrusion / Shadow** | Darker, warmer/cooler tint of primary color used for 3D lips, cliff faces, and undercut bevels. | Deep Bronze/Umber, Dark Slate, Forest Shadow, Crimson Extrusion. |
| **Vibrant Energy Accent** | Reserved exclusively for active states, laser paths, particle bursts, and UI badges. | Neon Electric Cyan, Hot Crimson, High-Luminance Gold/Yellow, Crisp White. |
| **Contour Outline** | High-contrast dark stroke surrounding all game objects. | Deep Dark Navy/Charcoal (`#1C1610`, `#121624`), never flat #000000. |
| **Specular Highlight** | Single-pixel lines or sweeping glares signaling sheen, metalness, or energy. | Pure White (`#FFFFFF`) or pale pastel light tint. |

---

## 4. Perspectives & Spatial Models

The cards utilize **3 distinct spatial perspectives**, each suited to different game tropes:

```
[PERSPECTIVE 1: Orthographic 2D]    [PERSPECTIVE 2: 2.5D Terraced Extrusion]   [PERSPECTIVE 3: Raymarched 3D]
  ┌─────────────────────────┐         ┌─────────────────────────┐                 ┌─────────────────────────┐
  │ [Banner]                │         │      (Stone Tier)       │                 │      \  Grid  /         │
  │ [Press] ▼               │         │    (Grass Tier)         │                 │       \  __  /          │
  │ [Cannon] -> [Box] [Belt]│         │  (Sand Tier)            │                 │        /  \             │
  │   (O)           (O)     │         │ ~~~~~ Water ~~~~~       │                 │       \__/ 3D Prop      │
  └─────────────────────────┘         └─────────────────────────┘                 └─────────────────────────┘
```

### 1. Orthographic 2D Side-View (Platformer / Assembly Line)
* **Camera**: Perfectly horizontal 2D cross-section view.
* **Layering Planes**:
  1. *Background*: Subtle grid lines or scanlines.
  2. *Secondary Hardware*: Rotating gears, pulleys, and piston pipes.
  3. *Primary Action*: Conveyor belt, moving game blocks with elastic squish/stretch.
  4. *Foreground Machinery*: Hopper dispenser cannon, heavy stamping press.
  5. *UI Layer*: Top scoreboard banner and floating text indicators.

### 2. 2.5D Terraced Elevation / Top-Down Isometric (Overworld / Gauge)
* **Camera**: Tilted 2.5D top-down projection with a vertical extrusion vector (`cliffOffset = vec2(0.0, 0.045)`).
* **Layering Planes**:
  1. *Water / Base Field*: Animated caustics and wave patterns.
  2. *Terraced Tiers*: Sand (Tier 1) -> Grass (Tier 2) -> Stone (Tier 3).
  3. *Cliff Drop-offs*: Extruded vertical faces shaded with darker cliff colors.
  4. *Path & Waypoints*: Dashed vector lines connecting node badges.
  5. *Actors*: Hero pawn with radar pulse rings and floating callout badges.

### 3. Raymarched 3D Object in Retro Space (Floating Arcade Prop)
* **Camera**: 3D Perspective Raymarcher (`camPos = vec3(0.0, 0.1, 2.2)`, `rayDir = normalize(vec3(uv, -1.6))`).
* **Object Behavior**: Single central 3D prop (e.g. game cartridge) floating with continuous rotation (`rotY = u_time`) and subtle bobbing/tilting.
* **Hybrid Canvas Integration**: The 3D raymarched object interacts with a retro 2D ambient background (scrolling grid, particle stars, laser dashed paths).

---

## 5. Motion, Timing Cycles & Animation Mechanics

All cards adhere to a **4 to 7-second rhythmic looping cycle** divided into clear mechanical phases:

```
0.0s ──────────► 2.5s ──────────► 3.2s ──────────► 4.5s ──────────► 6.0s
 ┌─────────────────┬────────────────┬─────────────────┬────────────────┐
 │ BUILD-UP / CHARGE│ IMPACT / LAUNCH│ REWARD / EXPLODE│ COOL-DOWN/RESET│
 └─────────────────┴────────────────┴─────────────────┴────────────────┘
   - Filling gauge   - Heavy Stamp    - Floating +1     - Steam release
   - Gear rotation   - Chevron soar   - Coin burst      - Smooth return
   - Jitter shake    - Flash pulse    - Banner highlight
```

### Core Animation Rules:
1. **Rhythmic Industrial Cadence**: Movement is not linear; it uses snappy easing curves (quadratic drop, exponential launch, sudden impact holds).
2. **Escalating Tension**: Tension accumulates as energy fills or machinery preps:
   - High-frequency micro-jitter / screen shake (`sin(u_time * 75.0)`).
   - Accelerating LED bar pulses and color shifts (Yellow -> Flame Orange -> Crimson Red).
   - Step bumps and elastic squish upon mechanical ticks.
3. **Explosive Release & Reward**: Immediate, satisfying release upon peak tension:
   - Chevrons soaring into upper sky.
   - Gold coin bursts and floating "+1" point popups rising and fading.
   - Shockwave rings radiating from the focal point.
4. **Juice & Expressive Micro-Details**:
   - **4 Distinct Facial Expressions**: On game blocks or character actors, use varied eye SDFs (0 = Circular Dot, 1 = Sharp Caret `^ ^`, 2 = Round Arch `∩ ∩`, 3 = Vertical Prolonged `\| \|`).
   - **Shine & Glare Sweeps**: Specular glare lines sweeping across metallic or plastic surfaces (`sin(glarePos * 12.0 - u_time * 3.0)`).
   - **Pulsing Radar Beacons**: Expanding dual concentric aura rings around active actor nodes.

---

## 6. Procedural Rendering & Shader Shader Techniques

The visual style is built using pure GLSL procedural primitives inside WebGL fragment shaders:

### Key Procedural Building Blocks
* **SDF Primitives**:
  - `sdRoundedBox(vec2 p, vec2 b, vec4 r)`: For cards, blocks, gauge tubes, and banners.
  - `sdCircle(vec2 p, float r)`: For gears, nodes, and coins.
  - `sdSegment(vec2 p, vec2 a, vec2 b)`: For custom vector fonts ("FUN", "+1", "LEVEL UP", "MADE IN ROMANIA").
  - `sdArc(vec2 p, float aperture, float ra, float rb)`: For cute mouth smiles and arch eyes.
  - `sdStar5(vec2 p, float r, float rf)`: For reward star tokens.
* **Contour Outlining**: Dark stroke contours rendered by expanding SDF boundaries (`abs(d) < strokeWidth`).
* **Noise & Caustics**: FBM (Fractal Brownian Motion) and simple 2D gradient noise for coastline shapes, water caustics, and terrain detail.

---

## 7. Blueprint: How to Create a New Card in This Style

To create a **new animated card** (e.g. a *Pinball Bumper*, *Inventory Slot*, *Skill Tree Crystal*, or *Boss Health Bar*), follow this step-by-step checklist:

1. **Define the Metaphor**: Pick a recognizable game mechanic or hardware prop that mirrors the metric.
2. **Select the Perspective**:
   - *Side-View 2D* for assembly/conveyor/platformer concepts.
   - *2.5D Top-Down* for maps/charts/progress bars.
   - *Raymarched 3D* for physical artifacts/hardware props.
3. **Establish the Palette (4–6 Roles)**:
   - Dark Canvas Background (Deep Navy/Indigo/Violet).
   - Primary Object Color + Darker Extrusion Shade.
   - Neon Accent Color (Cyan, Hot Crimson, Gold).
   - Dark Contour Tint (`#1C1610` style).
   - Pure White Specular Highlight.
4. **Structure the 5-Second Animation Loop**:
   - Phase 1: Build-up / Charge / Motion (0s – 2.5s).
   - Phase 2: Impact / Activation Trigger (2.5s – 3.0s).
   - Phase 3: Reward Pop / FX Burst (3.0s – 4.2s).
   - Phase 4: Cool-down & Seamless Reset (4.2s – 5.0s).
5. **Add the Tactile Juice**:
   - Bold dark vector outlines around all key shapes.
   - Elastic squish-and-stretch or tension screen shake.
   - Expressive details (cute faces, floating text popups, particle dashes, or sweeping glares).
6. **Frame inside the UI Container**:
   - Wrap in `rounded-2xl border-3 border-[#1C1610] shadow-[0_4px_0_0_#1C1610] bg-[#0d0d14]`.

---

## Conclusion

By adhering to these structural heuristics, palette rules, perspective models, and animation timing cycles, any new component or animation will seamlessly fit into the Hero banner section and reinforce the overall **Tactile Retro-Arcade** design system.
