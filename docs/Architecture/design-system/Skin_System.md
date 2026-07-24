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

### Tier 2 — Structural/Variant Tokens (wired 2026-07-20)
Enum-like or boolean choices that change *which visual mechanism* is in play, not just its magnitude:

| Token | Values | Governs | Mechanism |
|---|---|---|---|
| `--border-presence` | `1` (on) \| `0` (off) | Whether components render a visible ink border at all | Real numeric switch. Multiplied directly into `--border-width-sm/md/lg`'s definitions in `index.css` (`calc(2px * var(--border-presence))`, etc.) |
| `--motif-dot-texture` | `1` (on) \| `0` (off) | Whether the background dot-grid texture renders | Real numeric switch. Multiplied into the dot color's alpha via `color-mix(in srgb, var(--color-ink-base) calc(var(--motif-dot-texture) * 100%), transparent)` |
| `--depth-style` | `hard-offset` \| `soft-blur` \| `embossed` \| `none` | Whether elevation reads as a flat offset shadow (Bauhaus), a conventional blurred shadow, a beveled/carved surface with ambient shadow (Heritage, added 2026-07-21, DR-017), or no elevation cue at all | Declarative label only. A skin realizes it by overriding `--shadow-raised`/`--shadow-sunken` directly (`Token_Contract.md` §11) — not by any component branching on this token |
| `--motif-slot-machine` | `on` \| `off` | Whether the slot-casing/slot-surface motif (`BentoHeader`, `BentoSkills`) renders its physical-hardware treatment or falls back to a plain container | Declarative label only. A skin realizes "off" by setting `--color-slot-casing`/`--color-slot-surface` to match its surface tokens, `--shadow-sunken: none`, and `--radius-slot` to match its standard card radius — not by any component branching on this token |

**Why two different mechanisms, not four of the same kind:** `--border-presence` and `--motif-dot-texture` gate *whether something renders at all* — a real boolean, expressible as a 0/1 multiplier against a single existing value token (border-width) or a single color's alpha channel (dot color via `color-mix()`). `--depth-style` and `--motif-slot-machine` gate *which qualitative treatment* applies across *multiple* tokens at once (a shadow's whole formula; three colors plus a radius) — CSS has no conditional operator that can switch between qualitatively different value shapes from one variable, and forcing one would mean every consuming component branches on it in JS, which is exactly the scattering the Rule below forbids. Realizing these two through direct value-tier overrides isn't a shortcut — it turns out to be the actually-correct mechanism, because `--shadow-raised`/`--shadow-sunken` and `--color-slot-*`/`--shadow-sunken`/`--radius-slot` were already the single points of indirection Tier 1 exists to provide.

**Rule (confirmed, not just aspirational — scoped to Tier 1 and Tier 2 only, see Tier 3 below for the deliberate exception):** as implemented, **zero React components reference any Tier 2 token.** `--border-presence` and `--motif-dot-texture` are consumed only inside `index.css`'s `@theme` block, at the point where the Tier 1 tokens they gate are *defined* — not at the point where components *consume* those Tier 1 tokens. This is stronger than the original plan (routing through a small set of shared primitives like `WindowCard`/`Card`/`Button`) — it required editing zero component files for Tier 2, only `index.css`. `--depth-style`/`--motif-slot-machine` are consumed nowhere in code at all; they exist purely as a documented contract a skin author fills in by overriding the relevant Tier 1 tokens directly.

**Verified 2026-07-20:** toggling `--border-presence: 0` and `--motif-dot-texture: 0` at runtime (via a devtools-level `:root` override, no file changes) correctly zeroed every border in the app and hid the dot texture, while leaving box-shadows (a `--depth-style` concern, untouched in the test) intact — confirming the two axes are genuinely independent, not coincidentally coupled.

