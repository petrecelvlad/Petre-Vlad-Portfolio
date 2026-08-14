import React from 'react';
import { Skill, CATEGORIES } from '@/src/core/domain/skillTreeTypes';
import { getArcadeBevelStyle } from './arcadeStyle';

export function Dots({ level, large }: { level: number; large?: boolean }) {
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

export interface SkillPillProps {
  skill: Skill;
  active: boolean;
  isOnPath: boolean;
  onSelect: (s: Skill) => void;
  depth: number;
}

export function SkillPill({
  skill,
  active,
  isOnPath,
  onSelect,
}: SkillPillProps) {
  const Icon = skill.icon;
  const catConfig = CATEGORIES[skill.category];
  const style = getArcadeBevelStyle(catConfig, active ? 'active' : isOnPath ? 'onPath' : 'default');

  return (
    <button
      onClick={() => onSelect(skill)}
      className={`
        w-[160px] h-[32px] flex-shrink-0 flex items-center gap-2 px-3
        rounded-xl border-[2.5px] border-ink-base cursor-pointer text-left relative overflow-hidden select-none
        transition-transform duration-100 active:translate-y-[1px]
        ${
          active
            ? 'z-10 scale-[1.04]'
            : isOnPath
            ? 'z-1 scale-[1.02]'
            : 'hover:scale-[1.02]'
        }
      `}
      style={style}
    >
      <span className="absolute top-[3px] right-[8px] w-[14px] h-[5px] rounded-full bg-white/50 pointer-events-none" />

      <Icon
        size={15}
        strokeWidth={2.5}
        className="flex-shrink-0 text-ink-base -mt-[1px]"
      />

      <span className="font-display font-black text-[10.5px] uppercase tracking-tight leading-none flex-1 min-w-0 truncate text-ink-base -mt-[1px]">
        {skill.name}
      </span>

      {isOnPath && !active && (
        <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white animate-pulse -mt-[1px]" />
      )}
    </button>
  );
}
