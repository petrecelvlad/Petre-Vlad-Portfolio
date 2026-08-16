import type { LucideIcon } from 'lucide-react';
import {
  Gamepad2, Layers, Coins, Layout, Palette, Cpu, Ruler,
  ListTodo, GitBranch, ScrollText, FolderKanban, FlaskConical, Radio,
  Users, GraduationCap, Map as MapIcon, Network, MessageSquare,
  Search, Trophy, TrendingUp, Megaphone, Globe, Component,
  Scale, Footprints, Repeat, Puzzle, Workflow,
  Radar, MessageCircle, Gauge, SplitSquareHorizontal, Target,
} from 'lucide-react';

export type SkillCategory = 'design' | 'production' | 'leadership';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  parent: string | null;
  icon: LucideIcon;
  proficiency: 1 | 2 | 3 | 4 | 5;
  years: number;
  description: string;
  projects: string[];
}

export interface CategoryConfig {
  label: string;
  /**
   * Drives `Badge`'s `color` prop in `SkillDetailsPanel.tsx` — Badge's colorMap
   * pulls from the SITE's shared --color-* tokens, a separate palette from this
   * category's own bgBase/bgTop/bgBottom/stroke/glow arcade hex below. Badge has
   * no purple option, so `leadership` (arcade purple) can't get a matching badge
   * tone — picked `periwinkle` (the site's other "cool/distinct" token) as the
   * closest available choice, not a real match. Flagged, not silently wrong.
   */
  color: 'coral' | 'sky' | 'butter' | 'mint' | 'periwinkle';
  stroke: string;
  bgBase: string;
  bgTop: string;
  bgBottom: string;
}

/**
 * Arcade accent palette — reused verbatim from the hex already live elsewhere
 * in the Gamified skin (Hero's AchievementShaderCanvas.tsx/FloatingIslandBackdrop.tsx,
 * widgets/EmergencyButton.tsx, widgets/ToggleSwitch.tsx) per Ketchapp_Casual_Style.md's
 * documented face/base pairs, rather than the tree's own previously-invented hex.
 * bgBase = fill color, bgBottom = the category-tinted bottom inset line in
 * skilltree/arcadeStyle.ts's getArcadeBevelStyle (same single-element, single-border,
 * all-inset-shadow construction as bento/shared/BentoAchievement.tsx's --shadow-raised),
 * bgTop = lighter tint for the on-path outline, stroke = connector accent. No separate
 * glow color — the site avoids blur/glow effects.
 */
export const CATEGORIES: Record<SkillCategory, CategoryConfig> = {
  design: {
    label: 'DESIGN',
    color: 'butter',
    stroke: '#FACC15',
    bgBase: '#FACC15',
    bgTop: '#FDE047',
    bgBottom: '#CA8A04',
  },
  production: {
    label: 'PRODUCTION',
    color: 'sky',
    stroke: '#38BDF8',
    bgBase: '#38BDF8',
    bgTop: '#7DD3FC',
    bgBottom: '#0284C7',
  },
  leadership: {
    label: 'LEADERSHIP',
    color: 'periwinkle',
    stroke: '#C084FC',
    bgBase: '#C084FC',
    bgTop: '#D8B4FE',
    bgBottom: '#7E22CE',
  },
};

