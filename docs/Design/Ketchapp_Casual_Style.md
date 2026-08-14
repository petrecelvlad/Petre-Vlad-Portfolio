# The Vector Arcade & Kenney-Game Design System: Heuristics & Style Guide

## Overview
The **Vector Arcade / Kenney Game Asset** aesthetic blends clean, vibrant, play-ready vector art with the tactile polish of modern mobile arcade hit games (e.g. Kenney.nl game assets, Archero, Legend of Slime, Survivor.io). 

Unlike overly flat or plain paint-like graphics, this style is rich in **bold dark contours, 3D extruded bottom bases, glossy specular highlights, and playful vector surface details**—giving every UI component, button, and animated machine part the tactile weight of a physical arcade toy or game asset.

---

## Core Visual Heuristics

### 1. Bold Dark Contours & Outlines
* **Thick Contour Strokes:** Every single object, button, platform, gear, character, or tile is enclosed in a bold dark outline stroke (`stroke="#1E293B"`, `#18181B`, or `#221C11` with `strokeWidth="2.5px"` to `4px`, `strokeLinecap="round"`, `strokeLinejoin="round"`).
* **Crisp Separation:** Outlines guarantee high readability and pop against any background, preventing elements from looking washed-out or flat.

### 2. Extruded 3D Bottom Bases (Toy / Arcade Depth)
* **3D Bottom Lip / Shelf:** Buttons, cards, and platforms feature an extruded darker bottom base layer (3px–6px thick) beneath the main surface face:
  * **Top Surface Face:** Bright saturated color (e.g., Lime Green `#4ADE80`, Sunshine Yellow `#FACC15`, Sky Blue `#38BDF8`, Crimson `#F87171`).
  * **Extruded 3D Base:** Darker tone of the same hue (e.g., `#16A34A` for green, `#CA8A04` for yellow, `#0284C7` for blue, `#B91C1C` for red).
  * **Physical Click Action:** Buttons physically translate down (`translateY(3px)`) when pressed, flattening the extruded base for tactile feedback.

### 3. Specular Highlights & Glossy Bevels
* **Inner Top-Left White Specular Line:** Light source fixed from top-left. A subtle 1.5px white highlight line (`stroke="white"`, `opacity="0.5"`) runs along top-left inner edges.
* **Glossy Curved Reflections:** Glass tubes, slimes, buttons, and coins feature a curved white crescent glare mark (`fill="white"`, `opacity="0.35"` to `0.6"`).

### 4. Rich Surface Patterns & Vector Details
* **Textured Surfaces:**
  * **Ground & Wood:** Subtle inner wavy or zigzag pattern lines (`stroke="#92400E"`, `strokeDasharray="4 2"` or continuous curves).
  * **Grass & Tufts:** Rounded tufts or scalloped top edges with dark outline boundaries.
  * **Question Blocks & Chests:** Embossed central badges (`!`, `?`, keyholes, star crests) with inner dark strokes and white highlight glares.
* **Hardware & Springs:** Coiled spring bumpers, wooden ladders with rungs, switches, and flag markers add rich mechanical flavor without feeling dark or industrial.

### 5. Vibrant Palette & Typography
* **Arcade Saturated Colors:**
  * **Grass / Success Green:** `#4ADE80` (face) / `#16A34A` (base)
  * **Golden Yellow / Coin:** `#FACC15` (face) / `#CA8A04` (base)
  * **Sky Blue / Mana:** `#38BDF8` (face) / `#0284C7` (base)
  * **Heart / Danger Red:** `#F87171` (face) / `#B91C1C` (base)
  * **Arcade Purple:** `#C084FC` (face) / `#7E22CE` (base)
* **Text Outlines & Shadows:** Heavy white text stroke (`paintOrder="stroke fill"`, `stroke="white"`, `strokeWidth="4px"`) + dark drop shadow for maximum UI legibility.

