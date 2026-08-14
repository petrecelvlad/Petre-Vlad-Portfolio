import React, { useState } from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface CorkboardNoteProps {
  title?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  initialChecked?: boolean;
  className?: string;
  onToggleCheck?: (checked: boolean) => void;
}

export function CorkboardNote({
  line1 = "DESIGN SYSTEM",
  line2 = "TACTILE WIDGETS",
  line3 = "GAMIFIED SKIN",
  initialChecked = true,
  className = "",
  onToggleCheck
}: CorkboardNoteProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    const next = !isChecked;
    setIsChecked(next);
    if (onToggleCheck) onToggleCheck(next);
  };

  return (
    <svg
      viewBox="-12 -12 245 160"
      className={`w-full h-auto cursor-pointer select-none ${className}`}
      onClick={handleToggle}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="cb" />
      <g filter="url(#cb-shadow-heavy)">
        {/* Sunken Wooden Frame 3D Base */}
        <rect x="0" y="10" width="220" height="125" rx="8" fill="#270F03" stroke="#1A0A03" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="125" rx="8" fill="#451A03" stroke="#1A0A03" strokeWidth="3" />
        {/* Recessed Cork Surface */}
        <rect x="10" y="10" width="200" height="105" rx="4" fill="url(#cb-cork-texture)" stroke="#270F03" strokeWidth="2.5" />
        {/* Inner Shadow effect overlay for recess */}
        <path d="M 10 10 L 210 10 L 210 22 L 22 22 L 22 115 L 10 115 Z" fill="#000000" opacity="0.3" />

        {/* Pinned Paper Note (Tilted -4 degrees) */}
        <g transform="translate(35, 20) rotate(-4)" filter="url(#cb-shadow-soft)">
          <rect x="0" y="0" width="130" height="85" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Crease/Fold at bottom corner */}
          <path d="M 115 85 L 130 70 L 115 70 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />

          {/* Handwritten Notes lines */}
          <text x="12" y="20" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#1D4ED8">{line1}</text>
          <text x="12" y="35" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#1D4ED8">{line2}</text>
          <text x="12" y="50" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#1D4ED8">{line3}</text>

          {/* Red Checklist Box */}
          <rect x="12" y="62" width="12" height="12" fill="none" stroke="#DC2626" strokeWidth="1.5" />
          {isChecked && (
            <path d="M 14 67 L 17 71 L 24 61" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          )}
          <line x1="30" y1="68" x2="110" y2="68" stroke="#475569" strokeWidth="2" />
        </g>

        {/* Translucent Masking Tape Strip */}
        <polygon points="135,18 175,12 180,26 140,32" fill="#E2E8F0" opacity="0.6" stroke="#CBD5E1" strokeWidth="1" />

        {/* 3D Red Pushpin casting drop shadow */}
        <g transform="translate(95, 22)" filter="url(#cb-shadow-pin)">
          <circle cx="0" cy="0" r="7" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.5" />
          <circle cx="-2" cy="-2" r="3" fill="#EF4444" />
          <circle cx="-3" cy="-3" r="1" fill="#FFFFFF" />
          <path d="M 0 7 L 0 14 L -2 7 Z" fill="#991B1B" />
        </g>
      </g>
    </svg>
  );
}
