# Skill Tree

Mostly a pointer — this section's actual design detail already exists elsewhere and duplicating it here would just create a second copy to keep in sync. This file exists so the section shows up in the Philosophy structure and to state, in one place, *why* it looks the way it does.

## Where the real content lives

- **Implementation-level design**: `docs/Design/SkillTree_Proposal.md` — the four-branch hierarchy, node/connector visual spec, data schema, interaction states. Already implemented; treat as descriptive of current behavior, not a pending proposal, despite its own "Proposal v2" header.
- **The non-negotiable constraint**: `DECISIONS.md` DR-008 — literal game-tree visual chrome (branches, nodes) is permanent across every skin, not organizational-only. Do not revisit without a real reason.
- **The organizing-logic decision**: `DECISIONS.md` DR-003.
- **The risk this constraint carries, and how it's mitigated**: `LESSONS.md` #7.

## Why it matters to Pillars.md

This section is the most literal execution of **Pillar 2 (Gamification)** on the site — skills are rendered *as* an actual game skill tree, not just organized like one. It's also a direct instance of **Pillar 1**: the tree's own interaction design (hover states, detail panel, proficiency indicators) is itself a UI/UX artifact, on top of being a vehicle for game-design content.
