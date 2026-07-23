# Decisions Log

ADR-style running log for this project's design and architecture decisions. Each entry is dated and immutable once accepted — if a decision is later reversed, add a new entry that supersedes it rather than editing the old one. See [BRIEF.md](./BRIEF.md) for context, [ANTI_PATTERNS.md](./ANTI_PATTERNS.md) for rejected directions, [LESSONS.md](./LESSONS.md) for process lessons.

Status legend: **Accepted** · **Superseded by DR-NNN** · **Open** (tracked here but not yet decided)

---

## DR-001 — Split projects by audience lens
**Status:** Accepted · **Date:** pre-2026-07

**Context:** Different hiring audiences (producer/designer/economy-focused) need different facets of the same project surfaced. A flat undifferentiated project description forces every reader to do translation work themselves.

**Decision:** Each project is split by "lens" — the mechanism (tabs vs. something else) is not locked, only the concept.

**Consequences:** Positive — recruiters self-serve the relevant slice without reading everything. Negative — every project needs content authored per-lens, more content-authoring surface than one flat description.

---

## DR-002 — Hero shows aggregate career stats
**Status:** Accepted · **Date:** pre-2026-07

**Context:** First audience is non-technical recruiters; ~20 years of experience is illegible if it requires reading everything.

**Decision:** Hero surfaces high-level totals (years experience, projects/games worked on, teams managed) rather than narrative, meant to land visually first.

**Consequences:** Positive — fast legibility for the priority audience. Negative — depends on the aggregate numbers being genuinely impressive at a glance; doesn't help audiences who want depth immediately.

---

## DR-003 — Skill tree as organizing structure for skills
**Status:** Accepted, refined by DR-008 · **Date:** pre-2026-07

**Context:** ~20 years spans a varied skill set (design/management/economy/etc.); a flat list doesn't give both a holistic view and a per-interest breakdown.

**Decision:** Skills are organized as a filterable tree, browsable by category.

**Consequences:** Positive — one structure serves both "show me everything" and "show me just design skills" without duplicate content. Negative — see DR-008 for the visual-execution risk this originally carried and how it was resolved.

---

## DR-004 — Neo-brutalism + macOS chrome ruled out
**Status:** Accepted (rejection) · **Date:** pre-2026-07

**Context:** v1 combined rounded corners, saturated pastel palette, thick uniform outlines, and toy-style icons. A trusted senior designer called it childish and said it didn't reflect Vlad's seniority.

**Decision:** This specific stacked combination is ruled out. See [ANTI_PATTERNS.md](./ANTI_PATTERNS.md) for the full pattern.

**Consequences:** Negative — the entire v1 visual system needed rebuilding. Positive — named exactly which four stacked choices caused the failure, so the current Bauhaus/Applet skin deliberately avoids repeating that specific combination (thick borders remain, but paired with a high-contrast rather than pastel palette and no toy iconography).

---

## DR-005 — Hand-coded SVG isometric illustration ruled out as a technique
**Status:** Accepted (rejection) · **Date:** pre-2026-07

**Context:** Two attempts (full desk scene, close monitor crop) built isometric scenes from extruded-box SVG primitives via a hand-coded projection function.

**Decision:** This technique has a confirmed ceiling — small/detailed hand-built primitive objects read as "cardboard cutout" regardless of palette or shading. Ruled out as a technique, not as an idea: isometric imagery sourced as a real illustration asset (AI-generated or commissioned) remains open.

**Consequences:** Negative — any future isometric direction requires a real illustration asset, which is slower/more bespoke than hand-coded SVG. Positive — prevents wasting further iteration cycles polishing a technique that cannot reach the required rendering quality.

---

## DR-006 — Scope bias: lean now, deepen later
**Status:** Accepted · **Date:** 2026-07-20

**Context:** MVP-speed and bespoke/immersive depth are in direct tension — every visual direction explored in depth so far has been inherently slow, bespoke work, and this was never reconciled. The parametric skin architecture (see `docs/Architecture/design-system/Skin_System.md`) needs to know how much structural investment is warranted now.

**Decision:** Ship the leanest version that proves the concept fast — one real skin, minimal structural token tier — but keep the token contract disciplined enough that going bespoke later doesn't require a rewrite.

**Consequences:** Positive — avoids over-building structural flexibility for skins that may never get made; keeps the MVP timeline realistic. Negative — the structural/variant token tier will be minimal at first and may need real extension the first time a genuinely divergent second skin is attempted, not purely "swap values."

---

## DR-007 — Central metaphor stays optional
**Status:** Accepted · **Date:** 2026-07-20

**Context:** Every visual attempt so far (desk scene, monitor crop) assumed the site needs one big unifying metaphor. Untested alternative: voice from a disciplined system of smaller consistent decisions (type pairing, spacing rhythm, color logic), no central "big idea" object.

**Decision:** Keep both open. The skeleton reserves an optional hero-visual slot for a future bespoke centerpiece, but no skin is required to fill it — the current/default skin uses none.

**Consequences:** Positive — doesn't foreclose either direction; a future bespoke illustration doesn't require restructuring the Hero region to make room for it. Negative — an unused slot is a small amount of structural complexity carried before it's proven necessary.

---

## DR-008 — Skill tree visual chrome is non-negotiable
**Status:** Accepted · **Date:** 2026-07-20

**Context:** Prior research (see DR-003, [ANTI_PATTERNS.md](./ANTI_PATTERNS.md)) flagged a real risk: literal skill-tree visual chrome (branches, nodes, XP bars, unlock glow) could reintroduce the exact "childish/toy game UI" problem that triggered the original rebuild. The open question was whether the tree needed to *look* like a skill tree or merely be organized like one.

