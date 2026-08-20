---
type: Spec
title: SVG Animation Prompts
description: Four standalone, copy-paste-ready prompts for commissioning original SVG/CSS animations from an external model — each prompt is self-contained and carries no context beyond the animation it describes.
tags: [spec, hero, svg, prompts]
timestamp: 2026-08-19T00:00:00Z
---

# SVG Animation Prompts

Four ready-to-paste prompts. Each one is complete on its own — copy just the text inside its box and hand
it to a model with nothing else added. None of them reference each other or anything outside themselves.

---

## Prompt 1

```
Create a looping SVG/CSS animation with a 16:9 widescreen aspect ratio, styled as chunky 16-bit/retro
game UI: hard edges, flat bold colors with mildly posterized/banded shading rather than smooth gradients,
thick dark outlines, bold pixel-style typography. The animation must loop perfectly and seamlessly — the
last frame must flow into the first with no visible jump. Total loop duration: exactly 6.5 seconds.

Palette:
- Background: deep navy/indigo #1E1B4B, with a soft radial vignette (brighter center, darker toward the
  edges — subtle, not dramatic)
- Gauge outer rim / gold accent: #EAB308
- Gauge empty interior: very dark navy, #0F172A
- Fill gradient across 8 segments as the bar climbs: electric yellow #FACC15 → flame orange #F97316 →
  crimson red on the final segment
- Cyan accent (particles, chevron faces, glow): #38BDF8
- Chevron/arrow shadow side: deep blue #1D4ED8
- Text: white with a thin, very dark near-black outline

Layout: a wide, short, rounded-rectangle horizontal gauge bar sits slightly left-of-center, a touch below
vertical center. It has a thick glowing gold outer border and is divided into 8 discrete tick segments
(like a classic HP/EXP bar — discrete steps, not a smooth fill). Two thin vertical dashed lines run down
the far left and far right edges of the frame as decorative "speed lines," scrolling diagonally and
continuously for the entire loop, independent of everything else.

Timeline (times from loop start at 0.0s):
- 0.0s–3.0s: the gauge fills from empty to completely full, one discrete segment at a time (8 steps).
  Each new segment causes the whole bar to give a small physical "bump" — a quick scale/position pop —
  and this bump grows progressively bigger and more energetic on later segments (the 8th segment's bump
  is the most violent, closer to a shake/rumble than a nudge). A faint horizontal scanline texture is
  visible inside the bar throughout, getting busier/faster as it fills.
- ~3.0s–3.5s: two large 3D-beveled chevron/arrow shapes (thick ">" arrowheads angled upward, with a lit
  cyan face and a darker blue extruded side for a chunky 3D-pixel-art look) launch upward from directly
  behind the gauge, one about 0.28s before the other, both accelerating as they rise (slow start, fast
  exit off the top of frame) and gently wobbling side to side as they fly. At the same time: a soft warm
  glow (gold + cyan) blooms in the upper background; two circular shockwave rings expand outward from
  near the bar and fade, staggered to match the two arrows; small glowing cyan particles drift upward on
  both sides of the bar, faster and brighter than idle; a handful of small gold coin/token shapes burst
  outward and arc upward near the bar, shrinking and fading as they rise; small pixel-chevron shapes drift
  upward faintly in the far background corners.
- ~3.0s–3.5s (same window): bold "LEVEL UP" text in thick pixel-block lettering, white with a dark
  outline, slides down into view from above/behind the bar and holds, roughly centered below the gauge.
- 5.0s–5.5s: the gauge rapidly empties back to zero, one segment at a time in reverse.
- ~5.1s–5.7s: the "LEVEL UP" text retracts back up and out of view.
- ~5.0s–5.6s: all burst effects (arrows, particles, shockwaves, glow, coins) fade out and stop.
- By 6.5s: everything is back to the exact empty/idle state it started in, and the loop repeats from 0.0s
  with no visible seam.

If you need to prioritize: the 8-segment discrete fill (not a smooth bar), the yellow-to-red color ramp
across segments, and the two staggered upward-launching chevrons as the clear payoff moment matter most.
Exact particle and coin counts are not important — overall density and energy matter more than precision.
Most of the loop should read as calm/anticipatory filling, with the payoff landing as a fast, punchy
~0.5–0.7 second burst.
```

---

## Prompt 2

