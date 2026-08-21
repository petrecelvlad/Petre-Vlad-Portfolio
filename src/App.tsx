/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { IExperience } from '@/src/core/domain/models';
import { JsonExperienceRepository } from '@/src/adapters/secondary/JsonExperienceRepo';
import { Navbar } from '@/src/adapters/primary/components/Navbar';
import { Hero } from '@/src/adapters/primary/components/Hero';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { GamifiedShowcase } from '@/src/adapters/primary/components/GamifiedShowcase';
import { BacklogView } from '@/src/adapters/primary/components/BacklogView';
import { useSkin } from '@/src/context/SkinContext';
import { IslandPositionProvider } from '@/src/context/IslandPositionContext';
import { IslandPositionPanel } from '@/src/components/IslandPositionPanel';
import { Circle, Square, Triangle } from 'lucide-react';

// Below-the-fold sections — kept out of the initial bundle so Hero can
// paint before their JS (and the libraries they pull in, e.g. d3-hierarchy)
// has to download/parse.
const SkillTree = lazy(() => import('@/src/adapters/primary/components/SkillTree').then(m => ({ default: m.SkillTree })));
const Timeline = lazy(() => import('@/src/adapters/primary/components/Timeline').then(m => ({ default: m.Timeline })));

export default function App() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [showBacklog, setShowBacklog] = useState(false);
  const { plankStyle } = useSkin();
  const repo = new JsonExperienceRepository();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    repo.getAllExperiences().then(setExperiences);
  }, []);

  return (
    <IslandPositionProvider>
      <div className="bg-bg text-text h-screen overflow-hidden flex flex-col relative">
        <Helmet>
          <title>Vlad Petre | Senior Game Designer Portfolio</title>
        </Helmet>

        <Navbar onToggleBacklog={() => setShowBacklog(b => !b)} isBacklog={showBacklog} />
        <IslandPositionPanel />

        {showBacklog ? (
          <BacklogView experiences={experiences} />
        ) : plankStyle === 'laboratory' ? (
          <div className="flex-1 w-full bg-[#170E08] overflow-y-auto p-2 md:p-4 flex items-center justify-center">
            <GamifiedShowcase />
          </div>
        ) : (
        <main ref={mainRef} className="flex-1 w-full relative overflow-y-auto snap-y snap-mandatory select-none">
          <div className="snap-start snap-always h-[calc(100vh-var(--chrome-navbar-height))] w-full flex items-center justify-center relative z-0">
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
          </div>
          <Suspense fallback={null}>
            <div className="snap-start snap-always h-[calc(100vh-var(--chrome-navbar-height))] w-full relative z-0">
              <SkillTree experiences={experiences} />
            </div>
            <Timeline experiences={experiences} containerRef={mainRef} />
          </Suspense>
          
          <footer className="footer-snap snap-start snap-always bg-surface-inverse text-surface-base px-8 py-20 border-t-[length:var(--border-width-lg)] border-ink-base relative overflow-hidden h-[calc(100vh-var(--chrome-navbar-height))] flex flex-col justify-center">
            {/* Background Decorative Shape */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral/10 rounded-full -mr-48 -mb-48" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-12">
              <div className="flex gap-4">
                 <Circle className="w-12 h-12 fill-coral text-ink-base" />
                 <Square className="w-12 h-12 fill-sky text-ink-base" />
                 <Triangle className="w-12 h-12 fill-butter text-ink-base" />
              </div>

              <div className="text-center">
                <div className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">VLAD PETRE</div>
                <div className="font-display text-lg font-bold uppercase tracking-[0.4em] text-surface-base/50 italic">
                  Making <span className="text-periwinkle">APPS</span> that make you H<span className="text-periwinkle">APP</span>Y!
                </div>
              </div>

              <div className="font-mono pt-20 border-t border-surface-base/10 w-full text-center text-xs font-bold uppercase tracking-[0.5em] text-surface-base/30">
                &copy; {new Date().getFullYear()} Vlad Petre &bull; Game Designer &amp; Producer
              </div>
            </div>
          </footer>
        </main>
        )}
      </div>
    </IslandPositionProvider>
  );
}

