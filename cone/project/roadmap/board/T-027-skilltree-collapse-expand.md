---
type: Task
title: "T-027: Progressive-disclosure collapse/expand for the SkillTree's deep layers"
description: "Only depth-0 root skills shown by default, every deeper layer collapses (one layer revealed per selection) with a staggered draw-in/retract animation. Category badges (DESIGN/PRODUCTION/LEADERSHIP) are now selectable too, showing a discipline-level description."
status: done
priority: medium
tags: [roadmap, task, skilltree, animation]
timestamp: 2026-08-24T00:00:00Z
---

# T-027: Progressive-disclosure collapse/expand for the SkillTree's deep layers

## Context

A friend testing the portfolio flagged the SkillTree as cluttered/overwhelming — every skill at
every depth (up to 4 layers) renders simultaneously. User agreed and asked for progressive
disclosure: show only the first 2 layers (root + its direct children) by default, collapse
everything deeper, and reveal a branch's deep layers only when a skill within it is selected —
retracting whenever a different skill is selected, so only one branch is ever open at a time.
Also asked for a real animation (connector lines extending/retracting, pills appearing staggered),
not an instant show/hide.

Chatted through feasibility first (see conversation) before writing code: confirmed the existing
stack (`motion/react`, already a dependency; `computeLayout`'s existing depth-based column layout)
was sufficient — no new library or rewrite needed. `AnimatePresence` was already used elsewhere in
this codebase (`SkillDetailsPanel.tsx`, `BentoResponsibilities.tsx`), and the tree already had a
proven "line draws itself in" mechanism (`motion.path` + `pathLength`, used for the active-path
neon highlight) to build on rather than invent from scratch.

## Acceptance Criteria

- [x] Depth 0/1 skills always visible; depth 2/3 collapse by default
- [x] Selecting a skill reveals only its DIRECT children (one layer at a time) — selecting a
      layer-2 skill opens layer 3, not layer 4 too; layer 4 needs its own layer-3 skill selected
- [x] Selecting a sibling within an already-open branch does NOT collapse what's already open —
      only selecting a skill outside the currently open branch collapses it and starts fresh.
      Still globally exclusive across all 3 category trees: any selection outside the current
      branch's subtree (including switching category entirely) collapses it
- [x] Connector lines draw in/retract (not instant), pills appear/disappear staggered by depth,
      sequenced so on expand the line reaches a pill before it appears, and on collapse the pill
      fades before its line retracts
- [x] Pill screen positions never reflow when branches expand/collapse (same static
      module-load-computed `LAYOUTS` coordinates as before — only mount/unmount, not layout,
      changes) — deliberately simpler than making the canvas visually shrink, which the user
      concluded wasn't actually necessary once we talked through it
- [x] `tsc --noEmit` and `npm run build` clean

## Notes

**2026-08-24 — revised to a set-based accumulate/reset model.** First pass (see below) expanded a
selected skill's WHOLE descendant subtree at once and collapsed everything else on any new
selection. User refined the requirement after seeing the design: (1) expansion should reveal only
one layer at a time — selecting a layer-2 skill opens layer 3 only, not layer 4 too; (2) selecting
a sibling within an already-open branch shouldn't collapse what's already open, only a selection
genuinely outside that branch should.

This meant `expandedSkill: Skill | null` (single value) couldn't work — replaced with
`expandedSkillIds: Set<string>` throughout (`useSkillTreeState.ts`, `SkillTree.tsx`,
`TreeCanvasProps`). Two new pure functions in `skillTreeGeometry.ts`:

- `getVisibleSkillIds(category, expandedSkillIds)`: rewritten as a top-down BFS from the
  depth-0/1 baseline — a node's children are only revealed if the node ITSELF is both currently
  visible AND present in `expandedSkillIds`. This single rule gives one-layer-at-a-time reveal for
  free (a grandchild needs its own parent separately added to the set, not just an ancestor
  present) and automatic cascade-collapse (removing a skill from the set makes everything only
  reachable through it unreachable in the same BFS pass, with zero explicit cleanup needed).
- `getNextExpandedSkillIds(expandedSkillIds, skill)`: the accumulate-vs-reset decision on each
  click. Already-expanded → remove just it (toggle-off). Not expanded, but a descendant of (or
  equal to) the current branch's ROOT (the shallowest member of the set) → add it, leaving
  siblings/everything else open. Not expanded and outside that subtree (or nothing open yet) →
  reset the whole set to just the clicked skill. Checking against the branch ROOT specifically
  (not any arbitrary member) matters — checking against a deeper sibling would wrongly read a
  same-parent sibling as "outside."

Traced this by hand against the exact scenario in the request (game-design → 4 layer-3 children;
select level-design → only balancing appears, siblings stay closed at layer 4; select economy-design
→ monetization ALSO appears, balancing stays visible; toggle level-design back off → only balancing
collapses, its own pill and economy-design's monetization stay visible; select research → the whole
game-design branch collapses, since research isn't inside it) — confirmed correct against every
case discussed, including the cross-category case (switching from a leadership selection to a
design one always resets, never accumulates across categories).

One known, deliberately-unaddressed edge case: if a user drills 2 levels into a branch (e.g. an
"L3→L4" chain), then collapses the L3 entry, the (now-unreachable) L4 entry stays as inert data in
the stored Set rather than being pruned. Harmless with the current data (every current L4/layer-4
skill is a leaf — there's no L5 to accidentally resurrect), and re-expanding the L3 entry later
would just make that old L4 entry visible again without a fresh click, which reads as reasonable
"remembers where you left off" behavior rather than a bug — not adding pruning logic for a
5-layer scenario that doesn't exist in this data. Revisit only if a 5th layer is ever added.

Everything else from the first pass carries over unchanged: `getLinkRevealTiming`'s BFS-from-anchor
timing computation doesn't care how `expandedSkillIds` was derived, only that the visible link set
is a connected tree rooted at the anchor (still always true); the `AnimatePresence`
draw-in/retract wiring in `TreeCanvasProps`/`SkillTreeConnections.tsx`; the `activeSkill` /
`expandedSkillIds` split in `useSkillTreeState.ts` (still needed for the same reason — a root's
default pre-selection for the details panel shouldn't drive tree expansion); the pill-fades-then-
line-retracts collapse sequencing via `PILL_EXIT_DURATION`; and the decision not to reactively
resize the canvas on collapse (pill positions stay the same static `LAYOUTS` coordinates
throughout).

**Not verified live.** Both Playwright (removed earlier this session, per user request — see
`cone/project/memory/PLAYBOOK.md`) and `mcp__claude-in-chrome__*` (broken all session, see
[T-025](./T-025-cursor-gaze-broken-handoff.md)) were unavailable, so this shipped on `tsc --noEmit`
+ `npm run build` + a manual hand-trace through every scenario in the request — no actual
screenshot/interaction check. Worth the user's own eyes before treating this as fully confirmed
working, more so than most of this session's changes given how much real branching logic is here.

**2026-08-24 (later same day) — tighter default + category badges selectable.** Two further
requests:

1. Default visibility tightened from "depth 0 and 1 always shown" to "only depth 0" —
   `isDefaultVisibleDepth` now `depth < 1`. Verified by hand-trace that no other logic needed to
   change: `getVisibleSkillIds`/`getNextExpandedSkillIds` were already written generically around
   whatever counts as "baseline," and `getActivePathOrder`/PASS 3/4's highlight-chain lookup still
   resolves correctly because a skill can only ever become `activeSkill` by being clicked, which
   requires it (and by the BFS invariant, its whole ancestor chain) to already be visible —
   confirmed this holds all the way from a depth-0 click down to a depth-3 one.
2. The 3 category badges (DESIGN/PRODUCTION/LEADERSHIP, rendered in `SkillTree.tsx` outside
   `TreeCanvas` entirely — they aren't `Skill` graph nodes) are now real, clickable `<button>`s.
   Added `description` to `CategoryConfig` (`skillTreeTypes.ts`) with one paragraph per discipline,
   written in the same voice as individual skill descriptions but at the "whole discipline" altitude
   rather than fabricating a proficiency/years/projects value that wouldn't mean anything at that
   level. Modeled as a genuinely separate `activeCategory: SkillCategory | null` state in
   `useSkillTreeState.ts` — not shoehorned into the `Skill` type or the `SKILLS` graph, since a
   category isn't a descendant/ancestor of anything and doesn't need to participate in
   `getVisibleSkillIds`'s reachability walk. Mutually exclusive with `activeSkill` in both
   directions (selecting one clears the other); selecting a category always fully collapses
   `expandedSkillIds`, since a category has no "inside vs. outside the branch" relationship to
   check against. `SkillDetailsPanel` gained a third render branch (alongside "empty" and "skill
   selected") for both skins, showing just the label + description — deliberately omitting the
   stars/mastery-bars/photo chrome that only makes sense for an individual skill.

Same verification caveat as above — `tsc --noEmit` + `npm run build` clean, hand-traced, not
visually confirmed.
