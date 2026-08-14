# Technical Specification: Hero Section 3-Column Layout & Anchoring System

## 1. Overview & Objectives

This document defines the formal layout architecture and technical specification for the 3-column `Hero` component layout (`src/adapters/primary/components/Hero.tsx`).

### Core Architectural Invariants
1. **Strict 30% / 40% / 30% Canvas Ratio**:
   - **Column 1 (Left Column)**: Exactly **30%** total canvas width (`lg:w-[29%]`, `lg:w-[30%]`).
   - **Column 2 (Middle Column)**: Exactly **40%** total canvas width (`lg:w-[39%]`, `lg:w-[40%]`).
   - **Column 3 (Right Column)**: Exactly **30%** total canvas width (`lg:w-[29%]`, `lg:w-[30%]`).
   - Content movement, additions, or re-ordering within any column **must never** alter or shrink these proportional column allocations.

2. **Deterministic Component Anchoring System**:
   - **Column 1 (Left Column)**: **Center Anchored** (`items-center`, `justify-center`, `text-center`). All child elements, artwork cards, and video widgets align strictly to the horizontal center of Column 1.
   - **Column 2 (Middle Column)**: **Center Anchored** (`items-center`, `justify-center`, `text-center`). Name typography, title badges, bio text blocks, and CTA action buttons align strictly to the horizontal center of Column 2.
   - **Column 3 (Right Column)**: **Right-Side Anchored** (`items-end`, `ml-auto`). The **entire set of components** (the 4 achievement rows comprising both the shader cards AND the white panels) align flush against the right side of Column 3 / right canvas edge.
   - **Internal Panel Text Centering**: Inside the white panels themselves, the metric number and label typography remain cleanly **centered** (`text-center`, `items-center`).

---

## 2. Canvas Ratio & Anchoring Specification

| Column | Canvas Ratio | Flex / Width Rule | Alignment Anchor | Component Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Column 1** (Left) | **30%** | `w-full lg:w-[30%] flex-shrink-0` | **Center** (`items-center`, `justify-center`) | Character card & video showcase centered horizontally |
| **Column 2** (Middle) | **40%** | `w-full lg:w-[40%] flex-shrink-0` | **Center** (`items-center`, `text-center`) | Candidate bio, typography, divider, CTA button centered horizontally |
| **Column 3** (Right) | **30%** | `w-full lg:w-[30%] flex-shrink-0` | **Right** (`items-end`) | 4 Shader cards & white panels anchored flush against right canvas edge; internal panel text stays centered |
| **Total Grid** | **100%** | `flex flex-col lg:flex-row w-full justify-between` | **Ratio Locked** | Full-width, unconstrained 3-column Hero canvas |

---

## 3. Structural Mechanics & Technical Implementation Plan

To ensure that column dimensions and alignment anchors remain invariant regardless of content changes:

### A. Column 1 Strategy (Left 30% - Center Anchored)
- **Container Structure**:
  ```tsx
  <div className="w-full lg:w-[29%] flex-shrink-0 flex flex-col items-center justify-center p-1 text-center">
    {/* Character selection video centered horizontally */}
  </div>
  ```

### B. Column 2 Strategy (Middle 40% - Center Anchored)
- **Container Structure**:
  ```tsx
  <div className="w-full lg:w-[39%] flex-shrink-0 flex flex-col items-center justify-between text-center mx-auto">
    {/* All child components, text, dividers, and CTAs centered */}
  </div>
  ```

### C. Column 3 Strategy (Right 30% - Right Anchored & Max Width Guardrail)
- **Container Structure**:
  ```tsx
  <div className="w-full lg:w-[30%] flex-shrink-0 flex flex-col items-end justify-between gap-2.5 sm:gap-3 lg:gap-4 pl-2 lg:pl-4">
    {achievements.map((item) => (
      <div key={item.id} className="w-full max-w-[380px] sm:max-w-[410px] lg:max-w-[430px] xl:max-w-[450px] flex-1 flex items-stretch justify-end gap-2 sm:gap-3">
        {/* Left Box: Shader Canvas (Scales down gracefully within max-width limit) */}
        <div className="flex-1 min-w-0 rounded-2xl ...">...</div>

        {/* Right Box: White Text Card (Text centered inside) */}
        <div className="w-[110px] lg:w-[145px] xl:w-[165px] flex-shrink-0 flex flex-col justify-center items-center text-center ...">
          <div className="text-center">{item.value}</div>
          <div className="text-center">{item.label}</div>
        </div>
      </div>
    ))}
  </div>
  ```
- **Rules**:
  - `items-end` keeps the 4 achievement rows anchored flush against the right boundary of Column 3.
  - `max-w-[480px] xl:max-w-[520px]` caps the row expansion on ultra-wide screens so the shader cards maintain a crisp, card-like aspect ratio instead of over-stretching horizontally.
  - Text inside the white cards stays centered.

---

## 4. Verification Checklist

1. **Doc Accuracy**: Specification updated to explicitly separate component right-anchoring from internal panel text centering.
2. **Build Verification**: `compile_applet` passed successfully.
3. **Visual Verification**:
   - Column 1 components strictly centered.
   - Column 2 components strictly centered.
   - Column 3 components (all 4 shader cards & white panels) anchored flush right into the former red box area.
   - White panel numbers and labels remain centered.