```
Create a looping SVG/CSS animation with a 16:9 widescreen aspect ratio, styled as chunky retro-game pixel
art: hard edges, flat bold colors, thick dark outlines on every shape. The animation must loop perfectly
and seamlessly. Total loop duration: exactly 33⅓ seconds (100/3 seconds). This should read as a small
machine quietly, continuously running — not a fast burst of activity.

Palette:
- Background: dark violet/purple, roughly #1F1420, with a very faint grid/scanline texture
- Outlines (used on every shape — belt edges, block edges, press edges): near-black charcoal, roughly
  #1E212F
- Conveyor belt: dark gunmetal gray, roughly #2E3A4D, with a lighter diagonal stripe texture that scrolls
  continuously
- Gears/pulleys: mid-gray metallic, roughly #647388, with a darker spoke-cutout pattern
- Hopper/dispenser (left side): silver/chrome gradient with light highlights, plus a black-and-yellow
  diagonal hazard-stripe band near its base
- Stamping press: bright red body (roughly #E63350), darker red underside
- Blocks (4 colors, cycling): green #4ADE80, yellow #FACC15, sky blue #38BDF8, purple #BF83FD
- Scoreboard banner (top of frame): gold-bordered (#FACC15) trim around a dark navy panel

Layout, roughly left to right in a single horizontal band across the middle of the frame:
- Far left: a tilted, metallic hopper/dispenser with a black-and-yellow hazard stripe near its base —
  this is where blocks originate.
- A horizontal conveyor belt runs most of the width of the frame at mid-height, with two circular
  gears/pulleys — one near the left end just right of the dispenser, one near the right end — each
  continuously spinning at a steady rate (about one full turn every ~3.9 seconds) with a visible
  spoke-cutout pattern so the rotation is easy to read.
- Directly above the belt's midpoint: a vertical mechanical stamping press — a metal piston rod
  descending from the top edge of frame down to a red stamper head labeled "FUN" in bold white blocky
  text.
- Top of frame, small and unobtrusive: a rounded scoreboard banner with a gold border, containing two
  simple glowing horizontal bars standing in for illegible score text — render abstract glowing bar
  shapes, not real numbers or letters.

The mechanism (continuous and cyclic — every part is always moving, nothing is a one-shot event):
- Small rounded-square colored blocks, cycling through the 4 colors, spawn one at a time from the
  dispenser's nozzle, drop and stretch downward onto the belt (a brief squash-and-stretch on landing),
  then travel rightward along the belt at a steady pace, visibly slowing/hesitating as they approach the
  stamping station.
- The press runs its own steady rhythm, about 1.67 seconds per cycle: mostly held up and motionless
  (~40% of the cycle), a fast downward slam (~8%), a brief dwell at the bottom on impact (~10%), then a
  slower easing retreat back to the top (~42%). Whichever block is underneath when the press bottoms out
  gets squished (briefly flattened/widened) and a simple smiley face appears on top of it — give each
  block color its own consistent, distinct simple face style (for example: dot eyes vs. caret "^^" eyes
  vs. arch eyes vs. vertical-line eyes), each paired with a small curved smile.
- After being stamped, the block continues rightward, reaches the right-hand gear, scales up slightly and
  fades out ("collected"), and at that moment a small "+1" text pops up nearby and floats upward while
  fading.
- The dispenser recoils/stretches slightly (a quick squash-stretch) each time it launches a new block,
  roughly in sync with a new block appearing.
- At any given moment, 3-4 blocks should be visible on the belt at staggered positions/stages — this is a
  continuously-running line, not a single block traveling alone at a time.

If you need to prioritize: the "always-running mechanism" feel matters most — gears spinning, belt
scrolling, and the press pumping should all run independently and continuously throughout, never pausing
between blocks. The squash-and-stretch on spawn/stamp/collect moments is what sells the physicality. Exact
timing ratios matter less than the overall impression of a small machine with several parts moving at
different, overlapping rhythms.
```

---

## Prompt 3

