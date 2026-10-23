---
type: Task
title: "T-065: Company logo and project links on the clipboard"
description: "Overview page: link tags bottom left, company logo (or an ink stamp) bottom right, Read more after the summary"
status: in-progress
priority: medium
tags: [roadmap, task, projects, clipboard]
timestamp: 2026-10-19T00:00:00Z
---

# T-065: Company logo and project links on the clipboard

## Context

The Overview page of the project clipboard had empty space under the summary, no links to the games, and no company logo. Proposals canvas: "Clipboard Logos and Links" (https://claude.ai/artifact/QvqEehHsMonPHhkystbm14). Parent: [T-040](T-040-project-section-overhaul.md).

User decisions (2026-10-19):
- Links: the colored paper tags, bottom left.
- Logo: bottom right, placed straight on the page (no white paper under it).
- Read more moves to the end of the summary text.
- No logo (freelance, independent, or none found): an "official" ink stamp with the company name instead.

Logo and links are separate concepts: the logo belongs to the company (experience), the links to each project. A project can have either, both, or neither.

---

## Acceptance Criteria

- [x] Links are a typed list per project (website, stores, social pages), shown as paper tags; game links before social pages.
- [x] A project can be marked shut down; it shows a "Game shut down" label, above its tags when it has any.
- [x] The company logo shows bottom right with no paper under it; without one, an ink stamp with just the company name (no years, no bracketed qualifier).
- [x] The logo links to the company's website when the company still exists; freelance and independent stamps don't link.
- [x] Read more sits at the end of the summary.
- [x] A project with no links and no logo looks like today apart from the stamp and the moved Read more.
- [x] The old `companyLogo` values that were really game icons are cleared.
- [ ] User side-by-side check on the site.

---

## Notes

- The YouTube trailer stays out of the tags while the game runs, since it already plays in the video frame. A shut-down game gets it as a YouTube tag, so recruiters still have something to click.
- Logos (2026-10-19) are in `public/assets/logos/`, taken from each company's own site. The white ones (Styngr, Amber, Newton's wordmark) were darkened to show on the paper, and DECA's is the light-background state cut from its header sprite. Intense Life has no logo anywhere, so it keeps the stamp.
- A project can name a `client` (the company it was made for, when that isn't the employer); the clipboard then shows the client's logo and site. Formula E High Voltage stays under Amber Studio with Animoca Brands as its client (user's call, 2026-10-20).
- Every link was checked live on 2026-10-19. Shut down: Formula E High Voltage (site offline since mid-2024), Tap TD (off Google Play), FitKin (site and App Store gone), Bubble Witch Saga (retired Oct 2020), AlphaBetty Saga (servers off Dec 2021). Dead social pages were left out.
- `article` tag kind with an optional per-link `label` (2026-10-22, user), first used for Amber Studio's pages on Diamond Diaries ("Case study") and Wild Things ("Video"). Tags can also belong to one screenshot and follow the slideshow ([T-067](T-067-frame-slideshow.md)).
