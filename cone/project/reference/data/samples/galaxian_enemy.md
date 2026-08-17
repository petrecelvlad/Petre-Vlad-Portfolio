<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Smooth two-stop color gradient: pale cyan to deep ocean blue -->
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#70e1f5" />
      <stop offset="100%" stop-color="#09203f" />
    </linearGradient>

    <!-- 
      Classic arcade space invader sprite (blocky, geometric).
      Width: 11 units, Height: 8 units. 
      Using a 10x10 rect grid per pixel for crisp scaling.
    -->
    <g id="invader">
      <!-- Row 0: 2, 8 -->
      <rect x="20" y="0" width="10" height="10"/>
      <rect x="80" y="0" width="10" height="10"/>
      <!-- Row 1: 3, 7 -->
      <rect x="30" y="10" width="10" height="10"/>
      <rect x="70" y="10" width="10" height="10"/>
      <!-- Row 2: 2,3,4,5,6,7,8 -->
      <rect x="20" y="20" width="70" height="10"/>
      <!-- Row 3: 1,2, 4,5,6, 8,9 -->
      <rect x="10" y="30" width="20" height="10"/>
      <rect x="40" y="30" width="30" height="10"/>
      <rect x="80" y="30" width="20" height="10"/>
      <!-- Row 4: 0,1,2,3,4,5,6,7,8,9,10 -->
      <rect x="0" y="40" width="110" height="10"/>
      <!-- Row 5: 0, 2,3,4,5,6,7,8, 10 -->
      <rect x="0" y="50" width="10" height="10"/>
      <rect x="20" y="50" width="70" height="10"/>
      <rect x="100" y="50" width="10" height="10"/>
      <!-- Row 6: 0, 2, 8, 10 -->
      <rect x="0" y="60" width="10" height="10"/>
      <rect x="20" y="60" width="10" height="10"/>
      <rect x="80" y="60" width="10" height="10"/>
      <rect x="100" y="60" width="10" height="10"/>
      <!-- Row 7: 3,4, 6,7 -->
      <rect x="30" y="70" width="20" height="10"/>
      <rect x="60" y="70" width="20" height="10"/>
    </g>

    <!-- 
      Animations for stiff side-to-side marching motion with stepping down.
      Keyframes use discrete steps to mimic classic arcade frame-by-frame movement.
    -->
    
    <!-- Far Layer Animation: Slower, smaller bounds -->
    <keyframes name="march-far">
      <keyframe offset="0%" transform="translate(0, 0)" />
      <keyframe offset="20%" transform="translate(25, 0)" />
      <keyframe offset="22%" transform="translate(25, 8)" />
      <keyframe offset="45%" transform="translate(0, 8)" />
      <keyframe offset="47%" transform="translate(0, 16)" />
      <keyframe offset="70%" transform="translate(25, 16)" />
      <keyframe offset="72%" transform="translate(25, 8)" />
      <keyframe offset="98%" transform="translate(0, 8)" />
      <keyframe offset="100%" transform="translate(0, 0)" />
    </keyframes>

    <!-- Mid Layer Animation: Medium speed and bounds -->
    <keyframes name="march-mid">
      <keyframe offset="0%" transform="translate(0, 0)" />
      <keyframe offset="18%" transform="translate(-40, 0)" />
      <keyframe offset="20%" transform="translate(-40, 10)" />
      <keyframe offset="42%" transform="translate(0, 10)" />
      <keyframe offset="44%" transform="translate(0, 20)" />
      <keyframe offset="65%" transform="translate(-40, 20)" />
      <keyframe offset="67%" transform="translate(-40, 10)" />
      <keyframe offset="98%" transform="translate(0, 10)" />
      <keyframe offset="100%" transform="translate(0, 0)" />
    </keyframes>

    <!-- Near Layer Animation: Faster, wider bounds -->
    <keyframes name="march-near">
      <keyframe offset="0%" transform="translate(0, 0)" />
      <keyframe offset="15%" transform="translate(60, 0)" />
      <keyframe offset="17%" transform="translate(60, 12)" />
      <keyframe offset="38%" transform="translate(0, 12)" />
      <keyframe offset="40%" transform="translate(0, 24)" />
      <keyframe offset="60%" transform="translate(60, 24)" />
      <keyframe offset="62%" transform="translate(60, 12)" />
      <keyframe offset="98%" transform="translate(0, 12)" />
      <keyframe offset="100%" transform="translate(0, 0)" />
    </keyframes>

    <style>
      .layer-far {
        fill: rgba(255, 255, 255, 0.08);
        animation: march-far 16s steps(12, end) infinite;
      }
      .layer-mid {
        fill: rgba(255, 245, 230, 0.14);
        animation: march-mid 11s steps(10, end) infinite;
      }
      .layer-near {
        fill: rgba(255, 255, 255, 0.22);
        animation: march-near 7s steps(8, end) infinite;
      }
    </style>
  </defs>

  <!-- Background Layer -->
  <rect width="800" height="600" fill="url(#bg-gradient)" />

  <!-- 
    SCATTERED INVADER LAYERS
    Each layer has multiple formation groups positioned across the canvas, 
    sharing the marching animation timeline.
  -->

  <!-- FAR LAYER (Small scale, lowest opacity, slowest movement) -->
  <g class="layer-far" transform="scale(0.6)">
    <!-- Formation Group 1 (Top Left) -->
    <g transform="translate(100, 80)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="140" y="0" />
      <use href="#invader" x="280" y="0" />
    </g>
    <!-- Formation Group 2 (Mid Right) -->
    <g transform="translate(700, 300)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="150" y="0" />
    </g>
    <!-- Formation Group 3 (Bottom Left) -->
    <g transform="translate(250, 750)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="130" y="0" />
      <use href="#invader" x="260" y="0" />
    </g>
  </g>

  <!-- MID LAYER (Medium scale, medium opacity, moderate movement) -->
  <g class="layer-mid" transform="scale(0.9)">
    <!-- Formation Group 1 (Top Right) -->
    <g transform="translate(550, 120)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="160" y="0" />
    </g>
    <!-- Formation Group 2 (Center Left) -->
    <g transform="translate(80, 320)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="150" y="0" />
    </g>
    <!-- Formation Group 3 (Lower Right) -->
    <g transform="translate(500, 520)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="170" y="0" />
      <use href="#invader" x="340" y="0" />
    </g>
  </g>

  <!-- NEAR LAYER (Full scale, highest opacity among layers, fastest movement) -->
  <g class="layer-near" transform="scale(1.3)">
    <!-- Formation Group 1 (Top Center-Left) -->
    <g transform="translate(180, 40)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="180" y="0" />
    </g>
    <!-- Formation Group 2 (Far Right) -->
    <g transform="translate(450, 260)">
      <use href="#invader" x="0" y="0" />
    </g>
    <!-- Formation Group 3 (Bottom Left) -->
    <g transform="translate(60, 380)">
      <use href="#invader" x="0" y="0" />
      <use href="#invader" x="190" y="0" />
    </g>
  </g>

</svg>