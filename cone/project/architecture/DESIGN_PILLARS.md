# Pillars

The standing, site-wide principles every section's design gets checked against. This is a growing list — started 2026-07-21 with three, a fourth added the same day. None of these are "done"; they're the lens, not a checklist to tick off once.

---

## Pillar 1 — The Site Is Proof, Not Just a Container

The portfolio's own interface has to demonstrate Vlad's UI/UX design ability, not only describe his game design career as content. This isn't a generic "make it well-designed" aspiration — it's specific and falsifiable: `UI Design` and `Product Design` are literal nodes in his own skill tree (`docs/Design/SkillTree_Proposal.md`, DESIGN branch). If the site's craft doesn't hold up as a UI/UX portfolio piece in its own right, it's failing to represent a skill it explicitly claims he has, the same way it would be failing if it never mentioned Formula E High Voltage.

**What this means in practice:** every section is doing double duty — communicating career content, *and* being live evidence of design skill. A section can be content-accurate and still fail this pillar if it's executed with generic or careless UI/UX craft.

**Where this already shows up:** the entire premise of the parametric skin system (`docs/Architecture/design-system/Skin_System.md`) — building the site's own design system properly, not just styling pages ad hoc — is this pillar applied to the engineering layer. The UDS reconciliation (DR-009) noted the same self-referential idea independently (UDS's "the Showroom is itself an Instance" — the tool proves itself by being built from what it displays). Worth remembering that parallel, not reinventing it.

---

## Pillar 2 — Gamification

Some visual or interactive expression of "game-like environment" needs to run through the portfolio — not as a single feature, but as a recurring way of presenting content. **No full definition yet, and that's fine — this pillar is intentionally open,** tracked here specifically so it doesn't get lost or reinvented from scratch each time a new section comes up.

**Confirmed examples (already decided or in progress):**
- The **Skill Tree section** — skills are literally rendered as a branching game skill tree with nodes, connectors, and proficiency indicators (`docs/Design/SkillTree_Proposal.md`; the visual chrome is non-negotiable per DR-008 — see the constraint note below).
- The **Hero banner's collectible-card concept** (`Hero.md`) — presenting Vlad himself as a stylized game character on a stat card, not a photo.

**The constraint this pillar operates under, not despite:** DR-008 and `ANTI_PATTERNS.md`'s "Kids'-App Stack" pattern are the record of what happens when gamification is executed as loud, toy-genre visual chrome (arcade glow, bouncy toy icons, pastel saturation) — that's the exact thing that got v1 called childish and triggered this whole rebuild. Gamification here means the *structure and interaction* being game-like (a tree, a stat card, proficiency meters), realized through the Bauhaus skin's restrained, high-craft execution — not a genre reskin. Every new gamification idea gets checked against both readings before it ships: is this the organizing logic (fine, usually the actual valuable part) or the literal visual genre (the risk)?

---

## Pillar 3 — The Style Has to Be *His*

The visual identity has to read as demonstrably Vlad's own, not an assembled or borrowed genre — inspiration from existing styles is fine, even expected, but it has to get blended or reworked until it stops reading as "that genre" and starts reading as his. This is not a new problem being introduced here — it's the exact, still-unresolved core of everything in `ANTI_PATTERNS.md` and `LESSONS.md`, now named explicitly as a standing pillar instead of only existing as the lesson learned from five rejected rounds.

**Two live paths, not yet chosen between:**
1. Blend multiple existing references until the combination itself feels original.
2. Build something together, grounded in Vlad's own shipped work (`DECISIONS.md`'s Open section — pulling reference from his actual 20-year portfolio remains the single highest-value unused input, per `LESSONS.md` #2).

**Don't re-litigate:** this pillar doesn't resolve the visual-voice question — it just formally elevates it from "the thing five attempts failed at" to "the standing bar every new visual proposal is measured against," including the Hero card concept and any future skin.

---

## Pillar 4 — The Codebase Itself Is Proof

If this repository — the source code, the architecture, the docs, the commit/decision history, not just the rendered site — ever becomes public, it needs to hold up as evidence of Vlad's architectural and engineering practice, the same way Pillar 1 requires the rendered UI to hold up as evidence of his design practice. This is Pillar 1's counterpart at the code layer, not a restatement of it: Pillar 1 governs what a recruiter *sees*; this pillar governs what an engineer or technical hiring manager finds if they *open the repo*.

**What this means in practice:** architectural decisions need real rationale, not just working code — the same standard already being held to by requiring an ADR to name a genuine trade-off, not just document a choice (`DECISIONS.md`'s own "Should This Be an ADR?" gate). Structure needs to be legible to a stranger, not just functional for an agent that already has full context. Docs need to be accurate and current, not aspirational — the standing rule already in place after the Token Contract was found stale against real `index.css` twice in one session. None of this is a new bar being introduced; it's naming the bar that `docs/Architecture/`, the hexagonal boundaries, and this session's whole parametric-skin effort were already being held to, so future work keeps being held to it deliberately rather than by accident.

**Where this already shows up:** the entire `docs/Architecture/` tree (hexagonal core/ports/adapters, the Leak Test, the parametric token contract, the Skin System's documented sequencing plan) is this pillar already in motion — not retroactively, it predates this pillar being named. The selective, reasoned adoption of `cone-lite` and the rejection of the UDS taxonomy (DR-009) are also this pillar in action: evaluating external frameworks on their merits and documenting *why* one got adopted and the other didn't, rather than either cargo-culting a framework or refusing to look at one.

**Tension worth naming, not resolving here:** this pillar pulls toward rigor and completeness; DR-006 (lean now, deepen later) pulls toward shipping fast and not over-building. They're not actually in conflict — a lean MVP with honestly-documented gaps and clearly-scoped decisions is *better* engineering evidence than a fully "complete" system with undocumented shortcuts — but it's worth being explicit that "reflects real practice" does not mean "gold-plate everything before shipping." Real engineering judgment includes knowing what to leave for later and saying so, not just knowing how to build more.

---

## How pillars interact

These aren't independent — most real design decisions sit at the intersection of at least two. The Hero banner's collectible-card idea is a good example: it's Pillar 2 (gamification — presenting himself as a game character with stats) executed in a way that's supposed to satisfy Pillar 3 (a bespoke, stylized character, not a stock avatar or borrowed mascot genre) while the card's own craft needs to hold up under Pillar 1 (it's the first thing a recruiter's UI/UX judgment lands on). When a new idea only satisfies one pillar and actively works against another, that tension is worth naming explicitly before building — not discovering it after, the way the original v1 rebuild had to.
