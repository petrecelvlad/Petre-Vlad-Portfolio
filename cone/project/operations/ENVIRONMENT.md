---
type: Protocol
title: Environment & Configuration
description: Environment variable reference — structure and descriptions only, never actual secrets.
tags: [operations, environment, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Never include actual secret values — document structure only
agent_instructions: >
  Environment configuration reference. Documents what environment variables exist, where they
  come from, and what they do. NEVER include actual secret values in this file — only structure,
  descriptions, and dummy examples.
---

# Environment & Configuration

<!-- TEMPLATE: Fill this in for your project. Document the shape of your configuration, not the actual values. -->

---

## Environment Variables

<!-- List all environment variables the project uses. Group by purpose. -->

### Required

| Variable | Purpose | Example |
|---|---|---|
| *`DATABASE_URL`* | *Database connection string* | *`postgresql://user:pass@localhost:5432/mydb`* |
| *`API_KEY`* | *Third-party API authentication* | *`sk-...`* |

### Optional

| Variable | Purpose | Default |
|---|---|---|
| *`LOG_LEVEL`* | *Logging verbosity* | *`info`* |
| *`PORT`* | *Server port* | *`3000`* |

---

## Secrets Management

<!-- How are secrets stored and accessed? -->

- **Local development:** `.env` file (never committed — listed in `.gitignore`)
- **CI/CD:** *e.g., GitHub Actions secrets*
- **Production:** *e.g., Platform secret store, Vault, etc.*

---

## Platform Quirks

<!-- Runtime or platform-specific behaviors that affect development. Things that would surprise an agent that doesn't know about them. -->

<!-- Examples: -->
<!-- - "Cloudflare Workers have a 10ms CPU limit per request" -->
<!-- - "Vercel serverless functions cold-start after 5 minutes of inactivity" -->
<!-- - "SQLite on D1 doesn't support ALTER COLUMN" -->
<!-- - "Windows fails to release port 8787 after stopping wrangler — kill the process manually" -->

*Document platform-specific gotchas here. Move recurring ones to [PLAYBOOK.md](../memory/PLAYBOOK.md).*
