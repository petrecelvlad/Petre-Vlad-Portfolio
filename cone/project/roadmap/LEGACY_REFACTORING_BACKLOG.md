# Codebase Refactoring Backlog & Implementation Strategy

## Executive Summary & Refactoring Goals
This document serves as the master backlog and execution checklist for systematic code quality, modularity, and design pattern refactoring across the application codebase (`src/`).

**Key Architectural Goals:**
1. **Open/Closed Principle (OCP)**: Eliminate direct conditional switches on skin types and rendering targets through Strategy and Registry patterns.
2. **Single Responsibility Principle (SRP)**: Decompose "God Components" (`SkillTree.tsx` and `DeskBoard.tsx`) into decoupled, single-purpose modules, custom hooks, and pure domain utilities.
3. **Decoupled Construction (Factory Pattern)**: Isolate widget creation logic into dedicated factory classes rather than scattering inline component instantiation.
4. **Decoupled Side-Effects (Observer Pattern)**: Replace direct callback dependencies with clean domain event notifications for audio, selection, and tracking side-effects.
5. **Clean Configuration**: Extract hardcoded magic numbers, timing constants, and default strings into centralized configuration modules.

---

## Phase 1: High-Priority Architectural Refactorings (OCP & Strategy Patterns)

### 1.1 Background Rendering Strategy Pattern
- [x] **Issue**: `src/components/backgrounds/GlobalBackground.tsx` uses explicit `if/else` checks on skin names (`'heritage'`, `'gamified'`, etc.) to render specific shader backgrounds.
- [x] **Impact**: Violates OCP; adding new themes requires editing `GlobalBackground.tsx`.
- [x] **Solution**:
  - [x] Create interface `IBackgroundStrategy` in `src/components/backgrounds/strategies/IBackgroundStrategy.ts`.
  - [x] Implement concrete background strategies (`HeritageBackgroundStrategy.tsx`, `GamifiedBackgroundStrategy.tsx`, `DefaultBackgroundStrategy.tsx`).
  - [x] Create `BackgroundStrategyRegistry.ts` to map skin identifiers to strategies.
  - [x] Refactor `GlobalBackground.tsx` to delegate rendering to the registry strategy.

### 1.2 Skin Rendering Strategy & Registry Refactoring
- [x] **Issue**: `src/adapters/primary/components/GamifiedShowcase.tsx` and `src/components/bento/registry.ts` rely on string-matched conditional switches to select skin views.
- [x] **Impact**: Tightly couples showcase components to all concrete skin implementations.
- [x] **Solution**:
  - [x] Define skin layout interfaces in `src/core/domain/skinStrategy.ts`.
  - [x] Register board layouts and component maps in a unified `SkinRegistry.ts`.
  - [x] Refactor `GamifiedShowcase.tsx` to dynamically pull board containers from the registry.

---

## Phase 2: Component Decomposition & SRP Enforcement

### 2.1 Deconstruct "God Component" `SkillTree.tsx` (1,105 lines)
- [x] **Issue**: `src/adapters/primary/components/SkillTree.tsx` combines SVG math, connection rendering, particle animations, state management, search indexing, audio triggers, and detail drawers.
- [x] **Impact**: Extremely fragile, hard to maintain, and impossible to unit test isolated logic.
- [x] **Solution**:
  - [x] Extract math & node position calculations into `src/core/domain/skillTreeGeometry.ts`.
  - [x] Extract canvas connection rendering to `src/adapters/primary/components/skilltree/SkillTreeConnections.tsx`.
  - [x] Extract node rendering into `src/adapters/primary/components/skilltree/SkillTreeNode.tsx`.
  - [x] Extract details panel component to `src/adapters/primary/components/skilltree/SkillDetailsPanel.tsx`.
  - [x] Extract banner component to `src/adapters/primary/components/skilltree/SkillTreeBanner.tsx`.
  - [x] Extract skill tree interaction state into custom hook `src/hooks/useSkillTreeState.ts`.

### 2.2 Refactor `DeskBoard.tsx` (652 lines)
- [x] **Issue**: `src/components/bento/skins/heritage/DeskBoard.tsx` mixes complex wood texture SVG definitions, clip paths, layout math, and item rendering.
- [x] **Impact**: Obscures layout logic with hundreds of lines of static SVG markup.
- [x] **Solution**:
  - [x] Extract SVG textures, clip paths, and filter definitions into `src/components/bento/skins/heritage/DeskBoardSVGAssets.tsx`.
  - [x] Extract layout constants and validation into `DeskBoardConstants.ts`.
  - [x] Modularize individual plank and desk section renderers into `DeskBoardPlank.tsx`.
  - [x] Clean up `DeskBoard.tsx` to act purely as a high-level layout composition board.

