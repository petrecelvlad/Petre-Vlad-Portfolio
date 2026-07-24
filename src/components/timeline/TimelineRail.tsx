import { IProject } from '@/src/core/domain/models';

interface TimelineRailProps {
  projects: IProject[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

// Persistent, viewport-fixed progress tracker: one dot per project, evenly
// spaced top-to-bottom, independent of the per-section snap-scroll (each
// project section is its own 100vh snap point, so only one used to ever be
// visible at a time). A dot is "passed" once its project has been reached —
// index <= activeIndex, same rule as the orchestrator's consumedNodes — and
// clicking any dot jumps straight to that section.
export function TimelineRail({ projects, activeIndex, onNavigate }: TimelineRailProps) {
  if (activeIndex === -1) return null;

  return (
    <div className="fixed left-[24px] md:left-[44px] top-0 h-screen -translate-x-1/2 z-40 pointer-events-none hidden sm:block">
      {/*
        --rail-inset is the exact distance from this container's top/bottom
        edge to the first/last dot's CENTER: the flex container's own
        vertical padding (py-20 / md:py-24) plus half the dot button's own
        height (w-8 h-8 / md:w-10 md:h-10) — the button is flush against the
        padding edge under justify-between, so its center sits exactly one
        half-height past the padding. The base/fill lines below used to hardcode
        top-4/bottom-4 (1rem) here, which only accounted for the button
        radius and ignored the padding entirely, leaving the line's endpoints
        ~4-6rem short of the actual first/last dot on every breakpoint.
        justify-between spaces every dot evenly between those two centers, so
        matching just the endpoints is enough to line up every dot in between.
      */}
      <div className="relative h-full flex flex-col items-center justify-between py-20 md:py-24 [--rail-inset:6rem] md:[--rail-inset:7.25rem]">
        {/* Base line spanning all dot centers */}
        <div
          className="absolute w-1 md:w-1.5 -translate-x-1/2 left-1/2 bg-lilac rounded-full"
          style={{ top: 'var(--rail-inset)', bottom: 'var(--rail-inset)' }}
        />
        {/* Filled portion up to the active project */}
        <div
          className="absolute w-1 md:w-1.5 -translate-x-1/2 left-1/2 bg-periwinkle-deep rounded-full transition-[height] duration-500 ease-out"
          style={{
            top: 'var(--rail-inset)',
            height: projects.length > 1
              ? `calc((100% - (var(--rail-inset) * 2)) * ${activeIndex / (projects.length - 1)})`
              : 0,
          }}
        />

        {projects.map((project, index) => {
          const isPassed = index <= activeIndex;
          return (
            <button
              key={`${project.title}-${index}`}
              type="button"
              onClick={() => onNavigate(index)}
              aria-label={`Jump to ${project.title}`}
              aria-current={index === activeIndex}
              className="relative z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 pointer-events-auto cursor-pointer group"
            >
              <span
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-[length:var(--border-width-md)] shadow-raised transition-colors duration-300 group-hover:scale-110 ${
                  isPassed ? 'bg-periwinkle-deep border-ink-base' : 'bg-surface-base border-ink-base/25'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
