import { useState } from 'react';
import { stratify, tree } from 'd3-hierarchy';
import { AnimatePresence, motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  Gamepad2, Layers, Coins, Layout, Palette, Cpu, Ruler,
  ListTodo, GitBranch, ScrollText, FolderKanban, FlaskConical,
  Users, GraduationCap, Map, Network, MessageSquare,
  Search, Trophy, TrendingUp, Megaphone, Globe,
} from 'lucide-react';
import { Badge } from '@/src/components/atoms/Badge';
import { Text } from '@/src/components/atoms/Text';
import { WindowCard } from '@/src/components/atoms/WindowCard';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Skill {
  id: string;
  name: string;
  category: 'design' | 'production' | 'leadership' | 'vision';
  parent: string | null;
  icon: LucideIcon;
  proficiency: 1 | 2 | 3 | 4 | 5;
  years: number;
  description: string;
  projects: string[];
}

// ── Config ────────────────────────────────────────────────────────────────────

const CATEGORIES = {
  design:     { label: 'DESIGN',     color: 'coral'  as const },
  production: { label: 'PRODUCTION', color: 'sky'    as const },
  leadership: { label: 'LEADERSHIP', color: 'butter' as const },
  vision:     { label: 'VISION',     color: 'mint'   as const },
};

// Pill dimensions must match the SkillPill CSS exactly so layout coordinates are accurate
const PILL_W = 160; // matches w-[160px]
const PILL_H = 32;  // py-2 (8px×2) + icon/text content (16px) = 32px
const GAP_X  = 28;  // horizontal gap between pill edges (connector breathing room)
const GAP_Y  = 14;  // vertical gap between sibling pill edges

// ── Skill data ────────────────────────────────────────────────────────────────

