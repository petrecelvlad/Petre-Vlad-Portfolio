---
type: Session
title: "Session 06: T-025 Cursor Gaze — Root Cause Found, Fixed, Plus Follow-On Polish"
description: Picked up T-025's handoff. Chrome reconnect still failed, so ran a 3-agent static audit (clean), then a HUD-instrumented 5-phase plan that found the real bug — a Clock.getElapsedTime()/getDelta() double-call starving all delta-driven motion. Fixed, verified live, then applied several follow-on refinements the user requested (vertical-only gaze, orbit speed/direction, camera-relative sun, a grass-instancing double-transform fix).
tags: [session, hero, threejs, bug, handoff]
timestamp: 2026-08-20T00:00:00Z
---

# Session 06: T-025 Cursor Gaze — Root Cause Found, Fixed, Plus Follow-On Polish

## Metadata

- **Date:** 2026-08-20
- **Agent:** Claude Sonnet 5 (Claude Code)
- **Goal:** Pick up [T-025](../../../../project/roadmap/board/T-025-cursor-gaze-broken-handoff.md) — user asked specifically to retry `/chrome` first, then continue debugging.
- **Status:** COMPLETE ✅ (T-025 itself; session continued past it into requested follow-on polish, also complete)

---

## Tasks

- [x] Retry the Chrome extension reconnect (`/chrome`) — user's explicit first instruction (still failed, confirmed environment-level)
- [x] Static/code-reading audit of `ThreeNatureFieldBackground.tsx` and everything that mounts it (3 parallel agents) — clean, no bug found, as expected given the real bug was a Three.js API misuse invisible to static reading
- [x] Instrumented an on-screen diagnostic HUD (temporary) per a user-approved 5-phase plan, got live evidence, found the actual root cause
- [x] Fixed the root cause, verified live by the user ("it's finally working!!!!!")
- [x] Removed all diagnostic scaffolding (HUD, copy button, extra listeners)
- [x] Applied follow-on refinements requested in the same session (see Discoveries/Files Modified)

---

## Decisions

- **Did not touch `ThreeNatureFieldBackground.tsx` for the root-cause fix without runtime evidence first.** Per the prior handoff's explicit warning against another blind guess-and-check loop, and per `AGENT.md`'s Never Guess rule, the fix only landed after a temporary on-screen HUD produced live, unambiguous numbers proving where the pipeline broke.
- **User-approved 5-phase plan (Plan Mode) before any further code changes**, after 3 parallel Explore agents' static audits all independently concluded "nothing wrong visible in the code" — the plan's premise was that the remaining unknown could only be resolved with live values, not more reading.
- **HUD used plain on-screen DOM text, not console output.** Session 05's tab-title diagnostic produced an ambiguous user report ("i think i finally see some movement") that a prior agent guessed the meaning of and got wrong. Numbers rendered directly on the page removed that ambiguity entirely.

---

## Discoveries

