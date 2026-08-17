# 2.5D Island Overworld Map GLSL Shader Prompt

## Overview
This prompt reproduces the exact **Top-Down 2.5D Island Map & Sailing Boat** aesthetic from classic micro-RPG world maps (*Forager*, *Super Mario World*, *Kenney Micro RPG*).

---

## Agent Prompt: 2.5D Island Overworld Hero Shader

```markdown
Create a GLSL Fragment Shader Hero Background that reproduces a 2.5D Top-Down Island Overworld Map.

### Aesthetic & Visuals: 2.5D Island Map & Sailing Boat
- **Ocean Water & Foam:** Bright tropical cyan sea (`#0284C7`) with subtle animated wave ripples and a crisp white foam border (`stroke="white"`) surrounding all landmasses.
- **Terraced Island Elevations:**
  - Sandy island terraced layers with 3D vertical cliff faces (`p.y < -0.05 => col *= 0.65`).
  - Micro grass tufts, wooden ladders, and golden treasure chests sitting on island tops.
- **Dashed Level Path & Sailing Ship:**
  - White orthogonal dashed stage path (`strokeDasharray="6 6"`) winding across the sea between islands.
  - A small wooden sailing ship (`#B45309`) bobbing along the dashed water path.
  - Floating stage callout speech bubble (`1-1 !`) above the main island node.

### Technical Requirements
- Uniforms: `u_resolution` (vec2), `u_time` (float), `u_mouse` (vec2).
- Continuous gentle wave bobbing animation on the boat and water foam.
- Render as a full-bleed `absolute inset-0 -z-10` hero canvas with soft vignette.
```
