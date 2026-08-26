import { useState, useMemo } from 'react';
import { Skill, SkillCategory, SKILLS } from '@/src/core/domain/skillTreeTypes';
import type { IExperience, IProject } from '@/src/core/domain/models';
import { DomainEventBus } from '@/src/core/events/DomainEventBus';
import { getNextExpandedSkillIds } from '@/src/core/domain/skillTreeGeometry';

const DEFAULT_SKILL = SKILLS.find(s => s.id === 'system-design')!;

export function useSkillTreeState(experiences: IExperience[]) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(DEFAULT_SKILL);
  // The category badge (DESIGN/PRODUCTION/LEADERSHIP) itself, when selected
  // directly rather than a skill within it — mutually exclusive with
  // activeSkill (selecting either clears the other). Not a node in the
  // SKILLS/depth graph at all (it sits outside TreeCanvas entirely, see
  // SkillTree.tsx), so it's tracked as its own separate piece of state
  // rather than shoehorned into `Skill`.
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);
  // Which skills currently have their direct children revealed in the tree —
  // separate from `activeSkill` (which drives the details panel + the
  // active-path neon highlight, and starts pre-selected on DEFAULT_SKILL so
  // the panel isn't empty on first load). Starts empty so the tree is
  // genuinely collapsed on first render: DEFAULT_SKILL is a root skill, and
  // treating it as expanded by default would reveal nearly the whole
  // category, defeating the point of collapsing deep layers. A Set (not a
  // single skill) because selecting a sibling within an already-open branch
  // must not collapse what's already open — see getNextExpandedSkillIds for
  // the exact accumulate-vs-reset rule.
  const [expandedSkillIds, setExpandedSkillIds] = useState<Set<string>>(() => new Set());

  const projectsById = useMemo(() => {
    const map = new Map<string, IProject>();
    for (const exp of experiences) {
      for (const project of exp.projects) map.set(project.id, project);
    }
    return map;
  }, [experiences]);

  const handleSelect = (skill: Skill) => {
    setActiveCategory(null);
    setActiveSkill(prev => {
      const nextSkill = prev?.id === skill.id ? null : skill;
      if (nextSkill) {
        DomainEventBus.publish({
          type: 'NODE_SELECTED',
          timestamp: Date.now(),
          payload: {
            nodeId: nextSkill.id,
            nodeName: nextSkill.name,
            category: nextSkill.category,
          },
        });
      }
      return nextSkill;
    });
    setExpandedSkillIds(prev => getNextExpandedSkillIds(prev, skill));
  };

  // Selecting the category badge itself always fully collapses the tree —
  // it sits outside the depth graph (nothing is its ancestor/descendant to
  // check "inside vs outside the current branch" against, unlike
  // getNextExpandedSkillIds' rule for skill-to-skill selections), so
  // "collapse everything" is the only sensible behavior here.
  const handleSelectCategory = (category: SkillCategory) => {
    setActiveSkill(null);
    setActiveCategory(prev => (prev === category ? null : category));
    setExpandedSkillIds(new Set());
  };

  return {
    activeSkill,
    activeCategory,
    expandedSkillIds,
    projectsById,
    handleSelect,
    handleSelectCategory,
  };
}
