---
type: Session
title: "Session 02: Framework Adoption, Code Quality Pass, Segmented-BG SVG Handoff"
description: >
  Brought pinecone into the project and customized it, ran a code-quality/unify pass on
  src/, and diagnosed the Hero background shader performance problem. Ends in HANDOFF for
  converting the surviving segmented-background variant to SVG/CSS.
tags: [session, handoff, performance, shaders]
timestamp: 2026-08-16T00:00:00Z
---

# Session 02: Framework Adoption, Code Quality Pass, Segmented-BG SVG Handoff

## Metadata

- **Date:** 2026-08-16
- **Agent:** Claude Sonnet 5
- **Goal:** Adopt the pinecone/cone-lite framework into this project, customize it with real project content, run a code-quality + duplication pass on `src/`, and diagnose why the Hero background animations load slowly on weaker hardware.
- **Status:** HANDOFF ✋

---

## Tasks

- [x] Bring pinecone's `AGENT.md`, `CLAUDE.md`, `cone/` into the repo verbatim (commit `e72418f`)
- [x] Migrate `docs/` content into `cone/project/` (copy, not move — `docs/` untouched)
- [x] Investigate and redact business-sensitive content accidentally duplicated into `cone/project/reference/hive-uds/` (pricing/commercial content from an unrelated project) — replaced with a genericized methodology reference
- [x] Customize `AGENT.md`/`CLAUDE.md`/`GUARDRAILS.md`/`operations/*` with this project's real stack, constraints, and navigation pointers
- [x] Remove framework-contributor-only content (`cone/evolution/`, 3 skills, `PERSONA_CREATOR.md`) not relevant to a consumer project
- [x] Run the Code Quality persona audit against all of `src/` (97 files) — see report, not reproduced here
- [x] Run the Unifier persona/`unify` skill judgment on the audit's 5 duplicate-code findings — 2 cleared the Rule-of-Three gate
- [x] Implement the 2 "proceed" consolidations: shared `src/components/backgrounds/webgl.ts`, precomputed link paths in `SkillTreeConnections.tsx` (commit pending, uncommitted)
- [x] Fix all 10 `any` types found across `src/` with real types (uncommitted)
- [x] Delete confirmed-dead code: `SkillTreeBannerPlank` — **not done, was offered, user hasn't confirmed yet** — see Discoveries; `src/components/bento/factory/BentoWidgetFactory.ts` — deleted, confirmed zero callers
- [x] Diagnose Hero background-shader load-time performance (see Discoveries)
- [x] Analyze SVG-convertibility of the segmented-background variants (see Discoveries) and get a decision from the user: **keep only the galaxian variant (u_variant == 4), remove the other 4**
- [ ] **Convert the surviving galaxian variant to SVG/CSS — HANDOFF, see below**

---

## Decisions

