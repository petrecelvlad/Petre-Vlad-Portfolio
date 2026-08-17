---
type: Anti-Patterns
title: Anti-Patterns
description: Institutional memory — mistakes with non-obvious root causes and fixes.
tags: [memory, anti-patterns, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Curated knowledge only — not a session log
agent_instructions: >
  Institutional memory: mistakes with non-obvious root causes. Add entries when a failure's
  root cause would surprise a future agent. Use the template format below.
---

# Anti-Patterns

Mistakes that have been made, with root causes and fixes. Each entry captures a failure that would surprise a future agent or developer — if the root cause is obvious, it doesn't belong here.

**This is curated knowledge, not a session log.** Session logs go in `cone/agent/sessions/`. Anti-patterns are distilled from sessions into timeless entries. See also [Lessons](./LESSONS.md) and [Playbook](./PLAYBOOK.md).

---

## Entry Format

```markdown
### [Pattern Name]
**What happened:** [Brief description of the failure]
**Root cause:** [Why it actually failed — the non-obvious part]
**The fix:** [What to do instead]
```

---

<!-- Add entries below this line -->

### Duplicate SVG `id`s across simultaneously-mounted sibling instances
**What happened:** `SegmentedGalaxianBackground.tsx` defines `<linearGradient>`/`<pattern>` elements with hardcoded `id`s inside `<defs>`. The first draft defined all of them unconditionally, regardless of which `pass` prop the instance was rendering with. Since `Hero.tsx` mounts a `pass="full"` instance and a `pass="overlay"` instance of the same component simultaneously, both instances rendered the exact same `id`s into the same document at the same time.
**Root cause:** `url(#id)` resolution (and `getElementById`) is undefined behavior when multiple elements share an `id` — which element a reference actually resolves to isn't guaranteed, even though it may happen to "work" by coincidence of document order in one browser.
**The fix:** Gate every `<defs>` entry to the specific branch/prop value that actually uses it, so no two simultaneously-mounted instances of the same component can ever emit the same `id`. Caught in self-review before shipping — worth specifically re-checking any component with hardcoded SVG/DOM `id`s that might mount more than once on a page.

### Matching a nested SVG's viewBox to the parent's abstract viewBox units doesn't prevent skew
**What happened:** A nested `<svg>` inside `SegmentedGalaxianBackground.tsx`'s outer `<svg viewBox="0 0 1000 1000" preserveAspectRatio="none">` needed to render pixel-art content without skewing. First attempt: made the nested viewBox square (matching the parent's "1000x1000"), reasoning that equal width/height would produce a uniform scale. It didn't — the content still skewed.
**Root cause:** The outer `<svg>`'s `viewBox="0 0 1000 1000"` is an *abstract* unit space; `preserveAspectRatio="none"` stretches it non-uniformly onto whatever the outer element's *real rendered pixel* box is — and Hero is a wide landscape section, never square, and its aspect ratio changes with the viewport. A nested viewBox's aspect ratio has to match the real rendered pixel aspect ratio of the space it's filling, not any property of the parent's abstract viewBox numbers. "1000x1000 looks square" is a trap — it's square only in unit-space, not on screen.
**The fix:** Measure the actual rendered element's aspect ratio at runtime (`ResizeObserver` + `getBoundingClientRect()`, the same pattern already used in `TornPaperPanel.tsx`) and size the nested viewBox to match that real ratio. Re-derive from real pixels whenever a nested SVG needs to render undistorted content inside a `preserveAspectRatio="none"` chain — a build-time constant can't account for it since the outer container is responsive.

### An SVG element that starts with no geometry until a `useEffect` sets it causes a visible mount-order stagger
**What happened:** `SegmentedGalaxianBackground.tsx`'s animated clip/stroke `<path>` elements started with no `d` attribute; a `useEffect` computed and set it on mount. A sibling layer (`GalaxianBackground.tsx`, plain static SVG with no such dependency) painted immediately, while these paths stayed invisible for one extra paint cycle until the effect fired — visibly "popping in" a beat later, even though both were gated behind the same mount condition.
**Root cause:** `useEffect` runs *after* React's paint, not before. An element with empty geometry at the moment of that first paint is genuinely invisible until the effect's next paint — there's no way around this by changing when the component mounts, only by changing what it looks like the instant it mounts.
**The fix:** Precompute the initial geometry synchronously (a module-level constant, computed once at import time for a static case) and set it as the element's initial `d` value, so there is no frame where the geometry is empty. The imperative effect/rAF loop still takes over immediately after to animate from there — this only fixes the *first* frame, which is exactly the frame that was missing.
