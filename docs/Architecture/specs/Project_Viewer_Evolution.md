# The Project Viewer — Evolution Spec

## What this document is

The project-card region — currently `Timeline.tsx`'s stack of `TimelineItem`s, each a full 100vh section containing its own copy of `ProjectDetails` (clipboard, phone, sticky notes, achievement banner) — is being re-architected from **N independent scrollable cards** into **one persistent structural shell whose content swaps as the user scrolls**.

This is the same principle already proven once in this codebase: `TimelineRail` doesn't re-render per project — it's mounted once, `position: fixed`, and just reads `activeIndex` to know what to show. This spec extends that same principle to the entire project region: background, clipboard, phone frame, sticky notes, achievement banner all become a single persistent instance, not one instance per project. Vlad's framing (2026-07-24): once the user scrolls into this region, they're inside *one singular Project Section* — the layout regions never change, only the content inside them does.

This document exists to capture the **full intended evolution** — today's simple validation pass and the richer animated version planned after — so the Phase 1 implementation is built in a way that doesn't foreclose Phase 2, even though Phase 2 itself isn't being built yet.

**Terminology introduced here:** *The Project Viewer* — the persistent structural shell (background + clipboard + phone + notes + banner) that this spec is about. Distinct from `TimelineItem` (after this change, a bare invisible scroll trigger, no visual content of its own) and `ProjectDetails` (the content renderer, now mounted once instead of N times). Rename freely if a better term surfaces during implementation — nothing downstream depends on this exact name yet.

---

## 1. Current architecture (before this change)

```
Timeline.tsx
  └─ TimelineRail (mounted once, position: fixed, reads activeIndex)  ← already this pattern
  └─ projects.map(project => TimelineItem)                            ← NOT this pattern yet
       └─ TimelineItem[i]  (100vh, snap-start, one per project)
            ├─ WoodBackground (heritage only)                         ← duplicated N times
            └─ ProjectDetails(project, isActive)                      ← duplicated N times
                 ├─ BentoHeader        (no-op under heritage, DR-019)
                 ├─ BentoResponsibilities  (clipboard + tabs)          ← duplicated N times
                 ├─ BentoSkills            (sticky notes)              ← duplicated N times
                 ├─ BentoAchievement       (banner)                    ← duplicated N times
                 └─ BentoVideoFrame        (phone frame)               ← duplicated N times
```

- `useTimelineOrchestrator` observes all N `TimelineItem`s via `IntersectionObserver` and computes `activeIndex` — this part is already correct and is **kept unchanged** by this spec (see §6).
- Scrolling physically moves the viewport between N stacked, visually-identical copies of the same chrome. Only one is ever opacity-visible/interactive at a time (`isActive`), but all N are mounted and painted simultaneously — 14 clipboards, 14 phone frames, 14 wood backgrounds in the DOM at once today.
- `TimelineRail` is the one piece of this system that already works the way the rest of the region is about to: mounted once, fixed position, driven by `activeIndex`.

**The mismatch this spec resolves:** the rail already treats "which project" as a piece of *state* driving a persistent view. The content region still treats it as *which physical copy of the DOM is scrolled into place*. Those are two different models sitting side by side today; this spec brings the content region onto the rail's model.

---

## 2. Phase 1 (today) — static shell, instant content swap

### 2.1 What stays exactly as it is

- `useTimelineOrchestrator` — unchanged. It already computes a correct, debounced `activeIndex` from N observed sections; nothing about switching from "N rendered cards" to "N invisible triggers" changes what it needs to observe or how it computes the winner.
- `TimelineRail` — unchanged. Already fixed-position, already reads `activeIndex`, already unaffected by what's mounted underneath it.
- The total scroll distance — unchanged. Still `N × 100vh` of scrollable height, still `scroll-snap-type: y mandatory`, still one snap point per project. The user's scroll gesture and the rail's dot-per-project both keep meaning exactly what they mean today.
- `resolveSlot`/the Tier 3 registry, `ports.ts`, every `Bento*` component's actual implementation — unchanged. They already take `project` as a prop and render its content; nothing about *where* they're mounted changes what they render.

### 2.2 What changes

`TimelineItem` stops rendering `ProjectDetails`. It becomes a bare positional trigger — same `100vh`, same `snap-start snap-always`, same ref wiring into `itemRefs` for `IntersectionObserver` and for `TimelineRail`'s click-to-scroll — but empty. Its only job is occupying scroll distance and being observable.

