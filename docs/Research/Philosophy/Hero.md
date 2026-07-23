# Hero Banner

The first thing a visitor sees. Current section philosophy — captured 2026-07-21, concept stage, not yet designed or built.

See `PILLARS.md` for the standing principles this traces back to. This concept is primarily Pillar 2 (Gamification) executed in service of Pillar 3 (a bespoke identity, not a borrowed genre), with Pillar 1 (the site as UI/UX proof) governing how well it has to be crafted once built.

---

## The Core Idea: A Collectible Character Card

Instead of a real photo of Vlad, the hero's primary visual is a **card-like element** — modeled on the logic of a collectible trading card (the reference point Vlad gave: a baseball card with a character and stats on it). The card contains a **stylized, gamified character version of Vlad** — not a photo, not a generic avatar — placed inside a small animated game-world scene.

This is Vlad's own way of applying Pillar 2 to himself specifically: instead of a bio photo, his identity slot in the hero becomes a game asset.

### What's on the card (decided)

- **Animated loop**: the card contains a small, looping animated scene — a miniature game world, not a static illustration. The character exists inside that world.
- **The character**: a stylized, game-character version of Vlad, positioned so it's looking at the viewer and **waving** — a welcoming, idle-animation-style gesture, the kind of thing a character does when idle in a game.
- **Top of card**: Vlad's name.
- **Bottom of card**: his "level" — mapped from years of experience, framed the way a game would frame a character level rather than as a literal "19 years" stat (though the literal number may still be the thing that maps to it — the presentation logic isn't decided, see Open below).
- **Role in the layout**: this card is the primary hero visual — the main animated element a visitor sees first, above/before anything else in the hero region.

### What's still open

- **Where the rest of the stats go.** The hero currently also shows aggregate stats (years experience, games produced, indie projects, teams led — see `identity.app`/`stats.app` in the current Bauhaus skin). Vlad's explicit note: some of these may continue to exist *outside* the card, but the full hero layout (card + surrounding stats, their relative size and position) hasn't been designed yet. Don't assume the current `stats.app` card layout is final or gets replaced wholesale — it may partially survive alongside the new character card.
- **How "level" is derived/displayed.** Years of experience is the stated source, but whether it's a literal number, a game-style level curve, a title, or something else isn't decided.
- **The mini-game world's content.** What's actually in the scene around the character (setting, props, any interactivity) is undefined beyond "a mini game world" and "he's waving at the viewer."
- **Art/production technique.** Not discussed yet, but worth flagging early given prior history: `ANTI_PATTERNS.md`'s "Cardboard-Cutout Ceiling" already found that hand-coded SVG primitives cannot reach real character/scene rendering quality (DR-005). A stylized animated character card is a harder rendering target than the isometric desk scenes that already failed this way — if this gets built, it almost certainly needs a real illustration/animation asset (AI-generated or commissioned) or an actual game-engine-style rendering approach, not hand-built SVG shapes. This isn't a decision yet, just a flag not to repeat a known dead end.

---

## Why this fits the pillars, specifically

- **Pillar 2 (Gamification):** this is closer to the "organizing logic, not just visual genre" reading DR-008 asks for — a stat-card-with-character is a structural/interaction idea (collectible card logic: identity + stat + visual, in a bounded frame), not just slapping game chrome onto a photo. Still needs the same execution-restraint check every gamification idea gets before it ships.
- **Pillar 3 (His style):** a bespoke, purpose-built character illustration of Vlad himself is about as far from "borrowed genre" as a visual choice can get, provided the execution avoids drifting toward an existing mascot/avatar-maker aesthetic (the "3D clay mascot" pull flagged and partially rejected in `ANTI_PATTERNS.md`'s "Borrowed Moodboard" entry — tactile warmth was the liked quality, cuteness/mascot framing was the rejected one). Worth re-reading that entry before designing the character's actual look.
- **Pillar 1 (Site as proof):** this is the single highest-visibility UI/UX craft moment on the entire site — the first animated thing a recruiter sees. It carries more weight against this pillar than any other section.
