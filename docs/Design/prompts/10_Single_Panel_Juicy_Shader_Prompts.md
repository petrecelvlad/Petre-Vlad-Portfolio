# 10 Single-Panel Dedicated GLSL Shader Prompts

This document provides 10 self-contained, copy-paste ready GLSL Fragment Shader prompts dedicated to **single-panel backgrounds**, column sections, hero cards, or standalone UI backdrops in games and portfolio showcases. 

Each prompt contains exact mathematical formulas, specific hex color codes (`#C084FC`), distance field functions, animation frequencies, and technical usability guardrails.

---

## Prompt 1: Character Bay Hero Pedestal (Single-Panel Character Stage)

```markdown
Create a high-energy, juicy GLSL Fragment Shader background designed specifically for a single-panel Character Bay or Hero Card backdrop.

### 1. Mathematical GLSL Architecture & Distance Fields
- **UV Coordinate Normalization**: Work in normalized space `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Vertical Gradient Canvas**: Blend a rich vertical gradient from Royal Violet (`#9333EA` / `vec3(0.57, 0.20, 0.92)`) at the top down to Electric Lavender (`#C084FC` / `vec3(0.75, 0.52, 0.98)`) at the bottom using `mix(topCol, botCol, uv.y)`.
- **Elliptical Pedestal Spotlight**: Render a glowing ground pedestal centered near the bottom `vec2 pedCenter = vec2(0.5, 0.18);`. Compute elliptical distance `float pedDist = length((uv - pedCenter) * vec2(1.0, 2.5));`. Smoothstep to create a soft emissive golden glow: `float pedestal = smoothstep(0.35, 0.0, pedDist) * 0.45;` using Warm Gold (`#FEF08A` / `vec3(0.99, 0.94, 0.54)`).
- **Floating 4-Point Star Sparkles**: Create an array loop of 6 floating star sparkles. Define a 4-point star SDF:
  ```glsl
  float drawStar(vec2 uv, vec2 center, float size) {
      vec2 d = abs(uv - center);
      float star = max(d.x + d.y * 0.4, d.y + d.x * 0.4);
      return smoothstep(size, size * 0.2, star);
  }
  ```
  Animate each star position along a gentle sine trajectory: `vec2 pos = vec2(0.1 + mod(fi * 0.15 + sin(u_time + fi) * 0.05, 0.8), fract(fi * 0.17 + u_time * 0.1));`.

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Primary Top: `#9333EA` (Royal Violet)
  - Primary Bottom: `#C084FC` (Electric Lavender)
  - Pedestal & Sparkles: `#FEF08A` (Warm Gold) and `#FDE047` (Sunshine Yellow)
- **Overlay Opacity Guardrail**: Ensure pedestal brightness does not exceed 35% opacity and sparkles do not exceed 50% opacity so foreground characters and text remain 100% legible.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse;`.
- **Performance**: Zero texture lookups, pure procedural GLSL math maintaining 60 FPS on all mobile and web targets.
```

---

## Prompt 2: Juicy Arcade Sunburst (Single-Panel Title & Bio Stage)

```markdown
Create a vibrant comic-book styled GLSL Fragment Shader background designed for a central title stage or main hero banner.

### 1. Mathematical GLSL Architecture & Ray Equations
- **UV Coordinate Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`. Center coordinates at `vec2 center = vec2(0.5, 0.5); vec2 dir = uv - center;`.
- **Background Gradient**: Blend a warm radial gradient from Sunny Amber (`#F59E0B` / `vec3(0.96, 0.62, 0.04)`) at the center to Deep Flame Orange (`#EA580C` / `vec3(0.91, 0.34, 0.05)`) at the edges.
- **Rotating Sunburst Rays**: Calculate radial angle using `float angle = atan(dir.y, dir.x);`. Generate 12 rotating sunburst light rays: `float rays = step(0.5, sin(angle * 12.0 + u_time * 0.8)) * 0.18;`.
- **Halftone Comic Dot Grid**: Implement a procedural comic halftone dot pattern:
  ```glsl
  vec2 dotUv = fract(uv * 35.0) - 0.5;
  float halftoneDots = smoothstep(0.28, 0.22, length(dotUv)) * 0.09;
  ```
