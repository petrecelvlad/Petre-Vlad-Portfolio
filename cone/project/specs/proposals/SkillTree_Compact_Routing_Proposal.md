# Skill Tree — Compact Column Routing Proposal

> **Status:** Proposal — not implemented. Diagrams only, no code.
> **Problem:** the tree no longer fits its panel now that branches are deep/leaf-heavy. The current fix (`ScaledTreeContainer`/`ScaledTreeRow`) uniformly shrinks pills to compensate — which works but degrades legibility as more skills get added.
> **This proposal:** don't shrink pills. Change how nodes are *positioned* and how connector lines are *routed*, so vertical space is spent on real content instead of proportional spreading.

---

## The mechanism, in one line

Today (`skillTreeGeometry.ts`, via `d3.tree()`): a parent's vertical position is the **mean of its children's positions**, and the whole branch's height is the **total number of leaves**, because every leaf gets its own dedicated row all the way up the tree.

Proposed: a parent sits at the **top of its own fan**, not centered in it. A column's height is **its own node count**, nothing else. Connector lines do the work of reaching down to children that are no longer near the parent's row — they already bend today (the elbow-pipe rendering exists), they just need to travel farther when packing makes that necessary.

Pill size, pill art, and the elbow-connector rendering style are all unchanged. Only the row math (where a node's `screenTop` comes from) and the resulting line lengths change.

---

## BEFORE — today's mechanism (schematic)

Leaves force rows all the way up the tree. A parent with 4 children spreads across all 4 of their rows and sits at the *mean* — pulling itself (and everything above it) toward whatever the bushiest descendant needs.

```
one leaf  = one mandatory row, no exceptions, all the way up the tree

ROOT ───────┬── branch A ──────┬── leaf
            │   (centered on   ├── leaf
            │    its 4 leaves) ├── leaf
            │                  └── leaf
            │
            └── branch B ──────┬── leaf
                (centered on   └── leaf
                 its 2 leaves)

total height = 4 + 2 = 6 rows, and BOTH "ROOT" and "branch A" get
pulled toward the vertical middle of whatever's below them — dead
space above and below them that exists only to keep them "centered"
```

This is exactly why DESIGN (9 leaves across its branches) needs ~9 rows of height today, even though its *actual* depth is only 3–4 levels — leaf count, not depth, is what's eating the panel.

---

## AFTER — packed columns, routed lines

### Worked example 1 — the Game Design lineage

Real nodes, real names, from the current tree. `System Design` and `Game Design` sit on **one row each, pinned to the top** of their own column — not centered. One trunk line leaves Game Design and branches off at whichever row it needs to reach.

```
[System Design   ]───[Game Design     ]─┬─[Level Design    ]───[Balancing       ]
                                         ├─[Economy Design  ]───[Monetization    ]
                                         ├─[Gamification    ]
                                         └─[Meta Core Loops ]
```

Reading it: Game Design → Level Design is a same-row direct line (cheap). Game Design → Meta Core Loops is a 3-row bend (the trunk drops through the gutter, branches right when it reaches the target's row). Level Design → Balancing and Economy Design → Monetization are both same-row, direct, because their target happens to land next to them once things are packed.

### Worked example 2 — the Layout Design lineage (same mechanism, separate branch)

```
[Layout Design   ]─┬─[UI Design      ]
                    ├─[UX Design      ]───[FTUE & Onboarding]
                    └─[Design Systems ]
```

Same trunk-and-branch pattern. UX Design → FTUE & Onboarding stays same-row/direct because FTUE was placed next to its actual parent instead of being forced into a globally-proportional slot.

### How the two lineages stack under System Design

```
                    ┌── Game Design ──── (4 children, worked example 1)
[System Design]─────┤
                    └── Layout Design ── (3 children, worked example 2)

[Prototyping]   ← its own root, no children, one row, done
[Research]      ← its own root, no children, one row, done
```

`Prototyping` and `Research` are the other two DESIGN roots (the multi-root anchor work from earlier in this project) — they just occupy their own single row each in column 0, at zero extra cost, instead of forcing extra vertical spread the way a leaf normally would today.

---

## The aggregate payoff — full DESIGN category

```
DESIGN today:    9 leaves  →  9 rows of forced height
DESIGN packed:   height = size of the SINGLE busiest column

  col0 (roots)              ▓▓▓            3
  col1 (Game/Layout Design) ▓▓             2
  col2 (7 nodes)            ▓▓▓▓▓▓▓        7   ← this sets the height now
  col3 (3 nodes)            ▓▓▓            3

  height = 7 rows, not 9
```

The part that matters for the future, not just today: col1 and col3 have headroom (2 and 3 rows against col2's 7). **Adding more skills there costs nothing** until they catch up to col2. Today, every single leaf anywhere in the branch adds a row to the *entire* branch, permanently. This is the difference between a layout that degrades every time we grow it, and one that mostly doesn't.

---

## What this does NOT change

- Pill size, border, icon, proficiency dots — identical to today.
- The elbow-connector rendering style (thick casing + dashed inner channel + active-path glow passes) — same art, just longer paths sometimes.
- The multi-root anchor mechanism (`computeLayout`'s invisible junction node) — this proposal layers on top of it, doesn't replace it.
- Category badges, the detail panel, skin theming — untouched.

## What would actually change (for a future implementation pass, not now)

- `skillTreeGeometry.ts`: replace `d3.tree()`'s mean-of-children positioning with column-packed row assignment (pack each depth's nodes tight, ordered near their parent's row where possible).
- Connector path generation: same `H → V → H` elbow primitive already in `SkillTreeConnections.tsx`, just fed different coordinates — the vertical run simply gets longer when a child's packed row is far from its parent's.