**Two Tailwind v4 build gotchas found 2026-07-21 — both load-bearing, don't undo either without re-reading this:**
1. **All four Tier 2 default declarations must stay physically inside the `@theme` block.** Splitting them into a separate plain `:root { }` rule (which seemed like the "correct" place, since nothing about them needs Tailwind's utility-generation machinery) broke the entire CSS build — any `@theme` value that references a `var()` defined *outside* `@theme` corrupts Tailwind's internal processing, surfacing as a `[postcss] Unclosed bracket` error and a fully broken page (confirmed by manual bisection, not a guess). Keep the whole Tier 2 declaration + everything in `@theme` that references it in the same block.
2. **`--border-presence`'s own declared value gets silently dropped from Tailwind's compiled output**, even while correctly positioned inside `@theme` — almost certainly because Tailwind's `border-*` namespace matching sweeps anything starting with `--border-` into its border-utility processing and rejects `presence: 1` as an invalid shape for it (`--motif-dot-texture`/`--depth-style`/`--motif-slot-machine`, none of which start with a recognized Tailwind namespace prefix, are unaffected). Worked around with a fallback at every consumption site — `calc(2px * var(--border-presence, 1))`, `calc(var(--motif-dot-texture, 1) * 100%)` — so the mechanism is correct regardless of whether `--border-presence`'s own value is actually visible via `getComputedStyle`. Don't rename `--border-presence` to "fix" this without re-testing gotcha #1 doesn't reappear; the fallback is the safer, already-verified fix.

### `embossed` — the fourth `--depth-style` value, added 2026-07-21 (DR-017)
Closes the gap `Style_Extraction.md` named and left honestly unbuilt in DR-014: all three heritage references use a beveled surface (lighter edge catching light, darker edge in shadow) plus soft ambient shadow, not Bauhaus's flat hard-offset. Realized the same way every other `--depth-style` value is — pure `--shadow-raised`/`--shadow-sunken` overrides, zero component changes — using *layered* `box-shadow`, not a background gradient:

```css
--shadow-raised:
  inset 0 1.5px 0 0 rgba(255, 246, 219, 0.5),   /* top edge catches light */
  inset 0 -3px 0 0 rgba(36, 26, 16, 0.3),        /* bottom edge falls into shadow */
  0 var(--ui-depth) calc(var(--ui-depth) * 3) rgba(20, 14, 8, 0.4);  /* soft ambient shadow, not a hard offset */

--shadow-sunken:
  inset 0 3px 6px rgba(20, 14, 8, 0.5),          /* deep recess shadow — the socket */
  inset 0 -1px 0 0 rgba(255, 246, 219, 0.15);    /* faint floor highlight at the bottom of the recess */
```

**Why layered inset shadows instead of an actual background gradient:** a true gradient wash (closer to what Crown of Thrones' glossy HUD bar actually does) would mean `--color-surface-*` tokens stop being flat colors, which breaks every consumer currently applying them via `background-color` (Tailwind's `bg-surface-base` etc.) — a Tier 1 semantics change with a much larger blast radius than a shadow swap. The inset-highlight/inset-shadow pair is a standard CSS emboss technique that reads as a beveled edge without touching how any component applies its surface color. Flagged here as a real gap, not hidden: if this reads as insufficient once seen live next to the references, the gradient-background route is the next lever, but it's a separate, larger change.

**On the reference-set question `Style_Extraction.md`'s Open Questions left open** ("does a second, independent reference set need to confirm the embossed trait before building it?"): not resolved by gathering new references — resolved by direct instruction (Vlad, 2026-07-21) after the first `heritage` pass was rejected specifically for still reading as Bauhaus underneath its recolored surfaces. The trait was already cross-game within the existing set (Castellum *and* Crown of Thrones both show it), just not cross-*set*. Worth revisiting if a genuinely independent second reference set ever contradicts it.

**Correction (2026-07-21, same day, see DR-017's own correction) — this mechanism does not actually work.** Verified via `getComputedStyle`, not just a screenshot, after Vlad reported `heritage` still visibly showed Bauhaus's shadow: Tailwind v4 compiles `.shadow-raised` to `--tw-shadow: 0 var(--tw-shadow-color, var(--ui-depth)) 0 0 var(--shadow-color); box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);` — it inlines `--shadow-raised`'s `@theme` default *expression* into `--tw-shadow` at build time; the compiled utility never references `--shadow-raised` by name, only its sub-parts `--ui-depth`/`--shadow-color`. A skin overriding `--shadow-raised` wholesale (as `embossed` does, and as the deleted `stress-test` skin's `soft-blur` attempt did before it) has no effect through this utility class. This is a real, unfixed gap in the mechanism this document describes — not a documentation error, a runtime one. A fix exists in principle (consume the token via Tailwind's arbitrary-value bracket syntax at each call site, `shadow-[var(--shadow-raised)]`, which does compile to a live reference — confirmed by testing `box-shadow: var(--shadow-raised)` directly via inline style, which resolved correctly) but was not implemented; work redirected to a different approach (DR-018, "ME" skin) before this was fixed. Anyone picking `--depth-style` back up for a CSS-token skin needs to apply that fix first — don't assume this table's `embossed` row is live.

**Update (2026-07-21, DR-019) — the bracket-syntax fix is now applied for real, once.** `heritage`'s clipboard (`skins/heritage/BentoResponsibilities.tsx`) consumes `shadow-[var(--shadow-raised)]`/`shadow-[var(--shadow-sunken)]` instead of the `.shadow-raised`/`.shadow-sunken` utility classes, and `getComputedStyle` confirms the embossed layered shadow now genuinely renders. Still scoped to this one component, not retrofitted everywhere else `.shadow-raised`/`.shadow-sunken` is used — those other call sites remain silently inert for any skin that overrides the shadow token, exactly as this section already warned.

**A related but distinct gotcha, found while fixing `--font-hand` the same way (DR-019):** the arbitrary-bracket approach is not automatically safe just because it compiles to a live `var()` reference — it still has to *win* against any other utility class targeting the same CSS property. `font-[family-name:var(--font-hand)]` lost to the `Text` atom's own default `font-body` class (both single, equal-specificity classes; Tailwind's generated-stylesheet order decided the winner, not the order the classes appear in `className`). Fixed with an inline `style={{ fontFamily: 'var(--font-hand)' }}` instead — inline styles always beat a utility class. `shadow-[var(--shadow-raised)]` above didn't hit this because nothing else in that component's class list also sets `box-shadow`. Check for a competing utility before trusting a new arbitrary-bracket consumption site.

**Hard rule, stated explicitly after it was violated once (2026-07-24, Vlad) — heritage never uses gradients, anywhere, for any purpose, including "just for a depth cue."** A page-tabs component was built with a CSS/SVG gradient (`linear-gradient`/`<linearGradient>`) standing in for the embossed depth effect — visually similar to the real thing at a glance, but the wrong mechanism, not a smaller version of the right one. `embossed` is, and has only ever been, a pair of **solid, non-gradient** inset box-shadows (a light bar at the top, a dark bar at the bottom — see the exact rgba values above) plus a soft ambient shadow. There is no gradient anywhere in this skin's design language, and no future component should introduce one to approximate this effect or any other — always reach for `var(--shadow-raised)` / `var(--shadow-sunken)` directly, exactly as already applied, never a hand-rolled gradient standing in for it. Real consumers as of this correction: `BentoAchievement.tsx` (bauhaus fallback, still heritage-scoped), the clipboard board and page tabs in `BentoResponsibilities.tsx`, and `BinderClip` (same file). Any new hard-surface component joins this list via the same two lines of CSS — it does not get its own gloss/emboss constants. A parallel, code-level version of this same rule lives in `src/components/bento/skins/heritage/palette.ts`'s top-of-file comment block — read that one when actually writing the component, this one is the "why."

---

## Tier 3 — Component Slots (full structural swap, added 2026-07-21)

Tier 1 and Tier 2 both assume a fixed DOM shape and only vary what fills it — a value, or whether an already-existing structural element renders at all. Neither can change *what shape a region is*. That ceiling is real: the "heritage" skin (DR-014) recolored `WindowCard`'s titlebar-and-traffic-lights chrome, `BentoHeader`'s slot-machine badge, and `BentoAchievement`'s bordered banner without changing any of their shapes, because none of those shapes are token references — they're plain JSX. DR-010 predicted this exact case and deferred it ("would need real component-level branching after all — revisit then, don't build for it now"). DR-015 is that revisit.

**The mechanism:** the four non-locked project-card regions are named **slots**, matching the existing `--role-*` accent tokens (`Token_Contract.md` §03.5) 1:1:

| Slot | Port (props contract) | Bauhaus adapter (default/fallback) | Heritage adapter |
|---|---|---|---|
| `header` | title, icon, startDate, endDate | `skins/bauhaus/BentoHeader.tsx` | `skins/heritage/BentoHeader.tsx` — no-op, absorbed into `responsibilities` (DR-019) |
| `responsibilities` | responsibilities[], role, +title/icon/startDate/endDate (optional, DR-019) | `skins/bauhaus/BentoResponsibilities.tsx` | `skins/heritage/BentoResponsibilities.tsx` — clipboard, DR-016/DR-019 |
| `skills` | skills[] | `skins/bauhaus/BentoSkills.tsx` | `skins/heritage/BentoSkills.tsx` — DR-016 |
| `achievement` | achievement? | `skins/bauhaus/BentoAchievement.tsx` | — (inherits Bauhaus) |

**Slot absorption (added 2026-07-21, DR-019):** a skin's adapter for one slot is allowed to
intentionally render nothing (return `null`) and fold that slot's content into a different slot's
adapter instead — heritage's `header` is a no-op because the title/icon/dates it would have shown
now render on the `responsibilities` clipboard's paper. This requires the receiving slot's port to
widen with the absorbed fields as *additive optional* props (same discipline as `accentToken` in
DR-013) so the donor skin's (Bauhaus's) adapter for the receiving slot is completely unaffected —
it simply never reads the new optional fields. This is a real, documented option for any future
skin whose object metaphor doesn't map 1:1 onto the four existing slots, not a one-off hack.

