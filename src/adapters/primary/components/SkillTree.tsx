import { motion } from 'motion/react';
import { WoodBackground } from '@/src/components/bento/shared/WoodBackground';
import { GamifiedBoard } from '@/src/components/bento/skins/gamified/GamifiedBoard';
import type { IExperience } from '@/src/core/domain/models';
import { SkillCategory, CATEGORIES } from '@/src/core/domain/skillTreeTypes';
import { LAYOUTS, PILL_H } from '@/src/core/domain/skillTreeGeometry';
import { TreeCanvas } from './skilltree/SkillTreeConnections';
import { SkillDetailsPanel } from './skilltree/SkillDetailsPanel';
import { SkillProjectPhotos } from './skilltree/SkillProjectPhotos';
import { getArcadeButtonColor, getArcadeHighlight, getArcadeOutlineStyle } from './skilltree/arcadeStyle';
import { Button } from '@/src/components/atoms/Button';
import { ScaleToFit } from '@/src/components/layout/ScaleToFit';
import { useSkillTreeState } from '@/src/hooks/useSkillTreeState';

const BADGE_H = 72;

export function SkillTree({ experiences }: { experiences: IExperience[] }) {
  const { activeSkill, activeCategory, expandedSkillIds, projectsById, handleSelect, handleSelectCategory } = useSkillTreeState(experiences);

  const treeRows = (Object.keys(CATEGORIES) as SkillCategory[]).map(cat => {
    const isCategoryOnPath = activeSkill !== null && activeSkill.category === cat;
    const isCategorySelected = activeCategory === cat;
    const badgeState = isCategorySelected ? 'active' : isCategoryOnPath ? 'onPath' : 'default';
    const CategoryIcon = CATEGORIES[cat].icon;

    return (
      <div key={cat} className="flex items-start">
        <Button
          onClick={() => handleSelectCategory(cat)}
          color={getArcadeButtonColor(CATEGORIES[cat])}
          shape="chip"
          size="sm"
          highlight={getArcadeHighlight(badgeState)}
          className="w-[96px] flex-shrink-0 flex flex-col items-center justify-center gap-1.5 text-ink-base select-none relative z-10 overflow-hidden"
          style={{
            height: BADGE_H,
            // Centered on the anchor connector, which leaves the badge at the roots' mean row center.
            marginTop: LAYOUTS[cat].rootTop + PILL_H / 2 - BADGE_H / 2,
            ...getArcadeOutlineStyle(CATEGORIES[cat], badgeState),
          }}
        >
          <CategoryIcon size={26} strokeWidth={2.5} />
          <span className="font-jersey text-[16px] uppercase leading-none">{CATEGORIES[cat].label}</span>
        </Button>

        <TreeCanvas
          category={cat}
          activeSkill={activeSkill}
          expandedSkillIds={expandedSkillIds}
          onSelect={handleSelect}
        />
      </div>
    );
  });

  return (
    <motion.section
      className="relative z-0 h-full w-full flex flex-row"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <WoodBackground />
      </div>
      {/* Left column — skill tree */}
      <div className="flex-1 min-w-0 relative my-8 md:my-10 ml-8 md:ml-12 mr-4 md:mr-6 flex flex-col">
        <GamifiedBoard
          className="flex-1 min-w-0"
          contentClassName="p-1"
          fillHeight
          bannerTitle="Skilltree"
        >
          <ScaleToFit className="flex-1 min-h-0 self-stretch">
            <div className="flex flex-col gap-6 px-6">
              {treeRows}
            </div>
          </ScaleToFit>
        </GamifiedBoard>
      </div>

      {/* Right column — detail panel row, project photos row */}
      <div className="hidden lg:flex flex-col w-[600px] flex-shrink-0 my-8 md:my-10 ml-4 md:ml-6 mr-8 md:mr-12">
        <SkillDetailsPanel skill={activeSkill} category={activeCategory} />
        <SkillProjectPhotos className="flex-1 min-h-0" skill={activeSkill} projectsById={projectsById} />
      </div>
    </motion.section>
  );
}
