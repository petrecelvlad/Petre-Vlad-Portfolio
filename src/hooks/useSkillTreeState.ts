import { useState, useMemo } from 'react';
import { Skill, SKILLS } from '@/src/core/domain/skillTreeTypes';
import type { IExperience, IProject } from '@/src/core/domain/models';
import { DomainEventBus } from '@/src/core/events/DomainEventBus';

const DEFAULT_SKILL = SKILLS.find(s => s.id === 'system-design')!;

export function useSkillTreeState(experiences: IExperience[]) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(DEFAULT_SKILL);

  const projectsById = useMemo(() => {
    const map = new Map<string, IProject>();
    for (const exp of experiences) {
      for (const project of exp.projects) map.set(project.id, project);
    }
    return map;
  }, [experiences]);

  const handleSelect = (skill: Skill) => {
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
  };

  return {
    activeSkill,
    projectsById,
    handleSelect,
  };
}