### 2.3 Refactor `GamifiedBoard.tsx` (582 lines)
- [x] **Issue**: `src/components/bento/skins/gamified/GamifiedBoard.tsx` contains duplicated SVG frame paths, banner graphics, corner badges, and parchment panel layouts.
- [x] **Impact**: Code bloat and lack of reuse across gamified UI elements.
- [x] **Solution**:
  - [x] Extract reusable gamified SVG elements into `src/components/bento/skins/gamified/GamifiedSVGAssets.tsx`.
  - [x] Extract banner plaque component into `GamifiedBannerPlaque.tsx`.
  - [x] Refactor `GamifiedBoard.tsx` to utilize these clean assets.

---

## Phase 3: Factory & Observer Pattern Integrations

### 3.1 Widget Abstract Factory Pattern
- [x] **Issue**: `GamifiedBoard.tsx` and `DeskBoard.tsx` directly import and conditionally instantiate widget components (`CorkboardNote`, `ToggleSwitch`, `EmergencyButton`, etc.).
- [x] **Impact**: Violates SRP and forces boards to maintain detailed knowledge of every widget type.
- [x] **Solution**:
  - [x] Create `BentoWidgetFactory.ts` in `src/components/bento/factory/BentoWidgetFactory.ts`.
  - [x] Map widget types to factory constructors.
  - [x] Provide clean factory methods `getWidgetComponent` and `createWidget(type, props)`.

### 3.2 Domain Event Observer for Side Effects
- [x] **Issue**: Direct callback invocation and tight coupling for audio triggers and selection events in `SkillTree.tsx` and `DeskBoard.tsx`.
- [x] **Impact**: Difficult to add new side effects (e.g. analytics, achievement popups) without modifying core UI event handlers.
- [x] **Solution**:
  - [x] Implement lightweight event dispatcher `src/core/events/DomainEventBus.ts`.
  - [x] Define domain events (`NodeSelectedEvent`, `SkillFilterChangedEvent`, `AudioEffectTriggeredEvent`).
  - [x] Integrate event publishing into `useSkillTreeState` hook.

---

## Phase 4: Configuration & Clean Code Standards

### 4.1 Centralize Magic Numbers & Timing Constants
- [x] **Issue**: `useTimelineOrchestrator.ts`, `JsonExperienceRepo.ts`, and visual transition hooks contain hardcoded delay numbers (`300`, `500`, `1000`) and key string constants.
- [x] **Impact**: Scattered configuration parameters; timing adjustments require multi-file edits.
- [x] **Solution**:
  - [x] Create `src/core/constants/timelineConfig.ts` for orchestrator timings and animation durations.
  - [x] Create `src/core/constants/themeConstants.ts` for skin identifiers and default configurations.
  - [x] Replace magic numbers and magic strings with typed constant imports.

---

## Progress Tracking Log
| Date | Task | Status | Notes |
| --- | --- | --- | --- |
| 2026-08-01 | Initial Refactoring Plan Drafted | Completed | Created master backlog and implementation guide |
| 2026-08-01 | 1.1 Background Rendering Strategy Pattern | Completed | Implemented IBackgroundStrategy, concrete strategies, BackgroundStrategyRegistry, and updated GlobalBackground |
| 2026-08-01 | 1.2 Skin Rendering Strategy & Registry | Completed | Defined ISkinStrategy, implemented SkinRegistry, BauhausBoard, and refactored slot resolution and GamifiedShowcase |
| 2026-08-01 | 2.1 SkillTree Component Decomposition | Completed | Extracted geometry, types, connections, node, panel, banner, and useSkillTreeState hook |
| 2026-08-01 | 2.2 DeskBoard Refactoring | Completed | Extracted DeskBoardSVGAssets, DeskBoardConstants, DeskBoardPlank, and refactored DeskBoard |
| 2026-08-01 | 2.3 GamifiedBoard Refactoring | Completed | Extracted GamifiedSVGAssets and GamifiedBannerPlaque, simplified GamifiedBoard |
| 2026-08-01 | 3.1 Widget Abstract Factory Pattern | Completed | Created BentoWidgetFactory for dynamic widget mapping and instantiation |
| 2026-08-01 | 3.2 Domain Event Observer for Side Effects | Completed | Implemented DomainEventBus for event dispatching and integrated with useSkillTreeState |
| 2026-08-01 | 4.1 Centralize Magic Numbers & Timing Constants | Completed | Created timelineConfig and themeConstants modules |
| 2026-08-01 | 4.2 WorkbenchMasterView Decomposition | Completed | Extracted WorkbenchFrameCanvas, WorkbenchHeaderControlBar, and WorkbenchOverlayWires |
| 2026-08-01 | 4.3 Laboratory Dedicated Page Navigation | Completed | Removed GamifiedShowcase from main portfolio scroll flow, added Laboratory option to plank dropdown |
| 2026-08-01 | 4.4 Game Boy Shader Background Strategy | Completed | Implemented GameBoyShaderBackground, GameBoyBackgroundStrategy, and registered in BackgroundStrategyRegistry & SkinContext |
