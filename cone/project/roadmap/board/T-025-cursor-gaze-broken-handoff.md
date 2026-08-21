---
type: Task
title: "T-025: Cursor-driven gaze on Hero's 3D Nature Field — broken, needs an agent with real browser access"
description: "Cursor-follow 'tripod pan/tilt' camera effect added to ThreeNatureFieldBackground.tsx never worked — a prior agent iterated blind (no working browser tool) through 4+ rounds of guesses and made it worse, ending with the whole background frozen. Needs verification-first debugging, not more guessing."
status: done
priority: high
tags: [roadmap, task, hero, threejs, bug]
timestamp: 2026-08-20T00:00:00Z
---

# T-025: Cursor-driven gaze on Hero's 3D Nature Field — root cause found and fixed

## Context

Follow-up to the Three.js Nature Field background (see session
[08_August/Week_3/2026-08-20/05_CURSOR_GAZE_HANDOFF.md](../../../agent/sessions/08_August/Week_3/2026-08-20/05_CURSOR_GAZE_HANDOFF.md)
for the full blow-by-blow). The user asked for a subtle "tripod pan/tilt" effect: the camera position must
never move, but the look direction should ease toward the cursor, like panning/tilting a camera mounted on a
fixed tripod head.

A prior agent implemented this in `src/components/backgrounds/ThreeNatureFieldBackground.tsx` but **could
not verify it worked**, because `mcp__claude-in-chrome__*` tools were unavailable all session (the extension
failed to connect). Every round of "fix" was a code-reading guess, verified only by `tsc --noEmit` (type
correctness) and the Vite dev-server HMR log (confirms the file transforms without a *syntax* error — proves
nothing about runtime behavior or visual output). The user had to be the eyes for every iteration, reported
worsening/contradictory symptoms, and it ended with **the whole background frozen** — not just the gaze
effect, but possibly the pre-existing ambient motion (auto-orbit, grass wind, birds, clouds) that was
confirmed working in earlier sessions.

**The user is out of patience for another guess-and-check round.** They explicitly asked for a handoff
instead of more of the same, and said the next agent must fix this correctly **without asking them
questions** — get real evidence yourself (working browser tools, console output, screenshots) rather than
using the user as a manual test harness.

## Acceptance Criteria

- [x] Root cause of "zero movement" identified from actual evidence — not inferred from code-reading alone
- [x] Confirm whether the pre-existing ambient motion (camera auto-orbit, grass wind shader, bird/cloud
      animation) still works — confirmed working, and confirmed *why* it kept working while the gaze didn't
      (see root cause below)
- [x] Cursor-driven gaze actually visibly correlates with cursor movement, confirmed by the user live
- [x] Effect reads as "subtle" per the original ask
- [x] `tsc --noEmit` and `npm run build` clean

## Sub-Tasks

<!-- none — this is a leaf card, but do not skip Phase 1 (Orient) given how much churn already happened here -->

## Root Cause (session 06, resolved)

`ThreeNatureFieldBackground.tsx`'s render loop called `clock.getElapsedTime()` then `clock.getDelta()`
back-to-back every frame. Three.js's `Clock.getElapsedTime()` calls `getDelta()` internally (see
`node_modules/three/src/core/Clock.js`), consuming the real ~16ms frame delta and resetting the clock's
internal timestamp — so the very next line's `clock.getDelta()` call only ever measured the sub-millisecond
gap between the two synchronous calls. `delta` was effectively always ≈0. This silently starved every
`delta`-driven effect (the cursor-gaze smoothing *and* the camera's own auto-orbit) while every `time`-driven
effect (wind shader, bird motion) stayed correct — which is exactly why ambient motion looked fine while the
gaze (and, unnoticed, the orbit itself) were nearly frozen. Fix: call `getDelta()` once per frame and read
`clock.elapsedTime` (the public property `getDelta()` already accumulates) instead of calling
`getElapsedTime()` separately.

Found via an on-screen diagnostic HUD (temporary, added and then removed within `ThreeNatureFieldBackground.tsx`)
that put live `pointermove`/`mousemove` counts, computed cursor targets, and camera quaternion values directly
in front of the user — sidestepping the ambiguity that sank the tab-title diagnostic in session 05. Full
5-phase investigation plan and the three parallel static-analysis passes that preceded it (all of which
correctly concluded "nothing wrong in the code that's visible without runtime evidence" — true, since the bug
was a Three.js API misuse only visible via actual numbers) are in session 06.

Follow-on refinements requested and applied in the same session: gaze restricted to vertical-only (horizontal
cursor movement no longer competes with the orbit's horizontal sweep), orbit slowed to 1/4 of its original
speed and reversed direction, sun light repositioned to follow the camera (behind/above/side offset,
recomputed every frame) instead of staying fixed in world space so grass/trees don't get backlit as the orbit
turns, and a grass-instancing double-transform bug fixed (the `InstancedMesh`'s per-instance matrix was baking
the same position/scale/rotation that the custom wind-shader attributes already applied, doubling the offset
for outer blades and pushing them past the ground disc's edge — read as "levitating" blades at the horizon).

## Notes

**2026-08-20 (session 06) — still blocked.** Retried `/chrome` per session 05's recommended first step;
confirmed still failing (environment-level, user could not get it to reconnect either). Did a full static
audit of `ThreeNatureFieldBackground.tsx` and its mount chain instead of guessing at code changes — ruled out
StrictMode double-mount, WebGL-context exhaustion (only one WebGL context exists under default settings),
and any synchronous-throw candidate in the gaze math. Found no bug visible from code-reading alone; see
[session 06](../../../agent/sessions/08_August/Week_3/2026-08-20/06_CURSOR_GAZE_STILL_BLOCKED.md) for the
full ruled-out list. **Next agent: do not retry `/chrome` again as a reflexive first step** — two sessions
straight confirmed it's broken. Get evidence another way (user-pasted console output, or another browser
automation path if one exists) before touching the code.

**2026-08-20 — created at handoff, status `blocked`.**

**Blocked by:** no agent in the prior session had working browser automation (`mcp__claude-in-chrome__*`
tools failed to connect / were disabled all session). The next agent's **first move** should be attempting
to reconnect (the user can retry via `/chrome`), or otherwise securing a real way to observe the running
page (console errors, screenshots, DOM state) — not editing `ThreeNatureFieldBackground.tsx` again until it
can verify its own changes. See the linked session file for the exact chronological symptom history, every
value that was tried, and the specific unresolved contradiction (a diagnostic proved cursor data reaches the
render loop, yet even a comically large synthetic magnitude produced no visible response) that a blind
code-reading pass could not explain.
