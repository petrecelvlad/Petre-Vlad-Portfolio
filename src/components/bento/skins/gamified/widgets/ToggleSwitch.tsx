import React, { useState } from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';

interface ToggleSwitchProps {
  initialOn?: boolean;
  onToggle?: (isOn: boolean) => void;
  className?: string;
  label?: string;
}

export function ToggleSwitch({
  initialOn = true,
  onToggle,
  className = "",
  label = "TOGGLE"
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(initialOn);

  const handleToggle = () => {
    const next = !isOn;
    setIsOn(next);
    if (onToggle) onToggle(next);
  };

  return (
    <svg
      viewBox="-12 -12 245 165"
      className={`w-full h-auto cursor-pointer select-none transition-transform duration-100 active:scale-98 ${className}`}
      onClick={handleToggle}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="ts" />
      <g filter="url(#ts-shadow-heavy)">
        {/* Base Plate Extrusion Base */}
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#0F172A" stroke="#090D16" strokeWidth="3" />
        {/* Front Metal Plate */}
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#334155" stroke="#0F172A" strokeWidth="3" />
        <line x1="5" y1="4" x2="215" y2="4" stroke="#94A3B8" strokeWidth="2" />

        {/* Corner Hex Bolts */}
        <polygon points="15,10 20,13 20,18 15,21 10,18 10,13" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <polygon points="205,10 210,13 210,18 205,21 200,18 200,13" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <polygon points="15,100 20,103 20,108 15,111 10,108 10,103" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <polygon points="205,100 210,103 210,108 205,111 200,108 200,103" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />

        {/* Recessed Switch Slot */}
        <rect x="85" y="20" width="50" height="80" rx="6" fill="#09090B" stroke="#1E293B" strokeWidth="2" />
        <rect x="95" y="25" width="30" height="70" rx="4" fill="#18181B" />

        {/* 3D Toggle Lever - Animated based on isOn */}
        {isOn ? (
          /* Lever Angled UP (ON State) */
          <g className="transition-all duration-200">
            {/* Lever Shadow */}
            <path d="M 110 60 L 145 25 L 160 30 L 115 70 Z" fill="#000000" opacity="0.5" />
            {/* Lever Metallic Body */}
            <path d="M 102 65 L 125 25 L 135 28 L 112 72 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
            <path d="M 105 65 L 127 25 L 131 26 L 110 70 Z" fill="#FFFFFF" />
            {/* Red Solid Switch Knob */}
            <circle cx="130" cy="24" r="14" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
            <circle cx="126" cy="20" r="5" fill="#EF4444" />
            <circle cx="124" cy="18" r="2" fill="#FCA5A5" />
          </g>
        ) : (
          /* Lever Angled DOWN (OFF State) */
          <g className="transition-all duration-200">
            {/* Lever Shadow */}
            <path d="M 110 60 L 145 95 L 160 90 L 115 50 Z" fill="#000000" opacity="0.5" />
            {/* Lever Metallic Body */}
            <path d="M 102 55 L 125 95 L 135 92 L 112 48 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            <path d="M 105 55 L 127 95 L 131 94 L 110 50 Z" fill="#E2E8F0" />
            {/* Red Solid Switch Knob */}
            <circle cx="130" cy="96" r="14" fill="#991B1B" stroke="#450A0A" strokeWidth="2" />
            <circle cx="126" cy="92" r="5" fill="#B91C1C" />
            <circle cx="124" cy="90" r="2" fill="#FCA5A5" opacity="0.6" />
          </g>
        )}

        {/* Indicator Lights */}
        {/* Green Light (ON) */}
        <g transform="translate(30, 40)">
          <circle cx="0" cy="0" r="12" fill="#14532D" stroke="#052E16" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill={isOn ? "#22C55E" : "#15803D"} opacity={isOn ? 1 : 0.4} />
          {isOn && <circle cx="-3" cy="-3" r="3" fill="#DCFCE7" />}
          <text x="-8" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill={isOn ? "#22C55E" : "#475569"}>
            ON
          </text>
        </g>

        {/* Red Light (OFF) */}
        <g transform="translate(180, 40)">
          <circle cx="0" cy="0" r="12" fill="#450A0A" stroke="#290202" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill={!isOn ? "#EF4444" : "#7F1D1D"} opacity={!isOn ? 1 : 0.4} />
          {!isOn && <circle cx="-3" cy="-3" r="3" fill="#FCA5A5" />}
          <text x="-10" y="25" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill={!isOn ? "#EF4444" : "#64748B"}>
            OFF
          </text>
        </g>

        <text x="110" y="112" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#94A3B8" textAnchor="middle">
          {label}
        </text>
      </g>
    </svg>
  );
}
