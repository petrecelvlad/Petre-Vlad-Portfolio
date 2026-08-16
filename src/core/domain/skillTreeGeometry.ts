import { Skill, SkillCategory, SKILLS } from './skillTreeTypes';

export const PILL_W = 160;
export const PILL_H = 32;
export const GAP_X = 60;
export const GAP_Y = 10;

export const FLOW_SPEED_PX_PER_SEC = 1100;
export const MIN_SEGMENT_DURATION = 0.06;

export function segmentDuration(pixelLength: number): number {
  return Math.max(pixelLength / FLOW_SPEED_PX_PER_SEC, MIN_SEGMENT_DURATION);
}

export interface LayoutNode {
  skill: Skill;
  screenLeft: number;
  screenTop: number;
  depth: number;
}

export interface LayoutLink {
  sourceId: string;
  targetId: string;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  /** Where the elbow bends. Lane-separated per distinct source sharing a
   *  gutter — see the lane-assignment pass below — so two different
   *  branches' vertical runs never land on the same x and read as one line. */
  midX: number;
  sourceDepth: number;
  targetDepth: number;
}

export interface TreeLayout {
  nodes: LayoutNode[];
  links: LayoutLink[];
  canvasWidth: number;
  canvasHeight: number;
  rootTop: number;
}

const ANCHOR_PREFIX = '__root__';

/**
 * Compact column-packed layout (see docs/Design/SkillTree_Compact_Routing_Proposal.md).
 * Column = depth from the nearest null-parent ancestor, unchanged from before.
 *
 * Row assignment never uses more rows than the single busiest column needs
 * (the `ceiling`) — that's the true minimum height the category can ever
 * be — but WITHIN that budget, a node is free to sit wherever keeps its
 * connectors shortest, not just packed toward the top. `packColumn` is the
 * one place that enforces the ceiling; two passes feed it different
 * preferences:
 *
 *   pass 1 (top-down draft): align a node with its PARENT's row. Gives
 *   every node a valid, order-stable position and establishes each
 *   column's left-to-right sibling order for pass 2 to reuse.
 *
 *   pass 2 (bottom-up refine): re-align internal nodes with the mean of
 *   their OWN CHILDREN's (already-refined, deeper-column) rows instead —
 *   a parent with children spread far from its pass-1 position moves to
 *   sit near them, rather than staying pinned wherever pass 1 packed it
 *   next to its own parent. Leaves (no children) keep their pass-1 row,
 *   since there's nothing to refine toward. The deepest column is never
 *   revisited (nothing is deeper), so it stays exactly as pass 1 left it.
 */
function packColumn(idealRows: number[], ceiling: number): number[] {
  const n = idealRows.length;
  let nextFree = 0;
  return idealRows.map((idealRow, i) => {
    // Leave enough headroom below for the (n - 1 - i) nodes still to be
    // placed in this column, so the column as a whole never exceeds the
    // ceiling — the busiest column itself gets maxAllowedRow === i for
    // every node, i.e. forced back to plain compact packing, correctly.
    const maxAllowedRow = ceiling - n + i;
    const row = Math.min(Math.max(idealRow, nextFree), maxAllowedRow);
    nextFree = row + 1;
    return row;
  });
}

