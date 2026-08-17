---
type: Protocol
title: "Propolis: Code File Metadata Standard"
description: Defines the @propolis metadata standard for source code files. Does not apply to markdown — those use OKF frontmatter.
tags: [onboarding, propolis, agent]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Defines the metadata standard for source code files (not markdown)
agent_instructions: >
  This document defines the @propolis metadata standard for code files. Markdown files in the
  cone/ bundle use OKF YAML frontmatter instead. Use the simplified 3-field schema for code
  files — not the extended version.
---

# Propolis: Code File Metadata Standard

Propolis is the metadata standard for **source code files** — `.ts`, `.py`, `.rs`, `.html`, and any other code. It does not apply to markdown files in `cone/`, which use OKF YAML frontmatter instead (see `CLAUDE.md`'s OKF section for the field reference — this project's copy doesn't include cone-lite's own OKF design-history docs, only the resulting convention).

## Philosophy

Every source code file in the project should be self-describing. An agent landing on any code file should instantly know: what it is, what constraints apply, and what to be careful about. Propolis metadata makes the codebase transparent without requiring the agent to read surrounding context.

This is the **Glass Box** principle: all logic is visible through structured metadata and explicit annotations.

---

## The Schema

Every source code file begins with a `@propolis` JSON block inside a comment:

```typescript
/**
 * @propolis
 * {
 *   "role": "SERVICE",
 *   "constraints": ["Stateless execution", "No direct database access"],
 *   "agent_instructions": "Core business logic for user authentication. Depends on AuthPort for credential validation. Do not add infrastructure imports."
 * }
 */
```

### Fields

| Field | Required | Description |
|---|---|---|
| `role` | Yes | Architectural classification of this file |
| `constraints` | No | Array of key constraints or rules that apply |
| `agent_instructions` | No | Free-text guidance for agents modifying this file |

---

## Role Taxonomy

Use these standard roles. Add project-specific roles as needed.

### Architecture Roles
| Role | Meaning |
|---|---|
| `SERVICE` | Business logic — orchestrates domain operations |
| `PORT` | Interface definition — contract between layers |
| `ADAPTER` | Infrastructure implementation — connects to external systems |
| `ENTRY_POINT` | Application entry point or composition root |
| `MIDDLEWARE` | Request/response pipeline processing |
| `ROUTER` | Route definitions and request dispatch |

### Data Roles
| Role | Meaning |
|---|---|
| `SCHEMA` | Data shape definitions (database, API, validation) |
| `REPOSITORY` | Data access patterns (queries, mutations) |
| `MIGRATION` | Database schema changes |

### UI Roles
| Role | Meaning |
|---|---|
| `UI_COMPONENT` | Presentational component |
| `UI_CONTAINER` | Stateful component that connects to stores/APIs |
| `STORE` | State management |
| `HOOK` | Reusable UI logic |

### Infrastructure Roles
| Role | Meaning |
|---|---|
| `CONFIG` | Configuration and environment setup |
| `UTIL` | Shared utility functions |
| `TEST` | Test file |
| `SCRIPT` | Build, deployment, or maintenance script |

---

## Examples

### A service file
```typescript
/**
 * @propolis
 * {
 *   "role": "SERVICE",
 *   "constraints": ["Pure business logic", "No framework imports"],
 *   "agent_instructions": "Orchestrates message processing. Receives messages through MessagePort, routes to handlers via HandlerPort. Never import HTTP framework code here."
 * }
 */
```

### An adapter file
```typescript
/**
 * @propolis
 * {
 *   "role": "ADAPTER",
 *   "constraints": ["Implements IExperienceRepository", "C-001: never imported by core/"],
 *   "agent_instructions": "JSON implementation of IExperienceRepository — reads src/infrastructure/data/portfolio.json. This project has no database and no REPOSITORY/MIGRATION/SCHEMA roles apply; every 'storage' concern in this codebase is this one static-file adapter."
 * }
 */
```

### A React component
```tsx
/**
 * @propolis
 * {
 *   "role": "UI_COMPONENT",
 *   "constraints": ["C-003: token-only styling, no arbitrary Tailwind values"],
 *   "agent_instructions": "Primary adapter for the skill-tree section. Reads active skin from SkinContext; layout geometry comes from core/domain/skillTreeGeometry.ts. Never hardcode colors — route through the token contract."
 * }
 */
```

### A markdown document in cone/

Markdown files in the `cone/` bundle do **not** use @propolis. They use OKF YAML frontmatter instead:

```markdown
---
type: Protocol
title: Document Title
description: One-line summary.
tags: [relevant, tags]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Key constraint
agent_instructions: >
  Guidance for agents modifying this file.
---
```

See [OKF_ADAPTATION.md](../../evolution/OKF/OKF_ADAPTATION.md) for the full design.

---

## When to Add Propolis

**Always add to:**
- Every new source **code** file you create
- Every existing code file you modify (if it doesn't have one yet)

**Skip for:**
- Markdown files in `cone/` — these use OKF YAML frontmatter
- Generated files (build output, lock files, compiled assets)
- Configuration files that don't support comments (JSON, `.env`)
- Third-party files you don't own

---

## For Non-TypeScript Languages

Adapt the comment syntax to your language:

```python
# @propolis
# {
#   "role": "SERVICE",
#   "constraints": ["Async only"],
#   "agent_instructions": "Main application service."
# }
```

```rust
// @propolis
// {
//   "role": "ADAPTER",
//   "constraints": ["Implements StoragePort"],
//   "agent_instructions": "SQLite adapter for local development."
// }
```

```html
<!-- @propolis
{
  "role": "UI_COMPONENT",
  "constraints": ["Server-rendered template"],
  "agent_instructions": "Base layout template. All pages extend this."
}
-->
```

The parser looks for `@propolis` followed by a JSON block. The comment syntax doesn't matter as long as the JSON is valid.
