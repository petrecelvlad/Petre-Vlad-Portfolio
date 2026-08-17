# Claude Companion

You are a Claude agent working on this project. Read this immediately after `AGENT.md`. This is your provider-specific onboarding — it makes you effective in one pass.

## Onboarding Sequence

Read in this order. Each step gives you a specific capability:

1. `AGENT.md` (already read) — Constitution: phases, guardrails, standing rules.
2. `cone/PHILOSOPHY.md` — Framework philosophy: what this system is and why it exists.
3. `cone/agent/onboarding/START_HERE.md` — Framework orientation: what to read next and why.
4. `cone/agent/onboarding/CODING_COMPANION.md` — Coding standards: naming, functions, errors, types.
5. `cone/project/architecture/OVERVIEW.md` — System architecture: what was built and why.
6. `cone/agent/personas/COMMUNICATOR.md` — Always-active communication persona. Adopt immediately.
7. `cone/agent/personas/PLANNER.md` — Always-active planning persona. Adopt immediately. Governs when work gets a board card (`cone/project/roadmap/board/`) and how it's broken down.

If you are about to write or modify code, also read:
8. `cone/agent/personas/DEVELOPER.md` — Developer persona. Adopt for all coding sessions.

---

## Session Protocol

One conversation = one session file. Sessions serve dual purpose: live tracking during work AND permanent archive after.

**Full protocol:** Read `cone/agent/onboarding/SESSIONS.md` before creating any session file.

**Quick reference:**
- **Location:** `cone/agent/sessions/MM_Month/Week_N/YYYY-MM-DD/`
- **File format:** `NN_SEMANTIC_TITLE.md` — NN is a global counter, title is 2-4 words
- **Template:** Copy `cone/agent/sessions/SESSION_TEMPLATE.md`
- **Before creating:** Check for `IN-PROGRESS` or `HANDOFF` status in recent sessions — continue from them, don't start fresh
- **Statuses:** `PLANNING` → `IN-PROGRESS` → `COMPLETE ✅` or `HANDOFF ✋`
- **Never delete** session files — they are the project's permanent history

---

## Memory Rules

### What to save (in `cone/project/memory/`)

Save if ALL are true:
- It's a behavioral correction or confirmed practice
- The WHY is non-obvious and not derivable from the code or docs
- It applies across multiple future sessions

### What NOT to save

- Implementation state, version numbers, feature status
- Anything derivable by reading the code or git history
- Session-specific context (that goes in session files)
- Solutions to bugs (the fix is in the code; the commit message has context)

### Where to save

| What | Where |
|---|---|
| A mistake with a non-obvious root cause | `cone/project/memory/ANTI_PATTERNS.md` |
| A practice confirmed to work well | `cone/project/memory/LESSONS.md` |
| A known failure mode with a fix | `cone/project/memory/PLAYBOOK.md` |

---

## OKF (Open Knowledge Format)

The `cone/` directory is an OKF v0.1 conformant knowledge bundle. This means:

- **Every markdown file** in `cone/` (except `index.md` and `log.md`) has YAML frontmatter with at least a `type` field. This replaces the old `@propolis` JSON blocks in markdown.
- **`@propolis` in code files** is unchanged — it still uses JSON in language-appropriate comments. OKF only governs the markdown knowledge bundle.
- **`index.md` files** exist at each directory level for progressive disclosure. They have no frontmatter — they're directory listings, not concept documents.
- **Cross-links** between documents use relative markdown paths (e.g., `[SESSIONS.md](./SESSIONS.md)`) so the OKF graph visualizer can detect edges.
- **Concept IDs** are derived from file paths (no explicit `id` field). `agent/personas/DEVELOPER` is the concept ID for `cone/agent/personas/DEVELOPER.md`.
- **Extension fields** (`constraints`, `agent_instructions`, `always_active`, `scope`) are cone-specific additions that OKF explicitly permits.

**Visualizer:** Run `python -m reference_agent visualize --bundle cone --out cone_viz.html --name "cone-lite"` (requires the `reference-agent` package from `GoogleCloudPlatform/knowledge-catalog`). Opens as a self-contained HTML graph in any browser. Not verified as installed/used in this project — treat as optional tooling, not a required step.

---

## Non-Obvious Pointers

- **Token contract:** `cone/project/architecture/systems/TOKEN_CONTRACT.md` — every CSS custom property, its status (DEFINED/HARDCODED/DEAD/GAP). Read before touching any visual value.
- **Skin-swap mechanism:** `src/context/SkinContext.tsx` implements the runtime swap; the mechanism itself is documented in `cone/project/architecture/systems/SKIN_SYSTEM.md`. The two live skins are `SKIN_GAMIFIED.md` (default) and `SKIN_HERITAGE.md`.
- **Timeline/scroll state:** all owned by `useTimelineOrchestrator` (`src/hooks/useTimelineOrchestrator.ts`) — Navbar and TimelineTrack both read from it, never maintain their own active-index state.
- **All content:** `src/infrastructure/data/portfolio.json`, typed via `IProject`/`IExperience` in `src/core/domain/models.ts`. Never mock data — edit the JSON.
- **Domain glossary:** project-specific terms (Managed Stage, Global Chrome vs. Content Canvas, the Envelope Rule, the Leak Test, Bento grid) are in `cone/project/architecture/PROJECT_GLOSSARY.md` — `cone/project/architecture/CONTEXT.md` is cone-lite's *own* vocabulary, not this project's.
- **Legacy docs migrated but not yet reformatted:** `cone/project/roadmap/LEGACY_ROADMAP.md`, `LEGACY_REFACTORING_BACKLOG.md`, `cone/project/archive/decisions/LEGACY_DECISIONS_LOG.md`, `cone/agent/sessions/LEGACY_LOGS.md` — single-file dumps of this project's pre-cone history, not yet split into individual cards/ADRs/sessions. Treat as historical reference, not live-format documents.

---

## Creating a Companion for Another Provider

To create `GEMINI.md`, `COPILOT.md`, or any other provider companion:

1. Copy this file's structure (Onboarding Sequence, Session Protocol, Memory Rules)
2. Adapt the onboarding sequence to the provider's capabilities
3. Adjust memory rules to match the provider's context management
4. Keep the session protocol identical — it's provider-agnostic
5. Register the new companion in `AGENT.md` under "Agent-Specific Companion Files"
