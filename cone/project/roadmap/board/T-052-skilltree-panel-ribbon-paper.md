---
type: Task
title: "T-052: SkillTree detail panel as ribbon over lined paper (REVERTED)"
description: "Rebuild the detail panel from the Hero's RibbonBanner + RibbonPaperSeam + TornPaperPanel; the wax seal stays"
status: done
priority: high
parent: T-033
tags: [roadmap, task, skilltree, visual-design]
timestamp: 2026-10-13T00:00:00Z
---

# T-052: SkillTree detail panel as ribbon over lined paper

## Context

Part of [T-033](T-033-skilltree-section-redesign.md). From the 2026-10-13 style audit: the
parchment panel (hanging wooden bar, blurred shadow, stitched border, dashed divider) is a
realistic register nothing else on the site uses. The Hero's ribbon-over-paper object is the
reference.

---

## Acceptance Criteria

- [x] Skill/category name sits in a `RibbonBanner` (3px bevel, see [T-038](T-038-skilltree-banner-chrome-redesign.md))
- [x] Description sits on the Hero's lined paper (`TornPaperPanel` + `RibbonPaperSeam`)
- [x] Wax seal kept (user, 2026-10-13); hanging bar, stitching and dashed divider gone
- [x] Photo region below still gets its full-size photos at 1366×768

---

## Notes

User decision: the wax seal remains.

**2026-10-13 — reverted at the user's request.** The user disliked the redesign ("that panel should not
have been changed, you changed it too drastically"). The parchment panel is back exactly as it stood
before this card: `GamifiedParchmentPanel` (hanging bar, stitching, inline wax seal), dashed divider,
the session's earlier tweaks kept (no "ABILITY EFFECT:" label, `min-h-[336px]`, `text-base`).
`GamifiedWaxSeal.tsx` (extracted only for this card) deleted. Do not restyle this panel again unless
the user names it.
