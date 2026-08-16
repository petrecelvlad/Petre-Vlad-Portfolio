---
type: Proposal
title: OKF Adaptation Design
description: Accepted design for adapting OKF to the cone-lite framework — the migration blueprint.
tags: [evolution, okf, proposal]
timestamp: 2026-06-23T00:00:00Z
---

# OKF Adaptation Design for Pinecone

How OKF maps onto cone-lite's existing structure, what changes, and what stays.

---

## Bundle Boundary

The OKF bundle is the `cone/` directory. It's already a self-contained, hierarchical knowledge system — the unit of distribution. The bundle root is `cone/`.

Files outside `cone/` (`AGENT.md`, `CLAUDE.md`, `README.md`) are not part of the OKF bundle. They remain as-is — they're entry points that reference into the bundle, not knowledge concepts within it.

---

## The Core Merge: Propolis + OKF Frontmatter

Current markdown files carry metadata in two incompatible formats that partially overlap:

**Before (current):**
```markdown
---
name: developer
archetype: Developer
description: >
  My mental model for writing code...
always_active: false
scope: universal
---

/**
 * @propolis
 * {
 *   "role": "PERSONA",
 *   "agent_instructions": "On-demand developer persona..."
 * }
 */

# Developer
```

Two metadata blocks. Redundant information. The @propolis JSON inside a JS comment in a markdown file is a workaround — markdown already has a native metadata format (YAML frontmatter), and OKF standardizes it.

**After (OKF-adapted):**
```markdown
---
type: Persona
title: Developer
description: >
  My mental model for writing code...
tags: [persona, coding, universal]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - On-demand — activate for coding sessions
agent_instructions: >
  On-demand developer persona. Activate at the start of any coding session.
always_active: false
scope: universal
---

# Developer
```

One block. OKF-compliant. All cone-specific fields preserved as extensions (which OKF explicitly allows).

### Field Mapping

| Current (propolis/frontmatter) | OKF field | Notes |
|---|---|---|
| `role` | `type` | Direct rename. Required by OKF. |
| `name` | *(dropped)* | OKF derives concept ID from file path. `agent/personas/DEVELOPER` is the ID. |
| `archetype` | *(dropped)* | Redundant with `type` + `title`. |
| `description` | `description` | Already OKF-compatible. |
| *(none)* | `title` | New. Human-readable display name. Derived from the `# H1` heading. |
| *(none)* | `tags` | New. OKF recommended. Cross-cutting categorization. |
| *(none)* | `timestamp` | New. OKF recommended. Last meaningful change. |
| `constraints` | `constraints` | Kept as cone extension. |
| `agent_instructions` | `agent_instructions` | Kept as cone extension. |
| `always_active` | `always_active` | Kept as cone extension (persona-specific). |
| `scope` | `scope` | Kept as cone extension (persona-specific). |

### Type Taxonomy

Propolis `role` values become OKF `type` values. Capitalization shifts from SCREAMING_CASE to Title Case to match OKF convention:

**Documentation types (used in cone/ bundle):**

| Propolis Role | OKF Type |
|---|---|
| `BOOTLOADER` | `Bootloader` |
| `PROTOCOL` | `Protocol` |
| `PERSONA` | `Persona` |
| `SKILL` | `Skill` |

**Code types (used in @propolis in source files, outside OKF):**

These remain unchanged. OKF doesn't govern code files. The existing propolis role taxonomy for code (`SERVICE`, `PORT`, `ADAPTER`, `ENTRY_POINT`, `MIDDLEWARE`, `ROUTER`, `SCHEMA`, `REPOSITORY`, `MIGRATION`, `UI_COMPONENT`, `UI_CONTAINER`, `STORE`, `HOOK`, `CONFIG`, `UTIL`, `TEST`, `SCRIPT`) stays exactly as-is.

New documentation types can be added as the bundle grows — OKF has no central registry. Examples: `Architecture`, `Spec`, `Playbook`, `Template`, `Decision Record`.

---

## What Happens to @propolis in Markdown

It's eliminated. The @propolis JSON block in markdown files was a shim — markdown already has YAML frontmatter, and OKF standardizes its use. All propolis data migrates into the frontmatter.

The `@propolis` standard itself (the PROPOLIS.md document) updates to clarify its scope:
- **Code files:** @propolis JSON in language-appropriate comments (unchanged)
- **Markdown files in cone/:** OKF YAML frontmatter (new — replaces @propolis JSON)

This is a scope reduction for @propolis, not a removal. Propolis remains the standard for code files. OKF takes over for the knowledge bundle.

---

## What Happens to @propolis in Code

Nothing. OKF doesn't cover code files. The existing @propolis standard for source code stays exactly as designed:

```typescript
/**
 * @propolis
 * {
 *   "role": "SERVICE",
 *   "constraints": ["Stateless execution"],
 *   "agent_instructions": "Core business logic for auth."
 * }
 */
```

### Bidirectional Linking (Code ↔ Docs)

The gap between code and docs is bridged by two existing mechanisms — no new format needed:

**Doc → Code:** OKF's `resource` field in frontmatter points to the code asset the doc describes.
```yaml
---
type: Architecture
title: Auth Service
resource: ../../src/services/authService.ts
---
```

