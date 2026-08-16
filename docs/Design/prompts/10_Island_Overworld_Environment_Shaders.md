# 10 Island Overworld Map Environment Shader Prompts

A curated collection of 10 GLSL fragment shader prompts for hero backgrounds. Each prompt strictly enforces the **Top-Down 2.5D Micro-RPG Island Map Aesthetic** (*Forager*, *Super Mario World*, *Kenney Micro-RPG*) using 2D Signed Distance Fields (SDFs).

---

### Core GLSL Rendering Recipe (Enforced in All Prompts)
1. **Camera View:** Top-Down 2.5D Orthographic Overworld perspective.
2. **Dark Vector Contours:** Heavy 2.5px dark slate outline (`#1E293B`) around all landmasses, blocks, and sprites using `abs(d) < 0.015`.
3. **White Shoreline Foam Line:** Thick, solid white contour line (`#FFFFFF`) framing every water-to-land boundary.
4. **Terraced 3D Elevation Drops:** Darkened lower half on terraced block faces (`p.y < -0.05 => col *= 0.65`) for 2.5D cliff depth.
5. **Dashed Navigation Path:** Crisp white dashed stage route (`mod(pathDist, 0.1) < 0.05`) connecting level nodes.

---

### 1. Tropical Pirate Archipelago & Treasure Isles
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Tropical Pirate Archipelago Map.
- **Top-Down 2.5D Rendering Rules:**
  - Water: Vibrant cyan/turquoise sea (`#0284C7`) with subtle wave ripple animation.
  - Shoreline: Thick, solid white foam contour (`#FFFFFF`) wrapping all island edges (`abs(d_water - d_land) < 0.02`).
  - Terraced Islands: Sand yellow (`#F59E0B`) and grass green (`#22C55E`) terraces with 3D darkened cliff faces (`col *= 0.65`).
- **Objects & Path:** Mini palm trees, 3D golden treasure chests, a white dashed sailing route, and a tiny wooden pirate ship (`#B45309`) bobbing along the path. Floating speech bubble (`1-1 !`) above the main island node.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 2. Sunbaked Desert Oasis & Sandstone Pyramids
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Desert Oasis Map.
- **Top-Down 2.5D Rendering Rules:**
  - Oasis Springs: Shimmering turquoise water pool (`#06B6D4`) framed by a solid white foam shoreline outline (`#FFFFFF`).
  - Terraced Dunes: Layered sandstone terraces (`#F59E0B` face, `#B45309` vertical cliff drop) with 2.5px dark vector outlines (`#1E293B`).
- **Objects & Path:** Mini step-pyramids with golden capstones, green palm oases, a white dashed caravan route, and a small camel wagon moving along the path.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Heat shimmer effect in sky gradients.
```

---

### 3. Frostbite Glaciers & Frozen Sea
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Arctic Glacier & Frozen Ocean Map.
- **Top-Down 2.5D Rendering Rules:**
  - Sea & Ice Foam: Deep icy blue ocean (`#0369A1`) with bright white ice-foam outlines wrapping every glacier.
  - Terraced Icebergs: Multi-tiered white/frosty blue glacier blocks (`#38BDF8`) with dark cyan vertical cliff drops (`col *= 0.6`).
- **Objects & Path:** Snow-dusted pine trees, mini igloos, a white dashed sea route, and an icebreaker vessel bobbing through drifting ice floes.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 4. Volcanic Magma Archipelago & Fire Peaks
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Volcanic Lava Archipelago Map.
- **Top-Down 2.5D Rendering Rules:**
  - Magma Sea: Molten lava rivers (`#DC2626`) with glowing sulfur yellow/orange heat foam borders (`#F59E0B`).
  - Terraced Obsidian: Dark obsidian rock terraces (`#1E293B` face, `#0F172A` vertical drop) with red-glowing magma seam cracks.