**Decision:** Explicitly and firmly settled by Vlad: the skill tree **must remain a literal, game-like skill tree** — branches/nodes and game-UI visual chrome, not a flat/organizational-only rendering. This is a fixed requirement across every skin, not a skin-variable choice.

**Consequences:** Positive — resolves a previously-open risk with a direct answer; the `SkillTree` component's structural shape (tree layout, connectors) is now a stable design target rather than a moving target. Negative — the "childish" risk from DR-004 does not go away, it *relocates*: since the component-level mitigation (going organizational-only) is off the table, avoiding a repeat of the original complaint depends entirely on skin-level execution — line weight, palette restraint, absence of arcade-style glow/bounce — not on avoiding the motif itself. Every skin's `Skin_*.md` needs to treat the skill-tree token values as a first-class risk area, not an afterthought.

---

## DR-009 — UDS/Hive spec (`docs/Parametric Unification/`) reconciled with `Skin_System.md`: adopt selectively
**Status:** Accepted · **Date:** 2026-07-20

**Context:** `docs/Parametric Unification/` turned out to already contain a full Universal Design System spec (L0 tokens → L1 Primitives → L2 Constructions → L3 Compositions → L4 Layouts → L5 Instances, ~175 named elements), built for a separate platform ("Hive") as a commercial Skeleton+Skins+Domain-Packs product. Discovered mid-session while staging `docs/` for its first-ever commit. Needed reconciliation against the `Skin_System.md` just written, to avoid two competing specs for the same subsystem.

