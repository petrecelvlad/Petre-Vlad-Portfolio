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

<!-- TEMPLATE: Fill this in for your project. Cover the path from local branch to production. -->

---

## Environments

<!-- What environments exist and their purpose? -->

| Environment | URL / Location | Purpose | Deploys from |
|---|---|---|---|
| *Local* | *localhost:3000* | *Development* | *Manual* |
| *Staging* | *staging.example.com* | *Pre-production testing* | *`develop` branch* |
| *Production* | *example.com* | *Live* | *`main` branch* |

---

## Deployment Pipeline

<!-- How does code get deployed? Manual steps, CI/CD, or both? -->

### Automated (CI/CD)

<!-- Describe the CI/CD pipeline if one exists. -->

```
Push to main → [CI step 1] → [CI step 2] → [Deploy] → [Smoke test]
```

### Manual

<!-- Steps for manual deployment if needed. -->

```bash
# npm run build
# npm run deploy
```

---

## Pre-Deployment Checklist

- [ ] All tests pass locally
- [ ] No TypeScript errors (`npm run build`)
- [ ] Environment variables configured for target environment
- [ ] Database migrations applied (if any)
- [ ] Smoke test plan identified

---

## Rollback

<!-- How to undo a bad deployment. -->

*Describe rollback procedure here.*
