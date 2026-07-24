/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { IExperience } from '@/src/core/domain/models';
import { JsonExperienceRepository } from '@/src/adapters/secondary/JsonExperienceRepo';
import { Navbar } from '@/src/adapters/primary/components/Navbar';
import { Hero } from '@/src/adapters/primary/components/Hero';
import { SkillTree } from '@/src/adapters/primary/components/SkillTree';
import { Timeline } from '@/src/adapters/primary/components/Timeline';
import { BacklogView } from '@/src/adapters/primary/components/BacklogView';
import { Circle, Square, Triangle } from 'lucide-react';

export default function App() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [showBacklog, setShowBacklog] = useState(false);
  const repo = new JsonExperienceRepository();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    repo.getAllExperiences().then(setExperiences);
  }, []);

  return (
    <div className="bg-bg text-text h-screen overflow-hidden flex flex-col">
      <Helmet>
        <title>Vlad Petre | Senior Game Designer Portfolio</title>
      </Helmet>
      
      <Navbar onToggleBacklog={() => setShowBacklog(b => !b)} isBacklog={showBacklog} />

      {showBacklog ? (
        <BacklogView experiences={experiences} />
      ) : (
      <main ref={mainRef} className="flex-1 w-full relative overflow-y-auto snap-y snap-mandatory select-none">
        {/*
          No scroll-smooth here on purpose. CSS scroll-behavior: smooth
          forces every native wheel-triggered snap to animate — under
          fast/rapid scrolling, a new wheel tick arrives before the
          previous snap's animation resolves, and Chromium can lose track
          of the in-progress scroll and land on an unintended section
          entirely (reproduced: it can jump all the way back to
          Hero/SkillTree, above the project list, which is exactly where
          the timeline rail is correctly hidden — this is what read as
          "the timeline disappears on some projects"). The two JS-driven
          jumps (TimelineRail's onNavigate, Hero's "View My Work") each
          pass behavior: 'smooth' directly to scrollIntoView/scrollTo, so
          they animate regardless of this class; only native wheel-scroll
          snapping is affected, and CSS scroll-snap already provides its
          own settling animation without needing this on top.
        */}
        <div className="snap-start snap-always h-[calc(100vh-var(--chrome-navbar-height))] w-full flex items-center justify-center">
          <Hero />
        </div>
        <div className="snap-start snap-always h-[calc(100vh-var(--chrome-navbar-height))] w-full">
          <SkillTree />
        </div>
        <Timeline experiences={experiences} containerRef={mainRef} />
        
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
  );
}
