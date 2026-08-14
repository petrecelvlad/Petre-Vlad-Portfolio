import { motion } from 'motion/react';
import { GlobalBackground } from '@/src/components/backgrounds/GlobalBackground';
import { DeskBoard } from '@/src/components/bento/skins/heritage/DeskBoard';
import { GamifiedBoard } from '@/src/components/bento/skins/gamified/GamifiedBoard';
import { useSkin } from '@/src/context/SkinContext';
import type { IExperience } from '@/src/core/domain/models';
import { SkillCategory, CATEGORIES } from '@/src/core/domain/skillTreeTypes';
import { LAYOUTS } from '@/src/core/domain/skillTreeGeometry';
import { TreeCanvas } from './skilltree/SkillTreeConnections';
import { SkillDetailsPanel } from './skilltree/SkillDetailsPanel';
import { SkillTreeBanner } from './skilltree/SkillTreeBanner';
import { getArcadeBevelStyle } from './skilltree/arcadeStyle';
import { useSkillTreeState } from '@/src/hooks/useSkillTreeState';

export function SkillTree({ experiences }: { experiences: IExperience[] }) {
  const { skin } = useSkin();
  const { activeSkill, projectsById, handleSelect } = useSkillTreeState(experiences);

  const treeRows = (Object.keys(CATEGORIES) as SkillCategory[]).map(cat => {
    const isCategoryActive = activeSkill !== null && activeSkill.category === cat;
    const badgeStyle = getArcadeBevelStyle(CATEGORIES[cat], isCategoryActive ? 'onPath' : 'default');

    return (
      <div key={cat} className="flex items-start">
        <div
          className="w-[96px] h-[30px] flex-shrink-0 flex items-center justify-center font-display font-black text-[9.5px] uppercase tracking-wider text-ink-base rounded-xl border-[2.5px] border-ink-base select-none relative overflow-hidden"
          style={{ marginTop: LAYOUTS[cat].rootTop, ...badgeStyle }}
        >
          <span className="absolute top-[2px] right-[6px] w-[12px] h-[4px] rounded-full bg-white/50 pointer-events-none" />
          <span className="-mt-[1px]">{CATEGORIES[cat].label}</span>
        </div>

        <TreeCanvas
          category={cat}
          activeSkill={activeSkill}
          onSelect={handleSelect}
        />
      </div>
    );
  });

  return (
    <motion.section
      className="relative z-0 h-full w-full flex flex-row"
      data-skin={skin}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlobalBackground section="skills" />
      {/* Left column — skill tree */}
      {skin === 'gamified' ? (
        <div className="flex-1 min-w-0 relative my-8 md:my-10 ml-8 md:ml-12 mr-4 md:mr-6 flex flex-col pt-3">
          <GamifiedBoard
            className="flex-1 min-w-0"
            contentClassName="p-4 md:p-6"
            fillHeight
            bannerTitle="GUILD SKILL TREE"
          >
            <div className="flex-1 min-h-0 w-full h-full flex flex-col justify-start gap-6 overflow-hidden">
              {treeRows}
            </div>
          </GamifiedBoard>
        </div>
      ) : (
        <div className="flex-1 min-w-0 relative my-8 md:my-10 ml-8 md:ml-12 mr-4 md:mr-6 flex flex-col">
          <SkillTreeBanner />
          <DeskBoard
            className="flex-1 min-w-0"
            contentClassName="p-4 md:p-6"
            fillHeight
            invertedRotation
          >
            <div className="flex-1 min-h-0 w-full h-full flex flex-col justify-start gap-6 overflow-hidden">
              {treeRows}
            </div>
          </DeskBoard>
        </div>
      )}

      {/* Right column — detail panel */}
      <div className="hidden lg:flex flex-col w-[600px] flex-shrink-0 my-8 md:my-10 ml-4 md:ml-6 mr-8 md:mr-12">
        <SkillDetailsPanel skill={activeSkill} projectsById={projectsById} />
      </div>
    </motion.section>
  );
}
