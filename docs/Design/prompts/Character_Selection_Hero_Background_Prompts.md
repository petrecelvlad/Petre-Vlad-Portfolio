# Character Selection Stage — Minimal Cutesy GLSL Background Prompts

This document provides copy-paste ready agent prompts for building GPU-accelerated GLSL shader hero backgrounds tailored specifically for a **Minimal Cutesy Character Selection Screen**.

### Art Direction & Visual Alignment
- **Minimal & Non-Distracting**: Backgrounds use flat/vector 2D aesthetics with soft pastel tones, clean thick outline accents (`#1C1610`), and smooth ambient motion.
- **Harmonized with Hero Art & Cards**:
  - **Character**: Chibi vector gamer hero with ground drop shadow.
  - **Card 1 (Level Up)**: Space arcade starfield & yellow/orange progress bar.
  - **Card 2 (Parcel)**: Sky blue canvas with white dashed flight paths.
  - **Card 3 (Conveyor)**: Industrial Ketchapp assembly line with smiling cute shapes.
  - **Card 4 (Overworld)**: Archipelago islands with wave foam and level node dotted paths.

---

## Prompt 1: Minimal Ketchapp Assembly Line & Floating Cute Shapes (Matching Card 3)

```markdown
Create a ultra-minimal, cutesy GLSL Fragment Shader Hero Background inspired by Ketchapp / hypercasual toy factory character select screens.

### Aesthetic & Visuals: Pastel Conveyor Stage & Smiling Toy Shapes
- **Base Canvas**: Clean, warm pastel cream/tan (`#FFF8E7` to `#F3E8D0`) with a subtle 2-tone vertical split for wall vs floor (`y = 0.18`).
- **Floating Toy Elements**: 8-10 minimalist vector shapes (rounded cubes, pastel hearts, stars, and coin tokens) floating gently upward in the background with a soft sine-wave sway (`sin(u_time * 0.8 + p.y * 2.0)`).
- **Subtle Outline Accents**: Vector shapes rendered with soft dark outlines (`#1C1610` at 15% opacity) matching the card artstyle.
- **Pedestal Platform Line**: A subtle horizontal conveyor rail or platform border across the bottom horizon (`y = 0.20`), grounding the hero character video and achievement cards.
- **Color Palette**: Mint pastel (`#86EFAC`), candy purple (`#C084FC`), sunny yellow (`#FDE047`), and warm cream background (`#FFF8E7`).

### Technical & Shader Rules
- **Low Contrast Delta**: Keep contrast shifts under 6% to ensure foreground name, bio, and cards remain perfectly legible.
- **Uniforms**: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- **Cursor Touch**: Subtle mouse parallax that shifts floating shapes laterally by ±5px.
```

---

## Prompt 2: Minimal Overworld Island Archipelago & Wave Foam Lines (Matching Card 4)

```markdown
Create a clean, cute GLSL Fragment Shader Hero Background styled as a 2D Overworld Stage Select map (Mario / Flappy Bird / Island style).

### Aesthetic & Visuals: Gentle Water Ripples & Dotted Stage Paths
- **Base Canvas**: Soft sky-blue water gradient (`#E0F2FE` to `#BAE6FD`) with smooth, ultra-subtle wave foam contour lines (`sin(uv.x * 6.0 + u_time * 0.4)`) drifting horizontally at 8% opacity.
- **Distant Island Silhouettes**: Soft, rounded pastel green island curves (`#86EFAC` at 10% opacity) in the lower third background.
- **Dotted Selection Paths**: Subtle white dashed trails (`step(0.5, fract(uv.x * 20.0 - u_time * 0.2))`) tracing soft arc paths across the stage background, connecting the character pedestal area to the achievement cards.
- **Color Palette**: Sky blue (`#38BDF8`), island green (`#4ADE80`), soft white foam (`#FFFFFF`), and dark outline accents (`#1C1610`).

