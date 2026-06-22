# Portfolio Roadmap
### Vertical Slice to MVP → Polish Layers

**The constraint:** Recruiters are asking now. Ship the MVP as fast as possible. Everything below the MVP cut line is polish that improves the experience but does not block launch.

---

## Current State Snapshot

| Section | Status | Notes |
|---|---|---|
| Navbar | ✅ Done | Token-clean, looks good |
| Hero | 🟡 Scaffold only | WindowCard + stats exist, needs full design |
| Skill Tree | 🟡 Scaffold only | Static badges only, no interactivity |
| Projects (shell) | ✅ Done | Snap + timeline + bento grid all working |
| Projects (content) | 🔴 Placeholder | Real entries in JSON but picsum screenshots, no real copy |
| Contact | 🔴 Missing | Does not exist |
| Footer | 🔴 Broken | Uses `bg-foreground`, `fill-primary-*` — undefined tokens, visually broken |
| Animations | 🔴 Missing | No scroll-triggered animations anywhere |

---

## MVP Cut Line

**Everything above = ship it. Everything below = add it later.**

```
┌─────────────────────────────────────┐
│  PHASE 0 — Fix what's broken        │  ← do first, unblocks seeing real app
│  PHASE 0.5 — Gather project assets  │  ← manual work: icons + screenshots
│  PHASE 1 — Hero section             │  ← first impression
│  PHASE 2 — Projects content         │  ← the actual portfolio
│  PHASE 3 — Contact + Footer         │  ← rounds out the experience
├─────────────────────────────────────┤  ◄ SHIP HERE
│  PHASE 4 — Skill Tree polish        │
│  PHASE 5 — Animation layer          │
└─────────────────────────────────────┘
```

---

## Phase 0 — Fix What's Broken ✅
*Effort: ~1h. Must do before anything else so we can see the real app.*

- [x] **Fix Footer** — replaced `bg-foreground` → `bg-surface-inverse`, `fill-primary-*` → `fill-coral/periwinkle/butter`, `text-white` → `text-surface-base`. Copyright year now dynamic. Done.

---

## Phase 0.5 — Gather Project Assets
*Effort: manual (your time, not code). Blocks Phase 2 — nothing can be done about placeholders until the real files exist.*

Every project card requires exactly **one icon** and **one screenshot**. These go in `/public/assets/` and are referenced in `portfolio.json`.

**Asset spec:**
- **Icon** — square app icon, ideally PNG with transparency, minimum 200×200px. Referenced as `/assets/Icon_ProjectName.png`.
- **Screenshot** — the main promo image shown in the `BentoVideoFrame`, landscape 16:9 ratio preferred, minimum 1280×720px. Referenced as `/assets/Screenshot_ProjectName.png` (or `Game_ProjectName.png` for games).

**Asset status per project:**

| Project | Icon | Screenshot | Source hint |
|---|---|---|---|
| Formula E High Voltage | ✅ `/assets/Icon_FEHV.png` | ✅ `/assets/Game_FEHV.png` | Already in repo |
| Lead Level Designer (King) | 🔴 Needed | 🔴 Needed | King/Candy Crush branding or a level screenshot |
| R-QUEST App | 🔴 Needed | 🔴 Needed | App icon + key app screen from the project |
| Idle TD | 🔴 Needed | 🔴 Needed | App icon + gameplay screenshot |
| Newton Slots | 🔴 Needed | 🔴 Needed | Slots game icon + promo screen |
| [Future projects from CV] | 🔴 Needed | 🔴 Needed | One each, per project added |

**Tasks:**
- [ ] Locate and export icon for each project (app store, company Figma, existing files)
- [ ] Locate and export screenshot for each project (promo material, gameplay capture, app screenshot)
- [ ] Drop all files into `/public/assets/` using the naming convention above
- [ ] Update `portfolio.json` to replace picsum URLs with the real asset paths

---

## Phase 1 — Hero Section ✅
*Depends on: Phase 0 done.*
*Effort: medium. First thing every recruiter sees — must be strong.*

**Current state:** Scaffold exists (`Hero.tsx`) — a WindowCard with a title/bio line, a CTA button, and a 4-stat grid (`yearsOfExperience`, `22 projects`, `31 games`, `8 teams`). The bones are there but the design is not interesting.

