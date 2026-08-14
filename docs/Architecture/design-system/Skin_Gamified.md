# Skin: Gamified — Aesthetic & Heuristic Specification

---

## 0. Status Note (read this first)

This is the first consolidated doc for Gamified — it did not exist before 2026-08-11. Gamified is `SkinContext.tsx`'s actual runtime default (`useState<SkinId>('gamified')`, `<html data-skin="gamified">`), and the skin this whole codebase is converging toward per the project's own direction (Heritage stays a second live option while experimentation continues; Bauhaus/Applet has been retired — see `Skin_System.md`'s Sequencing Plan, step 8). This document consolidates heuristics that already existed scattered across `docs/Design/` and `docs/Architecture/specs/` — it does not invent new rules. Those source docs stay in place as supporting reference (the same relationship `Style_Extraction.md` has to `Skin_Heritage.md`); this doc is the canonical entry point.

**The most important thing to know before touching Gamified code:** unlike Heritage, Gamified's actual components do not currently run on the Token Contract. `GamifiedBoard.tsx`, `GamifiedParchmentPanel.tsx`, `GamifiedBannerPlaque.tsx`, and the `widgets/` tree hardcode their own hex values and CSS gradients directly in JSX rather than consuming `--color-*`/`--shadow-*` tokens. Gamified's entry in `src/index.css`'s `[data-skin]` system currently only carries the same Tier 1/2 resolution Heritage does (inherited from before Bauhaus's retirement — see `Skin_System.md`), which these components barely touch. This is a real, honest gap, not a hidden one: **making Gamified's own components token-driven is unstarted work**, separate from and larger than this documentation pass.

---

## 1. Executive Summary & Core Identity

**Gamified** is a tactile RPG/retro-arcade visual language — game props rendered as physical objects (wooden frames, cork boards, parchment scrolls, wax seals, blued-steel rivets, gold rank badges) combined with a separate, technically distinct layer of animated WebGL shader "achievement cards" in the Hero banner (retro 8/16-bit game vignettes: a level-up gauge, a floating 3D cartridge, an assembly-line factory, an island overworld map).

It shares a material vocabulary with Heritage (both are "physical object" skins, both use brass/wood/parchment) but diverges from it deliberately: Heritage is restrained, flat, desk-bound, and explicitly gradient-free (see `Skin_Heritage.md` §2B). Gamified is louder — richer gradients, glossier specular highlights, wax seals, banner ribbons, RPG rank/XP framing — closer to an adventure-quest board than a clipboard. The two are meant to read as siblings, not identical twins.

---

## 2. Two Execution Layers (not the same code, same spirit)

Gamified is built from two separate implementations that share heuristics but not mechanisms:

### A. DOM/CSS tactile chrome (project cards, skill tree)
`src/components/bento/skins/gamified/` — `GamifiedBoard.tsx` (the bento card's wooden-frame + cork-board container, used as the skin's `BoardContainer`), `GamifiedParchmentPanel.tsx` (skill-tree detail panel — hanging wooden bar + parchment scroll + wax seal), `GamifiedBannerPlaque.tsx`, `GamifiedSVGAssets.tsx` (`SteelCornerBrackets`, etc.), and the `widgets/` tree (`CorkboardNote`, `ToggleSwitch`, `SlideGauge`, `EmergencyButton`, `PolaroidWaxSeal`, `WorkbenchMasterView` and friends, assembled via `factory/BentoWidgetFactory.ts`). Built from the macro heuristics in `docs/Design/Tactile_Style.md`.

### B. WebGL shader micro-vignettes (Hero banner achievement cards)
Four self-contained animated shader cards in `AchievementShaderCanvas.tsx` (Years of Experience → 16-bit level-up gauge, Games Produced → raymarched 3D golden cartridge, Levels Crafted → 2D assembly-line factory, Teams Lead → 2.5D island-overworld map), each a 4–7 second looping build-up/impact/reward/cooldown cycle rendered in pure GLSL (SDF primitives, quantized 16-color banding, contour outlining). Full spec in `docs/Design/Hero_Animated_Cards_Style_Guide.md`; the island-overworld card's own sub-style in `docs/Design/Island_Overworld_Style.md`; the vector-arcade contour/extrusion treatment shared across cards in `docs/Design/Ketchapp_Casual_Style.md`. The Hero's 3-column layout ratio (30/40/30, center/center/right-anchored) that houses these cards is locked per `docs/Architecture/specs/Hero_Layout_Refactor_Spec.md`.

Both layers were designed independently and are not required to converge into one rendering mechanism — but they are required to read as the same voice. The heuristics below are the ones that hold across both.

---

## 3. Fundamental Design Heuristics (cross-layer)

### A. Physical Object, Not Flat UI
Every container is a stacked physical object, not a card with a border-radius. Wooden frames extend beyond and anchor the content they hold (a parchment scroll tucks *under* its wooden hanging bar, not just inside a border); metal brackets clasp corners; hardware (rivets, wax seals, screws) is explicitly visible, not implied.

