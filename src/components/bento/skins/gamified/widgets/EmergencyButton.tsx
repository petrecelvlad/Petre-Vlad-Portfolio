import React, { useState } from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface EmergencyButtonProps {
  onPress?: () => void;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function EmergencyButton({
  onPress,
  label = "STOP",
  sublabel = "EMERG.",
  className = ""
}: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    if (onPress) onPress();
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <svg
      viewBox="-12 -12 245 165"
      className={`w-full h-auto cursor-pointer select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="eb" />
      <g filter="url(#eb-shadow-heavy)">
        {/* Base Plate 3D Base */}
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#0C0A09" stroke="#050404" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#1C1917" stroke="#0C0A09" strokeWidth="3" />

        {/* Yellow / Black Hazard Caution Plate */}
        <rect x="15" y="15" width="190" height="90" rx="6" fill="url(#eb-hazard-stripe)" stroke="#78350F" strokeWidth="2" />

        {/* Center Heavy Steel Housing */}
        <g transform="translate(110, 60)">
          {/* Housing Shadow */}
          <circle cx="3" cy="6" r="38" fill="#000000" opacity="0.6" />
          {/* Steel Base Bevel */}
          <circle cx="0" cy="0" r="38" fill="#475569" stroke="#0F172A" strokeWidth="3" />
          <circle cx="0" cy="0" r="34" fill="#94A3B8" />
          <circle cx="0" cy="0" r="30" fill="#334155" />

          {/* 3D Deep Extruded Push Button - Pressed offset effect */}
          <g transform={`translate(0, ${isPressed ? 4 : 0})`} className="transition-transform duration-75">
            {/* Button Side Wall (Height) */}
            <path d="M -22 0 C -22 18 22 18 22 0 L 22 10 C 22 28 -22 28 -22 10 Z" fill="#7F1D1D" />
            {/* Button Top Face */}
            <circle cx="0" cy="-3" r="22" fill={isPressed ? "#B91C1C" : "#DC2626"} stroke="#991B1B" strokeWidth="2" />
            <circle cx="0" cy="-3" r="18" fill={isPressed ? "#DC2626" : "#EF4444"} />
            {/* Surface Highlight Arc */}
            <path d="M -12 -8 A 14 14 0 0 1 12 -8" fill="none" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />

            {/* Center STOP Stencil Text */}
            <text
              x="0"
              y="2"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="11"
              fill="#FFFFFF"
              letterSpacing="1"
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        </g>

        {/* Stamped Label Badge */}
        <rect x="18" y="20" width="48" height="20" rx="2" fill="#18181B" stroke="#000" strokeWidth="1" />
        <text x="42" y="33" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#EAB308" textAnchor="middle">
          {sublabel}
        </text>
      </g>
    </svg>
  );
}