**Design decision needed:**
The Hero needs a clear layout direction before building. Options to consider:

- **Bento Hero** — 2-3 large WindowCards in a grid: identity card (name, title, tagline), stats card, and a portrait/avatar card. Stays consistent with the bento visual language.
- **Asymmetric Split** — left column has identity + CTA, right column has a large decorative element (abstract bauhaus shapes, avatar, or motion graphic).

**Content needed:**
- [ ] Name, title, tagline (final wording)
- [ ] Bio sentence (already exists: "Making APPS that make you HAPPY!" — confirm or replace)
- [ ] Stats (already exist in Hero.tsx — confirm the 4 values are accurate)
- [ ] Avatar / portrait (decide: photo or illustrated avatar)
- [ ] CTA button destination (scroll to Projects? Download CV? Email link?)

**Tasks:**
- [ ] Decide layout direction (Bento Hero or Asymmetric Split)
- [ ] Design and build the chosen layout
- [ ] Wire CTA button to correct action

---

## Phase 2 — Projects Content (Most Critical for MVP)
*Effort: medium. Depends on: Phase 0.5 assets gathered.*

**Current state:** The project shell is complete and working. `portfolio.json` has 5 real entries with real responsibilities and achievements. What's missing: real screenshots and icons (handled in Phase 0.5), additional projects from CV, and richer copy.

### Data Format (locked — do not change the shape)

`IProject` in `src/core/domain/models.ts` is the contract. The JSON shape is:
```json
{
  "id": "proj-unique-id",
  "title": "Project Name",
  "role": "Your Role Title",
  "period": "Q1 2023 - Q2 2023",
  "icon": "/assets/Icon_ProjectName.png",
  "type": "GAME | SOFTWARE",
  "responsibilities": ["string", "string"],
  "achievements": ["string"],
  "technologies": ["string"],
  "keyScreenshots": ["/assets/Screenshot_ProjectName.png"],
  "links": { "youtube": "url", "website": "url" }
}
```

**Storage:** Keep everything in `portfolio.json` in this codebase. Assets go in `/public/assets/`. This is the right call for a portfolio — no backend needed, fast to build, easy to update.

### Projects to Include (MVP list)

Populate from your CV. Start with the highest-signal projects:

| # | Project | Data Status |
|---|---|---|
| 1 | Formula E High Voltage | ✅ Text real, icon real, screenshot real |
| 2 | Lead Level Designer (King) | 🟡 Text real, icon placeholder, screenshot placeholder |
| 3 | R-QUEST App | 🟡 Text real, icon placeholder, screenshot placeholder |
| 4 | Idle TD | 🟡 Text real, icon placeholder, screenshot placeholder |
| 5 | Newton Slots | 🟡 Text real, icon placeholder, screenshot placeholder |
| 6+ | Other CV projects | 🔴 Not yet added |

**Tasks:**
- [ ] Define final list of projects to include (5 minimum for a good MVP — current 5 are a good start)
- [ ] Extract additional projects from CV — use the data format above as the prompt to an agent
- [ ] Write richer `responsibilities` copy for each entry (current copy is good but brief)
- [ ] Add real `links` (youtube trailers, website URLs, app store links) where they exist

### CV Extraction Protocol
When ready, provide the CV text and run an agent with this instruction:
> "Extract all projects from this CV. For each project, produce a JSON object matching this exact format: [paste IProject schema]. Use the exact field names. Do not invent data — only use what is in the CV. For missing fields, use empty string or empty array."

---

## Phase 3 — Contact + Footer (MVP Completion)
*Effort: small-medium. Rounds out the experience before ship.*

### Contact Section
A full-width snap section immediately after the last project card, before the footer.

**Content needed:**
- [ ] Preferred contact email
- [ ] LinkedIn URL
- [ ] GitHub URL (if public)
- [ ] Any other links (personal site, Behance, etc.)

**Design direction:** One centered WindowCard with "Get in touch" heading, a brief CTA sentence, then icon-button links for each channel. Bauhaus style — bold, direct, no forms (keep it simple for MVP).

**Tasks:**
- [ ] Decide what contact links to include
- [ ] Build the Contact section as a snap section in `App.tsx`

