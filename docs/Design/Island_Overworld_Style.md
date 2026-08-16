# 2.5D Island Overworld Design System (Micro-RPG / Forager Style)

## Visual Overview
Inspired by classic top-down island overworld maps (e.g., *Forager*, *Super Mario 3D World overworld maps*, *Kenney Micro RPG*), this aesthetic combines **tropical vibrant ocean water, terraced island elevations, crisp white shoreline foam lines, and white dotted level-selection paths**.

---

## Core Visual Heuristics

### 1. Water & Shoreline Foam
* **Tropical Sea Canvas:** Vibrant turquoise/cyan blue water (`#0284C7` to `#38BDF8`) with subtle wave crests.
* **White Foam Outline:** Every island, rock, or vessel in the water is framed by a thick, bright white shoreline border (`stroke="white"`, `strokeWidth="3px"–4px"`).

### 2. Terraced 2.5D Elevation Steps
* **Island Top Faces:** Warm sunny sand (`#F59E0B`), grass green (`#22C55E`), or stone gray (`#64748B`).
* **Vertical Cliff Faces:** Darker extruded vertical drop-offs underneath each terrace tier (3px–8px thick) giving instant 2.5D orthographic depth.
* **Surface Vegetation & Chests:** Micro pixel bushes, palm trees, wooden ladders, and golden treasure chests sitting on top faces.

### 3. Level Paths & Node Badges
* **White Dashed Navigation Line:** Clean orthogonal or diagonal white dashed paths (`stroke="white"`, `strokeDasharray="6 6"`, `strokeWidth="3px"`) connecting stage nodes across land and water.
* **Stage Callout Badges:** Rounded notification bubbles (e.g., `1-1 !`, gold coin counter, gem badges) with dark outlines and pop notification icons.
* **Sailing Ships & Vessels:** Tiny wooden ships or rafts floating along the dashed water paths with animated water ripples.

---

## Color Palette Matrix
* **Ocean Water:** `#0284C7` (base blue) / `#38BDF8` (shallows)
* **Shoreline Foam:** `#FFFFFF` (100% solid white contour)
* **Sandy Terraces:** `#F59E0B` (top face) / `#B45309` (cliff drop)
* **Grass Terraces:** `#22C55E` (top face) / `#15803D` (cliff drop)
* **Level Path & Foam:** Solid White (`#FFFFFF`)
