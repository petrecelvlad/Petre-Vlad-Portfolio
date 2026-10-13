import type { IProjectOverview } from '@/src/core/domain/models';

export type SlotName = 'header' | 'responsibilities' | 'skills' | 'achievement';

export interface HeaderSlotProps {
  title: string;
  icon?: string;
  startDate: string;
  endDate: string;
}

export interface ResponsibilitiesSlotProps {
  overview: IProjectOverview;
  responsibilities: string[];
  role: string;
  title?: string;
  icon?: string;
  startDate?: string;
  endDate?: string;
  galleryScreenshots: string[];
}

export interface SkillsSlotProps {
  skills: string[];
}

export interface AchievementSlotProps {
  achievement?: string;
}
