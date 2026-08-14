<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Master Drop Shadows -->
    <filter id="shadow-heavy" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="5" dy="9" stdDeviation="4" flood-color="#0E0704" flood-opacity="0.75"/>
    </filter>
    <filter id="shadow-medium" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="3" flood-color="#120A05" flood-opacity="0.65"/>
    </filter>
    <filter id="shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#1A0F07" flood-opacity="0.4"/>
    </filter>
    <filter id="shadow-pin" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="6" dy="10" stdDeviation="2" flood-color="#0A0503" flood-opacity="0.55"/>
    </filter>

    <!-- Visual Textures & Patterns -->
    <pattern id="workbench-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#B8A58A" stroke-width="0.8" opacity="0.4"/>
      <circle cx="20" cy="20" r="1" fill="#8C7A63" opacity="0.5"/>
    </pattern>

    <pattern id="cork-texture" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#B88344"/>
      <circle cx="4" cy="4" r="1.5" fill="#96642A" opacity="0.6"/>
      <circle cx="12" cy="10" r="2" fill="#875620" opacity="0.5"/>
      <circle cx="14" cy="2" r="1" fill="#D4A05B" opacity="0.7"/>
      <circle cx="2" cy="12" r="1.2" fill="#6E4313" opacity="0.4"/>
    </pattern>

    <pattern id="hazard-stripe" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="10" height="20" fill="#EAB308"/>
      <rect x="10" width="10" height="20" fill="#1C1917"/>
    </pattern>

    <pattern id="cardboard-flute" width="6" height="10" patternUnits="userSpaceOnUse">
      <line x1="1" y1="0" x2="1" y2="10" stroke="#A87948" stroke-width="2"/>
      <line x1="4" y1="0" x2="4" y2="10" stroke="#D9A774" stroke-width="2"/>
    </pattern>
  </defs>

  <!-- ================= LEVEL 0: WORKBENCH CANVAS ================= -->
  <!-- Outer Frame / Desk Body -->
  <rect width="800" height="600" fill="#24160E"/>
  <!-- Bevel Edges of Desk Frame -->
  <path d="M 0 0 L 800 0 L 785 15 L 15 15 Z" fill="#3D271D"/>
  <path d="M 800 0 L 800 600 L 785 585 L 785 15 Z" fill="#170E08"/>
  <path d="M 0 600 L 800 600 L 785 585 L 15 585 Z" fill="#0D0704"/>
  <path d="M 0 0 L 0 600 L 15 585 L 15 15 Z" fill="#2E1C14"/>

  <!-- Main Workshop Cutting Mat (Level 1 Inset Canvas) -->
  <rect x="15" y="15" width="770" height="570" rx="10" fill="#C9B596" stroke="#1A0F0A" stroke-width="4"/>
  <rect x="23" y="23" width="754" height="554" rx="6" fill="url(#workbench-grid)" stroke="#A39073" stroke-width="1.5"/>

  <!-- Brass Corner Reinforcements on Workshop Mat -->
  <!-- Top-Left Corner -->
  <path d="M 15 15 L 55 15 L 55 27 L 27 27 L 27 55 L 15 55 Z" fill="#D97706" stroke="#451A03" stroke-width="2"/>
  <circle cx="38" cy="21" r="2.5" fill="#78350F"/> <circle cx="21" cy="38" r="2.5" fill="#78350F"/>
  <!-- Top-Right Corner -->
  <path d="M 785 15 L 745 15 L 745 27 L 773 27 L 773 55 L 785 55 Z" fill="#D97706" stroke="#451A03" stroke-width="2"/>
  <circle cx="762" cy="21" r="2.5" fill="#78350F"/> <circle cx="779" cy="38" r="2.5" fill="#78350F"/>
  <!-- Bottom-Left Corner -->
  <path d="M 15 585 L 55 585 L 55 573 L 27 573 L 27 545 L 15 545 Z" fill="#D97706" stroke="#451A03" stroke-width="2"/>
  <circle cx="38" cy="579" r="2.5" fill="#78350F"/> <circle cx="21" cy="562" r="2.5" fill="#78350F"/>
  <!-- Bottom-Right Corner -->
  <path d="M 785 585 L 745 585 L 745 573 L 773 573 L 773 545 L 785 545 Z" fill="#D97706" stroke="#451A03" stroke-width="2"/>
  <circle cx="762" cy="579" r="2.5" fill="#78350F"/> <circle cx="779" cy="562" r="2.5" fill="#78350F"/>


  <!-- ================= WORKBENCH HEADER CONTROL BAR ================= -->
  <g id="header-bar" filter="url(#shadow-medium)">
    <!-- Base Plate Extrusion -->
    <path d="M 35 70 L 765 70 L 765 76 L 35 76 Z" fill="#111827"/>
    <!-- Front Plate -->
    <rect x="35" y="28" width="730" height="44" rx="6" fill="#374151" stroke="#111827" stroke-width="2"/>
    <!-- Bevel Light -->
    <line x1="37" y1="30" x2="763" y2="30" stroke="#6B7280" stroke-width="2"/>

    <!-- Dymo Tape Stamped Header Label -->
    <g id="dymo-title">
      <rect x="50" y="35" width="260" height="30" rx="3" fill="#18181B" stroke="#000000" stroke-width="2"/>
      <!-- Stamped Embossed Text -->
      <text x="60" y="56" font-family="monospace" font-weight="900" font-size="15" fill="#FFFFFF" letter-spacing="2" filter="drop-shadow(0px -1px 0px #000)">TACTILE LAB :: SPRITE 3D</text>
    </g>

    <!-- Status LEDs -->
    <g transform="translate(325, 40)">
      <circle cx="12" cy="10" r="7" fill="#15803D" stroke="#052E16" stroke-width="2"/>
      <circle cx="12" cy="10" r="5" fill="#22C55E"/>
      <circle cx="10" cy="8" r="2" fill="#DCFCE7" opacity="0.8"/>
      <text x="25" y="14" font-family="sans-serif" font-weight="bold" font-size="10" fill="#D1D5DB">SYS_OK</text>
    </g>

    <!-- Dymo Tape Sub-Label -->
    <g id="dymo-sub" transform="translate(560, 35)">
      <rect x="0" y="0" width="190" height="30" rx="3" fill="#854D0E" stroke="#451A03" stroke-width="2"/>
      <text x="12" y="20" font-family="monospace" font-weight="900" font-size="14" fill="#FEF08A" letter-spacing="1.5">CATALOG v2.5</text>
    </g>

    <!-- Screws on Header -->
    <circle cx="42" cy="50" r="3" fill="#9CA3AF" stroke="#1F2937"/><line x1="40" y1="50" x2="44" y2="50" stroke="#374151" stroke-width="1.5"/>
    <circle cx="758" cy="50" r="3" fill="#9CA3AF" stroke="#1F2937"/><line x1="756" y1="50" x2="760" y2="50" stroke="#374151" stroke-width="1.5"/>
  </g>


  <!-- ================= GRID ITEM 1.1: EXTRUDED WOODEN TILE ================= -->
  <g id="item-wood-tile" transform="translate(45, 95)" filter="url(#shadow-heavy)">
    <!-- 3D Extruded Sides -->
    <path d="M 0 110 L 0 122 A 10 10 0 0 0 10 132 L 210 132 A 10 10 0 0 0 220 122 L 220 110 Z" fill="#3A1E05"/>
    <path d="M 210 0 L 220 10 L 220 122 L 210 110 Z" fill="#2C1603"/>
    <!-- Tile Front Face -->
    <rect x="0" y="0" width="210" height="110" rx="10" fill="#854D0E" stroke="#1C0D02" stroke-width="3"/>
    <!-- Top Bevel Highlight -->
    <path d="M 8 3 L 202 3" stroke="#A16207" stroke-width="2" stroke-linecap="round"/>
    <!-- Inner Inset Tray -->
    <rect x="12" y="12" width="186" height="86" rx="6" fill="#713F12" stroke="#3B1F04" stroke-width="2"/>
    <!-- Carved Pattern / Stamped Brass Emblem -->
    <circle cx="105" cy="55" r="28" fill="#D97706" stroke="#451A03" stroke-width="3"/>
    <circle cx="105" cy="55" r="24" fill="#B45309"/>
    <!-- Gear Icon -->
    <path d="M 105 37 L 109 37 L 111 42 L 115 43 L 119 40 L 122 43 L 119 47 L 121 51 L 126 53 L 126 57 L 121 59 L 119 63 L 122 67 L 119 70 L 115 67 L 111 68 L 109 73 L 105 73 L 101 73 L 99 68 L 95 67 L 91 70 L 88 67 L 91 63 L 89 59 L 84 57 L 84 53 L 89 51 L 91 47 L 88 43 L 91 40 L 95 43 L 99 42 L 101 37 Z" fill="#FEF3C7" stroke="#78350F" stroke-width="1.5"/>
    <circle cx="105" cy="55" r="8" fill="#78350F"/>
    <!-- Dymo Tag Stamped Below -->
    <rect x="45" y="82" width="120" height="20" rx="2" fill="#09090B" stroke="#000" stroke-width="1"/>
    <text x="53" y="96" font-family="monospace" font-size="11" font-weight="bold" fill="#FFF">OAK_BLOCK_01</text>
  </g>


  <!-- ================= GRID ITEM 1.2: CARDBOARD & CERAMIC TILE ================= -->
  <g id="item-cardboard-ceramic" transform="translate(45, 255)" filter="url(#shadow-medium)">
    <!-- Layer 1: Corrugated Cardboard Base -->
    <path d="M 10 0 L 210 0 A 8 8 0 0 1 218 8 L 218 122 A 8 8 0 0 1 210 130 L 10 130 A 8 8 0 0 1 2 122 L 2 8 A 8 8 0 0 1 10 0 Z" fill="#D4A373" stroke="#523917" stroke-width="2"/>
    <!-- Torn Left Edge showing Inner Fluting -->
    <path d="M 2 12 L -8 20 L 2 32 L -8 44 L 2 56 L -8 68 L 2 80 L -8 92 L 2 104 L -8 116 L 2 124 Z" fill="url(#cardboard-flute)" stroke="#6E4D2B" stroke-width="1.5"/>

    <!-- Brass Grommet & String -->
    <circle cx="20" cy="20" r="7" fill="#B45309" stroke="#451A03" stroke-width="2"/>
    <circle cx="20" cy="20" r="3.5" fill="#24160E"/>
    <!-- String looping out -->
    <path d="M 20 20 C 0 10 -15 30 -25 5" fill="none" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4,2"/>

    <!-- Layer 2: Raised Beveled Ceramic Tile attached on top -->
    <g transform="translate(65, 18)" filter="url(#shadow-soft)">
      <!-- Ceramic Extrusion -->
      <path d="M 0 90 L 0 98 A 8 8 0 0 0 8 106 L 122 106 A 8 8 0 0 0 130 98 L 130 90 Z" fill="#94A3B8"/>
      <path d="M 120 0 L 130 8 L 130 98 L 120 90 Z" fill="#64748B"/>
      <!-- Ceramic Face -->
      <rect x="0" y="0" width="120" height="90" rx="8" fill="#F8FAFC" stroke="#475569" stroke-width="2"/>
      <line x1="4" y1="3" x2="116" y2="3" stroke="#FFFFFF" stroke-width="2"/>
      <!-- Debossed Icon Artwork -->
      <rect x="15" y="12" width="90" height="66" rx="4" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/>
      <!-- Debossed Glyph (Heart / Shield) -->
      <path d="M 60 60 L 40 40 A 12 12 0 0 1 60 25 A 12 12 0 0 1 80 40 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
      <path d="M 60 55 L 45 40 A 8 8 0 0 1 60 29 A 8 8 0 0 1 75 40 Z" fill="#EF4444"/>
    </g>
  </g>


  <!-- ================= GRID ITEM 1.3: LEATHER STRAP & BUCKLE ================= -->
  <g id="item-leather" transform="translate(45, 415)" filter="url(#shadow-heavy)">
    <!-- Extruded Bottom Shadow Side -->
    <path d="M 0 115 L 0 125 A 12 12 0 0 0 12 137 L 208 137 A 12 12 0 0 0 220 125 L 220 115 Z" fill="#2A1207"/>
    <!-- Leather Main Body -->
    <rect x="0" y="0" width="220" height="120" rx="12" fill="#7C2D12" stroke="#1C0A04" stroke-width="3"/>
    <!-- Yellow Stitching Border -->
    <rect x="7" y="7" width="206" height="106" rx="8" fill="none" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6,4"/>

    <!-- Padded Inner Cushion Line -->
    <rect x="16" y="16" width="188" height="88" rx="5" fill="#9A3412" stroke="#431407" stroke-width="2"/>

    <!-- Brass Belt Buckle Assembly -->
    <g transform="translate(130, 25)" filter="url(#shadow-soft)">
      <!-- Outer Buckle Frame -->
      <rect x="0" y="0" width="65" height="70" rx="8" fill="#F59E0B" stroke="#78350F" stroke-width="3"/>
      <!-- Inner Cutout -->
      <rect x="12" y="12" width="41" height="46" rx="4" fill="#431407" stroke="#78350F" stroke-width="2"/>
      <!-- Buckle Prong/Pin -->
      <path d="M 5 35 L 50 35" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
      <path d="M 5 35 L 50 35" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round"/>
      <!-- Metallic Highlights -->
      <path d="M 4 4 L 61 4" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Copper Fasteners / Rivets -->
    <circle cx="35" cy="40" r="7" fill="#B45309" stroke="#451A03" stroke-width="2"/>
    <circle cx="35" cy="40" r="5" fill="#D97706"/>
    <line x1="31" y1="40" x2="39" y2="40" stroke="#451A03" stroke-width="1.5"/>

    <circle cx="35" cy="80" r="7" fill="#B45309" stroke="#451A03" stroke-width="2"/>
    <circle cx="35" cy="80" r="5" fill="#D97706"/>
    <line x1="35" y1="76" x2="35" y2="84" stroke="#451A03" stroke-width="1.5"/>
  </g>


  <!-- ================= GRID ITEM 2.1: CORKBOARD & PINNED NOTE ================= -->
  <g id="item-corkboard" transform="translate(290, 95)" filter="url(#shadow-heavy)">
    <!-- Sunken Wooden Frame -->
    <rect x="0" y="0" width="220" height="135" rx="8" fill="#451A03" stroke="#1A0A03" stroke-width="3"/>
    <!-- Recessed Cork Surface -->
    <rect x="10" y="10" width="200" height="115" rx="4" fill="url(#cork-texture)" stroke="#270F03" stroke-width="2.5"/>
    <!-- Inner Shadow effect overlay for recess -->
    <path d="M 10 10 L 210 10 L 210 22 L 22 22 L 22 125 L 10 125 Z" fill="#000000" opacity="0.3"/>

    <!-- Pinned Paper Note (Tilted -4 degrees) -->
    <g transform="translate(35, 20) rotate(-4)" filter="url(#shadow-soft)">
      <rect x="0" y="0" width="130" height="85" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
      <!-- Crease/Fold at bottom corner -->
      <path d="M 115 85 L 130 70 L 115 70 Z" fill="#EAB308" stroke="#CA8A04" stroke-width="1"/>

      <!-- Handwritten Notes -->
      <line x1="12" y1="20" x2="110" y2="20" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="95" y2="35" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="50" x2="105" y2="50" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
      <!-- Red Checklist Box -->
      <rect x="12" y="62" width="10" height="10" fill="none" stroke="#DC2626" stroke-width="1.5"/>
      <path d="M 14 67 L 17 70 L 24 61" fill="none" stroke="#DC2626" stroke-width="2"/>
      <line x1="30" y1="68" x2="80" y2="68" stroke="#475569" stroke-width="2"/>
    </g>

    <!-- Translucent Masking Tape Strip -->
    <polygon points="135,18 175,12 180,26 140,32" fill="#E2E8F0" opacity="0.6" stroke="#CBD5E1" stroke-width="1"/>

    <!-- 3D Red Pushpin casting drop shadow -->
    <g transform="translate(95, 22)" filter="url(#shadow-pin)">
      <circle cx="0" cy="0" r="7" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.5"/>
      <circle cx="-2" cy="-2" r="3" fill="#EF4444"/>
      <circle cx="-3" cy="-3" r="1" fill="#FFFFFF"/>
      <path d="M 0 7 L 0 14 L -2 7 Z" fill="#991B1B"/>
    </g>
  </g>


  <!-- ================= GRID ITEM 2.2: INDUSTRIAL TOGGLE SWITCH ================= -->
  <g id="item-toggle-switch" transform="translate(290, 255)" filter="url(#shadow-heavy)">
    <!-- Base Plate Extrusion Side -->
    <path d="M 0 120 L 0 130 A 10 10 0 0 0 10 140 L 210 140 A 10 10 0 0 0 220 130 L 220 120 Z" fill="#0F172A"/>
    <!-- Front Metal Plate -->
    <rect x="0" y="0" width="220" height="120" rx="10" fill="#334155" stroke="#0F172A" stroke-width="3"/>
    <line x1="5" y1="4" x2="215" y2="4" stroke="#94A3B8" stroke-width="2"/>

    <!-- Corner Hex Bolts -->
    <polygon points="15,10 20,13 20,18 15,21 10,18 10,13" fill="#94A3B8" stroke="#1E293B" stroke-width="1"/>
    <polygon points="205,10 210,13 210,18 205,21 200,18 200,13" fill="#94A3B8" stroke="#1E293B" stroke-width="1"/>
    <polygon points="15,100 20,103 20,108 15,111 10,108 10,103" fill="#94A3B8" stroke="#1E293B" stroke-width="1"/>
    <polygon points="205,100 210,103 210,108 205,111 200,108 200,103" fill="#94A3B8" stroke="#1E293B" stroke-width="1"/>

    <!-- Recessed Switch Slot -->
    <rect x="85" y="20" width="50" height="80" rx="6" fill="#09090B" stroke="#1E293B" stroke-width="2"/>
    <rect x="95" y="25" width="30" height="70" rx="4" fill="#18181B"/>

    <!-- 3D Toggle Lever (Angled Up) -->
    <!-- Lever Shadow -->
    <path d="M 110 60 L 145 25 L 160 30 L 115 70 Z" fill="#000000" opacity="0.5"/>
    <!-- Lever Metallic Body -->
    <path d="M 102 65 L 125 25 L 135 28 L 112 72 Z" fill="#CBD5E1" stroke="#475569" stroke-width="1.5"/>
    <path d="M 105 65 L 127 25 L 131 26 L 110 70 Z" fill="#FFFFFF"/>
    <!-- Red Solid Switch Knob -->
    <circle cx="130" cy="24" r="14" fill="#DC2626" stroke="#7F1D1D" stroke-width="2"/>
    <circle cx="126" cy="20" r="5" fill="#EF4444"/>
    <circle cx="124" cy="18" r="2" fill="#FCA5A5"/>

    <!-- Indicator Lights -->
    <!-- Green Light (ON - Active) -->
    <g transform="translate(30, 40)">
      <circle cx="0" cy="0" r="12" fill="#14532D" stroke="#052E16" stroke-width="2"/>
      <circle cx="0" cy="0" r="8" fill="#22C55E"/>
      <circle cx="-3" cy="-3" r="3" fill="#DCFCE7"/>
      <text x="-8" y="25" font-family="sans-serif" font-weight="900" font-size="10" fill="#22C55E">ON</text>
    </g>

    <!-- Red Light (OFF - Inactive) -->
    <g transform="translate(180, 40)">
      <circle cx="0" cy="0" r="12" fill="#450A0A" stroke="#290202" stroke-width="2"/>
      <circle cx="0" cy="0" r="8" fill="#7F1D1D"/>
      <circle cx="-3" cy="-3" r="2" fill="#FCA5A5" opacity="0.5"/>
      <text x="-10" y="25" font-family="sans-serif" font-weight="bold" font-size="10" fill="#64748B">OFF</text>
    </g>
  </g>


  <!-- ================= GRID ITEM 2.3: ROTARY KNOB & SPLIT FLAP ================= -->
  <g id="item-rotary-flap" transform="translate(290, 415)" filter="url(#shadow-heavy)">
    <!-- Base Plate -->
    <path d="M 0 120 L 0 130 A 10 10 0 0 0 10 140 L 210 140 A 10 10 0 0 0 220 130 L 220 120 Z" fill="#180E04"/>
    <rect x="0" y="0" width="220" height="120" rx="10" fill="#291A10" stroke="#0F0803" stroke-width="3"/>

    <!-- Left: Heavy Rotary Bakelite Knob -->
    <g transform="translate(60, 60)">
      <!-- Drop Shadow -->
      <circle cx="3" cy="5" r="42" fill="#000000" opacity="0.6"/>
      <!-- Outer Notched Ring (Bakelite Grips) -->
      <circle cx="0" cy="0" r="42" fill="#1C1917" stroke="#09090B" stroke-width="2"/>
      <!-- Ridges / Teeth -->
      <path d="M 0 -42 L 0 42 M -42 0 L 42 0 M -30 -30 L 30 30 M -30 30 L 30 -30" stroke="#27272A" stroke-width="5"/>
      <!-- Inner Metal Bezel -->
      <circle cx="0" cy="0" r="34" fill="#D97706" stroke="#78350F" stroke-width="2"/>
      <!-- Dial Face -->
      <circle cx="0" cy="0" r="30" fill="#18181B"/>
      <!-- Tick Marks -->
      <path d="M 0 -28 L 0 -22 M 20 -20 L 15 -15 M 28 0 L 22 0 M 20 20 L 15 15 M 0 28 L 0 22 M -20 20 L -15 15 M -28 0 L -22 0 M -20 -20 L -15 -15" stroke="#A1A1AA" stroke-width="2"/>
      <!-- Raised Center Cap -->
      <circle cx="0" cy="0" r="18" fill="#27272A" stroke="#09090B" stroke-width="2"/>
      <!-- Indicator Pointer Line -->
      <line x1="0" y1="0" x2="0" y2="-26" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="4" fill="#DC2626"/>
    </g>

    <!-- Right: 3D Split-Flap Counter Unit -->
    <g transform="translate(130, 30)" filter="url(#shadow-soft)">
      <rect x="0" y="0" width="75" height="60" rx="6" fill="#09090B" stroke="#27272A" stroke-width="2"/>
      <!-- Flap Card 1 -->
      <g transform="translate(8, 8)">
        <rect x="0" y="0" width="26" height="44" rx="3" fill="#18181B" stroke="#3F3F46" stroke-width="1"/>
        <line x1="0" y1="22" x2="26" y2="22" stroke="#09090B" stroke-width="2"/>
        <text x="5" y="31" font-family="monospace" font-weight="900" font-size="24" fill="#FFFFFF">0</text>
      </g>
      <!-- Flap Card 2 -->
      <g transform="translate(40, 8)">
        <rect x="0" y="0" width="26" height="44" rx="3" fill="#18181B" stroke="#3F3F46" stroke-width="1"/>
        <line x1="0" y1="22" x2="26" y2="22" stroke="#09090B" stroke-width="2"/>
        <text x="5" y="31" font-family="monospace" font-weight="900" font-size="24" fill="#EAB308">8</text>
      </g>
      <!-- Middle Hinge Clip -->
      <rect x="4" y="27" width="67" height="4" fill="#000000" opacity="0.8"/>
    </g>
  </g>


  <!-- ================= GRID ITEM 3.1: POLAROID FRAME & WAX SEAL ================= -->
  <g id="item-polaroid-wax" transform="translate(535, 95)" filter="url(#shadow-heavy)">
    <!-- Tilted Polaroid Container (+3 deg) -->
    <g transform="rotate(3, 110, 65)">
      <!-- Polaroid Photo Card -->
      <rect x="0" y="0" width="160" height="130" rx="4" fill="#FAFAFA" stroke="#E2E8F0" stroke-width="2"/>
      <!-- Photo Inner Window -->
      <rect x="12" y="12" width="136" height="85" fill="#0F172A"/>
      <!-- Photo Mini Vector Art (Mountain & Sun) -->
      <path d="M 12 75 L 50 40 L 80 65 L 110 30 L 148 75 Z" fill="#334155"/>
      <path d="M 12 85 L 60 50 L 95 85 Z" fill="#475569"/>
      <circle cx="120" cy="32" r="12" fill="#F59E0B"/>
      <!-- Photo Label Handwritten -->
      <text x="40" y="115" font-family="serif" font-style="italic" font-weight="bold" font-size="13" fill="#334155">Sample_v04.png</text>

      <!-- Masking Tape Strip on Top Edge -->
      <polygon points="50,-10 100,-14 102,4 52,8" fill="#FEF08A" opacity="0.7" stroke="#CA8A04" stroke-width="1"/>

      <!-- Metal Paperclip on Top Right -->
      <g transform="translate(130, -8)" filter="url(#shadow-soft)">
        <path d="M 0 10 L 0 30 A 6 6 0 0 0 12 30 L 12 5 A 4 4 0 0 0 4 5 L 4 25" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </g>

    <!-- Crimson 3D Wax Seal (Overlapping Bottom Right) -->
    <g transform="translate(150, 70)" filter="url(#shadow-heavy)">
      <!-- Ribbon Ends -->
      <path d="M 10 20 L -10 60 L 10 55 L 20 65 Z" fill="#991B1B" stroke="#450A0A" stroke-width="1.5"/>
      <path d="M 25 20 L 35 65 L 45 55 L 60 60 Z" fill="#7F1D1D" stroke="#450A0A" stroke-width="1.5"/>

      <!-- Melted Wax Outer Blob -->
      <path d="M 25 -5 C 40 -8 55 2 58 18 C 62 32 50 48 35 50 C 20 52 2 45 -3 30 C -8 15 8 -2 25 -5 Z" fill="#991B1B" stroke="#450A0A" stroke-width="2"/>
      <path d="M 25 -1 C 37 -4 48 5 51 18 C 54 30 44 42 32 44 C 18 46 4 39 0 27 C -4 15 10 2 25 -1 Z" fill="#B91C1C"/>

      <!-- Stamped Inner Emblem -->
      <circle cx="26" cy="22" r="18" fill="#7F1D1D" stroke="#450A0A" stroke-width="2"/>
      <circle cx="26" cy="22" r="16" fill="#991B1B"/>
      <!-- Embossed Crest Design (Crown / Fleur-de-lis) -->
      <path d="M 26 12 L 30 18 L 36 15 L 32 24 L 38 28 L 26 27 L 14 28 L 20 24 L 16 15 L 22 18 Z" fill="#FECACA" stroke="#7F1D1D" stroke-width="1"/>
    </g>
  </g>


  <!-- ================= GRID ITEM 3.2: SLIDE RULE & GAUGE METER ================= -->
  <g id="item-slide-gauge" transform="translate(535, 255)" filter="url(#shadow-heavy)">
    <!-- Base Mahogany Body -->
    <path d="M 0 120 L 0 130 A 10 10 0 0 0 10 140 L 210 140 A 10 10 0 0 0 220 130 L 220 120 Z" fill="#2A0800"/>
    <rect x="0" y="0" width="220" height="120" rx="10" fill="#451A03" stroke="#1C0700" stroke-width="3"/>

    <!-- Inset Sunken Track Channel -->
    <rect x="15" y="35" width="190" height="50" rx="4" fill="#1C0A00" stroke="#2A0800" stroke-width="2"/>

    <!-- Measurement Ticks (Laser Etched Cream) -->
    <path d="M 25 35 L 25 45 M 35 35 L 35 41 M 45 35 L 45 41 M 55 35 L 55 41 M 65 35 L 65 45 M 75 35 L 75 41 M 85 35 L 85 41 M 95 35 L 95 41 M 105 35 L 105 48 M 115 35 L 115 41 M 125 35 L 125 41 M 135 35 L 135 41 M 145 35 L 145 45 M 155 35 L 155 41 M 165 35 L 165 41 M 175 35 L 175 41 M 185 35 L 185 45" stroke="#FEF3C7" stroke-width="1.5"/>
    <path d="M 25 85 L 25 75 M 65 85 L 65 75 M 105 85 L 105 72 M 145 85 L 145 75 M 185 85 L 185 75" stroke="#FEF3C7" stroke-width="1.5"/>

    <!-- Numeric Markings -->
    <text x="22" y="25" font-family="monospace" font-size="10" font-weight="bold" fill="#FDE68A">0</text>
    <text x="60" y="25" font-family="monospace" font-size="10" font-weight="bold" fill="#FDE68A">25</text>
    <text x="100" y="25" font-family="monospace" font-size="10" font-weight="bold" fill="#FDE68A">50</text>
    <text x="140" y="25" font-family="monospace" font-size="10" font-weight="bold" fill="#FDE68A">75</text>
    <text x="178" y="25" font-family="monospace" font-size="10" font-weight="bold" fill="#FDE68A">100</text>

    <!-- 3D Sliding Cursor Block (Transparent Amber Glass + Brass) -->
    <g transform="translate(120, 25)" filter="url(#shadow-medium)">
      <!-- Glass Frame -->
      <rect x="0" y="0" width="35" height="70" rx="4" fill="#F59E0B" fill-opacity="0.35" stroke="#D97706" stroke-width="2"/>
      <!-- Glass Glare Lines -->
      <line x1="5" y1="5" x2="20" y2="65" stroke="#FFFFFF" stroke-width="1.5" opacity="0.6"/>
      <!-- Red Hairline Pointer -->
      <line x1="17.5" y1="0" x2="17.5" y2="70" stroke="#EF4444" stroke-width="2"/>
      <!-- Brass Top/Bottom Knurled Screws -->
      <rect x="5" y="-5" width="25" height="7" rx="2" fill="#B45309" stroke="#451A03" stroke-width="1"/>
      <rect x="5" y="68" width="25" height="7" rx="2" fill="#B45309" stroke="#451A03" stroke-width="1"/>
    </g>

    <!-- Dymo Tag Below Track -->
    <rect x="60" y="96" width="100" height="18" rx="2" fill="#18181B" stroke="#000" stroke-width="1"/>
    <text x="68" y="109" font-family="monospace" font-size="10" font-weight="bold" fill="#FFF">GAUGE_SLIDE</text>
  </g>


  <!-- ================= GRID ITEM 3.3: INDUSTRIAL EMERGENCY BUTTON ================= -->
  <g id="item-emergency-button" transform="translate(535, 415)" filter="url(#shadow-heavy)">
    <!-- Base Plate -->
    <path d="M 0 120 L 0 130 A 10 10 0 0 0 10 140 L 210 140 A 10 10 0 0 0 220 130 L 220 120 Z" fill="#0C0A09"/>
    <rect x="0" y="0" width="220" height="120" rx="10" fill="#1C1917" stroke="#0C0A09" stroke-width="3"/>

    <!-- Yellow / Black Hazard Caution Plate -->
    <rect x="15" y="15" width="190" height="90" rx="6" fill="url(#hazard-stripe)" stroke="#78350F" stroke-width="2"/>

    <!-- Center Heavy Steel Housing -->
    <g transform="translate(110, 60)">
      <!-- Housing Shadow -->
      <circle cx="3" cy="6" r="38" fill="#000000" opacity="0.6"/>
      <!-- Steel Base Bevel -->
      <circle cx="0" cy="0" r="38" fill="#475569" stroke="#0F172A" stroke-width="3"/>
      <circle cx="0" cy="0" r="34" fill="#94A3B8"/>
      <circle cx="0" cy="0" r="30" fill="#334155"/>

      <!-- 3D Deep Extruded Push Button -->
      <!-- Button Side Wall (Height) -->
      <path d="M -22 0 C -22 18 22 18 22 0 L 22 10 C 22 28 -22 28 -22 10 Z" fill="#7F1D1D"/>
      <!-- Button Top Face -->
      <circle cx="0" cy="-3" r="22" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
      <circle cx="0" cy="-3" r="18" fill="#EF4444"/>
      <!-- Surface Highlight Arc -->
      <path d="M -12 -8 A 14 14 0 0 1 12 -8" fill="none" stroke="#FCA5A5" stroke-width="3" stroke-linecap="round"/>

      <!-- Center STOP Stencil Text -->
      <text x="-15" y="2" font-family="sans-serif" font-weight="900" font-size="11" fill="#FFFFFF" letter-spacing="1">STOP</text>
    </g>

    <!-- Stamped Label Badge -->
    <rect x="18" y="20" width="48" height="20" rx="2" fill="#18181B" stroke="#000" stroke-width="1"/>
    <text x="22" y="33" font-family="sans-serif" font-size="9" font-weight="bold" fill="#EAB308">EMERG.</text>
  </g>


  <!-- ================= PHYSICAL FASTENERS & CONNECTING WIRES ================= -->
  <!-- Copper Wire Connecting Toggle Switch (2.2) to Slide Rule Gauge (3.2) -->
  <g id="connecting-wires">
    <!-- Wire Shadow -->
    <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#0A0503" stroke-width="6" opacity="0.5"/>
    <!-- Wire Body -->
    <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#B45309" stroke-width="4"/>
    <path d="M 505 315 C 520 315 520 300 535 300" fill="none" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="6,4"/>

    <!-- Wire from Toggle Switch (2.2) down to Rotary Dial (2.3) -->
    <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#0A0503" stroke-width="5" opacity="0.5"/>
    <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#0284C7" stroke-width="3.5"/>
    <path d="M 320 375 C 270 380 270 450 290 465" fill="none" stroke="#38BDF8" stroke-width="1"/>
  </g>

  <!-- Loose Workshop Hardware Scatter (Surprise Details) -->
  <!-- Loose Brass Screw 1 -->
  <g transform="translate(272, 235)" filter="url(#shadow-soft)">
    <circle cx="0" cy="0" r="5" fill="#D97706" stroke="#451A03" stroke-width="1"/>
    <line x1="-3" y1="-2" x2="3" y2="2" stroke="#451A03" stroke-width="1.5"/>
  </g>

  <!-- Loose Washer 2 -->
  <g transform="translate(520, 400)" filter="url(#shadow-soft)">
    <circle cx="0" cy="0" r="6" fill="#94A3B8" stroke="#334155" stroke-width="1"/>
    <circle cx="0" cy="0" r="2.5" fill="#C9B596"/>
  </g>

  <!-- Stray Pushpin on Workbench Surface -->
  <g transform="translate(270, 400) rotate(45)" filter="url(#shadow-pin)">
    <path d="M 0 0 L 0 -12 L -3 -15 L 3 -15 L 0 -12 Z" fill="#94A3B8"/>
    <circle cx="0" cy="2" r="5" fill="#2563EB" stroke="#1E3A8A" stroke-width="1"/>
    <circle cx="-1" cy="0" r="2" fill="#60A5FA"/>
  </g>

</svg>