const SKILLS: Skill[] = [
  // DESIGN
  {
    id: 'system-design', name: 'System Design', category: 'design', parent: null,
    icon: Cpu, proficiency: 5, years: 19,
    description: 'Architecting end-to-end systems that are internally consistent, predictable, and scalable — from feature sets to full product experiences.',
    projects: ['Formula E High Voltage', 'Lead Level Designer', 'R-QUEST App'],
  },
  {
    id: 'game-design', name: 'Game Design', category: 'design', parent: 'system-design',
    icon: Gamepad2, proficiency: 5, years: 19,
    description: 'Designing core loops, game modes, and feature systems that balance engagement with long-term retention.',
    projects: ['Formula E High Voltage', 'Idle TD', 'Newton Slots'],
  },
  {
    id: 'level-design', name: 'Level Design', category: 'design', parent: 'game-design',
    icon: Layers, proficiency: 5, years: 12,
    description: 'Crafting and producing levels at scale — from handcrafted puzzles to pipelines delivering thousands.',
    projects: ['Lead Level Designer', 'Idle TD'],
  },
  {
    id: 'economy-design', name: 'Economy Design', category: 'design', parent: 'game-design',
    icon: Coins, proficiency: 4, years: 9,
    description: 'Balancing in-game economies: payout formulas, progression curves, loot systems, and NFT asset integration.',
    projects: ['Formula E High Voltage', 'Newton Slots', 'Idle TD'],
  },
  {
    id: 'design-prototyping', name: 'Prototyping', category: 'design', parent: 'game-design',
    icon: FlaskConical, proficiency: 4, years: 10,
    description: 'Creating rapid game design prototypes to validate mechanics, loops, and system feel before committing to full implementation.',
    projects: ['R-QUEST App', 'Idle TD', 'Formula E High Voltage'],
  },
  {
    id: 'design-documentation', name: 'Documentation', category: 'design', parent: 'game-design',
    icon: ScrollText, proficiency: 5, years: 15,
    description: 'Writing Game Design Documents (GDDs) and design specs that define systems, rules, and intent with precision and longevity.',
    projects: ['Lead Level Designer', 'Formula E High Voltage', 'Idle TD'],
  },
  {
    id: 'standards-patterns', name: 'Standards & Patterns', category: 'design', parent: 'system-design',
    icon: Ruler, proficiency: 4, years: 12,
    description: 'Identifying recurring patterns across a project and codifying them into heuristic rules and standards that ensure systemic coherence and predictability.',
    projects: ['Lead Level Designer', 'Formula E High Voltage'],
  },
  {
    id: 'ui-design', name: 'UI Design', category: 'design', parent: 'system-design',
    icon: Palette, proficiency: 4, years: 7,
    description: 'Crafting visual interfaces with strong aesthetic direction — typography, color, component hierarchy, and screen composition guided by the user flow.',
    projects: ['R-QUEST App', 'Formula E High Voltage'],
  },
  {
    id: 'ux-design', name: 'UX Design', category: 'design', parent: 'system-design',
    icon: Layout, proficiency: 4, years: 7,
    description: 'Designing screen flows, interaction patterns, and interface logic for mobile-first game and product experiences.',
    projects: ['R-QUEST App', 'Formula E High Voltage'],
  },

  // PRODUCTION
  {
    id: 'backlog-mgmt', name: 'Backlog Mgmt', category: 'production', parent: null,
    icon: ListTodo, proficiency: 4, years: 8,
    description: 'Prioritizing and refining feature backlogs across concurrent game production tracks and multiple teams.',
    projects: ['Lead Level Designer', 'Formula E High Voltage', 'Idle TD'],
  },
  {
    id: 'agile-planning', name: 'Agile Planning', category: 'production', parent: 'backlog-mgmt',
    icon: GitBranch, proficiency: 5, years: 12,
    description: 'Running sprints, standups, and iterative delivery cycles across multi-team game production environments.',
    projects: ['Lead Level Designer', 'Formula E High Voltage', 'Idle TD'],
  },
  {
    id: 'documentation', name: 'Documentation', category: 'production', parent: 'agile-planning',
    icon: ScrollText, proficiency: 5, years: 15,
    description: 'Writing GDDs, design specs, process guides, and standardized procedures that outlast the project.',
    projects: ['Lead Level Designer', 'Formula E High Voltage', 'Idle TD'],
  },
  {
    id: 'project-mgmt', name: 'Project Mgmt', category: 'production', parent: 'backlog-mgmt',
    icon: FolderKanban, proficiency: 4, years: 8,
    description: 'Owning project timelines and milestone planning for game and software delivery end-to-end.',
    projects: ['Lead Level Designer', 'Idle TD'],
  },
  {
    id: 'prototyping', name: 'Prototyping', category: 'production', parent: 'project-mgmt',
    icon: FlaskConical, proficiency: 4, years: 10,
    description: 'Building rapid proof-of-concept versions to validate design decisions before full implementation cost.',
    projects: ['R-QUEST App', 'Idle TD', 'Formula E High Voltage'],
  },

  // LEADERSHIP
  {
    id: 'team-leadership', name: 'Team Leadership', category: 'leadership', parent: null,
    icon: Users, proficiency: 5, years: 8,
    description: 'Managing up to 15 people across 6 concurrent teams — setting direction, unblocking, and maintaining quality.',
    projects: ['Lead Level Designer', 'Formula E High Voltage'],
  },
  {
    id: 'coaching', name: 'Coaching', category: 'leadership', parent: 'team-leadership',
    icon: GraduationCap, proficiency: 5, years: 7,
    description: 'Training junior designers from scratch — 9 Junior Level Designers brought from onboarding to production-ready.',
    projects: ['Lead Level Designer'],
  },
  {
    id: 'roadmapping', name: 'Roadmapping', category: 'leadership', parent: 'coaching',
    icon: Map, proficiency: 3, years: 8,
    description: 'Defining phased delivery plans that sequence features by risk, dependency, and business value.',
    projects: ['Lead Level Designer', 'Idle TD'],
  },
  {
    id: 'cross-team-coord', name: 'Coordination', category: 'leadership', parent: 'team-leadership',
    icon: Network, proficiency: 5, years: 7,
    description: 'Acting as lead coordinator across 6 teams, synchronizing dependencies and keeping production lanes unblocked.',
    projects: ['Lead Level Designer', 'Formula E High Voltage'],
  },
  {
    id: 'stakeholder-comms', name: 'Stakeholder Comms', category: 'leadership', parent: 'cross-team-coord',
    icon: MessageSquare, proficiency: 4, years: 10,
    description: 'Managing client relationships and translating between creative vision and business requirements.',
    projects: ['Lead Level Designer', 'Formula E High Voltage', 'R-QUEST App'],
  },

  // VISION
  {
    id: 'research', name: 'Research', category: 'vision', parent: null,
    icon: Search, proficiency: 4, years: 12,
    description: 'Conducting competitive analysis, domain research, and player behavior research to ground design in evidence.',
    projects: ['Formula E High Voltage', 'Lead Level Designer'],
  },
  {
    id: 'gamification', name: 'Gamification', category: 'vision', parent: 'research',
    icon: Trophy, proficiency: 5, years: 10,
    description: 'Applying game mechanics (rewards, quests, progression) to non-game contexts to drive engagement and behavior change.',
    projects: ['R-QUEST App', 'Idle TD', 'Newton Slots'],
  },
  {
    id: 'monetization', name: 'Monetization', category: 'vision', parent: 'gamification',
    icon: TrendingUp, proficiency: 4, years: 9,
    description: 'Designing monetization systems — IAP strategy, loot boxes, payout formulas, and progression gates.',
    projects: ['Newton Slots', 'Idle TD'],
  },
  {
    id: 'marketing', name: 'Mktg & Community', category: 'vision', parent: 'research',
    icon: Megaphone, proficiency: 3, years: 6,
    description: 'Building player communities, producing promotional content, and running community management campaigns.',
    projects: ['Idle TD'],
  },
  {
    id: 'metaverse', name: 'Metaverse & NFTs', category: 'vision', parent: 'marketing',
    icon: Globe, proficiency: 2, years: 3,
    description: 'Working within blockchain game economies — NFT-integrated team management and on-chain asset design.',
    projects: ['Formula E High Voltage'],
  },
];

