# Workflow Protocols & Engineering Logs

This file outlines the standard operating procedure for any AI Agent or Developer adding new systems, altering the architecture, or changing the aesthetic direction of this project.

## Your Responsibilities as a Developer/Agent
1. **Analyze First:** Do not guess the layout. Reference `AGENTS.md` and the architecture documentation. 
2. **Atomic Commits/Tool Calls:** Break large layout refactors into modular edits. If editing a Bento UI, edit the molecule first, then test in the parent.
3. **Log Your Legacy:** Future agents will lack the memory of this specific conversation. When you finish a significant architectural shift or discover a bug in a core standard, write an entry to `/docs/Logs.md`.

## Updating `/docs/Logs.md`
The `Logs.md` file is our ongoing diary of decisions. An entry should look like this:

```markdown
### Date: [YYYY-MM-DD]
**Author:** AI Agent (Gemini) / Developer
**Focus:** Refactoring the Timeline orchestration.
**Problem:** The Navbar and TimelineTrack had competing local `activeIndex` states.
**Solution:** Migrated state to `useTimelineOrchestrator` hook and passed it down to components via the `Scene` Layout wrapper.
**Result/Impact:** Centralized state; simplified component props; smoothed scroll performance.
```

If you see an obsolete structure, do not blindly follow it—refactor it, fix the problem, and log the change.
