---
type: Task
title: "T-013: Remove unused AI-Studio scaffolding from package.json/.env.example"
description: "@google/genai, express, dotenv dependencies and GEMINI_API_KEY/APP_URL env vars appear unused by the actual static app"
status: backlog
priority: low
tags: [roadmap, task, cleanup, dependencies]
timestamp: 2026-08-16T00:00:00Z
---

# T-013: Remove unused AI-Studio scaffolding from package.json/.env.example

## Context

Surfaced while customizing `AGENT.md`/`CLAUDE.md`/`cone/project/operations/` with this project's real
tech stack. `package.json` still has `"name": "react-example"`, plus dependencies (`@google/genai`,
`express`, `dotenv`) and `.env.example` variables (`GEMINI_API_KEY`, `APP_URL`, documented as
AI-Studio/Cloud-Run auto-injected) that don't match this project's actual architecture: a static,
JSON-driven site with no backend, no API calls, deployed to GitHub Pages
(`.github/workflows/deploy.yml`, which never sets these vars).

This looks like leftover scaffolding from whatever AI-Studio starter template the project was
originally bootstrapped from, never cleaned up once the real app diverged from it.

## Acceptance Criteria

- [ ] Confirm `@google/genai`, `express`, `dotenv` are genuinely unimported anywhere in `src/` (not
      just assumed from this investigation — grep before removing).
- [ ] If confirmed unused, remove them from `package.json` dependencies and delete the corresponding
      lines from `.env.example`.
- [ ] Rename `package.json`'s `"name"` field from `"react-example"` to something reflecting this
      project.
- [ ] Update `AGENT.md` §2 and `cone/project/operations/ENVIRONMENT.md` once this is done — both
      currently document these as known-unused scaffolding pending removal.

## Sub-Tasks

<!-- none yet -->

## Notes

Low priority — doesn't affect the shipped site (nothing imports the unused packages, so they're
dead weight in `node_modules`/`package-lock.json`, not a runtime risk). Worth doing during a future
dependency-audit pass rather than urgently.