**Decision:** Adopt one piece of it — the Skin validation discipline (WCAG AA contrast check + breakpoint verification from UDS's Layer 5 materialization protocol), added to `Skin_System.md`'s stress-test-skin step. Do not adopt the L1–L4 component taxonomy (Primitives/Constructions/Compositions/Layouts) or its naming — the existing hexagonal + atomic component tiers already serve this project at the scale it actually needs. UDS's own Skin model is value-tier only ("a Skin does not contain component structure or behavior"); it has no equivalent to `Skin_System.md`'s Tier 2 (structural/variant tokens), confirming Tier 2 is this project's own necessary addition, not a redundant reinvention.

**Consequences:** Positive — one concrete, cheap discipline (contrast + breakpoint checks) gets folded into the skin-validation workflow; the two documents no longer describe the same thing incompatibly. Negative/named directly: UDS's stated goal is formal genericity — "any valid interface for any product." This project's design brief (see `ANTI_PATTERNS.md`) is the opposite: escaping genre-assembly, finding a voice that doesn't read as a borrowed universal system. Adopting UDS's taxonomy wholesale would work against that brief even setting aside migration cost — don't revisit this without a real reason the lighter approach is failing.

---

## DR-010 — Tier 2 structural tokens implemented via value-token indirection, not component branching
**Status:** Accepted · **Date:** 2026-07-20

**Context:** `Skin_System.md`'s original plan for Tier 2 (`--border-presence`, `--motif-dot-texture`, `--depth-style`, `--motif-slot-machine`) called for routing them through a small set of shared primitives (`WindowCard`, `Card`, `Button`, a slot-motif wrapper) so leaf components never branch on them directly. During implementation, a leaner mechanism was found: `--border-presence` and `--motif-dot-texture` are real boolean switches (0/1) that can be multiplied directly into the Tier 1 tokens they gate — `calc(2px * var(--border-presence))` for border widths, `color-mix(in srgb, var(--color-ink-base) calc(var(--motif-dot-texture) * 100%), transparent)` for the dot texture's color — entirely inside `index.css`. `--depth-style` and `--motif-slot-machine` gate qualitative treatments (a whole shadow formula; three colors plus a radius) that CSS can't switch between via a single variable at all — but it turns out they don't need to: a skin realizes them by directly overriding the existing `--shadow-raised`/`--shadow-sunken` or `--color-slot-*`/`--radius-slot` tokens, which were already the correct single point of indirection.

**Decision:** Implement Tier 2 with zero React component changes. `--border-presence`/`--motif-dot-texture` live only in `index.css`, consumed at the point Tier 1 tokens are *defined*, not where components *consume* them. `--depth-style`/`--motif-slot-machine` are documentation-only contracts realized through direct Tier 1 overrides — no component ever references either.

**Consequences:** Positive — leaner than planned (0 component files touched vs. 4+ originally scoped), verified working at runtime (toggling both switches live correctly zeroed borders and hid the dot texture while leaving shadows, a separate axis, untouched). Negative — none identified; if a future need arises for a genuinely qualitative Tier 2 switch that can't be expressed as a value-token override (e.g., swapping which DOM structure renders, not just which values apply), this mechanism won't cover it and would need real component-level branching after all — revisit then, don't build for it now.

---

## DR-011 — Stress-test skin scoped to the project-card section only; real skin switcher added
**Status:** Accepted · **Date:** 2026-07-20

**Context:** Step 3 of `Skin_System.md`'s sequencing plan called for a throwaway stress-test skin exercising all four Tier 2 tokens. Building and polishing it across every section (Hero, SkillTree, Navbar) before validating the mechanism at all would have repeated the MVP-vs-bespoke tension DR-006 already resolved.

**Decision:** Scoped the stress-test skin's verification to the project-card section only (WindowCard/BentoHeader/BentoSkills/BentoVideoFrame/BentoAchievement) — the mechanism is still global (`data-skin` on `<html>`, every token app-wide), so other sections visibly change too, but they weren't reviewed or fixed. Added a real skin switcher (`<select>` in `Navbar`, default "Bauhaus") instead of a devtools-only toggle, so switching is a normal user action, not a one-off verification script.

**Consequences:** Positive — validated the whole Tier 1 + Tier 2 model against real content fast, found a genuine gap (see below) cheaply. Negative — the stress-test skin is visibly broken in one specific way outside the reviewed section (SkillTree contrast) and must not be treated as "done" beyond the project card.

**Gap found:** `SkillTree`'s `PILL_BG` pastel backgrounds pair with near-black ink text by assumption; the stress-test skin's dark palette flips ink to near-white, breaking contrast there. Left unfixed — SkillTree is out of scope for this pass — but must be resolved before any dark-leaning skin extends past the project section.

**Correction (2026-07-21, see DR-013):** the phrase "scoped to the project-card section" above described *what got reviewed*, not what the CSS actually did — `data-skin` on `<html>` with a `:root[...]`-keyed override cascades everywhere regardless. Vlad caught this live (the switcher visibly recolored the whole portfolio). Don't trust this entry's "scoped" framing over DR-013.

---

## DR-012 — Two Tailwind v4 build gotchas fixed: invisible borders, and an @theme cross-reference crash
**Status:** Accepted · **Date:** 2026-07-21

**Context:** Vlad reported the black outline/frame around every element had disappeared in the live app. Root cause: `border-[var(--border-width-sm)]` (used across all 13 border-consuming files since the Tier 1 gap-closing pass) compiles to `border-color`, not `border-width` — Tailwind can't infer the CSS property from a bare `var()` reference and silently defaults ambiguous `border-[...]` arbitrary values to color. Every border rendered at 0 effective width; the visual screenshots taken during earlier verification passes were fooled by `shadow-raised`'s hard-offset box-shadow, which mimics a border at a glance. While fixing it, moving the Tier 2 default tokens out of `@theme` (done in DR-010, to fix a separate cosmetic issue) turned out to break the entire CSS build — any `@theme` value referencing a `var()` defined outside `@theme` corrupts Tailwind's internal processing, surfacing as a full-page 500 error.

**Decision:** (1) Every border-width arbitrary value now uses the type hint — `border-[length:var(--border-width-sm)]` — across all 13 files. (2) Tier 2 default tokens moved back inside `@theme` (reverting part of DR-010's change); every consumer of `--border-presence`/`--motif-dot-texture` now includes a `, 1` fallback so the mechanism stays correct even though `--border-presence`'s own value is separately, silently dropped from Tailwind's output (a namespace-collision quirk, not the same bug as the crash).

**Consequences:** Positive — both bugs fixed and verified via `getComputedStyle` (not just screenshots) in both skins; the underlying two-tier model and stress-test skin from DR-010/011 are unaffected, just their storage location moved back. Negative — this reverts part of DR-010's stated mechanism (Tier 2 tokens are back inside `@theme`, not in a separate plain `:root` block) — `Skin_System.md` updated to match reality, don't trust DR-010's original wording about token placement over this entry.

---

## DR-013 — Skin scope moved from `<html>` to the project-card root; device frame permanently locked; per-component role tokens added
**Status:** Accepted · **Date:** 2026-07-21

**Context:** DR-011's "scoped to the project-card section" was aspirational, not real (see the correction appended there) — `:root[data-skin="..."]` cascades from `<html>` no matter which element carries the attribute, so switching to the stress-test skin visibly recolored the entire portfolio. Separately, Vlad wants to generate real proof-of-concept mockups by varying Header/Responsibilities/Skills/Achievement independently, while `BentoVideoFrame`'s device shell — the black mobile frame around the screenshot/video — should never change regardless of skin.

**Decision:** Three changes, all additive to the existing two-tier model rather than replacing it. (1) **Scoping:** `data-skin` moved off `<html>` onto `ProjectDetails`'s own root, driven by a new `SkinContext` (mirrors `VideoPrefsContext`); the CSS override selector dropped `:root`, so ordinary custom-property inheritance now confines the effect to whichever subtree actually carries the attribute. `<html data-skin="bauhaus">` stays as a static semantic default; nothing keys off it. (2) **Lock:** `--chrome-device-shell`/`--chrome-device-shadow` added as hardcoded literals — not `var()` aliases to `--color-ink-base`/`--shadow-raised`, because an alias would still re-resolve against whichever skin is active at its point of use — in the same permanent `--chrome-*` namespace as `--chrome-navbar-height`. No skin block may ever declare these two tokens. (3) **Per-component identity tokens:** `--role-header-accent`/`--role-responsibilities-accent`/`--role-skills-accent`/`--role-achievement-accent`, each aliasing the palette color each component already used (coral/periwinkle/sky/butter respectively). `WindowCard`/`Badge` gained an additive `accentToken` prop consuming these; the existing `color` enum prop is untouched for every other consumer.

**Consequences:** Positive — verified via Playwright against the live dev server that the scope fix actually holds (`<html>`'s computed `--color-ink-base` stays `#191919` while the card root's resolves to `#FAFAFA` only within that subtree; Hero/SkillTree/Navbar screenshots identical between skins). Device frame confirmed pixel-identical in both skins. The per-component tokens mean a future mockup skin is a pure-CSS override block — no component file needs editing per mockup, which is the entire point of the parametric system finally reaching the granularity this pillar-4/DR-006 balance was aiming for. Negative — none identified; `SkillTree`'s DR-011 contrast gap is now moot for the project-card-only case (scoping no longer reaches `SkillTree` at all) but remains relevant the day a skin is extended beyond the card, per DR-011.

---

## DR-014 — "Heritage" skin: first pass at pulling reference from Vlad's own shipped games
**Status:** Accepted (first pass, not final) · **Date:** 2026-07-21

**Context:** DR-013 finished the mechanism (correct scoping, locked device frame, per-component role tokens). Step 4 of `Skin_System.md`'s Sequencing Plan — gated on step 3.5 holding up, per DR-013 — was to pull reference from Vlad's own shipped games rather than Pinterest/AI-generated options, per this file's own long-standing Open item and `LESSONS.md`'s working theory that voice is more likely found in 20 years of real shipped work than any borrowed genre.

**Decision:** Extracted values from three screenshots of two of Vlad's own games (`SS_Castellum.jpg`, `SS_Castellum_2.png`, `SS_COT_2.png`) using a new documented process (`Style_Extraction.md`, written up from this actual run, not designed in advance) and built them into a new `[data-skin="heritage"]` block — warm parchment surfaces, deep red/slate-blue/sky-blue/gold role accents, dark slate item-slot sockets, chunkier radius and thicker outlines. Cross-referenced the two games explicitly to separate shared traits (thick ink outlines, chunky rounding, sunken-socket icon motif, warm saturated palette — extracted) from single-reference genre dressing (Castellum's blackletter logo font, its specific parchment texture — not extracted). One real gap found and left honestly unbuilt rather than faked: both games use an embossed/gradient bevel for depth that `--depth-style`'s current enum has no mechanism for; approximated with the existing `hard-offset` value instead.

**Bug found and fixed during this pass, worth its own line:** the `--role-*` component-identity tokens added in DR-013 turned out not to work as designed — a `var()`-aliased custom property resolves once where declared (`:root`), not per-consuming-element, so overriding `--color-coral` inside `[data-skin="heritage"]` silently failed to retarget `--role-header-accent` on the first build. Caught via `getComputedStyle`, not the screenshot (which looked plausible-but-wrong). Fixed by requiring every skin to explicitly restate any `--role-*` token it wants to retarget — now the documented rule in `Skin_System.md` and `Style_Extraction.md`, not just this skin's workaround.

**Consequences:** Positive — the parametric system's actual payoff finally demonstrated: a second real skin built from real reference material with zero component file changes, verified via computed style not just visual scan. The extraction process is now written down as a repeatable checklist (`Style_Extraction.md`) instead of living only in this session's judgment calls. Negative — "heritage" is explicitly a first pass (3 screenshots, one reference set, no motion/interaction voice considered) — not proposed as a finished second skin candidate. The embossed-depth gap is real and unresolved; don't let a future pass quietly fake it with `hard-offset` forever without revisiting.

---

## DR-015 — Tier 3 added: per-skin, per-slot component registry for full structural swaps
**Status:** Accepted · **Date:** 2026-07-21

**Context:** Vlad reviewed "heritage" (DR-014) and rejected it — not for its values, for what it proved: every project-card region still rendered as the exact same DOM shape (`WindowCard`'s titlebar-and-traffic-lights chrome for `BentoResponsibilities`/`BentoSkills`; `BentoHeader`'s slot-machine badge; `BentoAchievement`'s bordered banner), just recolored. This is a real ceiling in the two-tier model, not an execution shortfall: Tier 1 swaps values, Tier 2 gates whether an *already-existing* structural element renders (border on/off, shadow formula, motif on/off) — neither can change what shape a region *is*, because that shape is plain JSX, not a token reference. DR-010 named this exact failure mode in advance and explicitly deferred it: "if a future need arises for a genuinely qualitative Tier 2 switch that can't be expressed as a value-token override... this mechanism won't cover it and would need real component-level branching after all — revisit then, don't build for it now." This is that revisit.

**Decision:** Add Tier 3 — Component Slots, documented in `Skin_System.md`. The four non-locked project-card regions (`header`/`responsibilities`/`skills`/`achievement`, matching the existing `--role-*` accent tokens 1:1) become named slots resolved at runtime by a skin-keyed registry (`src/components/bento/registry.ts`) instead of static imports in `ProjectDetails.tsx`. Each slot has a props contract (a port, typed against `IProject` fields — content stays domain-driven, chrome does not). Bauhaus's current `BentoHeader`/`BentoResponsibilities`/`BentoSkills`/`BentoAchievement` move as-is into `src/components/bento/skins/bauhaus/` (pure rename, zero behavior change) and become both Bauhaus's own adapter *and* the fallback default for any slot a skin doesn't register its own override for. `BentoVideoFrame` is explicitly excluded from the registry — it stays governed by DR-013's permanent `--chrome-device-*` lock, not reopened by this change. `WindowCard` is not deleted, moved, or deprecated — it remains a general atom in `components/atoms/`; Bauhaus keeps using it, and any future skin may reuse it deliberately, but nothing routes a skin through it by default anymore.

**Consequences:** Positive — unbounded structural freedom per skin (a new DOM shape, not just new values, is now buildable without touching any other skin), while per-slot fallback keeps the cost proportional to how much a skin actually wants to diverge — a new skin can override just one slot and inherit Bauhaus's other three, matching DR-006's lean-now bias instead of forcing a full rebuild before anything is viewable. Negative, named directly: this is a real, deliberate reversal of `Skin_System.md`'s previously "confirmed, not aspirational" rule that zero React components reference skin state — that guarantee now holds only for Tier 1/Tier 2, not Tier 3, and needs to be read that way from now on. Correctness also now depends on prop-contract discipline across independently-built implementations of the same slot (a real port, not just parallel CSS blocks) — a new kind of consistency burden Tier 1/2 never carried, since those were pure value overrides with no code on either side to drift apart.

---

## DR-016 — `stress-test` skin removed; `heritage` rebuilt as the first real Tier 3 proof (`responsibilities`/`skills` slots)
**Status:** Accepted · **Date:** 2026-07-21

**Context:** Immediately after DR-015 was accepted, Vlad's actual next instruction was blunt: remove `stress-test` and make `heritage` itself prove Tier 3 works, rather than adding a third placeholder skin or a synthetic test case. `stress-test`'s entire purpose (DR-011/DR-012's Sequencing Plan step 3 — find where the two-tier token model breaks, before a real skin existed to test it on) is superseded now that a real skin can exercise the same mechanism directly. Separately, `heritage`'s two `WindowCard`-based slots (`responsibilities`, `skills`) were still the literal thing DR-015 was written to fix — leaving them as Tier 1/2-only overrides would mean the Tier 3 mechanism shipped with zero real adapters using it, no different than merging an untested port.

**Decision:** Two changes. (1) `stress-test` deleted outright — removed from `SkinContext.tsx`'s `SKINS` array, its `[data-skin="stress-test"]` block removed from `index.css`, its (empty) entry removed from `registry.ts`. Not archived or commented out — it was always documented as a throwaway (`Skin_System.md`, `index.css`'s own comment on the block), and its verification purpose is now better served by a real skin, so keeping a dead placeholder around had no remaining value. (2) `heritage` gets its first two real Tier 3 adapters: `src/components/bento/skins/heritage/BentoResponsibilities.tsx` and `BentoSkills.tsx`, registered in `registry.ts` for the `heritage` key. Both drop `WindowCard`'s shape entirely — no full-width titlebar bar, no traffic lights — in favor of a shared internal `HeritagePanel` (thick border, chunky radius, `shadow-raised` outer frame) with the region's title rendered as an inset/`shadow-sunken` plaque instead of a raised bar. The sunken-plaque treatment is a deliberate reuse of the sunken-socket motif `Style_Extraction.md` already confirmed as a cross-reference constant (Castellum + Crown of Thrones both use it for item slots) — applied here to the title treatment, not a newly invented motif. `header` and `achievement` are left on Bauhaus's fallback adapters for now, unchanged — both already have bespoke non-`WindowCard` shapes under Bauhaus (a badge, a banner), so they were never the shape being complained about; per DR-015's own per-slot fallback design, a skin does not need every slot rebuilt to be real.

**Consequences:** Positive — Tier 3 now has a real, verifiable adapter pair proving the registry mechanism actually changes DOM shape, not just values, which is the exact thing DR-015 was written to make possible and the exact thing "heritage v1" (DR-014) was rejected for not doing. `heritage`'s two rebuilt slots share an internal `HeritagePanel` helper local to `skins/heritage/`, not exported or reused by any other skin — keeping skins structurally independent, per DR-015's own reasoning for why Tier 3 exists at all. Negative: `heritage` is now visually inconsistent within itself (`header`/`achievement` still Bauhaus-shaped, `responsibilities`/`skills` genuinely different) until a future pass finishes the other two slots — an honestly-scoped partial state per Pillar 4, not a hidden gap, but worth remembering before calling `heritage` a finished second skin.

---

## DR-017 — `heritage`'s depth style rebuilt: `hard-offset` (Bauhaus's shadow, unchanged since DR-014) replaced with a real `embossed` value
**Status:** Accepted · **Date:** 2026-07-21

**Context:** Even after DR-016's Tier 3 shape work, Vlad's read on `heritage` was still "incredibly ugly" and "still Bauhaus-like," specifically calling out the rounded corners and "the black undershadow that makes it look sort of pop-out" — Bauhaus's signature hard-offset flat shadow, which `heritage` had kept unchanged since DR-014 (`--depth-style: hard-offset` was declared but never actually backed by a different `--shadow-raised`/`--shadow-sunken` value, so every heritage panel used Bauhaus's exact shadow formula, `0 var(--ui-depth) 0 0 #000000`). Re-examined all three original reference screenshots (`SS_Castellum.jpg`, `SS_Castellum_2.png`, `SS_COT_2.png`) directly rather than working from `Style_Extraction.md`'s notes — confirmed none of the three use a flat hard-offset shadow anywhere; all read as beveled/embossed surfaces with soft ambient shadow. This is exactly the gap `Style_Extraction.md` named at the time and chose to approximate rather than build, per its own Step 4 discipline of logging gaps honestly instead of faking them.

**Decision:** Add `embossed` as a fourth `--depth-style` value (`Skin_System.md` §Tier 2, "`embossed`" subsection has the full mechanism and reasoning). `heritage` now declares `--depth-style: embossed` backed by real `--shadow-raised`/`--shadow-sunken` overrides — layered `box-shadow` (inset top highlight + inset bottom shadow + soft ambient outer shadow for raised elements; inset recess shadow + faint floor highlight for sunken elements) instead of Bauhaus's single flat offset. Realized entirely through the existing Tier 1 override point (`--shadow-raised`/`--shadow-sunken`) — zero component files touched, same discipline as every other Tier 2 value. Scoped to the shadow/depth lever only, at Vlad's explicit direction to fix this one thing before touching shape, color balance, or typography (all still open per the plan discussed the same session).

**Consequences:** Positive — every heritage-scoped element automatically picks up the new treatment the moment it consumes `shadow-raised`/`shadow-sunken`, including the two slots DR-016 left on Bauhaus's fallback shapes (`header`'s `Badge`, `achievement`'s banner both reference `shadow-raised` directly) — one token-level change improves all four project-card slots, not just the two Tier-3-rebuilt ones, which is the value-tier indirection working exactly as `Token_Contract.md` §11 intends. Negative, named directly: this is layered `box-shadow`, not an actual gradient-filled surface — it reads as a beveled edge, not the full glossy wash some of the references (Crown of Thrones' HUD bar especially) show. If that reads as insufficient once seen live, the gradient-background route is real follow-up work, not a small tweak — it would change how `--color-surface-*` tokens are consumed everywhere, a materially bigger change than this one.