(paths relative to `src/components/bento/`.) The port types themselves (`HeaderSlotProps`, `ResponsibilitiesSlotProps`, `SkillsSlotProps`, `AchievementSlotProps`) live in `src/components/bento/ports.ts`, imported by every adapter — this is what makes the port a real, TS-enforced contract rather than incidental duck-typing.

Each slot's props are typed against `IProject` fields only — content stays domain-driven, chrome does not. This is the same port/adapter split the codebase already uses for data (`IExperienceRepository` → `JsonExperienceRepo`), applied one layer up to presentation. A skin registers an **adapter** — any component implementation satisfying the slot's port — in `src/components/bento/registry.ts`:

```ts
type SlotName = 'header' | 'responsibilities' | 'skills' | 'achievement';

const REGISTRY: Record<SkinId, Partial<Record<SlotName, React.ComponentType<any>>>> = {
  bauhaus: { header: BauhausHeader, responsibilities: BauhausResponsibilities, skills: BauhausSkills, achievement: BauhausAchievement },
  heritage: { responsibilities: HeritageResponsibilities, skills: HeritageSkills },
};

function resolveSlot(skin: SkinId, slot: SlotName) {
  return REGISTRY[skin]?.[slot] ?? REGISTRY.bauhaus[slot];
}
```

