import { ComponentType } from 'react';
import { SkinId } from '@/src/context/SkinContext';
import {
  SlotName,
  HeaderSlotProps,
  ResponsibilitiesSlotProps,
  SkillsSlotProps,
  AchievementSlotProps,
} from './ports';
import { BentoHeader as BauhausHeader } from './skins/bauhaus/BentoHeader';
import { BentoResponsibilities as BauhausResponsibilities } from './skins/bauhaus/BentoResponsibilities';
import { BentoSkills as BauhausSkills } from './skins/bauhaus/BentoSkills';
import { BentoAchievement as BauhausAchievement } from './skins/bauhaus/BentoAchievement';
import { BentoHeader as HeritageHeader } from './skins/heritage/BentoHeader';
import { BentoResponsibilities as HeritageResponsibilities } from './skins/heritage/BentoResponsibilities';
import { BentoSkills as HeritageSkills } from './skins/heritage/BentoSkills';

interface SlotRegistry {
  header: ComponentType<HeaderSlotProps>;
  responsibilities: ComponentType<ResponsibilitiesSlotProps>;
  skills: ComponentType<SkillsSlotProps>;
  achievement: ComponentType<AchievementSlotProps>;
}

const BAUHAUS_ADAPTERS: SlotRegistry = {
  header: BauhausHeader,
  responsibilities: BauhausResponsibilities,
  skills: BauhausSkills,
  achievement: BauhausAchievement,
};

const REGISTRY: Record<SkinId, Partial<SlotRegistry>> = {
  bauhaus: BAUHAUS_ADAPTERS,
  heritage: {
    header: HeritageHeader,
    responsibilities: HeritageResponsibilities,
    skills: HeritageSkills,
  },
};

export function resolveSlot<S extends SlotName>(skin: SkinId, slot: S): SlotRegistry[S] {
  return (REGISTRY[skin]?.[slot] ?? BAUHAUS_ADAPTERS[slot]) as SlotRegistry[S];
}
