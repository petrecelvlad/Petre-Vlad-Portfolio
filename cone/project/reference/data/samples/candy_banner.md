<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Background Canvas Pattern -->
    <radialGradient id="bg-glow" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#F9F5FF"/>
      <stop offset="100%" stop-color="#E3D5F5"/>
    </radialGradient>

    <!-- Clip Path for Paper Texture & Lines -->
    <clipPath id="paper-clip">
      <path d="M 210,130 
               L 590,130 
               A 16,16 0 0,1 606,146 
               L 606,470 
               L 592,460 L 580,473 L 565,458 L 550,472 L 536,459 L 520,475 L 505,461 L 490,474 L 476,460 L 460,473 L 445,459 L 430,472 L 415,458 L 400,474 L 385,460 L 370,473 L 355,459 L 340,472 L 325,458 L 310,475 L 295,461 L 280,474 L 265,460 L 250,473 L 235,458 L 220,472 L 206,459 
               L 194,470 
               L 194,146 
               A 16,16 0 0,1 210,130 Z" />
    </clipPath>

    <!-- Synthetic Paper Drop Shadow -->
    <filter id="shadow-soft" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="0" flood-color="#22092C" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="800" height="600" fill="url(#bg-glow)"/>

  <!-- Centered UI Column Assembly with -2.5 deg Counter-Rotation -->
  <g transform="rotate(-2.5, 400, 300)">

    <!-- ========================================== -->
    <!-- 1. FLATTENED GLOBAL DROP SHADOW (Unified)  -->
    <!-- ========================================== -->
    <g fill="#2A0826" opacity="0.18" transform="translate(0, 10)">
      <!-- Back Shadow Paper -->
      <path d="M 210,130 L 590,130 A 16,16 0 0,1 606,146 L 606,470 L 592,460 L 580,473 L 565,458 L 550,472 L 536,459 L 520,475 L 505,461 L 490,474 L 476,460 L 460,473 L 445,459 L 430,472 L 415,458 L 400,474 L 385,460 L 370,473 L 355,459 L 340,472 L 325,458 L 310,475 L 295,461 L 280,474 L 265,460 L 250,473 L 235,458 L 220,472 L 206,459 L 194,470 L 194,146 A 16,16 0 0,1 210,130 Z"/>
      <!-- Back Shadow Ribbon Left Tail -->
      <path d="M 160,118 L 230,118 L 230,175 L 160,175 L 180,146.5 Z"/>
      <!-- Back Shadow Ribbon Right Tail -->
      <path d="M 640,118 L 570,118 L 570,175 L 640,175 L 620,146.5 Z"/>
    </g>

    <!-- ========================================== -->
    <!-- 2. TORN-PAPER CARD COMPONENT               -->
    <!-- ========================================== -->
    <g id="torn-paper-card">
      <!-- Outer Dark Outline (Rendered behind fill for perfect stroke weight) -->
      <path d="M 210,130 
               L 590,130 
               A 16,16 0 0,1 606,146 
               L 606,470 
               L 592,460 L 580,473 L 565,458 L 550,472 L 536,459 L 520,475 L 505,461 L 490,474 L 476,460 L 460,473 L 445,459 L 430,472 L 415,458 L 400,474 L 385,460 L 370,473 L 355,459 L 340,472 L 325,458 L 310,475 L 295,461 L 280,474 L 265,460 L 250,473 L 235,458 L 220,472 L 206,459 
               L 194,470 
               L 194,146 
               A 16,16 0 0,1 210,130 Z" 
            fill="none" stroke="#2A0826" stroke-width="10" stroke-linejoin="round"/>

      <!-- Paper Base Fill (Warm Cream) -->
      <path d="M 210,130 
               L 590,130 
               A 16,16 0 0,1 606,146 
               L 606,470 
               L 592,460 L 580,473 L 565,458 L 550,472 L 536,459 L 520,475 L 505,461 L 490,474 L 476,460 L 460,473 L 445,459 L 430,472 L 415,458 L 400,474 L 385,460 L 370,473 L 355,459 L 340,472 L 325,458 L 310,475 L 295,461 L 280,474 L 265,460 L 250,473 L 235,458 L 220,472 L 206,459 
               L 194,470 
               L 194,146 
               A 16,16 0 0,1 210,130 Z" 
            fill="#FFFDF2"/>

      <!-- Clipped Inner Elements (Ruled Lines, Bottom Tear Shading) -->
      <g clip-path="url(#paper-clip)">
        <!-- Bottom Torn Edge Shadow Band (Flat Shading) -->
        <path d="M 180,448 L 620,448 L 620,490 L 180,490 Z" fill="#EFE3C3" opacity="0.6"/>

        <!-- Notebook Horizontal Ruled Lines -->
        <line x1="194" y1="240" x2="606" y2="240" stroke="#C5E0F0" stroke-width="2.5"/>
        <line x1="194" y1="275" x2="606" y2="275" stroke="#C5E0F0" stroke-width="2.5"/>
        <line x1="194" y1="310" x2="606" y2="310" stroke="#C5E0F0" stroke-width="2.5"/>
        <line x1="194" y1="345" x2="606" y2="345" stroke="#C5E0F0" stroke-width="2.5"/>
        <line x1="194" y1="380" x2="606" y2="380" stroke="#C5E0F0" stroke-width="2.5"/>
        <line x1="194" y1="415" x2="606" y2="415" stroke="#C5E0F0" stroke-width="2.5"/>

        <!-- Top Header Tape/Tonal Block behind Punch Holes -->
        <rect x="194" y="130" width="412" height="50" fill="#F4EBCF" opacity="0.4"/>
      </g>

      <!-- Notebook Punch Holes Row (Positioned below ribbon anchor line) -->
      <g fill="#2A0826">
        <!-- Hole 1 -->
        <circle cx="235" cy="188" r="7"/>
        <circle cx="235" cy="187" r="5" fill="#EADCB9"/>
        <!-- Hole 2 -->
        <circle cx="301" cy="188" r="7"/>
        <circle cx="301" cy="187" r="5" fill="#EADCB9"/>
        <!-- Hole 3 -->
        <circle cx="367" cy="188" r="7"/>
        <circle cx="367" cy="187" r="5" fill="#EADCB9"/>
        <!-- Hole 4 -->
        <circle cx="433" cy="188" r="7"/>
        <circle cx="433" cy="187" r="5" fill="#EADCB9"/>
        <!-- Hole 5 -->
        <circle cx="499" cy="188" r="7"/>
        <circle cx="499" cy="187" r="5" fill="#EADCB9"/>
        <!-- Hole 6 -->
        <circle cx="565" cy="188" r="7"/>
        <circle cx="565" cy="187" r="5" fill="#EADCB9"/>
      </g>

      <!-- Bio Paragraph Content -->
      <text font-family="'Nunito', 'Fredoka', 'Arial Rounded MT Bold', sans-serif" font-weight="700" font-size="15.5" fill="#382033" text-anchor="middle">
        <tspan x="400" y="268">Game Producer &amp; Senior Designer with 19+ years</tspan>
        <tspan x="400" y="303">creating engaging games, leading cross-functional</tspan>
        <tspan x="400" y="338">teams, and crafting memorable player experiences</tspan>
        <tspan x="400" y="373">across mobile and casual platforms.</tspan>
      </text>
    </g>

    <!-- ========================================== -->
    <!-- 3. RIBBON CAST SHADOW ONTO PAPER (The Seam)-->
    <!-- ========================================== -->
    <!-- This sharp flat shadow binds the ribbon seamlessly onto the paper surface -->
    <g id="ribbon-seamless-connector">
      <!-- Cast Shadow of Banner Body & Folds -->
      <path d="M 200,166 L 600,166 L 585,180 L 215,180 Z" fill="#2A0826" opacity="0.18"/>
      <path d="M 212,154 L 228,154 L 228,176 L 212,168 Z" fill="#2A0826" opacity="0.25"/>
      <path d="M 588,154 L 572,154 L 572,176 L 588,168 Z" fill="#2A0826" opacity="0.25"/>

      <!-- Structural Paper Notch Tab (Paper visually wraps into ribbon slot) -->
      <path d="M 222,126 L 578,126 L 582,130 L 218,130 Z" fill="#E3D1A2"/>
    </g>

    <!-- ========================================== -->
    <!-- 4. CANDY RIBBON BANNER COMPONENT          -->
    <!-- ========================================== -->
    <g id="candy-ribbon">
      
      <!-- --- LEFT TAIL --- -->
      <!-- Left Tail Dark Stroke Outline -->
      <path d="M 160,118 L 235,118 L 235,170 L 160,170 L 180,144 Z" 
            fill="none" stroke="#2A0826" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
      <!-- Left Tail Base Fill -->
      <path d="M 160,118 L 235,118 L 235,170 L 160,170 L 180,144 Z" fill="#D81B60"/>
      <!-- Left Tail Flat Shadow Band -->
      <path d="M 160,170 L 180,144 L 160,118 L 175,118 L 192,144 L 175,170 Z" fill="#A3003F"/>
      <!-- Left Tail Bottom Shadow Band -->
      <path d="M 170,157 L 180,144 L 160,170 L 235,170 L 235,157 Z" fill="#B0124A"/>

      <!-- --- RIGHT TAIL --- -->
      <!-- Right Tail Dark Stroke Outline -->
      <path d="M 640,118 L 565,118 L 565,170 L 640,170 L 620,144 Z" 
            fill="none" stroke="#2A0826" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
      <!-- Right Tail Base Fill -->
      <path d="M 640,118 L 565,118 L 565,170 L 640,170 L 620,144 Z" fill="#D81B60"/>
      <!-- Right Tail Flat Shadow Band -->
      <path d="M 640,170 L 620,144 L 640,118 L 625,118 L 608,144 L 625,170 Z" fill="#A3003F"/>
      <!-- Right Tail Bottom Shadow Band -->
      <path d="M 630,157 L 620,144 L 640,170 L 565,170 L 565,157 Z" fill="#B0124A"/>

      <!-- --- BACK FOLD TRIANGLES (3D Connection) --- -->
      <!-- Left Fold Triangle -->
      <path d="M 218,154 L 238,154 L 238,172 Z" fill="#2A0826"/>
      <path d="M 220,154 L 236,154 L 236,168 Z" fill="#7A002E"/>
      
      <!-- Right Fold Triangle -->
      <path d="M 582,154 L 562,154 L 562,172 Z" fill="#2A0826"/>
      <path d="M 580,154 L 564,154 L 564,168 Z" fill="#7A002E"/>

      <!-- --- MAIN FRONT BANNER BODY --- -->
      <!-- Thick Outer Dark Outline -->
      <path d="M 212,102 
               L 588,102 
               C 596,102 602,108 600,116 
               L 592,152 
               C 590,160 582,166 574,166 
               L 226,166 
               C 218,166 210,160 208,152 
               L 200,116 
               C 198,108 204,102 212,102 Z" 
            fill="none" stroke="#2A0826" stroke-width="9" stroke-linejoin="round"/>

      <!-- Main Banner Base Fill (Saturated Candy Pink) -->
      <path d="M 212,102 
               L 588,102 
               C 596,102 602,108 600,116 
               L 592,152 
               C 590,160 582,166 574,166 
               L 226,166 
               C 218,166 210,160 208,152 
               L 200,116 
               C 198,108 204,102 212,102 Z" 
            fill="#FF2A6D"/>

      <!-- Top Crisp Highlight Band -->
      <path d="M 212,102 
               L 588,102 
               C 596,102 601,107 600,113 
               L 597,122 
               L 203,122 
               L 200,113 
               C 199,107 204,102 212,102 Z" 
            fill="#FF7EAD"/>

      <!-- Bottom Crisp Shadow Band -->
      <path d="M 203,146 
               L 597,146 
               L 592,152 
               C 590,160 582,166 574,166 
               L 226,166 
               C 218,166 210,160 208,152 Z" 
            fill="#C40047"/>

      <!-- Inner Stitching / Bevel Line Effect -->
      <path d="M 215,108 L 585,108 C 589,108 592,111 591,115 L 585,148 C 584,152 580,155 576,155 L 224,155 C 220,155 216,152 215,148 L 209,115 C 208,111 211,108 215,108 Z" 
            fill="none" stroke="#FFA3C2" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>

      <!-- Banner Edge Accent Caps (Gold Rivet Details Fusing Ribbon & Paper Look) -->
      <circle cx="222" cy="134" r="4.5" fill="#2A0826"/>
      <circle cx="222" cy="133" r="3" fill="#FFD700"/>
      <circle cx="221" cy="132" r="1" fill="#FFF"/>

      <circle cx="578" cy="134" r="4.5" fill="#2A0826"/>
      <circle cx="578" cy="133" r="3" fill="#FFD700"/>
      <circle cx="577" cy="132" r="1" fill="#FFF"/>

      <!-- --- BANNER TEXT: "GAME PRODUCER" --- -->
      <!-- Text Heavy Outer Stroke for Chunky Game UI Style -->
      <text x="400" y="143" 
            font-family="'Fredoka', 'Arial Rounded MT Bold', 'Nunito', sans-serif" 
            font-weight="900" 
            font-size="25" 
            letter-spacing="2" 
            text-anchor="middle" 
            stroke="#2A0826" 
            stroke-width="7" 
            stroke-linejoin="round" 
            fill="#2A0826">
        GAME PRODUCER
      </text>

      <!-- Text 3D Offset Shadow Layer -->
      <text x="400" y="144" 
            font-family="'Fredoka', 'Arial Rounded MT Bold', 'Nunito', sans-serif" 
            font-weight="900" 
            font-size="25" 
            letter-spacing="2" 
            text-anchor="middle" 
            fill="#E01053">
        GAME PRODUCER
      </text>

      <!-- Text Front Face (Clean White) -->
      <text x="400" y="142" 
            font-family="'Fredoka', 'Arial Rounded MT Bold', 'Nunito', sans-serif" 
            font-weight="900" 
            font-size="25" 
            letter-spacing="2" 
            text-anchor="middle" 
            fill="#FFFFFF">
        GAME PRODUCER
      </text>

    </g>
  </g>
</svg>