import { IProject } from '@/src/core/domain/models';
import { BentoHeader } from '../bento/BentoHeader';
import { BentoResponsibilities } from '../bento/BentoResponsibilities';
import { BentoSkills } from '../bento/BentoSkills';
import { BentoVideoFrame } from '../bento/BentoVideoFrame';
import { BentoAchievement } from '../bento/BentoAchievement';
import { Stack } from '../atoms/Stack';

interface ProjectDetailsProps {
  project: IProject;
  isActive: boolean;
}

export function ProjectDetails({ project, isActive }: ProjectDetailsProps) {
  return (
    <Stack gap="md" className="w-full h-full min-h-0 overflow-y-auto overflow-x-hidden p-1">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] flex-grow gap-4 md:gap-6 items-stretch min-h-0">
        
        {/* Left Column */}
        <Stack gap="md" className="min-h-0">
          <div className="flex-shrink-0">
            <BentoHeader
              title={project.title}
              icon={project.icon}
              startDate={project.startDate}
              endDate={project.endDate}
            />
          </div>
          <div className="flex-grow min-h-0 flex flex-col">
            <BentoResponsibilities responsibilities={project.responsibilities} role={project.role} />
          </div>
        </Stack>

        {/* Right Column */}
        <Stack gap="md" className="min-h-0">
          <div className="flex-grow min-h-0 flex flex-col">
            <BentoVideoFrame
              screenshot={project.keyScreenshots[0]}
              youtubeUrl={project.links.youtube}
              isActive={isActive}
            />
          </div>
          <div className="flex-shrink-0">
            <BentoSkills skills={project.technologies} />
          </div>
        </Stack>

      </div>

      {/* Full Width Bottom — always present */}
      <div className="flex-shrink-0">
        <BentoAchievement achievement={project.achievements?.[0]} />
      </div>
    </Stack>
  );
}
