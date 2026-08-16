# Segmented 3-Column Juicy Game Shader Prompts — 10 Arcade & 16-Bit Variants

This document provides 10 completely self-contained, copy-paste ready GLSL shader prompts for 3-column hero backgrounds. Each prompt includes the complete mathematical segmentation, boundary equations (30% / 40% / 30%), divider line style (straight, jagged, lightning, 8-bit stepped, comic double-stroke), vibrant color palette, and animated pattern logic.

---

## Variant 1: Straight Diagonal Vs Matchmaking Split (Clean Straight Dividers)

```markdown
Create a high-vibrancy, 3-column GLSL Fragment Shader Hero Background inspired by arcade "Versus Matchmaking" screens with clean, straight diagonal divider lines matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Straight Diagonal Dividers
- **Mathematical Column Boundaries**: Compute straight diagonal split lines in normalized screen UV space:
  - `slope = (uv.y - 0.5) * 0.08;` (Clean 5-degree angled tilt)
  - `edge1 = 0.30 + slope;` (Left Column 1 boundary at 30% width)
  - `edge2 = 0.70 + slope;` (Middle Column 2 boundary at 70%, width = 40%)
- **Thick Dark Outline Dividers**: Draw crisp 4px dark cartoon border lines (`#1C1610`) along `edge1` and `edge2` (`smoothstep(0.007, 0.002, abs(uv.x - edge1))`).

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Character Bay / 30%)**:
  - **Background**: Deep Magenta / Electric Pink (`#E11D48` to `#9F1239`).
  - **Pattern**: A soft circular spotlight ring (`center: vec2(0.15, 0.30)`) behind the character with 6-8 rising yellow 4-point star sparkles (`#FDE047`).
- **Column 2 (edge1 to edge2 — Bio & CTA Stage / 40%)**:
  - **Background**: Warm Amber / Sunburst Yellow (`#F59E0B` to `#D97706`).
  - **Pattern**: Radial sunburst rays emanating behind the center text ("VLAD PETRE") with a 10% opacity halftone comic dot grid overlay.
- **Column 3 (edge2 to 1.0 — Achievement Bay / 30%)**:
  - **Background**: Vibrant Arcade Cyan / Deep Aqua (`#06B6D4` to `#0E7490`).
  - **Pattern**: Upward diagonal speed lines (`step(0.88, sin(uv.y * 60.0 + u_time * 3.0))`) floating behind the 4 achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Pattern opacity capped at 15% so foreground cards and text remain 100% crisp. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 2: High-Frequency Electric Lightning Bolts (Fast Jagged Dividers)

