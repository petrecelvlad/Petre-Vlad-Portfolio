import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Skill, SkillCategory, CATEGORIES } from '@/src/core/domain/skillTreeTypes';
import {
  LAYOUTS, getActivePathNodeIds, getActivePathOrder, LayoutLink, segmentDuration,
} from '@/src/core/domain/skillTreeGeometry';
import { SkillPill } from './SkillTreeNode';

function segmentPathLength(link: LayoutLink): number {
  return Math.abs(link.tx - link.sx) + Math.abs(link.ty - link.sy);
}

export interface TreeCanvasProps {
  category: SkillCategory;
  activeSkill: Skill | null;
  onSelect: (s: Skill) => void;
}

export function TreeCanvas({ category, activeSkill, onSelect }: TreeCanvasProps) {
  const { nodes, links, canvasWidth, canvasHeight } = LAYOUTS[category];
  const catConfig = CATEGORIES[category];

  const activePathNodeIds = useMemo(
    () => getActivePathNodeIds(activeSkill),
    [activeSkill]
  );

  // Per-link duration + cumulative delay for the active path, in root-to-
  // selection order, so segment N starts exactly when segment N-1 finishes.
  // The anchor→root link (the badge's own connector) is index 0, same as
  // every other link — it's rendered by the same PASS 1-4 loops below, no
  // special case, so it's just the first entry in this same chain.
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
          {links.map((link, i) => {
            const midX = link.midX;
            const d = `M${link.sx},${link.sy} H${midX} V${link.ty} H${link.tx}`;
            return (
              <path
                key={`casing-${link.sourceId}-${link.targetId}-${i}`}
                d={d}
                fill="none"
                stroke="var(--color-ink-base)"
                strokeWidth={10}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
              />
            );
          })}
        </g>

        {/* PASS 2: Muted Dashed Inner Channel */}
        <g id={`pass-channel-${category}`}>
          {links.map((link, i) => {
            const midX = link.midX;
            const d = `M${link.sx},${link.sy} H${midX} V${link.ty} H${link.tx}`;
            return (
              <path
                key={`channel-${link.sourceId}-${link.targetId}-${i}`}
                d={d}
                fill="none"
                stroke="var(--color-ink-base)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.25}
                strokeDasharray="4 4"
              />
            );
          })}
        </g>

        {/* PASS 3: Active Neon Branch Fills */}
        <g id={`pass-active-stroke-${category}`}>
          {links.map((link) => {
            const segment = activeSegments.get(link.targetId);
            if (!segment) return null;

            const midX = link.midX;
            const d = `M${link.sx},${link.sy} H${midX} V${link.ty} H${link.tx}`;
            return (
              <motion.path
                key={`active-stroke-${link.sourceId}-${link.targetId}-${activeSkill?.id}`}
                d={d}
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
          {links.map((link) => {
            const segment = activeSegments.get(link.targetId);
            if (!segment) return null;

            const midX = link.midX;
            const d = `M${link.sx},${link.sy} H${midX} V${link.ty} H${link.tx}`;
            return (
              <motion.path
                key={`active-core-${link.sourceId}-${link.targetId}-${activeSkill?.id}`}
                d={d}
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
      {nodes.map(node => {
        const isActive = activeSkill?.id === node.skill.id;
        const isOnPath = activePathNodeIds.has(node.skill.id);

        return (
          <div
            key={node.skill.id}
            className="absolute z-10"
            style={{ left: node.screenLeft, top: node.screenTop }}
          >
            <SkillPill
              skill={node.skill}
              active={isActive}
              isOnPath={isOnPath}
              onSelect={onSelect}
              depth={node.depth}
            />
          </div>
        );
      })}
    </div>
  );
}
