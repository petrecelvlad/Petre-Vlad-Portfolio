export interface IProject {
  id: string;
  title: string;
  role: string;
  // ISO date "YYYY-MM-DD" | "Present" for current roles. Displayed as quarter (Q1–Q4 YYYY) in UI.
  startDate: string;
  endDate: string;
  description?: string;
  icon?: string;
  type: 'GAME' | 'SOFTWARE';
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  keyScreenshots: string[];
  links: { youtube?: string; website?: string; store?: string };
}

export interface IExperience {
  id: string;
  company: string;
  companyLogo?: string;
  location?: string;
  // ISO date "YYYY-MM-DD" | "Present". Brackets the full employment/engagement span.
  startDate: string;
  endDate: string;
  projects: IProject[];
}