### Technical & Shader Rules
- **Non-Distracting Motion**: Wave speeds locked to `u_time * 0.2` so the background feels calm and static while retaining subtle game-like life.
- **Uniforms**: `u_resolution`, `u_time`, `u_mouse`.
```

---

## Prompt 3: Craft Paper Sky & Dashed Flight Paths (Matching Card 2)

```markdown
Create a playful, tactile GLSL Fragment Shader Hero Background inspired by handcrafted cardboard parcels, papercraft, and doodle world games.

### Aesthetic & Visuals: Dashed Flight Lines & Papercraft Clouds
- **Base Canvas**: Warm sky-blue craft paper background (`#E0F2FE`) with a subtle procedural paper fiber texture (`fbm(uv * 100.0) * 0.02`).
- **Animated Flight Paths**: White dashed flight arc trails (`dash(uv.x - u_time * 0.1)`) drifting smoothly across the upper background, just like the flight path in the "MADE IN ROMANIA" parcel card.
- **Floating Cute Clouds & Crosshairs**: Minimalist vector cloud outlines and 2x2 doodle crosshair sparkles (`+`) floating slowly with gentle vertical bobbing.
- **Color Palette**: Sky blue (`#38BDF8`), warm cardboard beige (`#D97706`), clean white (`#FFFFFF`), and dark outline (`#1C1610`).

### Technical & Shader Rules
- **Subtle Opacity**: Keep dashed trails and clouds at 12-15% opacity so foreground typography stands out crisp and readable.
- **Uniforms**: `u_resolution`, `u_time`, `u_mouse`.
```

---

## Prompt 4: Minimal Arcade Level-Select & Pixel Sparkles (Matching Card 1)

```markdown
Create a minimal, cute GLSL Fragment Shader Hero Background inspired by 16-Bit Arcade Level-Select screens and victory screens.

### Aesthetic & Visuals: Retro Arcade Stage & Floating XP Motes
- **Base Canvas**: Deep, cozy midnight blue background (`#0F172A` to `#1E1B4B`) with a soft radial center glow illuminating the character and center text.
- **Retro Pixel Sparkles**: Tiny 2x2 pixel gold/yellow sparkles (`#FACC15`) blinking softly in a gentle upward float (`sin(u_time * 1.5 + seed)`).
- **Arcade Stage Border Lines**: Ultra-clean, subtle vertical dashed boundary lines along the far edges, referencing the side borders of the "LEVEL UP" card.
- **Color Palette**: Midnight blue (`#0F172A`), electric indigo (`#3730A3`), level-up yellow (`#FACC15`), and soft white (`#FFFFFF`).

### Technical & Shader Rules
- **Low Intensity**: Center radial glow is kept soft (`0.1` intensity max) so middle typography ("VLAD PETRE") stays high-contrast and readable.
- **Uniforms**: `u_resolution`, `u_time`, `u_mouse`.
```

---

## Prompt 5: Cutesy Mobile RPG Character Pedestal & Spotlight (Pure Character Select)

```markdown
Create a minimal, cute GLSL Fragment Shader Hero Background designed as a mobile casual RPG "Select Your Fighter" hero pedestal stage.

### Aesthetic & Visuals: Soft Spotlight Beam & Ground Pedestal Shadow
- **Soft Conical Spotlight**: A super-soft, semi-transparent conical beam of light (`center: vec2(0.20, 0.90)` aiming down toward Column 1) with an 8% opacity warm golden-white gradient (`#FFF8E7`).
- **Floating Star Sparks**: 5-6 cute rounded 4-point star sparks bobbing softly in the light beam behind the character video.
- **Ground Stage Boundary**: A clean horizontal floor division (`y = 0.16`) with a rounded oval pedestal shadow under the character's feet, tying the character video to the background.
- **Color Palette**: Warm honey amber (`#F59E0B`), soft wood oak (`#D97706`), warm cream (`#FFFDF7`), and dark outline (`#1C1610`).

### Technical & Shader Rules
- **Static Grounding**: Stage floor line and pedestal shadow remain anchored while light sparks drift gently (`sin(u_time * 0.6)`).
- **Uniforms**: `u_resolution`, `u_time`, `u_mouse`.
```
