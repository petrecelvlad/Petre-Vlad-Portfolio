# DeskBoard Jagged Edges (SVG Method)

This document outlines the technical path for introducing "splintered" or "jagged" wood edges to the `DeskBoard` planks, utilizing **Method 3: Pure SVG Elements**, and how we'll support toggling between the clean (current) and jagged styles.

## The Goal
To make the wooden planks (`Rail` and `Post` in `DeskBoard.tsx`) look less perfectly flat on the sides by adding subtle, sparse triangle-shaped cuts (splinters) along their edges, matching the reference image.

## Why Method 3 (Pure SVG)?
While CSS `clip-path` (Method 1) is great for cutting shapes into HTML `div`s, it struggles when you have complex inner layers (like our highlight, face, and elevation strips) that all need to follow the exact same jagged contour, plus a bounding outline ring.

By rebuilding the planks as pure `<svg>` elements:
1. **Precise Path Control:** We can define a single `d="..."` path that includes the jagged cuts.
2. **Layering:** We can reuse that exact same path geometry for the elevation shadow, the main face, and the highlight, just shifting them slightly vertically.
3. **Outline Ring:** We can simply apply a `stroke` to the outermost path to create the `OUTLINE_WIDTH` ring, guaranteeing it perfectly hugs the splinters without box-model math breaking down.

## Technical Implementation Path

### 1. The SVG Plank Components
We will create new components: `SvgRail` and `SvgPost`.

Instead of HTML `<div>`s with `padding`, they will return `<svg>` elements.
* **The Path Generation:** We'll write a small helper function that generates an SVG path (`M x y L x y...`). For the straight edges, it draws a straight line. For the jagged edges, it inserts occasional `L` (line) commands that jut inward and back outward (forming the triangle cuts).
* **The Layers:**
  * `<path d={basePath} fill={ELEVATION_COLOR} transform="translate(0, elevationOffset)" />`
  * `<path d={basePath} fill={BOARD_COLOR} />`
  * `<path d={highlightPath} fill={HIGHLIGHT_COLOR} />`
  * `<path d={basePath} fill="none" stroke={OUTLINE_COLOR} strokeWidth={OUTLINE_WIDTH} />`
* **Wood Grain:** We can embed our existing `<WoodBackground>` grain paths directly inside these SVG planks using an SVG `<clipPath>` so the grain perfectly crops to the jagged plank shape.

### 2. The Toggle System (State & Context)
To support switching between the current "perfect rectangle" boards and the new "jagged" boards:

1. **Context Update:** We will add a new property to the application's global state (e.g., in `SkinContext` or a new `PlankStyleContext`): `plankStyle: 'clean' | 'jagged'`.
2. **Top Navbar Control:** We will add a new dropdown menu in the top navigation bar (similar to the skin selector) that calls `setPlankStyle('jagged')` or `setPlankStyle('clean')`.
3. **DeskBoard Logic:** Inside `DeskBoard.tsx`, we will read this context.
   ```tsx
   const { plankStyle } = usePlankStyle();

   // Inside the render:
   {plankStyle === 'clean' ? (
     <>
       <Rail side="top" />
       <Post side="left" />
     </>
   ) : (
     <>
       <SvgRail side="top" />
       <SvgPost side="left" />
     </>
   )}
   ```

### 3. Execution Steps
1. **Define the SVG Math:** Create the procedural path generator for the jagged edges (randomized or fixed seed so it looks organic but stable).
2. **Build SvgRail & SvgPost:** Implement the layered SVG structure.
3. **Integrate WoodGrain:** Adapt the grain to clip inside the new SVG paths.
4. **Wire the UI:** Add the navbar dropdown and context provider.
5. **Swap:** Allow the user to toggle and see the immediate difference.