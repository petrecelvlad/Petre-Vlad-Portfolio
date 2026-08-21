---
type: Session
title: "Session 05: Cursor-Driven Gaze — Broken, Handoff"
description: Attempted a cursor-follow tripod pan/tilt effect on the Hero 3D Nature Field background; failed across 4+ blind iterations with no working browser tool, ended with the background frozen. Handed off.
tags: [session, hero, threejs, bug, handoff]
timestamp: 2026-08-20T00:00:00Z
---

# Session 05: Cursor-Driven Gaze — Broken, Handoff

## Metadata

- **Date:** 2026-08-20
- **Agent:** Claude Sonnet 5 (Claude Code)
- **Goal:** Add a subtle cursor-follow "tripod pan/tilt" effect to Hero's `ThreeNatureFieldBackground` — camera position fixed, only the look direction eases toward the cursor. **Failed to deliver a working, verified result.**
- **Status:** HANDOFF ✋

---

## Read this first: why this session failed

**`mcp__claude-in-chrome__*` browser tools were unavailable the entire session** — the extension failed to
connect, and every retry attempt (`ToolSearch`, invoking the `claude-in-chrome` skill) confirmed it stayed
disabled. This is the single most important fact for the next agent: **I never once saw the actual running
page.** Every "fix" in this session was a code-reading guess, "verified" only by `tsc --noEmit` (type
correctness — proves nothing about runtime/visual behavior) and the Vite dev-server terminal log (proves the
file transforms without a *syntax* error — also proves nothing about what renders). The user had to act as
the test harness for every single iteration, reported worsening and internally-contradictory symptoms across
rounds, and by the end told me plainly to stop guessing.

**Do not repeat this pattern.** Before touching `ThreeNatureFieldBackground.tsx` again:
1. Try to get real browser access — the user can reconnect the extension via `/chrome`. If it's available
   this session, use it: navigate to `http://localhost:3000/Petre-Vlad-Portfolio/`, check the console for
   errors, take screenshots, move the (virtual) cursor and diff frames.
2. If no browser tool is available even after asking the user to reconnect, you need some other source of
   *real* evidence before changing code again — e.g., have the user paste the exact browser DevTools console
   output (not a description of what they saw), or a screen recording. The user explicitly said the next
   agent must not keep asking them open-ended questions — but getting them to paste a console error, or
   confirming the extension reconnected, is a single closed-ended ask, not a repeat of this session's
   back-and-forth guessing loop.
3. Do not change a numeric constant and ask "does it look better now?" again. That loop is exactly what
   exhausted the user's patience this session.

---

## Symptom chronology — exact, in order

This is reconstructed precisely from the conversation so the next agent doesn't have to re-derive it.

1. **Baseline (working, confirmed in an earlier session):** `ThreeNatureFieldBackground.tsx` renders a
   full-bleed Three.js scene in Hero — sky dome, ground, 12,000 instanced grass blades with a wind shader,
   8 trees, 12 clouds, 6 birds, and a camera that auto-orbits around `CAMERA_TARGET = (0, 2.5, 0)` at
   `CAMERA_RADIUS = 10`, always calling `camera.lookAt(CAMERA_TARGET)`. User confirmed this worked well
   ("yesssss it's perfect").

2. **First gaze implementation** (`CAMERA_LOOK_OFFSET = 0.45`, `CAMERA_LOOK_SMOOTHING = 2.5`): added a
   `window.addEventListener('pointermove', ...)` handler tracking normalized cursor position, smoothed each
   frame, used to offset the `lookAt` target perpendicular to the view direction via `rightVec`/`upVec`
   cross products (position untouched — this was a deliberate design choice, confirmed with the user via
   `AskUserQuestion` before implementing, to satisfy "tripod, fixed point, only gaze moves"). **Result:
   user reported zero visible movement or wobble tied to the cursor.**

3. **Diagnostic round 1** — bumped `CAMERA_LOOK_OFFSET` to `4` (≈22° max deflection) purely to test whether
   the issue was magnitude. **User reported still nothing**, and explicitly asked for a 10x bump to get a
   conclusive signal.

4. **Diagnostic round 2** — bumped `CAMERA_LOOK_OFFSET` to `40` (≈76° max deflection — the scene should
   have swung to point in a wildly different direction). **User reported still no movement at all**,
   correctly concluding the *mechanism* itself wasn't working, not just the magnitude.

5. **Diagnostic round 3 — isolating the pipeline.** Added a temporary line inside `handlePointerMove`:
   `document.title = \`DIAG x=${mouseTarget.x.toFixed(2)} y=${mouseTarget.y.toFixed(2)}\`;` — this bypasses
   Three.js/WebGL entirely and tests only "does a pointermove handler on `window` fire and compute the
   expected values." Asked the user to watch the **browser tab title** while moving the cursor.

