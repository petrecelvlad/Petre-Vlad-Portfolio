# Migration Plan: Unified UI & Parametric Design System

This document outlines the structured plan to migrate the existing codebase (currently employing a bespoke CSS-driven applet/bauhaus style) into a mathematically robust, token-driven **Parametric Design System**, adhering to the Unified UI philosophy.

## Phase 1: Codebase Audit & Extraction (Discovery)

**Findings from the current codebase:**
- **Styles & Hardcoded Values**:
  - `src/index.css` holds a comprehensive but highly specific palette (`--color-paper`, `--color-coral`, `--color-mint`, `--color-periwinkle`, etc.).
  - There are specific radius values (`--radius-sm`, `--radius-md`, `--radius-lg`) and shadows (`--shadow-applet-md`).
  - Many layout constructs rely on non-parametric raw CSS classes (e.g., `.window`, `.titlebar`, `.btn`, `.lights`, `.statusbar`).
- **Primitive Usage**:
  - `src/components/applet/Primitives.tsx` exposes some components (`AppletWindow`, `Button`), but internally composes them of raw nodes (`<article className="window">`, `<div className="titlebar">`). 
  - Organisms like `Hero.tsx` or Bento grids heavily mix custom component implementations with raw Tailwind and semantic HTML tags (`<div className="flex gap-4">`, `<h1 className="display mb-8">`).

**Goal**: Abstract the specific "Crayon Box" and "State" palette into a universal token infrastructure.

## Phase 2: The Parametric Foundation (Tokenization)

We will redefine the universal parameters in `src/index.css` and expose them seamlessly through Tailwind v4 configuration.

**Refactor Actions**:
1. Transform specific raw colors in `:root` into functional and surface-based semantic tokens (e.g., `--surface-base`, `--surface-elevated`, `--surface-inverse`, `--ink-base`, `--theme-accent`, `--theme-accent-hover`).
2. Map the "Crayon Box" colors to a parametric palette that allows rapid reskinning (e.g., mapping `--color-periwinkle` logic into `--theme-primary`).
3. Set standard geometry variables (`--radius-md`, `--spacing-md`, etc.).
4. Standardize physics (`--transition-defaults`, `--hover-transform`, `--active-transform`).

## Phase 3: The Atomic Layer (Forging Primitives)

We will introduce a strict `src/components/atoms/` directory.

**Refactor Actions**:
1. **Layout Atoms**: Create `<Stack>`, `<Row>`, `<Container>`, changing raw `flex` and `grid` nodes into generic structural elements.
2. **Typography Atoms**: Create `<Heading>`, `<Text>` which strictly consume typographic scales (replacing `<h1 className="display">` and `<p className="font-body">`).
3. **Interactive Atoms**: Rewrite `<Button>` internally to consume tokenized variables directly rather than relying on disparate CSS classes like `.btn-blue`.
4. **Structural Atoms**: Rewrite the window pane (`AppletWindow`) into `<Card>` or `<WindowCard>` building blocks that use token borders, colors, and shadows.

## Phase 4: Strict Composition Rule Implementation

We will enforce the "Mathematical Ban on Raw Nodes".

**Refactor Actions**:
1. Strip all raw `<div>` tags acting as flex or grid containers.
2. Replace them with `<Stack>` or `<Row>`.
3. Eliminate `<h1/h2/h3>` and `<p>` tags and replace them with parametric typography wrapper components (`<Heading>` and `<Text>`).
4. Ensure no inline colors, margins, or padding utilities are hardcoded (e.g., `mb-8`, `gap-4`). These must be handled via parameter scales passed to atomic wrappers like `<Stack gap="md">`.

## Phase 5: Architectural Rollout & Refactoring

**Migration Steps**:
1. **Foundational Swap**: Update `src/index.css` and configure Tailwind.
2. **Atomic Rollout**: Build `Stack.tsx`, `Row.tsx`, `Heading.tsx`, `Text.tsx`, and the refactored `Button.tsx` and `WindowCard.tsx`.
3. **Molecules & Organisms Swap**:
   - Refactor `src/adapters/primary/components/Hero.tsx`
   - Refactor `src/adapters/primary/components/Navbar.tsx`
   - Refactor BENTO grid structure (`src/components/bento/*`)
   - Refactor TIMELINE structures (`src/components/timeline/*`)
4. **Dead Code Elimination**: Prune obsolete utility classes and raw node structures remaining in the generic stylesheets.

This systematic approach ensures zero regressions while achieving a purely generative, parametric UI system capable of global structural changes via centralized token updates.