- **Root cause: `clock.getElapsedTime()` followed immediately by `clock.getDelta()` on the next line.** `Clock.getElapsedTime()` calls `getDelta()` internally (`node_modules/three/src/core/Clock.js:95-100`), consuming the real per-frame delta and resetting the clock's internal `oldTime`. The next line's separate `getDelta()` call then only measures the sub-millisecond gap between the two synchronous calls — `delta` was effectively always ≈0. This silently starved every `delta`-driven effect (cursor-gaze smoothing, and — previously unnoticed — the camera's own auto-orbit) while every `time`-driven effect (wind shader `uTime`, bird position/flap) stayed correct, since `time` came from the internally-correct `getElapsedTime()` call. This is exactly why ambient motion looked fine all along while the gaze (and the orbit, though nobody had specifically been watching for that) were both nearly frozen. It also resolves the "central unresolved contradiction" flagged in session 05: an extreme test offset (~76° deflection) still showed zero movement, because any magnitude times a smoothing factor of ~0 is still ~0 — the bug was never about magnitude.
  - **Fix:** call `clock.getDelta()` once per frame; read `time` off `clock.elapsedTime` (the public property `getDelta()` already accumulates into) instead of a separate `getElapsedTime()` call.
- **A second, unrelated genuine bug found and fixed while addressing user-reported "levitating" grass at the horizon**: the grass `InstancedMesh`'s per-instance matrix (`dummy.position/scale/rotation` → `setMatrixAt`) baked the *same* position/scale/rotation that a custom `onBeforeCompile` vertex shader already applied manually via `aOffset`/`aScale`/`aRotation` attributes. Confirmed via `node_modules/three`'s actual shader chunks (`begin_vertex.glsl.js`, `project_vertex.glsl.js`) that `project_vertex` applies `instanceMatrix * mvPosition` *after* the custom `begin_vertex` override already ran — so every blade's transform was applied twice. For the y-axis this was a no-op (local base vertex y=0, and 0×anything=0), but the (x,z) offset doubled, pushing outer blades (radius up to 83) out to ~166 units — well past the ground disc's 120-unit edge — so they rendered beyond any ground geometry, reading as "levitating" at the horizon while inner blades (small radius, doubling barely noticeable) looked fine. **Fix:** leave every instance matrix at identity; the custom shader attributes are now the sole source of transform.
- **Camera-relative lighting was requested and implemented as a general pattern worth remembering**: a `DirectionalLight` fixed in world space will eventually backlight/shadow-side any geometry as a camera orbits around it. Fix pattern: reposition the light every frame relative to the camera's own basis vectors (`forwardVec`/`rightVec`/`WORLD_UP`, already computed for the gaze calc) and re-target it at `camera.position`, with `sunLight.target` explicitly added to the scene (required for a `DirectionalLight.target`'s `matrixWorld` to update when moved — it's not part of the scene graph by default).

---

- **`/chrome` reconnect still fails** — user confirmed after retrying. Same failure mode as session 05: `mcp__claude-in-chrome__*` tools do not register (ToolSearch finds nothing), and the `claude-in-chrome` skill itself reports the browser connection is down. This is an environment-level issue outside the agent's control, not a retry-harder problem.
- **`tsc --noEmit` is clean** — no type errors anywhere in the project, including the modified files.
- **Ruled out via static analysis (not proof, but narrows the hypothesis space for the next agent with real tooling):**
  - **StrictMode double-mount is not the cause.** `main.tsx` does use `<StrictMode>`, so the component's single `useEffect(() => {...}, [])` does mount→cleanup→mount on first render. But the cleanup function correctly cancels the RAF, disconnects the ResizeObserver, removes the pointermove listener, disposes every geometry/material, disposes the renderer, and removes the canvas from the DOM — a clean teardown, not a leak. The second mount should produce a fresh, working scene.
  - **WebGL context exhaustion is not the cause under default settings.** Traced every canvas/WebGL consumer reachable from the page: `AnimationPathContext`'s default is `'svg'` (`src/context/AnimationPathContext.tsx:22`), which routes all 4 Hero achievement cards through `AchievementSvgPlaceholder`/`AchievementFactorySvg` (plain SVG, no canvas) — the WebGL-based `AchievementLiveShaders.tsx` only lazy-loads when a user manually switches the Navbar's animation-path selector to `'shader'`. `WoodBackground.tsx` (skill tree / project stage sections) is plain SVG too. So under default settings there is exactly **one** WebGL context on the page — Hero's Three.js scene. This theory would only become relevant if the next agent finds the user had switched `animationPath` to `'shader'`.
  - **No synchronous-throw candidate found in the render loop.** Read `ThreeNatureFieldBackground.tsx` in full (all 474 lines). The gaze math (`forwardVec`/`rightVec`/`upVec` cross products, `camera.lookAt(lookTargetVec)`) can't produce a zero-vector `.normalize()` call given the current constants (`CAMERA_TARGET.y = 2.5` vs `CAMERA_HEIGHT = 2.0` guarantees a non-degenerate `forwardVec` even at radius-adjacent angles). The `grassShader` null-check is present. Nothing else in the loop does anything that isn't a plain property assignment or Three.js API call already exercised successfully in prior sessions.
  - **The uncommitted Hero/Navbar/SkinContext diff (background-picker removal) is clean.** Diffed against HEAD — it's exactly the dropdown/state removal described as "done and verified" in session 05's handoff, nothing suspicious.
  - **Net conclusion: no bug is visible from code-reading alone.** This makes a genuine runtime-only failure (a thrown exception, a WebGL context loss event, or something environment-specific) more likely than a logic error — which is exactly the class of bug that requires live console/DOM access to find. Static analysis has likely reached its ceiling here; further code-reading without new evidence would just be re-deriving session 05's same dead end.

---

## Files Modified

- `src/components/backgrounds/ThreeNatureFieldBackground.tsx` — root cause fix (`clock.getDelta()` called once, `time` read from `clock.elapsedTime`); temporary diagnostic HUD added then fully removed; gaze restricted to vertical-only (dropped the `rightVec`-scaled horizontal term, `mouseTarget`/`mouseSmooth` simplified from `{x,y}` objects to scalar `mouseTargetY`/`mouseSmoothY`); `CAMERA_ORBIT_SPEED` changed from `0.0524` → `-0.0131` (quarter speed, reversed direction) across two user-requested halvings; sun light (`sunLight`/`sunLight.target`) repositioned every frame to follow the camera's own basis vectors instead of staying fixed in world space; grass `InstancedMesh` double-transform bug fixed (per-instance matrix left at identity, since custom shader attributes already carry position/scale/rotation) — this was the "levitating grass at the horizon" the user separately reported.
- `cone/project/roadmap/board/T-025-cursor-gaze-broken-handoff.md` — status `blocked` → `done`, acceptance criteria checked off, root cause documented.

---

## Handoff

Session complete — T-025 resolved and verified live by the user, plus the follow-on polish requests in the
same conversation are done. No open remaining work for a next agent. If this conversation continues with
further requests, keep using this same session file (per [SESSIONS.md](../../../onboarding/SESSIONS.md) rule
1 — one file per continuous conversation) rather than opening a new one.

### What was completed this session
- Retried `/chrome` (still fails, environment-level) then ran a 3-agent parallel static audit — clean, as expected.
- User-approved 5-phase plan: instrumented a temporary on-screen diagnostic HUD, got live pointer/camera values, found the actual root cause (`Clock.getElapsedTime()`/`getDelta()` double-call), fixed it, removed all diagnostic code.
- Follow-on refinements applied live in the same session: vertical-only cursor gaze, orbit slowed to 1/4 speed and reversed, sun light made camera-relative, grass-instancing double-transform bug fixed.
- Board card T-025 closed out with the full root-cause writeup.

### Context for whoever reads this later
- **Key decisions made:** Tripod semantics (position fixed, only `lookAt` target shifts) confirmed with the user in session 05. Vertical-only gaze (horizontal cursor input intentionally ignored, so it doesn't fight the orbit's own horizontal sweep) decided this session per explicit user request — don't revert without asking.
- **Relevant files:** `src/components/backgrounds/ThreeNatureFieldBackground.tsx` (still untracked in git — no commit history to diff against, current on-disk content is the only record).
- **Watch-outs for future sessions:** if any *other* delta-driven Three.js effect gets added to this file (or a similar one elsewhere in the codebase), double-check it isn't calling both `getElapsedTime()` and `getDelta()` on the same `Clock` instance per frame — this exact mistake is easy to reintroduce and silently starves motion without throwing or erroring.

---

*Last updated: 2026-08-20*
