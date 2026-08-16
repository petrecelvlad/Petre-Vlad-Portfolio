---
type: Skill
title: Restructure
description: >
  Assesses whether a directory's flat structure still fits its actual contents, and
  reorganizes it into subfolders by kind when it doesn't. Triggers whenever AGENT.md's
  Structural Fit standing rule fires (before placing a new file into a directory that
  might no longer fit), and on explicit request: "reorganize this folder", "clean up
  this directory structure", "does this folder need subfolders", "this directory feels
  messy".
tags: [skill, structure, meta]
timestamp: 2026-07-12T00:00:00Z
agent_instructions: >
  Procedural workflow behind AGENT.md's Structural Fit standing rule. That rule fires on
  every file placement, everywhere — this skill defines what to do once it fires. Do not
  restate this procedure elsewhere (e.g. in skill-creator or persona-creator); the
  standing rule already binds every file-placement action unconditionally, so pointing
  here once is enough.
---

# Restructure

A procedure for deciding whether a directory needs subfolders, and executing the reorganization if it does — invoked whenever the Structural Fit standing rule trips, not just during a whole-framework evolution audit.

---

## Step 1: Classify Existing Files by Kind, Not Topic

List everything already in the target directory and assign each file a **kind** — its structural shape, not its subject matter.

Kinds are things like: a numbered sequential log entry, a permanent reference document, a discovery/survey artifact, a template, a self-contained historical archive, a persona, a skill. "Kind" is not "OKF-related" vs. "session-related" — that's topic, and topic-based grouping is exactly how flat directories end up mixed. Two files can share a topic and be totally different kinds (a permanent reference about X and a one-time proposal about X don't belong in the same bucket just because both mention X).

---

## Step 2: Check the Two Trigger Signals

**Kind-mixing** — does the directory contain two or more genuinely different kinds, each with at least one file? This is the sharper signal and often trips before the count does.

**Count** — has the directory grown past a natural browsing size regardless of mixing? Reuse the threshold already established in the `evolution` skill's Structural Health audit category: 10+ files with no subfolder organization.

Either signal alone is enough to propose restructuring. Neither alone is a mandate to restructure a directory that's genuinely single-kind, no matter how large — a directory of 40 same-kind session files, for instance, doesn't need subfolders just because it's long; `SESSIONS.md`'s own month/week/day hierarchy already handles that case on a different axis (time, not kind).

---

## Step 3: Design the New Structure

One subfolder per kind that has **two or more files**. A kind with exactly one file stays at the parent directory level — it does not get its own subfolder yet. This is Grow-Don't-Scaffold applied to structure itself: a single-item bucket is speculation about a pattern that hasn't happened yet, not evidence one exists.

Leave a note (in the parent `index.md` or the lone file's own frontmatter `agent_instructions`) naming the trigger to watch for — e.g. "if a second survey document appears, move both into a `surveys/` subfolder" — so a future pass doesn't have to re-derive the same judgment call from scratch.

---

## Step 4: Propose Before Executing

Moving and renaming files touches every cross-reference to them, repo-wide. This is higher blast radius than adding a single new file. Present the proposed structure — what moves where, what stays — and get confirmation before touching anything, the same way an `AGENT.md` constitution edit gets shown before it's written.

---

## Step 5: Execute

1. `git mv` each file into its new location — preserves history; a plain move-and-recreate does not.
2. Add an `index.md` to each new subfolder (no frontmatter, per OKF's reserved-file convention).
3. Update the parent directory's `index.md` to point at the new subfolder instead of the old flat entries.
4. Grep the whole repo for every old path being moved and fix each cross-reference to the new path.
5. Run `npm run lint:okf` — zero errors, zero broken links, before considering the restructuring done.

---

## What Not To Do

**Don't restructure on topic.** Grouping by subject matter recreates the mixing problem one level down instead of solving it.

**Don't create a subfolder for a kind with only one member.** Wait for the second one — that's the actual evidence a pattern exists, not the first occurrence.

**Don't silently execute a repo-wide rename.** Cross-reference breakage is easy to cause and easy to miss; propose first.

**Don't restate this procedure in other skills.** `AGENT.md`'s Structural Fit standing rule already applies unconditionally to every file placement; skills that create files (`skill-creator`, `persona-creator`, `bootstrap-architecture`, etc.) don't need their own copy of this logic — they inherit it from the standing rule.