// ── Layout engine (module-level, never recomputed) ────────────────────────────

interface LayoutNode {
  skill: Skill;
  screenLeft: number;
  screenTop: number;
  depth: number;
}

interface LayoutLink {
  sx: number; sy: number; // source right edge, vertical center
  tx: number; ty: number; // target left edge, vertical center
}

interface TreeLayout {
  nodes: LayoutNode[];
  links: LayoutLink[];
  canvasWidth: number;
  canvasHeight: number;
  rootTop: number; // screenTop of root pill, used to align the category badge
}

function computeLayout(category: Skill['category']): TreeLayout {
  const skills = SKILLS.filter(s => s.category === category);

  // d3.tree assigns x (sibling axis) and y (depth axis).
  // We render horizontally: screen_left = node.y, screen_top = node.x - xMin
  // nodeSize[0] = x-spacing (becomes vertical gap between rows)
  // nodeSize[1] = y-spacing (becomes horizontal depth per level)
  const root = tree<Skill>()
    .nodeSize([PILL_H + GAP_Y, PILL_W + GAP_X])
    .separation(() => 1)(
      stratify<Skill>()
        .id(d => d.id)
        .parentId(d => d.parent)(skills),
    );

  const all = root.descendants();
  const xMin = Math.min(...all.map(n => n.x));
  const xMax = Math.max(...all.map(n => n.x));
  const yMax = Math.max(...all.map(n => n.y));

  return {
    nodes: all.map(n => ({
      skill: n.data,
      screenLeft: n.y,
      screenTop: n.x - xMin,
      depth: n.depth,
    })),
    links: root.links().map(({ source, target }) => ({
      sx: source.y + PILL_W,
      sy: source.x - xMin + PILL_H / 2,
      tx: target.y,
      ty: target.x - xMin + PILL_H / 2,
    })),
    canvasWidth:  yMax + PILL_W,
    canvasHeight: xMax - xMin + PILL_H,
    rootTop: root.x - xMin,
  };
}

const LAYOUTS: Record<Skill['category'], TreeLayout> = {
  design:     computeLayout('design'),
  production: computeLayout('production'),
  leadership: computeLayout('leadership'),
  vision:     computeLayout('vision'),
};

// Solid desaturated tints per depth — no transparency so background dots never bleed through
const PILL_BG: Record<'coral' | 'sky' | 'butter' | 'mint', readonly string[]> = {
  coral:  ['bg-coral',    'bg-[#FFCFDD]', 'bg-[#FFE7EE]'],
  sky:    ['bg-sky',      'bg-[#CDF1EC]', 'bg-[#E6F8F5]'],
  butter: ['bg-butter',   'bg-[#FCF2B6]', 'bg-[#FDF8DA]'],
  mint:   ['bg-mint',     'bg-[#E3F7B8]', 'bg-[#F1FBDC]'],
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function Dots({ level, large }: { level: number; large?: boolean }) {
  return (
    <span className="flex gap-[2px] items-center flex-shrink-0">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`leading-none ${large ? 'text-sm' : 'text-[7px]'} ${i <= level ? 'text-ink-base' : 'text-ink-base/20'}`}
        >●</span>
      ))}
    </span>
  );
}

function SkillPill({ skill, active, onSelect, depth, color }: {
  skill: Skill; active: boolean; onSelect: (s: Skill) => void;
  depth: number; color: 'coral' | 'sky' | 'butter' | 'mint';
}) {
  const Icon = skill.icon;
  const bg = PILL_BG[color][Math.min(depth, PILL_BG[color].length - 1)];
  return (
    <button
      onClick={() => onSelect(skill)}
      className={`
        w-[160px] flex-shrink-0 flex items-center gap-2 px-2.5 py-2
        rounded border-2 border-ink-base transition-all duration-150 cursor-pointer text-left
        ${active
          ? 'bg-periwinkle shadow-raised'
          : `${bg} hover:shadow-raised`
        }
      `}
    >
      <Icon size={16} strokeWidth={2.5} className="flex-shrink-0 text-ink-base" />
      <span className="font-display font-black text-[10px] uppercase tracking-tight leading-none flex-1 min-w-0 truncate text-ink-base">
        {skill.name}
      </span>
    </button>
  );
}