### Footer
**Current state:** Visually broken (`bg-foreground` etc. undefined). The content design is there (Bauhaus shapes, name, tagline, copyright) — just needs the token references fixed.

**Tasks:**
- [ ] Fix all undefined token references in the footer block in `App.tsx`
- [ ] Confirm footer copy (tagline, copyright year)

---

## Phase 4 — Skill Tree (Post-MVP Polish)
*Effort: medium-large. Current scaffold works well enough for MVP.*

**Current state:** Static WindowCards with 3 categories (Design / Leadership / Macro) listing skills as `Badge` chips. Functional, readable, not interesting.

**MVP decision:** The current scaffold is acceptable for launch. Ship it. Upgrade in Phase 4.

**For Phase 4:**
- [ ] Design decision: what does hover/click on a skill show? Options:
  - **Tooltip popup** — on hover, show a short description + relevant projects where this skill was used
  - **Detail panel** — click opens a bottom sheet or right panel with skill details, years of experience, example projects
  - **Inline expand** — badge expands in place to show a short description
- [ ] Decide skill data format (add to JSON or hard-code in component since skills are few)
- [ ] Richer skill list — current has 15 skills across 3 categories. Expand?
- [ ] Build the chosen interaction

---

## Phase 5 — Animation Layer (Last)
*Effort: medium. Adds delight but changes nothing about content or structure.*

**Philosophy:** Each section animates in when the user scrolls to it. The Projects section already has a `motion.div` with opacity/y transition — use that as the template.

**Stagger decisions needed:**
- [ ] Hero — how does it enter? Bento cards stagger in from below? Title fades in first, then stats card?
- [ ] Skill Tree — category WindowCards stagger in left-to-right?
- [ ] Contact — simple fade-up?
- [ ] Footer — simple fade-in?

**Implementation approach:** Use `motion/react` (already installed). Intersection Observer is already wired through `useTimelineOrchestrator`. Apply `whileInView` variants per section. Coordinate with the existing `useTimelineOrchestrator` SSOT to avoid duplicate scroll state.

**Tasks:**
- [ ] Define animation vocabulary (entry duration, stagger delay, easing — use `--transition-defaults` token)
- [ ] Apply to Hero
- [ ] Apply to Skill Tree
- [ ] Apply to Contact
- [ ] Apply to Footer
- [ ] QA: ensure `prefers-reduced-motion` disables all transitions (global rule already in `index.css`)

---

## Phase 6 — Dual Identity: Engineer Mode
*This is a separate product iteration, not part of the MVP. Do not start until the Game Designer portfolio is shipped and stable.*

---

### The Concept

A single toggle in the Navbar switches the entire portfolio between two identities:

- **Game Designer mode** — current Bauhaus Skin, game design projects, warm paper aesthetic
- **Full-stack Engineer mode** — new dark/terminal Skin, AI/vibe-coded software projects, completely different feel

The toggle behaves like a dark/light mode switch but changes far more than colors: it swaps the Skin (all visual tokens) and the active content dataset simultaneously. The components, layouts, scroll behavior, and architecture are untouched — they are mode-agnostic. This is exactly what the Token Contract + Skin architecture was built to enable.

---

### Why the Architecture Already Supports This

The parametric design system built in this iteration makes Phase 6 achievable without structural changes:

1. **Skin swap** — a CSS class on `<html>` (e.g. `mode-engineer`) overrides all `@theme` token values. Components reference tokens, not literal values, so they rerender correctly with zero code changes.
2. **Content swap** — a second dataset (`portfolio-engineer.json`) feeds the same `IProject` schema the current bento grid already consumes. The `ProjectDetails` component doesn't know or care which dataset it renders.
3. **Same structure** — Hero, Skill Tree, Projects, Contact, Footer all remain. Section layouts don't change. Only what's inside them changes.

---

### What Needs to Be Built

**New Skin: Engineer**
- [ ] Design the token values for the Engineer Skin — dark background, terminal/code aesthetic, monochrome base with one vivid accent (likely electric green or cyan)
- [ ] Write `docs/Architecture/Skin_Engineer.md` following the same format as `Skin_Bauhaus.md`
- [ ] Implement the skin as a CSS class override block in `index.css`:
  ```css
  html.mode-engineer {
    --color-surface-base: #0D0D0D;
    --color-ink-base: #F0F0F0;
    /* ... all token overrides ... */
  }
  ```