6. **User's reply:** *"i think i finally see some movement but it's extremely subtle and jagged / laggy."*
   **This reply is ambiguous and was never disambiguated** — it's unclear whether the user was describing
   the tab title updating, or the actual 3D scene. I assumed the title-diagnostic was the "movement" being
   referenced (i.e., assumed the pointer pipeline was proven live) and moved straight to removing the
   diagnostic and re-tuning `CAMERA_LOOK_OFFSET = 0.6`, `CAMERA_LOOK_SMOOTHING = 1.6`, plus clamped the
   smoothing `delta` to `Math.min(delta, 0.1)` to avoid a stall-induced jump. **This assumption was never
   verified and may be wrong** — the next agent should treat "does the pointer pipeline actually reach the
   render loop" as still an open question, not a settled fact, despite step 5's diagnostic being
   theoretically sound.

7. **User's reply:** *"still jagged, feels laggy overall very jagged, very subtle, i cant even tell if
   movement is correlated to cursor movement."* I hypothesized general scene performance was the real
   bottleneck — 12,000 shadow-casting grass instances through a 2048×2048 `PCFSoftShadowMap` is a known
   Three.js perf trap, and a low/choppy frame rate would make ANY motion (not just the gaze) read as janky
   and mask any cursor correlation. **This was a plausible, reasoned hypothesis — not a measurement.** No
   FPS number, no profiler trace, nothing empirical backs it.

8. **Applied performance changes** (see Files Modified below): `renderer.shadowMap.type` from
   `PCFSoftShadowMap` → `PCFShadowMap`, `sunLight.shadow.mapSize` from `2048` → `1024`, and — the change
   most likely to have caused step 9 — `grassInstancedMesh.castShadow` from `true` → `false`.

9. **User's reply:** *"now there is zero movement."* This is a **new, more severe regression** — previously
   even when the gaze effect wasn't visible, the pre-existing ambient motion (auto-orbit, wind, birds,
   clouds) was presumably still running (never explicitly re-confirmed after step 8, though). Whether the
   *entire* scene is now static, or just the gaze effect still isn't landing while ambient motion continues,
   was never established — **this is the first thing the next agent must determine, with real evidence.**

10. **User told me to stop** and demanded an explanation. I disclosed the lack of browser tooling honestly
    and stopped making further code changes. User then asked for this handoff.

---

## The central unresolved contradiction

Step 4 (offset = 40, ≈76° deflection) should be **impossible to miss** if the mechanism works at all — a
static single-digit percentage of subtlety cannot explain "zero movement" at that magnitude. Yet step 5's
title diagnostic (if the user genuinely was describing the title, not the scene) suggested cursor data *was*
reaching the closure. Two things that are both true — "the code path receives correct cursor data" and "the
screen shows nothing" — cannot coexist without either (a) an actual runtime error partway through the
render call that a console would show immediately, (b) a duplicate/stale scene instance somehow being the
one actually visible (e.g. from React Strict Mode double-invoking effects, though this project's mount
pattern has worked correctly for this exact `useEffect(() => {...}, [])` shape in every prior session), or
(c) the ambiguity in step 6 meaning the pipeline was never actually proven live in the first place. **A
future agent with real browser access can resolve this in about one minute** by opening DevTools, checking
the console for errors, and confirming the tab title literally does update on cursor move — something I was
never able to do myself.

---

## Current code state (as of this handoff — untouched since step 9's report)

All in `src/components/backgrounds/ThreeNatureFieldBackground.tsx` (this file is **untracked** — never
committed, so there's no git history/diff to fall back on; the file's current content on disk is the only
record). Key pieces, by line number as of this handoff:

- **L28–35:** constants — `GRASS_COUNT = 12000`, `CAMERA_TARGET`, `CAMERA_RADIUS = 10`, `CAMERA_HEIGHT = 2.0`,
  `CAMERA_ORBIT_SPEED = 0.0524`, `WORLD_UP`, `CAMERA_LOOK_OFFSET = 0.6`, `CAMERA_LOOK_SMOOTHING = 1.6`.
- **L57–58:** `renderer.shadowMap.type = THREE.PCFShadowMap` (was `PCFSoftShadowMap`).
- **L71–73:** `sunLight.shadow.mapSize` = `1024`×`1024` (was `2048`×`2048`).
- **L178–182:** `grassInstancedMesh.castShadow = false` (was `true`) — **prime suspect for the step-9
  regression**, since it's the most recent change before "zero movement" was reported. `receiveShadow`
  still `true`.
- **L355–365:** cursor tracking — `mouseTarget`/`mouseSmooth` plain objects (not refs — fine, they live
  inside the single `useEffect` closure), `handlePointerMove` computing normalized, clamped `[-1, 1]`
  coordinates from `container.getBoundingClientRect()`, registered via `window.addEventListener`.
- **L414–441:** the render loop — position update (auto-orbit, untouched by cursor) at L416–421, then the
  gaze calc at L423–441: exponential smoothing of `mouseSmooth` toward `mouseTarget`, then
  `forwardVec`/`rightVec`/`upVec` cross-products to build a perpendicular basis, then
  `lookTargetVec = CAMERA_TARGET + rightVec * mouseSmooth.x * OFFSET + upVec * mouseSmooth.y * OFFSET`,
  then `camera.lookAt(lookTargetVec)` (replacing the original `camera.lookAt(CAMERA_TARGET)`).
