# 16-Bit SNES Micro-RPG Landscape Card Thumbnail Prompts

A curated collection of self-contained prompt specifications for rendering **landscape UI card thumbnails (16:9 ratio)** inside mini portfolio cards (**Years Experience**, **Games Produced**, **Indie Projects**, and **Teams Led**).

---

## The Unified 16-Bit Micro-RPG Design System

Every thumbnail in this collection standardizes on the **16-Bit SNES / Micro-RPG Pixel Aesthetic** built around a single, highly refined motion heuristic: **A central 3D hero object sitting on a pedestal or floating in 3/4 perspective, continuously rotating around its vertical axis or animating through dynamic motion loops.**

```
+-------------------------------------------------------------------------+
| [Layer 1: Dark Slate Canvas] Rich matte background                      |
| [Layer 2: Flanking Ornaments] Floating particle motes & dashed arcs    |
| [Layer 3: 3D Hero Object] Continuous 360-degree rotation or motion loop|
|            - Solid white contour ring (`#FFFFFF`)                       |
|            - 2.5px dark vector borders (`#1E293B`)                      |
|            - 2.5D bevel extrusion depth (`darkened bevel tone`)         |
| [Layer 4: Speech Callout Badge] Floating notification badge (e.g., "XP+1")|
| [Layer 5: Card Vignette] Soft radial framing shadow for UI card fit     |
+-------------------------------------------------------------------------+
```

---

## Stat 1: Years Experience (Industry Seniority & Time Passage)

### Alternative 1A: 3D Y-Axis Rotating Golden Hourglass (Classic Spin & Streaming Sand)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Experience Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D-extruded glass and gold hourglass (`#FACC15`) sitting in 3/4 perspective, continuously rotating 360 degrees around its vertical Y-axis.
- **Animation & Motion:** Steady continuous Y-axis rotation with golden sand particles streaming downward continuously from the top chamber into the bottom glass bulb.
- **Flanking Ornamental Decor:** Floating golden sand particle motes rising gracefully on the left and right flanks with white dashed orbit paths.
- **Style Rules:** Crisp solid white contour outlines (`#FFFFFF`), 2.5px dark vector borders (`#1E293B`), 2.5D bevel extrusion depth (`#CA8A04` with darkened edge tone), and a dark slate canvas (`#0F172A`).
- **Callout Badge:** Top-right floating speech callout badge (`10+ YRS`) with a dark border and gold fill (`BADGE_GOLD`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 1B: Levitating & Tilting Hourglass (180° Inversion Flip Loop)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Experience Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Floating Symbol:** A 3D isometric brass and crystal hourglass (`#F59E0B` frame with `#38BDF8` crystal glass) hovering in mid-air, gently levitating up and down while executing a smooth 180-degree end-over-end flip loop, periodically resetting the falling sand flow.
- **Animation & Motion:** Vertical levitation bounce coupled with a periodic 180-degree inversion flip, generating glowing cyan magic sand grain cascades on each turn.
- **Flanking Ornamental Decor:** Twin floating chrono-rings (`#38BDF8`) expanding dynamically on each flip, flanked by rising glowing time motes.
- **Style Rules:** Solid white outer contour highlights (`#FFFFFF`), 3D glass glare specular streaks, 2.5D brass frame drop-shadows, and vibrant arcade purple canvas (`#1E1B4B`).
- **Callout Badge:** Top-right floating speech callout badge (`SENIORITY`) with a cyan active indicator dot (`#06B6D4`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 1C: Flat 2.5D Isometric Mechanical Hourglass (Swaying Pendulum & Gears)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Experience Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Mechanical Symbol:** A flat 2.5D mechanical steampunk hourglass (`#EAB308` gold frame with `#78350F` dark bronze gear housing) mounted on an isometric stone pedestal (`#64748B`), swaying gently left to right like a pendulum, while internal gear teeth continuously rotate around its narrow waist.
- **Animation & Motion:** Pendulum sway motion + spinning gear teeth around the waist + steady falling sand beam with sparkling gold particle bursts upon hitting the base.
- **Flanking Ornamental Decor:** Interlocking orbiting brass cog rings and animated white dashed trajectory arcs (`#FFFFFF`).
- **Style Rules:** Bold dark vector outlines (`#1E293B`), solid white outer contour outline, 2.5D pedestal bevel depth, and slate backdrop (`#0F172A`).
- **Callout Badge:** Floating "MASTERY" stage callout badge above the hourglass frame (`BADGE_GOLD`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 1D: Segmented Gold XP Bar & Elastic "LEVEL UP!" Pop Burst (Juicy Fill & Reset Loop)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Experience Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Symbol:** A prominent 16-bit horizontal experience bar with a golden frame (`#F59E0B`) and dark inset container (`#1E293B`) centered on a rich ocean blue canvas (`#0284C7`).
- **Loop Dynamics & Fill Sequence:** The bar fills sequentially across 5 distinct golden segments (`#FACC15` to `#F59E0B`). Upon reaching 100% capacity (5th segment), the bar flashes bright white, launching a 3D pixel "LEVEL UP!" banner (`#FFFFFF` text with cyan stroke `#06B6D4`) upward with elastic squash-and-stretch pop motion.
- **Celebration & Reset:** Expanding blue shockwave rings (`#38BDF8`) and rising cyan energy motes erupt across the scene on completion. After a brief hold pause, the bar resets back to 0 segments and seamlessly restarts the fill sequence.
- **Flanking Ornamental Decor:** Vertical motion guide lines, rising glowing energy droplets, and white dashed trajectory arcs (`#FFFFFF`).
- **Style Rules:** Crisp 2.5px white vector contour line (`#FFFFFF`) framing the XP bar, dark vector borders (`#1E293B`), 2.5D bevel extrusion depth, and deep navy backdrop.
- **Callout Badge:** Top-right floating speech callout badge (`LVL +1`) popping up on full fill with an active cyan LED indicator dot (`#06B6D4`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 1E: 3D Isometric Golden XP Gauge with Fill Nodes & Scroll Crest Flash
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Experience Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Symbol:** A 3D isometric extruded golden experience gauge tube (`#EAB308` rim with `#0F172A` dark interior) resting in 3/4 center perspective against a royal navy background (`#1E1B4B`).
- **Loop Dynamics & Fill Sequence:** Golden energy (`#FACC15` / `#F59E0B`) surges left-to-right, sequentially lighting up 6 discrete LED tick bars one by one with a satisfying pulse glow on each tick.
- **Celebration & Reset:** Once all 6 ticks ignite, a brilliant gold-and-cyan flare erupts behind a 3D "LEVEL UP!" scroll crest (`#38BDF8` text fill), releasing floating gold "+1 LVL" coin tokens into the air. The gauge then drains smoothly back to empty to repeat the fill cycle.
- **Flanking Ornamental Decor:** Twin vertical motion guide trajectory lines, animated white dashed elevator indicators (`#FFFFFF`), and glowing blue energy particles.
- **Style Rules:** Crisp white outer contour highlights (`#FFFFFF`), 3D extruded bevel drop-shadows, top-left glare streaks, and deep midnight navy canvas.
- **Callout Badge:** Top-left floating callout badge (`MAX XP!`) with electric blue fill (`BADGE_BLUE`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 1F: Minimalist Segmented Gold Progress Rail with Glowing Chevron Fill & Radial Burst
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Experience Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Symbol:** A sleek, high-contrast horizontal progress rail with 8 sharp rectangular gold segments (`#FACC15` with `#CA8A04` bevels) framed by a crisp white vector contour (`#FFFFFF`) against a deep sapphire canvas (`#090D16`).
- **Loop Dynamics & Fill Sequence:** Segments illuminate sequentially from left to right in a rhythmic step sequence.
- **Celebration & Reset:** Upon reaching 8/8 full capacity, a bold 3D "LEVEL UP!" headline leaps above the rail, surrounded by a radial burst of electric blue chevrons (`#38BDF8`) and expanding liquid ring waves. After a short celebratory hold, the segments click off in quick succession to re-fill on repeat.
- **Flanking Ornamental Decor:** Minimalist vertical speed lines (`#FFFFFF`), rising cyan energy droplets, and subtle radial framing glow.
- **Style Rules:** Ultra-clean 16-bit vector aesthetic, high-contrast white contour outlines around each segment layer (`#FFFFFF`), bold dark vector borders (`#1E293B`), zero clutter.
- **Callout Badge:** Top-right floating callout notification badge (`UP!`) above the rail with a cyan active indicator dot (`#06B6D4`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

---

## Stat 2: Games Produced (Commercial Titles & Releases)

### Alternative 2A: 3D Rotating Golden Game Cartridge (Published Titles)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Games Produced Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D-extruded golden SNES Game Cartridge (`#F59E0B`) hovering in 3/4 perspective in the center, continuously rotating 360 degrees around its Y-axis.
- **Flanking Ornamental Decor:** Flanked by two floating golden coin badges and an animated white dashed navigation path (`#FFFFFF`).
- **Style Rules:** Solid white outer cartridge contour outline (`#FFFFFF`), 3D bottom extrusion lips (`#B45309`), top-left specular glare lines, and rich arcade blue canvas (`#0284C7`).
- **Callout Badge:** Top-left floating stage callout badge (`RELEASED`) with a glowing LED indicator dot.
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 2A-Invader: 3D Rotating Game Cartridge with Pixel Arcade Monster
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Games Produced Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D-extruded SNES Game Cartridge (`#F59E0B` body with a dark grey inset sticker panel `#1E293B`) hovering in 3/4 perspective, continuously rotating around its Y-axis.
- **Cartridge Label Art:** A distinct 8x8 pixel arcade monster (`#EF4444` red eyes, `#38BDF8` cyan body pincers) embossed directly onto the front label sticker, rotating in exact alignment with the cartridge face.
- **Flanking Ornamental Decor:** Flanked by two floating pixel gold coins and animated white dashed laser/orbit trajectories.
- **Style Rules:** Solid white outer contour line (`#FFFFFF`) around the entire cartridge shell, 3D extruded dark grey bottom connector pins (`#0F172A`), top-left specular glare line, and deep arcade navy canvas (`#090D16`).
- **Callout Badge:** Top-left floating stage callout badge (`8-BIT GAME`) with a glowing red LED dot.
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 2B: 3D Rotating Golden Championship Trophy (Achievements)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Games Produced Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D-extruded golden trophy cup (`#FACC15`) with side handles sitting on a stone base, continuously spinning around its Y-axis.
- **Flanking Ornamental Decor:** Sparkling gem particles bursting outward on each rotation with white dashed orbit rings.
- **Style Rules:** Solid white contour highlights, 2.5D gold bevel drop-shadows, and dark slate backdrop (`#0F172A`).
- **Callout Badge:** Floating "AWARD" callout notification speech bubble above the trophy.
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 2C: 3D Rotating Retro Arcade Cabinet (Title Releases)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Games Produced Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A mini 3D retro arcade cabinet (`#EF4444`) centered in 3/4 view, slowly rotating on its vertical Y-axis.
- **Flanking Ornamental Decor:** Flanked by scrolling pixel CRT screen scanlines and floating 3D arcade joystick nodes.
- **Style Rules:** Crisp white contour outlines, 3D extruded cabinet side panels, and dark navy canvas (`#090D16`).
- **Callout Badge:** Floating "PLAY" / "HIGH SCORE" speech callout bubble with rhythmic bouncing motion.
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

---

## Stat 3: Indie Projects (Crafting & Passion Work)

### Alternative 3A: 3D Rotating Bubbling Mana Flask (Passion Projects)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Indie Projects Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A round glass alchemy flask filled with glowing, bubbling mana liquid (`#3B82F6`) centered in 3/4 perspective, slowly rotating on its Y-axis.
- **Flanking Ornamental Decor:** Flanked by floating magic crystal shards (`#06B6D4`) and a white dashed energy circuit loop.
- **Style Rules:** Solid white glass contour outlines (`#FFFFFF`), glowing liquid wave motion, and deep indigo background (`#1E1B4B`).
- **Callout Badge:** Floating cork stopper with a golden craft badge node (`CRAFT +1`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 3B: 3D Rotating Golden Blacksmith Anvil (Hand-Crafted Work)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Indie Projects Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D pixelated iron and gold anvil (`#334155`) centered in the frame, continuously rotating on its Y-axis.
- **Flanking Ornamental Decor:** A floating blacksmith hammer strikes the anvil top on a steady beat, sending glowing orange spark particles (`#F97316`) flying in an arc.
- **Style Rules:** Solid white contour highlights on anvil edges, 2.5D iron cliff drop-shadows, and dark slate card backdrop (`#0F172A`).
- **Callout Badge:** Floating "FORGE" stage badge notification with a pulsing fire core.
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 3C: 3D Rotating Blueprint Isometric Cube (Creative Prototypes)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for an Indie Projects Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D wireframe blueprint cube/globe with grid faces centered in the frame, continuously spinning on its Y-axis.
- **Flanking Ornamental Decor:** Flanked by floating 3D drafting compasses drawing gold geometric shape outlines in an infinite loop.
- **Style Rules:** Blueprint blue canvas (`#1E40AF`), bright white grid lines, solid white contour outlines, and neon yellow draft lines.
- **Callout Badge:** Top-right "DRAFT" stage callout badge with white dashed grid borders.
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

---

## Stat 4: Teams Led (Leadership & Management)

### Alternative 4A: Captain's POV — Golden Storm & Clockwise Helm Wheel
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Teams Led Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **POV Captain Scene:** First-person perspective (POV) from the Captain's helm looking forward across the wooden deck and ship bow cutting through open ocean waves.
- **Foreground Wheel:** A 3D-extruded isometric dark oak Captain's Ship Helm Wheel (`#78350F` wood rim with 8 handle pegs and `#FACC15` brass central hub) sitting in the lower foreground, continuously rotating clockwise around its vertical axis.
- **Environment & Wave Dynamics:** In front of the wheel, the ship's bow pitches through rolling dark slate ocean waves (`#0F172A` / `#0284C7`). White foam crests (`#FFFFFF`) and sea spray droplets burst outward and splatter towards the camera lens in a continuous loop.
- **Style Rules:** Solid white outer contour outlines (`#FFFFFF`) wrapping the wheel spokes and ship bow rail, 2.5px dark vector borders (`#1E293B`), 3D vertical wood bevel drop-shadows (`#451A03`).
- **Callout Badge:** Top-right floating speech callout badge (`CAPTAIN`) with a dark border and gold fill (`BADGE_GOLD`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 4B: Captain's POV — Midnight Bioluminescent Voyage & Counter-Clockwise Helm Wheel
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Teams Led Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **POV Captain Scene:** First-person perspective (POV) from the Captain's helm at night, looking over the wooden ship bow into a deep midnight sea.
- **Foreground Wheel:** A 3D-extruded isometric mahogany wooden Captain's Ship Helm Wheel (`#9A3412` mahogany finish with `#F59E0B` gold-capped handles) sitting in the lower foreground, continuously rotating counter-clockwise around its vertical axis.
- **Environment & Wave Dynamics:** The ship's bow slices through deep indigo waters (`#1E1B4B`), creating glowing cyan bioluminescent foam waves (`#06B6D4` / `#38BDF8`) with water droplets splattering towards the camera screen as the ship rolls.
- **Style Rules:** Solid white contour rings (`#FFFFFF`), 2.5D wood bevel drop-shadows, 16-bit pixel wave textures.
- **Callout Badge:** Top-left floating speech callout badge (`LEADER`) with a dark border and gold fill (`BADGE_GOLD`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 4C: Captain's POV — Golden Hour Sunset & Alternating Sway Helm Wheel
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Teams Led Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **POV Captain Scene:** First-person perspective (POV) standing at the wheel on the quarterdeck during a golden sunset, steering the ship forward over rolling ocean swells.
- **Foreground Wheel:** A 3D-extruded isometric teak wooden Captain's Ship Helm Wheel (`#B45309` teak wood rim with `#CA8A04` polished brass inlay) sitting in the lower foreground, rhythmically swaying its rotation back and forth around its vertical axis.
- **Environment & Wave Dynamics:** Golden sunset light reflects off deep blue ocean waves (`#D97706` amber gleams over `#0284C7` sea). Frothy white wave spray and water splatters crash off the ship's bow and fly toward the player's screen.
- **Style Rules:** Crisp white contour outlines (`#FFFFFF`) framing the helm and bow edges, 2.5D wood bevel drop-shadows, and deep oceanic backdrop.
- **Callout Badge:** Floating "STEERING" status callout speech bubble with a green active indicator dot (`#22C55E`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 4D: 3D Rotating Flat Isometric Expedition Map (Pathfinder & Navigation)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Teams Led Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Rotating Symbol:** A 3D-extruded flat parchment treasure/expedition map (`#F59E0B` aged amber parchment with dark brown `#78350F` frayed leather edges and burnt compass rose) hovering in 3/4 isometric perspective, continuously spinning around its vertical axis.
- **Map Features & Route Dynamics:** A glowing golden path line (`#FACC15` / `#38BDF8`) continuously traces across pixelated mountain ridges and island landmasses on the map face as it rotates, connecting 3 flagged team waypoint posts (`#EF4444`) to a central gold crest destination.
- **Flanking Ornamental Decor:** Levitating brass compass icons (`#CA8A04`) and floating gold coin motes with animated white dashed orbit arcs (`#FFFFFF`).
- **Style Rules:** Solid white outer contour outline (`#FFFFFF`), 2.5D parchment bevel extrusion depth (`#B45309`), 2.5px dark vector borders (`#1E293B`), and dark slate canvas (`#0F172A`).
- **Callout Badge:** Top-right floating speech callout badge (`PATHFINDER`) with a dark border and gold fill (`BADGE_GOLD`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 4E: Levitating Unrolled Scroll Map with 3D Brass Compass (Hovering Strategic Route)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Teams Led Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Central Levitating Symbol:** An unrolled ancient expedition scroll map (`#FDE68A` warm parchment with `#78350F` mahogany handles) hovering gracefully in 3/4 perspective, gently levitating up and down, while a 3D extruded brass compass (`#FACC15`) floats directly above it with a spinning needle.
- **Map Features & Route Dynamics:** The scroll surface features a branching strategic roadmap with animated glowing energy pulses (`#06B6D4` cyan / `#3B82F6` blue) illuminating each waypoint node sequentially, symbolizing guiding multiple project teams along the optimal path.
- **Flanking Ornamental Decor:** Floating glowing energy motes, levitating aura rings, and white dashed navigation trajectories (`#FFFFFF`).
- **Style Rules:** Crisp white contour outlines (`#FFFFFF`), 3D mahogany edge drop-shadows, top-left specular glare lines, and deep midnight indigo backdrop (`#1E1B4B`).
- **Callout Badge:** Top-left floating stage callout badge (`COMMAND`) with a pulsing gold LED indicator dot (`#F59E0B`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```

### Alternative 4F: Overworld Strategic Tactical Map (Full Panoramic Map & Fleet Waypoints)
```markdown
Create a full-bleed 16:9 landscape animated UI card thumbnail for a Teams Led Card in the 16-Bit SNES Micro-RPG Style.

### Scene Composition & Animation
- **Full-Bleed Map Scene:** A full panoramic strategic overworld map landscape rendered in 16-bit SNES Micro-RPG style, featuring dark ocean waters (`#0284C7`), terraced island territories (`#059669`), and a prominent 3D Brass Compass Rose (`#FACC15` / `#78350F`) anchored over the primary continent.
- **Map Features & Route Dynamics:** Dynamic animated dotted route lines (`#38BDF8` cyan and `#F59E0B` amber) flow outward from a central command stronghold to 3 team expedition outposts, with pulsing flag markers and small 16-bit fleet ship icons traversing the routes in real time.
- **Flanking Ornamental Decor:** Submarine coordinate grid lines (`#334155`), floating tactical crosshair rings, and sparkling light motes over active destination waypoints.
- **Style Rules:** Solid white grid & coastline contour lines, 16-bit pixel shading, dark slate framing vignette.
- **Callout Badge:** Floating callout speech bubble (`TACTICIAN`) with a dark vector border and gold fill (`BADGE_GOLD`).
- **Framing & Vignette:** 16:9 landscape framing with a radial card vignette effect for seamless UI card integration.
```
