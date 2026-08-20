---
type: Lessons
title: Lessons Learned
description: Institutional memory — practices confirmed to work well, with context about why.
tags: [memory, lessons, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Curated knowledge only — not a session log
agent_instructions: >
  Institutional memory: practices confirmed to work well. Add entries when a practice's value
  would not be obvious to a future agent. Use the template format below.
---

# Lessons Learned

Practices that have been confirmed to work well, with context about why. Each entry captures a practice whose value would not be obvious without the explanation.

**This is curated knowledge, not a session log.** Session logs go in `cone/agent/sessions/`. Lessons are distilled from sessions into timeless entries. See also [Anti-Patterns](./ANTI_PATTERNS.md) and [Playbook](./PLAYBOOK.md).

---

## Entry Format

```markdown
### [Practice Name]
**Context:** [When and where this applies]
**Why it works:** [The non-obvious reason this practice is valuable]
```

---

<!-- Add entries below this line -->

### Pure CSS `@keyframes` (transform/opacity) decorative animation over ref+rAF-driven geometry, when the shape doesn't need to be procedurally computed
**Context:** Applies to any looping decorative background/motif animation in this project — the kind of thing `CloudColumnBackground.tsx` and `GalaxianBackground.tsx` are.
**Why it works:** A CSS `@keyframes` animation is correct from its very first paint by construction — the browser has the full animation definition before it ever renders the element, so there's no "empty until an effect runs" gap. This makes it immune to the entire mount-order-stagger class of bug documented in [Anti-Patterns](./ANTI_PATTERNS.md) ("An SVG element that starts with no geometry..."), which only affects content whose *shape itself* must be computed in JS (e.g. the divider's organic jagged curve, which genuinely can't be expressed as a fixed `@keyframes` path). Reach for `requestAnimationFrame`/imperative geometry only when the shape is actually procedural; a fixed shape that merely moves, rotates, or fades should always be CSS-only.

### Precompute a fixed pose set and hand it to native SVG SMIL `<animate values="...">`, for procedural shapes that genuinely can't be a single fixed `@keyframes` path
**Context:** The gap the entry above leaves open — a shape (like the divider's jagged edge) whose geometry must vary procedurally over time, where a rAF loop recomputing and rewriting the `d` attribute every frame turned out to be the actual cause of felt scroll lag on Hero (measured: 112 `d`-attribute writes/2s live vs. 0/2s once removed — see T-022/T-023). The fix isn't "make it static" or "keep the live rAF loop" — it's a third option.
**Why it works:** Compute N poses once (at module load, in plain code — no capture tooling needed unlike a GLSL shader), append the first pose again at the end, and hand the whole list to `<animate attributeName="d" values="pose0;pose1;...;pose0" dur="..." repeatCount="indefinite" />`. The browser's own SMIL engine owns the interpolation and repetition from then on — zero JavaScript runs per frame (confirmed by instrumenting `setAttribute` directly: 0 calls, same as a fully static path, despite genuinely visible motion). The loop closes exactly *by construction* (literally repeating pose 0) rather than by finding the underlying function's true mathematical period — which may not even exist in closed form for a hash/noise-driven shape. Bundle-size cost is smaller than it looks: repetitive numeric path-command text compresses very well (a 30-pose, 10-second loop cost ~3.7kB/~0.45kB-gzip'd on this project's main bundle, not the tens-of-KB a naive estimate would suggest).
**Caveat (found the hard way — see [Anti-Patterns](./ANTI_PATTERNS.md), "zero JS calls" entry):** this removes the *computation* cost, not necessarily the *rendering* cost. `calcMode="linear"` (the default) still makes the browser continuously interpolate and re-render the path geometry every frame for the animation's whole duration — which the user could still feel as stagger versus a fully static version, even with 0 JS calls measured. If the rendering cost itself (not just who's computing it) needs to go to zero, see the next entry instead — this technique is the right fit when *some* continuous per-frame render cost is acceptable, not when it needs to match a fully static baseline.

### Slice a procedural shape into a few independent static bands, sway each via CSS `transform` only, when the render cost itself (not just the computation) must be genuinely zero
**Context:** The actual fix for the gap the SMIL entry above leaves open. Applies whenever an animation needs to feel as cheap as a fully static baseline, continuously, not just avoid JS — e.g. Hero's divider line after both the live rAF version (112 `d`-writes/2s) and the SMIL version (0 JS writes, but still-felt stagger from continuous native interpolation) both cost more than the user wanted. See T-024.
**Why it works:** `transform` and `opacity` are the only CSS properties guaranteed to be compositor-only in every mainstream browser — animating them never triggers layout or repaint of the element's own geometry, regardless of how continuously or how often they update. So the technique is: compute the shape once (never animate `d` again, by any mechanism), slice it into a handful of independent static pieces, and animate `transform: translateX(...)` (or similar) on each piece with slightly different amplitude/duration/delay so they don't move in lockstep. This trades true point-by-point organic deformation (what the original per-point noise function did) for "a few rigid pieces swaying independently, with a visible kink where they meet" — a real fidelity loss versus the original, but the *only* option in this whole series that's genuinely as cheap as the static version while still visibly animating, because it's the only one that never touches path geometry after mount, not even once per animation cycle.
