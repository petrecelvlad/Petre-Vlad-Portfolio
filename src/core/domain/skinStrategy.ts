import { ComponentType, ReactNode } from 'react';
import { SkinId } from '@/src/context/SkinContext';
import {
  SlotName,
  HeaderSlotProps,
  ResponsibilitiesSlotProps,
  SkillsSlotProps,
  AchievementSlotProps,
} from '@/src/components/bento/ports';

export interface BoardContainerProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fillHeight?: boolean;
  bannerTitle?: string;
}

export interface SlotRegistry {
  header: ComponentType<HeaderSlotProps>;
  responsibilities: ComponentType<ResponsibilitiesSlotProps>;
  skills: ComponentType<SkillsSlotProps>;
  achievement: ComponentType<AchievementSlotProps>;
}

export interface ISkinStrategy {
  id: SkinId;
  name: string;
  slots: SlotRegistry;
  BoardContainer: ComponentType<BoardContainerProps>;
}
