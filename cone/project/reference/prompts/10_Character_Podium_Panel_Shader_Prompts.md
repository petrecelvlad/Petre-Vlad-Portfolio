# 5 Floating Mossy Grass Island GLSL Shader Prompts

## Overview
These GLSL Fragment Shader prompts render low-profile, clean **floating stone islands with green grass on top, mossy rock walls, cascading waterfalls dripping into the void, hanging moss/vines, and a spinning top character dial**.

---

## Prompt 1: Classic Green Grass Floating Island with Cascading Waterfall & Hanging Vines

Create a GLSL Fragment Shader dedicated purely to rendering a low-profile floating stone island with vibrant green grass on top, mossy rock sides, a cascading waterfall dripping downward into the void, hanging ivy vines, and a spinning top character footing dial.

### 1. Mathematical Floating Island Architecture & Volumetric Extrusion
- **UV Canvas & Island Center**: Work in `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`. Position island center at `center = vec2(0.15, 0.0);`. Perspective compression ratio = `2.4`.
- **Isolated Sky Canvas**: Clean slate navy background gradient (`#0F172A` to `#1E293B`).
- **Green Grass Turf Top**:
  - Elliptical grass cap centered at `y = 0.08`, radius `R = 0.12`. Equation: `length((uv - (center + vec2(0.0, 0.08))) * vec2(1.0, 2.4)) < 0.12`.
  - Scalloped Green Grass Turf: Lush meadow green face (`#4ADE80` & `#86EFAC`) with a bright scalloped mint grass rim highlight along top edge.
- **Mossy Stone Chassis & Hanging Vines**:
  - Vertical Rock Wall: Weathered dark granite texture (`#334155` and `#1E293B`) extending down to `y = 0.01`.
  - Overgrown Moss: Scalloped forest moss patches (`#15803D`) along the rock rim and crevices.
  - Hanging Ivy Vines: Sinusoidal vine tendrils dripping down beneath the island chassis `step(0.72, sin(uv.x * 60.0 + uv.y * 40.0))` reaching into the void.
- **Cascading Waterfall & Downward Water Drips**:
  - Micro waterfall spilling off the front-left ledge into a vertical water stream `sin(uv.y * 100.0 - u_time * 6.0)` with falling water droplets dripping down into the abyss (`#ECFDF5`).
- **Spinning Character Footing Dial**:
  - Centered at `y = 0.15`, radius `r_dial = 0.06`.
  - Rotating Top Face: Polar angle rotation `atan(d.y, d.x) + u_time * 1.2` drawing concentric stone groove rings and a spinning character standing platter.
- **Floating Motion**:
  - Island Vertical Sway: Micro floating bobbing motion `vec2 center = vec2(0.15, 0.003 * sin(u_time * 1.5));`.

### 2. Materials & Color Palette
- **Canvas**: Slate Navy (`#0F172A` to `#1E293B`).
- **Grass Turf**: Meadow Green (`#4ADE80`) & Mint Highlight (`#86EFAC`).
- **Moss & Vines**: Forest Moss (`#15803D` & `#22C55E`).
- **Stone Chassis**: Dark Slate Granite (`#334155` & `#1E293B`).
- **Waterfall**: Cascading Water Foam (`#ECFDF5` & `#6EE7B7`).

### 3. Technical & Usability Rules
- **Uniforms**: `uniform vec2 u_resolution; uniform float u_time;`.

---

## Prompt 2: Terraced Mossy Stone Island with Twin Cascading Waterfalls & Hanging Moss Strands

Create a GLSL Fragment Shader dedicated purely to rendering a 2-tiered terraced floating stone island with green grass turf on both levels, mossy rock cliffs, twin waterfalls spilling off opposite edges, and hanging moss strands dripping beneath.

### 1. Mathematical Floating Island Architecture
- **UV Canvas & Alignment**: Work in `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`. Island center at `center = vec2(0.15, 0.0);`.
- **Terraced Green Grass Levels**:
  - Lower Turf Level: Centered at `y = 0.06`, radius `R1 = 0.13` in rich green grass (`#22C55E`).
  - Upper Turf Level: Centered at `y = 0.11`, radius `R2 = 0.085` in bright meadow grass (`#4ADE80`).