export function computeLayout(category: SkillCategory): TreeLayout {
  const skills = SKILLS.filter(s => s.category === category);
  const byId = new Map(skills.map(s => [s.id, s]));

  const depthOf = new Map<string, number>();
  function getDepth(skill: Skill): number {
    const cached = depthOf.get(skill.id);
    if (cached !== undefined) return cached;
    const d = skill.parent === null ? 0 : getDepth(byId.get(skill.parent)!) + 1;
    depthOf.set(skill.id, d);
    return d;
  }
  skills.forEach(getDepth);

  const maxDepth = Math.max(...skills.map(s => depthOf.get(s.id)!));

  const columnSizes = new Map<number, number>();
  skills.forEach(s => {
    const d = depthOf.get(s.id)!;
    columnSizes.set(d, (columnSizes.get(d) ?? 0) + 1);
  });
  const ceiling = Math.max(...columnSizes.values());

  const childrenOf = new Map<string, Skill[]>();
  skills.forEach(s => {
    if (s.parent === null) return;
    const arr = childrenOf.get(s.parent) ?? [];
    arr.push(s);
    childrenOf.set(s.parent, arr);
  });

  // Pass 1: top-down draft, also fixes each column's sibling order.
  const draftRowOf = new Map<string, number>();
  const columnOrder = new Map<number, Skill[]>();
  for (let d = 0; d <= maxDepth; d++) {
    const columnSkills = [...skills.filter(s => depthOf.get(s.id) === d)].sort(
      (a, b) => (a.parent ? draftRowOf.get(a.parent)! : 0) - (b.parent ? draftRowOf.get(b.parent)! : 0),
    );
    const idealRows = columnSkills.map(s => (s.parent ? draftRowOf.get(s.parent)! : 0));
    const rows = packColumn(idealRows, ceiling);
    columnSkills.forEach((s, i) => draftRowOf.set(s.id, rows[i]));
    columnOrder.set(d, columnSkills);
  }

  // Pass 2: bottom-up refine, deepest column first, reusing pass 1's order.
  const rowOf = new Map(draftRowOf);
  for (let d = maxDepth - 1; d >= 0; d--) {
    const columnSkills = columnOrder.get(d)!;
    const idealRows = columnSkills.map(s => {
      const kids = childrenOf.get(s.id);
      if (!kids || kids.length === 0) return draftRowOf.get(s.id)!;
      const mean = kids.reduce((sum, k) => sum + rowOf.get(k.id)!, 0) / kids.length;
      return Math.round(mean);
    });
    const rows = packColumn(idealRows, ceiling);
    columnSkills.forEach((s, i) => rowOf.set(s.id, rows[i]));
  }

  // The badge is treated as a real column before column 0 — every root
  // sits one full gutter (GAP_X) to the right of it, exactly like every
  // other parent/child pair, instead of butting up against it directly.
  const nodes: LayoutNode[] = skills.map(s => ({
    skill: s,
    screenLeft: GAP_X + depthOf.get(s.id)! * (PILL_W + GAP_X),
    screenTop: rowOf.get(s.id)! * (PILL_H + GAP_Y),
    depth: depthOf.get(s.id)!,
  }));
  const nodeById = new Map(nodes.map(n => [n.skill.id, n]));

  // Every bend sits at the exact horizontal midpoint of its gutter — one
  // consistent rule, so every branch point in the tree reads the same way.
  // This only stays unambiguous because pass 2 above already spreads
  // sibling branches' row-ranges apart (verified: no two sources sharing a
  // gutter ever end up with overlapping vertical spans); if that ever
  // stopped holding, two branches could visually merge again.
  const links: LayoutLink[] = skills
    .filter(s => s.parent !== null)
    .map(s => {
      const source = nodeById.get(s.parent!)!;
      const target = nodeById.get(s.id)!;
      const sx = source.screenLeft + PILL_W;
      const tx = target.screenLeft;
      return {
        sourceId: source.skill.id,
        targetId: target.skill.id,
        sx,
        sy: source.screenTop + PILL_H / 2,
        tx,
        ty: target.screenTop + PILL_H / 2,
        midX: (sx + tx) / 2,
        sourceDepth: source.depth,
        targetDepth: target.depth,
      };
    });

  // The anchor is the badge's own column-(-1) position (x=0, exactly where
  // the badge pill ends) — always present, whether the category has one
  // root or several, so the badge-to-root connector is just an ordinary
  // link through an ordinary full-width gutter rather than a special case.
  // Its vertical position is the mean of the real roots' rows.
  const roots = skills.filter(s => s.parent === null);
  const rootTop = roots.reduce((sum, r) => sum + nodeById.get(r.id)!.screenTop, 0) / roots.length;
  roots.forEach(r => {
    const target = nodeById.get(r.id)!;
    links.push({
      sourceId: `${ANCHOR_PREFIX}${category}`,
      targetId: r.id,
      sx: 0,
      sy: rootTop + PILL_H / 2,
      tx: target.screenLeft,
      ty: target.screenTop + PILL_H / 2,
      midX: (0 + target.screenLeft) / 2,
      sourceDepth: 0,
      targetDepth: target.depth,
    });
  });

  return {
    nodes,
    links,
    canvasWidth: Math.max(...nodes.map(n => n.screenLeft)) + PILL_W,
    canvasHeight: Math.max(...nodes.map(n => n.screenTop)) + PILL_H,
    rootTop,
  };
}

export const LAYOUTS: Record<SkillCategory, TreeLayout> = {
  design: computeLayout('design'),
  production: computeLayout('production'),
  leadership: computeLayout('leadership'),
};

export function getActivePathNodeIds(activeSkill: Skill | null): Set<string> {
  const pathIds = new Set<string>();
  if (!activeSkill) return pathIds;

  let current: Skill | undefined = activeSkill;
  while (current) {
    pathIds.add(current.id);
    if (!current.parent) break;
    const parentId = current.parent;
    current = SKILLS.find(s => s.id === parentId);
  }
  return pathIds;
}

/**
 * Root-to-selection order for the active-path fill animation — a fluid
 * flowing through connected pipe segments, each one starting only once the
 * previous one has fully filled. Keyed by each link's targetId so
 * `SkillTreeConnections.tsx` can look up "how many segments come before
 * this one" directly. `link.sourceDepth` can't be reused for this: the
 * anchor→root link and the root's own first real link both have
 * sourceDepth 0 and would fire simultaneously — this walks the actual
 * selected skill's ancestor chain instead. Since the anchor is now always
 * present, index 0 is always its link into the root (chain[0]).
 */
export function getActivePathOrder(activeSkill: Skill | null): Map<string, number> {
  const order = new Map<string, number>();
  if (!activeSkill) return order;

  const chain: Skill[] = [];
  let current: Skill | undefined = activeSkill;
  while (current) {
    chain.push(current);
    if (!current.parent) break;
    const parentId = current.parent;
    current = SKILLS.find(s => s.id === parentId);
  }
  chain.reverse(); // root ... selected
  chain.forEach((s, i) => order.set(s.id, i));
  return order;
}
