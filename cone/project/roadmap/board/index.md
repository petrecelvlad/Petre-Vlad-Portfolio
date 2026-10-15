# Board

Individual Kanban cards — see [BOARD.md](../BOARD.md) for the protocol (states, ID scheme, when a card gets created). This index lists every card with its current status; update the status annotation whenever a card moves. For a full grouped board view, ask for one or invoke the `board` skill — it's generated from these files' frontmatter, not maintained separately here.

* [Template](TEMPLATE.md) - Copy this for each new card
* [T-001](T-001-evaluate-integration-candidates.md) - Evaluate GitHub integration candidates *(backlog)*
  * [T-002](T-002-superpowers.md) - obra/superpowers *(backlog)*
  * [T-003](T-003-spec-kit.md) - github/spec-kit *(backlog)*
  * [T-004](T-004-openspec.md) - Fission-AI/OpenSpec *(backlog)*
  * [T-005](T-005-bmad-method.md) - bmad-code-org/BMAD-METHOD *(backlog)*
  * [T-006](T-006-claude-task-master.md) - eyaltoledano/claude-task-master *(backlog)*
  * [T-007](T-007-planning-with-files.md) - OthmanAdi/planning-with-files *(backlog)*
  * [T-008](T-008-agents-md.md) - agentsmd/agents.md *(backlog)*
  * [T-009](T-009-agent-os.md) - buildermethods/agent-os *(backlog)*
  * [T-010](T-010-microsoft-skills.md) - microsoft/skills *(backlog)*
  * [T-011](T-011-self-learning-skills.md) - Kulaxyz/self-learning-skills *(backlog)*
* [T-012](T-012-sticky-note-fold-corner.md) - Fix sticky-note 'fold' corner effect in heritage skin *(backlog)*
* [T-013](T-013-remove-unused-ai-studio-scaffolding.md) - Remove unused AI-Studio scaffolding from package.json/.env.example *(done)*
* [T-014](T-014-bake-achievement-shaders-to-video.md) - Bake the 4 Hero achievement-card shaders to looping video/sprite *(done)*
* [T-021](T-021-animation-path-switcher.md) - Runtime-switchable animation path (shader/baked/svg) for the 4 achievement cards *(done)*
* [T-022](T-022-segmented-lite-perf-test.md) - Segmented3 "Lite" background fork — removes per-frame SVG path rebuild, new default, awaiting felt-experience verdict *(done)*
* [T-023](T-023-segmented-loop-perf-test.md) - Segmented3 "Looped" background fork — precomputed SMIL animation, motion with zero per-frame JS, new default *(done)*
* [T-024](T-024-segmented-banded-perf-test.md) - Segmented3 "Banded" background fork — transform-only sway *(done, REVERTED — looked bad, user asked to stop iterating on this direction)*
* [T-025](T-025-cursor-gaze-broken-handoff.md) - Cursor-driven gaze on Hero's 3D Nature Field — root cause found and fixed *(done)*
* [T-026](T-026-shader-to-svg-conversions.md) - Hand-author real SVG/CSS recreations for the remaining achievement-card shaders (Level-Up, Teams Lead, Cartridge — all done) *(done)*
* [T-027](T-027-skilltree-collapse-expand.md) - Progressive-disclosure collapse/expand for the SkillTree's deep layers, one branch open at a time *(done)*
  * [T-015](T-015-shader-loop-period-audit.md) - Loop-period audit for the 4 achievement shaders *(done)*
  * [T-020](T-020-retune-shader-loop-constants.md) - Retune shader time constants for exact loopability *(in-progress — optional manual seam-watch left open)*
  * [T-016](T-016-shader-capture-harness.md) - Fixed-timestep shader capture harness *(done)*
  * [T-017](T-017-levelup-bake-pipeline.md) - End-to-end bake pipeline, validated on Level-Up *(done)*
  * [T-018](T-018-remaining-shader-bakes.md) - Bake Factory, Teamslead, and Cartridge *(done)*
  * [T-019](T-019-swap-and-verify.md) - Swap AchievementShaderCanvas cases and verify *(done)*
