# The Project Template (Bento Layout)

The **Project** view is the most critical and dense data template in this application. It visualizes data from an `IProject` entity inside an `IExperience` list.

## Data Model Foundation (`IProject`)
Every project follows this structure (see `src/core/domain/models.ts`):
- `id`: string
- `title`: string
- `role`: string
- `startDate`: string — format: `"Q1 2023"` (quarter + year). Use year-only (`"2016"`) only when the quarter is unknown from source material.
- `endDate`: string — same format as `startDate`, or `"Present"` if the role is current.
- `type`: "GAME" | "SOFTWARE"
- `icon`: Image URL
- `responsibilities`: Array of strings
- `achievements`: Array of strings
- `technologies`: Array of strings
- `keyScreenshots`: Array of image URLs 

## Visual Layout: The Bento Grid
We do not render projects as a standard top-to-bottom list. We use a **Bento Grid Layout** to compartmentalize information spatially into "Applet Windows".

The `ProjectDetails` (Organism) assembles these core UI elements:
1. **`BentoHeader.tsx`**: Displays the App/Game `icon`, the `title` pill, and the `startDate` → `endDate` timeline slots (slot-machine style, separated by a Play icon).
2. **`BentoVideoFrame.tsx` / `BentoImageFrame.tsx`**: Responsible for showcasing `keyScreenshots` or promo materials in a stylized media container.
3. **`BentoResponsibilities.tsx`**: A scrollable or structured sub-window listing bullet points of what the user actually did.
4. **`BentoAchievements.tsx`**: Highlights key metrics (e.g., "100K App Installs").
5. **`BentoSkills.tsx`**: Small pills/tags detailing the technologies used.

### Rules for the Bento Grid:
- **Responsive Geometry:** On desktop (`md:` and above), elements lock into an intricate grid layout (e.g., 2 columns, varying row heights). On mobile (`sm`), everything must gracefully collapse into a single-column stack.
- **Window Borders:** EVERY bento card MUST have the thick Applet borders and shadows defined in the Design System (`border-2 border-ink shadow-applet-sm rounded-[12px]`).
- **Typography Hierarchy:** The Bento Header is the loudest text. Responsibilities and achievements should be legible and use standard sans font. Technologies/Skills should use `font-mono tracking-widest` to differentiate technical tags from standard text.
