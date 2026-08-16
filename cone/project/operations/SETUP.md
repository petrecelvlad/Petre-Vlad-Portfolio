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

<!-- TEMPLATE: Fill this in for your project. An agent or new developer should be able to follow this from a clean checkout to a running system. -->

---

## Prerequisites

<!-- What needs to be installed before starting? Be specific about versions. -->

- [ ] *e.g., Node.js >= 20.x*
- [ ] *e.g., Docker (for local database)*
- [ ] *e.g., API keys for [service]*

---

## First-Time Setup

<!-- Steps to go from a clean checkout to a working dev environment. -->

```bash
# 1. Install dependencies
# npm install

# 2. Set up environment
# cp .env.example .env
# Edit .env with your values

# 3. Set up database
# npm run db:migrate

# 4. Start dev server
# npm run dev
```

---

## Common Commands

<!-- The commands an agent will use most frequently. -->

| Command | What it does |
|---|---|
| `npm run lint:okf` | Validate OKF bundle — checks frontmatter, type fields, broken links |
| `npm run visualize` | Generate interactive HTML graph of the cone/ knowledge bundle (requires Python `reference-agent` package from [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog)) |
| `npm run dev` | *Start development server* |
| `npm run build` | *Build for production* |
| `npm run test` | *Run test suite* |
| `npm run lint` | *Run linter* |

---

## Port Map

<!-- Which services run on which ports? Prevents port conflicts. -->

| Service | Port | Notes |
|---|---|---|
| *Dev server* | *3000* | *Main application* |
| *Database* | *5432* | *PostgreSQL* |

---

## Troubleshooting

<!-- Common setup issues and their fixes. Move recurring issues to cone/project/memory/PLAYBOOK.md if they affect more than setup. -->

### [Issue description]
**Symptom:** [what you see]
**Fix:** [what to do]