```
Create a looping SVG/CSS animation with a 16:9 widescreen aspect ratio, styled as chunky retro-pixel art
with thick dark outlines and flat bold colors. Total loop duration: exactly 20 seconds. It should read as
a calm, top-down stylized island map with a small character journeying between locations.

Palette:
- Ocean: base blue #0284C7, shallow/foam-adjacent water #38BDF8, with a continuously shimmering, organic
  ripple/caustic texture moving across the whole water surface — it should look like gently moving real
  water, not a static or obviously-tiling texture
- Island cliffs/edges: sandy orange #F59E0B top rim, darker brown #B45309 shaded underside — give the
  islands a 2.5D "raised" look, like a beveled/extruded cutout sitting above the water, with a soft drop
  shadow
- Island tops: grass green #22C55E, with subtle darker fleck/texture detail and a few small darker dot
  "bushes" scattered on the larger islands
- Coastline outline: white foam, #FFFFFF, traced along every point where land meets water
- Path: white dashed line connecting the islands
- Hero character token: gold ring (roughly #FACC15), red/crimson core (roughly #EF4444), bright white
  center, dark outline
- Stage badges: gold fill (#FACC15) for completed stages, red fill (#EF4444, gently pulsing) for the
  current/active stage, gray/stone fill (#64748B) for upcoming stages — all with a white ring and thick
  dark outline

Layout: a top-down stylized map with 4 islands arranged in a gentle zigzag across the frame — first
island lower-left, second island upper-middle-left, third island lower-middle-right (this is the
current/active stage — give it visual emphasis), fourth island upper-right. Each island is an organic
rounded blob shape (irregular, natural-looking coastline, not a perfect circle), with a circular "stage
badge" marker at its center (thick outline, colored per the rules above, small icon dot in the very
center). Scatter a handful of small decorative mini-islets/rocks, much smaller than the 4 main islands,
in the open water between them. A white dashed line traces a path connecting the islands in sequence
(1→2→3→4), and its dashes should appear to flow/scroll continuously along the path direction at all
times, even where the character isn't currently walking.

Motion: a small circular character token walks along the dashed path, island 1 → 2 → 3 → 4, taking about
6.67 seconds per leg (three legs = 20 seconds total), then the whole loop restarts with the character back
at island 1. The character bobs gently up and down as it walks and continuously emits two soft expanding
rings (one gold, one white) that grow outward from it and fade — a slow, steady beacon pulse that runs the
entire time regardless of where the character currently is on its journey. The current-stage badge (island
3) pulses gently — a slow breathing effect in brightness/scale — and has a small red "!" notification
bubble bobbing gently beside it, both continuous throughout the loop, independent of the character's
position. Frame the whole scene with a soft vignette that darkens just the corners.

On the water loop specifically: because the water's rippling texture is meant to look organic, it's
acceptable — and often preferable — for it not to loop with mathematical precision the way the rest of the
scene does. A good approach is either a noise pattern with a controlled, exactly-repeating period, or a
short, subtle crossfade/dissolve on the water only at the loop point. Everything else in the scene —
islands, path, character, badges — should loop with zero visible seam.
```

---

## Prompt 4

```
Create a looping 2D illustrated SVG/CSS animation with a 16:9 widescreen aspect ratio, styled as chunky
retro-game pixel art, depicting a single object slowly rotating in place — built entirely from flat vector
shapes, simulating a turntable-style rotation through silhouette changes, shading shifts, and face-swapping
rather than true 3D rendering. Total loop duration: exactly 2π seconds (~6.28 seconds) — one full rotation.

Palette:
- Background: solid cyan-blue #0284C7, with a faint, barely-visible 24×24 grid overlay
- Object shell: gold/tan plastic — #F59E0B base, #FCD34D for lit/highlighted faces, #B45309 for
  shadowed/underside faces
- Front label sticker: dark near-black #1A1F2E, with a small pixel-art alien/space-invader icon centered
  on it (an 8×8-grid symmetric alien face, cyan #38BDF8 body with two red #EF4444 "eye" pixels — classic
  Space Invaders style)
- Back panel: same dark plastic, with "MADE IN ROMANIA" in small blocky segment-style lettering, subtly
  embossed/shadowed rather than flat-printed
- Accent white #FFFFFF for rim-light glare streaks and a soft outer silhouette glow

The object: a chunky, wide, moderately flat rectangular game-cartridge shape (think a classic console game
cartridge), with a small lip/base extension along its bottom edge and two small notches cut into its top
edge. It floats centered in frame, bobbing gently up and down, and rotates continuously around its
vertical axis at a steady constant speed — exactly one full rotation per loop. Frame it from a fixed,
slightly downward-looking angle rather than dead-level.

As it rotates through the loop:
- At the start, its front face — the dark sticker bearing the alien icon — faces the viewer.
- After a quarter turn, a side edge (lit gold or shadowed brown, depending on the lighting side) faces the
  viewer.
- After a half turn, the back face — bearing "MADE IN ROMANIA" — faces the viewer.
- After three-quarters, the opposite side edge faces the viewer, completing the rotation back to the
  front.
- A soft white glare/highlight streak sweeps diagonally across whichever face is visible, intermittently,
  as if catching light during the turn.
- A thin, soft white glow traces the object's outer silhouette throughout.

In the background, running independently of the object's rotation:
- Small square particles drift slowly across the frame at a steady 45-degree diagonal, wrapping around
  the frame edges when they exit (reappearing on the opposite side) rather than bouncing back.
- A single wavy dashed white line undulates gently side to side, like a slow sine wave, roughly through
  the middle of the frame, with its dashes continuously scrolling along its own length.
- A soft vignette darkens the four corners of the frame.

If you need to prioritize: the steady, constant-speed rotation completing exactly one turn per loop, and
the front-alien / back-text distinction as the animation's two clearest "reveal" moments, matter most. The
gold/tan plastic-cartridge color identity should stay consistent and recognizable throughout the rotation.
```
