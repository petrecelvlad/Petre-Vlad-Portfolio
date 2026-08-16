# GLSL Game Shader Hero Background Prompts

This document provides copy-paste ready agent prompts for building GPU-accelerated GLSL shader hero backgrounds in the **Vector Arcade / Kenney Game Aesthetic**.

---

## Primary Prompt: Floating Question-Block Sky Shader

```markdown
Create a full-bleed GLSL Fragment Shader Hero Background in WebGL/React using 2D Signed Distance Fields (SDFs).

### Aesthetic & Visuals: Floating Question-Block Sky
- **Foreground Elements:** Floating golden Question Mark Blocks (`?`), rotating shiny coins, and green platform tiles drifting upward in a smooth parallax grid.
- **Styling Rules:**
  - Bold 2.5px dark outlines (`#1E293B`) around all block shapes using `abs(sd) < 0.015`.
  - 3D Extruded base shading on lower block halves (`p.y < -0.05 => col *= 0.65`).
  - Specular top-left glare lines on block rims and coins.
  - Sky blue gradient backdrop (`#38BDF8` to `#0284C7`) with soft procedural drifting clouds.

### Technical Requirements
- Uniforms: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Cursor interaction: Moving mouse subtly tilts background parallax vectors.
- Render as an `absolute inset-0 -z-10` canvas behind hero title/subtitle text with gradient vignette overlay.
```

---

## Variant A: Parallax Side-Scrolling Platformer World Shader

```markdown
Create an interactive GLSL Fragment Shader Hero Background simulating a 2D side-scrolling platformer landscape.

### Aesthetic & Visuals: Scrolling Platformer World
- **Parallax Layers (Left-to-Right Scrolling):**
  - **Background:** Distant blue mountain silhouettes and sun disc.
  - **Midground:** Sine-wave rounded green hills with grass tufts and clouds (`sin(st.x * 4.0 + u_time)`).
  - **Foreground:** Floating dirt/grass ledge platforms with coiled spring bumpers.
- **Styling Rules:** Thick dark outlines, extruded 3D dirt lips (`#78350F`), vibrant Kenney green grass (`#4ADE80`).

### Technical Requirements
- Uniforms: `u_resolution`, `u_time`, `u_mouse`.
- Speed control via `u_time` scaling for smooth infinite scrolling.
```

---

## Variant B: Bouncy Slime & Gem Meadow Shader

```markdown
Create an interactive GLSL Fragment Shader Hero Background featuring cute animated slimes and glowing gems.

### Aesthetic & Visuals: Interactive Slime & Gem Meadow
- **Procedural Metaball Slimes:** Colorful 2D slime blobs that squish, float, and dynamically merge together using smooth minimum functions (`smin(d1, d2, k)`).
- **Interactive Gems:** Glowing 3D-extruded rubies and sapphires that react to mouse position (`u_mouse`), bursting into tiny particle ripples on hover.
- **Styling Rules:** Bold dark contours, glossy white crescent glares on slime bodies, vibrant arcade colors.

### Technical Requirements
- Uniforms: `u_resolution`, `u_time`, `u_mouse`.
- Mouse position pushes nearby slimes away for fluid cursor interaction.
```

---

## Variant D: Classic Mario Side-Scrolling Level Replica Shader

```markdown
Create a full-bleed GLSL Fragment Shader Hero Background that precisely replicates a classic 2D Mario platformer level continuously scrolling right-to-left.

### Aesthetic & Visuals: Authentic Mario Level Replica
- **Infinite Right-to-Left Scrolling Scene (`u_time` driven):**
  - **Sky & Clouds:** Sky blue gradient (`#5C94FC`) with procedural rounded white clouds drifting in the upper sky.
  - **Ground Layer:** Double-row ground blocks featuring bright green grass tops (`#00A800`), 2-pixel dark outlines, and brown dirt base (`#E45C10`) with dark mortar pattern lines.
  - **Warp Pipes:** Classic green warp pipes (`#00A800` top highlight, `#00A800` / `#007000` shadow) with raised lip collars and dark outlines (`#000000` / `#1E293B`).
  - **Question & Brick Blocks:** Floating 4-block clusters containing golden Question Mark Blocks (`?` with corner rivets and glowing question mark SDF) alternating with brown brick blocks (`#C84C0C` with mortar seam lines).
  - **Coins & Bushes:** Animated rotating golden coins hovering above blocks and scalloped green bushes along the ground line.
- **Styling Rules:**
  - Crisp dark outlines (`strokeWidth 0.012`) around all pipes, blocks, and coins.
  - 3D bottom-lip extruded shadows (`p.y < -0.05 => col *= 0.7`) on all blocks.
  - Specular white top-left glare highlights on pipes and coins.

### Technical Requirements
- Uniforms: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Continuous, seamless infinite loop modulo math (`mod(st.x + u_time * 0.35, levelWidth)`).
- Mount as an `absolute inset-0 -z-10` canvas behind hero section text.
```

---

## Variant E: Infinite Diagonal Question-Block Checkerboard Shader

```markdown
Create an eye-catching GLSL Fragment Shader Hero Background featuring an infinite diagonal checkerboard grid of golden Mario Question Mark Blocks (`?`).

### Aesthetic & Visuals: Diagonal Question-Block Checkerboard
- **Diagonal Infinite Scroll Loop:**
  - A 45-degree angled checkerboard grid (`rotate2d(0.7853)`) scrolling infinitely up and to the right (`mod(st + u_time * 0.15, gridSpacing)`).
  - **Tile Pattern:** Alternating tiles between golden 3D Mario Question Blocks (`?`) and deep arcade slate/navy tiles (`#1E293B` or `#0F172A`).
- **Question Block Detail:**
  - Vibrant golden yellow face (`#FACC15`) with extruded 3D amber base (`#CA8A04`).
  - Dark 4-point corner rivets in every block corner.
  - Centered glowing white/amber `?` symbol carved into the face with inner shadow.
  - Glossy top-left white crescent glare line (`opacity 0.45`).
- **Pulsating Grid Energy:** Subtle light pulse traveling along the grid diagonal on every beat.

### Technical Requirements
- Uniforms: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Mouse movement subtly warps grid perspective slightly near the cursor for interactive depth.
- Full-bleed background canvas with a soft dark vignette overlay (`radial-gradient(ellipse at center, transparent 40%, rgba(15,23,42,0.85) 100%)`).
```


