import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Text } from '@/src/components/atoms/Text';
import { InstantPhoto } from '@/src/components/atoms/InstantPhoto';
import { GamifiedParchmentPanel } from '@/src/components/bento/skins/gamified/GamifiedParchmentPanel';
import { Skill, SkillCategory, CATEGORIES } from '@/src/core/domain/skillTreeTypes';
import type { IProject } from '@/src/core/domain/models';

const PHOTO_ROTATIONS = [-4, 3, -5];

export interface SkillDetailsPanelProps {
  skill: Skill | null;
  /** The category badge selected directly, rather than a skill within it — mutually exclusive with `skill`. */
  category: SkillCategory | null;
  projectsById: Map<string, IProject>;
}

export function SkillDetailsPanel({ skill, category, projectsById }: SkillDetailsPanelProps) {
  const photos = skill
    ? skill.projects
        .map(id => projectsById.get(id))
        .filter((p): p is IProject => p !== undefined)
        .slice(0, 3)
    : [];

  const photosContent = photos.length > 0 && (
    <div className="flex items-start justify-center gap-4 px-6 relative z-10 -mt-4">
      {photos.map((project, i) => (
        <InstantPhoto
          key={project.id}
          src={project.icon ?? ''}
          alt={project.title}
          rotation={PHOTO_ROTATIONS[i % PHOTO_ROTATIONS.length]}
          className="flex-none basis-[calc((100%-2rem)/3)] aspect-[5/6] drop-shadow-xl"
        />
      ))}
    </div>
  );

  const gamifiedContent = (
    <AnimatePresence mode="wait">
      {skill === null && category === null ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-[#1C1610] text-[#FFD700] flex items-center justify-center text-lg mb-2 shadow">
            ⚔️
          </div>
          <Text variant="mono" className="uppercase tracking-widest text-[11px] font-bold text-[#6B4C12]">
            Select a Skill Node to Inspect
          </Text>
        </motion.div>
      ) : skill !== null ? (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="font-display font-black text-xl md:text-2xl leading-tight text-[#1C1610] uppercase tracking-wide">
            {skill.name}
          </div>

          <div className="flex items-center gap-1.5 my-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < skill.proficiency
                      ? 'text-[#FFC72C] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                      : 'text-[#C8B289]'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="font-mono font-extrabold text-[10px] tracking-wider uppercase text-[#854D0E] ml-1">
              {skill.proficiency === 5 ? 'MASTERED' : 'UNLOCKED'}
            </span>
            <span className="font-mono font-bold text-xs text-[#6B4C12] ml-auto">
              {skill.years}y Exp
            </span>
          </div>

          <div className="h-px border-b border-dashed border-[#B89C6C] my-2" />

          <div className="p-3 rounded-lg bg-[#F0E2C3] border border-[#D4C096] text-[#2C1A0E] flex flex-col gap-1 shadow-inner my-2">
            <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#451A03]">
              ABILITY EFFECT:
            </span>
            <p className="font-body text-xs leading-relaxed text-[#2C1A0E]">
              {skill.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-dashed border-[#B89C6C]/60">
            <div className="flex items-center text-[10px] font-bold text-[#543A14]">
              <span className="w-20 uppercase tracking-wider">MASTERY</span>
              <div className="flex-1 h-2.5 rounded bg-[#C8B289] overflow-hidden p-[1px] shadow-inner">
                <div
                  className="h-full rounded bg-[#22C55E] transition-all duration-300"
                  style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center text-[10px] font-bold text-[#543A14]">
              <span className="w-20 uppercase tracking-wider">EXPERIENCE</span>
              <div className="flex-1 h-2.5 rounded bg-[#C8B289] overflow-hidden p-[1px] shadow-inner">
                <div
                  className="h-full rounded bg-[#3B82F6] transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(30, skill.years * 15))}%` }}
                />
              </div>
            </div>

            <div className="flex items-center text-[10px] font-bold text-[#543A14]">
              <span className="w-20 uppercase tracking-wider">IMPACT</span>
              <div className="flex-1 h-2.5 rounded bg-[#C8B289] overflow-hidden p-[1px] shadow-inner">
                <div
                  className="h-full rounded bg-[#EAB308] transition-all duration-300"
                  style={{ width: `${80 + (skill.proficiency * 4)}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={`category-${category}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="font-display font-black text-xl md:text-2xl leading-tight text-[#1C1610] uppercase tracking-wide">
            {CATEGORIES[category!].label}
          </div>

          <div className="h-px border-b border-dashed border-[#B89C6C] my-2" />

          <div className="p-3 rounded-lg bg-[#F0E2C3] border border-[#D4C096] text-[#2C1A0E] flex flex-col gap-1 shadow-inner my-2">
            <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#451A03]">
              DISCIPLINE OVERVIEW:
            </span>
            <p className="font-body text-xs leading-relaxed text-[#2C1A0E]">
              {CATEGORIES[category!].description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex flex-col w-full mt-4">
      <GamifiedParchmentPanel
        className="w-full min-h-[260px]"
        categoryLabel={
          skill
            ? `${CATEGORIES[skill.category].label.toUpperCase()} BRANCH`
            : category
            ? `${CATEGORIES[category].label.toUpperCase()} GUILD`
            : 'HERO GUILD'
        }
        rankLabel={skill ? `RANK ${skill.proficiency} / 5` : category ? 'OVERVIEW' : 'RANK V / V'}
      >
        {gamifiedContent}
      </GamifiedParchmentPanel>
      {photosContent}
    </div>
  );
}
