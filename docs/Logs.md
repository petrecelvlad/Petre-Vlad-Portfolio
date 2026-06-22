# Developer Logs

## Issue Tracking: Bento Grid Layout Offset (Scroll Native Snap Bug)

### The Problem
Users observed that when scrolling the timeline downwards, the Bento Grid inside the project card appeared "offset lower", whereas when scrolling upwards from the bottom, it appeared perfectly centered.

### Previous Attempts & Why They Failed

1. **Attempt 1**: Removing `justify-center` from the inner wrapper and replacing it with `justify-start` while keeping `min-h-0` and `flex-grow`.
   - **Why it failed**: The issue was not merely internal CSS Flexbox distribution. The core issue lies at the macro-level of how the native CSS scroll snapping (`snap-type: y mandatory`) interoperates with the fixed Navbar and intersection observers. Because the snapping sections were styled with `h-screen` (meaning `100vh`), and the parent container `main` was also `100vh` stretching from the absolute top of the viewport, the sections were actually rendering "underneath" the 64px fixed Navbar. 
   - **Result**: Depending on scroll inertia, browser scroll anchoring mechanisms, or address bar dynamic heights (like Chrome mobile/desktop), snapping perfectly to `top: 0` meant the top 64px of the card was obscured. Furthermore, if the content exceeded `100vh - 160px` of padding, the native scrolling mechanism would inconsistently assign internal scroll offsets.

2. **Attempt 2**: Tweaking `pt-[100px]` constraints and aligning timelines based on hardcoded heights.
   - **Why it failed**: It treated the symptom rather than the disease. Adjusting offsets inside an element that is inherently misaligned inside its overarching scroll container just created fragile magic numbers that break across different screen aspect ratios.

---

## Proposed Macro-Architecture (The Shell)

To eliminate scroll snapping bugs and ensure perfect alignment regardless of scroll direction, we must decouple the fixed UI (Navbar) from the Scrolling Viewport.

Here is the ASCII representation of the proposed architecture:

```text
=======================================================================
|                        FIXED NAVBAR (H: 64px)                       |
=======================================================================
|                        SCROLLABLE ENVELOPE                          |
|                       (Height: calc(100vh - 64px))                  |
|                        snap-type: y mandatory                       |
|                                                                     |
|  +---------------------------------------------------------------+  |
|  |                   STANDARD SECTION (Hero/Footer)              |  |
|  |                 snap-align: start, Height: 100%               |  |
|  |                                                               |  |
|  |   [   Section Content (Perfectly Centered or Justified)   ]   |  |
|  |                                                               |  |
|  +---------------------------------------------------------------+  |
|                                                                     |
|  +---------------------------------------------------------------+  |
|  |                 TIMELINE CONTAINER (Wrapper)                  |  |
|  |                                                               |  |
|  |     +---------------------------------------------------+     |  |
|  |     |               PROJECT CARD (snap-align: start)    |     |  |
|  |     |                 Height: 100% (of Envelope)        |     |  |
|  |     |                                                   |     |  |
|  |     |  ========   ==================================    |     |  |
|  |     |  | TL   |   |   BENTO GRID (Canvas)          |    |     |  |
|  |     |  |      |   |   (Centers flawlessly via      |    |     |  |
|  |     |  | Track|   |    flex without top-padding    |    |     |  |
|  |     |  |      |   |    hacks)                      |    |     |  |
|  |     |  ========   ==================================    |     |  |
|  |     +---------------------------------------------------+     |  |
|  +---------------------------------------------------------------+  |
|                                                                     |
=======================================================================
```

### Architectural Principles

1. **The Envelope Restriction**: 
   The `<main>` scroll container will NO LONGER span `100vh` and start at `top: 0`. It will sit exactly *below* the Navbar (`mt-[64px]`) and be exactly `h-[calc(100vh-64px)]` (or `flex-1` in an `h-screen` column). 

2. **The 100% Rule**:
   Sections inside the scroll container will use `h-full` rather than `h-screen`. This guarantees that `snap-start` aligns the top of the section with the top of the *accessible viewport*, not the monitor edge, removing any possibility of the Navbar obscuring content.

3. **Macro-Organisms**:
   - **Type A: Regular Sections** (Hero, Achievements, SkillTree, Footer). These occupy `w-full h-full` and use standard flexbox or grid centering. No complex offsets.
   - **Type B: Project Card Sections**. These are strictly `w-full h-full` flex layouts containing two columns:
     - *Column 1 (Fixed Width Segment)*: Dedicated purely to the timeline track and marker.
     - *Column 2 (Fluid Segment)*: Dedicated strictly to the Canvas containing the Bento Grid. Because the viewport height precisely matches the visible area, we no longer need `pt-[120px]` spacing to manually push the box out from under the Navbar. We simply apply standard, symmetrical padding.

By implementing this architecture, we neutralize the inconsistent scrolling behavior and gain pixel-perfect control over every macro-organism.

### Attempt 3: The `h-full` Cascade Trap
- **What we did:** We moved the `Navbar` out of the scroll container to be relatively positioned at the top, and put all sections in a `flex-1` `main` container using `h-full` wrappers.
- **Why it failed:** While the `Navbar` was successfully decoupled, the `h-full` constraint in CSS fails if the parent container doesn't have an explicit height constraint. Because `<Timeline>` was a wrapper component without an explicit height (rendering a `div` without `h-full`), the `h-full` applied to its internal looped children fell back to "intrinsic content size". This caused the project cards to expand vertically to accommodate all their content, breaking the viewport restriction.
- **Result:** The `ProjectDetails` grid expanded vertically past the screen height instead of shrinking internally. The user had to scroll past a giant, non-viewport-constrained Bento Grid, fundamentally breaking the 'one card per screen' snap mechanism.

### Attempt 4: The Explicit Envelope Constraint (Current)
- **What we are doing:** Instead of relying on CSS `h-full` cascades through React component fragment layers, we enforce `h-[calc(100vh-64px)]` on EVERY macro-organism wrapper directly. 
  - `App.tsx` macro-sections: `<div className="snap-start snap-always h-[calc(100vh-64px)] w-full">`
  - `Timeline.tsx` project cards: `<div className="snap-start snap-always h-[calc(100vh-64px)] w-full flex relative">`
- **Why this works:** `calc(100vh-64px)` is exactly the height of the `main` envelope regardless of parent structure. Flexbox calculation is bypassed and intrinsic growth is halted perfectly at the viewport boundary. This correctly enables the `min-h-0` truncations to take effect down the tree, restoring the scrolling inside `ProjectDetails` while the snap sections remain rigidly screen-sized. 
  - *Timeline marker check*: The top spacing has been adjusted precisely (`py-6` + `p-2`) to align with the `BentoHeader`'s profile icon.

---

## Technical Log: Timeline Animation Symmetry Refinement (2026-05-17)

### The Problem
The current timeline track is a single vertical bar that grows from top to bottom. While this works well for downward scrolling, it feels inconsistent when scrolling back up (the bar just "shrinks" back).

### The Solution: Symmetric Filling
We are moving towards a **Segmented Tracking** model where each section manages its own fill animation:
1. **Down-Scroll:** Fill grows Top $\rightarrow$ Center (Marker).
2. **Up-Scroll:** Fill grows Bottom $\rightarrow$ Center (Marker).

This ensures that entering a section from either direction provides the same visual satisfaction of "filling" towards the node.

### Files Created/Modified
- `docs/Architecture/Timeline_Animation_Spec.md`: Created to detail the collision logic and directional triggers.
- `docs/Architecture/README.md`: Updated to include the new spec.