**Correction (2026-07-21, same day):** the Consequences above were written from a screenshot, not a computed-style check — exactly the mistake DR-012 already happened once and warned against repeating. Vlad reported `heritage` still visibly showed Bauhaus's shadow; `getComputedStyle` confirmed it: `.shadow-raised`'s compiled CSS is `--tw-shadow: 0 var(--tw-shadow-color, var(--ui-depth)) 0 0 var(--shadow-color); box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);` — Tailwind v4 inlines `--shadow-raised`'s `@theme`-default *expression* (`0 var(--ui-depth) 0 0 var(--shadow-color)`) directly into `--tw-shadow` at CSS-generation time, rather than emitting `--tw-shadow: var(--shadow-raised)`. The generated utility never references `--shadow-raised` by name at all — only its two sub-parts, `--ui-depth` and `--shadow-color`, survive as live `var()` references. A descendant skin overriding `--shadow-raised` itself therefore has **zero effect** on anything using the `.shadow-raised`/`.shadow-sunken` Tailwind utility classes; confirmed structurally different override shapes (like this embossed multi-layer value) cannot be expressed by tweaking `--ui-depth`/`--shadow-color` alone, since the single-shadow shape is fixed at compile time. This is not heritage-specific — it means `--depth-style` as a Tier 2 axis has never actually worked for any skin that tried to change the shadow's *shape* (not just its color), including the now-deleted `stress-test` skin's `soft-blur` attempt (DR-011), which was itself only ever verified by screenshot. Left unfixed for now — Vlad redirected to a different approach (DR-018) before a fix was implemented. `Skin_System.md`'s `embossed` subsection carries the matching correction; don't trust this DR's original Consequences claim of a working runtime effect.

