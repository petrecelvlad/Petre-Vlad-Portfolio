---
type: Task
title: "T-055: Screen tiers — desktop, laptop, tablet, mobile"
description: "Make the whole site work on desktop, laptop, tablet and mobile: define four tiers, then convert the hero, skill tree, projects and footer to them"
status: done
priority: high
parent: T-028
tags: [roadmap, task, responsive, layout, epic]
timestamp: 2026-10-14T00:00:00Z
---

# T-055: Screen tiers — desktop, laptop, tablet, mobile

## Context

Part of [T-028](T-028-mvp-launch-readiness.md). Raised in session 10 (2026-10-14) while deciding how the
skill tree should use the width freed by removing its 4th layer: every section is built for one large
monitor, and the snap-section layout (one screen per section) makes screen size a structural constraint,
not late polish. Decided with the user: set the tier rules first, keep designing on the desktop monitor,
build each section against the tiers.

---

## Acceptance Criteria

- [x] Tiers, their values and the mobile scrolling model approved by the user
- [x] Every section checked at all four tiers, with what breaks listed (see Audit)
- [x] Tier values defined once in code: `src/index.css` (tier variants + per-tier tokens), registered in `TOKEN_CONTRACT.md` §15
- [x] Components read the tier values
- [x] Hero, skill tree, projects, footer and navbar converted and verified at 1920×1080, 1366×768 and 390×844 (plus 1280×720, 1180×820, 1024×768, 820×1180, 844×390)

---

## Sub-Tasks

- [T-056](T-056-screen-tiers-proposal.md) — Tiers proposal *(done)*
- Audit every section at the four tiers *(done, see Audit)*
- Tier values in code *(done)*
- Skill tree conversion *(done, session 10: all four tiers, verified at 1920×1080, 1600×900, 1440×900, 1366×768, 1280×720, 1180×820, 1024×768, 820×1180, 390×844, 844×390)*
- Navbar conversion *(done, session 10: phone section links as icon buttons in one row with the profile links (replaced the earlier menu button 2026-10-15); tablet links centered between name and buttons, laptop and up unchanged)*
- Hero conversion *(done: name size per tier; tablet two-row grid with the character beside the ribbon and bio, achievements 4 across sideways / 2 × 2 upright; mobile one column with joined achievement tiles, the ribbon keeping its tails over a narrower paper; island anchored under the character in the stacked layouts)*
- Projects conversion *(done: clipboard cover stacks title/role/date under the photo when the paper is under 480px wide; sticky notes shrink to fit one row on tablet and up, two per row on mobile; upright tablets stack with a 430px clipboard; mobile stacks every project in normal scrolling with the horizontal rail; only the active project loads its YouTube player)*
- Footer conversion *(done: content height and tighter spacing on mobile)*
- Mobile page scrolling *(done: no snap on the mobile tier)*

---

## Audit (2026-10-14, session 10)

Headless Edge screenshots of the running app at 1920×1080, 1366×768, 1280×720, 1180×820, 820×1180 and 390×844, every snap section.

- **Navbar, mobile:** the section links overlap the name; there is no menu.
- **Hero:** at 1280–1599 wide (`xl:text-8xl`, 96px) the name breaks mid-word ("VLAD PETR / E"); at 1280×720 the Explore button is cut off at the bottom; upright tablet cuts off the achievements; mobile cuts off the achievements and Explore (no scroll).
- **Skill tree:** the tree uses a small part of the board on desktop, laptop and sideways tablet (T-056 option 2); upright tablet and mobile show no details panel or photos at all; on mobile the tree is too small to read.
- **Projects:** the clipboard title is squeezed beside the photo from 1366 down ("Merge Mar", "Mer", "T") and the role overlaps it; projects with 6 skills push the sticky notes past the right edge at every size below desktop; at 1280–1366 the achievement bar and video run past the right edge; the rail is hidden on mobile; mobile notes are cut off.
- **Footer:** fine at every size; on mobile the copyright line wraps into three lines.

---

## Notes