- **Pulsing Central Glow**: Add a soft radial halo around the center text zone: `float halo = smoothstep(0.6, 0.0, length(dir)) * 0.25;`.

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Base Glow: `#FDE047` (Sunshine Yellow)
  - Mid-Tone: `#F59E0B` (Juicy Amber)
  - Outer Edge: `#EA580C` (Flame Orange)
  - Ray Highlights: `#FEF08A` (Cream Yellow)
- **Legibility Guardrail**: Sunburst rays and halftone dots must be capped at 15% opacity to avoid visual noise behind hero typography.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse;`.
- **Target Container**: Serves as a full-bleed `absolute inset-0 -z-10` background canvas.
```

---

## Prompt 3: Cybernetic Speed Streaks (Single-Panel Stat & Card Backdrop)

```markdown
Create a high-speed arcade tech GLSL Fragment Shader background designed for achievement cards, stats counters, or dynamic skill trees.

### 1. Mathematical GLSL Architecture & Streak Functions
- **UV Coordinate Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Diagonal Speed Line Equations**: Generate rapid diagonal streaks animated downward-right:
  ```glsl
  float streakPos = uv.x * 1.5 + uv.y * 1.2 + u_time * 2.8;
  float streaks = step(0.88, sin(streakPos * 45.0)) * 0.14;
  ```
- **Shimmering Diamond Sparkles**: Render 5 floating 4-sided diamond sparkles:
  ```glsl
  float drawDiamond(vec2 uv, vec2 center, float size) {
      vec2 d = abs(uv - center);
      return smoothstep(size, size * 0.1, d.x + d.y);
  }
  ```
  Animate sparkle positions with time offsets: `vec2 pos = vec2(0.1 + mod(fi * 0.2 + sin(u_time * 1.5 + fi), 0.8), fract(fi * 0.23 + u_time * 0.15));`.
- **Background Gradient**: Vertical blend from Electric Aqua (`#38BDF8` / `vec3(0.22, 0.74, 0.97)`) to Deep Ocean Blue (`#0284C7` / `vec3(0.01, 0.52, 0.78)`).

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Top Gradient: `#38BDF8` (Sky Blue)
  - Bottom Gradient: `#0284C7` (Arcade Blue)
  - Streaks & Diamonds: `#E0F2FE` (Ice White / Light Cyan)
- **Legibility Guardrail**: Keep line streaks sharp but subtle (12% max opacity) so stats text and progress bars pop cleanly.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse;`.
- **Performance**: Pure procedural evaluation, zero texture dependencies, 60 FPS guaranteed.
```

---

## Prompt 4: Cutesy Toy Factory (Single-Panel Soft Pastel Conveyor)

```markdown
Create a charming, soft pastel GLSL Fragment Shader background inspired by a toy factory conveyor grid.

### 1. Mathematical GLSL Architecture & Conveyor Grid
- **UV Coordinate Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Soft Pastel Background**: Vertical gradient from Butter Yellow (`#FEF08A` / `vec3(0.99, 0.94, 0.54)`) to Soft Sunshine (`#FDE047` / `vec3(0.99, 0.88, 0.28)`).
- **Vertical Conveyor Dashes**: Create upward scrolling dashed track lines:
  ```glsl
  float dashPattern = step(0.65, sin(uv.y * 50.0 + u_time * 1.8)) * step(0.02, abs(fract(uv.x * 10.0) - 0.5)) * 0.08;
  ```
- **Floating Pastel Cubes**: Render rounded square tiles floating upward:
  ```glsl
  vec2 tileUv = fract(uv * vec2(12.0, 20.0) + vec2(0.0, u_time * 0.4)) - 0.5;
  float cube = smoothstep(0.35, 0.30, abs(tileUv.x)) * smoothstep(0.35, 0.30, abs(tileUv.y)) * 0.07;
  ```

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Primary Base: `#FEF08A` (Pastel Butter)
  - Accent Gradient: `#FDE047` (Sunshine Yellow)
  - Cube Highlights: `#FFFFFF` (Pure White) and `#A7F3D0` (Pastel Mint)
- **Legibility Guardrail**: Soft contrast and low frequency motion to prevent distractive flickering.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time;`.
- **Usability**: Ideal for playful inventory cards, casual game levels, or character selection bays.
```

---

## Prompt 5: Electric Arc Plasma (Single-Panel Versus & Arena Stage)

