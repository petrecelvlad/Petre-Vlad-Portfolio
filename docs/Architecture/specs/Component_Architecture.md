# Component Architecture

If the **Design System** tells us *how* things look, the **Component Architecture** tells us *where* they belong. We adhere to a tiered Atomic approach with strict unidirectional data flow.

## 1. Atoms & Primitives (`/src/components/applet/`)
These are layout-agnostic building blocks. They do not know about the timeline, about "Projects", or about "Experiences."
- Example: `Window`, `TitleBar`, `Button`, `Tag`, `Typography` wrappers.
- **Rule:** If an atom uses domain knowledge (e.g. `import { IProject }`), it is not an Atom. Move it to a higher tier.

## 2. Molecules / UI Slices (`/src/components/bento/`)
These combine Atoms to fulfill a specific piece of UI, often bound to Domain Data but not to application layout state.
- Example: `BentoHeader`, `BentoSkills`.
- **Rule:** They take isolated pieces of data via Props (`title`, `icon`, `skillsList`) rather than taking a massive unmanaged context object.

## 3. Organisms (`/src/components/timeline/`)
These form large chunks of the screen and manage meaningful internal state or coordinate multiple molecules.
- Example: `ProjectDetails` (renders multiple bentos), `TimelineMarker`.

## 4. The Managed Stage / Scenes (`/src/components/layout/`)
This application operates on a "Scene" layout paradigm (e.g., `Scene.tsx`).
- **Global Chrome:** The fixed navigation/HUD UI that surrounds the screen (`Hero`, `Navbar` via the old `adapters/primary` directory).
- **The Stage:** The canvas that scrolls or animates left-and-right/up-and-down. 
- **The Presenter:** A central hook (e.g. `useTimelineOrchestrator`) maintains the current "Active Index" (which project we are looking at) and broadcasts this state. 

*Do NOT let `TimelineTrack` and `Navbar` maintain their own disconnected local states of what project is currently active.*
