import { IProject } from '@/src/core/domain/models';
import { ProjectDetails } from '@/src/components/timeline/ProjectDetails';
import { WoodBackground } from '@/src/components/bento/skins/heritage/WoodBackground';
import { useSkin } from '@/src/context/SkinContext';

interface ProjectStageProps {
  project: IProject;
}

// The persistent Project Viewer shell — Phase 1 of
// docs/Architecture/specs/Project_Viewer_Evolution.md. Mounted ONCE by
// Timeline.tsx as a `position: sticky` overlay spanning the whole project
// list's scroll range. This component doesn't know or care about scroll
// position — it just renders whichever `project` it's handed. The
// background/clipboard/phone/notes/banner chrome never remounts as the user
// scrolls between projects; only this component's `project` prop changes,
// swapping the content inside the same mounted DOM tree.
//
// `key={project.id}` on ProjectDetails below is deliberate, not incidental:
// without it, BentoResponsibilities' internal page-tab state (and any other
// per-project local state deeper in the tree) would persist across a
// project change, since React would see "the same component, new props"
// rather than "a different project" — e.g. leaving the clipboard on page 3
// when scrolling from a project you'd flipped ahead on into the next one.
// Keying on the project forces a clean remount of the content subtree (but
// not this shell) on every swap, which for Phase 1's "instant swap, no
// animation" posture is exactly the right amount of continuity: the frame
// stays, the content starts fresh.
export function ProjectStage({ project }: ProjectStageProps) {
  const { skin } = useSkin();

  return (
    <div className="relative z-0 h-full w-full flex">
      {skin === 'heritage' && <WoodBackground />}

      {/* Left column: spacer, keeps content clear of the fixed TimelineRail. */}
      <div className="w-[48px] md:w-[88px] flex-shrink-0 relative pointer-events-none" />

      {/* Right column: content */}
      <div className="relative z-0 flex-grow h-full pt-[24px] md:pt-[24px] pb-3 md:pb-5 pr-2 md:pr-4 min-w-0 flex flex-col justify-start">
        <div className="w-full h-full mx-auto overflow-hidden flex items-start justify-center pointer-events-auto">
          <div className="w-full h-full flex flex-col justify-start min-h-0">
            <ProjectDetails key={project.id} project={project} isActive />
          </div>
        </div>
      </div>
    </div>
  );
}
