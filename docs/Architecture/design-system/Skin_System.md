# Skin System
### How Skins Are Built, Swapped, and Constrained

---

## What This Document Is

`Token_Contract.md` defines *what* every token means and its current value. This document defines *how the swap actually works at runtime*, *what's allowed to vary between skins vs. what's structurally fixed*, and *the sequencing plan* for building and testing new skins without risking the ones already built. Read this before creating a second skin.

Origin: this system exists because five rounds of full-fidelity visual mockups were built and rejected (see `docs/Research/ANTI_PATTERNS.md`) — expensive, one-shot attempts with no way to compare or recover prior work. The parametric skin system exists specifically so that exploring a new visual direction is a token-value change, not a from-scratch rebuild, and no explored direction is ever lost.

---

## The Two-Tier Token Model

`Token_Contract.md`'s existing schema is the **value tier** — colors, spacing, type scale, timing. It answers "what color is this," not "does this exist at all." That distinction matters because the value tier's own premise — "swap the skin, change only values, nothing else changes" — does not survive a genuinely different visual grammar. A skin with no borders, blurred shadows instead of hard offsets, or no slot-machine motif isn't reachable by changing color/size values; it needs to turn structural choices on and off.

### Tier 1 — Value Tokens (`Token_Contract.md`)
Concrete values: `--color-coral: #FF9EBB`, `--radius-lg: 12px`, `--spacing-md: 16px`. Every skin defines a value for every token in this tier. This tier is unchanged by this document.

### Tier 2 — Structural/Variant Tokens (new, defined here)
Enum-like or boolean choices that change *which visual mechanism* is in play, not just its magnitude:

| Token | Values | Governs |
|---|---|---|
| `--depth-style` | `hard-offset` \| `soft-blur` \| `none` | Whether elevation reads as a flat offset shadow (current Bauhaus skin), a conventional blurred shadow, or no elevation cue at all |
| `--border-presence` | `on` \| `off` | Whether components render a visible ink border at all |
| `--motif-slot-machine` | `on` \| `off` | Whether the slot-casing/slot-surface motif (BentoHeader, BentoSkills) renders its physical-hardware treatment or falls back to a plain container |
| `--motif-dot-texture` | `on` \| `off` | Whether the background dot-grid texture renders |

A skin that sets `--border-presence: off` and `--depth-style: soft-blur` doesn't need every component rewritten — components read the structural token and branch their class composition once, centrally (see Implementation Shape below), not per-component.

**Rule:** a component may only reference Tier 2 tokens through a small number of shared primitives (`WindowCard`, `Card`, `Button`, the slot-motif wrapper). Individual leaf components never branch on `--border-presence` directly — that would scatter the same conditional across dozens of files, recreating the exact "Magic Value Scattering" problem the token contract exists to prevent.

**Gap acknowledged:** as of 2026-07-20, zero components read Tier 2 tokens yet — every border/shadow/motif class is still a hardcoded Tailwind utility (`border-2`, `shadow-raised`, etc.), same gap `Token_Contract.md` already tracks for Tier 1. Tier 2 is being defined now, wired later, deliberately kept minimal per DR-006 (lean now, deepen later) — these four rows are the ones the stress-test skin (see below) is expected to need, not a speculative complete set.

---

## Locked Constraints — Not Skin-Variable

Two things are true across every skin, decided explicitly rather than left as an accident of the current skin:

### The Skill Tree stays a literal game-tree, always
Per DR-008: the `SkillTree` component's branch/node visual chrome is a **fixed requirement**, not a `--motif-*` toggle. Do not add a "flat/organizational mode" escape hatch — that option was considered and explicitly rejected. The risk this used to justify (repeating the original "childish" complaint) is real and does not disappear; it is mitigated entirely through Tier 1 value choices per skin (line weight, palette restraint, absence of arcade-style glow/bounce animation) — never by suppressing the tree chrome itself.

### The Hero reserves an empty visual slot
Per DR-007: the Hero region has a layout reservation for an optional bespoke centerpiece visual (illustration, scene, photo treatment) that the *current* skin leaves empty. This is a layout/composition decision (a named empty region in the component tree), not a token — don't model it as a Tier 2 toggle. When/if a future skin fills it, the Hero's surrounding layout (stat tiles, name, role) should not need to move.

---

## Runtime Swap Mechanism

**Decision: runtime CSS custom properties, not build-time bundles.** A skin is a block of custom-property declarations scoped under a `data-skin` attribute, not a separately compiled CSS/JS bundle:

```css
:root[data-skin="bauhaus"] {
  --color-surface-base: #F7F4EB;
  --depth-style: hard-offset;
  --border-presence: on;
  /* ...full Tier 1 + Tier 2 set */
}

:root[data-skin="stress-test"] {
  --color-surface-base: #0A0A0A;
  --depth-style: soft-blur;
  --border-presence: off;
}
```

`<html data-skin="bauhaus">` is set at load (default) and can be swapped by changing the attribute — no rebuild, no route change, no remount. This is the mechanism that makes "play with skins until we find the right one" actually cheap.

**Why not build-time bundles:** a separate compiled CSS file per skin would need its own build step and couldn't be toggled live for side-by-side comparison, which is the entire point of doing this now rather than hand-rolling one-off mockups (the exact pattern `ANTI_PATTERNS.md` documents as having already failed five times).

**Tailwind v4 reconciliation:** Tailwind v4's `@theme` block in `src/index.css` currently *defines* token values directly (e.g. `--color-surface-base: #F7F4EB;` at `:root`-equivalent scope) — this is how Tailwind generates utility classes like `bg-surface-base`. For the skin system to work, `@theme` must declare tokens as *references* the runtime can override, not hardcoded values baked at build time. Practically: `@theme` keeps registering the token *names* so Tailwind's utility generation still works, but the actual color values move into the `[data-skin="..."]` blocks, with `@theme`'s own values acting only as the fallback/default (effectively the Bauhaus skin becomes `:root`'s implicit default, same as today, and every other skin is an explicit override block). This needs verification against Tailwind v4's exact `@theme` resolution order before the first non-default skin is wired — flagged as the riskiest assumption in this plan, to be verified against the stress-test skin, not assumed.

---

## Sequencing Plan

Per DR-006 (lean now, deepen later):

1. **Close the Tier 1 gap first.** `Token_Contract.md`'s existing HARDCODED/DEAD items (border widths, remaining font sizes, `--color-focus`, the `--color-rule` bug — see that doc's updated Gap Summary) get wired to real tokens. This is prerequisite groundwork — Tier 2 structural swapping is meaningless if half the visual surface still ignores tokens entirely.
2. **Wire the four Tier 2 tokens into the shared primitives** (`WindowCard`, `Card`, `Button`, the slot-motif wrapper) — not into leaf components.
3. **Build the stress-test skin.** Deliberately divergent placeholder values (`--border-presence: off`, `--depth-style: soft-blur`, `--motif-slot-machine: off`) — not a real design candidate. Purpose: find where this two-tier model breaks *before* investing real design effort in a second real skin. Expect to find gaps; this step is cheap specifically so gaps get found here.
4. **Only after 1-3 hold up:** pull reference from Vlad's own shipped games (`docs/Research/DECISIONS.md`'s Open section) to inform the first real second skin.

Do not skip to step 4. The stress-test skin is what makes step 4 fast instead of another round of the five-attempts pattern.

---

*Skin System · Experience Engine · 2026-07-20*
*Companion to `Token_Contract.md` (values) and `Skin_Bauhaus.md` (current resolution). See `docs/Research/DECISIONS.md` DR-006/007/008 for the decisions this document implements.*
