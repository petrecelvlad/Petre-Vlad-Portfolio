# "ME" Skin — The Desk Scene

**Superseded 2026-07-21 by DR-019.** The core creative idea captured below — phone stays, desk
perspective, responsibilities becomes a clipboard/notepad, header content lives on the paper — was
realized the same day, but under the `heritage` skin id and through Tier 3 (real DOM/CSS component
slots), not through this document's Tier 4 (a single baked illustration). See DR-019 in
`docs/Research/DECISIONS.md` for the concrete build. This document is kept as-is below: a historical
record of the concept, and the documentation of record for Tier 4 as a mechanism, which remains
real, unbuilt, and worth returning to if a future fully-illustrated attempt is ever made — the two
are not the same thing and Tier 4 isn't automatically obsolete just because Tier 3 reached the same
creative destination first.

---

Current section philosophy — captured 2026-07-21, concept stage, not yet designed or built. See `PILLARS.md` for the standing principles this traces back to, and `docs/Architecture/design-system/Skin_System.md`'s "Tier 4 — Illustrated Scene" for the technical mechanism this concept requires. See `docs/Research/DECISIONS.md` DR-018 for why this direction was picked up and what it trades away.

This is primarily Pillar 3 (a style that's demonstrably his, not a borrowed genre) attempted through a completely different mechanism than `heritage` used — a single illustrated scene instead of composited CSS chrome — after `heritage`'s CSS-token approach hit a real ceiling on both design quality and (unexpectedly) mechanism reliability in the same session. It also finally exercises Pillar 2's "one central metaphor" path, which DR-007 explicitly kept open and untested rather than committing to.

---

## The Core Idea: Your Desk, Top-Down

Instead of composing the project-card region from tokenized panels (`WindowCard`, badges, bordered banners — the same underlying shape language regardless of skin), the whole region becomes **one continuous illustrated scene**: a top-down view of a game designer's desk, as if the viewer is looking straight down at Vlad's actual workspace. The project's phone (already `BentoVideoFrame`'s concept — a device showing the game's video/screenshot) sits on the desk as one physical object among others. The real, dynamic content — video, text — is overlaid on top of the fixed illustration, positioned to look like it belongs to specific objects in the scene rather than floating in generic UI panels.

This trades the parametric system's core property (swap values, nothing else changes, infinitely cheap to compare) for something CSS composition structurally cannot reach: real illustrated depth, texture, and a genuinely cohesive scene rather than a set of independently-styled panels that merely share a palette. That trade is named explicitly in DR-018, not hidden.

### What's decided

- **Perspective:** top-down, looking straight down at a desk/table surface.
- **The phone stays a phone:** the existing device-frame concept (a phone showing the game) remains, positioned on the desk as one of the scene's objects — not redesigned into something else.
- **Responsibilities becomes a clipboard or notepad:** instead of a bordered panel with a title bar, the responsibilities content is written onto a clipboard/notepad object sitting on the desk, with the actual text overlaid onto its page(s).
- **Target viewport:** optimized for desktop/PC. No mobile/responsive strategy yet — explicitly out of scope for this pass.
- **Structural continuity with the existing layout:** the scene needs to preserve the same overall structure, sizes, and positions the current grid already establishes (video region, responsibilities region, skills region, achievement region) closely enough that the underlying content model doesn't need to change — only how it's *painted* changes.

### What's still open

- **How `header` maps onto the desk.** No object has been chosen yet. Candidate directions worth considering, not decided: a nameplate or business card sitting on the desk; something printed/etched on the desk surface itself; an object that's part of the phone's own screen rather than a separate desk item. Needs a real creative pass.
- **How `skills` maps onto the desk.** Same — undecided. Could be a scattered set of tool objects on the desk (each representing a skill — a stylus, dice, a controller, a pen), a drawer/toolbox illustrated open, or something else entirely. The existing "slot machine" sunken-icon motif doesn't obviously have a desk-object equivalent yet.
- **How `achievement` maps onto the desk.** Undecided. A trophy, an award plaque, a sticky note, a framed award on the desk's edge — not chosen.
- **Does the illustration draw its own phone, or leave the frame to code?** `BentoVideoFrame`'s device bezel is permanently locked per DR-013 — never skin-variable. If the desk illustration draws a phone shape itself, that duplicates or conflicts with the code-rendered bezel. Two ways this could resolve: the illustration leaves a blank/desk-colored region sized exactly for the real `BentoVideoFrame` component to sit in unchanged, or DR-013's lock gets revisited for this one skin specifically. Not decided — flagged in DR-018 as a real open question, not a detail to improvise later.
- **How overlay text stays legible against illustrated art.** A photo-real or painterly desk surface under body text risks the exact legibility problems flat UI panels don't have. Needs a real solution (a drawn paper/card region with a flat legible surface built into the art itself, a scrim, something else) — not assumed solved by "put text on top."
- **Production/iteration technique.** Which image model, how many attempts, how "final" a single generation needs to be before it's usable — none of this is decided. Given `ANTI_PATTERNS.md`'s "Cardboard-Cutout Ceiling" (DR-005) already found that hand-built techniques have hard quality ceilings for exactly this kind of scene, this needs a real illustration-generation asset, same lesson as `Hero.md`'s character-card concept already flagged for itself.
- **Layout/engineering mechanism.** `Skin_System.md`'s Tier 4 section sketches positioned-overlay-on-fixed-image as the mechanism but does not resolve how it plugs into `ProjectDetails.tsx`'s existing grid or the Tier 3 slot registry. First real engineering question for whoever builds the first attempt.

---

## Why this fits the pillars, specifically

- **Pillar 3 (his style):** potentially the strongest candidate yet — a scene of Vlad's own desk is about as far from "borrowed genre" as `heritage`'s extracted-from-his-own-games approach, but composed as an original scene rather than assembled from reference screenshots of existing products. Depends entirely on execution once an image exists.
- **Pillar 2 (gamification):** this is the "one central metaphor" reading DR-007 named and explicitly left untested against the alternative (a disciplined system of small consistent decisions, no big unifying object) — worth remembering both paths were kept open on purpose, and this is the first real attempt at the one that wasn't `heritage`'s.
- **Pillar 1 (site as proof):** carries real risk as well as upside — if the scene is well-composed, it's a strong, memorable first impression; if the illustration reads generic or the overlay text fights the art for legibility, it fails this pillar more visibly than a CSS misstep would, since there's no token to quietly fix afterward — the image itself would need to be redone.
- **Pillar 4 (codebase as proof):** genuinely in tension here, named directly rather than smoothed over — a positioned-overlay-on-image system is architecturally simpler in some ways (no Tier 1–3 token reasoning for whatever it covers) but introduces a new kind of complexity (coordinate/hotspot authoring against one fixed asset) that doesn't obviously demonstrate the same kind of engineering discipline the token system does. Not resolved here — worth returning to once a first attempt exists to evaluate against.

---

*"ME" Skin (Desk Scene) · Experience Engine · concept stage, 2026-07-21*
*Companion to `Skin_System.md`'s Tier 4 section (mechanism) and `DECISIONS.md` DR-018 (the decision to pursue this direction and what it knowingly trades away).*
