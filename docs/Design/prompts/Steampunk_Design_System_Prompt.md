# Steampunk Design System Prompt

## Purpose
This document provides a comprehensive agent prompt for architecting and building a **Full Steampunk Design System**. It translates Victorian industrial engineering, brass and copper metallurgy, pneumatic mechanisms, vacuum tubes, and clockwork gear assemblies into a rich, interactive web UI component suite.

---

## Copy-Paste Agent Prompt

```markdown
You are tasked with building a full **Steampunk Design System & UI Component Suite** for a modern web application.

### Aesthetic Foundation: Victorian Industrial Engineering
The Steampunk design system bridges 19th-century mechanical craftsmanship with high-tech interactive functionality. Every component feels forged, machined, or assembled in an artisan inventor's workshop.

#### 1. Metallurgical Palette & Multi-Stop Gradients
- **Antiqued Brass:** Primary structural trim and gearwork.
  `linear-gradient(135deg, #FFF0B3 0%, #D4A047 35%, #8C5828 70%, #4A2A0C 100%)`
- **Burnished Copper:** Pipes, heating elements, and accent ribbons.
  `linear-gradient(135deg, #FFD1B3 0%, #C86432 40%, #783014 75%, #3B1204 100%)`
- **Blued Steel / Cast Iron:** Heavy chassis bases, machine housings, and brackets.
  `linear-gradient(135deg, #CBD5E1 0%, #64748B 40%, #334155 75%, #1E293B 100%)`
- **Polished Chrome / Nickel:** Piston shafts, precision dials, and lens rims.
  `linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 40%, #94A3B8 75%, #334155 100%)`

#### 2. Physical & Material Textures
- **Distressed Leather:** Deep oxblood or dark chestnut padded trays with perimeter contrast stitching (`#1C1610` border, `#D4A047` dashed stitching).
- **Amber Vacuum Glass:** Glass tubes and gauge faces with warm orange/amber filament glows (`rgba(245, 158, 11, 0.25)` fill with `#F59E0B` core glow).
- **Machine Contours:** Heavy `#1C1610` dark outlines (2px–3px) around all mechanical shapes for crisp separation against backgrounds.

---

### Component Categories to Implement

#### Category A: Chassis & Panels
1. **MachineConsole:** Heavily riveted iron/brass frame with recessed oxblood leather display tray and corner L-brackets.
2. **PneumaticScroll:** Brass-capped parchment scroll container with side steam cylinder pistons and top pressure release vents.
3. **BoilerPlate:** Heavy cast-iron panel with perimeter hex bolts and a central recessed copper nameplate.

#### Category B: Interactive Controls
1. **BrassToggleSwitch:** Weighted mechanical knife-switch or heavy toggle with satisfying toggle animation, click sound hook, and dual amber/ruby indicator lamps.
2. **RotaryValveKnob:** 4-spoke cast brass wheel knob that rotates smoothly with stepped tick marks and pressure gauge response.
3. **LeverSlider:** Heavy industrial slot lever with brass handle and etched numerical step notches.

#### Category C: Displays & Indicators
1. **VacuumTubeDisplay:** Glowing glass triode tube containing dynamic numerical digits or status letters emitting an warm incandescent glow.
2. **ClockworkGauge:** Dual-needle analog dial (RPM / Steam Pressure) with glass lens glare, brass rim, and animated needle motion.
3. **TickerTapeBanner:** Moving brass-framed mechanical ticker display with rolling letter-spools or scrolling text feed.

#### Category D: Structural Accessories
1. **InterlockingGearTrain:** Interactive or animated gear cluster (sun & planet gears) that rotates during loading states or user interaction.
2. **PneumaticPipeJunction:** Modular T-pipe and elbow pipe segment with flanged bolt couplings and subtle ambient steam particles.
3. **WaxSealBadge:** Embossed red wax seal with trailing parchment ribbons and guild emblem stamp.

---

### Implementation Standards
- Built strictly with React, TypeScript, and Tailwind CSS + SVG vector graphics.
- All SVG gradients must use `useId()` for unique scoping.
- Support responsive scaling, customizable color/alloy props, and accessible keyboard/focus states.
```
