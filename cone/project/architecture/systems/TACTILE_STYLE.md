# The Tactile Design System: Universal Heuristics

## Overview
The **Tactile** design aesthetic transforms digital UI components into tangible, physical artifacts—evoking hand-crafted RPG game boards, parchment scrolls, forged metal brackets, and weathered wooden chassis. 

Rather than constraining layouts to a single fixed fantasy motif, these macro heuristics allow any AI agent or designer to build new tactile surfaces, structural frameworks, materials, or widgets while maintaining a unified, physical world-feel.

---

## Core Macro Heuristics

### 1. Physical Layering & Skeuomorphic Assembly
* **Overlapping Objects:** Components are treated as physical materials stacked in 3D space. Plates overlap, scrolls tuck underneath hanging wooden bars, and metal brackets clasp corners.
* **Proportional Dimensionality:** Parent structural frames are physical chassis (e.g., wooden plank, stone tablet, metal trim) that extend beyond or anchor child content surfaces (e.g., parchment, leather tray, inset slate).
* **Hard Grounding Outlines:** Every distinct physical piece uses a high-contrast dark stroke (e.g., `#1C1610` or dark iron contours) to visually separate layers and ground the object against its background.

### 2. Multi-Stop Specular Alloys & Surface Gradients
* **No Flat Colors for Materials:** Metal, wood, paper, and leather rely on multi-stop directional gradients (typically top-left light source down to bottom-right ambient shadow).
* **Alloy Customization:** 
  * *Blued Steel / Iron:* Cool slate-blue highlights down to deep obsidian/navy shadows (`#CBD5E1` -> `#64748B` -> `#334155` -> `#1E293B`).
  * *Aged Brass / Gold:* Bright warm cream highlights down to deep bronze/umber shadows (`#FFE5A3` -> `#D4A047` -> `#8C5828` -> `#4A2A0C`).
  * *Polished Silver:* Crisp white highlights down to neutral graphite shadow stops (`#FFFFFF` -> `#E2E8F0` -> `#94A3B8` -> `#334155`).
* **Directional Specularity:** Inset highlights (e.g., 1px light strokes on top edges) simulate light catching bevelled borders.

### 3. Constructed Fasteners & Joinery
* **Functional Hardware:** Mechanical or organic joins are explicitly visible. Corner brackets hold frame joints, rivets/nails pin hanging bars, and stitching lines accent paper or leather margins.
* **Micro-Detailing:** Fastener elements feature directional screw slots, highlight caps, and dark outline rings to feel three-dimensional at micro scales.

### 4. Recessed Trays & Inset Borders
* **Depth Trays:** Main content areas sit inside "recessed" trays formed by inner borders, dashed stitching lines, or inset shadows.
* **Nested Radius Math:** When rounded corners nest inside parent frames, the inner corner radius mathematically decreases relative to the outer corner radius minus the padding gap.

### 5. High-Legibility Tactile Typography
* **Outline & Drop Shadow:** Text on badges, banners, or plaques uses dark stroke outlines (`paintOrder="stroke fill"` or clean SVG text strokes) and tight drop shadows so bold labels remain readable against textured backgrounds.
* **Modern Legible Fonts:** While titles use strong display typography, body text and labels prioritize clean, highly legible sans-serif font stacks with elevated letter-spacing.

---

## Surface & Component Examples (Heuristic Reference)

* **Wooden Board Chassis:** Dark oak gradient background with a 3–4px dark outline stroke, corner metal brackets with directional rivets, and an elevated ribbon header.
* **Parchment Scroll Panel:** Top horizontal wooden hanging bar (wider than the scroll body) with dual silver/steel rivets. The parchment body hangs tucked slightly under the bar, featuring an inner dashed stitching border and cream-to-golden paper gradient.
* **Header Banner Plaque:** Hexagonal or V-notched crimson backplate with an inner gold dashed line and high-contrast bold typography centered on the frame line.
