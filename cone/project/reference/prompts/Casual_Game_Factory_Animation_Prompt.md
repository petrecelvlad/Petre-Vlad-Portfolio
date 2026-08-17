# Vector Arcade Game Factory Animation Prompt (Kenney / Mobile Arcade Style)

## Purpose
This document provides a complete, production-ready agent prompt for building an SVG & Framer Motion interactive **Perpetual Game Building Machine Animation** in the **Kenney / Vector Arcade Game Aesthetic** (inspired by Kenney.nl, Legend of Slime, Archero, and classic 2D platformers).

It transforms the game factory concept into a rich, vibrant, ultra-satisfying arcade conveyor belt machine filled with **bold dark contour outlines, extruded 3D bases, glossy specular glares, and rich vector surface details** (coiled spring bumpers, question-mark blocks, star badges, and popping confetti particles).

---

## Copy-Paste Agent Prompt

```markdown
You are tasked with creating a rich, vibrant, ultra-satisfying **Perpetual Game Building Machine Animation** component using a **Kenney / Vector Arcade Game Aesthetic**.

### Visual Style Requirements (Vector Arcade / Kenney)
1. **Thick Dark Outlines:** All machine components, conveyor tracks, pulleys, stamps, and game blocks MUST have a bold 2.5px–4px dark outline (`stroke="#1E293B"` or `#18181B"` with `strokeLinecap="round"` and `strokeLinejoin="round"`).
2. **3D Extruded Bases:** All blocks, buttons, and platforms feature an extruded darker bottom lip (3px–6px thick) giving 3D depth and physical weight.
3. **Glossy Specular Highlights:** Inner top-left white specular glare lines (`stroke="white"`, `opacity="0.5"`) and curved glass reflection arcs.
4. **Rich Surface Details:** Subtle inner wavy wood/dirt pattern lines, coiled spring bumpers, question-mark badges, and star badges on finished blocks.

---

### Mechanical Assembly Line Stages (Left to Right)

#### Stage 1: Idea Hopper & Springy Dispenser (Far Left)
- **Funnel with Dark Outlines:** A vibrant golden-yellow/cyan hopper with thick dark outlines dispensing raw "Idea Blocks" (glowing 3D-extruded cubes with vector emblems: 🎮, 🕹️, 🎲, 🏆, ⚔️).
- **Coiled Bouncing Spring:** A coiled spring bumper (`stroke="#64748B"`, `strokeWidth="3"`) beneath the hopper that compresses and launches each block down a glass tube onto the belt with a squish-and-bounce animation.

#### Stage 2: The Vector Conveyor Belt
- **Gears & Pulleys with Spokes:** Dual rotating gear-pulley wheels with dark outlines, inner spoke slots, and center rivet caps spinning in sync.
- **Tread Link Belt:** Segmented pill-shaped belt treads with dark outlines scrolling infinitely from left to right (`keyframes: translate-x`).
- **Textured Support Rails:** Wooden/metal side guide rails with subtle inner grain lines.

#### Stage 3: The Heavy Arcade Stamping Press (Center)
- **Pneumatic Arcade Stamp:** A chunky rounded press head with an illuminated top status gem (green/red) that stomps down with squish-and-stretch physics (`type: "spring", stiffness: 350, damping: 15`).
- **Icon Imprinter:** Imprints crisp vector game graphics (platformer Question Block `?`, RPG Sword, Retro Gamepad, Arcade Star) onto the block face.
- **Confetti & Spark Pop:** A burst of colorful vector star particles, floating coins, and confetti on every stamp impact.

#### Stage 4: Scanning & Quality Seal
- **Glow Scanner Arch:** A cyan/magenta vector laser arch with a sweeping reflection beam that adds a glossy top glare streak to the passing game block.
- **Star Rating Badge:** A mini mechanical arm stamps a golden 3D ⭐ star rating badge onto the block.

#### Stage 5: Output Chute & Arcade Scoreboard (Far Right)
- **Ramp & Collection Tray:** The finished game block slides down a smooth curved ramp into a padded collection tray.
- **Arcade Banner Scoreboard:** A vibrant header badge with white text outlines (`stroke="white"`, `strokeWidth="3"`) displaying total games crafted (`1,342 GAMES BUILT`).

---

### Interactive Features & Controls
1. **Arcade Speed Lever:** A 3-position extruded toggle button (`1x Chill`, `2x Fast`, `3x HYPER!`) that adjusts conveyor speed, pulley spin, and stamp frequency.
2. **Click-to-Pop Cartridge:** Clicking any game block on the belt makes it jump into the air with a coin-pop sound/particle burst, revealing a popup stats card.
3. **Manufacture CTA Button:** A chunky 3D green arcade button ("+ Manufacture New Game") with a dark green extruded base that presses down on click and drops a new block into the hopper.

---

### Styling & Technical Guidelines
- **Framework:** React + TypeScript + SVG + `motion/react`.
- **Palette (Kenney Arcade):**
  - Outlines: `#1E293B` / `#0F172A` (strokeWidth `2.5px`–`4px`)
  - Green Base: `#4ADE80` (top) / `#16A34A` (bottom base)
  - Yellow Base: `#FACC15` (top) / `#CA8A04` (bottom base)
  - Blue Base: `#38BDF8` (top) / `#0284C7` (bottom base)
  - Purple Base: `#C084FC` (top) / `#7E22CE` (bottom base)
- **SVG ID Namespacing:** Wrap all SVG linearGradients and clipPaths with `useId()` to guarantee unique gradient IDs.
```