`heritage`'s two adapters share an internal `HeritagePanel` (`skins/heritage/Panel.tsx`) — thick border, chunky radius, `shadow-raised` outer frame, title rendered as an inset `shadow-sunken` plaque instead of a full-width titlebar bar, no traffic lights at all. That plaque treatment deliberately reuses the sunken-socket motif `Style_Extraction.md` already confirmed as a cross-reference constant across both reference games (originally applied there only to item/icon slots) — not a newly invented motif for this pass. `Panel.tsx` is local to `skins/heritage/` only, not a shared cross-skin primitive — each skin's Tier 3 implementation is meant to stay independent (see DR-015's Consequences on why coupling skins to each other would undercut the point of this tier).

`ProjectDetails.tsx` (already reads `useSkin()` for `data-skin` scoping) calls `resolveSlot(skin, 'header')` etc. instead of statically importing `BentoHeader` directly — the only call-site change this requires.

**Fallback is per-slot, not all-or-nothing:** a skin that doesn't register a slot inherits Bauhaus's adapter for it. This means a new skin can start by overriding just `header` and ship immediately with the other three still Bauhaus-shaped, rather than needing all four rebuilt before it's viewable at all — same lean-now bias as DR-006, applied to the more expensive Tier 3 mechanism.

**What Tier 3 does not replace:** Tier 1/Tier 2 remain the correct, cheaper mechanism for any skin that's happy with Bauhaus's shapes and only wants different values or on/off structural treatment — most skins should need this, not Tier 3. Tier 3 exists specifically for the case a skin needs a shape Bauhaus's adapters cannot express at all.

**Locked, not reopened by this tier:** `BentoVideoFrame` is never a slot — it stays governed by DR-013's permanent `--chrome-device-*` lock. `WindowCard` is not deleted, moved, or deprecated by this change; it remains a general atom in `components/atoms/`. Bauhaus's own adapters keep using it, and a future skin's adapter may reuse it too if it genuinely wants windowed chrome — but no skin is routed through it by default anymore.

**Verification requirement, distinct from Tier 1/2's `getComputedStyle` check:** a Tier 3 adapter can't be verified by inspecting computed style alone, since the thing being changed is DOM shape, not a CSS value — confirm via a rendered screenshot of the actual slot *and* a check that the port contract is genuinely satisfied (no prop silently ignored, no content field dropped) before calling a new adapter done.

---

## Tier 4 — Illustrated Scene (experimental, concept stage, added 2026-07-21)

**Nothing in this tier is built yet.** Documented now, at concept stage, because it's a genuinely different mechanism from Tiers 1–3, not an extension of them — a future session needs to know it was deliberately chosen, not stumbled into. Full creative concept lives in `docs/Research/Philosophy/ME_Skin.md`; this section is the mechanism only. See DR-018 for the decision and why now.

**What's different from every other tier:** Tiers 1–3 all compose the visible chrome from CSS and React DOM — a value, a structural switch, or a swapped component, but always something the browser lays out and paints from markup. Tier 4 instead uses a single pre-rendered illustration (AI-generated, one cohesive scene — a top-down view of a desk) as the entire visual chrome for the region it covers, with real content (video, text) absolutely positioned on top of it as overlays. The image *is* the design; nothing about its composition is expressed as a token.

**Mechanism, as currently understood (unbuilt, so treat as a working sketch, not a spec):**
- A skin using Tier 4 supplies one background image at a fixed aspect ratio for the region it covers (likely the whole project-card area, not per-slot — the desk concept is one continuous scene, not four independent panels).
- Each piece of real content (the video/screenshot, the responsibilities text, whatever `header`/`skills`/`achievement` resolve to) is positioned via coordinates tuned to that specific image — percentage-based, so *some* scaling survives, but fundamentally coupled to one fixed composition, not Tailwind's responsive breakpoint model.
- This does not obviously reuse `ProjectDetails.tsx`'s current `grid-cols-[40%_1fr]` layout or the Tier 3 slot registry as-is — a Tier 4 skin most likely needs its own layout branch, resolved the same way Tier 3 adapters are (keyed off `useSkin()`), but the shape of that resolution isn't designed yet. Flagged as the first real engineering question to answer before building anything, not answered here.
- A Tier 4 skin is not required to cover every region with illustrated chrome — per DR-006's lean-now bias, it could illustrate the desk/phone/clipboard and still fall back to a Tier 1–3 treatment (or a Bauhaus/heritage adapter) for whatever isn't painted into the scene yet.

**What this trades away, on purpose (see DR-018's Consequences for the full accounting):** responsive flexibility (fixed composition, no defined mobile fallback yet), and the fast-iteration/never-lose-a-direction property the whole rest of this system was built around — regenerating an illustration is a much coarser unit of change than editing a token. Both are named, conscious trades per DR-018, not oversights.

**Authoring process — deliberately not written yet:** `Style_Extraction.md` was written *after* running the heritage extraction once, from what actually worked, not designed speculatively in advance. The same discipline applies here — don't write a "scene composition + hotspot mapping" process doc until a first real Tier 4 attempt exists to write it from.

---

## Locked Constraints — Not Skin-Variable

Three things are true across every skin, decided explicitly rather than left as an accident of the current skin:

### The device shell chrome never varies
The "black mobile frame" around the project card's screenshot/video (`BentoVideoFrame`'s outer shell, hardware buttons, and notch) is pinned to `--chrome-device-shell` / `--chrome-device-shadow` — two tokens declared once in `@theme` as **hardcoded literals**, not `var()` aliases to `--color-ink-base`/`--shadow-raised`. This distinction matters, for the reason in the next section: an alias declared once at `:root` does *not* automatically track a descendant skin's override of the thing it points to, so pinning via alias wouldn't even reliably lock anything — a plain literal is both simpler and correct here. No skin block may ever declare `--chrome-device-shell` or `--chrome-device-shadow` — doing so would unlock the frame.

### A var()-alias does not track a descendant skin's override, ever — confirmed by computed-style testing, 2026-07-21
This bit an actual mockup attempt (the "heritage" skin, DR-014) and is worth stating as its own rule, not just a footnote: `--role-header-accent: var(--color-coral)`, declared once in `@theme` (effectively at `:root`), computes its value **once, at `:root`, using `:root`'s own `--color-coral`** — and that already-resolved value is what inherits down, unchanged, to every descendant. Overriding `--color-coral` inside a `[data-skin="..."]` block on a descendant element does **not** cause `--role-header-accent` to re-resolve against that override — `getComputedStyle` on the scoped element still reports the original `:root` value. The only fix is for the skin block to *also* explicitly restate the alias itself (`--role-header-accent: var(--color-coral);`, same right-hand side, redeclared inside the skin's own block) — this moves the winning declaration for that property onto the scoped element, so its substitution happens using *that* element's environment instead of `:root`'s.

