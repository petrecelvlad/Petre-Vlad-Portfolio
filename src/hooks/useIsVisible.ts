import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is currently intersecting the viewport.
 * Used to gate always-on RAF/WebGL work (canvases, video) so it only
 * costs GPU/CPU while actually visible on screen.
 */
export function useIsVisible<T extends Element>(threshold = 0) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
