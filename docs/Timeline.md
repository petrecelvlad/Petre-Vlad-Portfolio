# Agent Guidelines for Timeline Implementation

The Timeline component uses a highly specific orchestration logic for its animations to achieve a "Neo-brutalist" filling/unfilling effect. This logic MUST be preserved.

## 1. Scroll Orchestration
- **Mandatory Container Ref**: The `useScroll` hook in `useTimelineOrchestrator` and `TimelineItem` MUST use a `container` property pointing to the main scrollable element (e.g., `main` in `App.tsx`). Without this, animations will not trigger correctly as the viewport scroll is decoupled from the internal container scroll.
- **Section Progress**: `scrollYProgress` for each section is calculated with `offset: ["start end", "end start"]`.

## 2. Timeline Track Animation (Filling Logic)
- **Unified Mapping**: The height of the active timeline track MUST be mapped using `scrollYProgress` of the section:
  - `p = 0.0` (Section entering from bottom): Height = `0%`.
  - `p = 0.5` (Section centered/snapped): Height = `markerRatio * 100%`.
  - `p = 1.0` (Section leaving towards top): Height = `100%`.
- **Directional Behavior**: 
  - When scrolling **down**, the bar "fills" from the top down to the marker.
  - When scrolling **up**, the bar "retracts" from the bottom up to the marker (starting from 100% and shrinking to `markerRatio`).
- **Anchor**: The track is always anchored at the top (`top: 0`).

## 3. Marker Reveal Animation
- **Visibility Threshold**: Markers must be hidden until the track animation reaches them.
- **Bi-directional Reveal**:
  - **Down**: Reveal when `p` goes from `0.4` to `0.5`.
  - **Up**: Reveal when `p` goes from `0.6` to `0.5` (as the retraction hits the marker).
- **Consumed State**: If `index < activeIndex`, the marker must be fully revealed and the track fully filled.

## 4. Hook Stability
- In `useTimelineOrchestrator`, all hooks (`useScroll`, `useState`, `useEffect`) must remain in a stable order at the top.
- The `IntersectionObserver` threshold should be sufficiently dense (e.g., 20 steps) to capture smooth transition points.