---

## DR-018 — New experimental direction: "ME" skin, an illustrated static scene instead of CSS-composited chrome (Tier 4)
**Status:** Accepted (direction), concept stage — nothing built yet · **Date:** 2026-07-21

**Context:** In the same session, `heritage`'s CSS-token approach hit two ceilings at once, not one. The design ceiling: even after DR-016 (real shape swap) and an attempted DR-017 (real depth treatment), Vlad's read stood — chasing a painterly, game-UI-illustrated look through composed CSS primitives (gradients-via-box-shadow, clip-path silhouettes, layered borders) is fighting the medium; a hard problem no amount of further token tuning was clearly going to solve well. The mechanism ceiling, discovered while fixing the shadow lever: Tailwind v4 silently bakes `--shadow-raised`'s default expression into its compiled utility, so an entire Tier 2 axis (`--depth-style`) has been non-functional since it was first introduced (DR-017's correction, above) — real engineering cost was going into a system that wasn't even reliably running. Vlad's new proposal, given both: stop trying to reach illustrated/immersive quality through composited CSS at all for this direction. Instead, commission a single AI-generated illustration for the entire project-card region as one cohesive scene — a top-down view of a game designer's desk — and overlay the real dynamic content (video, text) as positioned elements on top of that fixed image. Trades responsive/parametric flexibility for a level of immersion, detail, and gamification CSS composition structurally cannot reach.

