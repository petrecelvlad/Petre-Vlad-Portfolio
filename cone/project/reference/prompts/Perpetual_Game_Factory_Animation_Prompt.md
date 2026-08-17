# Perpetual Game Factory Animation Prompt

## Purpose
This document provides a detailed, production-ready agent prompt for building an SVG-based interactive **Perpetual Game Building Machine Animation**. 

The component simulates an intricate, Rube-Goldberg style mechanical factory where raw materials (ideas, pixels, music notes, code scrolls) enter a conveyor belt assembly line on the left, pass through automated steam stamps, laser etchers, and robotic assembly arms, and exit on the right as polished, interactive game cartridges/icons onto a showcase tray.

---

## Copy-Paste Agent Prompt

```markdown
You are tasked with creating a mesmerizing, SVG-driven **Perpetual Game Building Machine Animation** component using the **Tactile & Steampunk Design Aesthetic**.

### Concept: "The Automated Rube-Goldberg Game Forge"
An animated, infinite-loop mechanical factory system mounted on a heavy cast-iron and brass chassis. The machine continuously manufactures mini "game cartridges / quest tiles" on a moving conveyor belt.

---

### Mechanical Assembly Line Stages (Left to Right)

#### Stage 1: Idea Hopper & Raw Input (Far Left)
- **Brass Funnel & Vacuum Tubes:** A brass hopper with vibrating springs feeds raw "Idea Spheres" (glowing pixel gems, music notes, code scrolls) into a vertical glass tube.
- **Pneumatic Piston Drop:** A top piston fires downward with a puff of steam, dropping raw materials onto the conveyor belt platform.

#### Stage 2: The Conveyor Belt Engine
- **Interlocking Gear Assembly:** Dual drive gears (a large brass spur gear and a smaller steel pinion gear) rotate in sync beneath the belt.
- **Track Link Loop:** A segmented brass/iron tread belt with moving rivet pins scrolling infinitely from left to right (`keyframes: translate-x`).
- **Tensioner Wheels:** Spring-loaded idler pulleys maintaining belt tension.

#### Stage 3: Fabrication & Assembly Station (Center)
- **Robotic Hydraulic Stamp / Press:** A heavy blued-steel press arm with an amber indicator tube that stomps down onto each cartridge as it passes, imprinting a game genre emblem (RPG sword, arcade joystick, puzzle piece, retro gamepad).
- **Spark & Laser Arc Effect:** SVG spark particles or glowing electric arcs flash brief vector bursts during the stamping impact.
- **Steam Pressure Vent:** Overhead T-pipe venting puffs of translucent white/amber steam on every 3rd second cycle.

#### Stage 4: Quality Check & Polish
- **Magnifying Lens & Scanner Beam:** A brass-rimmed optical lens with a sweeping cyan/green scanner beam that inspects the newly stamped game tile.
- **Wax Seal Applicator:** A side mechanical arm drops a molten red wax seal of approval onto the corner of the game tile.

#### Stage 5: Output Tray & Counter (Far Right)
- **Finished Cartridge Collection:** The finished game tile rolls off the end of the belt into a padded leather delivery tray with a soft mechanical thud.
- **Analog Production Counter:** A 3-digit tumbler counter wheel at the top right ticks up by +1 for every completed cartridge.

---

### Interactive Features & Controls
1. **Speed Control Lever:** A 3-position brass throttle lever (`Slow` / `Standard` / `Overclock!`) that adjusts the speed of the conveyor belt animation loop, gear rotation RPM, and particle emission rate.
2. **Interactive Cartridge Inspection:** Clicking any game cartridge as it travels along the belt pauses that item under a magnifying glass, opening a popover showing a mini preview card or project details.
3. **Steam Vent Valve:** Clicking the steam valve wheel triggers an instant manual steam release particle burst with sound or visual feedback.

---

### Technical & Styling Guidelines
- **Framework:** React + TypeScript + CSS Keyframe animations and/or `motion/react` for smooth 60fps performance.
- **Palette Rules:**
  - Steel & Iron Frame (`#CBD5E1` -> `#64748B` -> `#334155` -> `#1E293B`)
  - Antiqued Brass Gears (`#FFE5A3` -> `#D4A047` -> `#8C5828` -> `#4A2A0C`)
  - Copper Steam Pipes (`#FFD1B3` -> `#C86432` -> `#783014`)
  - Glowing Vacuum Tubes (`#F59E0B` core, `rgba(245,158,11,0.3)` outer glow)
  - Conveyor Belt & Outlines (`#1C1610` dark contours)
- **Performance:** Use pure inline SVG vector paths and CSS hardware-accelerated transforms (`transform: translateX()`, `rotate()`).
- **Gradient Namespacing:** Use `useId()` for all SVG `<linearGradient>` and `<filter>` elements to prevent ID collisions.
```
