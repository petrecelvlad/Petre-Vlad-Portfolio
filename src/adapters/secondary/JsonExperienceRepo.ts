import { IExperience, IProject } from '@/src/core/domain/models';
import { IExperienceRepository } from '@/src/ports/experienceRepo';
import portfolioData from '@/src/infrastructure/data/portfolio.json';

const BASE = import.meta.env.BASE_URL;

function assetPath(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('/')) return `${BASE}${path.slice(1)}`;
  return path;
}

function resolveProjectPaths(project: IProject): IProject {
  return {
    ...project,
    icon: assetPath(project.icon),
    keyScreenshots: project.keyScreenshots.map(assetPath),
  };
}

function resolveExperience(exp: IExperience): IExperience {
  return {
    ...exp,
    companyLogo: assetPath(exp.companyLogo),
    projects: exp.projects.map(resolveProjectPaths),
  };
}

function sortDesc(a: string, b: string): number {
  return b.localeCompare(a);
}

function prepare(data: IExperience[]): IExperience[] {
  return [...data]
    .map(resolveExperience)
    .sort((a, b) => sortDesc(a.startDate, b.startDate))
    .map(exp => ({
      ...exp,
      projects: [...exp.projects].sort((a, b) => sortDesc(a.startDate, b.startDate)),
    }));
}

export class JsonExperienceRepository implements IExperienceRepository {
  async getAllExperiences(): Promise<IExperience[]> {
    return prepare(portfolioData as IExperience[]);
  }

  async getExperienceById(id: string): Promise<IExperience | undefined> {
    const all = await this.getAllExperiences();
    return all.find(exp => exp.id === id);
  }
}
