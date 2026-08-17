# Agent Prompt: SkillTree Layout & Experience Ideation (Cozy RPG Aesthetic)

> **Copy and paste the prompt below into another AI agent prompt window to task them with ideating and building novel structural layouts, interactive flows, and visual concepts for the SkillTree section.**

---

```markdown
You are a master Game UI Architect, Interactive Experience Designer, and Frontend Engineer specializing in **Cozy RPG, Adventurer's Guild, and Storybook Game Interfaces** (inspired by games like *Paper Mario*, *The Legend of Zelda: Wind Waker*, *Stardew Valley*, *Brawl Stars*, and *Fantasy Life*).

### Primary Objective: SkillTree Experience Ideation & Experimentation
Your mission is to invent and build a brand-new, highly creative, interactive **SkillTree View Component** for a game developer/designer portfolio. 

You are given complete artistic and structural freedom! Do not replicate standard boring web dashboards. Instead, re-imagine how a skill tree can feel like an immersive, tactile game feature—full of charm, physical warmth, satisfying micro-interactions, and clever spatial layout ideas.

---

### Core Structural Requirements (Functional Constraints Only)

Your SkillTree section MUST accommodate the following 3 functional regions, but HOW you arrange, frame, or connect them physically is entirely up to your creative vision:

1. **The SkillTree Graph Canvas (Primary Focus Area)**:
   - A spacious interactive region displaying a multi-category node graph of skills (e.g. Design, Production, Leadership, Vision).
   - **Horizontal Expansion & Node Layout**: The tree should expand horizontally from left to right across levels/depths to maximize horizontal canvas space.
   - **Single-Line Horizontal Node Pills**: Skill names CANNOT wrap onto two lines—they MUST always be written on a single line of text (`whitespace-nowrap`). Node pills must be horizontally wide and extend as long as the text is, while staying compact vertically (thin height of a single line of text). This minimizes vertical footprint so sibling skill nodes can stack efficiently on top of each other.
   - Nodes should be interactive, connected by crisp branch lines (with generous horizontal spacing so connecting lines are clearly visible), and feature chunky bold icon/label representations.
   - Selecting any node highlights it and updates the detail inspection region.

2. **Permanent Skill Detail Inspector Panel**:
   - A dedicated, permanently anchored or seamlessly integrated panel (e.g., styled as an adventurer's parchment scroll, carved wooden deskboard, spellbook page, or guild inspection plaque).
   - Displays the selected skill's name, category, proficiency level/rank stars, and full written description.
   - Includes an inviting empty state when no skill is selected (e.g., "Select a node on the tree to inspect...").

3. **Featured Project Snapshots (Up to 3 Photos/Icons)**:
   - Attached to or integrated alongside the detail inspection panel, a dedicated zone displaying up to 3 physical project snapshot cards (e.g., polaroids with scotch tape, wax-sealed quest badges, pinned project cards, or hanging wooden photo tiles).
   - Represents real projects where the active skill was applied.

---

### Aesthetic & Visual Style Directives: Cozy RPG Workshop

- **Chunky 3D Depth & Tactile Hardware**:
  - Planks, frames, and cards should feature dual-tone light/dark inset bevels, thick dark outlines (`#1C1610` or `#2C1A0E`), and 3D extruded edges.
  - Hardware elements: Brass rivets, swallowtail crimson ribbons, semi-translucent scotch tape, wax seals, or spring clips.
- **Bold Casual Icons**: Single-color or bold-contour black icons for skill nodes (e.g., gears, gamepads, crowns, beakers, trophies).
- **Satisfying Motion**: Use bouncy spring physics (`motion/react`) for node clicks, detail panel transitions, and photo hover tilts.
- **No Boring Corporate Office Vibes**: Bright, warm, honey oak, gold, crimson, and parchment tones instead of dull grey modern web cards.

---

### Challenge: Explore Unique Spatial & Layout Concepts!

Here are some layout & mechanics ideas to spark your creativity—pick one or invent your own!

- 💡 **Option A: The Guild Master's Desk (Asymmetric Horizontal Split)**
  - Left/Center: A wide wooden corkboard framed with brass corner rivets holding the branching skill tree.
  - Right: A compact, vertical parchment deskboard anchored from the top, with 3 polaroid project photos clipped to the lower edge.

- 💡 **Option B: The Alchemist's Folding Screen (Interactive Accordion / Dual Plank)**
  - Left: Multi-pane wooden screen unfolding the skill branches.
  - Right: A sunken felt socket containing a parchment scroll inspector that swivels or slides into view when a skill node is clicked.

- 💡 **Option C: The Quest Map & Trophy Rack (Stacked Vertical Flow)**
  - Top: Overhead quest map holding the skill graph.
  - Bottom: Suspended wooden rack hanging 3 instant photo project tiles directly beneath a brass-mounted skill description plaque.

---

### Technical Specifications
1. **Tech Stack**: React + Tailwind CSS + Lucide Icons + `motion/react` for animations.
2. **100% Code-Driven (Zero External Raster Images)**: All boards, frames, tape strips, rivets, ribbons, and icons MUST be constructed using pure CSS/Tailwind utility classes, custom box-shadows, and SVG paths.
3. **Mock Data Included**: Include a rich set of skill nodes across 4 categories (Design, Production, Leadership, Vision) and sample project snapshot data so the tree is fully interactive out-of-the-box.
```
