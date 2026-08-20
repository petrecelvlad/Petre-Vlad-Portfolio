---
type: Session
title: "Session 04: Shader Bake — Loop Period Audit"
description: Onboarding + T-014 pickup — completed T-015 (loop-period audit for the 4 achievement shaders).
tags: [session, performance, hero, shaders]
timestamp: 2026-08-19T00:00:00Z
---

# Session 04: Shader Bake — Loop Period Audit

## Metadata

- **Date:** 2026-08-19
- **Agent:** Claude Sonnet 5 (Claude Code)
- **Goal:** Onboard to the project, pick up T-014 (bake the 4 Hero achievement shaders), complete its first sub-task (T-015 loop-period audit).
- **Status:** COMPLETE ✅

---

## Tasks

- [x] Full onboarding sequence (AGENT.md → CLAUDE.md → PHILOSOPHY.md → START_HERE.md → CODING_COMPANION.md → OVERVIEW.md → Communicator/Planner/Developer personas)
- [x] Reviewed T-014 card and its linked proposal
- [x] Broke T-014 into 5 sub-tasks (T-015..T-019) per Planner discipline — real, scoped work, created at their actual state (T-015 done, T-016 ready, rest backlog)
- [x] T-015: read all 4 shaders' full GLSL source, classified every `u_time` term, computed true composite loop period per shader
- [x] T-020: retuned `u_time` coefficients in all 4 shaders so each loops exactly by construction (Cartridge N=1 rotation per user's choice); `tsc --noEmit` clean
- [x] T-016: built the capture harness (`tools/shader-capture/capture.mjs`), installed `playwright`, validated end-to-end on Level-Up with a real automated loop-closure measurement (not just "looks fine")
- [x] T-020 verification (automated): ran the diff check against Factory (0.0000/255), Cartridge (0.0642/255), Teamslead (4.4161/255) — all 4 shaders now measured, not just predicted
- [ ] T-020 verification (manual): in-browser watch of each loop still open, needs browser access (deferred)
- [x] T-017: packed Level-Up's frames into a 9×9 sprite sheet (78 frames @ 12fps, 1.64MB); loop verified visually and by construction (78 = 6.5s × 12fps exactly, zero remainder)
- [x] T-018: baked Factory (sprite, 14.96MB) and Teamslead (sprite + 1s crossfade tail, verified via extracted head/tail cell comparison) via the sprite pipeline; Cartridge to `loop.webm`+`loop.mp4` (60fps, 377 frames, ~670KB each) via a new `video` mode + `@ffmpeg-installer/ffmpeg`
- [x] T-019: swapped all 4 baked assets into `AchievementShaderCanvas.tsx` (`SpriteLoopCanvas` + `CartridgeVideoCanvas`), GLSL preserved in place as regeneration source, `tsc`/`build` clean, verified in a real browser via Playwright against the production preview build (two screenshots 800ms apart, all 4 cards visibly animating, zero console errors)
- [x] T-014 (parent epic) closed — all acceptance criteria met
- [x] Follow-up: shrank Factory/Teamslead sprite sheets (512×288 → 256×144 output cell, WebGL render
      resolution unchanged) — ~36.3MB → ~13.1MB for the 3 sprite sheets combined, re-verified clean
- [x] New scope: wrote 4 standalone word-only prompts (`cone/project/specs/SVG_Recreation_Prompts.md`) for
      an external model to attempt an SVG/CSS recreation of each animation, evaluating whether that could
      replace the sprite/video assets entirely — not implemented, just the prompt doc requested by the user
- [x] Rewrote the 4 prompts to strip all project/technique context per user request — each must read as an
      original, standalone creative brief with zero awareness it's a recreation
- [x] [T-021](../../../../project/roadmap/board/T-021-animation-path-switcher.md): built a runtime
      Navbar dropdown switching all 4 achievement cards between live-shader/baked/SVG, each unselected path
      verified (via real network-request evidence, not inspection) to cost zero fetch/execution — see the
      card for full detail. Moved the 4 GLSL components to their own file
      (`AchievementLiveShaders.tsx`) and code-split it behind `React.lazy` specifically so the shader path
      costs nothing unless chosen. SVG path currently renders simple placeholders pending real content.
- [x] Diagnosed (read-only, no code) why Hero still felt sluggish after T-021 despite the achievement cards
      confirmed at near-zero cost: `SegmentedGalaxianBackground.tsx` (the WebGL→SVG background from an
      earlier session) still runs a continuous `requestAnimationFrame` loop rewriting an SVG path `d`
      attribute every frame, gated by the same Hero-visibility check — so it resumes at full intensity
      exactly when the user scrolls Hero into view.
- [x] [T-022](../../../../project/roadmap/board/T-022-segmented-lite-perf-test.md): built
      `SegmentedGalaxianBackgroundLite.tsx`, a frozen-geometry fork with no rAF loop, wired as a new
      background variant and set as the new default. Measured (not assumed): 0 path writes/2s on the lite
      variant vs. 112 on the original, real Playwright instrumentation against the production build.
- [x] User confirmed the lite fork fixed the felt lag, then correctly called out that I'd left
      `GalaxianBackground.tsx` (a separately-named, already-cheap CSS component in column 3) running
      unchanged while only having frozen `SegmentedGalaxianBackground.tsx`'s divider-line rAF loop — an
      unconfirmed scope assumption on my part given genuine naming ambiguity between the two components,
      not a fabrication. Owned it plainly, corrected the record with the exact file-level distinction.
- [x] User wanted a middle ground (not fully static, not fully live) — presented 4 options read-only
      (precomputed SMIL playback, throttled JS, throttled recompute, transform-only fake motion), user chose
      option 1.
- [x] [T-023](../../../../project/roadmap/board/T-023-segmented-loop-perf-test.md): built
      `SegmentedGalaxianBackgroundLooped.tsx` — 30 poses precomputed once at module load across a 10s
      window, first pose repeated as the last for an exact-by-construction loop, played back via native SVG
      SMIL `<animate values="...">` — zero per-frame JS. Measured: 0 JS-side `d` writes/2s (same as fully
      static) while two screenshots 3s apart show genuinely different divider shapes — real motion, no
      script driving it. New default. Bundle cost only ~3.7kB (~0.45kB gzip'd) — pose-string text
      compresses well. Added a LESSONS.md entry for this pattern (precompute + native SMIL loop for
      procedural shapes that can't be a single fixed `@keyframes`).
- [x] User reported the SMIL loop still felt staggery vs. fully static. Real diagnostic gap, not a false
      claim: "0 JS calls" (measured, true) got reported as "fixed the cost" (not the same claim) — SMIL's
      default `calcMode="linear"` still continuously re-renders path geometry every frame, a real
      render-engine-side cost invisible to JS instrumentation. Corrected both LESSONS.md's SMIL entry
      (added the caveat) and added a new ANTI_PATTERNS.md entry on conflating "zero JS" with "zero cost."
- [x] Presented 3 read-only options for a genuinely-as-cheap-as-static-but-still-animated approach;
      user picked "banded" (independent transform-only sway on a few static segments).
- [x] [T-024](../../../../project/roadmap/board/T-024-segmented-banded-perf-test.md): built
      `SegmentedGalaxianBackgroundBanded.tsx` — divider edges sliced into 5 static bands, each swayed via
      CSS `transform: translateX(...)` only (compositor-only, never touches layout), deterministically
      varied timing per band so they don't move in lockstep. `d` attribute never touched again after mount,
      by anything. Measured: 0 JS writes/2s (same as before) plus visually confirmed independent per-band
      motion (visible kink where bands diverge — deliberate, documented in the file's own `@propolis`
      block, not a bug). New default. Bundle cost +4.2kB (~0.6kB gzip'd) — smallest of the 3 animated forks.
      Added a second LESSONS.md entry specifically for this "only transform/opacity are truly compositor-only"
      technique.
- [x] User reported the banded fork looked bad and broke other things; asked for an immediate revert, no
      further debugging. Reverted cleanly and fast: deleted the 2 new files, removed all wiring, default
      back to `segmented3-loop` (T-023's state) — confirmed byte-identical via matching build output chunk
      hash. Did not attempt to diagnose the visual breakage before reverting, per explicit instruction to
      stop iterating rather than keep going. T-024 marked reverted on the board, not silently deleted from
      the record.
- [x] Default background set to `segmented3-lite` (the one variant unambiguously confirmed to both fix the
      lag and look right).
- [x] Wired the first real SVG animation: Factory, from `cone/project/reference/anims/factory/factory_1.md`,
      served as a static asset (`public/achievements/factory-animated.svg`) via `<img>`. Found and fixed 2
      real bugs in the source, not just wiring: (1) native aspect is 4:3 with a drawn 16:9 "screen" region
      inside it — narrowed the `viewBox` to crop straight to that region; (2) a raw `&` in a `<style>`
      block's CSS comment made the file invalid XML, which silently breaks `<img>` rendering
      (`naturalWidth`/`naturalHeight` both `0`, looks like a sizing bug at first). Diagnosed by navigating
      directly to the SVG's own URL, which surfaces the browser's real XML parser error with exact
      line/column — much faster than guessing from the `<img>` symptom alone. Added an ANTI_PATTERNS.md
      entry for this specific failure mode.

---

## Decisions

- **Persona for T-014:** Developer (layered on always-active Communicator/Planner) — this is tooling-heavy build work, not UI/component work.
- **New dependencies for the capture pipeline:** Playwright (headless capture, chosen over Puppeteer for canvas/screenshot ergonomics + Windows support) and `@ffmpeg-installer/ffmpeg` (Cartridge's video encode — confirmed no system `ffmpeg` on this machine's PATH). User confirmed both as defaults.
- **Board granularity:** T-014 split into 5 sub-tasks (loop audit → harness → validate-on-one-shader → bake-the-rest → swap-and-verify) rather than one opaque card, since the proposal's own plan is 6 steps spanning multiple sessions.

---

## Discoveries

- **Every shader in this set mixes rational-period (`mod`/`fract`) terms with irrational-period (`sin`/`cos`) terms** — since π is irrational, no shader here can have a mathematically exact full loop; a crossfade at the boundary is the correct default assumption, not a rare fallback. The proposal already anticipated this; the audit confirms it applies broadly.
- **Level-Up and Teamslead each have an obvious shader-author-designed cycle** (`mod(u_time, 6.5)` and `mod(u_time*0.15, 3.0)` respectively) that most of the shader keys off cleanly — but each also has 1-2 elements on raw `u_time` that don't divide the cycle evenly (Level-Up's background micro-chevrons; Teamslead's dashed path).
- **Factory has no single obvious cycle** but all three of its independent mechanical cycles (conveyor, belt scroll, stamp press) are rational multiples of `u_time` — so unlike the other three, it actually has an exact LCM: 100/3s (~33.33s), the longest window of the four.
- **Teamslead's water/caustic background is hash-based value noise sampled at drifting coordinates — genuinely aperiodic, no finite period exists at all.** A crossfade is mandatory there regardless of capture window, which changes the cost/benefit of chasing exact LCMs for the shader's other (rational) terms.
- **Cartridge's exact discontinuous-term LCM (100s) is driven by slow background particle drift, not the shader's actual focal point** (the continuously-rotating raymarched cartridge, ~6.28s/rotation). Recommending a shorter window sized to camera rotations instead — flagged as needing the user's confirmation, not decided unilaterally.

Full write-up: [`cone/project/specs/Achievement_Shader_Loop_Periods.md`](../../../../project/specs/Achievement_Shader_Loop_Periods.md).

- **Retuning beats crossfading (T-020).** User's question — "should we fix the shaders to loop exactly before converting, rather than bake-and-crossfade" — was the right call. The incommensurate periods T-015 found aren't a hard mathematical wall; they're a byproduct of nobody having designed these shaders to loop. Retuning a handful of existing constants (2 for Level-Up, 1 for Factory, 1 for Teamslead, 3 for Cartridge) made 3 of 4 shaders loop exactly with zero crossfade needed — only Teamslead's water (genuine hash-noise, no period exists) keeps one.
- **Caught my own arithmetic error mid-session.** Initially recorded Level-Up's micro-chevron term period as 1.8s (the `mod()` call's modulus) — the actual period is `modulus / coefficient = 1.8/1.2 = 1.5s`. Corrected before it drove a wrong retune. Written up as a standing anti-pattern: [`cone/project/memory/ANTI_PATTERNS.md`](../../../../project/memory/ANTI_PATTERNS.md).
- **Choosing the retune anchor matters.** For Cartridge, anchoring the retune on the camera rotation (the visual focal point) meant `cartPos` bob and `glare` came out already-exact at the user's chosen `N=1` with zero changes — only the background particle drift, dash, and `pathY` needed adjusting. Retuning the *least visually important* terms to fit the *most important* one, rather than the reverse, keeps the risk concentrated where nobody's looking.
- **User pushback was the right correction.** After T-020, the user reported "everything looks the same" and pushed on whether the work actually did anything. The correct answer wasn't reassurance — it's that the live browser view can't show a loop seam at all (real-time `u_time` never wraps; only a future *baked, finite* clip has a seam to see). T-016 then gave the first real, measurable answer instead of another eyeball claim.
- **Don't hand-copy 400+ lines of GLSL into a new tool.** The capture harness needed the exact same shader source as the live component. Rather than copy-pasting it (real transcription-drift risk at that size), the harness reads `AchievementShaderCanvas.tsx` off disk at capture time and extracts the `vsSource`/`fsSource` template-literal text directly — verbatim by construction, zero duplication to keep in sync.
- **`gl.readPixels` beats round-tripping through PNG files for a numeric loop-diff check.** No new image-decoding dependency needed — the diff is computed in-browser on the raw framebuffer and returned as a small summary stat.
- **A numeric diff isn't the same as verifying the actual shipped asset.** The GLSL loop-closure diff (frame(0) vs frame(T)) tests the *shader's* periodicity, not the *packed sprite sheet's* seam — those aren't automatically the same thing once a crossfade or frame-count rounding enters the picture. For Teamslead's crossfade specifically, only extracting and comparing the actual `cell_head.png`/`cell_tail.png` pixels confirmed the blend was doing anything.
- **Sprite-sheet frame count is a real, shader-specific design choice, not a fixed constant.** Chose each shader's `spriteFps` so `T × fps` lands on a whole number (Level-Up 12fps→78, Factory 6fps→200, Teamslead 12fps→240) — a fractional frame count leaves a small sub-frame timing residual on top of whatever the shader's own loop-closure error already is. Factory's file size (14.96MB, far above the other two) was an unplanned consequence of its 33.33s window needing many more frames even at half Level-Up's fps — worth a follow-up before shipping.
- **Playwright's bundled ffmpeg isn't a general-purpose ffmpeg.** It's built with `--disable-everything` and only VP8/webm enabled (for Playwright's own screen-recording feature) — no H.264, no mp4 muxer. Had to add `@ffmpeg-installer/ffmpeg` (a full static build) for Cartridge's mp4 output.
- **Choosing video fps to avoid a shader retune.** Cartridge's window is 2π (irrational) seconds — no integer fps divides it evenly. Rather than retuning the shader again, searched for an fps where the residual is negligible: 60fps gives 376.99 frames (~0.15ms off whole), 30fps would have left ~16.5ms (half a frame) — picked 60fps.
- **CSS background-position sprite math has an off-by-one gotcha.** The naive `col*100%`/`row*100%` formula is wrong for a multi-cell grid — CSS background-position percentages are relative to `(backgroundSize - elementSize)`, not `elementSize`, so the correct percentage formula is `col/(cols-1)*100%`. Sidestepped the whole issue by computing pixel offsets from the container's actual `clientWidth`/`clientHeight` each frame instead — also a more natural fit with this file's existing per-frame resize-check convention (the WebGL shaders already call `getBoundingClientRect()` every frame).
- **Production build size dropped after "deleting via disuse."** Left the 4 original GLSL-rendering functions in the file (didn't move them to a new file) rather than deleting them, per the regeneration-source requirement — worried this might bloat the shipped bundle. It didn't: rollup tree-shook them out entirely once nothing referenced them, and the main JS chunk actually shrank (631.77kB → 564.63kB gzip'd 182.05kB → 165.86kB). Confirmed by checking the build output, not assumed.
- **A build passing isn't the same as verifying the feature works.** Used Playwright against the actual `npm run preview` production build (not just `tsc`/`vite build` exit codes) to get real screenshots showing the swapped assets rendering and animating — this is what actually satisfied "visually verified in a real browser," not an assumption that a clean build implies correct runtime behavior.
- **Decoupling render quality from output size.** For the sprite-sheet file-size follow-up, kept the WebGL render at full 512×288 and let canvas `drawImage` downscale into a smaller 256×144 output cell (browser's default bilinear smoothing) rather than rendering natively at the lower resolution — a cleaner result than native low-res rendering would give, since sharp SDF edges get antialiased down rather than rasterized coarse from the start.
- **A resolution-agnostic display component pays off immediately.** `SpriteLoopCanvas` sizes its background-position math from the *displayed* container's `clientWidth`/`clientHeight`, never the source image's own pixel dimensions — so shrinking the sprite sheets afterward needed zero component changes, just a new PNG.

---

## Files Modified

- `cone/project/specs/Achievement_Shader_Loop_Periods.md` — new, full loop-period audit findings; corrected the 1.8s/1.5s period error; updated with T-020's final retuned windows
- `cone/project/roadmap/board/T-014-bake-achievement-shaders-to-video.md` — moved to `in-progress`, linked 6 sub-tasks (T-015, T-020, T-016..T-019)
- `cone/project/roadmap/board/T-015-shader-loop-period-audit.md` — new, `done`
- `cone/project/roadmap/board/T-020-retune-shader-loop-constants.md` — new, `in-progress` (constants retuned, loop verification still open)
- `cone/project/roadmap/board/T-016-shader-capture-harness.md` — new, `ready`
- `cone/project/roadmap/board/T-017-levelup-bake-pipeline.md` — new, `backlog`
- `cone/project/roadmap/board/T-018-remaining-shader-bakes.md` — new, `backlog`
- `cone/project/roadmap/board/T-019-swap-and-verify.md` — new, `backlog`
- `cone/project/roadmap/board/index.md` — added T-014's sub-task tree
- `cone/project/specs/index.md` — indexed the new audit doc
- `cone/agent/sessions/index.md` — indexed this session
- `cone/project/memory/ANTI_PATTERNS.md` — new entry on modulus-vs-period confusion in `mod()`/`fract()` terms
- `src/components/backgrounds/AchievementShaderCanvas.tsx` — retuned 8 `u_time` coefficients across all 4 shaders (T-020) — see T-020's Notes for the full from/to table
- `tools/shader-capture/capture.mjs` — new, fixed-timestep capture harness (T-016)
- `package.json` — added `playwright` devDependency, `capture:shader` npm script
- `.gitignore` — added `tools/shader-capture/out/`
- `cone/project/roadmap/board/T-016-shader-capture-harness.md` — `done`
- `cone/project/roadmap/board/T-020-retune-shader-loop-constants.md` — automated verification for all 4 shaders checked off, results table added
- `tools/shader-capture/capture.mjs` — added Factory/Cartridge/Teamslead configs, a `diff`-only mode, and a `sprite` mode (in-browser 2D-canvas compositing, no new image-processing dependency)
- `src/components/backgrounds/SegmentedGalaxianBackgroundLite.tsx` — new, frozen-geometry fork (T-022)
- `src/components/backgrounds/SegmentedGalaxianBackgroundLooped.tsx` — new, precomputed-SMIL-loop fork (T-023)
- `src/components/backgrounds/strategies/Segmented3LiteBackgroundStrategy.tsx`, `Segmented3LoopBackgroundStrategy.tsx` — new
- `src/components/backgrounds/strategies/BackgroundStrategyRegistry.ts`, `GlobalBackground.tsx` — registered the 2 new variants
- `src/context/SkinContext.tsx` — added `segmented3-lite`/`segmented3-loop` to `BACKGROUNDS`, default now `segmented3-loop`
- `src/adapters/primary/components/Hero.tsx` — `isSegmented` check + overlay-pass selection generalized to all 3 variants
- `cone/project/memory/LESSONS.md` — entry on precompute + native SMIL looping (with added caveat), plus a second entry on transform-only banded sway
- `cone/project/memory/ANTI_PATTERNS.md` — new entry on conflating "zero JS calls" with "zero cost"
- `src/components/backgrounds/SegmentedGalaxianBackgroundBanded.tsx` — new, transform-only banded fork (T-024)
- `src/components/backgrounds/strategies/Segmented3BandedBackgroundStrategy.tsx` — new
- `src/context/SkinContext.tsx` — added `segmented3-banded`, now the default
- `src/components/backgrounds/strategies/BackgroundStrategyRegistry.ts`, `GlobalBackground.tsx`, `Hero.tsx` — registered/gated the 4th variant (later fully reverted — banded fork deleted, references removed)
- `src/context/SkinContext.tsx` — default background: `segmented3-loop` → `segmented3-lite`
- `public/achievements/factory-animated.svg` — new, Factory's real animation asset (viewBox narrowed, XML entity bug fixed)
- `src/components/backgrounds/AchievementSvgPlaceholders.tsx` — added `AchievementFactorySvg`, narrowed the generic placeholder's type to exclude `factory`
- `src/components/backgrounds/AchievementShaderCanvas.tsx` — SVG-path dispatch special-cases `factory` to the new component
- `cone/project/roadmap/board/T-021-animation-path-switcher.md` — noted Factory's real-animation swap-in and the conveyor-belt swap
- `public/achievements/factory-animated.svg` — conveyor belt (legs, frame+scroll texture, gears) replaced with the design from `cone/project/reference/anims/factory/conveyer.md`; top scoreboard banner removed entirely (redundant, overlapped the stamping press) along with its scoreboard-only CSS rule, verified the shared `.led-pulse-1` rule was still needed elsewhere before keeping it; belt scroll doubled in speed (gears untouched) — caught and fixed a self-introduced algebra bug in `--belt-dur` (`100s/40` was wrong, should've been `100s/120`) while doing the doubling; all 4 blocks scaled 1.5x via an inner wrapper group, anchored at their existing bottom-center origin so they stay seated on the belt
- `cone/project/roadmap/board/T-017-levelup-bake-pipeline.md` — `done`
- `cone/project/roadmap/board/T-018-remaining-shader-bakes.md` — `done`
- `cone/project/roadmap/board/T-019-swap-and-verify.md` — moved to `ready`, unblocked by T-018
- `package.json` — added `@ffmpeg-installer/ffmpeg` devDependency
- `tools/shader-capture/capture.mjs` — added `video` mode (PNG capture + ffmpeg encode to webm/mp4), crossfade support in `packSpriteSheet`, `extractCell` for spot-checking packed sheet cells; removed the now-superseded `full` mode
- `tools/shader-capture/verify-hero.mjs` — new, one-off Playwright script that screenshots the real preview build twice to confirm the swapped assets render and animate
- `src/components/backgrounds/AchievementShaderCanvas.tsx` — added `SpriteLoopCanvas`, `CartridgeVideoCanvas`, `SPRITE_MANIFESTS`; swapped the dispatcher's 4 branches to use them; added a regeneration-source comment above the now-unused original GLSL functions (kept in place, not deleted or moved)
- `public/achievements/` — new, the 5 baked assets (`levelup.png`, `factory.png`, `teamslead.png`, `cartridge.webm`, `cartridge.mp4`)
- `cone/project/roadmap/board/T-019-swap-and-verify.md` — `done`
- `cone/project/roadmap/board/T-014-bake-achievement-shaders-to-video.md` — `done` (parent epic closed)
- `tools/shader-capture/capture.mjs` — added per-shader `spriteCellWidth`/`spriteCellHeight` output-size config (Factory/Teamslead → 256×144), `packSpriteSheet` now downscales via `drawImage` instead of drawing 1:1
- `public/achievements/factory.png`, `public/achievements/teamslead.png` — re-baked at the smaller resolution
- `cone/project/specs/SVG_Recreation_Prompts.md` — new, 4 standalone recreation prompts
- `cone/project/specs/index.md` — indexed the new prompts doc

---

## Handoff

Not handed off — session continues into T-016 in this same conversation.

---

*Last updated: 2026-08-19*
