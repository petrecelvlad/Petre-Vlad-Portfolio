# Technical Implementation: SRP and Modularity

## Single Responsibility Principle (SRP) in React
Our current `Timeline.tsx` is an "Omni-Component." It handles:
1. Data fetching/flattening.
2. Scroll listening.
3. Animation state.
4. Progress tracking.
5. Auto-scroll logic.
6. Rendering.

This is why it is difficult to fix. If we change the scroll logic, the animation breaks. If we change the layout, the offsets break.

### The Modular Cleanup Strategy:

1. **`useTimelineOrchestrator` (Custom Hook):**
   - **Responsibility:** Pure Logic.
   - Calculates the `activeIndex`, `progressPercentage`, and handles the `autoScroll` triggers.
   - Exposes clean `state` and `handlers`.

2. **`ScrollCanvas` (Utility Component):**
   - **Responsibility:** Interaction Shell.
   - Provides an `Observer` context to children, notifying them when they are "Center-Stage."

3. **`TimelineItem` (Component Wrapper):**
   - **Responsibility:** Structural Positioning.
   - Manages its own `Ref` and provides its dimensions to the Orchestrator.

### Scalability and Modularity
By making the `TimelineItem` a generic wrapper, we can eventually swap an `ExperienceCard` for a `BlogCard` or a `VideoCard` without touching the Timeline logic. The system becomes **Media-Agnostic**.

### Future Scalability:
- **Virtualization:** For 100+ projects, we can implement virtualization within the `ScrollCanvas`.
- **Theming:** Use CSS Variables mapped to the Design System atoms to allow "Dark Mode" or "High Contrast" with a single class swap on the `App` element.
