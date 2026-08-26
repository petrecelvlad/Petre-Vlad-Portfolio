---
type: Spec
title: Retro Game Vignette Prompts
description: Three standalone, copy-paste-ready prompts for commissioning original looping SVG/CSS scenes from external models, each evoking a different classic game genre (platformer, shooting gallery, creature battle) rather than converting an existing shader.
tags: [spec, svg, prompts, exploration]
timestamp: 2026-08-22T00:00:00Z
---

# Retro Game Vignette Prompts

Three ready-to-paste prompts, each depicting a self-contained looping "stylized moment from an
actual game" rather than a UI element — a platformer level, a shooting-gallery scene, and a
creature battle. Unlike the shader-conversion prompts elsewhere in this folder, these describe
*new* scenes from scratch; there's no existing shader or asset they need to match.

Each prompt is complete on its own — copy just the text inside its box and hand it to a model
with nothing else added. None reference the franchises they're stylistically evoking by name —
each describes the genre/gameplay archetype and explicitly asks for an original character/creature
design "in the spirit of" the classics, not a copy of anything specific. This sidesteps
likeness/trademark issues and, same as the other prompt sets in this folder, leaves real room for
different models to land on genuinely different results. Colors, exact timing, and character
design are deliberately left open — only the core scene, the core loop mechanic, and the "don't
clutter it with tiny detail, keep the main subject dominant" instruction are fixed.

---

## Prompt 1 — Platformer Level Loop

```
Create a looping SVG/CSS animation with a 16:9 aspect ratio, depicting a small side-scrolling
platformer level in a chunky retro-game pixel-art style — think the first level of a classic
8-bit platform-jumping game: a bright daytime sky, a grassy/blocky ground, a few floating brick
blocks, a green pipe or two, a coin or two, maybe a small simple enemy creature. A small generic
hero character (your own design — a simple, expressive, blocky little adventurer, not a copy of
any specific existing character) runs continuously from left to right with a looping run cycle,
hopping over a gap or obstacle partway through, so it reads as a level being played live rather
than a static illustration.

The core technique: the "camera" scrolls continuously sideways while the hero runs roughly in
place relative to the frame (or the hero advances and the viewport follows — your call on which
reads better), and the background/ground/scenery must tile seamlessly so the scroll loops with no
visible seam — this is the trickiest and most important part to get right. Populate the level
with a handful of the platformer staples mentioned above, spaced out along the scrolling loop, and
feel free to add your own small touches (clouds drifting at a different, slower parallax speed
than the ground, a distant hill silhouette, a fluttering flag or goalpost) as long as the core loop
— hero running, world scrolling, seamless tile repeat — stays the clear focus. Loop it at whatever
pace and duration feels like a natural, energetic platforming rhythm.
```

---

## Prompt 2 — Shooting Gallery Duck Scene

```
Create a looping SVG/CSS animation with a 16:9 aspect ratio, depicting a light-gun shooting-
gallery arcade scene in a chunky retro-game pixel-art style — think a classic bird-hunting arcade
game viewed from a fixed side angle, standing in tall grass with trees or bushes in the
background. One or two simple, generic bird/waterfowl characters (your own design — a friendly,
blocky little bird silhouette, not a copy of any specific existing character) burst up out of the
grass in the foreground, flap upward in a rising arc across the sky, then get hit — a bright
impact flash or small burst effect — and drop back down out of frame, after which the whole cycle
restarts from the grass. Feel free to add a small flourish for the "hit" moment (a puff of
feathers, a brief starburst, a little spinning tumble on the way down) and any ambient background
life (drifting clouds, gently swaying grass or bushes) as long as the core rhythm — bird rises,
gets hit, falls, repeats — stays clear and readable.

If you'd like to include a small side character reacting to the hit (crouched in the grass,
popping up briefly to celebrate), that's a nice period-appropriate touch but entirely optional —
don't let it compete with the birds for attention. Loop it so the birds' rise-hit-fall cycle
repeats with no visible jump, staggering the two birds' timing if you use two so they don't move
in perfect unison.
```

---

## Prompt 3 — Split-Screen Creature Battle

```
Create a looping SVG/CSS animation with a 16:9 aspect ratio, depicting a stylized turn-based
creature-battle scene in a chunky retro-game pixel-art style — think a classic monster-taming
RPG's battle screen. Split the composition into two "sides": a foreground/lower-left area showing
a small original creature design of your own (friendly, blocky, a bit cute or a bit fierce — your
call) viewed from behind/below, standing on a simple round platform, as if it's the player's own
creature; and a background/upper-right area, slightly elevated and a bit larger, showing a second
original creature design viewed from the front, standing on its own platform, as the opposing
side. Design both creatures yourself — original silhouettes in the spirit of the genre, not copies
of any specific existing creature — and feel free to give them contrasting color
palettes/personalities so they read as two distinct combatants.

The core animation idea: both creatures idle continuously and independently — a gentle breathing
bob, an occasional blink or ear twitch, a faint glowing aura or particle sparkle around each
platform — so the scene feels alive and "waiting for a move" rather than static. Keep any UI
chrome (health bars, name plates, menu boxes) minimal or omitted entirely — the two creatures and
their idle animations are the whole point, not surrounding interface clutter. A simple environment
backdrop (sky, grass, a horizon line) is welcome but should stay subordinate to the creatures.
Loop it at a calm, ambient pace with no jarring reset.
```