**New Content Dataset**
- [ ] Define the Engineer project list — AI tools, vibe-coded apps, software projects
- [ ] Create `src/infrastructure/data/portfolio-engineer.json` using the identical `IProject` schema
- [ ] Gather icons + screenshots for each engineer project (same spec as game projects)
- [ ] Write Engineer-specific skill categories for the Skill Tree section

**Mode System**
- [ ] Create a `PortfolioModeContext` — a React context holding `mode: 'designer' | 'engineer'` and a `toggleMode` function
- [ ] Wrap `App.tsx` in the context provider; on toggle, flip the class on `<html>` and switch the active dataset
- [ ] Build the `ModeToggle` component in the Navbar — the visual design matters here. This is a signature interaction, not a utility button. Consider: a flip-card toggle, a switch that physically slides, or a bold labeled button ("DESIGNER ↔ ENGINEER")
- [ ] The toggle should persist to `localStorage` so the user's last mode survives a refresh
- [ ] Animate the mode transition — a brief full-screen flash or crossfade signals that something significant changed, not just a color tweak

**Engineer-Specific Content Adaptations**
- [ ] Hero section — Engineer mode shows a different tagline and identity framing
- [ ] Skill Tree — Engineer mode shows software/AI skills instead of game design skills
- [ ] Footer tagline — Engineer mode shows a different motto
- [ ] The APP/HAPPY emphasis might not apply in Engineer mode — decide or make it mode-aware

---

### Design Decisions Needed Before Building

- [ ] What is the Engineer Skin aesthetic? (suggestion: dark terminal, electric accent, heavy monospace presence — the inverse of Bauhaus warm paper)
- [ ] What is the Engineer tagline / motto?
- [ ] Does the Engineer mode have its own "logo shapes" in the Navbar, or do the Bauhaus shapes persist?
- [ ] What is the toggle animation? (full-screen transition vs. instant vs. subtle crossfade)
- [ ] Should the URL reflect the mode? (`/?mode=engineer`) — useful for sharing a direct link to one identity

---

## Summary: Path to MVP

| Step | Phase | What | Effort | Who |
|---|---|---|---|---|
| 1 | 0 | Fix Footer broken tokens | ~1h | Agent |
| 2 | 0.5 | Gather icons + screenshots for all projects | manual | You |
| 3 | 1 | Design + build Hero section | 2-4h | Agent + you (design decision) |
| 4 | 2 | Drop assets into `/public/assets/`, update JSON | ~30min | You |
| 5 | 2 | Extract remaining projects from CV via agent | ~1h | Agent |
| 6 | 2 | Review + enrich project copy | ~1h | You |
| 7 | 3 | Build Contact section | ~1h | Agent |
| 8 | 3 | Fix Footer copy + confirm final wording | ~30min | You + Agent |
| **MVP SHIP** | | | | |
| 9 | 4 | Skill Tree interactivity design + build | 3-4h | Agent + you |
| 10 | 5 | Animation layer | 2-3h | Agent |

**The blocker you own:** Step 2 (gathering assets) is the only thing that cannot be delegated. Everything else is agent work once you give the inputs. That step is also what gates all the visible content — once you drop the files in, the projects section goes from "placeholders" to "real portfolio" in one JSON edit.

---

### Post-MVP: Phase 6 (Engineer Mode)

| Step | What | Effort | Who |
|---|---|---|---|
| 11 | Design Engineer Skin token values | design work | You + Agent |
| 12 | Implement `html.mode-engineer` CSS overrides | ~1h | Agent |
| 13 | Create `portfolio-engineer.json` with software projects | ~2h | You + Agent |
| 14 | Build `PortfolioModeContext` + mode switching logic | ~1h | Agent |
| 15 | Build `ModeToggle` component in Navbar | ~2h | Agent + you (design decision) |
| 16 | Engineer-specific content (Hero, Skill Tree, tagline) | ~2h | You + Agent |
| 17 | Mode transition animation | ~1h | Agent |

*Total Phase 6 estimate: ~10h of work after the MVP ships. The architecture is already ready for it.*

---

*Roadmap v1 · Experience Engine · 2026-06-17*
*Update this file when phases complete or priorities shift*
