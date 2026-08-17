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
We do not render projects as a standard top-to-bottom list. We use a **Bento Grid Layout** to compartmentalize information spatially into four content **slots** — `header`, `responsibilities`, `skills`, `achievement` — plus the locked `BentoVideoFrame` media region. Each slot's actual chrome is not fixed at the template level; it's resolved per active skin through `SkinRegistry` (`src/components/bento/SkinRegistry.ts`), against the port contracts in `src/components/bento/ports.ts`. See `Skin_System.md` for the full Tier 3 mechanism.

`ProjectDetails` (Organism) assembles the slots for the current project:
1. **`header` slot**: Displays the App/Game `icon`, the `title`, and the `startDate` → `endDate` range.
2. **`BentoVideoFrame.tsx`**: Showcases `keyScreenshots`/promo video. Not a slot — its device-shell chrome is locked identical across every skin (`Skin_System.md`'s Locked Constraints).
3. **`responsibilities` slot**: Lists what the user actually did.
4. **`achievement` slot**: Highlights a key metric (e.g., "100K App Installs"). Currently a skin-neutral shared component (`src/components/bento/shared/BentoAchievement.tsx`) used by every skin — no skin has a bespoke achievement treatment yet.
5. **`skills` slot**: Small pills/tags detailing the technologies used.

### Rules for the Bento Grid:
- **Responsive Geometry:** On desktop (`md:` and above), elements lock into an intricate grid layout (e.g., 2 columns, varying row heights). On mobile (`sm`), everything must gracefully collapse into a single-column stack.
- **Token-driven chrome, not literal classes:** a slot's border/shadow/radius must come from the active skin's resolved tokens (`Token_Contract.md`), never a hardcoded utility class — this is what lets a skin swap the entire visual treatment without touching a slot's port contract.
- **Typography Hierarchy:** The header is the loudest text. Responsibilities and achievements should be legible and use standard sans font. Technologies/Skills should use `font-mono tracking-widest` to differentiate technical tags from standard text.
