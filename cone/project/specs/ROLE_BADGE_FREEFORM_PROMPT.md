---
type: Spec
title: "Standalone prompt: freeform role-badge shape"
description: >
  A self-contained prompt, meant to be copy-pasted as-is into an unrelated tool/agent that has no
  access to this project. Asks for an original UI element shape (not a prescribed plaque outline)
  to hold a "ROLE" / "Game Producer" label pair, keeping only the flat-vector shading style, not
  the shape or color. Went through two rounds already: the first came back too ornate/detailed for
  a UI chip sitting alongside several other competing elements; the follow-up correction swung too
  far the other way and came back too plain. This version aims for the middle — some real character
  and motif detail allowed, but capped before it turns into a full illustration.
tags: [spec, brief, standalone-prompt]
timestamp: 2026-08-19T00:00:00Z
---

# Standalone prompt (copy everything below this line)

---

Design and build an SVG illustration of a UI badge/plaque element for a game industry portfolio
website. It sits under a person's name and holds their professional title, displayed as two lines
of text:

- A small label word: **"ROLE"**
- A larger value line beneath or beside it: **"Game Producer"**

## Shape — your choice, but simple, not illustrated

Do not use a plain rectangle, or a plain rounded rectangle — that's the one thing this shouldn't
be. Beyond that, the shape is entirely up to you. But this sits alongside several other UI elements
on a busy screen, so it needs to stay quiet and simple, not become the loudest thing on the page.
Think "one bold, chunky icon-like silhouette," like a single flat sticker or a mobile game's level
badge — not a detailed illustration.

It's fine (encouraged, even) to let the "Game Producer" role loosely inspire the outline — a
clapperboard, a badge/medal, a name tag, a shield, a game cartridge, a director's-chair tag — reduce
it to its most recognizable silhouette and one or two supporting details at most (e.g. a medal's
single ribbon notch, a clapperboard's one hinge line) — not a fully rendered drawing of the object.
The motif should still read at a glance, the way a simplified icon does, not a detailed illustration
with lots of internal linework.

**Guardrails, so this stays legible and calm without going flat/boring:**
- **One silhouette, at most two or three merged parts** (e.g. a main body plus a tag/tab, plus
  maybe one small accent shape) — avoid clusters of many small shapes or busy scalloped/multi-notch
  edges, but a handful of distinct edges/corners per side is fine if they read as one deliberate
  shape.
- **At most one or two small internal details**, if they genuinely support the motif (one accent
  shape, one simple icon mark, one texture line) — beyond that, it starts competing with the text
  and the rest of the page. The bar: does this detail make the shape more recognizable, or is it
  just decoration? Keep the former, cut the latter.
- You should be able to describe the shape in two short sentences — the main silhouette, then
  what (if anything) sits on/in it. If it takes a paragraph to describe, simplify.

## Color — your choice, but restrained

Pick your own flat color palette, but keep it modest: **three to five flat colors total, including
the outline and any shading bands.** It should feel like polished, confident mobile/casual game UI —
saturated, punchy — but restrained enough that it doesn't fight with everything else on the page for
attention. A main color plus a few supporting/accent tones (highlight, shadow, one or two accents)
reads as "part of a system"; six or more distinct colors reads as "the one loud thing on the screen"
— avoid that.

## Style constraints — keep these

Whatever shape and colors you choose, render it in this specific flat-vector "game chrome" style:

- **No gradients, anywhere, no exceptions.** No linear or radial gradients, no soft blends between
  colors. Every fill is a single flat, solid color.
- **No blur.** No blurred/soft drop shadows, no glow effects, no feathered edges. Everything is
  crisp, hard-edged flat vector art.
- **Shading is done with flat color bands or a hard-edged offset, never a smooth blend.** To give
  the shape a sense of depth/embossing, use one or both of:
  - Flat highlight/shadow **bands**: a lighter strip of flat color along one edge (e.g. the top) and
    a darker strip of flat color along the opposite edge (e.g. the bottom), each a distinct solid
    color, not a fade into each other.
  - A **hard offset drop shadow**: the same silhouette, filled with a single dark flat color,
    duplicated and offset a few pixels straight down (or in one consistent direction) behind the
    main shape — a crisp "3D sticker" shadow, not a blurred one.
- **A solid outline stroke** runs around the entire silhouette (every part of it, as one continuous
  outline, not separate outlines for sub-parts that happen to overlap) in a single dark flat color.
- If your shape has more than one merged part (e.g. a main body plus a smaller tag/tab/badge holding
  the "ROLE" label), the join between the parts should look like one seamlessly molded piece — no
  visible seam, notch, or two separately-outlined shapes just touching.

## Text placement

Leave clear, well-proportioned space for both lines of text — the small "ROLE" label and the larger
"Game Producer" value — positioned so each looks intentionally placed within the shape (e.g. the
label tucked into a smaller sub-shape/tag, the value centered on the main body), not just centered
text floating over a background. The text itself doesn't need to be rendered as part of the SVG
unless your tool requires it — reserving the visual space and describing where each line goes is
enough.

## Deliverable

A single SVG (or SVG-producing output) of your designed shape, at a size proportioned to
comfortably hold both lines of text described above.
