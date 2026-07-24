import { useState, useEffect, useRef, RefObject } from 'react';
import { useMotionValue, useScroll, useSpring, MotionValue } from 'motion/react';

interface UseTimelineOrchestratorProps {
  itemCount: number;
  containerRef?: RefObject<HTMLDivElement>;
}

export function useTimelineOrchestrator({ 
  itemCount,
  containerRef
}: UseTimelineOrchestratorProps) {
  // 1. All hooks at the top, stable order
  const { scrollY } = useScroll({ container: containerRef });
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [consumedNodes, setConsumedNodes] = useState<boolean[]>(new Array(itemCount).fill(false));
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (latest > lastScrollY.current) {
        setScrollDirection('down');
      } else if (latest < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = latest;
    });
  }, [scrollY]);

  useEffect(() => {
    const observerOptions = {
      root: containerRef?.current || null,
      // A 1px erosion on top/bottom, not '0px'. Project sections are stacked
      // with zero gap (each exactly 100vh), so the Skill Tree's resting snap
      // position always leaves the first project's top edge touching the
      // viewport's bottom edge at 0 overlap — Chromium reports that exact
      // touch as isIntersecting: true anyway, which used to flip the rail on
      // while still fully looking at the Skill Tree. Eroding the root by 1px
      // forces genuine overlap before a section counts as intersecting.
      rootMargin: '-1px 0px -1px 0px',
      threshold: Array.from({ length: 21 }, (_, i) => i / 20)
    };

    // Persistent, full picture of every observed section's last-known
    // intersection state. IntersectionObserver only delivers entries for
    // targets whose ratio crossed a threshold *since the last callback* —
    // not the current state of every observed target. Deriving the winner
    // from only the entries in one callback batch is unsound under a fast
    // scroll: the section that's genuinely fullscreen right now might not
    // appear in this particular batch at all (its ratio didn't just
    // change), while whichever sections DO appear in the batch can all be
    // mid-transition with no positive ratio — which used to read as
    // "nothing is intersecting, we've left the timeline" and reset
    // activeIndex to -1, hiding the rail, even while still deep in the
    // project list. Tracking last-known state per section and always
    // picking the winner from the full array (not just this batch) fixes
    // that at the root.
    const sectionState: { ratio: number; isIntersecting: boolean }[] =
      new Array(itemCount).fill(null).map(() => ({ ratio: -1, isIntersecting: false }));

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
        if (index === -1) return;

        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
        if (!isVisible) {
          sectionState[index] = { ratio: -1, isIntersecting: false };
          return;
        }

        const rect = entry.boundingClientRect;
        const rootBounds = entry.rootBounds || { top: 0, height: window.innerHeight };
        const viewportHeight = rootBounds.height;

        // Track active section for consumed nodes logic
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = rootBounds.top + viewportHeight / 2;
        const distanceToCenter = Math.abs(sectionCenter - viewportCenter);
        const ratio = 1 - (distanceToCenter / viewportHeight);

        sectionState[index] = { ratio, isIntersecting: true };
      });

      let maxRatio = -1;
      let targetIndex = -1;
      sectionState.forEach((s, i) => {
        if (s.isIntersecting && s.ratio > maxRatio) {
          maxRatio = s.ratio;
          targetIndex = i;
        }
      });

      if (targetIndex !== -1) {
        if (targetIndex !== activeIndexRef.current) {
          setActiveIndex(targetIndex);
          setConsumedNodes(prev => {
            const next = [...prev];
            for (let i = 0; i <= targetIndex; i++) next[i] = true;
            for (let i = targetIndex + 1; i < itemCount; i++) next[i] = false;
            return next;
          });
        }
      } else if (activeIndexRef.current !== -1) {
        // No project section intersects at all — we're outside the Timeline
        // entirely (Hero, SkillTree, or Footer), not just between two of its
        // sections mid-snap (those always keep at least one intersecting).
        // Reset regardless of scroll position so the rail only ever shows
        // while an actual project section is in view.
        setActiveIndex(-1);
        setConsumedNodes(new Array(itemCount).fill(false));
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    itemRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [itemCount, containerRef]);

  return {
    activeIndex,
    consumedNodes,
    itemRefs,
    setActiveIndex,
    scrollDirection
  };
}
