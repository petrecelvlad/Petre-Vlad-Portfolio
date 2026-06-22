# Design System & Color Schema

This document centralizes our design system tokens to ensure cohesion across the entire app. Currently, we employ a **"Neo-brutalist / Playful Applet"** aesthetic. This style is characterized by bold, distinct outlines, highly saturated accent colors, "hard" vertical shadows, and a warm, tactile paper-like background.

## 1. The Color Palette

To maintain a cohesive look, all colors used in the app must belong to one of these semantic categories. Avoid using hardcoded colors (like `bg-white` or `text-black`); instead, rely on the CSS variables defined in `/src/index.css`.

### Surfaces (Backgrounds)
Surfaces are the foundation of our UI. They provide warmth and contrast for the bold elements that sit on top.

*   **`--surface-base` (`#FAF5E9`)**: The primary warm, paper-like background for the entire app.
*   **`--surface-soft` (`#FCF8EF`)**: A slightly lighter variant for inner cards or nested sections.
*   **`--surface-elevated` (`#F0EADB`)**: A slightly darker / richer variant for components that need to stand out from the base surface without being a bright color.
*   **`--surface-inverse` (`#1F1A24`)**: The dark off-black background used when we need to invert the section entirely (e.g., footers or dark modals).

### Ink (Text & Borders)
Ink is used for all typography, outlines, and structural borders. We use off-blacks to reduce eye strain while maintaining a high-contrast brutalist feel.

*   **`--ink-base` (`#1F1A24`)**: The primary text color and the color for all component outlines (`border-2 border-[var(--ink-base)]`) and hard shadows.
*   **`--ink-subtle` (`#4A434F`)**: Used for secondary text, descriptions, and metadata.
*   **`--ink-whisper` (`#8A8390`)**: Used for disabled text, placeholders, or subtle structural lines.

### Brand & Interactive
These colors dictate the primary theme of the application and interactive elements like primary buttons and main links.

*   **`--theme-accent` / `--theme-primary` (`#8B7FE8` - Periwinkle)**: The primary brand color. 
*   **`--theme-accent-hover` (`#6154B8`)**: The deepened version of the accent used for button active/hover states or inner shadows.

### The Playful Palette (Secondary / Accents)
Because we are building a playful portfolio/app style, we utilize a standardized set of vibrant, cheerful colors for cards, badges, and decorative elements. Each color has a `base` and a `deep` variant (used for inner shadows or pressed states).

*   **Coral**: `--color-coral` (`#F76E5E`) & Deep (`#C44E42`) — *Used for concluding dates, critical actions, or energetic highlights.*
*   **Mint**: `--color-mint` (`#5DD39E`) & Deep (`#3FA678`) — *Used for starting dates, success badges, and fresh active states.*
*   **Sky**: `--color-sky` (`#6BB3F0`) & Deep (`#3F84C4`) — *Used for primary windows and calm, informative areas.*
*   **Butter**: `--color-butter` (`#FFC864`) & Deep (`#C99A3D`) — *Used for achievements, warnings, or highlighted stats.*
*   **Periwinkle**: `--color-periwinkle` (`#8B7FE8`) & Deep (`#6154B8`) — *Our brand color, also used as an accent card color.*
*   **Rose / Lilac**: Expanding the palette for variety in skill badges or decorative elements.

## 2. Interactive Timeline Motion

The timeline is a core pillar of our "Playful Applet" identity. It uses a high-density scroll orchestration that feels tactile and mechanical.

### Motion Principles
*   **Connected Continuity**: The vertical track connects adjacent sections perfectly. As you scroll, the "liquid" periwinkle fills the current section's track up to a specific marker (the project circle) and then continues to the next.
*   **Bi-directional Logic**:
    *   **Filling (Top-Down)**: The bar grows downwards from the top of the section until it hits the milestone.
    *   **Retracting (Bottom-Up)**: When scrolling back up, the previously "consumed" full bar retracts upwards to stay at the milestone milestone.
*   **Impactful Reveal**: Markers (circles) don't just appear; they are "revealed" precisely when the filling/retracting track hits their coordinate.

## 3. Standardization Strategy (Next Steps)

To truly unify the app, we need to enforce this schema across all components:

1.  **Eliminate Naked Values**: Remove all instances of `bg-white`, `bg-black`, `border-black`, `text-black` from the codebase. Replace them with `bg-[var(--surface-base)]`, `bg-[var(--ink-base)]`, `border-[var(--ink-base)]`, etc.
2.  **Centralized CSS Variables**: Ensure `tailwind.css` (or `index.css`) maps these variables properly so we can eventually use Tailwind classes like `bg-surface-base` instead of the arbitrary bracket notation `bg-[var(--surface-base)]`.
3.  **Standardized Component Variants**: Ensure our core atoms (`Button`, `Badge`, `WindowCard`, `Card`) only accept standard color props (e.g., `variant="coral"`) and handle the CSS mapping internally, rather than accepting arbitrary classes wherever possible.
4.  **Shadows & Spacing**: Standardize the neo-brutalist shadows. Currently, we use `shadow-[var(--shadow-applet-md)]` which maps to `0 5px 0 0 var(--ink-base)`. We must make sure this isn't hardcoded randomly across different components.

## 3. Implementation Plan

If this schema looks good to you, we can proceed with:
1. Extending the Tailwind theme in our CSS so we can write cleaner classes (e.g. `bg-coral` instead of `bg-[var(--color-coral)]`).
2. Sweeping the current components to strip out hardcoded utility colors and replace them with our new semantic tokens.
