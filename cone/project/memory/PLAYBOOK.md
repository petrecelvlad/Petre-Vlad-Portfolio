---
type: Playbook
title: Debugging Playbook
description: Institutional memory — known failure modes with symptoms, diagnoses, and fixes.
tags: [memory, debugging, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Curated knowledge only — not a session log
agent_instructions: >
  Institutional memory: known failure modes with fixes. Add entries when a debugging pattern
  would take a future agent significant time to rediscover. Use the template format below.
---

# Debugging Playbook

Known failure modes with symptoms, diagnoses, and fixes. Each entry captures a debugging pattern that would take significant time to rediscover from scratch.

**This is curated knowledge, not a session log.** Session logs go in `cone/agent/sessions/`. Playbook entries are distilled from sessions into timeless recipes. See also [Anti-Patterns](./ANTI_PATTERNS.md) and [Lessons](./LESSONS.md).

---

## Entry Format

```markdown
### [Symptom Description]
**Symptom:** [What you observe — error messages, unexpected behavior]
**Diagnosis:** [How to confirm this is the problem]
**Fix:** [Step-by-step resolution]
**Prevention:** [How to avoid this in the future]
```

---

<!-- Add entries below this line -->

### Verifying a change felt fine to the agent but the user's machine was noticeably lagging
**Symptom:** No error, no crash — the agent's own Playwright-driven screenshot verification scripts (launching headless Chromium, navigating the dev server, sampling frames) worked and returned useful results, but the user reported their computer lagging heavily whenever the agent used this workflow (T-026, verifying the 4 achievement-card SVG conversions).
**Diagnosis:** Ask the user directly whether verification tooling is causing felt slowdown — an agent has no visibility into the host machine's actual resource pressure (CPU/RAM contention from a real browser process) from inside its own tool-success/failure signals alone.
**Fix:** `npm uninstall playwright` removed it from `devDependencies`. Note: `tools/shader-capture/capture.mjs` (the `capture:shader` npm script, from the earlier T-016 bake pipeline) also imports Playwright and is now broken too — a real, separate consequence flagged and accepted by the user before uninstalling, not a surprise.
**Prevention:** Don't reach for a real headless-browser automation library (Playwright, Puppeteer, etc.) as a default fallback when `mcp__claude-in-chrome__*` browser tools are unavailable in this project — it's been asked to be removed and its noticeable system-resource cost was the reason. If browser-based visual verification is needed and Claude-in-Chrome still isn't working, ask the user to check visually instead of silently spinning up a local headless browser.
