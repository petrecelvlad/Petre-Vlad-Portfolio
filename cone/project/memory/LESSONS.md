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
