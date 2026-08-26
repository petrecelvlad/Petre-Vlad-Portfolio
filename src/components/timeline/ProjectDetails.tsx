import type React from 'react';
import { IProject } from '@/src/core/domain/models';
import { BentoHeader } from '../bento/shared/BentoHeader';
import { BentoResponsibilities } from '../bento/shared/BentoResponsibilities';
import { BentoSkills } from '../bento/shared/BentoSkills';
import { BentoAchievement } from '../bento/shared/BentoAchievement';
import { BentoVideoFrame } from '../bento/BentoVideoFrame';
import { Stack } from '../atoms/Stack';

interface ProjectDetailsProps {
  key?: React.Key;
  project: IProject;
  isActive: boolean;
}

export function ProjectDetails({ project, isActive }: ProjectDetailsProps) {
  return (
    <Stack gap="md" className="w-full h-full min-h-0 overflow-y-auto overflow-x-hidden px-1 py-7">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] flex-grow gap-4 md:gap-6 items-stretch min-h-0">
        
        {/* Left Column */}
        <Stack gap="md" className="min-h-0">
          <BentoHeader
            title={project.title}
            icon={project.icon}
            startDate={project.startDate}
            endDate={project.endDate}
          />
          <div className="flex-grow min-h-0 flex flex-col">
            <BentoResponsibilities
              responsibilities={project.responsibilities}
              role={project.role}
              title={project.title}
              icon={project.icon}
              startDate={project.startDate}
              endDate={project.endDate}
            />
          </div>
        </Stack>

        {/* Right Column */}
        <Stack gap="md" className="min-h-0">
          <div className="flex-shrink-0">
            <BentoAchievement achievement={project.achievements?.[0]} />
          </div>
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
    </Stack>
  );
}
