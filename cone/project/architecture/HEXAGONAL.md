---
type: Reference
title: Hexagonal Architecture Reference
description: Hexagonal Architecture (Ports and Adapters) reference guide for non-trivial projects.
tags: [architecture, reference, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Reference document — not prescriptive for all projects
agent_instructions: >
  Hexagonal Architecture reference guide. Recommended for non-trivial projects with external
  dependencies. Read when designing system structure or evaluating architectural decisions.
---

# Hexagonal Architecture Reference

Hexagonal Architecture (Ports and Adapters) is the recommended default for non-trivial projects. It is not mandatory for every project — scripts, CLIs, and small utilities may not need it. Use it when your system has external dependencies (databases, APIs, queues) that you want to isolate from business logic.

---

## The Core Idea

Business logic should not know about infrastructure. The database, the HTTP framework, the email service — these are implementation details that the core logic defines interfaces for but never touches directly.

```
┌─────────────────────────────────────────┐
│              Adapters                    │
│  ┌──────────────────────────────────┐   │
│  │          Core (Ports)             │   │
│  │                                   │   │
│  │   Pure business logic             │   │
│  │   Defines interfaces (Ports)      │   │
│  │   Imports NOTHING from outside    │   │
│  │                                   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Database Adapter    API Adapter         │
│  Cache Adapter       Auth Adapter        │
│  Email Adapter       Queue Adapter       │
└─────────────────────────────────────────┘
         ↑
    Composition Root (wires adapters to ports)
```

---

## The Three Layers

### 1. Core (The Business Logic)

The Core contains all business rules, domain entities, and service orchestration. It defines **Ports** — interfaces that describe what it needs from the outside world — but never implements them.

**Rules:**
- Imports nothing from adapters, frameworks, or infrastructure
- All dependencies are injected through constructor parameters
- Uses only language primitives and domain types
- Testable in complete isolation — no mocks of infrastructure needed

```typescript
// A Port — defined in Core
interface StoragePort {
  getUser(id: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}

// A Service — lives in Core, receives Ports via constructor
class UserService {
  constructor(private storage: StoragePort) {}

  async deactivateUser(id: string): Promise<void> {
    const user = await this.storage.getUser(id);
    if (!user) throw new Error(`User ${id} not found`);
    user.active = false;
    await this.storage.saveUser(user);
  }
}
```

### 2. Adapters (The Infrastructure)

Adapters implement the Ports defined by the Core. They translate between external systems (SQL databases, REST APIs, message queues) and the Core's interfaces.

**Rules:**
- Each adapter implements exactly one Port
- All infrastructure-specific code (SQL, HTTP clients, SDK calls) lives here
- Adapters are swappable — the Core doesn't know or care which one is active

```typescript
// An Adapter — implements the Port using PostgreSQL
class PostgresStorageAdapter implements StoragePort {
  constructor(private db: Pool) {}

  async getUser(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] ?? null;
  }

  async saveUser(user: User): Promise<void> {
    await this.db.query(
      'UPDATE users SET active = $1 WHERE id = $2',
      [user.active, user.id]
    );
  }
}
```

### 3. Composition Root (The Wiring)

The Composition Root is the single place where adapters are connected to the Core via dependency injection. It lives at the application entry point.

```typescript
// Composition Root — wires everything together
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const storage = new PostgresStorageAdapter(db);
const userService = new UserService(storage);

// Now the HTTP framework can use the service
app.post('/users/:id/deactivate', async (req, res) => {
  await userService.deactivateUser(req.params.id);
  res.sendStatus(200);
});
```

---

## The Leak Test

Your architecture is sound if you can answer "yes" to this question:

> If I needed to replace [external dependency] with a completely different implementation, could I do it by creating a new adapter file and updating the composition root — without modifying any file in Core?

If the answer is "no," you have a leak. The Core is coupled to infrastructure.

**Common leaks:**
- Core importing a database client or ORM directly
- Core referencing HTTP request/response types
- Core containing SQL queries or API URLs
- Core importing framework-specific decorators or annotations

---

## The Type Wall

The Type Wall is the boundary between Core and the outside world. It enforces:

- Core defines the types (domain entities, Port interfaces)
- Adapters conform to those types
- The Composition Root connects them
- No type from infrastructure (database row types, API response shapes) crosses into Core

If you need a type in both Core and Adapters, it belongs in a shared contract/types package — not in either layer.

---

## When to Use Hexagonal Architecture

**Use it when:**
- Your system has 2+ external dependencies (database, API, cache, queue)
- You anticipate swapping implementations (e.g., moving databases, changing providers)
- You want to test business logic without infrastructure
- Multiple entry points exist (HTTP API, CLI, queue consumer, cron job)

**Skip it when:**
- You're writing a script, CLI tool, or single-purpose utility
- The entire application IS the infrastructure (a proxy, a data pipeline)
- The project has one external dependency and no plans to change it
- Adding the abstraction costs more than the coupling it prevents

---

## Further Reading

For project-specific architectural documentation, see [OVERVIEW.md](./OVERVIEW.md) and per-system docs in [systems/](./systems/TEMPLATE.md). For the shape of an individual module's interface — depth, seams, the deletion test — see [MODULE_DESIGN.md](./MODULE_DESIGN.md), which operates one level down from this document: this page governs the boundary between Core and infrastructure; that one governs the boundary between any module and its callers.
