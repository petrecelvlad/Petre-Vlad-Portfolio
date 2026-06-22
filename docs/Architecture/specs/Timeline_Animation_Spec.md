# Technical Specification: Symmetric Timeline Animation

## 1. Overview
The Timeline Animation is the core interactive element of the Experience Engine. It serves as the primary visual guide for the "Scene-based" navigation system. The goal is to provide a consistent, delight-driven "fill" animation that reacts to the user's scroll direction.

## 2. Visual Architecture

### 2.1 The Base Track
- **Style:** `bg-periwinkle/15` (defined in `bauhaus.ts`).
- **Behavior:** Always present. It defines the vertical spine of the application.
- **Construction:** A continuous line or a series of contiguous segments that span the entire height of the `Timeline` organism.

### 2.2 The Active Fill (Dynamic Bar)
- **Style:** `bg-periwinkle-deep` with `shadow-[0_0_12px_rgba(172,150,219,0.3)]`.
- **Constraint:** The fill **never** exceeds the Marker's Y coordinate. It is strictly bounded between the entry edge (Top or Bottom) and the Marker node.
- **Directionality:** 
    - **Down-Scroll**: Grows from top-edge ($y=0$) down to Marker ($y=M$).
    - **Up-Scroll**: Starts from bottom-edge ($y=H$) and "fills" or "retracts" towards the Marker ($y=M$).
- **Responsiveness:** Driven by intersection ratios and scroll velocity within the active section.

### 2.3 The Timeline Marker (Circle)
- **Style:** Bordered circle with a shadow (`shadow-applet-sm`).
- **Initial State:** `scale: 0`, `opacity: 0`.
- **Reveal Trigger:** When the leading edge of the **Active Fill** reaches the vertical center coordinate of the marker. Once revealed, it stays visible as long as the fill is present at its coordinate.

---

## 3. Directional Animation Logic

### 3.1 Entry from Top (Scrolling Down)
1. **Initial State**: Track is empty (at the start of the section).
2. **Animation**: As the user scrolls down, a colored bar grows from $y=0$ towards $y=MarkerPosition$.
3. **Collision**: When the bar edge touches the Marker, trigger `Marker.reveal()`.
4. **Exit**: As the section moves off-screen at the top, the bar remains "pinned" at the marker until the next section takes over.

### 3.2 Entry from Bottom (Scrolling Up)
1. **Initial State**: Track is "pre-filled" from the bottom edge up to some point (or starts filling from bottom as the section enters from the top of the viewport).
2. **Animation**: As the user scrolls up (moving the page content down), the colored bar "retracts" or animates from the **bottom edge of the section** up towards the **Marker**.
3. **Collision**: The "leading edge" (the top of this rising bar) hits the Marker.
4. **Reveal**: Trigger `Marker.reveal()`.
5. **Logic Note**: This creates a symmetric feel where the user is always "driving" the color towards the node from whichever direction they enter.

---

## 4. Technical Requirements

### 4.1 Orchestrator Updates
The `useTimelineOrchestrator` hook must be upgraded to:
- Track `scrollDirection` (using `useScroll` or `onWheel`/`onTouchMove` delta).
- Calculate `activeSectionProgress` (0 to 1).
- **Edge-to-Marker Mapping**:
    - If `down`: Map progress $[0, 1]$ to path $[0, MarkerRatio]$.
    - If `up`: Map progress $[0, 1]$ to path $[H, MarkerRatio]$.

### 4.2 Component Modifications
- **TimelineTrack**: 
    - In `isActive` state, it calculates its internal height based on `direction`.
    - It uses `origin-top` for down and `origin-bottom` for up.
    - Max-height is capped at `markerY`.
- **TimelineMarker**: 
    - Listens to its section's `fillProgress`.
    - Displays itself when `fillProgress` hits the specific `markerY` threshold.
- **Scene**: Ensure that the "Scene" stays focused during the animation to avoid "jumping" between states.

## 5. Animation Constants
- **Stiffness:** 70
- **Damping:** 18
- **Mass:** 1
- **Marker Delay:** 50ms (post-collision for a "impact" feel)

---

## 6. Success Criteria
- [ ] Scrolling down fills the bar from top-to-bottom.
- [ ] Scrolling up fills the bar from bottom-to-top.
- [ ] The Marker *only* appears when the colored bar touches it.
- [ ] Reversing scroll mid-section reverses the fill animation smoothly.
- [ ] Subsequent animations in the Bento Grid are only triggered *after* the Marker is revealed.
