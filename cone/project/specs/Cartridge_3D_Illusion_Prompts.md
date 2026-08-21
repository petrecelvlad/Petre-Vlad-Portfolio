---
type: Spec
title: Cartridge 3D-Illusion Prompts
description: Three standalone, copy-paste-ready prompts for commissioning original SVG/CSS "realistic-shaped" game-cartridge animations from external models — each explores a different technique for faking 3D/depth, deliberately left open enough for creative variation across models.
tags: [spec, hero, svg, prompts, cartridge]
timestamp: 2026-08-21T00:00:00Z
---

# Cartridge 3D-Illusion Prompts

Three ready-to-paste prompts, each exploring a different way to fake a believable 3D/2.5D
presence for a game cartridge without a true perspective rotation (see
`cone/project/roadmap/board/T-026-shader-to-svg-conversions.md` for why: CSS/SVG can't do correct
perspective and face-occlusion the way the site's original raymarched WebGL shader does, and this
project's actual Cartridge card deliberately stayed front-facing with a scaleX wobble instead of
attempting one). These are a separate exploration, not a replacement for that shipped asset —
intended to be handed to different external models to see what each produces, then compared.

Each prompt is complete on its own — copy just the text inside its box and hand it to a model with
nothing else added. They deliberately avoid exact colors, exact timing, or an exact alien design so
different models (and different prompts) can land on genuinely different results rather than
converging on the same image. "Realistic" here means the cartridge's *shape* should read as a
believable physical object with real proportions and thickness — not photoreal materials, and not
a departure from a chunky retro-game visual language.

**Revised after a first round of results:** early outputs skewed too square (more like a cassette
than an NES cartridge) and spent too much surface detail on manufacturer text/icons instead of the
alien itself. All three prompts now explicitly call for a wide, horizontally-elongated NES-style
silhouette, explicitly forbid manufacturer/back-panel text and other small decorative details, and
push much harder on the alien being large, centered, and correctly-shaped as the one thing that
matters most — plus stronger, more insistent language on each prompt's specific depth technique so
the 3D illusion reads as obvious rather than a subtle afterthought.

---

## Prompt 1 — Idle Turntable Wobble

```
Create a looping SVG/CSS animation with a 16:9 aspect ratio, depicting a single retro video-game
cartridge floating in place, viewed mostly face-on. Get the cartridge's proportions right: it
should be noticeably wider than it is tall, like a classic NES cartridge — a wide, horizontally
elongated rectangular shell, not a square or near-square block. The shape should read as a
believable physical object with real thickness and depth cues (a visible side edge, a subtly
raised or recessed label panel on the front, maybe a small grip ridge or connector notch along one
edge).

The single most important visual element is a blocky pixel-art alien creature on the front label,
in the spirit of a classic arcade "space invader"/Galaxian-style enemy sprite. Render it large,
centered, and unmistakably correct in silhouette — a clean, symmetric, immediately recognizable
alien shape is what makes or breaks this piece, and it should dominate the label visually. Do not
add manufacturer text, back-panel text, small icons, or other decorative label details — keep
everything around the alien minimal or entirely plain so nothing competes with it for attention.
Style: a chunky retro-game aesthetic with bold outlines and a warm metallic gold/brass shell (or
another cohesive retro palette of your choosing), set against a simple, uncluttered background.

The core animation idea: the cartridge should never fully rotate or show its back — it stays facing
forward the whole time — but it needs to genuinely read as three-dimensional, not just hint at it.
Achieve this through a clear, continuous "idle turntable" wobble: the object visibly and believably
turns several degrees toward one side and back, then the other, as if it's hovering and slowly
reorienting itself, with whichever edge is turning away catching real shadow or a visible sliver of
its side surface becoming exposed — make this depth cue obvious, not subtle. Add a soft specular
highlight or glare that sweeps across the front face, plus a gentle vertical float/bob. The loop
should feel calm and continuous with no jarring reset; pick whatever exact timing feels natural as
long as it loops seamlessly.
```

