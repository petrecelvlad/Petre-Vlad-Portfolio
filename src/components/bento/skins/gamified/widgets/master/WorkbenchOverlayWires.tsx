import React from 'react';

export interface WorkbenchOverlayWiresProps {
  toggleState: boolean;
}

export function WorkbenchOverlayWires({ toggleState }: WorkbenchOverlayWiresProps) {
  return (
    <>
      {/* Copper Wire Connecting Toggle Switch to Slide Rule Gauge */}
      <g id="connecting-wires">
        <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#0A0503" strokeWidth="6" opacity="0.5" />
        <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke={toggleState ? "#B45309" : "#52525B"} strokeWidth="4" />
        <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke={toggleState ? "#FBBF24" : "#A1A1AA"} strokeWidth="1.5" strokeDasharray="6,4" />

        {/* Wire from Toggle Switch down to Rotary Dial */}
        <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#0A0503" strokeWidth="5" opacity="0.5" />
        <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke={toggleState ? "#0284C7" : "#3F3F46"} strokeWidth="3.5" />
        <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke={toggleState ? "#38BDF8" : "#71717A"} strokeWidth="1" />
      </g>

      {/* Loose Hardware Scatter */}
      <g transform="translate(272, 235)" filter="url(#wm-shadow-soft)">
        <circle cx="0" cy="0" r="5" fill="#D97706" stroke="#451A03" strokeWidth="1" />
        <line x1="-3" y1="-2" x2="3" y2="2" stroke="#451A03" strokeWidth="1.5" />
      </g>

      <g transform="translate(520, 400)" filter="url(#wm-shadow-soft)">
        <circle cx="0" cy="0" r="6" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.5" fill="#C9B596" />
      </g>

      <g transform="translate(270, 400) rotate(45)" filter="url(#wm-shadow-pin)">
        <path d="M 0 0 L 0 -12 L -3 -15 L 3 -15 L 0 -12 Z" fill="#94A3B8" />
        <circle cx="0" cy="2" r="5" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1" />
        <circle cx="-1" cy="0" r="2" fill="#60A5FA" />
      </g>
    </>
  );
}
