import React, { useState, useEffect } from 'react';
import { GamePlaque } from '@/src/components/atoms/GamePlaque';

const ROLES = ['PRODUCER', 'DESIGNER', 'ARCHITECT'];
const TYPING_SPEED = 90;   // ms per letter typed
const ERASING_SPEED = 50;  // ms per letter erased
const HOLD_PAUSE = 1800;   // ms pause on full word (1.8s)
const START_PAUSE = 350;   // ms pause before typing next word

export const AnimatedRoleTitle: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTarget = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentTarget.length) {
      // Typing phase
      timer = setTimeout(() => {
        setDisplayText(currentTarget.substring(0, displayText.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && displayText.length === currentTarget.length) {
      // Hold phase on full word
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, HOLD_PAUSE);
    } else if (isDeleting && displayText.length > 0) {
      // Erasing phase
      timer = setTimeout(() => {
        setDisplayText(currentTarget.substring(0, displayText.length - 1));
      }, ERASING_SPEED);
    } else if (isDeleting && displayText.length === 0) {
      // Switch phase to next word
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
      }, START_PAUSE);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="mt-4 sm:mt-5 mb-2 flex justify-center items-center">
      <GamePlaque label="ROLE">
        <h2 className="font-arcade font-bold text-lg sm:text-xl lg:text-2xl text-[#FFFDF7] uppercase tracking-wider leading-none flex justify-center items-center drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
          <span className="inline-flex items-center text-left select-none w-[15.5ch] justify-start">
            <span className="whitespace-pre">GAME </span>
            <span className="text-white">{displayText}</span>
            <span className="inline-block w-[0.45em] h-[0.8em] bg-[#FFFDF7] ml-1 animate-terminal-cursor align-middle shadow-sm flex-shrink-0" />
          </span>
        </h2>
      </GamePlaque>
    </div>
  );
};

export default AnimatedRoleTitle;
