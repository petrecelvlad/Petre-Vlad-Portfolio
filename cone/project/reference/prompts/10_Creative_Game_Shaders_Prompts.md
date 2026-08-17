# 10 Creative Retro & Oldschool Game Shader Prompts

A curated collection of 10 short, high-vibe, copy-paste ready GLSL fragment shader prompts for hero backgrounds. Each prompt focuses strictly on authentic oldschool retro nostalgia—from Nintendo Game Boy and Atari 2600 to 16-bit SNES isometric pixel grids and arcade CRT screens.

---

### 1. Isometric 16-Bit RPG Tile Grid (SNES / Chrono Style)
**Vibe:** 2.5D isometric 16-bit RPG overworld map with pixelated dirt/grass floor tiles, floating treasure chests, health hearts, and animated water edges.
```markdown
Create a GLSL Fragment Shader Hero Background featuring an Isometric 16-Bit RPG Pixel Grid.
- **Visuals:** 2.5D isometric tile matrix (`rotate2d(0.523)`), 3D extruded stone/grass tile lips, floating pixel health hearts (❤️), glowing mana crystals, and chest loot.
- **Color Palette:** Authentic 16-bit SNES palette: vibrant meadow green, deep dungeon slate, ruby red, and golden coin highlights.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Mouse cursor makes surrounding isometric tiles gently wave upward.
```

---

### 2. Nintendo Game Boy DMG-01 Monochromatic LCD
**Vibe:** Pure 90s Game Boy handheld nostalgia with dot-matrix LCD pixel grid, phosphor motion blur/ghosting, and scrolling 8-bit platformer sprites.
```markdown
Create a GLSL Fragment Shader Hero Background replicating an authentic Nintendo Game Boy DMG-01 LCD Screen.
- **Visuals:** Crisp dot-matrix pixel grid overlay, classic LCD screen ghosting/blur, and infinitely scrolling 8-bit pixel sprites (mushrooms, question blocks, coins).
- **Color Palette:** Strict 4-shade Game Boy olive green palette (`#0F380F`, `#306230`, `#8BAC0F`, `#9BBC0F`).
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 3. Atari 2600 Woodgrain Rainbow Raster Lines
**Vibe:** Iconic 1970s/80s Atari 2600 home console aesthetic with horizontal rainbow color cycling raster bars, chunky 8x8 pixel sprites, and CRT glow.
```markdown
Create a GLSL Fragment Shader Hero Background inspired by the Atari 2600 Console Display.
- **Visuals:** Horizontal rainbow raster bars scrolling down the screen, chunky pixelated 8x8 sprite blocks, subtle CRT line jitter, and woodgrain side bezel accents.
- **Color Palette:** Classic TIA 128-color Atari palette: vibrant copper orange, arcade green, cyan, and deep phosphor dark brown.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 4. Isometric 8-Bit Pixel Factory & Conveyor Grid
**Vibe:** 2.5D isometric pixel arcade factory with moving conveyor belts, 3D pixel cubes, question mark blocks, and mechanical gear pulleys along isometric axes.
```markdown
Create a GLSL Fragment Shader Hero Background of an Isometric 8-Bit Pixel Factory Grid.
- **Visuals:** 2.5D isometric conveyor track scrolling infinitely, 3D extruded pixel blocks (`?` blocks, gems, crates) moving along the grid, and spinning gear wheels.
- **Color Palette:** Bold Kenney 8-bit arcade colors: sky blue, golden yellow, crimson red, and dark slate outlines (`#1E293B`).
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Mouse hover selects and lifts individual isometric blocks.
```

---

### 5. NES 8-Bit Overworld Pixel Map (Zelda / Mario 3 Style)
**Vibe:** Nostalgic NES 8-bit world map with animated pixelated ocean waves, tiny pixel palm trees, mountain peaks, and dotted quest paths.
```markdown
Create a GLSL Fragment Shader Hero Background reproducing an NES 8-Bit RPG World Map.
- **Visuals:** Pixelated map grid with animated ocean shoreline waves, repeating mountain/forest tile patterns, and a dotted quest path scrolling right-to-left.
- **Color Palette:** Authentic 8-bit NES color palette: 8-bit sea blue, grass green, mountain tan, and path yellow.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 6. Isometric Game Boy Color 8-Bit World
**Vibe:** 2.5D isometric view rendered in the vibrant 8-bit color palette of the Game Boy Color, featuring chunky pixel blocks and bold outlines.
```markdown
Create a GLSL Fragment Shader Hero Background of an Isometric Game Boy Color 8-Bit Grid.
- **Visuals:** Isometric 2.5D block landscape with bold dark pixel outlines, 3D extruded tile depth, floating star badges, and animated pixel water streams.
- **Color Palette:** Classic GBC 8-bit palette: vivid teal, cherry red, sunshine yellow, and dark navy outline strokes.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Mouse interaction tilts the isometric camera perspective.
```

---

### 7. Arcade CRT Cabinet & Pixel Invaders
**Vibe:** Authentic 80s arcade machine screen with barrel-curved glass, scanlines, RGB subpixel dot mask, and marching pixel invader sprites.
```markdown
Create a GLSL Fragment Shader Hero Background simulating an 80s Arcade CRT Cabinet Screen.
- **Visuals:** Barrel-curved display edges, horizontal CRT scanlines (`sin(st.y * 300.0)`), RGB phosphor subpixel mask, and marching 8-bit pixel invader sprites.
- **Color Palette:** Arcade phosphor green, neon yellow, and deep space black.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Mouse movement flexes the CRT screen curvature.
```

---

### 8. Isometric Pixel City & Arcade Block Matrix
**Vibe:** 2.5D isometric pixel cityscape with pixelated building rooftops, moving pixel vehicles on grid roads, and retro arcade billboards.
```markdown
Create a GLSL Fragment Shader Hero Background featuring an Isometric Pixel City Matrix.
- **Visuals:** 2.5D isometric city block grid, 3D extruded pixel building roofs, animated pixel vehicles traveling on grid lines, and glowing pixel arcade signs.
- **Color Palette:** Retro 16-bit arcade colors: midnight blue, brick red, asphalt gray, and neon yellow accents.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`. Mouse panning shifts the isometric camera focus.
```

---

### 9. Commodore 64 16-Color PETSCII Matrix
**Vibe:** Authentic C64 retro computer display featuring the iconic VIC-II 16-color palette, PETSCII character matrix grid scrolling diagonally, and TV border.
```markdown
Create a GLSL Fragment Shader Hero Background replicating a Commodore 64 Computer Display.
- **Visuals:** PETSCII character sprite grid (maze lines, card suits, block characters) scrolling diagonally, subtle NTSC TV signal flicker, and iconic C64 screen border.
- **Color Palette:** Strict C64 16-color palette: light blue border (`#70A4B2`), dark blue canvas (`#352879`), light green, and orange.
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

---

### 10. Handheld LCD Brick Game & Tetromino Matrix
**Vibe:** Classic 90s monochrome handheld LCD brick game with segmented LCD display grid, falling pixel brick tetrominoes, and digital score display.
```markdown
Create a GLSL Fragment Shader Hero Background reproducing a 90s Handheld LCD Brick Game.
- **Visuals:** Segmented LCD grid layout, subtle shadow-bleed beneath active pixel segments, falling brick tetrominoes, and digital score indicator.
- **Color Palette:** Monochrome LCD gray background (`#9EA789`) with dark slate LCD pixel segments (`#1C2317`).
- **Uniforms:** `u_resolution`, `u_time`, `u_mouse`.
```