```markdown
Create a high-energy GLSL Fragment Shader background featuring electric arc plasma waves and radial energy rings.

### 1. Mathematical GLSL Architecture & Wave Equations
- **UV Normalization & Center Offset**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy; vec2 center = vec2(0.5, 0.5);`.
- **Deep Magenta Gradient**: Vertical blend from Hot Crimson Magenta (`#E11D48` / `vec3(0.88, 0.11, 0.28)`) down to Royal Violet (`#9333EA` / `vec3(0.57, 0.20, 0.92)`).
- **Concentric Energy Pulse Rings**:
  ```glsl
  float dist = length(uv - center);
  float rings = sin(dist * 32.0 - u_time * 3.5) * 0.12;
  ```
- **Electric Sine Plasma Lines**: Add dynamic horizontal arc jitter:
  ```glsl
  float arc = sin(uv.x * 20.0 + u_time * 5.0) * 0.02;
  float lineGlow = smoothstep(0.02, 0.0, abs(uv.y - 0.5 + arc)) * 0.25;
  ```

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Core Canvas: `#E11D48` (Hot Magenta) & `#9333EA` (Royal Purple)
  - Arc Highlights: `#06B6D4` (Electric Cyan) & `#FEF08A` (Gold Flare)
- **Legibility Guardrail**: Cap ring intensity at 20% so central UI buttons remain vibrant and clear.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse;`.
```

---

## Prompt 6: Overworld Kingdom Grass (Single-Panel Stage Select Map)

```markdown
Create a lush, overworld-styled GLSL Fragment Shader background featuring undulating topographic contour lines and floating pollen sparkles.

### 1. Mathematical GLSL Architecture & Contour Waves
- **UV Coordinate Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Emerald Green Canvas**: Gradient from Emerald Meadow (`#10B981` / `vec3(0.06, 0.72, 0.51)`) to Dark Forest (`#047857` / `vec3(0.01, 0.47, 0.34)`).
- **Topographic Contour Lines**:
  ```glsl
  float contour = sin(uv.y * 28.0 + sin(uv.x * 18.0 + u_time * 0.5)) * 0.09;
  ```
- **Floating Golden Pollen Motes**:
  ```glsl
  float motes = 0.0;
  for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 pos = vec2(0.1 + mod(fi * 0.14, 0.8), fract(fi * 0.21 - u_time * 0.06));
      motes += smoothstep(0.015, 0.003, length(uv - pos)) * 0.18;
  }
  ```

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Canvas: `#10B981` (Emerald Green) to `#047857` (Forest Green)
  - Pollen Motes: `#FEF08A` (Golden Yellow)
- **Legibility Guardrail**: Soft contour wave lines with maximum 10% opacity offset.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time;`.
```

---

## Prompt 7: Steampunk Brass Cogworks (Single-Panel Industrial Workbench)

```markdown
Create an industrial steampunk GLSL Fragment Shader background featuring subtle rotating gear silhouettes and a bottom furnace heat glow.

### 1. Mathematical GLSL Architecture & Gear Geometry
- **UV Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Charcoal to Bronze Gradient**: Blend from Charcoal Slate (`#1F2937` / `vec3(0.12, 0.16, 0.21)`) to Warm Bronze (`#B45309` / `vec3(0.70, 0.32, 0.03)`).
- **Rotating Gear Teeth Silhouette**:
  ```glsl
  vec2 gearCenter = vec2(0.8, 0.8);
  vec2 gDir = uv - gearCenter;
  float gAngle = atan(gDir.y, gDir.x) + u_time * 0.5;
  float gDist = length(gDir);
  float gearTeeth = step(0.5, sin(gAngle * 10.0)) * 0.03;
  float gearBody = smoothstep(0.25 + gearTeeth, 0.24, gDist) * 0.12;
  ```
- **Furnace Heat Ember Glow**: Emissive warmth rising from bottom edge:
  ```glsl
  float furnace = smoothstep(0.5, 0.0, uv.y) * (0.2 + sin(u_time * 3.0 + uv.x * 10.0) * 0.05);
  ```

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Canvas: `#1F2937` (Dark Charcoal) to `#B45309` (Bronze)
  - Embers: `#F97316` (Furnace Orange)
