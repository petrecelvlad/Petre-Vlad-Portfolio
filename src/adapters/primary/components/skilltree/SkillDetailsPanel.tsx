import { AnimatePresence, motion } from 'motion/react';
import { RibbonBanner } from '@/src/components/atoms/RibbonBanner';
import { RibbonPaperSeam } from '@/src/components/atoms/RibbonPaperSeam';
import { TornPaperPanel } from '@/src/components/atoms/TornPaperPanel';
import { GamifiedWaxSeal } from '@/src/components/bento/skins/gamified/GamifiedWaxSeal';
import { Skill, SkillCategory, CATEGORIES } from '@/src/core/domain/skillTreeTypes';

export interface SkillDetailsPanelProps {
  skill: Skill | null;
  /** The category badge selected directly, rather than a skill within it — mutually exclusive with `skill`. */
  category: SkillCategory | null;
}

const PAPER = '#FFFDF7';
const CONTOUR = '#1C1610';
const LINE_HEIGHT = '28px';
const SWAP = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.2 },
};

// Same ribbon-over-lined-paper object as the Hero's role card.
export function SkillDetailsPanel({ skill, category }: SkillDetailsPanelProps) {
  const { key, title, descriptionLabel, description } = skill !== null
    ? { key: skill.id, title: skill.name, descriptionLabel: null, description: skill.description }
    : { key: `category-${category}`, title: CATEGORIES[category!].label, descriptionLabel: 'DISCIPLINE OVERVIEW:', description: CATEGORIES[category!].description };

  return (
    <div className="relative flex flex-col w-full mt-4">
      <RibbonBanner className="relative z-10 -mb-6 w-[108%] -mx-[4%]" bevelWidth={3}>
        <AnimatePresence mode="wait">
          <motion.h3
            key={key}
            {...SWAP}
            className="font-arcade font-black text-xl text-white uppercase tracking-wider leading-none text-center drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]"
          >
            {title}
          </motion.h3>
        </AnimatePresence>
      </RibbonBanner>

      <div className="relative w-full">
        <RibbonPaperSeam paperColor={PAPER} outlineColor={CONTOUR} className="absolute -top-2 left-0 right-0 z-[5]" />
        <TornPaperPanel
          className="w-full min-h-[292px]"
          paperColor={PAPER}
          strokeColor={CONTOUR}
          strokeWidth={3}
          shadowOffset={4}
          shadowColor={CONTOUR}
          toothWidth={36}
          toothHeight={13}
          cornerRadius={8}
          showPunchHoles={false}
          paddingTop={56}
          paddingBottom={40}
          paddingRight={56}
          ruleInsetX={16}
          lineSpacing={28}
          rotateDeg={0}
        >
          <AnimatePresence mode="wait">
            <motion.div key={key} {...SWAP} className="flex flex-col">
              {descriptionLabel !== null && (
                <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#451A03]" style={{ lineHeight: LINE_HEIGHT }}>
                  {descriptionLabel}
                </span>
              )}
              <p className="font-body text-base text-[#2C1A0E] m-0" style={{ lineHeight: LINE_HEIGHT }}>
                {description}
              </p>
            </motion.div>
          </AnimatePresence>
        </TornPaperPanel>
        <GamifiedWaxSeal className="absolute -right-5 top-6 z-20" />
      </div>
    </div>
  );
}