### B. Gradients Are Allowed and Expected (unlike Heritage)
Multi-stop directional gradients (top-left light source → bottom-right ambient shadow) are the primary way Gamified renders material — wood, brass, steel, parchment. This is a deliberate point of divergence from Heritage's no-gradient rule (`Skin_Heritage.md` §2B), not an oversight to reconcile later. Reference alloy stops (`Tactile_Style.md` §2):
- **Blued Steel/Iron:** `#CBD5E1 → #64748B → #334155 → #1E293B`
- **Aged Brass/Gold:** `#FFE5A3 → #D4A047 → #8C5828 → #4A2A0C`
- **Polished Silver:** `#FFFFFF → #E2E8F0 → #94A3B8 → #334155`

### C. Bold Dark Contours on Everything
Every object — button, platform, gear, plaque, character — gets a thick dark outline stroke (`#1C1610`/`#18181B`/`#221C11`, 2.5–4px). This is what keeps a gradient-heavy, busy surface from reading as washed-out; it's non-negotiable across both execution layers.

### D. Color Economy: 4–6 Roles, Not an Open Palette
Per card/component: a dark canvas/base, a primary structure color + its darker extrusion shade, one reserved "vibrant energy" accent (used *only* for active/reward states — gold, cyan, crimson), a dark contour tint, and a pure-white specular highlight. Discrete, not a gradient wash of arbitrary hues.

### E. Juice: Tactile Feedback Everywhere
Buttons/tiles physically translate down on press (`translateY(2–4px)`, extruded base flattens). Shader cards escalate tension (jitter, accelerating pulses) before an explosive reward release (particle bursts, floating "+1" popups, shockwave rings). Nothing here settles quietly — even a resting state has legible tactile weight.

### F. High-Legibility Typography Over Texture
Text on any textured/gradient surface gets an outline + drop shadow (`paintOrder="stroke fill"`) so labels stay readable regardless of what's underneath. Titles get strong display type; body/labels stay clean sans-serif with generous letter-spacing.

---

## 4. Component Construction Guidelines

### Wooden Board Chassis (`GamifiedBoard`, project-card `BoardContainer`)
Dark oak gradient background (`#8C5828 → #673E19 → #4A2A0C`), 4px dark outline, `SteelCornerBrackets` at the corners, inset cork-board interior (radial dot-grid pattern) with a deep inset shadow. This is the pattern for any new "framed wooden container."

### Parchment Scroll Panel (`GamifiedParchmentPanel`, skill-tree detail)
Top wooden hanging bar (with two blued-steel rivets) sitting slightly *above and wider than* the parchment body — the parchment tucks under it, not inside it. Parchment body: cream-to-gold gradient, inner dashed stitching border, category/rank badges in the header row, a wax-seal SVG sigil overlapping the top-right corner as an accent.

### Wax Seal Accent
A layered SVG: melted-wax outer blob (two overlapping red tones), ribbon-end tails, a stamped inner emblem circle with an embossed crest. Used as a corner accent on parchment surfaces, not a full component on its own.

### Buttons & Controls
Extruded 3D bottom base (3–6px darker tone of the face color), physical press-down translate on `:active`, top-left specular highlight line. Follows the Ketchapp/vector-arcade contour rules (`Ketchapp_Casual_Style.md`) more than the wood/parchment rules — buttons read as toy/arcade hardware, not carved wood.

---

## 5. Known Gaps (honest, not aspirational)

1. **No bespoke bento slot adapters.** Per `Skin_System.md`'s Tier 3 table, Gamified's `header`/`responsibilities`/`skills` slots are Heritage's components, unmodified, and `achievement` is the skin-neutral shared component. `BoardContainer` (`GamifiedBoard`) is the only slot-equivalent piece that's genuinely Gamified's own.
2. **Not token-driven.** See the Status Note at the top — this is the largest piece of unstarted work, not a design decision.
3. **Two execution layers, one voice, not yet one mechanism.** The Hero's WebGL shader cards and the DOM/CSS tactile chrome are not expected to merge into a single rendering technique, but no doc previously stated that decision explicitly — it's stated here now.
4. **Debug/lab scaffolding exists but is out of scope for this doc.** `GamifiedShowcase.tsx` (a "Theme Lab" widget playground reachable via the Navbar's "Laboratory" plank option) is real, wired code — not covered here since it's a dev tool, not part of the shipped skin's visual contract.

---
*Skin: Gamified · Experience Engine · 2026-08-11*
*Companion to `Token_Contract.md` (values, currently under-consumed by this skin — see §5), `Skin_System.md` (Tier 3 mechanism and the honest current-state notes on Gamified's borrowed slots), and `Skin_Heritage.md` (the sibling skin this one deliberately diverges from on gradients). Source heuristics consolidated from `docs/Design/Tactile_Style.md`, `Hero_Animated_Cards_Style_Guide.md`, `Island_Overworld_Style.md`, `Ketchapp_Casual_Style.md`, and `docs/Architecture/specs/Hero_Layout_Refactor_Spec.md` — those documents remain the detailed reference; this one is the entry point.*
