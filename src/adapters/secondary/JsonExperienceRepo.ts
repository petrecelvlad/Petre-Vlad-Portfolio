import { IExperience } from '@/src/core/domain/models';
import { IExperienceRepository } from '@/src/ports/experienceRepo';
import portfolioData from '@/src/infrastructure/data/portfolio.json';

function sortDesc(a: string, b: string): number {
  return b.localeCompare(a);
}

function sortExperiences(data: IExperience[]): IExperience[] {
  return [...data]
    .sort((a, b) => sortDesc(a.startDate, b.startDate))
    .map(exp => ({
      ...exp,
      projects: [...exp.projects].sort((a, b) => sortDesc(a.startDate, b.startDate)),
    }));
}

export class JsonExperienceRepository implements IExperienceRepository {
  async getAllExperiences(): Promise<IExperience[]> {
    return sortExperiences(portfolioData as IExperience[]);
  }

  async getExperienceById(id: string): Promise<IExperience | undefined> {
    return portfolioData.find(exp => exp.id === id) as IExperience | undefined;
  }
}