**Decision:** Pursue this as a new, explicitly experimental skin, working name **`me`** — not a replacement for the Tier 1–3 model, a fourth, structurally different mechanism alongside it (**Tier 4 — Illustrated Scene**, `Skin_System.md`). `bauhaus` and `heritage` are unaffected. The concept as given, to be elaborated in `docs/Research/Philosophy/ME_Skin.md`: a top-down "desk" composition; the existing phone/device-frame concept (`BentoVideoFrame`) stays conceptually in place as the object already on the desk; `responsibilities` becomes a clipboard/notepad with the content written onto it; how `header`/`skills`/`achievement` map onto desk objects is explicitly undecided, not invented here. Scoped to desktop/PC viewports per Vlad's own direction — no mobile/responsive story yet.

**Consequences:** Positive — if it lands, this is plausibly the strongest answer yet to Pillar 3 (a scene unique to Vlad, not extracted from someone else's shipped game) and finally exercises the "one central metaphor" path DR-007 explicitly kept open and untested. Negative, named directly and not smoothed over: (1) **this reintroduces the exact risk the whole parametric skin system exists to avoid** — `BRIEF.md`'s origin story is five rounds of expensive one-shot visual mockups with no way to compare or recover prior work; an AI-generated scene image is a similarly coarse unit of iteration compared to a token edit, so some of that risk is being knowingly re-accepted in exchange for reach CSS doesn't have — a conscious trade, not an oversight. (2) Breaks responsive flexibility by construction — a fixed-composition image needs a defined target viewport, and narrower-viewport fallback is completely unresolved. (3) Content placement becomes coordinate/hotspot authoring against one fixed asset (text must fit a drawn clipboard region, a drawn nameplate, etc.) — a different kind of work than token authoring, with new failure modes (generated art not leaving a clean readable region, text overflowing its illustrated container) that neither `Token_Contract.md` nor `Style_Extraction.md`'s process was built to catch. (4) Genuinely unresolved: does the scene's artwork draw the phone itself, or leave a blank region for `BentoVideoFrame`'s own device bezel (permanently locked, DR-013) to sit in? If the art draws its own phone, this may need to reopen DR-013's lock, at least for this skin — not decided here, flagged for the next pass.

---

## DR-019 — Heritage redirected to a desk/clipboard concept; resolves DR-018's "ME" desk scene via Tier 3, not Tier 4
**Status:** Accepted · **Date:** 2026-07-21

**Context:** Vlad wanted a new, more gamified/immersive skin: a top-down desk where the project's
phone sits beside a clipboard/notepad carrying the project title, role, time period, thumbnail,
and responsibilities, with tabs to flip between pages. Reference was `image.png`, a Behance-style
brand-identity mood-board (spiral clipboard, binder clip, layered paper). Two things needed
resolving before building: which skin this becomes, and how closely to follow a board that is
someone else's brand identity, not Vlad's own material — a real Pillar 3 tension, flagged to Vlad
directly before proceeding. Vlad's answers: redirect the existing `heritage` skin (not add a third),
and lean on both the reference's structure *and* its visual language, not structure alone.

Separately, this substantially resolves `ME_Skin.md`/DR-018's previously-open "desk scene" concept
(phone-stays, clipboard-for-responsibilities, header mapping) — but through Tier 3 (real DOM/CSS
component slots) rather than Tier 4 (a single baked illustration), sidestepping every risk DR-018
named for Tier 4: no fixed-image legibility problem (text sits on a real DOM "paper" surface), no
responsive dead-end, no coarse regenerate-the-whole-image iteration unit.

**Decision:**
1. **Heritage's identity is replaced, not extended.** DR-014's Castellum/Crown-of-Thrones-derived
   parchment palette and embossed-panel shape are superseded — that prior direction's *mechanism
   learnings* (Tier 2 gotchas, the Tier 3 pattern itself, the `--role-*` aliasing rule) remain valid
   and are reused; its *visual outcome* is not. New palette values are original hex, in the same
   warm-paper/burnt-orange/navy family the reference evokes, not color-matched to it. The
   clipboard's own paper text uses a new handwriting register (`--font-hand`, defaults to
   `--font-body`, heritage overrides it to `Kalam`) — Vlad's own notes, not the reference board's
   brand typeface. Named guardrail against `ANTI_PATTERNS.md`'s "Genre-Assembly in Disguise" (a
   previously-rejected direction that combined a similar warm cream/coral palette with a flat
   editorial layout + lens-tab UI): this stays in heritage's already-accepted thick-border/embossed/
   tactile execution register rather than flattening into that rejected editorial-minimal look.
