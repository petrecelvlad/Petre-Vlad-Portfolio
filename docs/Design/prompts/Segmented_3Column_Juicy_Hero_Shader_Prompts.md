# Segmented 3-Column Juicy Game Shader Prompts

This document provides 5 self-contained, copy-paste ready agent prompts for creating **Segmented 3-Column Hero Shader Backgrounds**. Each prompt includes the complete 3-column GLSL math, column boundaries (30% / 40% / 30%), cartoon outline divider rules, color palette, and visual pattern specifications.

---

## Prompt 1: Juicy Arcade Versus & Speed Trails (3-Tone Split)

```markdown
Create a high-energy, juicy GLSL Fragment Shader Hero Background segmented into 3 distinct color columns matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Cartoon Outline Dividers
- **Mathematical Column Boundaries**: Compute boundaries in normalized screen UV space:
  - `wave1 = sin(uv.y * 12.0 + u_time * 1.5) * 0.012 + cos(uv.y * 24.0) * 0.005;`
  - `wave2 = sin(uv.y * 14.0 - u_time * 1.2) * 0.012 + sin(uv.y * 28.0) * 0.004;`
  - `edge1 = 0.30 + wave1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + wave2;` (Column 2 boundary at 70%, making Middle Column 40% width)
- **Thick Cartoon Divider Lines**: Draw crisp 3px-4px dark outline borders along `edge1` and `edge2` using `#1C1610` (`smoothstep(0.006, 0.002, abs(uv.x - edge1))`).

### 2. Column Aesthetics, Colors & Patterns
- **Left Column (0.0 to edge1 — Character Bay / 30%)**:
  - **Background**: Electric Purple / Candy Violet gradient (`#C084FC` to `#9333EA`).
  - **Pattern**: A soft circular pedestal spotlight beneath the character (`center: vec2(0.15, 0.25)`), with 6-8 yellow 4-point star sparkles (`#FDE047`) floating upward with gentle sine swaying.
- **Middle Column (edge1 to edge2 — Bio & CTA Stage / 40%)**:
  - **Background**: Warm Juicy Orange / Sunburst Amber gradient (`#F59E0B` to `#D97706`).
  - **Pattern**: Radial sunburst light rays emanating behind the center title ("VLAD PETRE") with a subtle halftone comic dot pattern overlaid at 10% opacity.
- **Right Column (edge2 to 1.0 — Achievement Cards / 30%)**:
  - **Background**: Vibrant Arcade Cyan / Sky Blue gradient (`#38BDF8` to `#0284C7`).
  - **Pattern**: Upward diagonal speed streak lines (`slope = 1.2`) and glowing diamond sparkles floating behind the achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Keep interior pattern opacities low (15-20% max) so foreground cards, text, and buttons remain 100% crisp and readable. Render as a full-screen `absolute inset-0 -z-10` canvas.
```

---

## Prompt 2: Cutesy Toy Factory & Halftone Comic Grid (Matchmaking Style)

```markdown
Create a cute, brightly-colored GLSL Fragment Shader Hero Background styled as a 3-panel comic / toy factory character roster matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Comic Outline Dividers
- **Mathematical Column Boundaries**: Compute boundaries in normalized screen UV space:
  - `wave1 = sin(uv.y * 10.0 + u_time * 1.0) * 0.015;`
  - `wave2 = cos(uv.y * 10.0 - u_time * 0.8) * 0.015;`
  - `edge1 = 0.30 + wave1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + wave2;` (Column 2 boundary at 70%, making Middle Column 40% width)
- **Comic Split Dividers**: Hand-drawn double-line dark cartoon borders (`#1C1610`) tracing `edge1` and `edge2` with smoothstep antialiasing.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Lavender / Pink Roster)**:
  - **Background**: Pastel lavender canvas (`#E9D5FF` to `#DDD6FE`).
  - **Pattern**: Glowing circular character pedestal ring on the floor with rising pastel hearts and star motes floating softly upward.
- **Column 2 (edge1 to edge2 — Butter Yellow Stage)**:
  - **Background**: Soft pastel butter yellow (`#FEF08A` to `#FDE047`).
  - **Pattern**: Vertical floating conveyor dashed lines and a subtle radial spotlight glow highlighting the name "VLAD PETRE".
- **Column 3 (edge2 to 1.0 — Mint / Turquoise Bay)**:
  - **Background**: Fresh mint turquoise (`#A7F3D0` to `#6EE7B7`).
  - **Pattern**: Floating rounded toy cubes, smiling coin tokens, and subtle conveyor belt rollers near the bottom.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: High-vibrancy pastel colors with low internal contrast so foreground UI elements pop cleanly. Render as a full-screen `absolute inset-0 -z-10` canvas.
```

---

## Prompt 3: Electric Vs Matchmaking Lightning Divider Stage

```markdown
Create a dynamic, high-vibrancy GLSL Fragment Shader Hero Background featuring an electric comic-book lightning bolt divider separating 3 distinct zones matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Lightning Dividers
- **Mathematical Column Boundaries**: Compute boundaries in normalized screen UV space:
  - `jagged1 = (fract(sin(dot(floor(uv * 40.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;`
  - `edge1 = 0.30 + jagged1 + sin(uv.y * 16.0 + u_time * 3.0) * 0.01;` (Column 1 boundary at 30%)
  - `edge2 = 0.70 + jagged1 - sin(uv.y * 16.0 - u_time * 2.5) * 0.01;` (Column 2 boundary at 70%, Middle = 40%)
