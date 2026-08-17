# 10 FPS Corridor & Labyrinth Shader Prompts

A curated collection of 10 copy-paste ready GLSL fragment shader prompts for hero backgrounds. Each prompt is **100% self-contained** and creates an immersive **First-Person POV (FPS) continuous forward camera movement** through infinite 3D raymarched or 2D raycasted corridors, labyrinths, and dungeons in retro pixelated and low-poly gaming styles.

---

### 1. Classic 90s Pixel Dungeon (Doom / Wolfenstein 3D Style)
**Vibe:** 90s retro PC FPS dungeon crawler with pixelated stone brick walls, flickering wall torches, rusted iron doors, and floor head-bobbing.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) 90s Pixelated Dungeon Corridor.

### Technical & Camera Execution
- **FPS Camera Motion:** First-Person POV continuous forward camera walk (`ro = vec3(0.0, 0.0, u_time * 1.5)`) with subtle vertical head-bobbing (`sin(u_time * 6.0)`).
- **Infinite Modulo Geometry:** Raymarched infinite stone brick hallway (`p.xy = mod(p.xy + 2.0, 4.0) - 2.0`) with passing iron door frames and wall torch brackets.
- **Pixelation & Lighting:** Screen-space pixel quantization (`floor(st * 160.0) / 160.0`), 16-color dark fantasy palette (mossy slate `#1E293B`, torch orange `#F97316`, brick red `#991B1B`), and exponential torchlight distance falloff (`exp(-dist * 0.25)`).
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2 for FPS look angle tilt).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 2. Sci-Fi Cyberpunk Station Corridor (System Shock / Alien Style)
**Vibe:** High-tech orbital station hallway with ribbed metallic wall panels, pulsing neon blue conduit pipes, sliding blast doors, and floor steam grates.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) Sci-Fi Cyberpunk Corridor.

### Technical & Camera Execution
- **FPS Camera Motion:** First-Person POV continuous forward camera flight through an orbital station hallway (`ro = vec3(0.0, 0.0, u_time * 2.5)`).
- **Infinite Modulo Geometry:** Infinite ribbed steel wall panels (`mod(p.z, 3.0)`), automated blast door frames, glowing floor steam grates, and ceiling light strips.
- **Visuals & Color Palette:** Dark metallic navy canvas (`#0F172A`), electric neon cyan conduits (`#06B6D4`), hazard yellow door trims, crisp vector contours, and dithered fog.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2 for subtle camera roll).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 3. Infinite Synthwave Neon Wireframe Labyrinth
**Vibe:** Glowing 80s arcade VR labyrinth with glowing neon grid walls, floor grid lines extending to a infinite vanishing point, and floating wireframe archways.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering an Infinite First-Person (POV) Neon Wireframe Labyrinth.

### Technical & Camera Execution
- **FPS Camera Motion:** High-speed First-Person POV forward flight down an infinite 3D vector wireframe corridor (`ro = vec3(0.0, 0.0, u_time * 4.0)`).
- **Infinite Modulo Geometry:** Glowing neon wireframe grid lines on floor/walls/ceiling and passing square portal archways (`mod(p.z, 2.0)`).
- **Visuals & Color Palette:** Hot magenta (`#EC4899`), electric violet (`#8B5CF6`), laser cyan (`#06B6D4`), outer glowing bloom (`exp(-d * 8.0)`), and deep space black canvas.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2 for perspective skewing).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 4. Retro PC Tech-Base & Acid Puddles (Quake 1 / Dark Forces)
**Vibe:** Industrial retro FPS military base with rusty iron plating, yellow hazard stripes, flickering overhead tube lights, and glowing green toxic acid pools.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) Industrial Tech-Base Corridor.

### Technical & Camera Execution
- **FPS Camera Motion:** Low-poly 3D First-Person POV continuous camera walk through an industrial military corridor (`ro = vec3(0.0, 0.0, u_time * 1.8)`).
- **Infinite Modulo Geometry:** Heavy rusty iron walls with hazard stripe trims, overhead flickering light fixtures, and glowing radioactive slime puddles on the floor.
- **Visuals & Color Palette:** Industrial rust brown (`#78350F`), toxic neon green (`#22C55E`), dark slate iron (`#1E293B`), and 90s software dither shading.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 5. Alien Hive Organic Biome Corridor (Metroid / Alien Isolation)
**Vibe:** Atmospheric extraterrestrial biome with pulsating organic ribbed walls, bioluminescent spore pods, glowing acid veins, and misty ambient fog.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) Alien Hive Organic Corridor.

