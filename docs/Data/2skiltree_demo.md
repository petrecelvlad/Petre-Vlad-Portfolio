<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Filters for Depth & Shadows -->
    <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#0E0905" flood-opacity="0.6"/>
    </filter>
    <filter id="soft-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1C1610" flood-opacity="0.4"/>
    </filter>
    <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="glow-node" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#FFD700" flood-opacity="0.8"/>
    </filter>

    <!-- Gradients -->
    <!-- Wood Desk BG -->
    <linearGradient id="desk-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3A2312"/>
      <stop offset="50%" stop-color="#2A180B"/>
      <stop offset="100%" stop-color="#1E1006"/>
    </linearGradient>

    <!-- Wood Board Frame -->
    <linearGradient id="frame-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8C5828"/>
      <stop offset="50%" stop-color="#673E19"/>
      <stop offset="100%" stop-color="#4A2A0C"/>
    </linearGradient>

    <!-- Canvas/Cork Inset -->
    <linearGradient id="cork-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#D9A05B"/>
      <stop offset="100%" stop-color="#B87B31"/>
    </linearGradient>

    <!-- Parchment Gradient -->
    <linearGradient id="parchment-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF5E1"/>
      <stop offset="70%" stop-color="#F3E3C3"/>
      <stop offset="100%" stop-color="#E6CE9E"/>
    </linearGradient>

    <!-- UI Accent Gradients -->
    <linearGradient id="gold-btn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFE875"/>
      <stop offset="100%" stop-color="#F7A100"/>
    </linearGradient>
    
    <linearGradient id="crimson-banner" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E63946"/>
      <stop offset="100%" stop-color="#9B111E"/>
    </linearGradient>

    <linearGradient id="active-node-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF099"/>
      <stop offset="50%" stop-color="#FFC800"/>
      <stop offset="100%" stop-color="#D47A00"/>
    </linearGradient>

    <linearGradient id="blue-node-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>

    <linearGradient id="purple-node-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#7E22CE"/>
    </linearGradient>

    <linearGradient id="green-node-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>

    <!-- Brass / Metal -->
    <linearGradient id="brass-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE5A3"/>
      <stop offset="50%" stop-color="#C8963E"/>
      <stop offset="100%" stop-color="#6B4C12"/>
    </linearGradient>

    <!-- Patterns -->
    <pattern id="desk-planks" width="800" height="40" patternUnits="userSpaceOnUse">
      <line x1="0" y1="39" x2="800" y2="39" stroke="#1A0D04" stroke-width="2"/>
      <line x1="0" y1="40" x2="800" y2="40" stroke="#4A2E16" stroke-width="1"/>
    </pattern>

    <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="#8C5828" fill-opacity="0.3"/>
    </pattern>
  </defs>

  <!-- 1. BACKGROUND (Guild Master's Oak Desk) -->
  <rect width="800" height="600" fill="url(#desk-grad)" />
  <rect width="800" height="600" fill="url(#desk-planks)" opacity="0.7" />

  <!-- Background Decorative Desk Elements -->
  <!-- Map Roll Top Right -->
  <g transform="translate(680, -20) rotate(15)" opacity="0.6">
    <rect x="0" y="0" width="140" height="30" rx="5" fill="#E2C9A1" stroke="#2C1A0E" stroke-width="2"/>
    <path d="M 5,0 L 5,30 M 135,0 L 135,30" stroke="#CBB087" stroke-width="3"/>
  </g>
  <!-- Guild Coin -->
  <g transform="translate(50, 550)" filter="url(#drop-shadow)">
    <circle cx="0" cy="0" r="18" fill="url(#brass-grad)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="0" cy="0" r="13" fill="none" stroke="#6B4C12" stroke-width="1" stroke-dasharray="3,2"/>
    <path d="M-4,-6 L4,-6 L0,8 Z" fill="#2C1A0E"/>
  </g>

  <!-- ==================== LEFT REGION: SKILL TREE CANVAS ==================== -->
  <g id="skill-tree-board" filter="url(#drop-shadow)">
    <!-- Wooden Main Board Frame -->
    <rect x="20" y="20" width="485" height="560" rx="16" fill="url(#frame-grad)" stroke="#1C1610" stroke-width="4"/>
    <!-- Inner Extrusion / Bevel shadow -->
    <rect x="28" y="28" width="469" height="544" rx="10" fill="#2C1A0E" />
    <!-- Cork / Parchment Interior Canvas -->
    <rect x="34" y="34" width="457" height="532" rx="8" fill="url(#cork-grad)" stroke="#1C1610" stroke-width="3"/>
    <!-- Grid Overlay -->
    <rect x="34" y="34" width="457" height="532" rx="8" fill="url(#grid-pattern)"/>

    <!-- Corner Brass Brackets -->
    <!-- Top Left -->
    <path d="M 20,45 L 45,45 L 45,20 L 32,20 Q 20,20 20,32 Z" fill="url(#brass-grad)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="30" cy="30" r="2.5" fill="#1C1610"/>
    <!-- Top Right -->
    <path d="M 505,45 L 480,45 L 480,20 L 493,20 Q 505,20 505,32 Z" fill="url(#brass-grad)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="495" cy="30" r="2.5" fill="#1C1610"/>
    <!-- Bottom Left -->
    <path d="M 20,555 L 45,555 L 45,580 L 32,580 Q 20,580 20,568 Z" fill="url(#brass-grad)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="30" cy="570" r="2.5" fill="#1C1610"/>
    <!-- Bottom Right -->
    <path d="M 505,555 L 480,555 L 480,580 L 493,580 Q 505,580 505,568 Z" fill="url(#brass-grad)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="495" cy="570" r="2.5" fill="#1C1610"/>

    <!-- Header Board Ribbon -->
    <g transform="translate(130, 10)" filter="url(#drop-shadow)">
      <path d="M -15,12 L 0,-5 L 265,-5 L 280,12 L 265,35 L 0,35 Z" fill="#671118"/>
      <rect x="5" y="-2" width="255" height="32" rx="4" fill="url(#crimson-banner)" stroke="#1C1610" stroke-width="2"/>
      <rect x="9" y="2" width="247" height="24" rx="2" fill="none" stroke="#FFC72C" stroke-width="1" stroke-dasharray="6,3"/>
      <text x="132" y="19" font-family="'Impact', 'Arial Black', sans-serif" font-size="15" fill="#FFE875" text-anchor="middle" letter-spacing="1.5" filter="drop-shadow(1px 1px 0px #000)">HERO SKILL TREE</text>
    </g>

    <!-- BRANCH CONNECTIONS (Lines) -->
    <!-- Inactive / Standard Branches -->
    <path d="M 260,300 L 260,135" stroke="#5C3A1A" stroke-width="10" stroke-linecap="round"/>
    <path d="M 260,300 L 260,135" stroke="#A8733B" stroke-width="4" stroke-linecap="round"/>

    <path d="M 260,135 L 120,140" stroke="#5C3A1A" stroke-width="8" stroke-linecap="round"/>
    <path d="M 260,135 L 120,140" stroke="#A8733B" stroke-width="3" stroke-linecap="round"/>

    <path d="M 260,300 L 410,260" stroke="#5C3A1A" stroke-width="8" stroke-linecap="round"/>
    <path d="M 260,300 L 410,260" stroke="#A8733B" stroke-width="3" stroke-linecap="round"/>

    <path d="M 410,260 L 390,420" stroke="#5C3A1A" stroke-width="8" stroke-linecap="round"/>
    <path d="M 410,260 L 390,420" stroke="#A8733B" stroke-width="3" stroke-linecap="round"/>

    <path d="M 260,300 L 260,460" stroke="#5C3A1A" stroke-width="8" stroke-linecap="round"/>
    <path d="M 260,300 L 260,460" stroke="#A8733B" stroke-width="3" stroke-linecap="round"/>

    <!-- ACTIVE Glowing Branch (To Selected Node: UI/UX Magic & Juiciness) -->
    <path d="M 260,300 L 110,260" stroke="#1C1610" stroke-width="12" stroke-linecap="round"/>
    <path d="M 260,300 L 110,260" stroke="#FFC800" stroke-width="6" stroke-linecap="round" filter="url(#glow-gold)"/>
    <path d="M 260,300 L 110,260" stroke="#FFF" stroke-width="2" stroke-dasharray="8,6" stroke-linecap="round"/>

    <path d="M 110,260 L 125,420" stroke="#1C1610" stroke-width="10" stroke-linecap="round"/>
    <path d="M 110,260 L 125,420" stroke="#FFC800" stroke-width="4" stroke-linecap="round"/>

    <!-- SKILL NODES -->
    
    <!-- Center Core Node: Game Architecture -->
    <g transform="translate(260, 300)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="32" fill="#1C1610"/>
      <circle cx="0" cy="0" r="28" fill="url(#brass-grad)"/>
      <circle cx="0" cy="0" r="22" fill="#3D2612"/>
      <!-- Shield / Core Icon -->
      <path d="M-8,-10 L8,-10 L10,0 Q10,10 0,14 Q-10,10 -10,0 Z" fill="#FFC72C" stroke="#1C1610" stroke-width="1.5"/>
      <!-- Label -->
      <rect x="-45" y="32" width="90" height="18" rx="5" fill="#1C1610"/>
      <rect x="-43" y="34" width="86" height="14" rx="3" fill="#3D2612"/>
      <text x="0" y="45" font-family="sans-serif" font-weight="bold" font-size="9" fill="#FFF5E1" text-anchor="middle">CORE SYSTEM</text>
    </g>

    <!-- Top Node: Vision Branch (Lore & World) -->
    <g transform="translate(260, 135)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="26" fill="#1C1610"/>
      <circle cx="0" cy="0" r="22" fill="url(#purple-node-grad)"/>
      <!-- Eye / Crystal Icon -->
      <circle cx="0" cy="0" r="10" fill="none" stroke="#FFF" stroke-width="2"/>
      <circle cx="0" cy="0" r="4" fill="#FFF"/>
      <!-- Label -->
      <rect x="-40" y="26" width="80" height="16" rx="4" fill="#1C1610"/>
      <rect x="-38" y="28" width="76" height="12" rx="2" fill="#4C1D95"/>
      <text x="0" y="37" font-family="sans-serif" font-weight="bold" font-size="8" fill="#E9D5FF" text-anchor="middle">VISION &amp; LORE</text>
    </g>

    <!-- Top-Left Sub Node: Worldbuilding -->
    <g transform="translate(120, 140)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="20" fill="#1C1610"/>
      <circle cx="0" cy="0" r="17" fill="url(#purple-node-grad)"/>
      <!-- Scroll Icon -->
      <path d="M-6,-6 C-2,-9 2,-3 6,-6 L6,6 C2,3 -2,9 -6,6 Z" fill="none" stroke="#FFF" stroke-width="1.5"/>
    </g>

    <!-- Right Node: Leadership Branch -->
    <g transform="translate(410, 260)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="26" fill="#1C1610"/>
      <circle cx="0" cy="0" r="22" fill="url(#crimson-banner)"/>
      <!-- Crown Icon -->
      <path d="M-10,6 L-12,-6 L-5,-1 L0,-8 L5,-1 L12,-6 L10,6 Z" fill="#FFD700" stroke="#1C1610" stroke-width="1"/>
      <!-- Label -->
      <rect x="-40" y="26" width="80" height="16" rx="4" fill="#1C1610"/>
      <rect x="-38" y="28" width="76" height="12" rx="2" fill="#7F1D1D"/>
      <text x="0" y="37" font-family="sans-serif" font-weight="bold" font-size="8" fill="#FECDD3" text-anchor="middle">LEADERSHIP</text>
    </g>

    <!-- Bottom-Right Sub Node: Mentorship -->
    <g transform="translate(390, 420)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="20" fill="#1C1610"/>
      <circle cx="0" cy="0" r="17" fill="url(#crimson-banner)"/>
      <path d="M-5,4 A6,6 0 0,1 5,4 M0,-5 A3,3 0 0,1 0,1" fill="none" stroke="#FFF" stroke-width="2"/>
    </g>

    <!-- Bottom Node: Production / Tech -->
    <g transform="translate(260, 460)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="26" fill="#1C1610"/>
      <circle cx="0" cy="0" r="22" fill="url(#green-node-grad)"/>
      <!-- Gear Icon -->
      <path d="M-3,-10 L3,-10 L4,-6 L8,-4 L11,-8 L15,-4 L12,0 L13,5 L18,7 L15,12 L10,10 L7,13 L8,18 L3,18" fill="none" stroke="#FFF" stroke-width="2" transform="scale(0.6) translate(-5,-5)"/>
      <!-- Label -->
      <rect x="-40" y="26" width="80" height="16" rx="4" fill="#1C1610"/>
      <rect x="-38" y="28" width="76" height="12" rx="2" fill="#14532D"/>
      <text x="0" y="37" font-family="sans-serif" font-weight="bold" font-size="8" fill="#DCFCE7" text-anchor="middle">ENGINE LOGIC</text>
    </g>

    <!-- Bottom-Left Sub Node: Juiciness (Connected to Active) -->
    <g transform="translate(125, 420)" filter="url(#drop-shadow)">
      <circle cx="0" cy="0" r="22" fill="#1C1610"/>
      <circle cx="0" cy="0" r="18" fill="url(#blue-node-grad)"/>
      <!-- Sparkle Icon -->
      <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#FFF"/>
      <!-- Label -->
      <rect x="-35" y="22" width="70" height="14" rx="3" fill="#1C1610"/>
      <rect x="-33" y="24" width="66" height="10" rx="2" fill="#0369A1"/>
      <text x="0" y="32" font-family="sans-serif" font-weight="bold" font-size="7" fill="#E0F2FE" text-anchor="middle">JUICINESS</text>
    </g>

    <!-- SELECTED ACTIVE NODE: UI/UX Magic (DESIGN BRANCH) -->
    <g transform="translate(110, 260)" filter="url(#glow-node)">
      <!-- Animated/Glowing Outer Selection Ring -->
      <circle cx="0" cy="0" r="38" fill="none" stroke="#FFE875" stroke-width="3" stroke-dasharray="6,4"/>
      <circle cx="0" cy="0" r="32" fill="#1C1610"/>
      <circle cx="0" cy="0" r="27" fill="url(#active-node-grad)"/>
      
      <!-- Gamepad / Wand Icon -->
      <path d="M-10,-4 C-10,-8 -5,-10 0,-10 C5,-10 10,-8 10,-4 C10,4 6,10 3,10 C1,10 0,8 0,8 C0,8 -1,10 -3,10 C-6,10 -10,4 -10,-4 Z" fill="#2C1A0E" stroke="#1C1610" stroke-width="1"/>
      <circle cx="-4" cy="-3" r="2" fill="#FFF"/>
      <circle cx="4" cy="-2" r="1.5" fill="#E63946"/>
      <circle cx="6" cy="-5" r="1.5" fill="#4ADE80"/>

      <!-- Pulse burst rays -->
      <path d="M-28,-28 L-34,-34 M28,-28 L34,-34 M28,28 L34,34 M-28,28 L-34,34" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>

      <!-- Category Ribbon Label -->
      <g transform="translate(0, 32)">
        <rect x="-48" y="0" width="96" height="20" rx="5" fill="#1C1610"/>
        <rect x="-46" y="2" width="92" height="16" rx="3" fill="url(#gold-btn)"/>
        <text x="0" y="14" font-family="'Arial Black', sans-serif" font-weight="900" font-size="9" fill="#1C1610" text-anchor="middle">UI/UX MAGIC</text>
      </g>
    </g>
  </g>

  <!-- ==================== RIGHT REGION: PERMANENT DETAIL INSPECTOR ==================== -->
  <g id="detail-inspector" transform="translate(520, 20)" filter="url(#drop-shadow)">
    <!-- Main Parchment Scroll Board -->
    <!-- Top Wooden Hanging Bar -->
    <rect x="10" y="0" width="240" height="20" rx="4" fill="url(#frame-grad)" stroke="#1C1610" stroke-width="2"/>
    <circle cx="25" cy="10" r="4" fill="url(#brass-grad)" stroke="#1C1610"/>
    <circle cx="235" cy="10" r="4" fill="url(#brass-grad)" stroke="#1C1610"/>

    <!-- Parchment Body -->
    <path d="M 15,18 L 245,18 L 250,540 C 250,555 235,560 220,560 L 40,560 C 20,560 10,550 10,535 Z" fill="url(#parchment-grad)" stroke="#1C1610" stroke-width="3"/>
    
    <!-- Parchment Inner Border / Stitching -->
    <path d="M 22,28 L 238,28 L 242,530 C 242,542 230,548 215,548 L 45,548 C 30,548 22,540 22,525 Z" fill="none" stroke="#C8B289" stroke-width="1.5" stroke-dasharray="5,3"/>

    <!-- Header Section: Selected Skill Title -->
    <g transform="translate(25, 35)">
      <!-- Category Tag -->
      <rect x="0" y="0" width="85" height="16" rx="3" fill="#D97706"/>
      <text x="42" y="11" font-family="sans-serif" font-weight="bold" font-size="8" fill="#FFF" text-anchor="middle" letter-spacing="0.5">DESIGN BRANCH</text>
      
      <!-- Rank Badge -->
      <rect x="145" y="0" width="65" height="16" rx="3" fill="#1C1610"/>
      <text x="177" y="11" font-family="sans-serif" font-weight="bold" font-size="8" fill="#FFD700" text-anchor="middle">RANK V / V</text>

      <!-- Skill Name -->
      <text x="0" y="42" font-family="'Impact', 'Arial Black', sans-serif" font-size="22" fill="#1C1610" letter-spacing="0.5">UI/UX MAGIC</text>

      <!-- Level Stars -->
      <g transform="translate(0, 50)">
        <path d="M0,0 L3,6 L9,7 L5,11 L6,17 L0,14 L-6,17 L-5,11 L-9,7 L-3,6 Z" fill="#FFC72C" stroke="#1C1610" transform="translate(10,0) scale(0.7)"/>
        <path d="M0,0 L3,6 L9,7 L5,11 L6,17 L0,14 L-6,17 L-5,11 L-9,7 L-3,6 Z" fill="#FFC72C" stroke="#1C1610" transform="translate(28,0) scale(0.7)"/>
        <path d="M0,0 L3,6 L9,7 L5,11 L6,17 L0,14 L-6,17 L-5,11 L-9,7 L-3,6 Z" fill="#FFC72C" stroke="#1C1610" transform="translate(46,0) scale(0.7)"/>
        <path d="M0,0 L3,6 L9,7 L5,11 L6,17 L0,14 L-6,17 L-5,11 L-9,7 L-3,6 Z" fill="#FFC72C" stroke="#1C1610" transform="translate(64,0) scale(0.7)"/>
        <path d="M0,0 L3,6 L9,7 L5,11 L6,17 L0,14 L-6,17 L-5,11 L-9,7 L-3,6 Z" fill="#FFC72C" stroke="#1C1610" transform="translate(82,0) scale(0.7)"/>
        <text x="102" y="4" font-family="sans-serif" font-weight="bold" font-size="10" fill="#854D0E">MASTERED</text>
      </g>
    </g>

    <!-- Divider Line -->
    <path d="M 25,105 L 235,105" stroke="#B89C6C" stroke-width="2" stroke-linecap="round" stroke-dasharray="1,4"/>

    <!-- Description Area -->
    <g transform="translate(25, 115)">
      <text x="0" y="12" font-family="sans-serif" font-weight="bold" font-size="10" fill="#451A03">ABILITY EFFECT:</text>
      <rect x="0" y="18" width="210" height="65" rx="6" fill="#F0E2C3" stroke="#D4C096" stroke-width="1"/>
      <text x="8" y="33" font-family="sans-serif" font-size="9" fill="#2C1A0E" width="190">
        Crafts deeply intuitive, tactile RPG interfaces.
      </text>
      <text x="8" y="46" font-family="sans-serif" font-size="9" fill="#2C1A0E">
        Passively grants <tspan fill="#D97706" font-weight="bold">+40% Charm</tspan> and rich
      </text>
      <text x="8" y="59" font-family="sans-serif" font-size="9" fill="#2C1A0E">
        micro-interactions to all player flows.
      </text>

      <!-- Stat Gauges -->
      <g transform="translate(0, 92)">
        <!-- Stat 1 -->
        <text x="0" y="8" font-family="sans-serif" font-weight="bold" font-size="8" fill="#543A14">TACTILITY</text>
        <rect x="60" y="1" width="145" height="9" rx="4" fill="#C8B289"/>
        <rect x="61" y="2" width="130" height="7" rx="3" fill="#22C55E"/>

        <!-- Stat 2 -->
        <text x="0" y="22" font-family="sans-serif" font-weight="bold" font-size="8" fill="#543A14">JUICINESS</text>
        <rect x="60" y="15" width="145" height="9" rx="4" fill="#C8B289"/>
        <rect x="61" y="16" width="140" height="7" rx="3" fill="#3B82F6"/>

        <!-- Stat 3 -->
        <text x="0" y="36" font-family="sans-serif" font-weight="bold" font-size="8" fill="#543A14">CLARITY</text>
        <rect x="60" y="29" width="145" height="9" rx="4" fill="#C8B289"/>
        <rect x="61" y="30" width="115" height="7" rx="3" fill="#EAB308"/>
      </g>
    </g>

    <!-- SECTION 3: FEATURED PROJECT SNAPSHOTS (Quest Cards) -->
    <g transform="translate(20, 280)">
      <path d="M 5,0 L 225,0" stroke="#B89C6C" stroke-width="2"/>
      <!-- Header with Wax Seal -->
      <text x="5" y="-6" font-family="'Impact', 'Arial Black', sans-serif" font-size="11" fill="#451A03" letter-spacing="0.5">APPLIED IN QUESTS (PROJECTS)</text>

      <!-- Snapshot Card 1: Chrono RPG (Left Tilted) -->
      <g transform="translate(8, 15) rotate(-4)" filter="url(#drop-shadow)">
        <rect x="0" y="0" width="100" height="110" rx="4" fill="#FFF" stroke="#1C1610" stroke-width="1.5"/>
        <!-- Photo Canvas -->
        <rect x="6" y="6" width="88" height="75" fill="#1E293B"/>
        <!-- Mini Vector Game Scene -->
        <path d="M 6,65 L 30,45 L 50,55 L 70,35 L 94,65 Z" fill="#0F766E"/>
        <circle cx="75" cy="22" r="8" fill="#FDE047"/>
        <rect x="12" y="18" width="35" height="6" rx="2" fill="#E2E8F0" opacity="0.8"/>
        <rect x="12" y="27" width="20" height="4" rx="1" fill="#38BDF8"/>
        <!-- Polaroid Label -->
        <text x="50" y="96" font-family="'Courier New', monospace" font-weight="bold" font-size="8" fill="#1E293B" text-anchor="middle">Chrono UI Kit</text>
        <!-- Scotch Tape -->
        <rect x="30" y="-6" width="35" height="12" fill="#FFFFFF" opacity="0.6" transform="rotate(3)"/>
      </g>

      <!-- Snapshot Card 2: Wind HUD (Right Tilted) -->
      <g transform="translate(112, 20) rotate(5)" filter="url(#drop-shadow)">
        <rect x="0" y="0" width="100" height="110" rx="4" fill="#FFF" stroke="#1C1610" stroke-width="1.5"/>
        <!-- Photo Canvas -->
        <rect x="6" y="6" width="88" height="75" fill="#0284C7"/>
        <!-- Mini Ocean Scene -->
        <circle cx="50" cy="80" r="45" fill="#0369A1"/>
        <path d="M 40,45 L 50,25 L 60,45 Z" fill="#FFF"/>
        <path d="M 20,55 Q 50,45 80,55" fill="none" stroke="#BAE6FD" stroke-width="2"/>
        <!-- Polaroid Label -->
        <text x="50" y="96" font-family="'Courier New', monospace" font-weight="bold" font-size="8" fill="#1E293B" text-anchor="middle">Isle HUD Map</text>
        <!-- Scotch Tape -->
        <rect x="32" y="-6" width="35" height="12" fill="#FFFFFF" opacity="0.6" transform="rotate(-4)"/>
      </g>

      <!-- Snapshot Card 3: Main Featured Quest Card (Center Overlay) -->
      <g transform="translate(45, 125) rotate(-1)" filter="url(#drop-shadow)">
        <rect x="0" y="0" width="130" height="125" rx="4" fill="#FFF" stroke="#1C1610" stroke-width="2"/>
        <!-- Photo Canvas -->
        <rect x="7" y="7" width="116" height="85" fill="#2E1065"/>
        <!-- Mini Crafting UI Artwork -->
        <rect x="15" y="15" width="100" height="69" rx="3" fill="#4C1D95" stroke="#A78BFA" stroke-width="1"/>
        <circle cx="40" cy="45" r="14" fill="#7C3AED" stroke="#FDE047" stroke-width="1.5"/>
        <path d="M36,45 L44,45 M40,41 L40,49" stroke="#FFF" stroke-width="2"/>
        <rect x="62" y="28" width="40" height="6" rx="2" fill="#DDD6FE"/>
        <rect x="62" y="38" width="30" height="5" rx="2" fill="#A78BFA"/>
        <rect x="62" y="48" width="35" height="10" rx="3" fill="#22C55E"/>
        <text x="79" y="55" font-family="sans-serif" font-weight="bold" font-size="6" fill="#FFF" text-anchor="middle">CRAFT</text>
        
        <!-- Polaroid Label -->
        <text x="65" y="107" font-family="'Courier New', monospace" font-weight="bold" font-size="9" fill="#1E293B" text-anchor="middle">Guild Crafts VR</text>
        <!-- Gold Star Badge on Card -->
        <circle cx="118" cy="12" r="10" fill="url(#brass-grad)" stroke="#1C1610" stroke-width="1"/>
        <path d="M118,7 L120,11 L124,11 L121,13 L122,17 L118,15 L114,17 L115,13 L112,11 L116,11 Z" fill="#FFF"/>
        <!-- Wax Seal Clip -->
        <circle cx="15" cy="5" r="9" fill="#991B1B" stroke="#450A0A" stroke-width="1"/>
        <path d="M12,5 L18,5 M15,2 L15,8" stroke="#FCA5A5" stroke-width="1"/>
      </g>
    </g>

    <!-- Bottom Decorative Scroll Roll -->
    <path d="M 10,555 C 30,570 230,570 250,555 C 255,545 240,540 220,545 C 180,550 70,550 30,545 C 10,540 -5,545 10,555 Z" fill="url(#parchment-grad)" stroke="#1C1610" stroke-width="2"/>
  </g>

  <!-- ==================== FOREGROUND FX & PARTICLES ==================== -->
  <!-- Magic Floating Sparkles around Active Node -->
  <g opacity="0.8">
    <path d="M 70,210 L 73,217 L 80,220 L 73,223 L 70,230 L 67,223 L 60,220 L 67,217 Z" fill="#FFD700" filter="url(#glow-gold)"/>
    <path d="M 180,210 L 182,214 L 186,215 L 182,216 L 180,220 L 178,216 L 174,215 L 178,214 Z" fill="#FFF" filter="url(#glow-gold)"/>
    <path d="M 160,320 L 162,324 L 166,325 L 162,326 L 160,330 L 158,326 L 154,325 L 158,324 Z" fill="#FFC72C"/>
  </g>
</svg>