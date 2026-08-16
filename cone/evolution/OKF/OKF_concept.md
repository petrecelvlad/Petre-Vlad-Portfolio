---
type: Proposal
title: OKF Concept
description: Original vision for OKF integration — superseded by OKF_ADAPTATION.md.
tags: [evolution, okf, proposal]
timestamp: 2026-06-23T00:00:00Z
---

This evolution turns Propolis into a bidirectional compilation layer.

Instead of writing a custom syntax that only your specific setup understands, Propolis now enforces standard YAML inside your code docstrings and standard OKF frontmatter inside your markdown files.

Here is precisely what this new format looks like, how it renders visually as a graph, and how your AI agents will dynamically interact with it.

1. The New Propolis Format: Code vs. Docs
Here is the exact blueprint of how a single concept bridges across both domains. Let’s look at a core component: a Python script for a system architect agent, and its corresponding architectural persona document.

The Code Layer (src/agents/architect.py)
Inside the code, Propolis uses a standardized, structural docstring block. No strange custom annotation syntax—just plain YAML wrapped in a clear token header that a parser script can instantly rip out.

Python
"""
PROPOLIS_BINDING:
  id: cone.persona.architect
  type: Persona
  docs: cone/personas/architect.md
  exports:
    - code.method.transmute_architecture
"""

class SystemArchitect:
    def transmute_architecture(self, raw_input):
        """
        PROPOLIS_BINDING:
          id: code.method.transmute_architecture
          type: Skill
          docs: cone/skills/transmutation.md
        """
        # High-level vibe coding logic goes here...
        pass
The Docs Layer (cone/personas/architect.md)
This is a pristine, 100% OKF-compliant markdown file. The resource field points directly back to the source code file it governs, closing the loop.

YAML
---
type: Persona
id: cone.persona.architect
title: Core System Architect
description: High-level architectural decision-maker focused on clean, decoupled systems.
resource: ../../src/agents/architect.py
tags: [core, persona, architecture]
version: 1.0.0
timestamp: 2026-06-23T18:00:00Z
relationships:
  commands: [cone.skill.transmute_info]
  defines: [cone.spec.hexagonal_router]
---

# Core System Architect

The Architect is responsible for digesting high-level structural concepts and emitting developer-ready specifications. It operates strictly under the Single Responsibility Principle.

## Behavioral Directives
* Prioritize visual layouts utilizing the Fibonacci sequence.
* Treat documentation as an active, executable layer.
2. How We Show This on a Graph
Because both layers now speak YAML and Markdown, generating a graph becomes incredibly simple. You don't need a heavy database.

Nodes: Every markdown file in cone/ and every code module flagged with a PROPOLIS_BINDING becomes a unique node in the graph, identified by its id.

Edges (Relationships): The lines connecting the dots are drawn from two sources:

The explicit mappings in the YAML frontmatter (resource, commands, defines).

Standard inline markdown links (e.g., [[cone/skills/transmutation.md]]) within the body text.

The Visualizer: Google shipped an official reference tool with the OKF spec—a completely static, self-contained HTML visualizer file. You drop this single file into your repository. It runs directly in the browser with zero backend installations, reads your local folder structure, and automatically renders a beautiful, interactive node-and-line graph of your entire system architecture.

3. How an Agent Accesses the Knowledge Graph
This is the most critical shift. Traditional setups force you to dump all documentation into a massive prompt or use vector search (RAG), which loses the structural context. With this upgraded architecture, an agent reads the repo like a graph database using standard file system capabilities.

[Agent Boots Up] 
       │
       ▼
Reads 'cone/index.md' (Root Node)
       │
       ▼
Follows links to specialized entities (Personas, Skills, Specs)
       │
       ▼
Loads ONLY the specific files needed for the current task
Zero-Setup Context: When an agent boots up inside your repository, it doesn’t need a custom API key or vector database. It simply opens the root index.md or AGENT.md.

Progressive Disclosure: Instead of overwhelming its context window, the agent reads the YAML frontmatter of the root file to see the system layout. If you give it a task to update a routing feature, it follows the graph links: it reads cone/personas/architect.md, sees it defines cone/spec.hexagonal_router, jumps straight to that spec file, and checks the resource field to find the exact python file to modify.

Autonomous Maintenence: If an agent modifies a code file or adds a new module, it can update or create the matching OKF markdown file automatically, keeping the human documentation and the code structural map perfectly synchronized in real-time.