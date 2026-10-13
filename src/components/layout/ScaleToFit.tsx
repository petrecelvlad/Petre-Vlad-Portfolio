import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface ScaleToFitProps {
  children: ReactNode;
  className?: string;
}

// Shrinks its content uniformly until it fits the box this element fills, never enlarging it, and
// eases between scales when the content's size changes. The content keeps its natural layout size
// and is only rendered smaller, so fixed pixel geometry inside it (the skill tree's precomputed
// node positions) stays valid. Anchored left and centered vertically, so content that grows to the
// right zooms out without its left edge moving. The box must get its size from its parent — it
// never sizes itself from the content.
export function ScaleToFit({ children, className = '' }: ScaleToFitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, width: 0, height: 0 });

  useLayoutEffect(() => {
    const frame = frameRef.current!;
    const content = contentRef.current!;
    const measure = () => {
      const width = content.offsetWidth;
      const height = content.offsetHeight;
      const scale = Math.min(1, frame.clientWidth / width, frame.clientHeight / height);
      setFit({ scale, width, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={`flex items-center justify-start overflow-hidden ${className}`}>
      <div
        className="flex-none transition-[width,height] duration-300 ease-out"
        style={{ width: fit.width * fit.scale, height: fit.height * fit.scale }}
      >
        <div
          ref={contentRef}
          className="w-max origin-top-left transition-transform duration-300 ease-out"
          style={{ transform: `scale(${fit.scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
