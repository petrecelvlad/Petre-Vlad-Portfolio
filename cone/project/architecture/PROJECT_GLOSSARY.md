---
type: Glossary
title: Project Glossary — Ubiquitous Language
description: >
  Living glossary of this project's own domain vocabulary — distinct from
  cone/project/architecture/CONTEXT.md, which documents cone-lite's own framework vocabulary.
tags: [architecture, glossary, project]
timestamp: 2026-08-16T00:00:00Z
constraints:
  - Add an entry the moment a term is used ambiguously and gets resolved — don't batch
  - This file is for CV Portfolio's domain vocabulary; framework vocabulary belongs in CONTEXT.md
agent_instructions: >
  Consult this before assuming the meaning of a project-specific term that recurs across
  cone/project/architecture/systems/ without one obvious source of truth.
---

# Project Glossary — Ubiquitous Language

Terms specific to how *this project* (not cone-lite) uses them.

## Experience Engine

What this project calls itself — not "a website" or "a portfolio page." An interactive, spatial-canvas application for a Game Designer/Producer, navigated via a timeline rather than traditional page scrolling. The term shows up in `.agent` and `OVERVIEW.md`'s System Purpose; it's the framing that justifies several otherwise-unusual architectural choices (the Managed Stage, snap-scroll sections, skin system).

## Managed Stage

The shell architecture that separates fixed chrome from scrollable content: a fixed-height Navbar plus a scroll envelope containing snap-scroll sections (Hero, SkillTree, one section per project, Footer). See `OVERVIEW.md`'s "The Managed Stage" diagram.

## Global Chrome vs. Content Canvas

The two-region split from `.agent`'s Golden Rule 3: **Global Chrome** is the fixed navigation/HUD (the Navbar); **Content Canvas** is the interactive, scrollable timeline area containing the bento grids. Components in one region must not fight the other for state — see the Single Orchestrator guardrail (`GUARDRAILS.md` C-005).

## Skin

A fully-resolved token set that determines the site's entire visual identity without changing component structure. Two live skins: **Gamified** (tactile RPG/retro-arcade, the runtime default) and **Heritage** (desk/clipboard, wood-and-paper). Swapping skins means changing token values only — see `systems/SKIN_SYSTEM.md`.

## Tier 1 / Tier 2 / Tier 3 tokens

The three layers of the token contract (`systems/TOKEN_CONTRACT.md`, `systems/SKIN_SYSTEM.md`):
- **Tier 1** — value tokens (colors, spacing, shadows — plain CSS custom properties).
- **Tier 2** — structural/variant tokens (this project's own addition beyond a value-only skin model — see `systems/PARAMETRIC_DESIGN_METHODOLOGY.md`'s gap analysis).
- **Tier 3** — full component-slot registry for structural swaps between skins.

## Bento grid

The molecule-tier layout pattern (`components/bento/`) that composes a project's header/responsibilities/skills/achievement slots per the `IProject` data model — see `systems/PROJECT_TEMPLATE.md`.

## The Envelope Rule

Every snap section must use `h-[calc(100vh-var(--chrome-navbar-height))]` explicitly, never `h-full` — see `GUARDRAILS.md` C-006. Settled after 4 failed attempts (`archive/decisions/LEGACY_DECISIONS_LOG.md`).

## The Leak Test

The check for whether the hexagonal boundary holds: if any external dependency can be replaced by adding a new adapter file and updating `App.tsx`, without touching any `core/` file, the architecture is sound. See `AGENT.md` §6 and `GUARDRAILS.md` C-001.