* [T-028](T-028-mvp-launch-readiness.md) - MVP Launch Readiness — top-level epic for everything left before ship *(backlog)*
  * [T-029](T-029-navbar-mvp-cleanup.md) - Navbar cleanup: remove debug controls, add real nav, clickable logo *(backlog)*
  * [T-030](T-030-hero-section-polish.md) - Hero section polish *(backlog)*
    * [T-031](T-031-hero-perf-verification.md) - Verify Hero performance on older laptops *(backlog)*
    * [T-032](T-032-hero-column-2-redesign.md) - Redesign Hero's middle column (unify role + description) *(done)*
  * [T-033](T-033-skilltree-section-redesign.md) - SkillTree section redesign *(backlog)*
    * [T-034](T-034-skilltree-simplify-detail-panel.md) - Simplify SkillDetailsPanel content *(done)*
    * [T-035](T-035-skilltree-photos-own-section.md) - Move SkillTree project photos into their own section *(done)*
    * [T-036](T-036-skilltree-root-skill-icons.md) - Larger shape + icon for the 3 root category skills *(done)*
    * [T-037](T-037-skilltree-selection-ux.md) - Fix buggy/unintuitive SkillTree selection interaction *(backlog)*
    * [T-038](T-038-skilltree-banner-chrome-redesign.md) - Redesign SkillTree banner + board chrome *(done)*
    * [T-039](T-039-skilltree-content-pass.md) - SkillTree content pass (post user research) *(backlog)*
    * [T-051](T-051-skilltree-experience-bar.md) - Skill experience bar from project dates *(done)*
    * [T-052](T-052-skilltree-panel-ribbon-paper.md) - Detail panel as ribbon over lined paper *(done, REVERTED — user disliked it; parchment panel restored)*
    * [T-053](T-053-skilltree-pills-connectors.md) - Pills + connectors in the toy-box style *(done)*
    * [T-054](T-054-skilltree-scale-to-fit.md) - Scale the tree to fit its board *(done)*
  * [T-040](T-040-project-section-overhaul.md) - Project section overhaul *(backlog)*
    * [T-041](T-041-project-timeline-color-fix.md) - Fix project timeline color *(done)*
    * [T-042](T-042-project-scroll-animations.md) - Scroll-triggered layout animations for the project section *(backlog)*
    * [T-043](T-043-project-cards-polish.md) - Polish the 4 existing project cards *(backlog)*
    * [T-044](T-044-project-tabs-standardization.md) - Semantic project tabs (Overview / Details / optional Gallery), top edge *(in-progress — Overview/Details/Gallery live, unconfirmed copy in red)*
    * [T-045](T-045-add-more-projects.md) - Add more projects (recent jobs) *(backlog)*
    * [T-046](T-046-rewrite-project-copy.md) - Rewrite project copy toward Game Producer framing *(in-progress — Overview copy live, awaiting user answers on red items)*
    * [T-048](T-048-project-tab2-discovery-cues.md) - Make the Details tab discoverable *(done)*
    * [T-049](T-049-project-gallery-tab.md) - Optional Gallery tab *(done)*
    * [T-057](T-057-clipboard-overview-redesign.md) - Clipboard Overview redesign: layout C, summaries, duration, Read more, clearer tabs *(done)*
  * [T-047](T-047-footer-mvp-additions.md) - Footer MVP additions *(backlog)*
  * [T-050](T-050-career-clock.md) - Career clock (2007-01-01 anchor) for Hero + skill tree *(done)*
  * [T-055](T-055-screen-tiers.md) - Screen tiers: desktop, laptop, tablet, mobile for the whole site *(done)*
    * [T-056](T-056-screen-tiers-proposal.md) - Tiers proposal artifact *(done)*
