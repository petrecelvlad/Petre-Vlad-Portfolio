---
type: Protocol
title: Local Development Setup
description: Setup guide — from clean checkout to running dev environment.
tags: [operations, setup, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Must stay current with actual dev setup requirements
agent_instructions: >
  Local development setup guide. An agent or developer following this should go from a clean
  checkout to a running dev environment. Update this whenever dependencies, tooling, or setup
  steps change.
---

# Local Development Setup

---

## Prerequisites

- [x] Node.js (v20, matching `.github/workflows/deploy.yml`'s CI runner)
- [x] npm
- [ ] No API keys or database required — the app is 100% static, data-driven by a checked-in JSON file.

---

## First-Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (no .env setup needed — see operations/ENVIRONMENT.md)
npm run dev
```

That's it. No database, no migrations, no required environment variables.

---

## Common Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build (`vite build` → `dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check only (`tsc --noEmit`) — there is no separate ESLint/Prettier step |
| `npm run clean` | `rm -rf dist` |

Note: `npm run lint:okf` and `npm run visualize` (cone-lite's own OKF-bundle tooling, described in `CLAUDE.md`) are **not** configured in this project's `package.json` — don't assume they exist.

---

## Port Map

| Service | Port | Notes |
|---|---|---|
| Dev server | 3000 | Only service — no backend, no database |

---

## Troubleshooting

No recurring setup issues on record yet. If one emerges more than once, add it here, and move it to `cone/project/memory/PLAYBOOK.md` if it affects more than setup.