- **Twin Cascading Waterfalls**:
  - Left and Right Waterfalls: Water spilling off both sides (`abs(uv.x - 0.15) > 0.07`), animated downward flow `sin(uv.y * 120.0 - u_time * 5.0)` with dripping water droplets.
- **Mossy Rock Walls & Hanging Moss Strands**:
  - Dark granite rock walls covered in overgrown moss (`#15803D`).
  - Soft hanging moss tendrils dripping off the lower rock edge down to `y = -0.04`.
- **Spinning Character Footing Dial**:
  - Centered at `y = 0.16`, radius `r_dial = 0.06`.
  - Rotating Top Face: Polar angle rotation `atan(d.y, d.x) + u_time * 1.0` evaluating rotating stone notch grooves.

### 2. Materials & Color Palette
- **Canvas**: Dark Slate (`#0F172A` to `#1E293B`).
- **Grass Turf**: Fresh Grass (`#22C55E` & `#4ADE80`).
- **Moss & Vines**: Dark Forest Moss (`#15803D`).
- **Stone**: Weathered Slate Granite (`#475569` & `#334155`).
- **Waterfalls**: Pure White Foam & Mint Stream (`#ECFDF5` & `#A7F3D0`).

### 3. Technical & Usability Rules
- **Uniforms**: `uniform vec2 u_resolution; uniform float u_time;`.

---

## Prompt 3: Overgrown Grass Meadow Island with Wide Front Waterfall & Dripping Root Tendrils

Create a GLSL Fragment Shader dedicated purely to rendering a wide floating meadow island topped with lush green grass, overgrown mossy rock ledges, a wide central waterfall pouring off the front lip into the void, and dangling root tendrils dripping beneath.

### 1. Mathematical Floating Island Architecture
- **UV Canvas & Alignment**: Work in `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`. Island center at `center = vec2(0.15, 0.0);`.
- **Wide Green Grass Meadow Cap**:
  - Wide elliptical grass face centered at `y = 0.07`, radius `R = 0.14`. Vibrant spring green grass (`#4ADE80` & `#86EFAC`).
- **Wide Front Waterfall & Droplets**:
  - Central waterfall spilling straight off the front edge (`abs(uv.x - 0.15) < 0.045`), animated stream `sin(uv.y * 90.0 - u_time * 6.0)` with falling spray droplets.
- **Mossy Rock Chassis & Dangling Roots**:
  - Dark mossy rock body (`#1E293B` & `#15803D`).
  - Dangling root tendrils and moss strands dripping beneath the island down to `y = -0.05`.
- **Spinning Character Footing Dial**:
  - Centered at `y = 0.14`, radius `r_dial = 0.065`.
  - Rotating Top Face: Polar angle rotation `atan(d.y, d.x) + u_time * 1.2` with concentric rings.

### 2. Materials & Color Palette
- **Canvas**: Slate Navy (`#0F172A` to `#1E293B`).
- **Grass Meadow**: Spring Green (`#4ADE80` & `#86EFAC`).
- **Moss & Roots**: Deep Moss (`#15803D`) & Loam Brown (`#78350F`).
- **Waterfall**: Wide Foam Stream (`#ECFDF5` & `#6EE7B7`).

### 3. Technical & Usability Rules
- **Uniforms**: `uniform vec2 u_resolution; uniform float u_time;`.

---

## Prompt 4: Circular Mossy Granite Island with Spiral Water Stream & Downward Water Droplets

Create a GLSL Fragment Shader dedicated purely to rendering a circular floating granite island with green grass, a spiral stream that flows across the grass and cascades into a waterfall dripping down into the void, surrounded by moss and dangling vines.

### 1. Mathematical Floating Island Architecture
- **UV Canvas & Alignment**: Work in `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`. Island center at `center = vec2(0.15, 0.0);`.
- **Circular Grass Cap & Spiral Stream**:
  - Circular grass cap centered at `y = 0.08`, radius `R = 0.12` in lush green (`#4ADE80`).
  - Spiral Water Stream: Recessed water channel winding across the grass face `sin(atan(d.y, d.x) * 3.0 + length(d) * 30.0)` leading to the edge.
- **Edge Waterfall & Downward Droplets**:
  - Water stream spilling off the edge into a falling waterfall stream `sin(uv.y * 110.0 - u_time * 5.5)` dripping downward.
- **Mossy Ledges & Hanging Vines**:
  - Weathered granite rock wall with overgrown moss ledges (`#15803D`) and dangling ivy tendrils.