- **L450:** cleanup removes the `pointermove` listener correctly.

The diagnostic `document.title` line from step 5 **was already removed** — it is not still in the file
overwriting the tab title. Do not spend time looking for it.

---

## Recommended first steps for the next agent

1. **Get real browser access first.** Ask the user once to confirm/retry `/chrome`, or otherwise obtain
   direct evidence (console output, screenshot). Do not edit the file again before this.
2. **Check for a literal JS runtime error** in the console — the most likely single explanation for
   "zero movement" appearing right after a code change, even though `tsc`/Vite showed nothing (those never
   catch runtime-only errors, e.g. a `NaN` propagating through `camera.lookAt()` or a disposed-object
   access).
3. **Isolate ambient-motion-vs-gaze** as two separate questions: is the auto-orbit/wind/birds/clouds motion
   still running at all right now? That determines whether this is a total render freeze (severe, likely a
   thrown error) or the gaze specifically still not correlating while everything else moves fine (the
   original, narrower bug).
4. Consider whether `grassInstancedMesh.castShadow = false` (L181) is implicated, and whether reverting
   just that one line changes anything — but confirm with evidence, don't revert blindly on a hunch either.
5. Only after root cause is confirmed with real evidence, re-tune `CAMERA_LOOK_OFFSET`/`CAMERA_LOOK_SMOOTHING`
   for the "super subtle, not distracting" feel the user originally asked for.

---

## Decisions

- **Tripod semantics confirmed with the user via `AskUserQuestion` before implementation:** camera
  `position` must never move; only the `lookAt` target should shift toward the cursor. This is still the
  correct design intent — do not relitigate it, just get it actually working.
- **Skills/Projects sections keep `WoodBackground` directly** (from an earlier task this same session, see
  below) — unrelated to the gaze bug, already verified working, not in scope for T-025.

---

## Files Modified

*(Earlier in this same session — an unrelated, completed, verified task: removing the Hero background
picker dropdown and all non-3D-nature background variants. This part is done and NOT part of the handoff.)*

- `src/context/SkinContext.tsx` — removed `BACKGROUNDS`/`BackgroundId`/`background`/`setBackground`
- `src/adapters/primary/components/Navbar.tsx` — removed the Background `<select>` dropdown
- `src/adapters/primary/components/Hero.tsx` — renders `ThreeNatureFieldBackground` directly, removed
  `isSegmented`-gated layers
- `src/adapters/primary/components/SkillTree.tsx`, `src/components/timeline/ProjectStage.tsx` — render
  `WoodBackground` directly (previously always the `GlobalBackground` fallback for non-hero sections)
- Deleted: `GlobalBackground.tsx`, the whole `strategies/` directory, `SegmentedGalaxianBackground(.tsx/
  Lite/Looped)`, `GalaxianBackground.tsx`, `CloudColumnBackground.tsx`, `CorridorShaderBackground.tsx`,
  `GameBoyShaderBackground.tsx`, `segmentedDivider.ts`
- Kept: `webgl.ts` (still used by the unrelated `AchievementLiveShaders.tsx` achievement-card shader system)

*(This session's actual subject — the broken part, see T-025 for tracking:)*

- `src/components/backgrounds/ThreeNatureFieldBackground.tsx` — added cursor-driven gaze (not working as
  intended); changed shadow map type, shadow map resolution, and grass shadow-casting as a performance
  hypothesis (unverified, possibly the direct cause of the "zero movement" regression). Exact current state
  documented above — read the file directly, it's the source of truth, this summary is not a substitute.

---

## Handoff

### What was completed this session
- Removed the Hero background picker dropdown and all non-3D-nature-field background code (verified working
  — `tsc --noEmit` clean, `npm run build` clean, dev server HMR clean, no leftover references).
- Attempted the cursor-driven gaze feature — **not completed, not verified, currently in a worse state
  ("zero movement") than before this session's gaze work began.**

### Remaining work for next agent
- [ ] See board card [T-025](../../../../project/roadmap/board/T-025-cursor-gaze-broken-handoff.md) — full
      acceptance criteria there. Get real browser evidence before any further code changes.

### Context the next agent needs
- **Key decisions made:** see Decisions above — tripod semantics (position fixed, gaze only) already agreed
  with the user, don't re-ask.
- **Relevant files:** `src/components/backgrounds/ThreeNatureFieldBackground.tsx` (the whole file — it's
  ~470 lines, read it in full, don't assume this summary captures every detail).
- **Blockers / watch-outs:** no working browser tool this session — confirm one is available before
  touching code again. The user is frustrated from a long blind guess-and-check loop; do not repeat that
  pattern by proposing another untested numeric tweak.

---

*Last updated: 2026-08-20*
