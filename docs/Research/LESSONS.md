# Lessons — Working Method

Meta-lessons about *how* to collaborate on this project's design work well, distilled from five rounds of visual exploration that didn't converge. Read before generating any new visual attempt or planning the next round of design work. See [ANTI_PATTERNS.md](./ANTI_PATTERNS.md) for the concrete rejected directions these lessons came from.

---

## 1. Don't generate before deciding
Five rounds of "generate a finished-fidelity mockup → Vlad says not me → slightly narrow → repeat" did not converge. That loop only works when there's a real target to triangulate toward. When it doesn't converge after 2-3 rounds, stop generating and go back to defining the target — more attempts in the same undefined space cost trust without adding information.

## 2. Ground the voice in Vlad's own material, not borrowed references
Every direction tried — Pinterest moodboard styles, "safe professional" genres, isometric scenes — was a fully-formed genre borrowed from somewhere else, assembled competently but not derived from Vlad specifically. The strongest unexplored lead: Vlad's own 20 years of shipped games (hyper-casual through midcore) — their actual UI, art direction, marketing material — has never been used as reference material. That's the highest-value next input, ahead of any further style generation. See DECISIONS.md's Open section.

## 3. Separate taste from professional signal
What Vlad is personally drawn to (Pinterest saves, aesthetic preferences) and what will read as credible/senior to a non-technical recruiter are not automatically the same thing. Both matter, but conflating them risks defending personal preference as if it were a communication decision. Check new directions against both lenses explicitly.

## 4. Name conflicting goals explicitly instead of letting them fight silently
"Ship an MVP fast" and "build something bespoke/immersive with real bespoke illustration" are in direct tension. Naming it (rather than letting it fight silently) is what let it actually get resolved — see DR-006.

## 5. Know the technical ceiling of the tool being used
Hand-coded SVG isometric illustration has a confirmed ceiling (see ANTI_PATTERNS.md's Cardboard-Cutout Ceiling). If any illustrated-scene direction returns, it needs a real illustration asset — not more hand-built primitive shapes. This generalizes: before iterating on a technique's *styling*, confirm the technique itself can reach the required quality bar at all.

## 6. "Voice" doesn't have to mean "one big metaphor"
Every early attempt assumed the site needs a single unifying concept (a desk, a game world, a diagram-language). That was an assumption, not a confirmed requirement. Resolved by DR-007: the architecture keeps both paths open rather than forcing the choice before it's been tested.

## 7. A confirmed structural decision can still carry visual risk — track the risk, don't re-litigate the decision
The skill tree's *organizing logic* (filterable, tree-structured) was confirmed early (DR-003) while its *visual execution* carried a real risk of repeating the original "childish" complaint. That risk was raised, tracked, and ultimately resolved by an explicit, firm decision (DR-008) rather than avoided by quietly picking the safer option. Once a decision like that is made explicitly, don't reopen it — carry the risk it named forward into execution instead (in this case: the mitigation moved entirely to skin-level restraint, not component-level avoidance).

## 8. Track decisions by status, continuously
A running decisions log (DECISIONS.md) with explicit status — accepted / rejected / superseded / open — prevents re-litigating settled points and prevents overstating things as decided that were only discussed. Keep it updated as the source of truth rather than relying on conversational memory.
