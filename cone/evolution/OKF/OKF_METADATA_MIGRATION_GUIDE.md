---
type: Protocol
title: OKF Metadata Migration Guide
description: Step-by-step guide for an agent to migrate a cone-lite project from @propolis-everywhere to OKF + propolis-for-code.
tags: [evolution, okf, migration]
timestamp: 2026-06-24T00:00:00Z
agent_instructions: >
  This is a migration playbook. Read it end-to-end before touching any files.
  It describes what was done in the cone-lite project and how to replicate
  the same migration in your project. Follow the phases in order.
---

# OKF Metadata Migration Guide

This document tells you everything you need to apply the OKF migration to your project. It was written after successfully completing this migration on the cone-lite framework itself. Follow it as a playbook. It applies to any project that adopted cone-lite before the OKF migration and still uses `@propolis` blocks on markdown files in `cone/`.

---

## What Changed and Why

The cone-lite project had a single metadata system called **Propolis** — `@propolis` JSON blocks in comments on every file, including markdown. This created a problem: markdown already has a native metadata format (YAML frontmatter), and wrapping JSON inside a JS comment inside a markdown file was a workaround.

**Open Knowledge Format (OKF)** is a Google-published spec (v0.1, June 2026) that standardizes YAML frontmatter for markdown-based knowledge systems. It gives us:
- A standardized schema (only `type` is required, everything else is optional/extensible)
- A static HTML visualizer that renders the knowledge graph with zero backend
- Interoperability with any OKF-compliant tool or agent

**The new standard is:**
- **Markdown files** in the knowledge bundle (`cone/` directory) → **OKF YAML frontmatter**
- **Source code files** (`.ts`, `.py`, `.rs`, etc.) → **@propolis JSON blocks** (unchanged)

Propolis is not removed. It is scoped to code files only. OKF handles the documentation layer.

---

## The OKF Spec in 30 Seconds

A conformant OKF bundle requires:
1. Every non-reserved `.md` file has YAML frontmatter with a `type` field
2. Reserved files are `index.md` (directory listing, no frontmatter) and `log.md` (change history)
3. Cross-references use standard markdown links — the graph is built from link traversal

Recommended optional fields: `title`, `description`, `resource`, `tags`, `timestamp`

Extension fields (any additional keys) are explicitly allowed. We use: `constraints`, `agent_instructions`, `always_active`, `scope`.

Full spec: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

---

## Phase 1: Audit the Current State

Before migrating, understand what you're working with.

### 1.1 Find all markdown files in the knowledge bundle
```bash
find cone -name "*.md" | sort
```

### 1.2 Identify which files have @propolis blocks
```bash
grep -rl "@propolis" cone/ --include="*.md"
```

### 1.3 Identify which files already have YAML frontmatter
```bash
grep -rl "^---" cone/ --include="*.md"
```

### 1.4 Check for files with BOTH (these need merging)
Files that have both YAML frontmatter AND @propolis blocks need their metadata merged into a single OKF frontmatter block.

---

## Phase 2: Migrate Markdown Files

For each markdown file in the knowledge bundle:

### Pattern A: @propolis only (no existing frontmatter)

**Before:**
```markdown
/**
 * @propolis
 * {
 *   "role": "PROTOCOL",
 *   "constraints": ["Some constraint"],
 *   "agent_instructions": "Some instructions"
 * }
 */

# Document Title
```

**After:**
```markdown
---
type: Protocol
title: Document Title
description: One-line summary of what this document is.
tags: [relevant, tags]
timestamp: 2026-06-24T00:00:00Z
constraints:
  - Some constraint
agent_instructions: >
  Some instructions
---

# Document Title
```

**Steps:**
1. Map `role` → `type` (SCREAMING_CASE → Title Case: `PROTOCOL` → `Protocol`, `PERSONA` → `Persona`, etc.)
2. Derive `title` from the `# H1` heading
3. Write a one-line `description`
4. Add `tags` based on content/location
5. Set `timestamp` to today
6. Move `constraints` and `agent_instructions` into the frontmatter as extension fields
7. Remove the entire `/** @propolis ... */` block

### Pattern B: YAML frontmatter + @propolis (both present)

**Before:**
```markdown
---
name: some-name
archetype: Some Archetype
description: >
  Some description
always_active: true
scope: universal
---

/**
 * @propolis
 * {
 *   "role": "PERSONA",
 *   "agent_instructions": "Some instructions"
 * }
 */

# Title
```

**After:**
```markdown
---
type: Persona
title: Title
description: >
  Some description
tags: [relevant, tags]
timestamp: 2026-06-24T00:00:00Z
always_active: true
scope: universal
agent_instructions: >
  Some instructions
---

# Title
```

**Steps:**
1. Merge both blocks into a single OKF-compliant frontmatter
2. Drop `name` (OKF derives concept ID from file path)
3. Drop `archetype` (redundant with `type` + `title`)
4. Map `role` → `type`
5. Keep all other fields as extensions
6. Remove the @propolis block entirely

### Type Mapping Reference

| Old Propolis Role | New OKF Type |
|---|---|
| `BOOTLOADER` | `Bootloader` |
| `PROTOCOL` | `Protocol` |
| `PERSONA` | `Persona` |
| `SKILL` | `Skill` |
| `CONSTRAINT_REGISTRY` | `Constraint Registry` |