```markdown
Create an ultra-dynamic 3-column GLSL Fragment Shader Hero Background separated by high-frequency electric lightning bolts matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & High-Frequency Lightning Dividers
- **Mathematical Column Boundaries**: Compute jagged electric lightning lines:
  - `lightning1 = (fract(sin(dot(floor(uv * 80.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025 + sin(uv.y * 45.0 + u_time * 8.0) * 0.012;`
  - `edge1 = 0.30 + lightning1;` (Left Column 1 boundary at 30%)
  - `edge2 = 0.70 + lightning1;` (Middle Column 2 boundary at 70%, width = 40%)
- **Glowing Core & Dark Outline**: Render a 2px glowing white lightning core (`smoothstep(0.005, 0.001, abs(uv.x - edge1))`) with a 4px dark cartoon outline (`#1C1610`) framing the lightning edge.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Neon Violet Bay / 30%)**:
  - **Background**: Neon Violet / Indigo (`#7C3AED` to `#4C1D95`).
  - **Pattern**: Concentric energy shockwave rings (`sin(length(uv - center) * 25.0 - u_time * 3.0)`) pulsing behind the character model.
- **Column 2 (edge1 to edge2 — Golden Energy Stage / 40%)**:
  - **Background**: Bright Golden Orange (`#F59E0B` to `#CA8A04`).
  - **Pattern**: A central conical spotlight beam aiming down from top center with floating electric comic sparks (`#FFFFFF`).
- **Column 3 (edge2 to 1.0 — Electric Azure Bay / 30%)**:
  - **Background**: Electric Azure (`#0284C7` to `#1E3A8A`).
  - **Pattern**: Horizontal energy streak pulses and glowing diamond particles drifting behind the achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: High-contrast dividers with soft internal panel gradients. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 3: 16-Bit Stepped Staircase (8-Bit Retro Arcade Dividers)

```markdown
Create a authentic 16-bit SNES style 3-column GLSL Fragment Shader Hero Background separated by pixelated stepped staircase border lines matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & 16-Bit Pixelated Dividers
- **Pixelated Coordinate Grid**: Discretize screen UV coordinates: `vec2 px_uv = floor(uv * vec2(180.0, 100.0)) / vec2(180.0, 100.0);`
- **Stepped Staircase Boundaries**: Compute pixelated stepped column dividers:
  - `step_line = floor(px_uv.y * 12.0) / 100.0 * 0.15;`
  - `edge1 = 0.30 + step_line;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + step_line;` (Column 2 boundary at 70%, width = 40%)
- **Black 4px Pixel Border**: Render crisp 4px pixelated stepped border lines (`#1C1610`) separating each column.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — 16-Bit Retro Starfield / 30%)**:
  - **Background**: Vintage Arcade Deep Purple (`#3B0764` to `#581C87`).
  - **Pattern**: 2x2 pixel gold sparkles (`#FACC15`) blinking with a 16-bit pulse frequency (`sin(u_time * 2.5 + px_uv.y * 20.0)`).
- **Column 2 (edge1 to edge2 — Retro Yellow Stage Light / 40%)**:
  - **Background**: Warm SNES Yellow / Orange (`#FEF08A` to `#EA580C`).
  - **Pattern**: A pixelated stepped spotlight cone with 4x4 Bayer dithering along the gradient edge.
- **Column 3 (edge2 to 1.0 — 16-Bit Level-Up Grid / 30%)**:
  - **Background**: Retro Cyan / Electric Blue (`#06B6D4` to `#1D4ED8`).
  - **Pattern**: Floating 16-bit level-up block outlines and glowing pixelated XP numbers (`+100`).

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Low contrast pixel dithering ensures high text and card contrast. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 4: Low-Frequency Comic Wave & Double Outlines (Cute & Chunky)

```markdown
Create a cutesy, chunky 3-column GLSL Fragment Shader Hero Background with smooth low-frequency comic wavy dividers and double-outline borders matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Double Comic Stroke Dividers
- **Mathematical Column Boundaries**: Compute smooth, low-frequency comic waves:
  - `wave1 = sin(uv.y * 6.0 + u_time * 1.2) * 0.025;`
  - `edge1 = 0.30 + wave1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + wave1;` (Column 2 boundary at 70%, width = 40%)
- **Double Outline Cartoon Stroke**: Draw a 3px dark border (`#1C1610`), a 2px white gap, and a second 2px dark border along `edge1` and `edge2`.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Bubblegum Pink / 30%)**:
  - **Background**: Pastel Bubblegum Pink (`#F472B6` to `#DB2777`).
  - **Pattern**: Floating rounded pastel hearts and 4-point star bubbles drifting upward with a gentle sine sway.
- **Column 2 (edge1 to edge2 — Butterscotch Gold / 40%)**:
  - **Background**: Soft Butterscotch Gold (`#FCD34D` to `#D97706`).
  - **Pattern**: Vertical floating conveyor dashed lines and a subtle radial spotlight glow for "VLAD PETRE".
- **Column 3 (edge2 to 1.0 — Pastel Mint / 30%)**:
  - **Background**: Fresh Pastel Mint (`#6EE7B7` to `#059669`).
  - **Pattern**: Floating rounded toy cubes, smiling coin tokens, and subtle conveyor belt rollers near the bottom.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Pastel background colors keep foreground UI elements clear and high-contrast. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 5: Vertical Split with Animated Sawtooth / Zig-Zag Edge

```markdown
Create an energetic 3-column GLSL Fragment Shader Hero Background with crisp, geometric sawtooth (zig-zag) divider lines matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Sawtooth Zig-Zag Dividers
- **Mathematical Column Boundaries**: Compute sharp sawtooth zig-zag lines:
  - `zigzag1 = abs(fract(uv.y * 14.0 + u_time * 0.2) - 0.5) * 0.03 - 0.015;`
  - `edge1 = 0.30 + zigzag1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + zigzag1;` (Column 2 boundary at 70%, width = 40%)
- **Thick Cartoon Border**: Draw a sharp 4px dark border (`#1C1610`) following the zig-zag teeth.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Neon Violet / 30%)**:
  - **Background**: Neon Violet (`#8B5CF6` to `#5B21B6`).
  - **Pattern**: Radial hero spotlight ring under the character pedestal with floating gold spark motes (`#FBBF24`).
- **Column 2 (edge1 to edge2 — Vibrant Amber Stage / 40%)**:
  - **Background**: Vibrant Sun Amber (`#F59E0B` to `#B45309`).
  - **Pattern**: Halftone comic dot grid and radial sunburst rays behind the center text.
- **Column 3 (edge2 to 1.0 — Electric Sky Blue / 30%)**:
  - **Background**: Electric Sky Blue (`#0EA5E9` to `#0369A1`).
  - **Pattern**: Diagonal speed streak bands moving upward behind the achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Clean geometric borders for high readability. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 6: Clean Straight Vertical Split with Pulsing Neon Outline

```markdown
Create a modern, clean 3-column GLSL Fragment Shader Hero Background separated by perfectly straight vertical divider lines with a subtle pulsing neon inner glow matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Straight Vertical Dividers
- **Mathematical Column Boundaries**: Compute perfectly straight vertical boundaries:
  - `edge1 = 0.30;` (Left Column 1 boundary at 30% width)
  - `edge2 = 0.70;` (Middle Column 2 boundary at 70%, width = 40%)
- **Pulsing Neon Outline**: Draw a 3px dark cartoon outline (`#1C1610`) flanked by a 2px inner neon glow line (`sin(u_time * 2.0) * 0.3 + 0.7` opacity).

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to 0.30 — Character Bay / 30%)**:
  - **Background**: Deep Crimson / Berry (`#E11D48` to `#881337`).
  - **Pattern**: Soft floor spotlight halo and rising gold XP sparks.
- **Column 2 (0.30 to 0.70 — Bio & CTA Stage / 40%)**:
  - **Background**: Golden Harvest Yellow (`#EAB308` to `#A16207`).
  - **Pattern**: Soft vertical light streaks and radial glow around "VLAD PETRE".
- **Column 3 (0.70 to 1.0 — Achievement Bay / 30%)**:
  - **Background**: Deep Ocean Blue (`#0284C7` to `#0C4A6E`).
  - **Pattern**: Floating 3D vector cubes and speed trails behind the achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Perfectly straight boundaries for maximum layout alignment. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 7: Overworld Island Coastlines (Hand-Carved Organic Boundaries)

```markdown
Create a 3-panel Overworld Stage Select GLSL Fragment Shader Hero Background with organic, hand-carved coastline boundaries matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Coastline Dividers
- **Mathematical Column Boundaries**: Compute organic coastline curves:
  - `coast1 = sin(uv.y * 8.0 + u_time * 0.6) * 0.02 + cos(uv.y * 18.0) * 0.008;`
  - `edge1 = 0.30 + coast1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + coast1;` (Column 2 boundary at 70%, width = 40%)
- **Carved Coastline Dividers**: Render a thick 4px dark border (`#1C1610`) with a white wave foam edge along the coastline.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Island Green Bay / 30%)**:
  - **Background**: Tropical Island Green (`#4ADE80` to `#15803D`).
  - **Pattern**: Circular grass pedestal contour line with subtle floating palm leaf particles.
- **Column 2 (edge1 to edge2 — Sandy Gold Path / 40%)**:
  - **Background**: Warm Sandy Gold (`#FCD34D` to `#D97706`).
  - **Pattern**: White dashed stage route paths (`step(0.5, fract(uv.x * 25.0 - u_time * 0.3))`) connecting left to right.
- **Column 3 (edge2 to 1.0 — Ocean Blue Bay / 30%)**:
  - **Background**: Ocean Water Blue (`#38BDF8` to `#0369A1`).
  - **Pattern**: Animated wave foam ripples drifting smoothly across the ocean background.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Slow, gentle wave motion (`0.2 * u_time`) to preserve focus. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 8: Mid-Frequency Comic Energy Jitter (Fighter Select Screen)

```markdown
Create an intense, arcade "Fighter Select" GLSL Fragment Shader Hero Background with mid-frequency comic energy jitter dividers matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Comic Energy Dividers
- **Mathematical Column Boundaries**: Compute mid-frequency jittering energy lines:
  - `jitter = sin(uv.y * 30.0 + u_time * 4.0) * 0.015 + cos(uv.y * 15.0) * 0.008;`
  - `edge1 = 0.30 + jitter;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + jitter;` (Column 2 boundary at 70%, width = 40%)
- **Dark Outline Stroke**: 4px dark cartoon outline (`#1C1610`) with a glowing yellow inner edge.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Hot Coral Red / 30%)**:
  - **Background**: Hot Coral Red (`#F43F5E` to `#BE123C`).
  - **Pattern**: Radial hero spotlight halo with rising flame spark motes (`#FDE047`).
- **Column 2 (edge1 to edge2 — Bright Amber Stage / 40%)**:
  - **Background**: Bright Amber Gold (`#F59E0B` to `#B45309`).
  - **Pattern**: Comic halftone dot grid and radial energy rays behind "VLAD PETRE".
- **Column 3 (edge2 to 1.0 — Electric Turquoise / 30%)**:
  - **Background**: Electric Turquoise (`#06B6D4` to `#0F766E`).
  - **Pattern**: Upward diagonal speed streak lines behind the 4 achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: High-energy feel with low pattern contrast for text legibility. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 9: Handcrafted Craft Paper & Stitched Borders (Tactile Doodle)

```markdown
Create a tactile, handcrafted 3-column GLSL Fragment Shader Hero Background with dashed stitched seam dividers matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Stitched Seam Dividers
- **Mathematical Column Boundaries**: Compute gentle hand-drawn paper curves:
  - `seam = sin(uv.y * 5.0 + u_time * 0.4) * 0.012;`
  - `edge1 = 0.30 + seam;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + seam;` (Column 2 boundary at 70%, width = 40%)
- **Dashed Stitched Seam Dividers**: Render a 3px dark line (`#1C1610`) overlaid with a dashed white thread pattern (`step(0.5, fract(uv.y * 40.0))`).

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Pastel Lilac Craft / 30%)**:
  - **Background**: Pastel Lilac Paper (`#C084FC` to `#9333EA`).
  - **Pattern**: Hand-drawn doodle star crosshairs (`+`) floating slowly in the background.
- **Column 2 (edge1 to edge2 — Warm Cardboard Gold / 40%)**:
  - **Background**: Warm Cardboard Beige (`#FCD34D` to `#D97706`).
  - **Pattern**: Dashed flight arc trails drifting smoothly across the center stage.
- **Column 3 (edge2 to 1.0 — Soft Sky Blue / 30%)**:
  - **Background**: Soft Sky Blue Paper (`#38BDF8` to `#0284C7`).
  - **Pattern**: Floating papercraft cloud silhouettes and subtle parcel dashed lines.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Paper fiber texture stays under 5% opacity for crisp text contrast. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Variant 10: Retro 8-Bit Scanline Arcade Stage (CRT Screen Split)

```markdown
Create an authentic retro 8-bit CRT arcade 3-column GLSL Fragment Shader Hero Background with horizontal scanlines and stepped border splits matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & CRT Stepped Dividers
- **Pixelated UV Space**: `vec2 px_uv = floor(uv * vec2(160.0, 90.0)) / vec2(160.0, 90.0);`
- **Stepped Boundary Equations**:
  - `step_line = floor(px_uv.y * 10.0) / 100.0 * 0.12;`
  - `edge1 = 0.30 + step_line;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + step_line;` (Column 2 boundary at 70%, width = 40%)
- **CRT Scanlines & Pixel Borders**: Render 4px black pixelated stepped borders (`#1C1610`) with horizontal CRT scanlines (`sin(uv.y * u_resolution.y * 0.5) * 0.04`).

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Midnight Arcade Purple / 30%)**:
  - **Background**: Midnight Arcade Purple (`#2E1065` to `#581C87`).
  - **Pattern**: 2x2 pixel gold sparkles (`#FDE047`) blinking softly in a upward float.
- **Column 2 (edge1 to edge2 — Arcade Yellow Spotlight / 40%)**:
  - **Background**: Bright Arcade Yellow (`#FACC15` to `#EA580C`).
  - **Pattern**: A pixelated stepped spotlight cone shining down on the center text area.
- **Column 3 (edge2 to 1.0 — Arcade Cyan Bay / 30%)**:
  - **Background**: Arcade Cyan (`#0891B2` to `#1E3A8A`).
  - **Pattern**: Glowing pixelated XP block outlines and floating `+100` numbers.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Scanline intensity kept below 5% opacity for clear UI rendering. Render as an `absolute inset-0 -z-10` canvas.
```
