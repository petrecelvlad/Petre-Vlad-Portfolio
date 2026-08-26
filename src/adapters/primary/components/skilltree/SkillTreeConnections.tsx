import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Skill, SkillCategory, CATEGORIES } from '@/src/core/domain/skillTreeTypes';
import {
  LAYOUTS, getActivePathNodeIds, getActivePathOrder, getVisibleSkillIds, getLinkRevealTiming,
  LayoutLink, segmentDuration,
} from '@/src/core/domain/skillTreeGeometry';
import { SkillPill } from './SkillTreeNode';

function segmentPathLength(link: LayoutLink): number {
  return Math.abs(link.tx - link.sx) + Math.abs(link.ty - link.sy);
}

// Collapse sequencing: the pill fades out FIRST (leaf falls), then its
// connector retracts back toward its parent (branch withers) — the mirror
// of the expand sequence, where the line grows out to its tip and the pill
// blooms once it arrives. Shared by the pill's own exit (delay 0, this
// duration) and each connector's exit (delay = this duration, so it starts
// retracting the instant the pill has finished disappearing).
const PILL_EXIT_DURATION = 0.15;

export interface TreeCanvasProps {
  category: SkillCategory;
  activeSkill: Skill | null;
  expandedSkillIds: Set<string>;
  onSelect: (s: Skill) => void;
}

