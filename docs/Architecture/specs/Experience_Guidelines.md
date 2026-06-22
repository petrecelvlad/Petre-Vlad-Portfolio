# Experience Guidelines: Empathy and Delight

## Human-Centric Micro-interactions
The "Perfect Scroll" isn't just about math; it's about **Visual Rhythm**. When a card expands, the user's eye is naturally drawn to the center of the screen. Our system must reinforce this behavior.

### 1. Motion Principles (Atomic Level)
- **Staggered Entry:** Elements within the `ExperienceCard` (Role, Tech Stack, Image) should animate in with a 50ms stagger.
- **Spring Physics:** Avoid "Linear" or "Ease" for spatial movement. Use `stiffness: 60, damping: 15` for a "Game UI" feel that feels responsive rather than clinical.

### 2. Typographic Hierarchy
- **Primary Display:** Inter (Medium/Bold) for clarity.
- **The "Mono" Accent:** JetBrains Mono for metadata to evoke a "Code/Engineering" feel without losing legibility.
- **Rhythm:** We must enforce a `4px` or `8px` grid system. No "magic numbers" for padding.

### 3. Contextual Awareness
The "System" should "know" where the user is. 
- If the user manually scrolls away during an auto-center, the **Auto-Center Lock** should release immediately.
- Transitioning between projects should feel like **sliding a fresh canvas** onto the screen, rather than scrolling through a long document.

### 4. The Sectional Grid (Scene Pattern)
We have introduced the `Scene` component as our primary layout primitive. Every major feature (Hero, Timeline, Skills) must be wrapped in a `Scene`.

- **Anchor Offset:** Every `Scene` defines a `data-scene-anchor` at a fixed offset (default `100px`). This is our **SSOT for center-point alignment**.
- **Unified Transitions:** `Scene` handles the "Entrance Sequence" of the platform, ensuring elements don't just pop in but "slide into the stage."

### The "Aha!" Moment:
Excellence is achieved when the interface feels like an **extension of the user's intent**. By standardizing our containers, we allow the code to "know" the stage, making magnetic centering a predictable side-effect of correct architecture.
