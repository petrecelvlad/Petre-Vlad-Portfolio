---
type: Anti-Patterns
title: Anti-Patterns
description: Institutional memory — mistakes with non-obvious root causes and fixes.
tags: [memory, anti-patterns, project]
timestamp: 2026-06-23T00:00:00Z
constraints:
  - Curated knowledge only — not a session log
agent_instructions: >
  Institutional memory: mistakes with non-obvious root causes. Add entries when a failure's
  root cause would surprise a future agent. Use the template format below.
---

# Anti-Patterns

Mistakes that have been made, with root causes and fixes. Each entry captures a failure that would surprise a future agent or developer — if the root cause is obvious, it doesn't belong here.

**This is curated knowledge, not a session log.** Session logs go in `cone/agent/sessions/`. Anti-patterns are distilled from sessions into timeless entries. See also [Lessons](./LESSONS.md) and [Playbook](./PLAYBOOK.md).

---

## Entry Format

```markdown
### [Pattern Name]
**What happened:** [Brief description of the failure]
**Root cause:** [Why it actually failed — the non-obvious part]
**The fix:** [What to do instead]
```

---

<!-- Add entries below this line -->

### Duplicate SVG `id`s across simultaneously-mounted sibling instances
**What happened:** `SegmentedGalaxianBackground.tsx` defines `<linearGradient>`/`<pattern>` elements with hardcoded `id`s inside `<defs>`. The first draft defined all of them unconditionally, regardless of which `pass` prop the instance was rendering with. Since `Hero.tsx` mounts a `pass="full"` instance and a `pass="overlay"` instance of the same component simultaneously, both instances rendered the exact same `id`s into the same document at the same time.
**Root cause:** `url(#id)` resolution (and `getElementById`) is undefined behavior when multiple elements share an `id` — which element a reference actually resolves to isn't guaranteed, even though it may happen to "work" by coincidence of document order in one browser.
**The fix:** Gate every `<defs>` entry to the specific branch/prop value that actually uses it, so no two simultaneously-mounted instances of the same component can ever emit the same `id`. Caught in self-review before shipping — worth specifically re-checking any component with hardcoded SVG/DOM `id`s that might mount more than once on a page.

### Matching a nested SVG's viewBox to the parent's abstract viewBox units doesn't prevent skew
**What happened:** A nested `<svg>` inside `SegmentedGalaxianBackground.tsx`'s outer `<svg viewBox="0 0 1000 1000" preserveAspectRatio="none">` needed to render pixel-art content without skewing. First attempt: made the nested viewBox square (matching the parent's "1000x1000"), reasoning that equal width/height would produce a uniform scale. It didn't — the content still skewed.
**Root cause:** The outer `<svg>`'s `viewBox="0 0 1000 1000"` is an *abstract* unit space; `preserveAspectRatio="none"` stretches it non-uniformly onto whatever the outer element's *real rendered pixel* box is — and Hero is a wide landscape section, never square, and its aspect ratio changes with the viewport. A nested viewBox's aspect ratio has to match the real rendered pixel aspect ratio of the space it's filling, not any property of the parent's abstract viewBox numbers. "1000x1000 looks square" is a trap — it's square only in unit-space, not on screen.
**The fix:** Measure the actual rendered element's aspect ratio at runtime (`ResizeObserver` + `getBoundingClientRect()`, the same pattern already used in `TornPaperPanel.tsx`) and size the nested viewBox to match that real ratio. Re-derive from real pixels whenever a nested SVG needs to render undistorted content inside a `preserveAspectRatio="none"` chain — a build-time constant can't account for it since the outer container is responsive.

### Reading a `mod(u_time * k, M)` term's modulus `M` as its period instead of computing `M / k`
**What happened:** Auditing `AchievementShaderCanvas.tsx`'s Level-Up shader for loop-safe periods (T-015), a background term `mod(u_time * 1.2 + sf * 0.3, 1.8)` was recorded as having a 1.8s period — the modulus value was taken at face value. The actual period (time for the wrapped argument to complete one full cycle) is `modulus / coefficient = 1.8 / 1.2 = 1.5s`. The error propagated into a wrong LCM calculation (117s instead of the correct 19.5s) before being caught on a second pass, just before it would have driven an incorrect retune.
**Root cause:** For `mod(u_time * k + offset, M)`, the argument grows at rate `k` per second and wraps every time it crosses a multiple of `M` — so the *time-domain* period is `M / k`, not `M`. `M` alone is a spatial/normalized-range constant (often reused elsewhere in the same shader to rescale a 0..M value to 0..1, e.g. `st / 1.8`), easy to mistake for "the period" because it's the number sitting right next to `u_time` in the expression.
**The fix:** For every `mod`/`fract` term found while auditing shader (or any) periodic behavior, always compute `period = modulus / coefficient` explicitly (with `fract(u_time * k)` as the special case where modulus is implicitly `1`, so `period = 1 / k`) — never read the literal modulus argument as the period. Worth a second, deliberate pass over every term's arithmetic before it's used to derive anything downstream (an LCM, a capture window, a retuned constant).