- **Pinecone bring-in via plain copy, not subtree/submodule:** pinecone's own `APPLY_TO_EXISTING.md` recommends this; each consuming project gets an independently-customized instance.
- **`cone/project/reference/hive-uds/` word-for-word copy was wrong and got replaced:** the intent was to extract universal methodology, not duplicate a different project's spec verbatim (it contained that project's actual pricing/revenue-model content). Replaced with `cone/project/architecture/systems/PARAMETRIC_DESIGN_METHODOLOGY.md` — genericized, no business content, points to the existing `DR-009` decision that already reconciled this project's design system against the same methodology.
- **Removed `cone/evolution/` and 3 framework-contributor skills** (`evolution`, `project-identity`, `skill-creator`) plus `PERSONA_CREATOR.md`: this project is a pinecone *consumer*, not a contributor — that tooling has no application here and risks steering a future agent toward framework-development thinking on a portfolio bug.
- **Unifier gate enforced strictly:** only 2 of 5 duplicate-code findings (WebGL shader boilerplate at 7 occurrences, `SkillTreeConnections.tsx` path-string repetition at 4 occurrences) cleared the Rule-of-Three gate. The other 3 (`SkinRegistry.ts` slots, banner-plaque twins, `SkillDetailsPanel.tsx` motion props) were explicitly left alone at 2 occurrences each, per the persona's own discipline — not a partial/hedged consolidation.
- **Background-variant decision (this session's final user decision):** of the segmented-background's 5 shader variants (arcade/toyfactory/lightning/overworld/galaxian), keep **only galaxian** (`u_variant == 4`). Convert it to SVG/CSS. Delete the other 4 variants' shader code entirely rather than leaving them dead/unused in the GLSL source.
- **CSS vs SVG split, recommended to the user and agreed:** plain CSS for gradients/repeating patterns (cheapest, zero DOM overhead); SVG for vector shapes (sparkles) and the animated divider path. Not a new pattern — `GalaxianBackground.tsx` (column 3 of the galaxian variant) is already SVG-based.

---

## Discoveries

- **Root performance cause of the 15+s-then-3-5s Hero load stall:** `Hero.tsx` unconditionally mounts **5 separate WebGL contexts/shader compiles on first render** — the segmented3 background (1 program, but with all 5 variants' full logic branched inside it via `if (u_variant == N)`) plus 4 independent `AchievementShaderCanvas` instances (cartridge/levelup/factory/teamslead), all within the same tick (`Hero.tsx:106-108,211`). Shader compilation is synchronous and CPU/driver-bound; this stacks into multi-second stalls on weak/integrated GPUs. The first-load-vs-reload speed difference (15+s vs 3-5s) is consistent with OS/GPU-driver-level shader binary caching (e.g. ANGLE's disk cache on Chrome/Windows) — strong corroborating evidence for this diagnosis, not just a guess.
- **Switching the segmented-background dropdown does NOT trigger any load or recompile** — all 5 variants are already compiled into the one program at mount time; the dropdown only updates a `u_variant` uniform (`gl.uniform1i`). This means removing 4 of the 5 variants won't change *when* the shader compiles, but will make the *one remaining* program smaller/simpler to compile (real, if modest, win) and — more importantly — removes ~180 lines of genuinely dead-at-runtime branches from the bundle and the compile.
- **Dead code inside the fragment shader itself:** `draw3DPedestal()` (`Segmented3ShaderBackground.tsx`, roughly lines 40-170, ~130 lines — tiered cylinders, gear rotation, AO shadows, rim bevels) is defined but **never called** anywhere in `main()`. A code comment nearby says it was replaced by a Three.js version elsewhere. This adds real shader-compile cost for a visual that isn't even rendered. Should be deleted regardless of the variant-reduction work, ideally as part of the same pass since the next agent will already be deep in this file.
- **The galaxian variant is the *cheaper* of the two candidates to convert to SVG, not the harder one:** its column 3 (right third of the canvas) is already rendered by the pre-existing `GalaxianBackground.tsx` SVG component — the shader deliberately makes column 3 transparent (`u_variant == 4 && uv.x >= edge2` branch, `Segmented3ShaderBackground.tsx:425-431`) specifically so that SVG shows through from behind. Only columns 1 and 2 (identical to variant 0/arcade's shader code) still need converting.
- **`getWidgetComponent`/`createWidget` (former `BentoWidgetFactory.ts`) had zero callers anywhere in `src/`**, confirmed via full-tree grep before deletion — the codebase settled on a different actual mechanism (`SkinRegistry`/`resolveSlot`) for production widget wiring; the factory was built in the same commit as the widgets but never wired up.
- **`SkillTreeBannerPlank`** (in `src/adapters/primary/components/skilltree/SkillTreeBanner.tsx`) is also confirmed dead (zero importers) — flagged to the user, not yet actioned as of this session's end.
- **`package.json`/`​.env.example` carry unused AI-Studio starter scaffolding** (`@google/genai`, `express`, `dotenv`, `GEMINI_API_KEY`, `APP_URL`) — none of it is imported anywhere in `src/` or used by the actual deploy pipeline (`.github/workflows/deploy.yml`, static GitHub Pages build only). Tracked as `cone/project/roadmap/board/T-013-remove-unused-ai-studio-scaffolding.md`.

---

## Files Modified

This session touched a large number of files across two areas — grouped, not exhaustively listed (see `git status`/`git diff` for the full list):

- **`cone/` framework files** (customization pass): `AGENT.md`, `CLAUDE.md` (root), `cone/project/architecture/GUARDRAILS.md`, `cone/project/architecture/CONTEXT.md`, `cone/project/architecture/OVERVIEW.md`, `cone/project/architecture/systems/*` (~19 files, migrated + one new: `PARAMETRIC_DESIGN_METHODOLOGY.md`), `cone/project/operations/{SETUP,DEPLOYMENT,ENVIRONMENT}.md`, `cone/agent/onboarding/{PROPOLIS,START_HERE}.md`, several `index.md`/`README.md` files (dangling-link cleanup after removing `cone/evolution/`), new `cone/project/architecture/PROJECT_GLOSSARY.md`, new `cone/project/roadmap/board/T-012-sticky-note-fold-corner.md` and `T-013-remove-unused-ai-studio-scaffolding.md`. Deleted: `cone/evolution/` (entire dir), `cone/agent/skills/{evolution,project-identity,skill-creator}/`, `cone/agent/personas/PERSONA_CREATOR.md`, `cone/project/reference/hive-uds/` (replaced by the new methodology doc).
- **`src/` code** (quality/unify pass, all uncommitted as of session end):
  - New: `src/components/backgrounds/webgl.ts` (shared `createShader`/`createProgram`)
  - Edited: `GameBoyShaderBackground.tsx`, `CorridorShaderBackground.tsx`, `Segmented3ShaderBackground.tsx`, `AchievementShaderCanvas.tsx` (all 4 now import from `webgl.ts` instead of duplicating it)
  - Edited: `src/adapters/primary/components/skilltree/SkillTreeConnections.tsx` (precomputed `linksWithPath`)
  - Edited (type-safety, no `any` remaining in `src/`): `src/core/events/DomainEventBus.ts`, `src/components/bento/BentoVideoFrame.tsx`, `src/components/atoms/Button.tsx`, `src/components/atoms/Heading.tsx`
  - Deleted: `src/components/bento/factory/BentoWidgetFactory.ts` (confirmed dead)
- **Nothing in this session's `src/` or `cone/` work is committed yet** — verify with `git status` before assuming any of it is on a branch.

---

## Handoff

### What was completed this session

- Pinecone framework fully adopted, customized, and (partially) committed — see commits `e72418f`, `1cbb63e` on `Unifier`, plus the large uncommitted `cone/` customization pass described above.
- Full code-quality audit + Unifier consolidation pass on `src/`, implemented and verified (typecheck + build clean).
- All `any` types in `src/` eliminated.
- Root-caused the Hero background performance problem (see Discoveries).
- User decision locked in: **keep only the galaxian segmented-background variant, convert it to SVG/CSS, delete the other 4 variants.**

### Remaining work for next agent

- [ ] **Delete variants 0-3 from `src/components/backgrounds/Segmented3ShaderBackground.tsx`'s fragment shader** — the `if (u_variant == 0) {...} else if (u_variant == 1) {...} else if (u_variant == 2) {...} else if (u_variant == 3) {...} else { /* variant 4, galaxian */ }` chain (roughly lines 246-410) collapses to just the galaxian branch's contents. Also delete the now-fully-dead `draw3DPedestal()` function (~lines 40-170) while in this file — confirmed unused regardless of the variant decision.
- [ ] **Convert the galaxian variant's columns 1 and 2 to SVG/CSS** (column 3 stays as-is — it's already `GalaxianBackground.tsx`). Recommended split, agreed with the user:
  - **Plain CSS** for: the purple gradient wash (column 1), the orange gradient wash (column 2), the halftone dot overlay (repeating pattern), and the rotating sunburst rays (CSS `conic-gradient` or a spun radial `<g>` — either works, CSS is simplest).
  - **SVG** for: the 6 rising star sparkles in column 1 (small `<polygon>` stars, looping upward-drift CSS animation) — same star shape/motion technique the current `drawStar()` GLSL function encodes, just as vector shapes instead of an SDF.
  - **The hard part, flagged explicitly, not to be underestimated:** the jagged divider line between columns (`jaggedLine()`/`cellDrift()`/`cellTilt()`/`hash11()`, roughly lines 172-233 and the `edge1`/`edge2` computation at 240-241) is a continuously, organically morphing silhouette — multiple independent sine/cosine oscillators per segment, not a static zigzag. Two viable approaches, pick one deliberately rather than defaulting: (a) port the same math to plain JS, recompute an SVG `<path>` `d` string every `requestAnimationFrame` tick — cheap, it's one 1D silhouette not a per-pixel fill; or (b) approximate with a simpler technique (e.g. CSS `clip-path: polygon()` animated between a handful of precomputed jagged keyframes) — visually close but not a 1:1 port. Both are legitimate; (a) preserves the exact current look, (b) is less code but a deliberate visual simplification. This decision should be surfaced to the user, not made silently.
  - The thick black comic-panel-divider outline stroke is trivial once the divider path exists (an SVG `stroke`, or a `box-shadow`/border trick) — not a concern.
- [ ] **Remove the now-single-option variant selector**: once only galaxian remains, `SEGMENTED_VARIANTS` (`SkinContext.tsx:21-27`), `segmentedVariant` state/setter (`SkinContext.tsx:38-39,49,57`), and the corresponding dropdown in `Navbar.tsx` all become dead — either delete them, or leave a one-line note explaining why they're still there if there's a reason to keep the plumbing for a future 6th variant (ask the user rather than assuming).
- [ ] **Verify:** `npm run lint` (tsc) and `npm run build` clean afterward, same as every change this session was checked. Visually confirm the galaxian background still renders correctly in the browser (this is a visual change — typecheck/build passing does not confirm the SVG conversion actually looks right; a visual check is required, not optional).

### Context the next agent needs

- **Key decisions already made — don't re-litigate:** keep galaxian only (not arcade/variant 0); hybrid CSS+SVG split as described above; the divider-path approach (JS-recompute vs. approximation) is the one open technical choice left for whoever implements this, and it should go back to the user, not be silently decided.
- **Relevant files to read first:** `src/components/backgrounds/Segmented3ShaderBackground.tsx` (the file being replaced), `src/components/backgrounds/GalaxianBackground.tsx` (the existing SVG component column 3 already uses — read this for the project's existing SVG conventions/style before inventing a new one), `src/context/SkinContext.tsx` (background/variant state), `src/adapters/primary/components/Navbar.tsx` (the variant dropdown), `cone/project/architecture/systems/SKIN_SYSTEM.md` and `TOKEN_CONTRACT.md` (this background must still respect the token-only-styling guardrail, `GUARDRAILS.md` `C-003`).
- **Blockers / watch-outs:** the `Segmented3ShaderBackground` component is also used for the `pass="overlay"` render in `Hero.tsx:107` (a second, alpha-blended pass over columns 2+3 with dividers) — check both `pass="full"` and `pass="overlay"` code paths (`u_pass` uniform, lines ~433-442) when converting, not just the default pass, or the overlay layer will silently break. Also double-check whether `GlobalBackground.tsx`'s strategy registry or anything else references `Segmented3ShaderBackground` beyond `Hero.tsx` before assuming Hero is the only caller.

---

*Last updated: 2026-08-16*