// Renders one category's tree: SVG connector layer (bottom) + absolutely-positioned pills (top)
function TreeCanvas({ category, activeId, onSelect }: {
  category: Skill['category'];
  activeId: string | null;
  onSelect: (s: Skill) => void;
}) {
  const { nodes, links, canvasWidth, canvasHeight } = LAYOUTS[category];

  return (
    <div className="relative flex-shrink-0" style={{ width: canvasWidth, height: canvasHeight }}>
      {/* Connector layer */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width={canvasWidth}
        height={canvasHeight}
      >
        {links.map((link, i) => {
          const midX = (link.sx + link.tx) / 2;
          return (
            <path
              key={i}
              d={`M${link.sx},${link.sy} H${midX} V${link.ty} H${link.tx}`}
              fill="none"
              strokeWidth={2}
              style={{ stroke: 'var(--color-ink-base)', strokeOpacity: 0.4 }}
            />
          );
        })}
      </svg>

      {/* Pill layer */}
      {nodes.map(node => (
        <div
          key={node.skill.id}
          className="absolute"
          style={{ left: node.screenLeft, top: node.screenTop }}
        >
          <SkillPill
            skill={node.skill}
            active={activeId === node.skill.id}
            onSelect={onSelect}
            depth={node.depth}
            color={CATEGORIES[category].color}
          />
        </div>
      ))}
    </div>
  );
}

// Detail panel (bottom-anchored, full width)
function DetailPanel({ skill }: { skill: Skill | null }) {
  return (
    <WindowCard title="skill.detail.app" color="periwinkle" lights>
      <AnimatePresence mode="wait">
        {skill === null ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center h-12"
          >
            <Text variant="mono" color="subtle" className="uppercase tracking-widest text-[10px]">
              Select a skill to inspect
            </Text>
          </motion.div>
        ) : (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6"
          >
            {/* Identity block */}
            <div className="flex flex-col gap-2 md:w-52 flex-shrink-0">
              <div className="font-display font-black text-lg leading-none text-ink-base uppercase">
                {skill.name}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge color={CATEGORIES[skill.category].color} size="sm" mono>
                  {CATEGORIES[skill.category].label}
                </Badge>
                <Dots level={skill.proficiency} large />
                <Text variant="mono" size="sm" color="subtle">{skill.years}y</Text>
              </div>
            </div>

            <div className="hidden md:block w-px self-stretch bg-ink-base/10 flex-shrink-0" />

            {/* Description + evidence */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <Text variant="body" size="sm" color="subtle">{skill.description}</Text>
              {skill.projects.length > 0 && (
                <div className="flex items-center flex-wrap gap-1.5">
                  <Text variant="mono" color="subtle" className="uppercase tracking-widest text-[10px]">
                    Seen in:
                  </Text>
                  {skill.projects.map(p => (
                    <Badge key={p} color="base" size="sm" mono>{p}</Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WindowCard>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export function SkillTree() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const handleSelect = (skill: Skill) =>
    setActiveSkill(prev => prev?.id === skill.id ? null : skill);

  return (
    <motion.section
      className="h-full w-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Tree zone */}
      <div className="flex-1 flex flex-col justify-center gap-5 px-6 md:px-8 overflow-x-auto">

        {/* Section label */}
        <div className="flex items-center gap-3">
          <Text variant="mono" color="subtle" className="uppercase tracking-widest text-xs">
            Skill System
          </Text>
          <div className="flex-1 h-px bg-ink-base/10" />
          <Text variant="mono" color="subtle" className="text-[10px]">
            24 skills · 4 branches
          </Text>
        </div>

        {/* Four category rows */}
        <div className="flex flex-col gap-6">
          {(Object.keys(CATEGORIES) as Skill['category'][]).map(cat => (
            <div key={cat} className="flex items-start">
              {/*
                Badge + HLine shifted down by rootTop so they vertically center
                on the root pill regardless of where d3 places it in the canvas.
              */}
              <div
                className="flex items-center gap-3 flex-shrink-0"
                style={{ marginTop: LAYOUTS[cat].rootTop }}
              >
                <Badge
                  color={CATEGORIES[cat].color}
                  size="sm"
                  mono
                  className="w-[96px] justify-center flex-shrink-0 text-[9px]"
                >
                  {CATEGORIES[cat].label}
                </Badge>
                <div className="h-0.5 w-4 flex-shrink-0" style={{ background: 'var(--color-ink-base)', opacity: 0.4 }} />
              </div>

              <TreeCanvas
                category={cat}
                activeId={activeSkill?.id ?? null}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel anchored to bottom */}
      <div className="flex-shrink-0 px-6 md:px-8 pb-4 md:pb-6">
        <DetailPanel skill={activeSkill} />
      </div>
    </motion.section>
  );
}
