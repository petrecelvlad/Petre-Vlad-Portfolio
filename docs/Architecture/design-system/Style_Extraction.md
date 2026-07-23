# Style Extraction
### From Reference Images to a Skin Block

---

## What This Document Is

`Token_Contract.md` defines the token schema. `Skin_System.md` defines how a skin swaps at runtime. This document defines the **process that turns a set of reference images into the values that go inside a `[data-skin="..."]` block** — written up after actually running it once (the "heritage" skin, DR-014, 2026-07-21), not designed speculatively in advance. Treat this as v0.1: a first codification of what worked, expected to get sharper the next time it runs, not a finished methodology.

**Why this exists as its own document, not folded into `Skin_System.md`:** `Skin_System.md` assumes the token values to put in a skin block already exist. This document is about the step before that — going from "here are some images" to "here are the specific token values," which is a different kind of work (visual analysis + judgment about what generalizes) and has its own failure modes, distinct from the runtime mechanism.

---

## The Core Problem This Solves

Per `BRIEF.md` and `LESSONS.md`, the whole reason this project has a parametric skin system at all is that five rounds of full-fidelity visual mockups were built and rejected with no way to compare or recover prior work. A sixth round done the same way — "look at some references, freehand a new design" — would repeat that exact failure mode, just inside the new system instead of outside it. The token contract only pays off if filling it in is a **repeatable, checklist-driven read of a reference**, not a fresh creative judgment call each time.

The second problem this solves is specific to Pillar 3 (`PILLARS.md`) — the style has to be demonstrably *his*, not a borrowed genre. A single reference image can't establish that; it just proves the image's own genre. The extraction process below exists specifically to separate **cross-reference constants** (candidate personal-voice signal) from **single-reference specifics** (that image's genre, not necessarily Vlad's voice) — see step 3.

---

## The Process (v0.1, as actually run for "heritage")

### Step 1 — Gather references, note what they have in common structurally
For "heritage": `SS_Castellum.jpg` (title screen), `SS_Castellum_2.png` (weaponry/inventory UI), `SS_COT_2.png` (Crown of Thrones tower-defense HUD) — two different games, three screens covering three different UI *purposes* (branding, inventory management, live HUD). That spread matters: three screens from the same single screen would only prove one composition, not a voice.

### Step 2 — Read each reference against the token schema, not freehand
Don't describe an image in prose first ("feels warm and painterly") — go straight down `Token_Contract.md`'s own section list and ask what each section's tokens would need to be to reproduce this image. Concretely, for each reference:

| Token Contract section | What to look for |
|---|---|
| Surface/Ink colors | Background tone (warm/cool, saturation), text/outline ink color |
| Palette colors | Sample the actual accent hues used for UI chrome (not decorative art) |
| Border/outline treatment | Present or absent, weight, color (pure black vs. tinted) |
| Radius | Sharp vs. rounded, how rounded |
| Depth/shadow (`--depth-style`) | Flat offset, blurred, embossed/beveled, or none — **name the mechanism**, don't just say "has depth" |
| Slot/icon chrome | Any sunken-socket or raised-badge motif for icons/items |
| Typography | Weight, casing, any stroke/outline treatment on numerals or labels |
| Texture | Flat fill vs. gradient vs. painted/photographic texture |

This pass is mechanical on purpose — it forces every observation into a form that's either already a token slot or a **named gap** (see step 4), instead of staying as an unstructured mood-board impression that can't be acted on.

### Step 3 — Separate cross-reference constants from single-reference genre
This is the step that actually serves Pillar 3, and it's the one most likely to get skipped under time pressure — don't skip it. For every trait found in step 2, check whether it appears in *all* references or just one:

- **Appeared in all three** (heritage's actual findings): thick dark ink outline on every shape; chunky rounded corners; a sunken-socket motif for inventory/ability icons; a warm-leaning, high-saturation palette (gold, red, sky blue, green) built from a small fixed set of roles, not a large freeform palette. → these are the candidate personal-voice signal, safe to extract.
- **Appeared in only one reference** (heritage's actual findings): the blackletter/gothic wordmark font on Castellum's logo (medieval-genre-specific, not evidence of a personal typographic voice); Castellum's parchment/wood-grain textures specifically (that game's genre dressing, though "surfaces can carry a texture, not just a flat fill" is itself a cross-reference-worthy structural finding even if the *specific* texture isn't). → flagged, not extracted as if it were universal.

Getting this step wrong in either direction is a real risk: treating single-reference genre dressing as universal voice reproduces the "assembled genre" failure `LESSONS.md` already diagnosed once; being too conservative and only extracting what's *identical* pixel-for-pixel across references would extract nothing (three different games will never share exact hex values) — the right unit of comparison is the *mechanism* (a sunken-socket icon motif), not the literal value.

### Step 4 — Log gaps honestly instead of faking them with existing mechanisms
Not every observed trait maps onto an existing token. Heritage's real gap: all three references use an embossed/gradient bevel for panel depth (a lighter highlight top edge, darker shadow bottom edge, on the surface fill itself), which `--depth-style`'s current enum (`hard-offset | soft-blur | none`) has no entry for — building it for real would mean either a new enum value with a real gradient-fill mechanism, or per-component gradient backgrounds, both real scope. Heritage approximates with the existing `hard-offset` mechanism instead and says so directly in `index.css`'s comment and in DR-014, rather than quietly building a half-implemented new depth mechanism under time pressure. Per Pillar 4's own stated tension (rigor vs. shipping fast): a documented approximation is better engineering evidence than an undocumented shortcut — do this, don't hide the gap.

### Step 5 — Write the skin block using only the existing mechanism, plus the restatement rule
Every value from steps 3–4 gets written into a new `[data-skin="..."]` block using exactly the mechanisms `Skin_System.md` already documents — Tier 1 value overrides, Tier 2 structural overrides, `--role-*` restatement (see the sub-rule below, discovered while building "heritage" — genuinely load-bearing, not optional):

> **Every `--role-*` token a skin wants to retarget must be explicitly restated inside that skin's own block**, even when its right-hand side is textually identical to the default (`--role-header-accent: var(--color-coral);`). Overriding `--color-coral` alone does not retarget `--role-header-accent` — confirmed by `getComputedStyle`, not assumed; see `Skin_System.md`'s "A var()-alias does not track a descendant skin's override" section for why. This bit the first real attempt at this exact skin (all four role tokens silently stayed on their Bauhaus values on the first pass) — verify this specifically, don't trust a visual screenshot alone to catch it (a wrong-but-similar accent color is easy to miss by eye).

### Step 6 — Verify via computed style, not just a screenshot
Per DR-012's lesson (the invisible-border bug that visual screenshots alone missed once already): after building the skin, check `getComputedStyle` on the scoped root for the tokens that actually changed, confirming both that the override applies *and* stays confined to the intended scope (`<html>`'s own value should be untouched). Only after that passes is a screenshot pass meaningful — a screenshot confirms *legibility and composition*, not that the mechanism is wired correctly.

---

## Worked Example: "heritage" (DR-014)

Concrete input → output, kept here as the reference case for the next extraction pass:

| Reference finding (step 2-3) | Token(s) set |
|---|---|
| Warm parchment surfaces, warm near-black ink (not cool black) | `--color-surface-base`, `--color-surface-elevated`, `--color-surface-soft`, `--color-ink-base/-subtle/-whisper` |
| Deep red banner/tower accents (cross-game) | `--color-coral` → also retargets `--role-header-accent` (Header) once restated |
| Slate-blue stone panel accents (Castellum weaponry UI) | `--color-periwinkle` → `--role-responsibilities-accent` |
| Saturated sky blue (both games' skies/HUD) | `--color-sky` → `--role-skills-accent` |
| Gold coin/gem currency icons (both games) | `--color-butter` → `--role-achievement-accent` |
| Dark slate sunken item-slot sockets | `--color-slot-casing`, `--color-slot-surface`, `--color-slot-text`, `--inset-color` |
| Thick outlines, chunky rounding (cross-game) | `--border-width-sm/md/lg` (formula restated with larger base px), `--radius-md`, `--radius-lg` |
| No background dot-grid in either game | `--motif-dot-texture: 0` |
| Embossed/gradient bevel depth (gap, step 4) | Built 2026-07-21 — see DR-017. `--depth-style: embossed`, realized as layered `box-shadow` (inset bevel + soft ambient shadow), not the background-gradient version this row originally described; that fuller version is still open, see Open Questions below |

Result: verified in-browser (`src/index.css`'s `[data-skin="heritage"]` block, `SkinContext.tsx`'s `SKINS` array) — device frame confirmed unchanged, page background outside the card confirmed still Bauhaus, all four role-token accents confirmed individually retargeted via `getComputedStyle`.

---

## Open Questions for the Next Pass
- ~~Should the embossed/gradient depth style get built for real, or does a second reference set need to confirm it's a real cross-game constant first?~~ **Resolved 2026-07-21 (DR-017)** — built via direct instruction after "heritage v1" was rejected, not via a second reference set (see DR-017's Context for why that's still an honest resolution). What shipped is the `box-shadow`-only bevel approximation, not a true gradient-filled surface — **still open:** is the full gradient-background version (would change how `--color-surface-*` tokens are consumed, not just the shadow tokens) worth the larger blast radius, or does the cheaper bevel-only version hold up once seen against the other unaddressed levers (shape, color balance, typography)?
- Should extraction ever pull a trait that appears in only one reference, if that reference is unusually representative of Vlad's own taste vs. the other two? (Step 3's "appears in all references" bar is a starting heuristic, not a hard rule — revisit once more reference sets exist to compare against.)
- This pass used 3 static screenshots. Motion/interaction voice (how UI elements animate, not just how they look at rest) is untouched by this process entirely — flagged, not scoped in.

---

*Style Extraction · Experience Engine · 2026-07-21*
*Companion to `Token_Contract.md` (values) and `Skin_System.md` (runtime mechanism + the aliasing gotcha this process depends on). Worked example: DR-014.*