- **Objects & Path:** Active smoking volcano cones, skull-cave dungeon entrance node, and a white dashed lava route with a heat-resistant hover raft.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Pulsating lava glow animations.
```

---

### 5. Sky Kingdom & Floating Cloud Islands
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Floating Sky Kingdom Map.
- **Top-Down 2.5D Rendering Rules:**
  - Sky Canvas: Soft pastel sky backdrop (`#38BDF8`) with floating cloud masses.
  - Cloud-Islands: Terraced grass/stone sky islands wrapped in fluffy white cloud-foam borders (`#FFFFFF`) with 3D drop-shadow bases.
- **Objects & Path:** Mini golden temples, rainbow-colored bridges, a white dashed flight route, and a tiny flying airship hovering along the path.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Islands gently bob up and down in the sky.
```

---

### 6. Haunted Pumpkin Swamp & Shadow Isle
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Haunted Pumpkin Swamp Map.
- **Top-Down 2.5D Rendering Rules:**
  - Swamp Water: Murky emerald/violet swamp sea (`#065F46`) with glowing eerie ghost-foam borders (`#A7F3D0`).
  - Terraced Moss: Dark mossy stone terraces (`#1F2937` face, `#111827` vertical cliff drop) with 2.5px dark vector outlines.
- **Objects & Path:** Mini flickering jack-o'-lanterns (🎃), spooky dead trees, a haunted castle cliff node, and a white dashed path with a ghost raft.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Jack-o'-lantern eyes flicker with time.
```

---

### 7. Autumn Crystal Valley & Golden Forest
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Autumn Crystal Valley Map.
- **Top-Down 2.5D Rendering Rules:**
  - River Channels: Crystal-clear blue water streams (`#0284C7`) framed by bright white river foam outlines (`#FFFFFF`).
  - Terraced Foliage: Golden auburn/amber leaf terraces (`#D97706` face, `#92400E` cliff drop) with dark vector contours.
- **Objects & Path:** Glowing amethyst/sapphire crystal spires, mini wooden watermills, and a white dashed path with a floating timber raft.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Golden leaves drift along the river currents.
```

---

### 8. Deep Sea Submerged Coral Ruins
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Submerged Coral Ruins Map.
- **Top-Down 2.5D Rendering Rules:**
  - Ocean Bed: Deep oceanic blue backdrop (`#0F172A`) with sweeping caustic light rays.
  - Coral Terraces: Sunken stone temple terraces wrapped in glowing neon coral-foam outlines (`#2DD4BF`).
- **Objects & Path:** Neon pink/cyan coral reefs, ancient stone columns, a white dashed underwater trench route, and a mini submarine on the path.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 9. Cyber Retro Neon Micro-Grid
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Cyber Retro Neon World Map.
- **Top-Down 2.5D Rendering Rules:**
  - Cyber Water: Dark navy grid ocean (`#0F172A`) with glowing neon cyan foam outlines (`#2DD4BF`).
  - Synth Terraces: Isometric synth-block islands with glowing purple drop bases (`#A855F7`) and heavy dark outlines (`#020617`).
- **Objects & Path:** Holographic stage node portals (`1-1 !`), glowing energy crystals, and a white dashed laser path with a speed-pod vessel.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Hologram portals pulse and spin.
```

---

### 10. The Micro-Globe Planetoid (All-Biomes Micro-World)
```markdown
Create a GLSL Fragment Shader Hero Background executing a Top-Down 2.5D Micro-Globe All-Biomes World Map.
- **Top-Down 2.5D Rendering Rules:**
  - Mini-Planet: A self-contained floating spherical planetoid in deep space (`#020617`).
  - Stitched Biomes: Terraced island clusters blending desert sand, arctic ice cap, lush green forest, and blue sea bays—all framed by thick white shoreline foam borders (`#FFFFFF`).
- **Objects & Path:** A white dashed equator path encircling the globe, a mini sailing ship, and stage callout notification badges.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. The mini-globe slowly rotates in place.
```

