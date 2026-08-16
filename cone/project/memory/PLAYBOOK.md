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
