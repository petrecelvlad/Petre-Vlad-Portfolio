import { AnimatePresence, motion } from 'motion/react';
import { IProject } from '@/src/core/domain/models';

interface TimelineRailProps {
  projects: IProject[];
  activeIndex: number;
  isInFullView: boolean;
  onNavigate: (index: number) => void;
}

// Own-width percentage: the rail's center sits at most one width from the
// viewport's left edge, so -200% always clears it at every breakpoint.
const OFFSCREEN_X = '-200%';

// Persistent, viewport-fixed progress tracker: one dot per project, evenly
// spaced top-to-bottom, independent of the per-section snap-scroll (each
// project section is its own 100vh snap point, so only one used to ever be
// visible at a time). A dot is "passed" once its project has been reached —
// index <= activeIndex, same rule as the orchestrator's consumedNodes — and
// clicking any dot jumps straight to that section.
//
// Slides in from offscreen-left only once the project region fills the
// viewport. AnimatePresence freezes the exiting rail's last props, so its
// dots don't reset when activeIndex drops to -1 partway through the exit.
export function TimelineRail({ projects, activeIndex, isInFullView, onNavigate }: TimelineRailProps) {
  return (
    <AnimatePresence>
      {isInFullView && activeIndex !== -1 && (
        <motion.div
          key="timeline-rail"
          className="fixed left-[24px] md:left-[44px] top-0 h-screen -translate-x-1/2 z-40 pointer-events-none hidden sm:block"
          initial={{ x: OFFSCREEN_X }}
          animate={{ x: 0 }}
          exit={{ x: OFFSCREEN_X }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
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
              // A dedicated purple emboss, not the shared `--shadow-raised` token — that token's
              // dark line is a warm near-black ink (rgba(36,26,16,0.3)), which is exactly what read
              // as "grey/black" here. Same inset-highlight/inset-shadow shape, purple family both
              // states: idle uses lilac/periwinkle-deep for a quiet ramp, passed uses lilac/
              // periwinkle-darkest for a visibly richer one. color-mix keeps it tied to the tokens.
              const emboss = isPassed
                ? 'inset 0 2px 0 0 color-mix(in srgb, var(--color-lilac) 70%, transparent), inset 0 -2px 0 0 color-mix(in srgb, var(--color-periwinkle-darkest) 55%, transparent)'
                : 'inset 0 2px 0 0 rgba(255, 255, 255, 0.6), inset 0 -2px 0 0 color-mix(in srgb, var(--color-periwinkle-deep) 35%, transparent)';
              return (
                <button
                  key={`${project.title}-${index}`}
                  type="button"
                  onClick={() => onNavigate(index)}
                  aria-label={`Jump to ${project.title}`}
                  aria-current={index === activeIndex}
                  className="relative z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 pointer-events-auto cursor-pointer"
                >
                  <motion.span
                    className={`w-[20px] h-[20px] md:w-[25px] md:h-[25px] rounded-full border-[length:var(--border-width-sm)] transition-colors duration-300 ${
                      isPassed ? 'bg-periwinkle border-periwinkle-deep' : 'bg-lilac border-periwinkle'
                    }`}
                    style={{ boxShadow: emboss }}
                    animate={{ scale: isPassed ? 1 : 0.92 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
