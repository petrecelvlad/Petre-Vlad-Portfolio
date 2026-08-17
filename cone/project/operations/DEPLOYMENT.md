---
type: Protocol
title: Deployment
description: Deployment procedures and CI/CD — how code goes from local branch to production.
tags: [operations, deployment, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Must reflect actual deployment pipeline
agent_instructions: >
  Deployment procedures and CI/CD documentation. Covers how code goes from a local branch
  to production. Update when the pipeline changes.
---

# Deployment

---

## Environments

| Environment | URL / Location | Purpose | Deploys from |
|---|---|---|---|
| Local | `localhost:3000` | Development (`npm run dev`) | Manual |
| Production | GitHub Pages (repo's Pages URL) | Live site | `main` branch, automatic |

No staging environment exists.

---

## Deployment Pipeline

### Automated (CI/CD) — the only deployment path

Defined in `.github/workflows/deploy.yml`:

```
Push to main → npm ci → npm run build → upload dist/ as Pages artifact → deploy to GitHub Pages
```

Runs on `ubuntu-latest`, Node 20. No manual deployment path exists or is needed — pushing to `main` is the deploy action.

---

## Pre-Deployment Checklist

- [ ] `npm run build` succeeds locally (this is the actual CI step — it's also the closest thing to a test suite this project has)
- [ ] `npm run lint` (`tsc --noEmit`) is clean
- [ ] No environment variables to configure — none are required (see `ENVIRONMENT.md`)

---

## Rollback

No automated rollback. To undo a bad deploy: `git revert` the offending commit on `main` and push — the workflow redeploys automatically. There is no manual "previous version" toggle on GitHub Pages itself.