A new component — **`ProjectStage`** (working name for *The Project Viewer*'s implementation) — is mounted once, as a sibling of the N trigger divs, not inside any of them. It renders the actual chrome (`WoodBackground` under heritage, the clipboard, the phone frame, the sticky notes, the achievement banner) and feeds it `projects[activeIndex]`. Content swap on scroll becomes: `activeIndex` changes → `ProjectStage` re-renders with a different `project` prop → the same mounted DOM tree shows different text/images. No new mount, no new instance of the clipboard or the phone — the same one that's already on screen just receives new props.

```
Timeline.tsx
  └─ TimelineRail (unchanged)
  └─ projects.map(project => TimelineItem)     ← now empty positional triggers only
  └─ ProjectStage (mounted ONCE, position: sticky, reads projects[activeIndex])
       ├─ WoodBackground (heritage only)
       └─ ProjectDetails(projects[activeIndex], isActive=true)
            ├─ BentoHeader / BentoResponsibilities / BentoSkills / BentoAchievement / BentoVideoFrame
```

### 2.3 The CSS mechanism: `position: sticky`, not `position: fixed`

`TimelineRail` uses `position: fixed` because it needs to be visible for the *entire* page, gated only by a JS check (`activeIndex === -1` early-returns `null`). `ProjectStage` has a narrower requirement: visible and locked in place only while the user is scrolled somewhere within the project list's own scroll range, releasing naturally once they scroll past it into the Footer (or back up into the Skill Tree).

That's the textbook case for `position: sticky`, not `fixed`:

- `ProjectStage`'s containing block must be the wrapper that spans **all N trigger sections together** (i.e. a sibling of `TimelineRail` inside `Timeline.tsx`'s outer `<div>`, not inside any individual `TimelineItem`) — a sticky element sticks within the bounds of its own containing block, so if the containing block only spanned one project's `100vh`, it would immediately unstick at every section boundary, which is exactly the old per-card behavior this spec is replacing.
- `top: var(--chrome-navbar-height)` anchors it directly under the fixed navbar, consistent with how every other snap section already reserves that space (`h-[calc(100vh-var(--chrome-navbar-height))]`, per `OVERVIEW.md`'s Envelope Rule).
- Natural consequence, not something to special-case: the shell scrolls into view once (entering from `SkillTree`), locks in place for the full height of the project list, then scrolls away once the user passes the last project into the Footer — exactly the "enter this region → the region takes over → leave the region" behavior described.

`position: fixed` was considered and rejected for `ProjectStage` specifically because it has no natural "only while inside the project region" boundary — it would need manual scroll-position bookkeeping (show/hide logic keyed off scroll bounds) to replicate what `sticky` gives for free from its containing block.

### 2.4 No animation in Phase 1

The content swap itself is instant — same as the current no-animation state established earlier this session (the opacity-fade `motion.div` was already removed from `TimelineItem` for an unrelated compositor bug; Phase 1 continues that "swap, don't animate" posture, now for a different reason — proving the static-shell concept works before layering transition work on top of it). `BentoVideoFrame`'s existing play/pause-on-`isActive` logic, `BentoResponsibilities`' internal page-tab pagination, and every other piece of current interactive behavior carry over unchanged; they already take `project`/`isActive` as props and don't know or care whether they're one of N mounted instances or the one and only instance.

---

## 3. Phase 2 (future, not built yet) — animated content transitions

Once Phase 1 is validated — the shell genuinely reads as one static stage, the rail and click-navigation are unaffected, scroll still feels correct — the *instant* content swap becomes an *animated* one. Explicitly out of scope for the current pass; recorded here so Phase 1 is built without closing off this path.

**The shape of the work, as currently understood (not designed in detail — a sketch, not a spec):**

- **Clipboard text:** `BentoResponsibilities` already animates its own internal page-tab pagination via `AnimatePresence` + a `rotateX` page-flip (`motion.div`, `key={activePage}`). Switching *projects* could reuse the exact same mechanism — treat a project change the same way a tab change is already treated, just triggered by `activeIndex` instead of `setPage`. This isn't a new animation primitive to invent, it's extending one that already exists in the same file.
- **Phone/video content:** fade, slide, or scale transition between one project's screenshot/video and the next's, instead of an instant swap — the specific treatment isn't decided.
- **Sticky notes / achievement banner:** could animate in with a staggered "placed down" reveal, or similar — not decided.
- **Scroll-coupled, not just index-triggered:** ideally the transition tracks scroll *progress* between two projects' trigger sections, not just a binary "did `activeIndex` change" event — matching the same "the animation is driven by where you are, not just a state flip" philosophy already established for the rail's fill in `Timeline_Animation_Spec.md` (see §5 for that doc's current staleness, though — the *philosophy* still applies even though that doc's own component references don't).

**Why Phase 1's shape doesn't block this:** content already re-renders on `activeIndex` change under Phase 1 (that's the whole mechanism) — Phase 2 wraps that same re-render in `AnimatePresence`/`motion` primitives instead of letting it swap instantly. No structural rework of `ProjectStage` itself should be required to add this later; it's an animation layer on top of an already-correct data flow, not a different data flow.

---

## 4. Concrete open questions / risks (flagged, not resolved)

- **`BentoVideoFrame`'s `isActive` prop becomes always-`true`.** Today, 14 `BentoVideoFrame` instances are mounted simultaneously and only one has `isActive=true` at a time (driving autoplay/pause). Under Phase 1, there's only ever **one** `BentoVideoFrame` mounted, and it's always the active project's — trivially always `isActive=true` by construction. Any code inside `BentoVideoFrame` that implicitly assumed "I might be one of several mounted instances, most of them inactive" should be re-examined during implementation (likely simplifies, but verify — don't assume).
- **SEO/crawlability tradeoff.** Today, all 14 projects' text content exists in the DOM simultaneously (invisible via opacity where inactive, but present and crawlable). Under Phase 1, only the *currently active* project's content is ever in the DOM — the other 13 projects' text doesn't exist anywhere on the page until scrolled to. Given Pillar 1/4's emphasis on the site itself being evidence of craft, this is worth a conscious call before or during implementation, not an accidental regression: either accept the tradeoff, or add a compensating mechanism (e.g., a visually-hidden but crawlable full-text list elsewhere on the page). Not resolved here.
- **Mobile/narrow-viewport layout.** The clipboard, phone, and sticky notes already reflow differently at narrow widths. Whether the "one persistent sticky shell" concept holds up cleanly on mobile (vs. e.g. needing to stay in a more traditional stacked-scroll mode below some breakpoint) hasn't been checked. Flag during implementation, not assumed fine.
- **`TimelineItem`'s remaining DOM footprint.** Once emptied of content, confirm the N trigger divs don't need *any* visual presence (not even `WoodBackground`) — if the wood desk background is meant to visually span the whole project region continuously (no seams at section boundaries), it likely belongs on `ProjectStage` (or a shared ancestor) rather than needing to be redundantly present on every trigger div, but this needs a live visual check once built, not just a doc call.

---

## 5. Relationship to existing docs

- **Supersedes, for the project-card region specifically:** `System_Design.md`'s "Managed Stage" proposal — that document's own component names (`ExperienceCard`, `TimelineManager`, `NodeMarker`) predate the current codebase (`ProjectDetails`, `useTimelineOrchestrator`, `TimelineRail`) and were never implemented as written. This spec is the concrete, current-codebase-accurate version of that same underlying idea ("separate the persistent shell from the content that flows through it") applied specifically to the project section. `System_Design.md` is not deleted or corrected here — flagging its staleness is in scope for this note, rewriting it is not.
- **Already stale, independent of this spec:** `Timeline_Animation_Spec.md` describes `TimelineTrack`/`TimelineMarker`, both deleted this session and replaced by `TimelineRail` (a persistent-shell-style component in its own right — see §1). That document's *specific* component references no longer match the codebase; its underlying *philosophy* (direction-aware, scroll-coupled animation) is exactly what Phase 2 above wants to reuse. Also flagged, also not rewritten here.
- **Unaffected:** `Skin_System.md` (Tier 1/2/3), `Token_Contract.md`, `Component_Architecture.md`'s tier model. `ProjectStage` consumes the same `resolveSlot` registry `ProjectDetails` already does — this is a change to *where* content is mounted, not to the skin/token system or to what any individual `Bento*` component renders.

---

*Project Viewer Evolution · Experience Engine · 2026-07-24*
