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
      rootMargin: '0px',
      threshold: Array.from({ length: 21 }, (_, i) => i / 20)
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = -1;
      let targetIndex = -1;

      entries.forEach((entry) => {
        const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
        if (index === -1) return;

        const rect = entry.boundingClientRect;
        const rootBounds = entry.rootBounds || { top: 0, height: window.innerHeight };
        const viewportHeight = rootBounds.height;
        
        // Track active section for consumed nodes logic
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = rootBounds.top + viewportHeight / 2;
        const distanceToCenter = Math.abs(sectionCenter - viewportCenter);
        const ratio = 1 - (distanceToCenter / viewportHeight);

        if (entry.isIntersecting && ratio > maxRatio) {
          maxRatio = ratio;
          targetIndex = index;
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
      } else {
        const currentScroll = containerRef?.current ? containerRef.current.scrollTop : window.scrollY;
        if (currentScroll < 100) {
          setActiveIndex(-1);
          setConsumedNodes(new Array(itemCount).fill(false));
        }
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
