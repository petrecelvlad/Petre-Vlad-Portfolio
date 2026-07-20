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

## Open

- **What does Vlad's own shipped work actually look like?** No reference used in this process so far has come from his own portfolio of real games — only Pinterest, Claude-generated options, or the designer's comments. Working theory: voice is more likely found in 20 years of actual shipped art/UI/marketing than in any borrowed genre. Deferred until after the parametric skin architecture is built (per session agreement 2026-07-20) — will inform the first real (non-throwaway) second skin.
- **Is Pinterest taste the same as professional signal?** Not yet separated — worth explicitly checking new directions against both lenses rather than conflating them.