---

## Prompt 2 — Museum-Case Lighting

```
Create a looping SVG/CSS animation with a 16:9 aspect ratio, depicting a single retro video-game
cartridge presented like a prized object on display. Get the cartridge's proportions right: it
should be noticeably wider than it is tall, like a classic NES cartridge — a wide, horizontally
elongated rectangular shell, not a square or near-square block. Draw the cartridge itself as a
single static illustration in a fixed three-quarter (oblique/isometric-ish) perspective — showing
the front face plus a hint of one side and the top edge in one drawn view — so its shape reads as
convincingly three-dimensional and physically real without any part of the object itself moving or
rotating during the loop. Make the depth genuinely convincing: real visible thickness, a properly
foreshortened side face, and consistent shading between the faces.

The single most important visual element is a blocky pixel-art alien creature on the front label,
in the spirit of a classic arcade "space invader"/Galaxian-style enemy. Render it large, centered,
and unmistakably correct in silhouette — a clean, symmetric, immediately recognizable alien shape is
what makes or breaks this piece, and it should dominate the label visually. Do not add manufacturer
text, back-panel text, small icons, or other decorative label details — keep everything around the
alien minimal or entirely plain so nothing competes with it for attention. Style: chunky retro-game
aesthetic, warm metallic gold/brass shell (or another cohesive retro palette of your choosing).

The core animation idea: the object itself stays completely still — all the motion lives in the
light and atmosphere around it, like a museum display case. Animate a soft specular highlight or
rim-light that slowly travels around the cartridge's visible edges as if a light source were
orbiting it — make sure this light genuinely traces the object's 3D form (the side face and top
edge should catch and lose the light differently than the front face does), rather than just
sliding over a flat shape. Add a subtle ambient glow or pedestal light beneath/behind the object
that gently pulses or breathes, plus a small amount of atmospheric life moving independently of the
object — drifting dust motes, soft floating particles, or a faint scanning light band. The overall
feeling should be calm and reverent, like the cartridge is a valuable artifact being spotlighted
rather than an active machine. Loop it seamlessly at whatever pace feels right.
```

---

## Prompt 3 — Layered Parallax Depth

```
Create a looping SVG/CSS animation with a 16:9 aspect ratio, depicting a single retro video-game
cartridge, viewed face-on. Get the cartridge's proportions right: it should be noticeably wider than
it is tall, like a classic NES cartridge — a wide, horizontally elongated rectangular shell, not a
square or near-square block. The shape should read as a real, chunky physical object with correct
thickness and a bit of visible edge/side detail, not a flat sticker.

The single most important visual element is a blocky pixel-art alien creature on the front label,
in the spirit of a classic arcade "space invader"/Galaxian-style enemy sprite. Render it large,
centered, and unmistakably correct in silhouette — a clean, symmetric, immediately recognizable
alien shape is what makes or breaks this piece, and it should dominate the label visually. Do not
add manufacturer text, back-panel text, small icons, or other decorative label details — keep
everything around the alien minimal or entirely plain so nothing competes with it for attention.
Style: chunky retro-game aesthetic with bold dark outlines and a warm metallic gold/brass shell (or
another cohesive retro palette of your choosing), set against a simple background.

The core animation idea: build a genuinely convincing illusion of depth using layered "parallax"
motion instead of any rotation or lighting trick. Construct the scene from a small number of flat
depth layers — for example, a background/shadow layer furthest back, the cartridge body in the
middle, and a subtle glass-like reflection or highlight layer floating just in front of the label —
and give each layer its own slow, independent drift or sway, with layers meant to feel "closer"
moving noticeably more than layers meant to feel "further away." Make the difference in motion
between layers pronounced enough that the depth separation is unmistakable, not a subtle detail
someone could miss. The motion can be as simple as a slow side-to-side or figure-eight drift
repeated continuously. Loop it seamlessly at whatever pace feels natural.
```