- **Spinning Character Footing Dial**:
  - Centered at `y = 0.15`, radius `r_dial = 0.06`.
  - Rotating Top Face: Polar rotation `atan(d.y, d.x) + u_time * 1.4` drawing rotating stone grooves.

### 2. Materials & Color Palette
- **Canvas**: Dark Slate Navy (`#0F172A` to `#1E293B`).
- **Grass & Moss**: Meadow Green (`#4ADE80`) & Forest Moss (`#15803D`).
- **Granite Rock**: Slate Granite (`#334155` & `#1E293B`).
- **Water Stream**: Pure Aqua & Foam (`#6EE7B7` & `#ECFDF5`).

### 3. Technical & Usability Rules
- **Uniforms**: `uniform vec2 u_resolution; uniform float u_time;`.

---

## Prompt 5: Voxel Mossy Grass Island with Sanctum Dial & Falling Water Voxels (Chunky Voxel Pedestal)

Create a GLSL Fragment Shader dedicated purely to rendering a low-profile chunky 3D voxel floating stone island pedestal—retaining strictly the island pedestal element without background scenery—featuring pixelated voxel mossy grass, glowing mint rune channels, falling voxel water particles dripping into the void, and a spinning top sanctum dial.

### 1. Mathematical Voxel Floating Pedestal Architecture
- **UV Canvas & Alignment**: Work in `vec2 uv = gl_FragCoord.xy / u_resolution.xy;`. Position pedestal center at `center = vec2(0.15, 0.0);`. Perspective ratio = `2.4`.
- **Isolated Clean Canvas**: Clean neutral background gradient from soft slate green (`#022C22`) to dark slate (`#064E3B`) with ambient fog. No background scenery.
- **Polar Angular Voxel Island Contour**:
  - Base radius equation: `float r_rock = 0.12 + 0.02 * sin(angle * 8.0) * cos(angle * 3.0);`.
  - Voxel Grid Stepping: Quantize UV spatial coordinates `vec2 grid_uv = floor(uv * 120.0) / 120.0;` for chunky blocky voxel edges.
- **Tier 1 (Tapered Basalt Voxel Cliffs & Falling Water Voxels)**:
  - Jagged cliff steps (`#1E293B` & `#475569`) tapering down to `y = -0.08`.
  - **Falling Voxel Water Particles**: Rectangular blocky water drops (`#ECFDF5`, opacity 0.8) falling vertically down off cliff edges `y -= speed * u_time` into the abyss.
- **Tier 2 (Voxel Moss Rim & Mint Rune Channels)**:
  - Moss Rim Voxels (`#15803D` & `#4ADE80`) along the cliff edge `dist > r_rock - 0.025`.
  - Glowing Mint Rune Ring: Concentric rune channel at `r_rock - 0.015` with segmented rune pulses `step(0.6, sin(angle * 16.0)) * vec3(0.65, 0.95, 0.81)`.
- **Tier 3 (Top Voxel Grass Cap & Sanctum Dial - Character Footing)**:
  - Top Cap Face centered at `y = 0.14`, radius `r_cap = 0.075`. Checkerboard voxel grass pattern (`#15803D` and `#4ADE80`).
  - Elevated Sanctum Dial at center (`r < 0.035`): Elevated voxel stone step with 12 rotating rune glyph voxels (`#A7F3D0`) and a central emissive mint core (`#A7F3D0`).
- **Floating Motion & Ambient Motes**:
  - Pedestal Group Rotation: Slow pedestal rotation `u_time * 0.1`.
  - Floating Ambient Dust Points: Tiny glowing mint dust particles (`#A7F3D0`) floating slowly around the voxel island.

### 2. Materials & Color Palette
- **Canvas**: Dark Slate Green (`#022C22` to `#064E3B`).
- **Voxel Grass**: Bright Moss (`#4ADE80`) & Dark Moss (`#15803D`).
- **Voxel Stone**: Dark Basalt (`#1E293B`) & Light Granite (`#475569`).
- **Glowing Runes**: Emissive Pastel Mint (`#A7F3D0`).
- **Water Voxels**: Translucent Foam (`#ECFDF5`).

### 3. Technical & Usability Rules
- **Uniforms**: `uniform vec2 u_resolution; uniform float u_time;`.
