import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SceneProps {
  id?: string;
  children: ReactNode;
  variant?: 'fullscreen' | 'standard' | 'minimal';
  className?: string;
  anchorOffset?: number; // Distance from top for the "Reference Anchor"
}

/**
 * Scene: The standardized "managed stage" container for all main content sections.
 * Ensures consistent padding, vertical rhythm, and provides semantic anchors for
 * orchestrators (like Timeline) to target.
 */
export function Scene({ 
  id, 
  children, 
  variant = 'standard',
  className = '',
  anchorOffset = 100
}: SceneProps) {
  
  const variantClasses = {
    fullscreen: 'h-full flex flex-col justify-center py-10',
    standard: 'h-full flex flex-col justify-center py-10',
    minimal: 'min-h-[50vh] flex flex-col justify-center py-12'
  };

  return (
    <section 
      id={id}
      className={`relative w-full ${variantClasses[variant]} ${className}`}
    >
      {/* 
        The Reference Anchor: A zero-height element that serves as a 
        stable coordinate for the camera/scroll-manager.
      */}
      <div 
        className="absolute left-0 right-0 pointer-events-none opacity-0" 
        style={{ top: anchorOffset }}
        aria-hidden="true"
        data-scene-anchor
      />

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