export function TreeCanvas({ category, activeSkill, expandedSkillIds, onSelect }: TreeCanvasProps) {
  const { nodes: allNodes, links: allLinks, canvasWidth, canvasHeight } = LAYOUTS[category];
  const catConfig = CATEGORIES[category];

  // Depth 0/1 always shown; deeper layers mount/unmount as `expandedSkillIds`
  // grows/shrinks — one layer at a time (a skill's children only reveal once
  // the skill ITSELF is in the set; a grandchild needs its own parent
  // separately added, not just an ancestor). Deliberately driven by
  // expandedSkillIds, NOT activeSkill (see useSkillTreeState.ts) —
  // activeSkill starts pre-selected on a root skill for the details panel,
  // and expanding a root's whole subtree by default would defeat the point
  // of collapsing deep layers. Positions themselves never change — they're
  // still the same static, module-load-computed LAYOUTS pixel coordinates as
  // before; only which nodes/links are currently mounted changes. See
  // getVisibleSkillIds/getNextExpandedSkillIds for the exact accumulate-vs-
  // reset rule (siblings within an open branch stay open; a skill outside
  // the currently open branch collapses it and starts fresh).
  const visibleIds = useMemo(
    () => getVisibleSkillIds(category, expandedSkillIds),
    [category, expandedSkillIds]
  );
  const nodes = useMemo(
    () => allNodes.filter(n => visibleIds.has(n.skill.id)),
    [allNodes, visibleIds]
  );
  // A link's source is always visible whenever its target is — every visible
  // node's whole ancestor chain up to the anchor is always included by
  // getVisibleSkillIds — so filtering on targetId alone is sufficient.
  const links = useMemo(
    () => allLinks.filter(l => visibleIds.has(l.targetId)),
    [allLinks, visibleIds]
  );

  const activePathNodeIds = useMemo(
    () => getActivePathNodeIds(activeSkill),
    [activeSkill]
  );

  // Per-link duration + cumulative delay for the active path (PASS 3/4
  // below), in root-to-selection order, so segment N starts exactly when
  // segment N-1 finishes. The anchor→root link (the badge's own connector)
  // is index 0, same as every other link — it's rendered by the same
  // PASS 1-4 loops below, no special case, so it's just the first entry in
  // this same chain.
  const activeSegments = useMemo(() => {
    const segments = new Map<string, { duration: number; delay: number }>();
    if (!activeSkill) return segments;

    const order = getActivePathOrder(activeSkill);
    const orderedLinks = links
      .filter(l => order.has(l.targetId))
      .sort((a, b) => order.get(a.targetId)! - order.get(b.targetId)!);

    let delay = 0;
    orderedLinks.forEach(link => {
      const duration = segmentDuration(segmentPathLength(link));
      segments.set(link.targetId, { duration, delay });
      delay += duration;
    });

    return segments;
  }, [activeSkill, links]);

  // Precomputed once per link — PASS 1-4 below all draw the same elbow-routing
  // path, they just differ in stroke/animation, so the `d` string shouldn't be
  // recomputed identically in each pass.
  const linksWithPath = useMemo(
    () => links.map(link => ({ ...link, d: `M${link.sx},${link.sy} H${link.midX} V${link.ty} H${link.tx}` })),
    [links]
  );

  // Draw-in/retract timing for the base pipe (PASS 1/2) and the pill each
  // link leads to — "the branch grows outward" reveal. BFS'd from the
  // category's anchor over only the currently-visible link set, so a newly
  // exposed line's delay is how long it actually takes to grow out to it,
  // and its pill appears right as that growth reaches it (mirrored on
  // retract: the pill fades first, then its line retracts back).
  const revealTiming = useMemo(
    () => getLinkRevealTiming(category, linksWithPath),
    [category, linksWithPath]
  );

  return (
    <div className="relative flex-shrink-0" style={{ width: canvasWidth, height: canvasHeight }}>
      {/* SVG connector layer */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible z-0"
        width={canvasWidth}
        height={canvasHeight}
      >
        {/* PASS 1: Base Dark Outer Pipe Casing */}
        <g id={`pass-casing-${category}`}>
          <AnimatePresence>
            {linksWithPath.map((link) => {
              const timing = revealTiming.get(link.targetId) ?? { duration: 0, delay: 0 };
              return (
                <motion.path
                  key={link.targetId}
                  d={link.d}
                  fill="none"
                  stroke="var(--color-ink-base)"
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.85}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, transition: { duration: timing.duration, delay: timing.delay, ease: 'linear' } }}
                  exit={{ pathLength: 0, transition: { duration: timing.duration, delay: PILL_EXIT_DURATION, ease: 'linear' } }}
                />
              );
            })}
          </AnimatePresence>
        </g>

        {/* PASS 2: Muted Dashed Inner Channel */}
        <g id={`pass-channel-${category}`}>
          <AnimatePresence>
            {linksWithPath.map((link) => {
              const timing = revealTiming.get(link.targetId) ?? { duration: 0, delay: 0 };
              return (
                <motion.path
                  key={link.targetId}
                  d={link.d}
                  fill="none"
                  stroke="var(--color-ink-base)"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.25}
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, transition: { duration: timing.duration, delay: timing.delay, ease: 'linear' } }}
                  exit={{ pathLength: 0, transition: { duration: timing.duration, delay: PILL_EXIT_DURATION, ease: 'linear' } }}
                />
              );
            })}
          </AnimatePresence>
        </g>

        {/* PASS 3: Active Neon Branch Fills */}
        <g id={`pass-active-stroke-${category}`}>
          {linksWithPath.map((link) => {
            const segment = activeSegments.get(link.targetId);
            if (!segment) return null;

            return (
              <motion.path
                key={`active-stroke-${link.sourceId}-${link.targetId}-${activeSkill?.id}`}
                d={link.d}
                fill="none"
                stroke={catConfig.stroke}
                strokeWidth={6}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: segment.duration,
                  delay: segment.delay,
                  ease: 'linear',
                }}
              />
            );
          })}
        </g>

        {/* PASS 4: Glossy White Core Highlights */}
        <g id={`pass-active-core-${category}`}>
          {linksWithPath.map((link) => {
            const segment = activeSegments.get(link.targetId);
            if (!segment) return null;

            return (
              <motion.path
                key={`active-core-${link.sourceId}-${link.targetId}-${activeSkill?.id}`}
                d={link.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{
                  duration: segment.duration,
                  delay: segment.delay,
                  ease: 'linear',
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Pill layer */}
      <AnimatePresence>
        {nodes.map(node => {
          const isActive = activeSkill?.id === node.skill.id;
          const isOnPath = activePathNodeIds.has(node.skill.id);
          const timing = revealTiming.get(node.skill.id) ?? { duration: 0, delay: 0 };

          return (
            <motion.div
              key={node.skill.id}
              className="absolute z-10"
              style={{ left: node.screenLeft, top: node.screenTop }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: timing.delay + timing.duration, duration: 0.2, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                transition: { delay: 0, duration: PILL_EXIT_DURATION, ease: 'easeIn' },
              }}
            >
              <SkillPill
                skill={node.skill}
                active={isActive}
                isOnPath={isOnPath}
                onSelect={onSelect}
                depth={node.depth}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