Add new types as needed: `Architecture`, `Reference`, `Template`, `Playbook`, `Lessons`, `Anti-Patterns`, `Evolution Proposal`, etc. OKF has no central registry — pick descriptive, self-explanatory names.

---

## Phase 3: Add Index Files

Add an `index.md` to every directory that has multiple files or subdirectories. Index files:
- Have **no frontmatter** (they're reserved files in OKF)
- List the directory contents with descriptions
- Enable progressive disclosure for agents and the visualizer

**Template:**
```markdown
# Directory Name

* [Document Title](FILENAME.md) - One-line description
* [Subdirectory](subdir/) - What's in there
```

---

## Phase 4: Normalize Cross-Links

The OKF visualizer builds graph edges from markdown links. Backtick-quoted paths (`cone/agent/onboarding/SESSIONS.md`) and bare text references don't register.

Convert cross-references to relative markdown links:

```
cone/agent/personas/COMMUNICATOR.md  →  [COMMUNICATOR.md](../personas/COMMUNICATOR.md)
Same directory:                      →  [SESSIONS.md](./SESSIONS.md)
Across pillars:                      →  [OVERVIEW.md](../../project/architecture/OVERVIEW.md)
```

**Don't convert:**
- References inside HTML comments (template instructions)
- References inside frontmatter `agent_instructions`
- References that are illustrative examples, not navigational

---

## Phase 5: Update Propolis Documentation

After the markdown migration, propolis is scoped to code files only. Update:

1. **PROPOLIS.md** — retitle to "Code File Metadata Standard". Add a scope disclaimer at the top: propolis is for code files, markdown uses OKF. Remove any "Documentation Roles" section from the role taxonomy (those are now OKF types, not propolis roles).

2. **AGENT.md** — update the metadata/propolis section to clarify the split: @propolis for code, OKF frontmatter for markdown in `cone/`.

3. **Any adoption guides** (START_NEW, APPLY_TO_EXISTING, etc.) — update references from "every file gets @propolis" to "every code file gets @propolis; markdown uses OKF frontmatter".

4. **Any persona/skill creators** — if they show @propolis block templates for markdown files, remove those. Personas and skills are markdown → OKF frontmatter.

---

## Phase 6: Install and Run the Visualizer

### Install
```bash
git clone https://github.com/GoogleCloudPlatform/knowledge-catalog.git _tools/knowledge-catalog --depth 1
cd _tools/knowledge-catalog/okf
pip install -e .
```

Add `_tools/` to `.gitignore`.

### Generate
```bash
python -m reference_agent visualize --bundle cone --out cone_viz.html --name "your-project-name"
```

Add `cone_viz.html` to `.gitignore` (generated output).

### Add npm scripts
```json
{
  "scripts": {
    "lint:okf": "node scripts/lint-okf.js",
    "visualize": "python -m reference_agent visualize --bundle cone --out cone_viz.html --name your-project-name"
  }
}
```

---

## Phase 7: Add a Linter

Create `scripts/lint-okf.js` that:
1. Walks all `.md` files in `cone/`
2. Checks every non-reserved file has YAML frontmatter with a `type` field
3. Checks `index.md` files do NOT have frontmatter
4. Extracts markdown links (skipping fenced code blocks) and flags broken targets
5. Reports: `N concepts, X error(s), Y warning(s)`
6. Exits with code 1 if there are errors

You can copy the linter from the cone-lite project at `scripts/lint-okf.js`.

---

## Phase 8: Validate

Run this checklist after migration:

- [ ] `npm run lint:okf` → 0 errors, 0 warnings
- [ ] No `@propolis` blocks remain in any markdown file in `cone/`
- [ ] Every markdown file in `cone/` (except `index.md` and `log.md`) has YAML frontmatter with `type`
- [ ] Every `index.md` has no frontmatter
- [ ] `npm run visualize` generates a graph with edges (not just disconnected nodes)
- [ ] PROPOLIS.md says "code files only"
- [ ] AGENT.md clarifies the code/markdown metadata split
- [ ] All adoption guides reference both systems correctly
- [ ] No references to the old "propolis on markdown" pattern remain in active docs

---

## What NOT to Change

- **@propolis blocks in source code files** — leave these exactly as they are. OKF doesn't cover code.
- **The `@propolis` tag name and JSON format in code** — unchanged. The parser, the role taxonomy for code (SERVICE, PORT, ADAPTER, etc.), and the 3-field schema all stay.
- **Historical documents** (session files, proposals, ADRs) — don't retroactively migrate. They're archives. Add OKF frontmatter only if you need them to appear in the graph.
- **Files outside `cone/`** — AGENT.md, CLAUDE.md, README.md are entry points, not part of the OKF bundle. Don't add OKF frontmatter to them.

---

## Reference: The Design Decision

The full rationale for every design choice is in `cone/evolution/OKF/OKF_ADAPTATION.md` in the cone-lite project. Key decisions:

| Decision | Choice |
|---|---|
| Bundle boundary | `cone/` directory |
| Markdown metadata | OKF YAML frontmatter |
| Code metadata | @propolis JSON (unchanged) |
| Concept IDs | File path derived (no explicit `id` field) |
| Relationships | Untyped markdown links (no typed edge maps) |
| Type values | Title Case from propolis roles |
| Index files | New `index.md` alongside existing README.md |
| Visualizer | Google's OKF reference tool, unmodified |