2. **`header` + `responsibilities` merge into one clipboard object.** `ResponsibilitiesSlotProps`
   (`ports.ts`) gains optional `title`/`icon`/`startDate`/`endDate` — additive, mirrors the
   `accentToken` precedent from DR-013, doesn't affect Bauhaus. Heritage's `header` slot adapter
   becomes a no-op (`skins/heritage/BentoHeader.tsx`, returns `null`) since its content now lives on
   the clipboard paper — the first heritage adapter for a slot that intentionally renders empty; a
   skin absorbing one slot's content into another is now a documented Tier 3 pattern, not a one-off.
3. **Tabs paginate the existing responsibilities list, not audience lenses.** DR-001 originally
   conceived notebook-style tabs as a producer/designer/economy lens switch, but that content was
   never authored — `portfolio.json` has one flat `responsibilities` array per project. Building
   real lens-switching now would mean fabricating placeholder content, which the Golden Rules
   forbid. Vlad confirmed this pass paginates the existing list instead (chunks of 3, tabs only
   rendered when there's more than one page) — real interaction, not lens-switching. True lens
   content stays a later, data-authoring-first follow-up.
4. **First real application of DR-017's shadow-bracket fix.** `--depth-style: embossed` was
   documented since DR-017 as silently inert through the `.shadow-raised`/`.shadow-sunken` Tailwind
   utility classes. The clipboard consumes `--shadow-raised`/`--shadow-sunken` via Tailwind's
   arbitrary-value bracket syntax (`shadow-[var(--shadow-raised)]`) instead, which does compile to
   a live reference — verified via `getComputedStyle`, not a screenshot, per DR-012/DR-017's own
   stated lesson. Scoped to this component only, not a sitewide retrofit.
5. **New gotcha found and fixed, worth its own line:** the same arbitrary-bracket approach was
   first tried for `--font-hand` (`font-[family-name:var(--font-hand)]`) and silently lost to the
   `Text` atom's own default `font-body` utility class — both are single, equal-specificity
   classes, and Tailwind's generated stylesheet order decided the winner, not source order in
   `className`. Fixed with an inline `style={{ fontFamily: 'var(--font-hand)' }}` instead, which
   reliably beats any utility class — the same idiom `Panel.tsx` already uses for `accentToken`.
   The bracket-arbitrary fix from point 4 above still holds for `shadow-*`/`border-*` because
   nothing else in this component's class list competes for the same CSS property; `font-family`
   did have a competitor. Worth remembering as a real distinction, not assuming every arbitrary
   bracket override is automatically safe.

**Consequences:** Positive — the clipboard is a real, verified Tier 3 adapter pair change
(`BentoHeader` no-op + `BentoResponsibilities` rewrite), confirmed via live render, `getComputedStyle`
on the embossed shadow and `--font-hand`, and click-through pagination; Bauhaus confirmed pixel-
unaffected. `ME_Skin.md` is marked superseded (kept as historical record and as the Tier 4
mechanism's documentation, not deleted — Tier 4 remains a real, still-unbuilt alternative for a
future fully-illustrated attempt). Negative, named directly: `skills` and `achievement` are left on
their existing DR-016-era adapters this pass — same honest-partial-state precedent DR-016 set for
itself, not a hidden gap. The Pillar-3 tension named at the start of this decision is a conscious,
Vlad-directed trade, not a resolved one — worth a second look once the clipboard is seen next to
the rest of the site's content, not assumed settled by this entry alone.

**Confirmed (2026-07-21, live review):** Vlad's reaction on seeing the clipboard rendered live was
unambiguous strong positive ("we have a winner... i think we finally found our seed") — the
Pillar-3 tension flagged above is resolved in practice, not just traded off on paper. This is the
first direction across the whole documented history in `ANTI_PATTERNS.md`/`LESSONS.md` to get this
reaction; worth treating as the actual answer to Pillar 3's standing "is this genuinely his voice"
question, not just another data point. Next natural steps, not yet started: mapping `skills`/
`achievement` onto the same desk/clipboard language, and deciding whether this direction should
become the site's default rather than staying a second option next to Bauhaus — both open, not
decided by this note.

---

## DR-020 — Sticky notes lose their gloss (paper stays flat, gloss stays reserved for hardware); color-mix() retired site-wide
**Status:** Accepted · **Date:** 2026-07-23

**Context:** A friend Vlad sent the live link to reported the heritage skin's sticky notes not
rendering at all on an older laptop's Chrome — everything else (clipboard, wood desk, binder clip)
was fine. Root cause: `StickyNote`'s background came from a `linear-gradient()` built with CSS
`color-mix()` calls, set as an inline style. `color-mix()` only shipped in Chrome 111 (Mar 2023);
an older/un-updated Chrome doesn't degrade it gracefully — an unparseable value invalidates the
*entire* declaration it's part of, so the note's whole background silently disappeared (icon and
skill-name text, which don't depend on it, still rendered — which is exactly what made it look like
"only the sticky notes" broke). The same `color-mix()` pattern turned out to be used in two more
places (`BentoResponsibilities.tsx`'s binder-clip gloss, `index.css`'s body dot-texture toggle) —
same latent risk, just less visually obvious than a note's entire face going blank.

Separately, fixing the notes' gloss prompted the actual design question: Vlad wants a flatter,
more "vector"/cartoony aesthetic going forward, gradients used deliberately rather than by default,
with the existing glossy top-light/bottom-dark treatment (`GLOSS_LIGHTEN_PCT`/`GLOSS_DARKEN_PCT`,
originally introduced as a reusable standard — see DR from the initial heritage pass) reserved for
specific elements rather than applied wherever a "make it feel considered" opportunity came up.

**Decision:**
1. **Material is the line, not "which elements happen to have it already."** Hard/molded surfaces
   (the clipboard's binder clip) keep the glossy treatment — a light source bouncing off a
   manufactured object is the correct read. Paper (sticky notes, the clipboard's board/front/back
   sheets) is matte and flat — a single solid color, no gradient. This aligns the sticky notes with
   paper elements that were *already* flat (the clipboard's paper sheets get their depth from
   `--shadow-raised`'s inset highlight, not gloss) — the notes were the one paper surface that had
   drifted onto the hardware treatment, not a new rule invented from nothing.
2. **`color-mix()` is retired from the codebase entirely, not just patched where it broke.** Three
   different fixes, one per call site, because each had a different constraint:
   - `BentoSkills.tsx`'s fold-flap darker tone (a real structural need — the "back of the folded
     paper" has to read as a different shade — not decorative gloss, so it couldn't just be
     deleted): replaced with a plain-JS `rgbMix()` helper. `color-mix(in srgb, hex 100%, toward W%)`
     reduces to a plain weighted average when the percentages don't sum to 100% (CSS scales both
     down proportionally to normalize them) — `rgbMix` does that arithmetic directly and emits a
     static `rgb()` string, which every browser can parse.
   - `BentoResponsibilities.tsx`'s binder clip: `rgbMix` doesn't apply here, because the base color
     is a CSS custom property (`--role-responsibilities-accent`) resolved by the cascade, not a
     value JS ever sees. Fixed by rendering the gloss as a second, fully translucent copy of the
     same SVG path on top of the flat-filled base, using gradient stop-*opacity* (white → transparent
     → black) instead of stop-*color*. Alpha-compositing a translucent layer over an opaque base is
     mathematically identical to color-mixing toward that same tint by the same percentage (both
     reduce to `base*(1-p) + tint*p`), so this reproduces the exact prior visual, over any accent
     color, without ever needing to resolve it.
   - `index.css`'s dot-texture toggle (`--motif-dot-texture`, Tier 2, `Skin_System.md`): was using
     `color-mix()` to fade the dot color's alpha to 0. Replaced with `calc()` scaling the dot's own
     *radius* to 0 instead of its alpha — same on/off result, pure `calc()` on a length, no color
     function involved at all. Strictly safer than the mechanism it replaced, not just a same-risk
     swap, and keeps Tier 2's existing "CSS-only, zero JS/component involvement" constraint intact.

**Consequences:** Positive — the reported bug is fixed, the same latent risk is fully retired (not
just patched at the one spot that got noticed), and there's now a stated material rule
("hard/molded → gloss, paper → flat") for whoever builds the next skin, rather than gloss spreading
by precedent-following alone. Negative/named directly: this is a narrower rule than "no gradients
anywhere" — box-shadow-based depth (`--shadow-raised`/`--shadow-sunken`, the drop-shadows under
folded/torn paper) is untouched and still very much a gradient-adjacent effect in spirit (a light-
to-dark falloff), just implemented as a shadow rather than a fill; if the "vector/cartoony" direction
is meant to extend to shadow treatment too, that's a separate, larger conversation not resolved here.

---

## Open

- **Is Pinterest taste the same as professional signal?** Not yet separated — worth explicitly checking new directions against both lenses rather than conflating them.
- **Does a Tier 3 slot implementation need its own extraction/authoring process, parallel to `Style_Extraction.md`?** (DR-015) That document's process (read references against the token schema, separate cross-reference constants from single-reference genre) was written for filling in Tier 1/2 values, not for authoring a new component's DOM structure — a materially more expensive kind of work with different failure modes (a bad shape can't be caught by `getComputedStyle` the way a bad token value can). Revisit once a real second slot implementation has actually been built, not speculatively now.
- **How do `skills`/`achievement` map onto the clipboard/desk concept?** (DR-019) Left on their DR-016-era heritage/Bauhaus-fallback shapes this pass — undecided how (or whether) they become desk objects too.
- **Does true audience-lens tab-switching ever get built?** (DR-001, DR-019) Blocked on real per-lens content authored into `portfolio.json` — not a mechanism question anymore, a content-authoring one.
- **Does the desk scene draw its own phone, or leave the frame to `BentoVideoFrame`?** (DR-018) Moot for the Tier 3 clipboard build (the phone was never redrawn), but still open if a future fully-illustrated Tier 4 attempt is ever made.
