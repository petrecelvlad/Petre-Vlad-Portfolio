# Anti-Patterns — Rejected Visual Directions

Concrete, named failure patterns from this project's design history. Read this before proposing any new visual direction — the goal is to recognize a repeat of one of these shapes early, not to retry them with minor variation. See [DECISIONS.md](./DECISIONS.md) for the formal accept/reject record, [LESSONS.md](./LESSONS.md) for the process lessons these produced.

---

## The Kids'-App Stack
**What it looked like:** Rounded corners + saturated pastel palette (pink/purple/teal) + thick *uniform* outlines + toy-style flat icons + macOS traffic-light window dots, all stacked together.

**Why it fails:** No single choice in that stack is the problem in isolation. The combination reads as a kids'-app genre regardless of the underlying concept. This was v1, and the trigger for the entire rebuild — a trusted senior designer called it "childish, doesn't reflect seniority."

**Recognize it by:** if a new direction pastel-fies its palette *and* rounds every corner *and* uses uniform (not weighted/hierarchical) border widths *and* leans on toy/mascot iconography — even if each choice seems reasonable alone — stop and check against this pattern before proceeding.

---

## Competent-but-Borrowed Genre
**What it looked like:** Three "safe professional" full mockups (dark studio-tool à la Linear/Figma, editorial minimal à la Jenova Chen, strict Swiss/grid typographic system) — each technically well executed.

**Why it fails:** Rejected as "bland... generic standard templates... boring" *despite* competent execution, because each was assembled from a known-good existing genre rather than derived from Vlad's own career material. Competent-but-generic is not a fix for childish — both are voice failures in different directions.

**Recognize it by:** if a direction can be described purely by naming an existing product/genre it resembles ("like Linear," "like a SaaS landing page," "like an RPG HUD") with nothing added that's specific to Vlad's own 20 years, it's this pattern regardless of polish level.

---

## Borrowed Moodboard, Not Derived Voice
**What it looked like:** Six Pinterest reference images spanning isometric/architectural line-art, node/workflow diagrams, retro-arcade/pixel/CRT, 3D clay mascot UI, and pixel-art RPG HUD.

**Why it fails:** Each image is a fully-formed genre borrowed from somewhere else. The designer had already seen these and said "keep exploring" — none of them fit as a set, for the same underlying reason as the previous two patterns. Useful salvage: the underlying *pulls* (architectural precision, diegetic/immersive UI feel, tactile warm rendering) are worth keeping even though the source genres were rejected wholesale.

**Recognize it by:** distinguish "I like this specific quality (precision, warmth, immersion)" from "I like this genre (arcade, SaaS-diagram, mascot)." The former is salvageable signal; the latter is the trap.

---

## The Cardboard-Cutout Ceiling
**What it looked like:** Two attempts at hand-coded SVG isometric illustration — a full desk/room scene (~12 small primitive-built objects), then a tighter monitor close-up (5 larger objects, same technique).

**Why it fails:** This is a **technique ceiling**, not a taste mismatch. Small/detailed objects built from flat-shaded extruded-box SVG primitives cannot achieve real rendering quality (lighting, texture, "alive" feeling) no matter how palette or shading is adjusted. The second attempt even reduced object count and increased scale per Vlad's direction, and still failed — confirming it wasn't a composition problem either, on the first pass at least (the second pass's monitor-crop *concept* was separately flagged as wrong by Vlad, independent of render quality).

**Recognize it by:** if a proposed direction is "isometric illustration" and the intended build method is hand-coded SVG/canvas primitives (not a commissioned or AI-generated image asset), it will hit this ceiling regardless of how carefully it's composed. See DR-005.

---

## Genre-Assembly in Disguise
**What it looked like:** A flat editorial layout (warm cream/coral/teal, serif+sans pairing, lens-tab UI) with isometric icon accents scaled down to bullet-marker/skill-grid/trophy size — an explicit attempt to keep only the "good part" of isometric while dropping the failed room-scene concept.

**Why it fails:** "Still bad, bland and generic, soulless." This is the most important data point of the five rounds: it proves the failure mode was never isometric-as-a-technique specifically. Every one of the five attempts — safe-professional mockups, moodboard styles, isometric scenes, and this narrowed icon-accent version — was Claude assembling known-good patterns (isometric icon sets, editorial layouts, dashboard cards) rather than deriving something from Vlad's specific career material.

**Recognize it by:** the tell isn't the specific aesthetic choices, it's the *process* that produced them — a finished-fidelity mockup generated without first grounding it in Vlad's own shipped work. See LESSONS.md's "don't generate before deciding."
