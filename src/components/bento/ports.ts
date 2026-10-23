import type { IProjectLink, IProjectOverview } from '@/src/core/domain/models';

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
  company: string;
  /** Without one, the page shows an ink stamp with the company name instead. */
  companyLogo?: string;
  /** Makes the logo or stamp a link to the company's site. */
  companyUrl?: string;
  links: IProjectLink[];
  isDiscontinued?: boolean;
  /** Point at the Details tab after a short dwell, until the visitor first clicks a tab. */
  showDetailsHint?: boolean;
}

export interface SkillsSlotProps {
  skills: string[];
}

export interface AchievementSlotProps {
  achievement?: string;
}
