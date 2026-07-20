# Project Card Redesign Analysis & Component Breakdown

Based on the provided mockup, the monolith project card has been redesigned into a modular, bento-grid style layout. The shadow styling has also been updated globally to drop straight down (`0px` horizontal offset) for a more grounded, weighted aesthetic.

Here is the decomposition of the UI into Atoms, Molecules, and Organisms.

## Organism: Bento Grid Layout (`ProjectBentoCard`)
The top-level container for a single project.
- **Layout Structure:**
  - A CSS Grid container, likely 2 columns wide on desktop (e.g., `grid-cols-1 md:grid-cols-[1fr_2fr]` or a custom ratio).
  - **Left Column:** Contains the Header Elements (Icon, Title, Dates) and the `ResponsibilitiesCard`.
  - **Right Column:** Contains the `VideoPlayerCard` (Mobile/Landscape frame) and the `SkillsCard`.
  - **Bottom Row:** The `AchievementBar` spans full width (`col-span-full`).
- **Spacing:** Uniform gaps between the bento boxes (e.g., `gap-4`).

## Molecules

### 1. `HeaderInfoGroup`
A cluster of atoms describing the core identity of the project.
- **Contents:**
  - `AppIcon` on the far left.
  - A vertical stack containing:
    - Top row: `TitlePill` (full width or spanning).
    - Bottom row: `DatePill` (start) + `PlayArrow` + `DatePill` (end, active state colored red).

### 2. `ResponsibilitiesCard`
A panel displaying bulleted project responsibilities.
- **Container:**
  - Standard applet window styling: thick black border, straight drop shadow, rounded corners.
  - Distinctive colored header bar (purple) with "Responsibilities" title and three small window-control dots (red, yellow, green) on the right.
- **Body:**
  - White background.
  - A list of `ResponsibilityItem` atoms, separated by subtle subtle divider lines.

### 3. `SkillsCard`
A horizontal panel showing the skill loadout used on the project.
- **Container:**
  - Similar to the `ResponsibilitiesCard` but wider.
  - Purple header bar with title "Skills" and window-control dots.
- **Body:**
  - Light beige/paper background.
  - A flex container/grid displaying a row of `SkillSlot` atoms.

### 4. `VideoPlayerCard`
A stylized media container meant to resemble a mobile device in landscape mode.
- **Wrapper:**
  - Extra thick black border, heavily rounded corners to sell the "device" look.
  - A "notch" detail on the left inner edge (a black cutout protruding into the screen). No horizontal shadow, just the thick black shell.
- **Content:**
  - The game screenshot/video spanning edge-to-edge inside the frame.
  - An overlaid red "Watch on Youtube" button in the bottom center.

### 5. `AchievementBar`
A full-width, low-height information bar.
- **Container:**
  - Orange/butter background.
  - Thick black border, straight drop shadow.
- **Content:** 
  - Bold text prefix "ACHIEVEMENT:" followed by normal text.

## Atoms

### Text & Shape Primitives
- **`AppIcon`:** Small square image with rounded corners, 2px solid border, small straight bottom shadow.
- **`TextPill`:** Rounded rectangle container used for titles and dates. Has a thick black border and small straight bottom shadow. Background color varies (white for title, light green for start date, red for end date).
- **`PlayArrow`:** Simple SVG black triangle indicating a timeline flow between the date pills.
- **`WindowDots`:** The three small colored circles (red, yellow, green) grouped together, with 2px borders.
- **`DeviceNotch`:** A purely decorative black shape adhering to the edge of the mobile frame wrapper.

### Functional Primitives
- **`ResponsibilityItem`:** 
  - Composed of a solid purple square bullet point (approx 12x12px).
  - Text strictly clamped to **2 lines maximum** (`line-clamp-2`, ellipsis on overflow) to maintain a neat bento structure without unpredictable heights.
- **`SkillSlot`:** 
  - A square icon container (approx. same size as `AppIcon`) with thick black borders and small straight bottom shadow.
  - **States:**
    - **Filled:** Uses an "active" background color (e.g., vibrant purple), contains a centered SVG icon, and has centered label text directly underneath the container (mono/condensed font).
    - **Empty:** Uses a muted/base background color (e.g., dark grey or semi-transparent ink), no icon inside, and no label text underneath.
  - **Usage:** Up to 6 slots per `SkillsCard`; empty slots are rendered to maintain the visual grid structure.
- **`YouTubeButton`:** Red pill-shaped button with a white play icon and text. Has border and small drop shadow.

## Common Design Rules to Note
1. **Shadow Alignment:** All drop shadows are updated to `0px` X offset and roughly `2-6px` Y offset depending on the element size.
2. **Typography Constraints:** Crucial that the responsibilities are purely clamped. The layout falls apart if text flows indefinitely.
3. **Card Headers:** The new standard panel features a solid colored header bar separated from the body via a 2px horizontal border, with window controls aligned right.
