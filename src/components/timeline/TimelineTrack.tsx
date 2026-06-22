import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';

interface TimelineTrackProps {
  isActive: boolean;
  isConsumed: boolean;
  direction: 'up' | 'down';
  progress: MotionValue<number>;
}

export function TimelineTrack({ isActive, isConsumed, direction, progress }: TimelineTrackProps) {
  const [markerRatio, setMarkerRatio] = useState(0.15); // Default approx

  useEffect(() => {
    const updateRatio = () => {
      const sectionHeight = window.innerHeight - 64;
      const markerYCenter = 84;
      setMarkerRatio(markerYCenter / sectionHeight);
    };
    updateRatio();
    window.addEventListener('resize', updateRatio);
    return () => window.removeEventListener('resize', updateRatio);
  }, []);

  // Use a spring for the input progress to keep it smooth
  const smoothProgress = useSpring(progress, {
    stiffness: 300,
    damping: 30,
    mass: 1
  });

  // Unified mapping for both scroll directions:
  // p = 0.0: Starting to enter from bottom. Height = 0%.
  // p = 0.5: Snapped in center. Height = markerRatio * 100%.
  // p = 1.0: Finished leaving towards top. Height = 100% (connected to next).
  const height = useTransform(smoothProgress, (p) => {
    // If it's definitely in the past, keep it full
    if (isConsumed) return "100%";
    
    // Clamp p to 0-1 range to avoid weirdness at boundaries
    // We only fill if we are the active section or becoming/leaving active.
    const clampedP = Math.max(0, Math.min(1, p));
    
    // If not active and not consumed, we check if we should even show progress.
    // If scrollDirection is down and p > 0, we should be filling.
    // If scrollDirection is up and p < 1, we should be retracting.
    if (!isActive && !isConsumed) {
       if (clampedP <= 0 || clampedP >= 1) return "0%";
    }

    if (clampedP <= 0.5) {
      const ratio = clampedP / 0.5;
      return `${ratio * markerRatio * 100}%`;
    } else {
      const ratio = (clampedP - 0.5) / 0.5;
      return `${(markerRatio + ratio * (1 - markerRatio)) * 100}%`;
    }
  });

  return (
    <>
      {/* Light purple base track that covers full height (opaque) */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-lilac rounded-full" />
      
      {/* Deeper purple progress track */}
      <motion.div 
        className="absolute left-0 right-0 bg-periwinkle-deep rounded-full z-10 shadow-[0_0_12px_rgba(172,150,219,0.3)]"
        style={{ 
          height,
          top: 0,
          willChange: "height", 
          transform: "translateZ(0)" 
        }}
      />
    </>
  );
}