- **Glowing Lightning Dividers**: A glowing white core stroke (`stroke = smoothstep(0.008, 0.002, abs(uv.x - edge1))`) with a 3px dark cartoon outline (`#1C1610`) framing the lightning split.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Deep Magenta Bay)**:
  - **Background**: Deep Magenta / Hot Pink gradient (`#DB2777` to `#BE185D`).
  - **Pattern**: Soft concentric energy pulse rings (`sin(length(uv - center) * 20.0 - u_time * 2.0)`) radiating behind the hero character.
- **Column 2 (edge1 to edge2 — Warm Honey Gold Stage)**:
  - **Background**: Warm Honey Gold (`#F59E0B` to `#B45309`).
  - **Pattern**: A central conical spotlight beam aiming down from top center (`uv.y = 1.0`) with floating comic energy sparks.
- **Column 3 (edge2 to 1.0 — Electric Cyan Bay)**:
  - **Background**: Electric Cyan / Aqua (`#06B6D4` to `#0891B2`).
  - **Pattern**: Fast horizontal speed lines (`step(0.85, sin(uv.y * 80.0 + u_time * 4.0))`) behind the 4 achievement cards.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Procedural distance functions ensure 60fps performance while keeping interior patterns soft enough for foreground text. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Prompt 4: Overworld Stage Select (Islands & Water Split)

```markdown
Create a 3-panel Overworld Stage Select GLSL Fragment Shader Hero Background with distinct island biome themes for each column matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Coastline Dividers
- **Mathematical Column Boundaries**: Compute boundaries in normalized screen UV space:
  - `coast1 = sin(uv.y * 8.0 + u_time * 0.5) * 0.02 + cos(uv.y * 18.0) * 0.008;`
  - `coast2 = cos(uv.y * 7.0 - u_time * 0.4) * 0.02 + sin(uv.y * 14.0) * 0.006;`
  - `edge1 = 0.30 + coast1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + coast2;` (Column 2 boundary at 70%, Middle = 40%)
- **Carved Coastline Dividers**: Hand-carved organic coastline borders rendered with a thick 3px dark outline (`#1C1610`) and white wave foam edges.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Tropical Island Green)**:
  - **Background**: Vibrant Tropical Green (`#4ADE80` to `#16A34A`).
  - **Pattern**: Circular grass pedestal contour lines on the floor with subtle floating palm leaf particles.
- **Column 2 (edge1 to edge2 — Sandy Gold Pathway)**:
  - **Background**: Warm Sandy Gold (`#FCD34D` to `#F59E0B`).
  - **Pattern**: White dashed stage-select route paths (`step(0.5, fract(uv.x * 25.0 - u_time * 0.3))`) connecting the left character to the right cards.
- **Column 3 (edge2 to 1.0 — Ocean Water Blue)**:
  - **Background**: Ocean Water Blue (`#38BDF8` to `#0284C7`).
  - **Pattern**: White animated wave foam ripples drifting smoothly across the sea canvas.

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Motion speed capped at `0.2 * u_time` so the background feels calm yet alive. Render as an `absolute inset-0 -z-10` canvas.
```

---

## Prompt 5: Retro 16-Bit Super Mario World Stage Roster

```markdown
Create a 16-bit SNES style 3-panel Character Select GLSL Fragment Shader Hero Background with pixel-art dithering and bright retro colors matching our 30% / 40% / 30% UI layout.

### 1. 3-Column GLSL Segmentation & Pixelated Border Dividers
- **Pixelated UV Grid**: Discretize screen coordinates for pixel-art rendering: `vec2 px_uv = floor(uv * vec2(160.0, 90.0)) / vec2(160.0, 90.0);`
- **Mathematical Column Boundaries**: Compute boundaries in pixelated space:
  - `wave1 = floor(sin(px_uv.y * 12.0 + u_time * 1.2) * 3.0) / 100.0;`
  - `edge1 = 0.30 + wave1;` (Column 1 boundary at 30% width)
  - `edge2 = 0.70 + wave1;` (Column 2 boundary at 70%, Middle = 40%)
- **Pixelated Stepped Borders**: Black 4px pixelated stepped border lines (`#1C1610`) separating each column panel.

### 2. Column Aesthetics, Colors & Patterns
- **Column 1 (0.0 to edge1 — Retro Purple Starfield)**:
  - **Background**: Vintage Arcade Purple (`#3B0764` to `#6B21A8`).
  - **Pattern**: 2x2 pixel gold sparkles blinking softly with a retro pulse frequency (`sin(u_time * 2.0 + px_uv.y * 10.0)`).
- **Column 2 (edge1 to edge2 — 16-Bit Yellow Stage Light)**:
  - **Background**: Warm SNES Yellow / Orange (`#FEF08A` to `#F97316`).
  - **Pattern**: A pixelated stepped spotlight cone shining down on the middle text area with 4x4 Bayer dithering along the spotlight gradient.
- **Column 3 (edge2 to 1.0 — Retro Cyan Level Grid)**:
  - **Background**: Retro Cyan / Electric Blue (`#06B6D4` to `#1D4ED8`).
  - **Pattern**: Glowing 16-bit level-up block patterns and floating pixelated XP numbers (`+100`).

### 3. Technical & Usability Rules
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Legibility Guardrail**: Low contrast pixel dithering ensures high text and card contrast. Render as an `absolute inset-0 -z-10` canvas.
```
