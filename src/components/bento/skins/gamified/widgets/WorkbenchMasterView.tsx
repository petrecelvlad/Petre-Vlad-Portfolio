import React from 'react';
import { GamifiedSharedDefs } from './GamifiedSharedDefs';
import { WorkbenchFrameCanvas } from './master/WorkbenchFrameCanvas';
import { WorkbenchHeaderControlBar } from './master/WorkbenchHeaderControlBar';
import { WorkbenchOverlayWires } from './master/WorkbenchOverlayWires';

export interface WorkbenchMasterViewProps {
  toggleState: boolean;
  onToggleStateChange: (val: boolean) => void;
  counterVal: number;
  onCounterValChange: (val: number) => void;
  gaugeVal: number;
  onGaugeValChange: (val: number) => void;
  noteChecked: boolean;
  onNoteCheckedChange: (val: boolean) => void;
  emergencyCount: number;
  onEmergencyPress: () => void;
  className?: string;
}

export function WorkbenchMasterView({
  toggleState,
  onToggleStateChange,
  counterVal,
  onCounterValChange,
  gaugeVal,
  onGaugeValChange,
  noteChecked,
  onNoteCheckedChange,
  emergencyCount,
  onEmergencyPress,
  className = "",
}: WorkbenchMasterViewProps) {
  // Slider calculation: 0% -> x=120, 100% -> x=185
  const cursorX = 25 + (gaugeVal / 100) * 160;

  const handleSlideClick = (e: React.MouseEvent<SVGGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    onGaugeValChange(percent);
  };

  const handleRotaryClick = () => {
    onCounterValChange((counterVal + 1) % 100);
  };

  return (
    <svg
      viewBox="0 0 800 600"
      className={`w-full h-auto block select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GamifiedSharedDefs idPrefix="wm" />

      {/* LEVEL 0: WORKBENCH CANVAS */}
      <WorkbenchFrameCanvas />

      {/* WORKBENCH HEADER CONTROL BAR */}
      <WorkbenchHeaderControlBar toggleState={toggleState} />

      {/* GRID ITEM 1.1: EXTRUDED WOODEN TILE */}
      <g id="item-wood-tile" transform="translate(45, 95)" filter="url(#wm-shadow-heavy)" className="cursor-pointer">
        <rect x="0" y="12" width="210" height="110" rx="10" fill="#3A1E05" stroke="#1C0D02" strokeWidth="3" />
        <rect x="0" y="0" width="210" height="110" rx="10" fill="#854D0E" stroke="#1C0D02" strokeWidth="3" />
        <path d="M 8 3 L 202 3" stroke="#A16207" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="12" width="186" height="86" rx="6" fill="#713F12" stroke="#3B1F04" strokeWidth="2" />
        <circle cx="105" cy="55" r="28" fill="#D97706" stroke="#451A03" strokeWidth="3" />
        <circle cx="105" cy="55" r="24" fill="#B45309" />
        <path d="M 105 37 L 109 37 L 111 42 L 115 43 L 119 40 L 122 43 L 119 47 L 121 51 L 126 53 L 126 57 L 121 59 L 119 63 L 122 67 L 119 70 L 111 68 L 109 73 L 105 73 L 101 73 L 99 68 L 95 67 L 91 70 L 88 67 L 91 63 L 89 59 L 84 57 L 84 53 L 89 51 L 91 47 L 88 43 L 91 40 L 95 43 L 99 42 L 101 37 Z" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.5" />
        <circle cx="105" cy="55" r="8" fill="#78350F" />
        <rect x="45" y="82" width="120" height="20" rx="2" fill="#09090B" stroke="#000" strokeWidth="1" />
        <text x="53" y="96" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#FFF">OAK_BLOCK_01</text>
      </g>

      {/* GRID ITEM 1.2: CARDBOARD & CERAMIC TILE */}
      <g id="item-cardboard-ceramic" transform="translate(45, 255)" filter="url(#wm-shadow-medium)">
        <path d="M 10 0 L 210 0 A 8 8 0 0 1 218 8 L 218 122 A 8 8 0 0 1 210 130 L 10 130 A 8 8 0 0 1 2 122 L 2 8 A 8 8 0 0 1 10 0 Z" fill="#D4A373" stroke="#523917" strokeWidth="2" />
        <path d="M 2 12 L -8 20 L 2 32 L -8 44 L 2 56 L -8 68 L 2 80 L -8 92 L 2 104 L -8 116 L 2 124 Z" fill="url(#wm-cardboard-flute)" stroke="#6E4D2B" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="7" fill="#B45309" stroke="#451A03" strokeWidth="2" />
        <circle cx="20" cy="20" r="3.5" fill="#24160E" />
        <path d="M 20 20 C 0 10 -15 30 -25 5" fill="none" stroke="#EAB308" strokeWidth="2.5" strokeDasharray="4,2" />
        <g transform="translate(65, 18)" filter="url(#wm-shadow-soft)">
          <rect x="0" y="8" width="120" height="90" rx="8" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <rect x="0" y="0" width="120" height="90" rx="8" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
          <line x1="4" y1="3" x2="116" y2="3" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="15" y="12" width="90" height="66" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M 60 60 L 40 40 A 12 12 0 0 1 60 25 A 12 12 0 0 1 80 40 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          <path d="M 60 55 L 45 40 A 8 8 0 0 1 60 29 A 8 8 0 0 1 75 40 Z" fill="#EF4444" />
        </g>
      </g>

      {/* GRID ITEM 1.3: LEATHER STRAP & BUCKLE */}
      <g id="item-leather" transform="translate(45, 415)" filter="url(#wm-shadow-heavy)">
        <rect x="0" y="12" width="220" height="120" rx="12" fill="#2A1207" stroke="#1C0A04" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#7C2D12" stroke="#1C0A04" strokeWidth="3" />
        <rect x="7" y="7" width="206" height="106" rx="8" fill="none" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6,4" />
        <rect x="16" y="16" width="188" height="88" rx="5" fill="#9A3412" stroke="#431407" strokeWidth="2" />
        <g transform="translate(130, 25)" filter="url(#wm-shadow-soft)">
          <rect x="0" y="0" width="65" height="70" rx="8" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <rect x="12" y="12" width="41" height="46" rx="4" fill="#431407" stroke="#78350F" strokeWidth="2" />
          <path d="M 5 35 L 50 35" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
          <path d="M 5 35 L 50 35" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          <path d="M 4 4 L 61 4" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx="35" cy="40" r="7" fill="#B45309" stroke="#451A03" strokeWidth="2" />
        <circle cx="35" cy="40" r="5" fill="#D97706" />
        <line x1="31" y1="40" x2="39" y2="40" stroke="#451A03" strokeWidth="1.5" />
        <circle cx="35" cy="80" r="7" fill="#B45309" stroke="#451A03" strokeWidth="2" />
        <circle cx="35" cy="80" r="5" fill="#D97706" />
        <line x1="35" y1="76" x2="35" y2="84" stroke="#451A03" strokeWidth="1.5" />
      </g>

      {/* GRID ITEM 2.1: CORKBOARD & PINNED NOTE */}
      <g
        id="item-corkboard"
        transform="translate(290, 95)"
        filter="url(#wm-shadow-heavy)"
        className="cursor-pointer"
        onClick={() => onNoteCheckedChange(!noteChecked)}
      >
        <rect x="0" y="10" width="220" height="125" rx="8" fill="#270F03" stroke="#1A0A03" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="125" rx="8" fill="#451A03" stroke="#1A0A03" strokeWidth="3" />
        <rect x="10" y="10" width="200" height="105" rx="4" fill="url(#wm-cork-texture)" stroke="#270F03" strokeWidth="2.5" />
        <path d="M 10 10 L 210 10 L 210 22 L 22 22 L 22 115 L 10 115 Z" fill="#000000" opacity="0.3" />
        <g transform="translate(35, 20) rotate(-4)" filter="url(#wm-shadow-soft)">
          <rect x="0" y="0" width="130" height="85" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M 115 85 L 130 70 L 115 70 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
          <line x1="12" y1="20" x2="110" y2="20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="35" x2="95" y2="35" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="50" x2="105" y2="50" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <rect x="12" y="62" width="10" height="10" fill="none" stroke="#DC2626" strokeWidth="1.5" />
          {noteChecked && <path d="M 14 67 L 17 70 L 24 61" fill="none" stroke="#DC2626" strokeWidth="2" />}
          <line x1="30" y1="68" x2="80" y2="68" stroke="#475569" strokeWidth="2" />
        </g>
        <polygon points="135,18 175,12 180,26 140,32" fill="#E2E8F0" opacity="0.6" stroke="#CBD5E1" strokeWidth="1" />
        <g transform="translate(95, 22)" filter="url(#wm-shadow-pin)">
          <circle cx="0" cy="0" r="7" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.5" />
          <circle cx="-2" cy="-2" r="3" fill="#EF4444" />
          <circle cx="-3" cy="-3" r="1" fill="#FFFFFF" />
          <path d="M 0 7 L 0 14 L -2 7 Z" fill="#991B1B" />
        </g>
      </g>

      {/* GRID ITEM 2.2: INDUSTRIAL TOGGLE SWITCH */}
      <g
        id="item-toggle-switch"
        transform="translate(290, 255)"
        filter="url(#wm-shadow-heavy)"
        className="cursor-pointer"
        onClick={() => onToggleStateChange(!toggleState)}
      >
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#0F172A" stroke="#090D16" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#334155" stroke="#0F172A" strokeWidth="3" />
        <line x1="5" y1="4" x2="215" y2="4" stroke="#94A3B8" strokeWidth="2" />
        <polygon points="15,10 20,13 20,18 15,21 10,18 10,13" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <polygon points="205,10 210,13 210,18 205,21 200,18 200,13" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <polygon points="15,100 20,103 20,108 15,111 10,108 10,103" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <polygon points="205,100 210,103 210,108 205,111 200,108 200,103" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
        <rect x="85" y="20" width="50" height="80" rx="6" fill="#09090B" stroke="#1E293B" strokeWidth="2" />
        <rect x="95" y="25" width="30" height="70" rx="4" fill="#18181B" />
        <g transform={`translate(0, ${toggleState ? 0 : 35})`} className="transition-transform duration-200">
          <path d="M 110 60 L 145 25 L 160 30 L 115 70 Z" fill="#000000" opacity="0.5" />
          <path d="M 102 65 L 125 25 L 135 28 L 112 72 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
          <path d="M 105 65 L 127 25 L 131 26 L 110 70 Z" fill="#FFFFFF" />
          <circle cx="130" cy="24" r="14" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
          <circle cx="126" cy="20" r="5" fill="#EF4444" />
          <circle cx="124" cy="18" r="2" fill="#FCA5A5" />
        </g>
        <g transform="translate(30, 40)">
          <circle cx="0" cy="0" r="12" fill={toggleState ? "#14532D" : "#052E16"} stroke="#052E16" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill={toggleState ? "#22C55E" : "#15803D"} opacity={toggleState ? 1 : 0.4} />
          <circle cx="-3" cy="-3" r="3" fill="#DCFCE7" opacity={toggleState ? 0.9 : 0.2} />
          <text x="-8" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill={toggleState ? "#22C55E" : "#475569"}>ON</text>
        </g>
        <g transform="translate(180, 40)">
          <circle cx="0" cy="0" r="12" fill={!toggleState ? "#450A0A" : "#290202"} stroke="#290202" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill={!toggleState ? "#DC2626" : "#7F1D1D"} opacity={!toggleState ? 1 : 0.4} />
          <circle cx="-3" cy="-3" r="2" fill="#FCA5A5" opacity={!toggleState ? 0.8 : 0.2} />
          <text x="-10" y="25" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill={!toggleState ? "#EF4444" : "#64748B"}>OFF</text>
        </g>
      </g>

      {/* GRID ITEM 2.3: ROTARY KNOB & SPLIT FLAP */}
      <g id="item-rotary-flap" transform="translate(290, 415)" filter="url(#wm-shadow-heavy)">
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#180E04" stroke="#0F0803" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#291A10" stroke="#0F0803" strokeWidth="3" />
        <g transform="translate(60, 60)" className="cursor-pointer" onClick={handleRotaryClick}>
          <circle cx="3" cy="5" r="42" fill="#000000" opacity="0.6" />
          <circle cx="0" cy="0" r="42" fill="#1C1917" stroke="#09090B" strokeWidth="2" />
          <path d="M 0 -42 L 0 42 M -42 0 L 42 0 M -30 -30 L 30 30 M -30 30 L 30 -30" stroke="#27272A" strokeWidth="5" />
          <circle cx="0" cy="0" r="34" fill="#D97706" stroke="#78350F" strokeWidth="2" />
          <circle cx="0" cy="0" r="30" fill="#18181B" />
          <path d="M 0 -28 L 0 -22 M 20 -20 L 15 -15 M 28 0 L 22 0 M 20 20 L 15 15 M 0 28 L 0 22 M -20 20 L -15 15 M -28 0 L -22 0 M -20 -20 L -15 -15" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="0" cy="0" r="18" fill="#27272A" stroke="#09090B" strokeWidth="2" />
          <g transform={`rotate(${(counterVal % 10) * 36})`} className="transition-transform duration-300">
            <line x1="0" y1="0" x2="0" y2="-26" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4" fill="#DC2626" />
          </g>
        </g>
        <g transform="translate(130, 30)" filter="url(#wm-shadow-soft)">
          <rect x="0" y="0" width="75" height="60" rx="6" fill="#09090B" stroke="#27272A" strokeWidth="2" />
          <g transform="translate(8, 8)">
            <rect x="0" y="0" width="26" height="44" rx="3" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            <line x1="0" y1="22" x2="26" y2="22" stroke="#09090B" strokeWidth="2" />
            <text x="5" y="31" fontFamily="monospace" fontWeight="900" fontSize="24" fill="#FFFFFF">
              {Math.floor(counterVal / 10) % 10}
            </text>
          </g>
          <g transform="translate(40, 8)">
            <rect x="0" y="0" width="26" height="44" rx="3" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            <line x1="0" y1="22" x2="26" y2="22" stroke="#09090B" strokeWidth="2" />
            <text x="5" y="31" fontFamily="monospace" fontWeight="900" fontSize="24" fill="#EAB308">
              {counterVal % 10}
            </text>
          </g>
          <rect x="4" y="27" width="67" height="4" fill="#000000" opacity="0.8" />
        </g>
      </g>

      {/* GRID ITEM 3.1: POLAROID FRAME & WAX SEAL */}
      <g id="item-polaroid-wax" transform="translate(535, 95)" filter="url(#wm-shadow-heavy)">
        <g transform="rotate(3, 110, 65)">
          <rect x="0" y="0" width="160" height="130" rx="4" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="2" />
          <rect x="12" y="12" width="136" height="85" fill="#0F172A" />
          <path d="M 12 75 L 50 40 L 80 65 L 110 30 L 148 75 Z" fill="#334155" />
          <path d="M 12 85 L 60 50 L 95 85 Z" fill="#475569" />
          <circle cx="120" cy="32" r="12" fill="#F59E0B" />
          <text x="35" y="115" fontFamily="serif" fontStyle="italic" fontWeight="bold" fontSize="13" fill="#334155">
            Sample_v04.png
          </text>
          <polygon points="50,-10 100,-14 102,4 52,8" fill="#FEF08A" opacity="0.7" stroke="#CA8A04" strokeWidth="1" />
          <g transform="translate(130, -8)" filter="url(#wm-shadow-soft)">
            <path d="M 0 10 L 0 30 A 6 6 0 0 0 12 30 L 12 5 A 4 4 0 0 0 4 5 L 4 25" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
        <g transform="translate(150, 70)" filter="url(#wm-shadow-heavy)">
          <path d="M 10 20 L -10 60 L 10 55 L 20 65 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="1.5" />
          <path d="M 25 20 L 35 65 L 45 55 L 60 60 Z" fill="#7F1D1D" stroke="#450A0A" strokeWidth="1.5" />
          <path d="M 25 -5 C 40 -8 55 2 58 18 C 62 32 50 48 35 50 C 20 52 2 45 -3 30 C -8 15 8 -2 25 -5 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="2" />
          <path d="M 25 -1 C 37 -4 48 5 51 18 C 54 30 44 42 32 44 C 18 46 4 39 0 27 C -4 15 10 2 25 -1 Z" fill="#B91C1C" />
          <circle cx="26" cy="22" r="18" fill="#7F1D1D" stroke="#450A0A" strokeWidth="2" />
          <circle cx="26" cy="22" r="16" fill="#991B1B" />
          <path d="M 26 12 L 30 18 L 36 15 L 32 24 L 38 28 L 26 27 L 14 28 L 20 24 L 16 15 L 22 18 Z" fill="#FECACA" stroke="#7F1D1D" strokeWidth="1" />
        </g>
      </g>

      {/* GRID ITEM 3.2: SLIDE RULE & GAUGE METER */}
      <g id="item-slide-gauge" transform="translate(535, 255)" filter="url(#wm-shadow-heavy)">
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#2A0800" stroke="#1C0700" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#451A03" stroke="#1C0700" strokeWidth="3" />
        <rect x="15" y="35" width="190" height="50" rx="4" fill="#1C0A00" stroke="#2A0800" strokeWidth="2" />
        <path d="M 25 35 L 25 45 M 35 35 L 35 41 M 45 35 L 45 41 M 55 35 L 55 41 M 65 35 L 65 45 M 75 35 L 75 41 M 85 35 L 85 41 M 95 35 L 95 41 M 105 35 L 105 48 M 115 35 L 115 41 M 125 35 L 125 41 M 135 35 L 135 41 M 145 35 L 145 45 M 155 35 L 155 41 M 165 35 L 165 41 M 175 35 L 175 41 M 185 35 L 185 45" stroke="#FEF3C7" strokeWidth="1.5" />
        <path d="M 25 85 L 25 75 M 65 85 L 65 75 M 105 85 L 105 72 M 145 85 L 145 75 M 185 85 L 185 75" stroke="#FEF3C7" strokeWidth="1.5" />
        <text x="22" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">0</text>
        <text x="60" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">25</text>
        <text x="100" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">50</text>
        <text x="140" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">75</text>
        <text x="178" y="25" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FDE68A">100</text>
        <g
          transform={`translate(${cursorX - 17.5}, 25)`}
          filter="url(#wm-shadow-medium)"
          className="cursor-ew-resize"
          onClick={handleSlideClick}
        >
          <rect x="0" y="0" width="35" height="70" rx="4" fill="#F59E0B" fillOpacity="0.35" stroke="#D97706" strokeWidth="2" />
          <line x1="5" y1="5" x2="20" y2="65" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          <line x1="17.5" y1="0" x2="17.5" y2="70" stroke="#EF4444" strokeWidth="2" />
          <rect x="5" y="-5" width="25" height="7" rx="2" fill="#B45309" stroke="#451A03" strokeWidth="1" />
          <rect x="5" y="68" width="25" height="7" rx="2" fill="#B45309" stroke="#451A03" strokeWidth="1" />
        </g>
        <rect x="60" y="96" width="100" height="18" rx="2" fill="#18181B" stroke="#000" strokeWidth="1" />
        <text x="110" y="109" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#FFF" textAnchor="middle">
          GAUGE_{gaugeVal}%
        </text>
      </g>

      {/* GRID ITEM 3.3: INDUSTRIAL EMERGENCY BUTTON */}
      <g
        id="item-emergency-button"
        transform="translate(535, 415)"
        filter="url(#wm-shadow-heavy)"
        className="cursor-pointer"
        onClick={onEmergencyPress}
      >
        <rect x="0" y="12" width="220" height="120" rx="10" fill="#0C0A09" stroke="#050404" strokeWidth="3" />
        <rect x="0" y="0" width="220" height="120" rx="10" fill="#1C1917" stroke="#0C0A09" strokeWidth="3" />
        <rect x="15" y="15" width="190" height="90" rx="6" fill="url(#wm-hazard-stripe)" stroke="#78350F" strokeWidth="2" />
        <g transform="translate(110, 60)">
          <circle cx="3" cy="6" r="38" fill="#000000" opacity="0.6" />
          <circle cx="0" cy="0" r="38" fill="#475569" stroke="#0F172A" strokeWidth="3" />
          <circle cx="0" cy="0" r="34" fill="#94A3B8" />
          <circle cx="0" cy="0" r="30" fill="#334155" />
          <path d="M -22 0 C -22 18 22 18 22 0 L 22 10 C 22 28 -22 28 -22 10 Z" fill="#7F1D1D" />
          <circle cx="0" cy="-3" r="22" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          <circle cx="0" cy="-3" r="18" fill="#EF4444" />
          <path d="M -12 -8 A 14 14 0 0 1 12 -8" fill="none" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
          <text x="0" y="2" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" letterSpacing="1" textAnchor="middle">
            STOP
          </text>
        </g>
        <rect x="18" y="20" width="55" height="20" rx="2" fill="#18181B" stroke="#000" strokeWidth="1" />
        <text x="45.5" y="33" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#EAB308" textAnchor="middle">
          P:{emergencyCount}
        </text>
      </g>

      {/* OVERLAY WIRES & HARDWARE SCATTER */}
      <WorkbenchOverlayWires toggleState={toggleState} />
    </svg>
  );
}