**Code → Doc:** @propolis `agent_instructions` can reference the relevant doc.
```typescript
/**
 * @propolis
 * {
 *   "role": "SERVICE",
 *   "agent_instructions": "See /project/architecture/systems/AUTH.md for design context."
 * }
 */
```

This is lighter than the concept doc's `PROPOLIS_BINDING` proposal. We don't need `id`, `exports`, or a new in-code YAML format. The existing fields already close the loop.

---

## Index Files (Progressive Disclosure)

OKF reserves `index.md` for directory listings — no frontmatter, just structured links.

Current state: `cone/agent/personas/README.md` and `cone/agent/skills/README.md` serve this purpose but are full concept documents with @propolis metadata.

**Approach:** Add `index.md` files as the OKF progressive disclosure layer. Existing README.md files either:
- Become the `index.md` (if their content is purely a directory listing)
- Stay as concept documents alongside a new `index.md` (if they contain substantive content beyond listing)

Current README.md files contain both listing AND substantive content (e.g., "Persona vs Skill — The Decision Rule" in personas/README.md). So: keep them as concept docs, add thin `index.md` files alongside.

**Example `cone/agent/personas/index.md`:**
```markdown
# Personas

* [Communicator](COMMUNICATOR.md) - Always-active communication density persona
* [Developer](DEVELOPER.md) - On-demand coding discipline persona
* [Persona Creator](PERSONA_CREATOR.md) - Skill for creating new personas
* [About Personas](README.md) - What personas are, activation modes, persona vs skill distinction
```

---

## Cross-Linking

Cone docs already use markdown links. OKF formalizes two forms:

- **Bundle-relative (recommended):** `/agent/personas/COMMUNICATOR.md`
- **Relative:** `./COMMUNICATOR.md`, `../../project/architecture/OVERVIEW.md`

Current cone links are all relative. A migration pass to bundle-relative links would improve stability and make the graph cleaner, but is not required for OKF conformance. Can be done incrementally.

---

## Log Files

Optional. Not needed immediately. When the bundle starts being modified by agents regularly, adding `log.md` at the bundle root or in active subdirectories provides change history. Low priority.

---

## The Visualizer

If we make `cone/` OKF-conformant, Google's `visualize` tool should work directly against the bundle. The output: a self-contained HTML file showing the entire cone knowledge system as an interactive force-directed graph.

Nodes = every concept document, colored by `type`.
Edges = every markdown cross-link between concepts.

This gives us the visual renderer the project is missing, with zero custom code.

**Open question:** Does the Google visualizer handle cone's extension fields (`constraints`, `agent_instructions`, `always_active`)? OKF says consumers SHOULD preserve unknown keys — but "preserve" in round-tripping is different from "display." The detail panel shows frontmatter, so extensions would likely appear as raw YAML. Good enough for v1. A custom visualizer layer on top could render them more meaningfully later.

---

## Migration Scope

**26 markdown files** in `cone/` need frontmatter migration (25 with @propolis + SESSION_TEMPLATE.md).

The migration is mechanical per file:
1. Parse existing @propolis JSON and any YAML frontmatter
2. Merge into a single OKF-compliant YAML frontmatter block
3. Remove the @propolis JSON comment block
4. Add `title` (from the `# H1` heading)
5. Add `tags` and `timestamp`
6. Verify cross-links still work

Plus: add `index.md` files to directories that need progressive disclosure.

---

## What the Concept Doc Got Right vs. Wrong

**Right:**
- Propolis should speak YAML in docs, not JSON-in-comments
- Bidirectional code ↔ doc linking is valuable
- The graph visualization is the missing capability
- OKF is the right standard to adopt

**Wrong / Overengineered:**
- `PROPOLIS_BINDING` as a new in-code YAML format — unnecessary; existing @propolis + OKF `resource` field closes the loop
- Explicit `id` field in frontmatter — OKF derives ID from path, which is simpler and eliminates sync drift
- `relationships` map with typed edges (`commands`, `defines`) — OKF intentionally uses untyped link edges with prose context; typed edges add complexity without clear consumer benefit in our case
- `exports` array in code bindings — over-specified; the doc describes what the code exports, not the other way around

---

## Decision Summary

| Decision | Choice | Rationale |
|---|---|---|
| Bundle boundary | `cone/` directory | Already a self-contained knowledge system |
| Markdown metadata | OKF YAML frontmatter | Replaces @propolis JSON in markdown; one format, one block |
| Code metadata | @propolis JSON unchanged | OKF doesn't cover code; propolis is already fit for purpose |
| Code ↔ Doc linking | `resource` field + `agent_instructions` refs | Lighter than PROPOLIS_BINDING; uses existing fields |
| Concept IDs | File path derived | OKF standard; eliminates `id`/`name` field sync drift |
| Relationship model | Untyped markdown links | OKF standard; prose context conveys relationship kind |
| Type values | Title Case from propolis roles | `PROTOCOL` → `Protocol`, `PERSONA` → `Persona` |
| Index files | New `index.md` alongside existing README.md | Keeps substantive content in concept docs; thin index for disclosure |
| Visualizer | Google's OKF visualizer, unmodified | Zero custom code; cone extensions show as raw YAML in detail panel |
| Cross-link style | Bundle-relative preferred, migrate incrementally | Improves graph clarity; not blocking for conformance |
