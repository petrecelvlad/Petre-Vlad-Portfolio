---
type: Protocol
title: Session Protocol
description: Governs session file creation and lifecycle — live tracking during work, permanent archive after.
tags: [onboarding, sessions, agent]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Governs all session file creation and lifecycle
agent_instructions: >
  The session protocol. Read before creating any session file. Sessions serve dual purpose:
  live tracking during work AND permanent archive after. Never delete session files.
---

# Session Protocol

## What a Session Is

A session is a single continuous conversation between a human and an agent. One conversation = one session file. The file tracks work in real-time during the session, then becomes a permanent archive when the session ends.

Sessions serve two masters simultaneously:

1. **Live tracking** — during the session, the file is a shared workspace. Both human and agent know what's in progress, what's done, and what's blocked.
2. **Permanent archive** — after the session, the file is a historical record. Any future agent can scan past sessions to understand what was done, what decisions were made, what was left incomplete, and why.

This dual purpose is why session files are structured the way they are. The metadata and task list serve the live tracking. The decisions, discoveries, and handoff sections serve the archive.

---

## Folder Structure

Sessions are organized **Month → Week → Day → Session Files**. This creates a chronological, browsable archive that scales from weeks to years.

```
cone/agent/sessions/
├── SESSION_TEMPLATE.md                    ← Copy this for every new session
├── 03_March/
│   └── Week_4/
│       └── 2026-03-24/
│           └── 01_AUTH_REFACTOR.md
├── 04_April/
│   ├── Week_1/
│   │   ├── 2026-04-05/
│   │   │   └── 01_DATABASE_MIGRATION.md
│   │   └── 2026-04-06/
│   │       ├── 02_API_ENDPOINTS.md        ← Multiple sessions same day = next number
│   │       └── 03_BUGFIX_AUTH_TOKEN.md
│   └── Week_2/
│       └── 2026-04-11/
│           └── 04_UI_REDESIGN.md
└── 05_May/
    └── Week_1/
        └── 2026-05-04/
            ├── 05_PERFORMANCE_AUDIT.md
            └── 06_CACHING_LAYER.md
```

### Naming Rules

**Folders:**
- Month: `NN_MonthName/` — e.g., `03_March/`, `11_November/`
- Week: `Week_N/` — calculated as `ceil(day / 7)`, e.g., day 15 = `Week_3/`
- Day: `YYYY-MM-DD/` — ISO date format for unambiguous sorting

**Files:**
- Format: `NN_SEMANTIC_TITLE.md`
- `NN` is a **global session counter** — it increments across the entire project, not per day. This gives every session a unique number for easy reference ("session 14" is unambiguous).
- Title is 2-4 words in `SCREAMING_SNAKE_CASE` describing the session's focus
- The number comes from the previous session + 1. Check the most recent session file to find the current count.

**Good names:**
- `01_INITIAL_SETUP.md`
- `07_AUTH_MIDDLEWARE.md`
- `14_PERFORMANCE_AUDIT.md`
- `23_HANDOFF_DATABASE_MIGRATION.md`

**Bad names:**
- `SESSION.md` — no number, no semantic context
- `01_SESSION.md` — numbered but meaningless title
- `fix_stuff.md` — no number, vague, wrong casing

---

## How to Create a Session

### When you have a date

1. Extract month and year (e.g., June 2026)
2. Calculate week number: `ceil(day / 7)` — day 22 = Week 4
3. Navigate to or create: `sessions/06_June/Week_4/2026-06-22/`
4. Find the last session number across all folders (e.g., the most recent file is `15_CACHING_LAYER.md`)
5. Create: `16_YOUR_SESSION_TITLE.md`
6. Copy contents from `SESSION_TEMPLATE.md`
7. Fill in metadata

### When you don't have a date

1. Glob `sessions/` to find the most recent month folder
2. Find the most recent week folder inside it
3. Find the most recent day folder
4. Add your session file there with the next global number
5. If the human tells you today's date, create the correct folder path instead

### Before creating a new session

**Always check first:** scan the most recent day folder for any session file with `IN-PROGRESS` or `HANDOFF` status. If one exists:
- `IN-PROGRESS` → continue from it. Do not create a new file.
- `HANDOFF` → read the handoff section, then create a new session file that references it. The handoff told you what's left to do.

---

## Session Lifecycle

Every session moves through these statuses:

```
PLANNING → IN-PROGRESS → COMPLETE ✅
                       → HANDOFF ✋ (if work remains)
```

### Opening a Session

1. Copy `SESSION_TEMPLATE.md`
2. Fill in: date, agent name, goal (one sentence), starting version (if applicable)
3. List initial tasks as unchecked items
4. Set status to `IN-PROGRESS`

### During the Session

- Check off tasks as they complete: `- [x] Task description`
- Add new tasks if scope evolves
- Record decisions as you make them — don't wait until the end
- Record discoveries (non-obvious findings) as they happen
- Add file paths to the Files Modified section as you touch them

### Closing a Session — Complete

When all tasks are done:

1. Verify all tasks are checked off
2. Fill in any remaining Decisions and Discoveries sections
3. Ensure Files Modified is complete
4. Set status to `COMPLETE ✅`

### Closing a Session — Handoff

When work remains but the conversation must end:

1. Check off completed tasks, leave incomplete ones unchecked
2. Fill the **Handoff** section (see template):
   - What was completed this session
   - Remaining work — be precise, include file paths and context
   - Key decisions made — so the next agent doesn't re-litigate them
   - Blockers or watch-outs — anything that could trip up the next agent
3. Set status to `HANDOFF ✋`
4. The next agent picks up by reading the handoff section

---

## The Archive Function

Sessions are never deleted. They form the project's institutional memory at the granular level:

**What a future agent can learn from past sessions:**
- What features were built and when
- What decisions were made and why
- What was tried and failed (discoveries section)
- What was left incomplete (handoff sections)
- Which files were touched for a given feature
- The trajectory of the project over time

**How to search the archive:**
- By date: navigate the folder hierarchy
- By topic: search session titles (semantic naming makes this effective)
- By session number: "what happened in session 14?"
- By file: grep for a file path across all sessions to find when it was last modified and why
- By status: search for `HANDOFF` to find incomplete work

---

## Rules

1. **One file = one continuous conversation.** If continuing the same chat, reuse the file. New conversation = new file.
2. **Never delete session files.** They are permanent archives. Even failed sessions have value.
3. **Semantic titles are mandatory.** The title should tell a future agent what the session was about without opening the file.
4. **Global numbering.** Session numbers are unique across the entire project. Check the latest number before creating a new file.
5. **Handoffs are precise.** A handoff that says "finish the feature" is useless. A handoff that says "implement the `saveUser()` method in `src/adapters/db.ts` using the pattern from `saveMessage()` at line 45" is actionable.
6. **Decisions go in the session file.** If you decided something during the session, record it. The next agent shouldn't have to guess why you chose approach A over B.
