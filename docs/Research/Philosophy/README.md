# Philosophy

The whiteboard. This folder holds the standing creative/directional ideas for the portfolio — the ones that are real and load-bearing but aren't a single resolved decision (`DECISIONS.md`) or a rejected direction (`ANTI_PATTERNS.md`). They're more foundational than either: recurring principles a decision or a section design gets checked against, and they're expected to keep growing and getting elaborated over time, not to reach a final "done" state the way an ADR does.

**Why this exists:** these ideas already existed, just scattered across `DECISIONS.md` entries, `LESSONS.md` notes, and separate design docs (`docs/Design/SkillTree_Proposal.md`, `docs/DESIGN.md`) with no single place that named them as *ongoing pillars* rather than one-off resolutions. This folder is that place.

## Structure

- **`PILLARS.md`** — the site-wide pillars. Read this first; every section's philosophy should trace back to one or more of these.
- **One file per section**, added when that section has a real, elaborated creative direction worth capturing — not scaffolded in advance for sections that don't have one yet. Currently: `Hero.md`. `SkillTree.md` exists too, but mostly as a pointer — its actual design detail already lives in `docs/Design/SkillTree_Proposal.md`, DR-003, and DR-008; duplicating it here would just create a second copy to keep in sync. `ME_Skin.md` — the project-card region's "desk scene" concept (DR-018); superseded 2026-07-21 (DR-019), which built the concept as the `heritage` skin via Tier 3 rather than this document's Tier 4 — kept as historical record and as Tier 4's mechanism doc.

## Relationship to the rest of `docs/Research/`

- **`PILLARS.md` and section files here** = standing principles and creative direction, evolving.
- **`DECISIONS.md`** = discrete, dated, accept/reject-status decisions — including the moment a pillar gets applied to a specific concrete choice.
- **`ANTI_PATTERNS.md`** = directions already tried and rejected — check new ideas against these before proposing them.
- **`LESSONS.md`** = process lessons about *how* to work on this project's design, not *what* the design should be.

If an idea here starts getting concrete enough to be a real yes/no choice with consequences, it graduates into a `DECISIONS.md` entry that cites the pillar it comes from — it doesn't replace the pillar, which stays here as the standing principle.
