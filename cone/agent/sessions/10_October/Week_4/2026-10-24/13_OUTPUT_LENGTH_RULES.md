---
type: Session
title: "Session 13: Output Length Rules"
description: Agent wrote far too much; the length rule was consolidated into COMMUNICATOR and the contradicting "full picture" lines removed.
tags: [session, onboarding, communication]
timestamp: 2026-10-24T00:00:00Z
---

# Session 13: Output Length Rules

## Metadata

- **Date:** 2026-10-24
- **Agent:** Claude Code (claude-opus-5-5)
- **Goal:** Fix the onboarding so agents stop writing more than was asked.
- **Status:** COMPLETE ✅

---

## Tasks

- [x] COMMUNICATOR.md rewritten as the single owner of the length rule; "full picture" / "err toward completeness" escape hatches removed
- [x] Global CLAUDE.md "Communication" and "Governing principle" lines aligned to it
- [x] AGENT.md: phase text goes in the session file, not the chat
- [x] Project CLAUDE.md: one-line rule at the top (loaded every turn)
- [x] Retard.md: lesson 5, "Length is a defect"

---

## Decisions

- **One owner for the length rule (COMMUNICATOR.md):** the rule was scattered and contradicted — global CLAUDE.md said "give the full picture", COMMUNICATOR said "err toward completeness" on design questions — and agents used those lines as license to write long.
- **Rule repeated once in project CLAUDE.md:** it is injected every turn, while cone docs are read once at onboarding and fade.

---

## Discoveries

- AGENT.md's "each phase produces visible text" pushed agents to narrate their phase work in the chat.

---

## Files Modified

- `cone/agent/personas/COMMUNICATOR.md` — rewritten around "answer only what was asked, depth only on request"
- `cone/agent/onboarding/Retard.md` — lesson 5
- `CLAUDE.md` — one-line rule at the top
- `AGENT.md` — phase text goes in the session file
- `~/.claude/CLAUDE.md` — Communication and Governing principle lines

---

*Last updated: 2026-10-24*