- **Legibility Guardrail**: Dark background contrast ensures light text (#FFFFFF / #FEF08A) is extremely readable.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time;`.
```

---

## Prompt 8: Nintendo Game Boy DMG-01 LCD (Single-Panel Retro Monochromatic)

```markdown
Create an authentic Nintendo Game Boy DMG-01 LCD screen GLSL Fragment Shader background featuring dot-matrix pixels and scrolling 8-bit motes.

### 1. Mathematical GLSL Architecture & LCD Grid
- **UV Normalization & Pixelation**:
  ```glsl
  vec2 grid = fract(gl_FragCoord.xy / 4.0);
  float lcdDots = step(0.15, grid.x) * step(0.15, grid.y);
  ```
- **4-Shade Game Boy Palette Assignment**:
  - Darkest `#0F380F` -> Dark `#306230` -> Light `#8BAC0F` -> Lightest `#9BBC0F`.
- **Scrolling 8-Bit Block Elements**:
  ```glsl
  vec2 pxUv = floor(gl_FragCoord.xy / u_resolution.xy * vec2(80.0, 45.0)) / vec2(80.0, 45.0);
  float block = step(0.7, sin(pxUv.y * 20.0 + u_time * 1.5)) * step(0.5, fract(pxUv.x * 10.0)) * 0.15;
  ```

### 2. Colors & LCD Motion Blur
- Strict 4-shade olive green palette matching original 1989 Game Boy hardware.
- Subtle phosphor persistence motion trail simulation.

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time;`.
```

---

## Prompt 9: Volcanic Magma Chamber (Single-Panel Boss Arena)

```markdown
Create an intense volcanic GLSL Fragment Shader background with bubbling metaball lava blobs and sine heat distortion.

### 1. Mathematical GLSL Architecture & Lava Metaballs
- **UV Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Obsidian Dark Backdrop**: Gradient from `#18181B` (Dark Obsidian) to `#7F1D1D` (Deep Blood Red).
- **Rising Lava Metaballs**:
  ```glsl
  float lavaField = 0.0;
  for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 center = vec2(0.2 + fi * 0.15, fract(fi * 0.25 + u_time * 0.12));
      lavaField += 0.03 / length(uv - center);
  }
  float lavaBlobs = smoothstep(0.8, 1.2, lavaField) * 0.3;
  ```
- **Heat Sine Distortion**: Offset UVs by `sin(uv.y * 30.0 + u_time * 2.0) * 0.005`.

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Backdrop: `#18181B` (Obsidian)
  - Lava Blobs: `#F97316` (Fiery Orange) & `#EF4444` (Crimson Red)

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time;`.
```

---

## Prompt 10: Celestial Starforge Nebula (Single-Panel Skill Tree & Cosmic Stage)

```markdown
Create a deep celestial GLSL Fragment Shader background featuring rotating cosmic nebula clouds and twinkling star constellation nodes.

### 1. Mathematical GLSL Architecture & Cosmic Nebula
- **UV Normalization**: Compute `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`.
- **Deep Indigo Canvas**: Gradient from Midnight Indigo (`#1E1B4B` / `vec3(0.12, 0.11, 0.29)`) to Stellar Purple (`#6B21A8` / `vec3(0.42, 0.13, 0.66)`).
- **Nebula Noise Clouds**: Procedural sine noise overlay:
  ```glsl
  float noise = sin(uv.x * 6.0 + u_time * 0.4) * cos(uv.y * 6.0 - u_time * 0.3) * 0.15;
  ```
- **Twinkling Star Nodes**: Render 8 twinkling star nodes connected by subtle linear pulse paths:
  ```glsl
  float stars = 0.0;
  for (int i = 0; i < 8; i++) {
      float fi = float(i);
      vec2 pos = vec2(fract(fi * 0.13 + 0.1), fract(fi * 0.27 + 0.15));
      float twinkle = 0.5 + 0.5 * sin(u_time * 3.0 + fi * 2.0);
      stars += smoothstep(0.012, 0.002, length(uv - pos)) * twinkle * 0.4;
  }
  ```

### 2. Colors, Micro-Patterns & Opacities
- **Color Palette**:
  - Deep Space: `#1E1B4B` (Indigo) to `#6B21A8` (Purple)
  - Stars & Constellations: `#F8FAFC` (Starlight White) & `#38BDF8` (Cosmic Cyan)

### 3. Technical & Usability Rules
- **Uniforms Required**: `uniform vec2 u_resolution; uniform float u_time;`.
- **Usability**: Perfect backdrop for skill trees, cosmic portals, and achievement showcases.
```