This invalidates an earlier claim in this document and in `index.css` (that `--surface-base`'s backward-compat alias "correctly follows skin swaps") — never actually verified, wrong for the identical reason. It happens to be harmless today only because nothing currently consumes `--surface-base` (the bare alias, not `--color-surface-base`) under an active non-default skin scope — `Primitives.tsx` reads it but is dead code (imported in `Timeline.tsx`, never rendered). Left as-is, flagged here rather than fixed, since touching dead code isn't this fix's job.

**Rule going forward:** every `--role-*` (or any future alias-style) token that a skin wants to retarget must be explicitly restated inside that skin's own block, even if the right-hand side is identical to the default. Relying on "override the palette, the alias will follow" does not work in CSS, however intuitive it looks.

### The Skill Tree stays a literal game-tree, always
Per DR-008: the `SkillTree` component's branch/node visual chrome is a **fixed requirement**, not a `--motif-*` toggle. Do not add a "flat/organizational mode" escape hatch — that option was considered and explicitly rejected. The risk this used to justify (repeating the original "childish" complaint) is real and does not disappear; it is mitigated entirely through Tier 1 value choices per skin (line weight, palette restraint, absence of arcade-style glow/bounce animation) — never by suppressing the tree chrome itself.

### The Hero reserves an empty visual slot
Per DR-007: the Hero region has a layout reservation for an optional bespoke centerpiece visual (illustration, scene, photo treatment) that the *current* skin leaves empty. This is a layout/composition decision (a named empty region in the component tree), not a token — don't model it as a Tier 2 toggle. When/if a future skin fills it, the Hero's surrounding layout (stat tiles, name, role) should not need to move.

---

## Runtime Swap Mechanism

**Decision: runtime CSS custom properties, not build-time bundles.** A skin is a block of custom-property declarations scoped under a `data-skin` attribute, not a separately compiled CSS/JS bundle:

```css
[data-skin="new-skin"] {
  --color-surface-base: #0A0A0A;
  --depth-style: soft-blur;
  --border-presence: off;
}
```

`<html data-skin="bauhaus">` is set at load and is never overridden by any CSS rule — Bauhaus is `@theme`'s implicit default, not an explicit override block, so nothing keys off `:root[data-skin="bauhaus"]`.

**Scoping (corrected 2026-07-21 — the note this replaced claimed this was already true when it wasn't):** the override selector is a plain attribute selector (`[data-skin="stress-test"]`), not `:root[data-skin="stress-test"]`. CSS custom properties inherit down the DOM tree, so whichever element actually carries `data-skin="stress-test"` becomes the override's scope root — everything under it picks up the new values, everything outside it (including siblings) keeps whatever it inherits from `<html>`. `SkinContext.tsx` holds the active skin in React state; `Navbar`'s `<select>` writes to it; `ProjectDetails.tsx`'s own root element reads it and renders `data-skin={skin}` directly — so today's actual scope is the project card, matching what step 3 of the Sequencing Plan below always intended. `<html>`'s `data-skin="bauhaus"` is unaffected by the switcher and never changes at runtime; it exists as a semantic default only. Swapping the card's skin is still live, no rebuild, no remount — same cheapness as before, just correctly confined.

**Why not build-time bundles:** a separate compiled CSS file per skin would need its own build step and couldn't be toggled live for side-by-side comparison, which is the entire point of doing this now rather than hand-rolling one-off mockups (the exact pattern `ANTI_PATTERNS.md` documents as having already failed five times).

**Tailwind v4 reconciliation:** Tailwind v4's `@theme` block in `src/index.css` currently *defines* token values directly (e.g. `--color-surface-base: #F7F4EB;` at `:root`-equivalent scope) — this is how Tailwind generates utility classes like `bg-surface-base`. For the skin system to work, `@theme` must declare tokens as *references* the runtime can override, not hardcoded values baked at build time. Practically: `@theme` keeps registering the token *names* so Tailwind's utility generation still works, but the actual color values move into the `[data-skin="..."]` blocks, with `@theme`'s own values acting only as the fallback/default (effectively the Bauhaus skin becomes `:root`'s implicit default, same as today, and every other skin is an explicit override block). This needs verification against Tailwind v4's exact `@theme` resolution order before the first non-default skin is wired — flagged as the riskiest assumption in this plan, to be verified against the stress-test skin, not assumed.

---

## Sequencing Plan

Per DR-006 (lean now, deepen later):

1. ~~**Close the Tier 1 gap first.**~~ **Done 2026-07-20.** All 8 tracked gaps closed, plus several hardcoded values found and wired that weren't on the original list (`BacklogView`, `App.tsx` footer, two mis-wired `--text-label` call sites). See `Token_Contract.md`'s Gap Summary — 0 remaining.
2. ~~**Wire the four Tier 2 tokens.**~~ **Done 2026-07-20.** Turned out not to require touching `WindowCard`/`Card`/`Button`/a slot-motif wrapper as originally planned — see the Tier 2 table above for the actual (leaner) mechanism. Verified working at runtime.
3. ~~**Build the stress-test skin.**~~ **Done 2026-07-20**, initially applied via `data-skin` on `<html>` — which, despite the sequencing note below, was not actually scoped to the project card: any `:root[...]`-keyed override cascades to the whole page regardless of which DOM node the attribute sits on. Caught 2026-07-21 when the switcher visibly recolored the entire portfolio, not just the card. `[data-skin="stress-test"]` added in `index.css`, exercising all four Tier 2 tokens plus a Tier 1 palette swap (reusing `Skin_Bauhaus.md`'s existing Dark OLED example values). A real skin switcher was also added — a `<select>` in `Navbar` (default "Bauhaus", second option "Test") backed by `SkinContext`. Verified against the actual project card (WindowCard/BentoHeader/BentoSkills/BentoVideoFrame/BentoAchievement): borders correctly disappear, shadows correctly go soft-blur, the slot motif correctly flattens, text stays legible — no visual regressions, no console errors.
   **Gap found, confirmed out of scope for now:** the `SkillTree` pill backgrounds (`PILL_BG` in `SkillTree.tsx`) are light pastel tints designed to pair with near-black `--color-ink-base` text. Under the stress-test skin's dark palette, `--color-ink-base` flips to near-white, which loses contrast against those same unchanged light pill backgrounds — a real WCAG AA failure in that section. Not fixed, since SkillTree was explicitly out of scope for this pass — flag before this skin (or any dark-leaning skin) is ever extended past the project section. (Now moot for the project-card-only case since scoping no longer reaches `SkillTree` at all — still relevant the day a skin is extended beyond the card.)
   **Removed 2026-07-21 (DR-016):** its verification purpose is superseded now that a real skin (`heritage`) exercises the same mechanism directly — deleted from `SkinContext.tsx`'s `SKINS`, `index.css`, and `registry.ts`. This step's account of what was built and verified at the time stays as-is; the skin itself no longer exists in the codebase.
3.5. ~~**Actually scope the override to the card, and make each project-card component independently retargetable.**~~ **Done 2026-07-21.** Two changes: (a) the scoping fix described in step 3's correction above — `data-skin` moved off `<html>` onto `ProjectDetails`'s own root via `SkinContext` (mirrors `VideoPrefsContext`), CSS selector dropped `:root`. (b) a new component-identity token layer — `--role-header-accent`, `--role-responsibilities-accent`, `--role-skills-accent`, `--role-achievement-accent` (Token_Contract.md §03.5) — sits between the raw palette and `WindowCard`/`Badge`'s `color` prop. Each of `BentoHeader`/`BentoResponsibilities`/`BentoSkills`/`BentoAchievement` now reads its own role token (via a new additive `accentToken` prop, plain `bg-[var(...)]` for the one non-`WindowCard` consumer) instead of a shared palette name, so a mockup skin can retarget any single one of the four without touching the others or any component file. `BentoVideoFrame`'s device shell was pulled out of the skin system entirely via the new `--chrome-device-*` lock (see Locked Constraints above) rather than being made variable — the mobile frame was never meant to be a mockup axis.
4. ~~**Pull reference from Vlad's own shipped games.**~~ **First pass done 2026-07-21** (DR-014) — see `Style_Extraction.md` for the process and the "heritage" skin for the result. Explicitly a first pass, not a finished second-skin candidate: one reference set (3 screenshots, 2 games), no motion/interaction voice considered, one real gap (embossed/gradient depth) approximated rather than built. Next pass should widen the reference set before treating any single-reference-set finding as confirmed personal voice.
5. ~~**Wire the Tier 3 slot registry.**~~ **Done 2026-07-21** (DR-015). Vlad reviewed "heritage" and rejected it — not the values, the fact that every region was still the same shape underneath. Triggered adding Tier 3 (see the section above) rather than iterating further on heritage's values, since more value iteration cannot fix a shape ceiling. Bauhaus's four `Bento*` components moved into `skins/bauhaus/` as-is; `registry.ts` and the per-slot props contracts (`ports.ts`) added; `ProjectDetails.tsx` rewired to resolve through it. Verified via `tsc --noEmit` and a live render — Bauhaus unchanged pixel-for-pixel, no console errors.
6. ~~**Build a real Tier 3 adapter, prove the mechanism, retire `stress-test`.**~~ **Done 2026-07-21** (DR-016). `stress-test` deleted (its verification purpose is superseded by a real skin doing the same job). `heritage` gets real `responsibilities`/`skills` adapters — `HeritagePanel`, no titlebar bar, no traffic lights, sunken-plaque title treatment reusing the confirmed sunken-socket motif from `Style_Extraction.md`. `header`/`achievement` intentionally left on Bauhaus's fallback for this pass — see DR-016's Consequences for why that's an honest partial state, not a hidden gap.

Do not skip ahead of unfinished earlier steps. The stress-test skin (while it existed) is what made step 4 fast instead of another round of the five-attempts pattern; Tier 3 only exists to fix a ceiling steps 1–4 already ran into for real, not as a default starting point for a future skin that hasn't tried the cheaper tiers first.

---

## Relationship to `docs/Parametric Unification/` (the UDS/Hive spec)

`docs/Parametric Unification/` specifies a separate, much larger system — the Universal Design System (UDS), built for a different platform ("Hive"), intended to be domain-agnostic and sold commercially as a Skeleton + Skins + Domain Packs product line. It was reviewed against this document on 2026-07-20 (see DR-009). Conclusion: **adopt one specific piece of discipline, adopt nothing else.**

### Where the two systems genuinely agree
UDS's Layer 5 defines a Skin as "a complete set of resolved token values... structure and skin are genuinely independent" — the same core claim this document and `Token_Contract.md` make. Its token categories (color/typography/spacing/shape/elevation/motion/icon) map cleanly onto this project's existing Tier 1. No conflict, no new information — convergent validation that the value-tier model is sound.

### Where UDS is actually thinner than what this project needs
UDS's own text is explicit: *"A Skin does not contain: Component structure... Layout structure... Behavior."* Every UDS Skin example (`SaaS Dark` vs. `Editorial Warm`) differs only in token *values* — never in whether a border, a shadow style, or a motif renders at all. UDS has no equivalent to this document's Tier 2. That's not an oversight on UDS's part — it's a consequence of being deliberately domain-agnostic, which lets it assume structure never needs to vary. This project's actual design history (`ANTI_PATTERNS.md`) proves that assumption false for a single bespoke product: the five rejected directions differed structurally (thick-border neo-brutalism vs. flat editorial vs. illustrated isometric), not just in color. Tier 2 exists because UDS's model, taken as-is, would not have been sufficient here.

### Why the L1–L4 taxonomy (Primitives/Constructions/Compositions/Layouts) is out of scope for this project
Three independent reasons, not one:
1. **Cost/benefit, per DR-006.** Migrating this codebase's real, already-implemented component tree (`WindowCard`, `Button`, `SkillTree`, `BentoHeader`, `Timeline`, etc. — see `OVERVIEW.md`'s Component Tiers) onto UDS's 80-Primitive/47-Construction/38-Composition taxonomy would be a large nominal rewrite with no functional payoff for a single-product portfolio site. The existing hexagonal + atomic tiers already do the job this taxonomy would do, at a scale that actually matches this project.
2. **Domain fit.** UDS is deliberately generic — built to cover SaaS/e-commerce/editorial/mobile/dashboard without modification. It has no concept of a `SkillTree` or a `TimelineTrack` because those aren't universal; grep of `Layer3.md`/`Layer4.md` confirms no domain-specific pattern like it exists in the spec, nor should it.
3. **Philosophical conflict, not just a cost one.** UDS's stated goal is formal genericity — "any valid interface for any product." This project's entire design brief (`LESSONS.md`, `ANTI_PATTERNS.md`) is the opposite: escaping "genre-assembly," finding a voice that does *not* read as assembled from a reusable, universal system. Building this specific artifact's UI out of a maximally generic universal component taxonomy would work against the actual brief, independent of migration cost.

### What is worth borrowing
UDS's Layer 5 materialization protocol includes two concrete, cheap checks this document didn't previously specify: **every Skin's token set must pass WCAG AA contrast**, and **every Layout must be verified at defined breakpoints**. Both are good discipline regardless of taxonomy. Added to this project's stress-test-skin step (Sequencing Plan, step 3): before calling any skin (including the throwaway stress-test one) done, check its token values for WCAG AA contrast and verify the affected components at the breakpoints already in ad hoc use across components (Tailwind's default `md:` / `lg:` prefixes — this project has no dedicated breakpoint doc yet; don't introduce UDS's 375/768/1280 set as if it were one).

---

*Skin System · Experience Engine · 2026-07-20*
*Companion to `Token_Contract.md` (values) and `Skin_Bauhaus.md` (current resolution). See `docs/Research/DECISIONS.md` DR-006/007/008 for the decisions this document implements, DR-009 for the UDS reconciliation above.*
