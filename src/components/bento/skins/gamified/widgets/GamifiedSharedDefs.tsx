import React from 'react';

/**
 * Shared SVG definitions (filters, drop shadows, pattern textures)
 * used across the Gamified Tactile Workshop component library.
 */
export function GamifiedSharedDefs({ idPrefix = 'gamified' }: { idPrefix?: string }) {
  return (
    <defs>
      {/* Master Drop Shadows */}
      <filter id={`${idPrefix}-shadow-heavy`} x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="5" dy="9" stdDeviation="4" floodColor="#0E0704" floodOpacity="0.75" />
      </filter>
      <filter id={`${idPrefix}-shadow-medium`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="3" floodColor="#120A05" floodOpacity="0.65" />
      </filter>
      <filter id={`${idPrefix}-shadow-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#1A0F07" floodOpacity="0.4" />
      </filter>
      <filter id={`${idPrefix}-shadow-pin`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="6" dy="10" stdDeviation="2" floodColor="#0A0503" floodOpacity="0.55" />
      </filter>

      {/* Visual Textures & Patterns */}
      <pattern id={`${idPrefix}-workbench-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#B8A58A" strokeWidth="0.8" opacity="0.4" />
        <circle cx="20" cy="20" r="1" fill="#8C7A63" opacity="0.5" />
      </pattern>

      <pattern id={`${idPrefix}-cork-texture`} width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="#B88344" />
        <circle cx="4" cy="4" r="1.5" fill="#96642A" opacity="0.6" />
        <circle cx="12" cy="10" r="2" fill="#875620" opacity="0.5" />
        <circle cx="14" cy="2" r="1" fill="#D4A05B" opacity="0.7" />
        <circle cx="2" cy="12" r="1.2" fill="#6E4313" opacity="0.4" />
      </pattern>

      <pattern id={`${idPrefix}-hazard-stripe`} width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <rect width="10" height="20" fill="#EAB308" />
        <rect x="10" width="10" height="20" fill="#1C1917" />
      </pattern>

      <pattern id={`${idPrefix}-cardboard-flute`} width="6" height="10" patternUnits="userSpaceOnUse">
        <line x1="1" y1="0" x2="1" y2="10" stroke="#A87948" strokeWidth="2" />
        <line x1="4" y1="0" x2="4" y2="10" stroke="#D9A774" strokeWidth="2" />
      </pattern>
    </defs>
  );
}
