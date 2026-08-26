<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%" style="background:#5c94fc; image-rendering: pixelated; shape-rendering: crispEdges;">
  <defs>
    <style>
      /* --- PARALLAX & WORLD SCROLLING --- */
      .layer-clouds { animation: scroll-clouds 6s linear infinite; }
      .layer-hills  { animation: scroll-hills 6s linear infinite; }
      .layer-main   { animation: scroll-main 6s linear infinite; }

      @keyframes scroll-clouds {
        0%   { transform: translateX(0px); }
        100% { transform: translateX(-200px); }
      }
      @keyframes scroll-hills {
        0%   { transform: translateX(0px); }
        100% { transform: translateX(-400px); }
      }
      @keyframes scroll-main {
        0%   { transform: translateX(0px); }
        100% { transform: translateX(-800px); }
      }

      /* --- HERO VERTICAL JUMP TIMING --- */
      /* Synchronized with 6s world loop:
         0.00s - 1.25s: Running on ground
         1.25s - 2.55s: JUMP 1 (Big arc over the pit)
         2.55s - 3.10s: Running on ground
         3.10s - 3.90s: JUMP 2 (Medium arc over tall pipe)
         3.90s - 4.60s: Running on ground
         4.60s - 5.15s: JUMP 3 (Quick hop over enemy)
         5.15s - 6.00s: Running on ground
      */
      .hero-vertical {
        animation: hero-jump 6s linear infinite;
      }

      @keyframes hero-jump {
        0%, 20.83% { transform: translateY(0px); }
        /* Jump 1: Pit Arc */
        25.8%  { transform: translateY(-85px); }
        30.83% { transform: translateY(-135px); }
        36.5%  { transform: translateY(-85px); }
        42.50% { transform: translateY(0px); }
        /* Ground Run */
        51.67% { transform: translateY(0px); }
        /* Jump 2: Pipe Arc */
        55.0%  { transform: translateY(-55px); }
        58.33% { transform: translateY(-90px); }
        61.6%  { transform: translateY(-55px); }
        65.00% { transform: translateY(0px); }
        /* Ground Run */
        76.67% { transform: translateY(0px); }
        /* Jump 3: Enemy Hop */
        79.0%  { transform: translateY(-30px); }
        81.25% { transform: translateY(-50px); }
        83.5%  { transform: translateY(-30px); }
        85.83% { transform: translateY(0px); }
        100%   { transform: translateY(0px); }
      }

      /* --- HERO POSE TOGGLE (Run vs Jump) --- */
      .hero-pose-run  { animation: show-run 6s linear infinite; }
      .hero-pose-jump { animation: show-jump 6s linear infinite; }

      @keyframes show-run {
        0%, 20.82%   { opacity: 1; }
        20.83%, 42.49% { opacity: 0; }
        42.50%, 51.66% { opacity: 1; }
        51.67%, 64.99% { opacity: 0; }
        65.00%, 76.66% { opacity: 1; }
        76.67%, 85.82% { opacity: 0; }
        85.83%, 100%   { opacity: 1; }
      }
      @keyframes show-jump {
        0%, 20.82%   { opacity: 0; }
        20.83%, 42.49% { opacity: 1; }
        42.50%, 51.66% { opacity: 0; }
        51.67%, 64.99% { opacity: 1; }
        65.00%, 76.66% { opacity: 0; }
        76.67%, 85.82% { opacity: 1; }
        85.83%, 100%   { opacity: 0; }
      }

      /* --- HERO LEGS ANIMATION (RUN CYCLE) --- */
      .leg-frame-1 { animation: leg-swap1 0.24s infinite steps(1); }
      .leg-frame-2 { animation: leg-swap2 0.24s infinite steps(1); }
      .hero-body-bob { animation: body-bob 0.24s infinite steps(1); }

      @keyframes leg-swap1 {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0; }
      }
      @keyframes leg-swap2 {
        0%, 100% { opacity: 0; }
        50%      { opacity: 1; }
      }
      @keyframes body-bob {
        0%, 100% { transform: translateY(0px); }
        50%      { transform: translateY(2px); }
      }

      /* --- ITEM ANIMATIONS --- */
      .coin-spin {
        animation: coin-flip 0.6s infinite steps(4);
        transform-origin: center;
        transform-box: fill-box;
      }
      @keyframes coin-flip {
        0%   { transform: scaleX(1); }
        25%  { transform: scaleX(0.5); }
        50%  { transform: scaleX(0.1); }
        75%  { transform: scaleX(0.5); }
        100% { transform: scaleX(1); }
      }

      .q-block-glow { animation: q-glow 0.8s infinite alternate; }
      @keyframes q-glow {
        0%   { fill: #fc9838; }
        100% { fill: #fce0a8; }
      }

      .enemy-waddle { animation: waddle 0.3s infinite alternate steps(1); }
      @keyframes waddle {
        0%   { transform: translateX(0px) skewY(0deg); }
        100% { transform: translateX(2px) skewY(2deg); }
      }

      .flag-wave { animation: wave 0.6s infinite alternate steps(2); }
      @keyframes wave {
        0%   { transform: skewY(0deg); }
        100% { transform: skewY(-4deg); }
      }
    </style>

    <!-- ================= SPRITE DEFINITIONS ================= -->

    <!-- DIRT TILE (32x32) -->
    <g id="tile-dirt">
      <rect x="0" y="0" width="32" height="32" fill="#c84c0c"/>
      <rect x="0" y="0" width="32" height="2" fill="#802800"/>
      <rect x="0" y="0" width="2" height="32" fill="#802800"/>
      <rect x="30" y="0" width="2" height="32" fill="#e45c10"/>
      <rect x="0" y="30" width="32" height="2" fill="#e45c10"/>
      <!-- Pixel detail spots -->
      <rect x="6" y="6" width="4" height="4" fill="#802800"/>
      <rect x="20" y="10" width="6" height="4" fill="#e45c10"/>
      <rect x="10" y="20" width="4" height="6" fill="#802800"/>
      <rect x="22" y="22" width="4" height="4" fill="#e45c10"/>
    </g>

    <!-- GRASS TOP TILE (32x32) -->
    <g id="tile-grass">
      <!-- Dirt Base -->
      <use href="#tile-dirt" x="0" y="0"/>
      <!-- Grass Top Cap -->
      <rect x="0" y="0" width="32" height="12" fill="#00a800"/>
      <rect x="0" y="0" width="32" height="4" fill="#00d820"/>
      <!-- Pixel Fringe / Fringe Teeth -->
      <path d="M0,12 H4 V16 H0 Z M8,12 H12 V14 H8 Z M16,12 H20 V16 H16 Z M24,12 H28 V15 H24 Z" fill="#00a800"/>
      <path d="M0,4 H32 V2 H0 Z" fill="#58f858" opacity="0.6"/>
    </g>

    <!-- BRICK BLOCK (32x32) -->
    <g id="tile-brick">
      <rect x="0" y="0" width="32" height="32" fill="#000000"/>
      <rect x="2" y="2" width="28" height="28" fill="#b84418"/>
      <!-- Mortar lines -->
      <rect x="2" y="2" width="28" height="2" fill="#f87858"/>
      <rect x="2" y="15" width="28" height="2" fill="#000000"/>
      <rect x="2" y="17" width="28" height="2" fill="#f87858"/>
      <rect x="15" y="2" width="2" height="13" fill="#000000"/>
      <rect x="8" y="17" width="2" height="13" fill="#000000"/>
      <rect x="24" y="17" width="2" height="13" fill="#000000"/>
    </g>

    <!-- QUESTION BLOCK (32x32) -->
    <g id="tile-q">
      <rect x="0" y="0" width="32" height="32" fill="#000000"/>
      <rect x="2" y="2" width="28" height="28" class="q-block-glow"/>
      <rect x="2" y="2" width="26" height="2" fill="#fce0a8"/>
      <rect x="2" y="2" width="2" height="26" fill="#fce0a8"/>
      <rect x="28" y="4" width="2" height="26" fill="#802800"/>
      <rect x="4" y="28" width="26" height="2" fill="#802800"/>
      <!-- Corner Dots -->
      <rect x="4" y="4" width="2" height="2" fill="#802800"/>
      <rect x="26" y="4" width="2" height="2" fill="#802800"/>
      <rect x="4" y="26" width="2" height="2" fill="#802800"/>
      <rect x="26" y="26" width="2" height="2" fill="#802800"/>
      <!-- Question Mark "?" -->
      <path d="M10,8 H22 V14 H18 V18 H14 V12 H18 V10 H10 Z M14,20 H18 V24 H14 Z" fill="#802800"/>
      <path d="M10,6 H22 V12 H18 V16 H14 V10 H18 V8 H10 Z M14,19 H18 V23 H14 Z" fill="#ffffff"/>
    </g>

    <!-- COIN (16x20) -->
    <g id="coin" class="coin-spin">
      <rect x="2" y="0" width="12" height="20" fill="#000000"/>
      <rect x="0" y="2" width="16" height="16" fill="#000000"/>
      <rect x="4" y="2" width="8" height="16" fill="#f8d820"/>
      <rect x="2" y="4" width="12" height="12" fill="#f8d820"/>
      <rect x="4" y="4" width="2" height="12" fill="#ffffff"/>
      <rect x="10" y="4" width="2" height="12" fill="#b87000"/>
    </g>

    <!-- SHORT WARP PIPE (48x50) -->
    <g id="pipe-short">
      <!-- Pipe Rim -->
      <rect x="0" y="0" width="48" height="20" fill="#000000"/>
      <rect x="2" y="2" width="44" height="16" fill="#00a800"/>
      <rect x="6" y="2" width="6" height="16" fill="#b8f818"/>
      <rect x="12" y="2" width="4" height="16" fill="#00d820"/>
      <rect x="36" y="2" width="8" height="16" fill="#005000"/>
      <!-- Pipe Body -->
      <rect x="4" y="20" width="40" height="30" fill="#000000"/>
      <rect x="6" y="20" width="36" height="30" fill="#00a800"/>
      <rect x="10" y="20" width="6" height="30" fill="#b8f818"/>
      <rect x="16" y="20" width="4" height="30" fill="#00d820"/>
      <rect x="34" y="20" width="6" height="30" fill="#005000"/>
    </g>

    <!-- TALL WARP PIPE (48x80) -->
    <g id="pipe-tall">
      <use href="#pipe-short" x="0" y="0"/>
      <rect x="4" y="50" width="40" height="30" fill="#000000"/>
      <rect x="6" y="50" width="36" height="30" fill="#00a800"/>
      <rect x="10" y="50" width="6" height="30" fill="#b8f818"/>
      <rect x="16" y="50" width="4" height="30" fill="#00d820"/>
      <rect x="34" y="50" width="6" height="30" fill="#005000"/>
    </g>

    <!-- PIXEL ENEMY / GOOMBA-STYLE CRITTER (32x32) -->
    <g id="enemy" class="enemy-waddle">
      <!-- Head / Body -->
      <rect x="8" y="0" width="16" height="4" fill="#000000"/>
      <rect x="4" y="4" width="24" height="4" fill="#000000"/>
      <rect x="2" y="8" width="28" height="16" fill="#000000"/>
      <rect x="8" y="2" width="16" height="2" fill="#c84c0c"/>
      <rect x="4" y="6" width="24" height="2" fill="#c84c0c"/>
      <rect x="4" y="8" width="24" height="14" fill="#c84c0c"/>
      <!-- Face Stems -->
      <rect x="8" y="22" width="16" height="4" fill="#f8ce90"/>
      <!-- Angry Eyes -->
      <rect x="6" y="10" width="6" height="8" fill="#ffffff"/>
      <rect x="20" y="10" width="6" height="8" fill="#ffffff"/>
      <rect x="10" y="12" width="2" height="6" fill="#000000"/>
      <rect x="20" y="12" width="2" height="6" fill="#000000"/>
      <path d="M6,10 L12,14 V10 Z M26,10 L20,14 V10 Z" fill="#000000"/>
      <!-- Feet -->
      <g class="enemy-feet">
        <rect x="0" y="26" width="10" height="6" fill="#000000"/>
        <rect x="22" y="26" width="10" height="6" fill="#000000"/>
        <rect x="2" y="28" width="6" height="3" fill="#502000"/>
        <rect x="24" y="28" width="6" height="3" fill="#502000"/>
      </g>
    </g>

    <!-- 200px PARALLAX CLOUD BLOCK -->
    <g id="clouds-200">
      <!-- Cloud 1 -->
      <g transform="translate(20, 40)">
        <rect x="10" y="0" width="30" height="20" fill="#ffffff"/>
        <rect x="0" y="10" width="50" height="15" fill="#ffffff"/>
        <rect x="0" y="20" width="50" height="5" fill="#92a0d8"/>
        <rect x="5" y="25" width="40" height="3" fill="#70a4b8"/>
      </g>
      <!-- Cloud 2 -->
      <g transform="translate(130, 70)">
        <rect x="8" y="0" width="20" height="14" fill="#ffffff"/>
        <rect x="0" y="6" width="36" height="12" fill="#ffffff"/>
        <rect x="0" y="14" width="36" height="4" fill="#92a0d8"/>
      </g>
    </g>

    <!-- 400px PARALLAX HILL BLOCK -->
    <g id="hill-400">
      <!-- Big Hill -->
      <path d="M 40,300 L 120,180 L 200,300 Z" fill="#00a800"/>
      <path d="M 120,180 L 200,300 H 120 Z" fill="#007800"/> <!-- Shadow side -->
      <path d="M 105,200 L 120,180 L 135,200 Z" fill="#58f858"/> <!-- Highlight peak -->
      <!-- Small Hill -->
      <path d="M 260,300 L 320,220 L 380,300 Z" fill="#00a800"/>
      <path d="M 320,220 L 380,300 H 320 Z" fill="#007800"/>
      <!-- Hill Outline Spots -->
      <circle cx="120" cy="220" r="3" fill="#00d820"/>
      <circle cx="90" cy="260" r="4" fill="#00d820"/>
      <circle cx="150" cy="250" r="4" fill="#005000"/>
    </g>

    <!-- ONE COMPLETE 800px LEVEL TILE SECTION -->
    <g id="level-tile-800">
      <!-- Ground Floor Blocks (0..448px) -->
      <!-- Row 1: Grass Surface at Y=460 -->
      <use href="#tile-grass" x="0" y="460"/><use href="#tile-grass" x="32" y="460"/>
      <use href="#tile-grass" x="64" y="460"/><use href="#tile-grass" x="96" y="460"/>
      <use href="#tile-grass" x="128" y="460"/><use href="#tile-grass" x="160" y="460"/>
      <use href="#tile-grass" x="192" y="460"/><use href="#tile-grass" x="224" y="460"/>
      <use href="#tile-grass" x="256" y="460"/><use href="#tile-grass" x="288" y="460"/>
      <use href="#tile-grass" x="320" y="460"/><use href="#tile-grass" x="352" y="460"/>
      <use href="#tile-grass" x="384" y="460"/><use href="#tile-grass" x="416" y="460"/>

      <!-- Underground Dirt Rows (0..448px) -->
      <g>
        <!-- Y=492 -->
        <use href="#tile-dirt" x="0" y="492"/><use href="#tile-dirt" x="32" y="492"/><use href="#tile-dirt" x="64" y="492"/><use href="#tile-dirt" x="96" y="492"/><use href="#tile-dirt" x="128" y="492"/><use href="#tile-dirt" x="160" y="492"/><use href="#tile-dirt" x="192" y="492"/><use href="#tile-dirt" x="224" y="492"/><use href="#tile-dirt" x="256" y="492"/><use href="#tile-dirt" x="288" y="492"/><use href="#tile-dirt" x="320" y="492"/><use href="#tile-dirt" x="352" y="492"/><use href="#tile-dirt" x="384" y="492"/><use href="#tile-dirt" x="416" y="492"/>
        <!-- Y=524 -->
        <use href="#tile-dirt" x="0" y="524"/><use href="#tile-dirt" x="32" y="524"/><use href="#tile-dirt" x="64" y="524"/><use href="#tile-dirt" x="96" y="524"/><use href="#tile-dirt" x="128" y="524"/><use href="#tile-dirt" x="160" y="524"/><use href="#tile-dirt" x="192" y="524"/><use href="#tile-dirt" x="224" y="524"/><use href="#tile-dirt" x="256" y="524"/><use href="#tile-dirt" x="288" y="524"/><use href="#tile-dirt" x="320" y="524"/><use href="#tile-dirt" x="352" y="524"/><use href="#tile-dirt" x="384" y="524"/><use href="#tile-dirt" x="416" y="524"/>
        <!-- Y=556 -->
        <use href="#tile-dirt" x="0" y="556"/><use href="#tile-dirt" x="32" y="556"/><use href="#tile-dirt" x="64" y="556"/><use href="#tile-dirt" x="96" y="556"/><use href="#tile-dirt" x="128" y="556"/><use href="#tile-dirt" x="160" y="556"/><use href="#tile-dirt" x="192" y="556"/><use href="#tile-dirt" x="224" y="556"/><use href="#tile-dirt" x="256" y="556"/><use href="#tile-dirt" x="288" y="556"/><use href="#tile-dirt" x="320" y="556"/><use href="#tile-dirt" x="352" y="556"/><use href="#tile-dirt" x="384" y="556"/><use href="#tile-dirt" x="416" y="556"/>
      </g>

      <!-- THE PIT GAP (448px to 576px) -> Dark pit abyss walls -->
      <rect x="448" y="460" width="8" height="140" fill="#000000"/>
      <rect x="568" y="460" width="8" height="140" fill="#000000"/>

      <!-- Ground Floor Blocks (576px to 800px) -->
      <!-- Row 1: Grass Surface at Y=460 -->
      <use href="#tile-grass" x="576" y="460"/><use href="#tile-grass" x="608" y="460"/>
      <use href="#tile-grass" x="640" y="460"/><use href="#tile-grass" x="672" y="460"/>
      <use href="#tile-grass" x="704" y="460"/><use href="#tile-grass" x="736" y="460"/>
      <use href="#tile-grass" x="768" y="460"/>

      <!-- Underground Dirt Rows (576..800px) -->
      <g>
        <use href="#tile-dirt" x="576" y="492"/><use href="#tile-dirt" x="608" y="492"/><use href="#tile-dirt" x="640" y="492"/><use href="#tile-dirt" x="672" y="492"/><use href="#tile-dirt" x="704" y="492"/><use href="#tile-dirt" x="736" y="492"/><use href="#tile-dirt" x="768" y="492"/>
        <use href="#tile-dirt" x="576" y="524"/><use href="#tile-dirt" x="608" y="524"/><use href="#tile-dirt" x="640" y="524"/><use href="#tile-dirt" x="672" y="524"/><use href="#tile-dirt" x="704" y="524"/><use href="#tile-dirt" x="736" y="524"/><use href="#tile-dirt" x="768" y="524"/>
        <use href="#tile-dirt" x="576" y="556"/><use href="#tile-dirt" x="608" y="556"/><use href="#tile-dirt" x="640" y="556"/><use href="#tile-dirt" x="672" y="556"/><use href="#tile-dirt" x="704" y="556"/><use href="#tile-dirt" x="736" y="556"/><use href="#tile-dirt" x="768" y="556"/>
      </g>

      <!-- ================= LEVEL STRUCTURES & ITEMS ================= -->

      <!-- Enemy near start (X=96, reaches hero at t=4.87s -> Hero Hop 3) -->
      <use href="#enemy" x="96" y="428"/>

      <!-- Floating Block Formation 1 (X=160..256, Y=332) -->
      <use href="#tile-brick" x="160" y="332"/>
      <use href="#tile-q"     x="192" y="332"/>
      <use href="#tile-brick" x="224" y="332"/>
      <use href="#tile-q"     x="256" y="332"/>
      <!-- Coins Floating Above Blocks -->
      <use href="#coin" x="168" y="288"/>
      <use href="#coin" x="200" y="288"/>
      <use href="#coin" x="232" y="288"/>
      <use href="#coin" x="264" y="288"/>

      <!-- Coins Arc Over Pit (X=448..576) -->
      <use href="#coin" x="472" y="390"/>
      <use href="#coin" x="504" y="340"/>
      <use href="#coin" x="536" y="390"/>

      <!-- Brick Staircase Structure (X=608..672) -->
      <use href="#tile-brick" x="608" y="428"/>
      <use href="#tile-brick" x="640" y="428"/>
      <use href="#tile-brick" x="640" y="396"/>

      <!-- Tall Pipe (X=704, reaches hero at t=3.37s -> Hero Jump 2) -->
      <use href="#pipe-tall" x="704" y="380"/>

      <!-- Bushes on ground -->
      <path d="M 320,460 Q 330,440 340,460 Q 350,440 360,460 Z" fill="#00d820" stroke="#000000" stroke-width="2"/>
    </g>
  </defs>

  <!-- ================= SCENERY LAYERS ================= -->

  <!-- SKY BACKGROUND FILL -->
  <rect width="800" height="600" fill="#5c94fc"/>

  <!-- PARALLAX LAYER 1: CLOUDS (Slower, 200px loop) -->
  <g class="layer-clouds">
    <use href="#clouds-200" x="0" y="0"/>
    <use href="#clouds-200" x="200" y="0"/>
    <use href="#clouds-200" x="400" y="0"/>
    <use href="#clouds-200" x="600" y="0"/>
    <use href="#clouds-200" x="800" y="0"/>
    <use href="#clouds-200" x="1000" y="0"/>
  </g>

  <!-- PARALLAX LAYER 2: HILLS (Midground, 400px loop) -->
  <g class="layer-hills">
    <use href="#hill-400" x="0" y="160"/>
    <use href="#hill-400" x="400" y="160"/>
    <use href="#hill-400" x="800" y="160"/>
    <use href="#hill-400" x="1200" y="160"/>
  </g>

  <!-- PARALLAX LAYER 3: MAIN GAME WORLD (Full speed, 800px seamless loop) -->
  <g class="layer-main">
    <use href="#level-tile-800" x="0" y="0"/>
    <use href="#level-tile-800" x="800" y="0"/>
  </g>

  <!-- ================= FOREGROUND HERO CHARACTER ================= -->
  <!-- Screen Position: Fixed horizontally at X=250, Base Y=420 (feet at Y=460) -->
  <g transform="translate(250, 420)">
    <!-- Vertical Jump Container -->
    <g class="hero-vertical">

      <!-- POSE 1: RUNNING CYCLE (Active on ground) -->
      <g class="hero-pose-run">
        <g class="hero-body-bob">
          <!-- Cap / Head -->
          <rect x="6" y="0" width="22" height="6" fill="#f82000"/>
          <rect x="4" y="4" width="28" height="6" fill="#f82000"/>
          <rect x="22" y="4" width="8" height="2" fill="#ffffff"/> <!-- Cap Emblem -->
          <!-- Face / Eyes -->
          <rect x="6" y="10" width="20" height="8" fill="#f8c0a0"/>
          <rect x="18" y="12" width="4" height="6" fill="#000000"/> <!-- Eye -->
          <rect x="20" y="12" width="2" height="2" fill="#ffffff"/> <!-- Eye Shine -->
          <rect x="22" y="14" width="6" height="4" fill="#f8c0a0"/> <!-- Nose -->
          <rect x="16" y="18" width="10" height="3" fill="#502000"/> <!-- Mustache -->
          <!-- Shirt & Overalls Body -->
          <rect x="8" y="20" width="16" height="10" fill="#f82000"/>
          <rect x="10" y="22" width="12" height="10" fill="#0040f8"/>
          <rect x="12" y="24" width="2" height="2" fill="#f8d800"/> <!-- Button -->
          <rect x="20" y="24" width="2" height="2" fill="#f8d800"/> <!-- Button -->
          <!-- Arms / White Gloves -->
          <rect x="2" y="22" width="6" height="6" fill="#ffffff"/>
          <rect x="22" y="20" width="6" height="6" fill="#ffffff"/>
        </g>

        <!-- Dynamic Legs (Alternating 2-frame run) -->
        <!-- Leg Frame A -->
        <g class="leg-frame-1">
          <rect x="4" y="32" width="8" height="6" fill="#0040f8"/>
          <rect x="2" y="38" width="10" height="4" fill="#683000"/> <!-- Boot Left -->
          <rect x="18" y="32" width="8" height="4" fill="#0040f8"/>
          <rect x="20" y="36" width="10" height="6" fill="#683000"/> <!-- Boot Right -->
        </g>
        <!-- Leg Frame B -->
        <g class="leg-frame-2">
          <rect x="18" y="32" width="8" height="6" fill="#0040f8"/>
          <rect x="18" y="38" width="10" height="4" fill="#683000"/> <!-- Boot Right -->
          <rect x="4" y="32" width="8" height="4" fill="#0040f8"/>
          <rect x="0" y="36" width="10" height="6" fill="#683000"/> <!-- Boot Left -->
        </g>
      </g>

      <!-- POSE 2: AIRBORNE JUMP POSE (Active during hops) -->
      <g class="hero-pose-jump" transform="rotate(-6, 16, 20)">
        <!-- Cap / Head (Tilted back) -->
        <rect x="4" y="0" width="22" height="6" fill="#f82000"/>
        <rect x="2" y="4" width="28" height="6" fill="#f82000"/>
        <rect x="20" y="4" width="8" height="2" fill="#ffffff"/>
        <!-- Face -->
        <rect x="6" y="10" width="20" height="8" fill="#f8c0a0"/>
        <rect x="18" y="11" width="4" height="5" fill="#000000"/>
        <rect x="20" y="11" width="2" height="2" fill="#ffffff"/>
        <rect x="16" y="17" width="10" height="3" fill="#502000"/>
        <!-- Body / Overalls -->
        <rect x="6" y="18" width="16" height="12" fill="#0040f8"/>
        <rect x="8" y="18" width="12" height="6" fill="#f82000"/>
        <rect x="10" y="22" width="2" height="2" fill="#f8d800"/>
        <!-- Raised Victory Arm -->
        <rect x="20" y="8" width="6" height="10" fill="#f82000"/>
        <rect x="20" y="4" width="8" height="6" fill="#ffffff"/> <!-- High Glove -->
        <rect x="0" y="20" width="6" height="6" fill="#ffffff"/> <!-- Back Glove -->
        <!-- Bent Jumping Legs -->
        <rect x="2" y="28" width="10" height="6" fill="#0040f8"/>
        <rect x="0" y="34" width="10" height="6" fill="#683000"/> <!-- Tucked Boot -->
        <rect x="16" y="30" width="8" height="10" fill="#0040f8"/>
        <rect x="16" y="40" width="10" height="4" fill="#683000"/> <!-- Extended Boot -->
      </g>

    </g>
  </g>

  <!-- ================= FIXED RETRO HUD OVERLAY ================= -->
  <g transform="translate(0, 0)">
    <!-- Top Bar Dark Backdrop -->
    <rect x="0" y="0" width="800" height="44" fill="#000000" opacity="0.3"/>

    <!-- Score Column -->
    <text x="50" y="20" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">MARIO</text>
    <text x="50" y="36" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">004820</text>

    <!-- Coins Column -->
    <use href="#coin" x="280" y="18" transform="scale(0.8)"/>
    <text x="300" y="32" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">x14</text>

    <!-- World Column -->
    <text x="480" y="20" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">WORLD</text>
    <text x="496" y="36" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">1-1</text>

    <!-- Time Column -->
    <text x="670" y="20" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">TIME</text>
    <text x="678" y="36" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ffffff">294</text>
  </g>
</svg>