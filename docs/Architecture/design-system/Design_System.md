# Design System: Bauhaus & Applet Styles

This project heavily leans into a whimsical, retro-tactile, bold aesthetic. We do NOT use glassmorphism or generic SaaS flat-design. We use pseudo-brutalism inspired by classic Mac OS classic chrome, Bauhaus geometry, and physical hardware.

## Core Visual Files
- `src/styles/applet.ts`: Contains specific window, button, and typography classes.
- `src/styles/bauhaus.ts`: Defines core structural primitives, borders, and shadows.
- `src/index.css`: The global Tailwind definitions, integrating variable colors.

## The Three Pillars of our UI:

### 1. Thick Borders and Hard Shadows
Elements should feel tangible. Instead of soft blurs for depth, we use solid offsets.
*   **The Applet Standard:** `border-2 border-ink rounded-[12px] shadow-applet-lg`
*   **The Bauhaus Standard:** `border-4 border-foreground bg-white shadow-bau-md`
*(Note: Use one style per component to maintain consistency. The Bento grids generally use the `applet` border styles).*

### 2. High-Contrast, Playful Color Palette
We do not use 50 shades of grey. Backgrounds and semantic elements use vivid mid-tones.
*   `bg-mint`
*   `bg-coral`
*   `bg-rose`
*   `bg-butter`
*   `bg-periwinkle`
*   `bg-lilac`

### 3. Deliberate Typography Constraints
- **Primary Body/Headers:** Clean, bold Sans Serif (Inter/System). Elements like the `BentoHeader` title use `font-bold tracking-tight`.
- **Labels, Dates, Buttons, Tech Tags:** `font-mono text-sm uppercase tracking-[0.1em]`. Our mono labels represent "system" text, making them distinctly feel like app UI components rather than print media.

## Interactive Elements
All buttons must have tactile feedback. When pressed (`active:`), they physically move down and their shadow reduces to `0`, simulating a mechanical switch.

*Example primary button from `applet.ts`:*
`bg-periwinkle text-white border-2 border-ink rounded-md shadow-[inset_0_-4px_0_var(--color-periwinkle-deep),_3px_3px_0_0_var(--color-ink)] active:translate-y-[4px] active:shadow-[inset_0_-4px_0_var(--color-periwinkle-deep),_0_0_0_0_transparent]`