### Piping a heredoc to `python3` from Git Bash silently fails to find files that definitely exist
**What happened:** While mechanically splitting a large `.tsx` file (T-021), ran `python3 - <<'EOF' ... EOF` to patch a temp file at `/tmp/part_c_edited.txt` — a file `ls` had just confirmed existed. Python raised `FileNotFoundError` for that exact path, immediately after `ls` proved it was there.
**Root cause:** This machine's `python3` on PATH is the Windows Store alias stub (`...\WindowsApps\python3`), which launches native Windows Python — a different process with a different filesystem view than Git Bash. Git Bash's `/tmp` is a POSIX-style mount Git Bash translates internally; native Windows Python doesn't understand that path at all, so it looks for a literal (nonexistent) `/tmp` directory relative to Windows' own root. `ls`/`cp`/other Git Bash builtins access it fine because they go through Git Bash's own translation layer; anything invoking a native Windows executable does not.
**The fix:** Never pipe a heredoc into `python3` (or any native Windows tool) expecting it to resolve Git Bash's `/tmp` paths. Either write the script to disk first via the Write tool and pass a real path, or convert the path with `cygpath -w /tmp/foo` before handing it to the native tool. Worth checking for any native (non-Git-Bash) executable invoked from this shell, not just Python.

### Measuring "zero JavaScript calls" and concluding "zero cost"
**What happened:** After finding that a live `requestAnimationFrame` loop rewriting an SVG path `d` attribute was causing felt scroll lag (T-022), built a replacement using native SVG SMIL `<animate values="...">` to precompute the motion once and let the browser play it back (T-023). Measured 0 JavaScript `setAttribute` calls per second — genuinely true — and reported the fork as having eliminated the performance problem. The user then reported it still felt staggery, just less than before.
**Root cause:** "No JavaScript is computing this" and "this costs nothing to render" are different claims, and only the first one was actually measured. `calcMode="linear"` (SMIL's default) makes the browser continuously interpolate and re-render the path geometry every frame for the whole animation duration — a real, ongoing rendering-engine cost that has nothing to do with JavaScript and therefore was invisible to a `setAttribute` instrumentation check. The measurement was real and correctly reported; the conclusion drawn from it ("this fixes the cost") went further than the measurement actually supported.
**The fix:** When diagnosing "is X free now," identify what specifically was measured and state the claim at that same precision — "zero JS calls" is not interchangeable with "zero render cost," "zero network requests" is not interchangeable with "zero parse cost," etc. For animation specifically, only `transform`/`opacity` changes are reliably compositor-only (never touch layout) in every mainstream browser — that's the actual bar for "as cheap as static," not the absence of JS. If a measurement can't directly confirm the render-engine-side cost (browser DevTools' own performance/paint profiling can, a JS instrumentation hook can't), say so explicitly rather than letting a partial measurement imply a complete one.

### A raw `&` inside an SVG `<style>` block's CSS comment silently breaks the whole image when loaded standalone
**What happened:** Wired an externally-authored SVG animation in as a static asset via `<img src="...svg">`. It rendered as a broken-image icon with `naturalWidth`/`naturalHeight` both `0`. First guess was a sizing issue (the root `<svg>` had `width="100%" height="100%"`, percentages instead of absolute pixels) — fixed that, no change. Only navigating to the SVG file directly (not via `<img>`) surfaced the real error: `xmlParseEntityRef: no name` at the exact line of a CSS comment reading `/* CSS Variables & Timing Calculations */`.
**Root cause:** An SVG file is XML, and browsers parse it as strict XML when it's the top-level document (standalone navigation, or loaded via `<img>`/`<object>` — anywhere it isn't inlined directly as JSX/HTML, which uses a more lenient parser). Inside a `<style>` element, the content is XML character data, not opaque text — a bare `&` there needs to be `&amp;` even though it's syntactically fine as a CSS comment. The exact same raw `&` inside an XML `<!-- comment -->` elsewhere in the same file was completely fine, since XML comments aren't parsed for entities — only one of the file's several `&` occurrences was actually the problem, and it wasn't the one that looked most suspicious at a glance.
**The fix:** When an externally-sourced SVG fails to render as an `<img>`, don't guess from CSS/sizing symptoms (a parse failure and a sizing failure can look identical: blank/broken image, `naturalWidth: 0`) — navigate the browser directly to the SVG file's own URL first. A well-formed SVG renders normally standalone; a malformed one shows the browser's own XML parser error with an exact line/column, which is far faster than guessing. For batch-checking a file's well-formedness without a browser at all, `python3 -c "import xml.dom.minidom as m; m.parse('file.svg')"` catches the same class of error immediately.

### An SVG element that starts with no geometry until a `useEffect` sets it causes a visible mount-order stagger
**What happened:** `SegmentedGalaxianBackground.tsx`'s animated clip/stroke `<path>` elements started with no `d` attribute; a `useEffect` computed and set it on mount. A sibling layer (`GalaxianBackground.tsx`, plain static SVG with no such dependency) painted immediately, while these paths stayed invisible for one extra paint cycle until the effect fired — visibly "popping in" a beat later, even though both were gated behind the same mount condition.
**Root cause:** `useEffect` runs *after* React's paint, not before. An element with empty geometry at the moment of that first paint is genuinely invisible until the effect's next paint — there's no way around this by changing when the component mounts, only by changing what it looks like the instant it mounts.
**The fix:** Precompute the initial geometry synchronously (a module-level constant, computed once at import time for a static case) and set it as the element's initial `d` value, so there is no frame where the geometry is empty. The imperative effect/rAF loop still takes over immediately after to animate from there — this only fixes the *first* frame, which is exactly the frame that was missing.
