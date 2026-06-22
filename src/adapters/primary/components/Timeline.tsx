import React, { useMemo, useRef, RefObject } from 'react';
import { AppletWindow } from '@/src/components/applet/Primitives';
import { IExperience, IProject } from '@/src/core/domain/models';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTimelineOrchestrator } from '@/src/hooks/useTimelineOrchestrator';
import { TimelineMarker } from '@/src/components/timeline/TimelineMarker';
import { TimelineTrack } from '@/src/components/timeline/TimelineTrack';
import { ProjectDetails } from '@/src/components/timeline/ProjectDetails';

import { Scene } from '@/src/components/layout/Scene';

interface TimelineProps {
  experiences: IExperience[];
  containerRef: RefObject<HTMLDivElement>;
}

interface TimelineItemProps {
  key?: string;
  project: IProject;
  index: number;
  activeIndex: number;
  scrollDirection: 'up' | 'down';
  onRef: (el: HTMLDivElement | null) => void;
  containerRef: RefObject<HTMLDivElement>;
}

const TimelineItem = ({ project, index, activeIndex, scrollDirection, onRef, containerRef: scrollContainerRef }: TimelineItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isActive = activeIndex === index;
  const isConsumed = index < activeIndex;

  return (
    <div 
      ref={(el) => {
        // @ts-ignore
        containerRef.current = el;
        onRef(el);
      }}
      className="snap-start snap-always h-[calc(100vh-var(--chrome-navbar-height))] w-full flex relative"
    >
      {/* Timeline Track Segment (Base + Active Fill) */}
      <div className="absolute left-[24px] md:left-[44px] inset-y-0 w-1 md:w-2 -translate-x-1/2 pointer-events-none z-20">
        <TimelineTrack 
          isActive={isActive}
          isConsumed={isConsumed}
          direction={scrollDirection}
          progress={scrollYProgress}
        />
      </div>

      {/* Left Column: Timeline Marker */}
      <div className="w-[48px] md:w-[88px] flex-shrink-0 relative pointer-events-none">
        <div className="absolute left-[24px] md:left-[44px] top-[68px] md:top-[60px] -translate-x-1/2 z-30">
           <TimelineMarker 
             isActive={isActive}
             isConsumed={isConsumed}
             direction={scrollDirection}
             progress={scrollYProgress}
           />
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="flex-grow h-full pt-[24px] md:pt-[24px] pb-3 md:pb-5 pr-2 md:pr-4 min-w-0 flex flex-col justify-start">
        <div className="w-full h-full mx-auto overflow-hidden flex items-start justify-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : 20,
              pointerEvents: isActive ? "auto" : "none"
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col justify-start min-h-0"
            style={{ transform: "translateZ(0)" }}
          >
            <ProjectDetails project={project} isActive={isActive} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Timeline({ experiences, containerRef }: TimelineProps) {
  const projects = useMemo(() => {
    return experiences.flatMap(exp => exp.projects);
  }, [experiences]);

  const {
    activeIndex,
    scrollDirection,
    itemRefs
  } = useTimelineOrchestrator({ itemCount: projects.length, containerRef });

  return (
    <div className="relative w-full flex flex-col">
      {projects.map((project, index) => (
        <TimelineItem 
          key={`${project.title}-${index}`}
          project={project}
          index={index}
          activeIndex={activeIndex}
          scrollDirection={scrollDirection}
          onRef={el => { itemRefs.current[index] = el; }}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
