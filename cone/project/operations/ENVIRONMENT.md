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

---

## Environment Variables

### Required

None. The app is a static build with no backend — `npm run dev` and `npm run build` both work with zero environment configuration.

`GEMINI_API_KEY`/`APP_URL` (AI-Studio-starter leftovers) and the `@google/genai`/`express`/`dotenv`
dependencies that referenced them were removed in T-013 — `.env.example` is now empty.

---

## Secrets Management

- **Local development:** none needed.
- **CI/CD:** `.github/workflows/deploy.yml` uses only the ambient `GITHUB_TOKEN` (via `actions/deploy-pages`) — no repo secrets configured.
- **Production:** N/A — static files served by GitHub Pages, no runtime secrets.

---

## Platform Quirks

- GitHub Pages serves whatever `dist/` was uploaded on the last successful `main` push — there is no environment promotion step and no way to preview a build before it's live short of running `npm run preview` locally.

*Move recurring gotchas to [PLAYBOOK.md](../memory/PLAYBOOK.md).*
