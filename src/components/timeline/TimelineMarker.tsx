import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';

interface TimelineMarkerProps {
  isConsumed: boolean;
  isActive: boolean;
  direction: 'up' | 'down';
  progress: MotionValue<number>;
}

export function TimelineMarker({ isActive, isConsumed, direction, progress }: TimelineMarkerProps) {
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

  const smoothProgress = useSpring(progress, {
    stiffness: 300,
    damping: 30,
    mass: 1
  });

  // The marker reveals when the leading edge of the filling bar touches it.
  // If direction is DOWN: leading edge reaches Marker when progress >= markerRatio.
  // If direction is UP: leading edge reaches Marker when progress >= (1 - markerRatio).
  
  const threshold = direction === 'down' ? markerRatio : (1 - markerRatio);
  
  // Create a normalized "reveal progress" (0 to 1) for the marker animations.
  // We want it to be 1 (visible) when we are snapped (p=0.5) or passed/consumed.
  // We want it to "reveal" as we approach p=0.5 from either direction.
  const revealProgress = useTransform(smoothProgress, (p) => {
    if (isConsumed) return 1;
    
    if (direction === 'down') {
      // Entering from bottom: p goes 0 to 0.5. Reveal as we approach 0.5.
      if (p >= 0.5) return 1;
      return Math.max(0, (p - 0.45) * 20); // 0.45 -> 0.5 maps to 0 -> 1
    } else {
      // Entering from top (scrolling UP): p goes 1 to 0.5.
      // Reveal as we approach 0.5 from above (retraction hits marker).
      if (p <= 0.5) return 1;
      return Math.max(0, (0.55 - p) * 20); // 0.55 -> 0.5 maps to 0 -> 1
    }
  });

  const scale = useTransform(revealProgress, [0, 0.8, 1], [0, 1.2, 1]);
  const opacity = useTransform(revealProgress, [0, 1], [0, 1]);
  
  const backgroundColor = useTransform(
    revealProgress,
    [0.5, 1],
    ["rgba(253, 251, 247, 1)", "rgba(172, 150, 219, 1)"]
  );
  
  const borderColor = useTransform(
    revealProgress,
    [0.5, 1],
    ["rgba(229, 229, 229, 1)", "rgba(26, 26, 26, 1)"]
  );

  return (
    <div className="z-20 flex items-center justify-center w-8 h-8 md:w-12 md:h-12">
      <motion.div 
        style={{
          scale,
          opacity,
          backgroundColor,
          borderColor,
        }}
        className="w-5 h-5 md:w-7 md:h-7 rounded-full border-[3px] md:border-4 shadow-applet-sm"
      />
    </div>
  );
}