### Technical & Camera Execution
- **FPS Camera Motion:** Ominous slow First-Person POV forward camera glide (`ro = vec3(0.0, 0.0, u_time * 1.0)`) inside an organic alien biome.
- **Infinite Modulo Geometry:** Curved alien bone rib arches (`mod(p.z, 4.0)`), pulsating bioluminescent egg pods, and glowing alien fluid conduit pipes along cavern walls.
- **Visuals & Color Palette:** Deep purple/indigo canvas (`#1E1B4B`), radioactive lime green (`#84CC16`), bioluminescent teal (`#14B8A6`), and soft volumetric haze falloff.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2 controlling bio-scanner flashlight direction).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 6. Nintendo Game Boy 4-Shade Monochromatic FPS Labyrinth
**Vibe:** Pure 90s handheld nostalgia rendering a raycasted 3D dungeon corridor strictly in 4 shades of Game Boy LCD olive green with dot-matrix overlay.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a 90s Game Boy Monochromatic 3D FPS Dungeon.

### Technical & Camera Execution
- **FPS Camera Motion:** First-Person POV 3D raycasted dungeon hallway forward walk (`ro = vec3(0.0, 0.0, u_time * 1.2)`) with pixelated stone block walls and archway turnings.
- **Strict 4-Shade Color Palette & LCD FX:** Exclusive Game Boy DMG-01 green palette (`#0F380F`, `#306230`, `#8BAC0F`, `#9BBC0F`), pixel quantization grid (`floor(st * 128.0) / 128.0`), dot-matrix LCD overlay, and screen ghosting.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 7. Virtual Reality Matrix Data Tunnel
**Vibe:** Cyber-hacker digital realm with cascading green digital code glyphs forming hallway walls, floating voxel data gates, and glowing energy rings.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) Digital Matrix Data Tunnel.

### Technical & Camera Execution
- **FPS Camera Motion:** Hyper-speed First-Person POV camera fly-through (`ro = vec3(0.0, 0.0, u_time * 5.0)`) inside a square digital tunnel.
- **Infinite Modulo Geometry:** Streaming code matrix glyph walls (`mod(p.z, 1.5)`), passing through glowing voxel data gate rings and energy shockwaves.
- **Visuals & Color Palette:** Electric matrix green (`#10B981` / `#4ADE80`), deep cyber dark navy (`#020617`), glowing white code accents, and outer bloom glow (`exp(-d * 6.0)`).
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 8. Chrono Clockwork Labyrinth (Gothic Steam-FPS)
**Vibe:** Gothic steampunk clockwork maze with spinning brass wall gears, copper steam pipes venting steam, stained-glass archways, and warm lantern light.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) Clockwork Steam Labyrinth.

### Technical & Camera Execution
- **FPS Camera Motion:** First-Person POV forward camera walk (`ro = vec3(0.0, 0.0, u_time * 1.6)`) with mechanical footstep bobbing (`sin(u_time * 7.0)`).
- **Infinite Modulo Geometry:** Gothic brass & iron hallway lined with rotating clockwork gear wheels (`mod(p.z, 3.5)`), copper steam pipes venting steam, and stained-glass arches.
- **Visuals & Color Palette:** Warm polished brass gold (`#F59E0B`), copper red (`#B45309`), deep mahogany slate (`#1E1B4B`), dark vector contours, and warm lantern glow.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 9. Surreal Checkerboard Dream Corridor & Floating Portals
**Vibe:** Retro surreal 3D raymarched hallway with polished black-and-white checkerboard floor, marble pillars passing by, and glowing floating portals.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering a First-Person (POV) Surreal Checkerboard Hallway.

### Technical & Camera Execution
- **FPS Camera Motion:** Continuous smooth First-Person POV forward glide (`ro = vec3(0.0, 0.0, u_time * 2.0)`) over an infinite checkerboard floor.
- **Infinite Modulo Geometry:** Reflective black-and-white checkerboard tile floor (`floor(p.x) + floor(p.z)`), marble pillar rows passing by (`mod(p.z, 4.0)`), and floating glowing magic portal rings.
- **Visuals & Color Palette:** High-contrast black & white checkerboard, celestial gold portal rings, deep twilight sky ceiling, and glossy floor reflections.
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2 for FPS camera head tilt).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

---

### 10. Atari 2600 8-Bit Raycasted Trench (Night Driver / Star Raiders)
**Vibe:** Authentic 1970s/80s Atari 8-bit retro console aesthetic with chunky low-res vector posts, horizontal rainbow color bars, and crt phosphor glow.
```markdown
Create a full-bleed GLSL Fragment Shader Hero Background rendering an 80s Atari Style First-Person (POV) Vector Trench.

### Technical & Camera Execution
- **FPS Camera Motion:** High-speed First-Person POV forward rush (`ro = vec3(0.0, 0.0, u_time * 3.5)`) through an 8-bit retro vector trench.
- **Infinite Modulo Geometry & 8-Bit CRT FX:** Chunky pixel post pillars passing by (`mod(p.z, 2.5)`), horizontal rainbow color cycling horizon bars, 8x8 pixel quantization (`floor(st * 80.0) / 80.0`), and CRT TV scanlines.
- **Color Palette:** Atari TIA 128-color palette (vibrant copper orange, neon green, bright cyan, deep phosphor black).
- **Uniforms:** `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2 for steering trench angle).
- Mount as an `absolute inset-0 -z-10` hero canvas with soft dark vignette overlay.
```

