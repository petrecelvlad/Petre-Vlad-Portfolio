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
- `keyScreenshots`: Array of screenshots, at least one per project ([C-013](../GUARDRAILS.md)), named and stored per [Screenshot Files](#screenshot-files). In the JSON each is its path, or `{ "src": path, "caption": "Game Name" }` when the entry covers several games: the phone frame's slideshow shows the caption under that screenshot. An optional `"links"` (same shape as the project's `links.pages`) holds that game's own pages: the clipboard shows them as tags, alongside the project's own, only while that screenshot shows.

## Screenshot Files
Every screenshot follows one naming standard (set by the user, 2026-10-22):
- **Path:** `public/assets/screenshots/<Token>/SS_<Token>_<N>.<ext>`, e.g. `Castellum/SS_Castellum_1.jpg`.
- **Token:** one per project, kept for good, PascalCase with no spaces (`MergeMansion`, `LuckySlots`). Abbreviations are allowed when the title is long (`COT`, `FEHV`, `ROTMG`, `BWS`, `MF2`). The folder and the file names use the same token. *Why no spaces:* the phone frame's loading cover puts the path in a CSS `url()`, which a space breaks.
- **Number:** starts at 1 and is always present, even for a single screenshot, so adding a second never renames the first.
- **Order:** the number is the presentation order. `keyScreenshots` lists the files in numeric order, so `_1` is always the frame's image. Reordering means renaming the files and updating the list to match.
- **Collection entries** (one entry covering many games, e.g. Amber, Upit): the folder is the entry's token and the file token is the game's, e.g. `Amber/SS_PetRescue_4.jpg`. The number runs across the whole entry, not per game, since it is the entry's presentation order. The file name only keeps files apart; the game's name on the site is the screenshot's `caption` in the data.
- **Formats:** `.webp` (preferred: smallest at the same quality), `.jpg` or `.png`. A `.jfif` is a JPEG and is renamed to `.jpg`. Never `.heic` or `.tiff`: browsers can't show them.

## Visual Layout: The Bento Grid
We do not render projects as a standard top-to-bottom list. We use a **Bento Grid Layout** to compartmentalize information spatially into four content **slots** — `header`, `responsibilities`, `skills`, `achievement` — plus the locked `BentoVideoFrame` media region. Each slot's actual chrome is not fixed at the template level; it's resolved per active skin through `SkinRegistry` (`src/components/bento/SkinRegistry.ts`), against the port contracts in `src/components/bento/ports.ts`. See `Skin_System.md` for the full Tier 3 mechanism.

`ProjectDetails` (Organism) assembles the slots for the current project:
1. **`header` slot**: Displays the App/Game `icon`, the `title`, and the `startDate` → `endDate` range.
2. **`BentoVideoFrame.tsx`**: Shows the promo video when there is one, covered while it loads by its full-size YouTube thumbnail, or by the first screenshot when YouTube has none; without a video, shows the first screenshot ([C-013](../GUARDRAILS.md)). Not a slot — its device-shell chrome is locked identical across every skin (`Skin_System.md`'s Locked Constraints).
3. **`responsibilities` slot**: Lists what the user actually did.
4. **`achievement` slot**: Highlights a key metric (e.g., "100K App Installs"). Currently a skin-neutral shared component (`src/components/bento/shared/BentoAchievement.tsx`) used by every skin — no skin has a bespoke achievement treatment yet.
5. **`skills` slot**: Small pills/tags detailing the technologies used.

### Rules for the Bento Grid:
- **Responsive Geometry:** On desktop (`md:` and above), elements lock into an intricate grid layout (e.g., 2 columns, varying row heights). On mobile (`sm`), everything must gracefully collapse into a single-column stack.
- **Token-driven chrome, not literal classes:** a slot's border/shadow/radius must come from the active skin's resolved tokens (`Token_Contract.md`), never a hardcoded utility class — this is what lets a skin swap the entire visual treatment without touching a slot's port contract.
- **Typography Hierarchy:** The header is the loudest text. Responsibilities and achievements should be legible and use standard sans font. Technologies/Skills should use `font-mono tracking-widest` to differentiate technical tags from standard text.