export const SKILLS: Skill[] = [
  // DESIGN
  {
    id: 'system-design', name: 'System Design', category: 'design', parent: null,
    icon: Cpu, proficiency: 5, years: 19,
    description: 'Architecting end-to-end systems that are internally consistent, predictable, and scalable — from feature sets to full product experiences.',
    projects: ['proj-fe-high-voltage', 'proj-lead-level-designer'],
  },
  {
    id: 'game-design', name: 'Game Design', category: 'design', parent: 'system-design',
    icon: Gamepad2, proficiency: 5, years: 19,
    description: 'Designing core loops, game modes, and feature systems that balance engagement with long-term retention.',
    projects: ['proj-fe-high-voltage', 'proj-idle-td', 'proj-newton-slots', 'proj-merge-mansion', 'proj-deca-rotmg', 'proj-castellum'],
  },
  {
    id: 'level-design', name: 'Level Design', category: 'design', parent: 'game-design',
    icon: Layers, proficiency: 5, years: 12,
    description: 'Crafting and producing levels at scale — from handcrafted puzzles to pipelines delivering thousands.',
    projects: ['proj-lead-level-designer', 'proj-idle-td', 'proj-merge-mansion', 'proj-bubble-witch-saga', 'proj-alphabetty-saga'],
  },
  {
    id: 'balancing', name: 'Balancing', category: 'design', parent: 'level-design',
    icon: Scale, proficiency: 4, years: 10,
    description: 'Tuning difficulty curves, enemy and level stats, and content pacing to keep challenge fair across a full progression arc.',
    projects: ['proj-idle-td', 'proj-lead-level-designer', 'proj-merge-mansion', 'proj-bubble-witch-saga'],
  },
  {
    id: 'economy-design', name: 'Economy Design', category: 'design', parent: 'game-design',
    icon: Coins, proficiency: 4, years: 9,
    description: 'Balancing in-game economies: currency generators and sinks, drop rates, payout formulas, progression curves, and NFT asset integration.',
    projects: ['proj-fe-high-voltage', 'proj-newton-slots', 'proj-idle-td', 'proj-deca-rotmg'],
  },
  {
    id: 'monetization', name: 'Monetization', category: 'design', parent: 'economy-design',
    icon: TrendingUp, proficiency: 4, years: 9,
    description: 'Designing monetization systems — IAP pack pricing and discount structures, loot boxes, payout formulas, and progression gates.',
    projects: ['proj-newton-slots', 'proj-idle-td'],
  },
  {
    id: 'gamification', name: 'Gamification', category: 'design', parent: 'game-design',
    icon: Trophy, proficiency: 5, years: 10,
    description: 'Applying game mechanics (rewards, quests, progression) to non-game contexts to drive engagement and behavior change.',
    projects: ['proj-idle-td', 'proj-newton-slots'],
  },
  {
    id: 'prototyping', name: 'Prototyping', category: 'design', parent: null,
    icon: FlaskConical, proficiency: 4, years: 10,
    description: 'Building rapid prototypes to validate mechanics, loops, and design decisions before committing to full implementation.',
    projects: ['proj-idle-td', 'proj-fe-high-voltage', 'proj-fitkin'],
  },
  {
    id: 'meta-core-loops', name: 'Meta Core Loops', category: 'design', parent: 'game-design',
    icon: Repeat, proficiency: 4, years: 9,
    description: 'Designing the session-to-session meta loop — long-term goals, unlocks, and progression systems that pull players back — and iterating on it post-launch using live performance data.',
    projects: ['proj-idle-td', 'proj-fe-high-voltage', 'proj-newton-slots'],
  },
  {
    id: 'web-design', name: 'Layout Design', category: 'design', parent: 'system-design',
    icon: Globe, proficiency: 4, years: 7,
    description: 'Designing digital interfaces and systems for web and app-based products, spanning UI, UX, and design system architecture.',
    projects: ['proj-fe-high-voltage', 'proj-fitkin', 'proj-castellum'],
  },
  {
    id: 'ui-design', name: 'UI Design', category: 'design', parent: 'web-design',
    icon: Palette, proficiency: 4, years: 7,
    description: 'Crafting visual interfaces with strong aesthetic direction — typography, color, component hierarchy, and screen composition guided by the user flow.',
    projects: ['proj-fe-high-voltage', 'proj-castellum'],
  },
  {
    id: 'ux-design', name: 'UX Design', category: 'design', parent: 'web-design',
    icon: Layout, proficiency: 4, years: 7,
    description: 'Designing screen flows, interaction patterns, and interface logic for mobile-first game and product experiences.',
    projects: ['proj-fe-high-voltage', 'proj-fitkin', 'proj-castellum'],
  },
  {
    id: 'ftue-onboarding', name: 'FTUE & Onboarding', category: 'design', parent: 'ux-design',
    icon: Footprints, proficiency: 5, years: 7,
    description: 'Owning the end-to-end first-time user experience — onboarding strategy, tutorial sequencing, and the cadence of introducing new mechanics to new players.',
    projects: ['proj-idle-td', 'proj-alphabetty-saga'],
  },
  {
    id: 'design-systems', name: 'Design Systems', category: 'design', parent: 'web-design',
    icon: Component, proficiency: 3, years: 4,
    description: 'Designing the complete design system for a digital product or game — token architecture, component libraries, and visual/interaction consistency end-to-end.',
    projects: ['proj-fe-high-voltage'],
  },
  {
    id: 'research', name: 'Research', category: 'design', parent: null,
    icon: Search, proficiency: 4, years: 12,
    description: 'Conducting competitive analysis, domain research, and player behavior research to ground design in evidence.',
    projects: ['proj-fe-high-voltage', 'proj-lead-level-designer'],
  },

  // PRODUCTION
  {
    id: 'backlog-mgmt', name: 'Backlog Mgmt', category: 'production', parent: 'agile-planning',
    icon: ListTodo, proficiency: 4, years: 8,
    description: 'Prioritizing and refining feature backlogs across concurrent game production tracks and multiple teams.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage', 'proj-idle-td'],
  },
  {
    id: 'agile-planning', name: 'Agile Planning', category: 'production', parent: 'project-mgmt',
    icon: GitBranch, proficiency: 5, years: 12,
    description: 'Running sprints, standups, and iterative delivery cycles across multi-team game production environments.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage', 'proj-idle-td'],
  },
  {
    id: 'documentation', name: 'Documentation', category: 'production', parent: 'agile-planning',
    icon: ScrollText, proficiency: 5, years: 15,
    description: 'Writing GDDs, design specs, process guides, and standardized procedures that outlast the project.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage', 'proj-idle-td', 'proj-alphabetty-saga', 'proj-fitkin', 'proj-castellum'],
  },
  {
    id: 'standards-patterns', name: 'Standards & Patterns', category: 'production', parent: 'documentation',
    icon: Ruler, proficiency: 4, years: 12,
    description: 'Identifying recurring patterns across a project and codifying them into heuristic rules and standards that ensure systemic coherence and predictability.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage'],
  },
  {
    id: 'project-mgmt', name: 'Project Mgmt', category: 'production', parent: null,
    icon: FolderKanban, proficiency: 4, years: 8,
    description: 'Owning project timelines and milestone planning for game and software delivery end-to-end.',
    projects: ['proj-lead-level-designer', 'proj-idle-td', 'proj-clash-of-towers'],
  },
  {
    id: 'pipeline-design', name: 'Pipeline Design', category: 'production', parent: 'project-mgmt',
    icon: Workflow, proficiency: 4, years: 8,
    description: 'Designing the production pipeline itself — the shared workflow, framework, and sprint methodology a team operates under.',
    projects: ['proj-lead-level-designer', 'proj-idle-td'],
  },
  {
    id: 'player-ops', name: 'Player Ops', category: 'production', parent: null,
    icon: Radar, proficiency: 4, years: 10,
    description: 'Owning the player-facing side of a live game — community, marketing, live operations, and the data that measures whether it’s all working.',
    projects: ['proj-idle-td', 'proj-deca-rotmg', 'proj-alphabetty-saga'],
  },
  {
    id: 'live-ops', name: 'Live Ops', category: 'production', parent: 'player-ops',
    icon: Radio, proficiency: 3, years: 3,
    description: 'Running the live-service content cadence for continuously operated titles — event scheduling, live balancing, and retention-driven updates post-launch.',
    projects: ['proj-deca-rotmg', 'proj-merge-mansion'],
  },
  {
    id: 'marketing', name: 'Marketing', category: 'production', parent: 'community-mgmt',
    icon: Megaphone, proficiency: 3, years: 6,
    description: 'Producing promotional content and running campaigns that build awareness and drive acquisition for a shipped title.',
    projects: ['proj-idle-td', 'proj-castellum'],
  },
  {
    id: 'community-mgmt', name: 'Community Mgmt', category: 'production', parent: 'player-ops',
    icon: MessageCircle, proficiency: 3, years: 6,
    description: 'Listening to and engaging an existing player base directly — moderating community channels, responding to feedback, and folding it back into design decisions.',
    projects: ['proj-idle-td'],
  },
  {
    id: 'kpi-tracking', name: 'KPI Tracking', category: 'production', parent: 'player-ops',
    icon: Gauge, proficiency: 3, years: 5,
    description: 'Defining the metrics that measure a live game’s success and using the resulting data to drive design decisions — from onboarding tuning to core and meta loop redesigns.',
    projects: ['proj-alphabetty-saga', 'proj-idle-td'],
  },
  {
    id: 'ab-testing', name: 'A/B Testing', category: 'production', parent: 'kpi-tracking',
    icon: SplitSquareHorizontal, proficiency: 3, years: 3,
    description: 'Running controlled experiments — like parallel onboarding difficulty tracks — to measure impact on retention and engagement before committing to a single design.',
    projects: ['proj-alphabetty-saga'],
  },

  // LEADERSHIP
  {
    id: 'team-leadership', name: 'Team Leadership', category: 'leadership', parent: null,
    icon: Users, proficiency: 5, years: 8,
    description: 'Managing up to 15 people across 6 concurrent teams — setting direction, unblocking, and maintaining quality.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage', 'proj-castellum', 'proj-clash-of-towers'],
  },
  {
    id: 'strategy', name: 'Strategy', category: 'leadership', parent: 'team-leadership',
    icon: Target, proficiency: 4, years: 9,
    description: 'Defining the holistic strategy for a game as a product — core pillars and design direction, economy, live events, monetization, release cadence, and the KPIs used to track it all end-to-end.',
    projects: ['proj-idle-td', 'proj-fe-high-voltage'],
  },
  {
    id: 'coaching', name: 'Coaching', category: 'leadership', parent: 'cross-team-coord',
    icon: GraduationCap, proficiency: 5, years: 7,
    description: 'Training junior designers from scratch — 9 Junior Level Designers brought from onboarding to production-ready.',
    projects: ['proj-lead-level-designer', 'proj-alphabetty-saga'],
  },
  {
    id: 'roadmapping', name: 'Roadmapping', category: 'leadership', parent: 'strategy',
    icon: MapIcon, proficiency: 3, years: 8,
    description: 'Defining phased delivery plans that sequence features by risk, dependency, and business value.',
    projects: ['proj-lead-level-designer', 'proj-idle-td'],
  },
  {
    id: 'cross-team-coord', name: 'Coordination', category: 'leadership', parent: 'team-leadership',
    icon: Network, proficiency: 5, years: 7,
    description: 'Acting as lead coordinator across 6 teams, synchronizing dependencies and keeping production lanes unblocked.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage', 'proj-clash-of-towers'],
  },
  {
    id: 'stakeholder-comms', name: 'Stakeholder Comms', category: 'leadership', parent: 'cross-team-coord',
    icon: MessageSquare, proficiency: 4, years: 10,
    description: 'Managing client relationships and translating between creative vision and business requirements.',
    projects: ['proj-lead-level-designer', 'proj-fe-high-voltage', 'proj-castellum'],
  },
  {
    id: 'cross-functional-comms', name: 'Cross-Functional Comms', category: 'leadership', parent: 'cross-team-coord',
    icon: Puzzle, proficiency: 4, years: 6,
    description: 'Coordinating laterally across art, development, and QA to keep departments aligned and working efficiently toward the same delivery.',
    projects: ['proj-fitkin', 'proj-castellum', 'proj-lead-level-designer'],
  },
];
