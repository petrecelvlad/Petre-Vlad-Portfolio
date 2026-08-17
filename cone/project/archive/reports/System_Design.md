# System Design: The Managed Stage Architecture

## The Concept of the "Shell"
A professional-grade experience separates the **Application Shell** from the **Experience Canvas**. Currently, our `Navbar` and `Timeline` share the same global overflow.

### The Proposed Rearchitecture:
We must implement a **Box-Model Constraint** system:

1. **The Global Header (Static Molecule):** Occupies a fixed height (e.g., `H_NAV`).
2. **The Content Viewport (Fluid Molecule):** A container that occupies `calc(100vh - H_NAV)`. 
3. **The Center-Point Invariant:** Within the Content Viewport, the "Center" is a fixed coordinate. We move the *canvas*, not the *viewport*, to align with this point.

### Atomic Design Implementation:

#### 1. Atoms (The Building Blocks)
- **NodeMarker:** A simple circle with a status prop (`consumed`, `active`, `pending`).
- **TypographyHeader:** Distinct, rigid text styles.
- **AppletFrame:** The border and header logic for a window.

#### 2. Molecules (Functional Groups)
- **TimelineTrack:** Combines the vertical line and the logic for the `NodeMarkers`.
- **ProjectHeader:** Combines the title, period, and icon.
- **ActionGroup:** A set of CTA buttons.

#### 3. Organisms (Contextual Layouts)
- **ExperienceCard:** An `AppletWindow` containing a `ProjectHeader`, `MetaInfo`, and `ActionGroup`.
- **TimelineManager:** The complex component that manages the orchestration between the `TimelineTrack` and multiple `ExperienceCards`.

### Why this solves our Scroll Issue:
By defining the `ExperienceCard` as a component with a **known entry-height** and **known expanded-height**, we can pre-calculate the scroll offsets. We stop using `setTimeout` and start using **Declarative State Transitions**. 
