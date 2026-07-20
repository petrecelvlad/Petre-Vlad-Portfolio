# Skill System — Design Proposal
## SkillTree Section v2 · Experience Engine

> **Status:** Proposal v2 — tree structure direction confirmed, awaiting final approval before implementation.
> **Direction change from v1:** Skills branch hierarchically like a game skill tree, not a flat category grid.
> **Target phase:** Phase 4 (post-MVP), but schema + static tree can be built alongside MVP.
> **Derived from:** `portfolio.json`, `SkillTree.tsx` scaffold, `BentoSkills.tsx` icon map, Hero section patterns.

---

## 1. Why Redesign the Scaffold

The current scaffold (`SkillTree.tsx`) has three problems:

1. **Three categories is too flat.** "Macro" bundles unrelated things (Gamification, Research, Marketing, Metaverse) with no common thread.
2. **Badge chips carry no information.** Seeing "Game Design" as a chip tells a recruiter nothing about depth, years, or proof.
3. **No hierarchy.** The whole point of a skill tree is that skills have prerequisites — foundational skills branch into specializations. A flat list loses that narrative.

The redesign replaces the badge grid with **four parallel branching trees**: one per category, rendered as an actual game-style skill tree where roots branch into children, and children into grandchildren, with visible connecting lines.

---

## 2. Four Category Trees

The tree is divided into **four independent branches**, each with its own root, children, and grandchildren. Categories map directly to the four existing Bauhaus palette colors.

| Category | Color | Root skill | What the branch covers |
|---|---|---|---|
| **DESIGN** | Coral | Game Design | The creative craft — what Vlad makes |
| **PRODUCTION** | Sky | Backlog Management | The delivery engine — how it gets shipped |
| **LEADERSHIP** | Butter | Team Leadership | The people layer — who he commands |
| **VISION** | Mint | Research | The strategic lens — why it matters |

---

## 3. Full Hierarchy — Parent/Child Relationships

Each skill node has one optional parent. `null` = root of its tree. Grandchild nodes are depth 2.

### DESIGN branch (root: Game Design)

```
Game Design  [D1] ─────────────────────────────────────── root
│
├── Level Design  [D2]                                     depth 1
│   └── Economy Design  [D3]                               depth 2
│
└── UX Design  [D4]                                        depth 1
    └── Product Design  [D5]                               depth 2
```

**Rationale:** Game Design is the foundation everything else grew from. Level Design is the first specialization — designing game spaces as opposed to systems. Economy Design emerged from understanding how level content scales into economy at the King partnership. UX Design branched separately — the screen-flow and interaction work on FEHV and R-QUEST — and Product Design is the generalization of UX beyond games.

---

### PRODUCTION branch (root: Backlog Management)

```
Backlog Management  [P1] ───────────────────────────────── root
│
├── Agile Planning  [P2]                                   depth 1
│   └── Documentation  [P3]                               depth 2
│
└── Project Management  [P4]                               depth 1
    └── Prototyping  [P5]                                  depth 2
```

**Rationale:** The ability to manage a backlog is the prerequisite for all production discipline. Agile Planning is the formalization of that backlog into sprints and delivery rhythm. Documentation is the artifact that emerges from a mature Agile process — GDDs, design specs, procedures. Project Management is the broader ownership of timeline and milestone, which then enables Prototyping by creating the space and process for rapid iteration.

---

### LEADERSHIP branch (root: Team Leadership)

```
Team Leadership  [L1] ──────────────────────────────────── root
│
├── Coaching & Mentoring  [L2]                             depth 1
│   └── Roadmapping  [L3]                                 depth 2
│
└── Cross-team Coordination  [L4]                          depth 1
    └── Stakeholder Communication  [L5]                    depth 2
```

**Rationale:** Team Leadership is the root — you cannot mentor or coordinate without first being the person others look to. Coaching & Mentoring is the inward expression of leadership (training 9 junior designers from scratch). Roadmapping is the output of mentoring relationships maturing into shared planning. Cross-team Coordination is the outward expression of leadership (running 6 teams simultaneously at King). Stakeholder Communication is the skill that cross-team coordination eventually demands — communicating across company boundaries with King's partnership.

---

### VISION branch (root: Research)

```
Research  [V1] ─────────────────────────────────────────── root
│
├── Gamification  [V2]                                     depth 1
│   └── Monetization  [V3]                                 depth 2
│
└── Marketing & Community  [V4]                            depth 1
    └── Metaverse & NFTs  [V5]                             depth 2
```

**Rationale:** Research is the foundation of strategic thinking — understanding the domain (Formula E sport), the player (R-QUEST user research), the market (competitive analysis). Gamification is applied research: taking findings about human motivation and encoding them into mechanics. Monetization is gamification applied to business models — payout formulas, loot systems, IAP. Marketing & Community grows from researching your audience and then reaching them. Metaverse & NFTs is where digital community and asset ownership converge (FEHV's NFT car integration).

---

## 4. Full Skill Reference Table

All 20 skills with their complete data. `parent` column shows the `id` of the parent node, or `—` for roots.

> **Note on years:** Estimated from portfolio.json career timeline (2007–present). Confirm before shipping.

### DESIGN

| id | Skill | Parent | Icon | Prof | Yrs | Description | Projects |
|---|---|---|---|---|---|---|---|
| `game-design` | Game Design | — | `Gamepad2` | ●●●●● | 19 | Designing core loops, game modes, and feature systems that balance engagement with long-term retention. | FEHV, Idle TD, Newton Slots |
| `level-design` | Level Design | `game-design` | `Layers` | ●●●●● | 12 | Crafting and producing levels at scale — from single handcrafted puzzles to pipelines delivering thousands. | King, Idle TD |
| `economy-design` | Economy Design | `level-design` | `Coins` | ●●●● | 9 | Balancing in-game economies: payout formulas, progression curves, loot systems, and NFT asset integration. | FEHV, Newton Slots, Idle TD |
| `ux-design` | UX Design | `game-design` | `Layout` | ●●●● | 7 | Designing screen flows, interaction patterns, and interface logic for mobile-first game and product experiences. | R-QUEST, FEHV |
| `product-design` | Product Design | `ux-design` | `Box` | ●●● | 4 | Defining product requirements, user stories, and feature scope for software products outside of games. | R-QUEST |

### PRODUCTION

| id | Skill | Parent | Icon | Prof | Yrs | Description | Projects |
|---|---|---|---|---|---|---|---|
| `backlog-management` | Backlog Management | — | `ListTodo` | ●●●● | 8 | Prioritizing and refining feature backlogs across concurrent game production tracks and multiple teams. | King, FEHV, Idle TD |
| `agile-planning` | Agile Planning | `backlog-management` | `GitBranch` | ●●●●● | 12 | Running sprints, standups, and iterative delivery cycles across multi-team game production environments. | King, FEHV, Idle TD |
| `documentation` | Documentation | `agile-planning` | `ScrollText` | ●●●●● | 15 | Writing GDDs, design specs, process guides, and standardized procedures that outlast the project. | King, FEHV, Idle TD |
| `project-management` | Project Management | `backlog-management` | `FolderKanban` | ●●●● | 8 | Owning project timelines and milestone planning for game and software delivery end-to-end. | King, Idle TD |
| `prototyping` | Prototyping | `project-management` | `FlaskConical` | ●●●● | 10 | Building rapid proof-of-concept versions to validate design decisions before full implementation cost. | R-QUEST, Idle TD, FEHV |

### LEADERSHIP

| id | Skill | Parent | Icon | Prof | Yrs | Description | Projects |
|---|---|---|---|---|---|---|---|
| `team-leadership` | Team Leadership | — | `Users` | ●●●●● | 8 | Managing up to 15 people across 6 concurrent teams — setting direction, unblocking, and maintaining quality. | King, FEHV |
| `coaching-mentoring` | Coaching & Mentoring | `team-leadership` | `GraduationCap` | ●●●●● | 7 | Training junior designers from scratch — 9 Junior Level Designers brought from onboarding to production-ready. | King |
| `roadmapping` | Roadmapping | `coaching-mentoring` | `Map` | ●●● | 8 | Defining phased delivery plans that sequence features by risk, dependency, and business value. | King, Idle TD |
| `cross-team-coordination` | Cross-team Coordination | `team-leadership` | `Network` | ●●●●● | 7 | Acting as lead coordinator across 6 teams, synchronizing dependencies and keeping production lanes unblocked. | King, FEHV |
| `stakeholder-communication` | Stakeholder Communication | `cross-team-coordination` | `MessageSquare` | ●●●● | 10 | Managing client relationships and translating between creative vision and business requirements. | King, FEHV, R-QUEST |

### VISION

| id | Skill | Parent | Icon | Prof | Yrs | Description | Projects |
|---|---|---|---|---|---|---|---|
| `research` | Research | — | `Search` | ●●●● | 12 | Conducting competitive analysis, domain research, and player behavior research to ground design in evidence. | FEHV, King |
| `gamification` | Gamification | `research` | `Trophy` | ●●●●● | 10 | Applying game mechanics (rewards, quests, progression) to non-game contexts to drive engagement and behavior change. | R-QUEST, Idle TD, Newton Slots |
| `monetization` | Monetization | `gamification` | `TrendingUp` | ●●●● | 9 | Designing monetization systems — IAP strategy, loot boxes, payout formulas, and progression gates. | Newton Slots, Idle TD |
| `marketing-community` | Marketing & Community | `research` | `Megaphone` | ●●● | 6 | Building player communities, producing promotional content, and running community management campaigns. | Idle TD |
| `metaverse-nfts` | Metaverse & NFTs | `marketing-community` | `Globe` | ●● | 3 | Working within blockchain game economies — NFT-integrated team management and on-chain asset design. | FEHV |

---

## 5. Data Schema

Two types: the flat `Skill` record (SSOT for all skill data) and the `SkillNode` tree structure (derived at render time from the flat array).

```typescript
// Flat skill record — source of truth
interface Skill {
  id: string;
  name: string;
  category: 'design' | 'production' | 'leadership' | 'vision';
  parent: string | null;     // null = root of its category tree
  icon: LucideIcon;
  proficiency: 1 | 2 | 3 | 4 | 5;
  years: number;
  description: string;
  projects: string[];         // display titles matching portfolio.json `title` fields
}

// Tree node — derived from flat array for rendering
interface SkillNode {
  skill: Skill;
  children: SkillNode[];
}

// Category config — drives WindowCard rendering
interface CategoryConfig {
  label: string;
  color: 'coral' | 'sky' | 'butter' | 'mint';
  appTitle: string;
}
```

**Tree build function** (runs once, at component init — not on every render):

```typescript
function buildTree(skills: Skill[], category: Skill['category']): SkillNode {
  const categorySkills = skills.filter(s => s.category === category);
  const root = categorySkills.find(s => s.parent === null)!;

  function buildNode(skill: Skill): SkillNode {
    return {
      skill,
      children: categorySkills
        .filter(s => s.parent === skill.id)
        .map(buildNode),
    };
  }

  return buildNode(root);
}
```

---

## 6. UI Layout

### 6.1 Full Section Layout

The section is split vertically: tree zone (upper ~60%) and detail zone (lower ~40%).

```
┌─────────────────────────────────────────────────────────────────┐
│  SKILL TREE                                              [label] │  ← section header, compact
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   DESIGN     │  PRODUCTION  │  LEADERSHIP  │      VISION        │
│   (coral)    │   (sky)      │  (butter)    │      (mint)        │
│              │              │              │                    │
│  [Game Des.] │  [Backlog M] │ [Team Lead.] │    [Research]      │  ← depth 0 (root)
│   ●●●●●      │   ●●●●       │  ●●●●●       │     ●●●●           │
│  /        \  │  /       \   │  /        \  │    /           \   │
│ [Level D.] [UX]  [Agile] [PM]  [Coach] [Cross]  [Gamif.] [Mktg] │  ← depth 1
│   ●●●●● ●●●●   ●●●●● ●●●●   ●●●●● ●●●●●   ●●●●●  ●●●           │
│    │     │       │              │       │      │        │        │
│[Economy][Product][Docs][Proto][Road][Stake][Moneti.][Meta]       │  ← depth 2
│  ●●●●  ●●●    ●●●●● ●●●●  ●●●  ●●●●   ●●●●   ●●    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  GAME DESIGN           [DESIGN]         ●●●●●  19 years  │  │  ← detail panel
│  │  ─────────────────────────────────────────────────────    │  │
│  │  Designing core loops, game modes, and feature systems    │  │
│  │  that balance engagement with long-term retention.        │  │
│  │                                                           │  │
│  │  SEEN IN: [Formula E High Voltage] [Idle TD] [Newton Sl] │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Tree Zone Structure

The 4 trees render inside a `grid grid-cols-4` container. Each column is one category tree. The columns are **not** WindowCards — the tree is rendered as raw nodes with connecting lines, no card wrapper. The whole section has one outer WindowCard or a Scene wrapper.

Category label appears at the top of each column as a colored Badge (coral/sky/butter/mint).

### 6.3 Skill Node Design

Each node is a compact **pill/badge style** element:
- Compact rectangle: icon (16px) + name + proficiency dots
- 2px border, `ink-base` color — consistent with Bauhaus thick-border aesthetic
- Root node: category color fill (`bg-coral`, `bg-sky`, etc.), slightly larger (`font-bold`, `text-sm`)
- Depth 1–2 nodes: `bg-surface-base` with `border-ink-base`, smaller (`text-xs`)
- **Active / selected** node: `bg-periwinkle text-surface-base border-ink-base`
- **Hover** state: `bg-surface-soft`, scale `1.03`, cursor pointer

```
Compact node rendering:

┌─────────────────────────┐     ← 2px border, ink-base
│ [icon] Game Design ●●●●● │     ← icon 16px, name, dot proficiency
└─────────────────────────┘
```

Proficiency dots: 5 spans, filled `text-ink-base` or unfilled `text-ink-subtle/30`:
`●●●●●` vs `●●●●○` vs `●●●○○`

### 6.4 Connecting Lines

Lines are drawn using the standard CSS nested-list tree pattern — `::before` and `::after` pseudo-elements on `<li>` elements create the vertical and horizontal connectors.

```
Line spec:
  width:  2px
  color:  var(--color-ink-base)
  style:  solid  (not dashed — Bauhaus is direct)
```

The connecting line from root splits into two branches using a horizontal segment + two vertical drops. This is achievable in pure CSS with no SVG:

```css
/* Vertical connector down from parent */
.skill-tree-branch::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  border-left: 2px solid var(--color-ink-base);
}

/* Horizontal connector from vertical to child */
.skill-tree-child::before {
  content: '';
  position: absolute;
  right: 50%;
  top: 0;
  width: 50%;
  border-top: 2px solid var(--color-ink-base);
}
```

### 6.5 Mobile Layout (< lg)

On mobile the 4-column grid collapses. Each category tree stacks vertically, separated by a divider. The full tree remains visible — it's just scrollable within the section rather than side-by-side. The detail panel appears below the active skill's node as an inline expand (pushes content below it down).

---

## 7. Interaction Design

### States

| State | Visual |
|---|---|
| **Default** | All nodes at full opacity. Detail panel shows: `"SELECT A SKILL TO INSPECT"` in mono uppercase. |
| **Hover** | Node background → `bg-surface-soft`, scale `1.03`. Proficiency dots animate from unfilled → filled (150ms, left-to-right stagger). |
| **Active / selected** | Node → `bg-periwinkle text-surface-base`. Selection persists on click. |
| **Detail panel empty** | Periwinkle-outlined WindowCard, centered mono prompt, icon of a cursor. |
| **Detail panel populated** | Skill name (display font, large), category badge, proficiency dots, years, description, project badges. Transitions via `AnimatePresence` — content fades out/in when selection changes. |

### Detail Panel Content

```
GAME DESIGN                  [DESIGN ●]          ← name (font-display font-black text-2xl) + category badge
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ← horizontal rule
●●●●●  5 / 5   ·   19 years                     ← proficiency scale + years, font-mono text-sm text-ink-subtle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Designing core loops, game modes, and feature    ← description, font-body text-sm text-ink-subtle
systems that balance engagement with long-term
retention.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEEN IN                                          ← MONO_LABEL
[Formula E High Voltage]  [Idle TD]  [Newton Slots]  ← Badge chips, base color, sm, non-interactive for MVP
```

Phase 5 enhancement (post-MVP): project badges in the detail panel scroll to that project card when clicked.

---

## 8. Project Cross-Reference Matrix

Which skills are evidenced by which projects — populates the "SEEN IN" section.

| Skill | FEHV | King | R-QUEST | Idle TD | Newton Slots |
|---|---|---|---|---|---|
| Game Design | ✓ | | | ✓ | ✓ |
| Level Design | | ✓ | | ✓ | |
| Economy Design | ✓ | | | ✓ | ✓ |
| UX Design | ✓ | | ✓ | | |
| Product Design | | | ✓ | | |
| Backlog Management | ✓ | ✓ | | ✓ | |
| Agile Planning | ✓ | ✓ | | ✓ | |
| Documentation | ✓ | ✓ | | ✓ | |
| Project Management | | ✓ | | ✓ | |
| Prototyping | ✓ | | ✓ | ✓ | |
| Team Leadership | ✓ | ✓ | | | |
| Coaching & Mentoring | | ✓ | | | |
| Roadmapping | | ✓ | | ✓ | |
| Cross-team Coordination | ✓ | ✓ | | | |
| Stakeholder Communication | ✓ | ✓ | ✓ | | |
| Research | ✓ | ✓ | | | |
| Gamification | | | ✓ | ✓ | ✓ |
| Monetization | | | | ✓ | ✓ |
| Marketing & Community | | | | ✓ | |
| Metaverse & NFTs | ✓ | | | | |

---

## 9. Lucide Icon Map

| Skill | Icon | In BentoSkills already? |
|---|---|---|
| Game Design | `Gamepad2` | ✓ |
| Level Design | `Layers` | ✓ |
| Economy Design | `Coins` | ✓ |
| UX Design | `Layout` | ✓ |
| Product Design | `Box` | ✓ |
| Backlog Management | `ListTodo` | — |
| Agile Planning | `GitBranch` | — |
| Documentation | `ScrollText` | — |
| Project Management | `FolderKanban` | — |
| Prototyping | `FlaskConical` | — |
| Team Leadership | `Users` | ✓ |
| Coaching & Mentoring | `GraduationCap` | — |
| Roadmapping | `Map` | — |
| Cross-team Coordination | `Network` | — |
| Stakeholder Communication | `MessageSquare` | — |
| Research | `Search` | ✓ |
| Gamification | `Trophy` | — |
| Monetization | `TrendingUp` | — |
| Marketing & Community | `Megaphone` | — |
| Metaverse & NFTs | `Globe` | — |

All icons are standard Lucide. No new dependency.

---

## 10. Implementation Plan

### Files changed

| File | Change |
|---|---|
| `src/adapters/primary/components/SkillTree.tsx` | Full rewrite — tree data, recursive tree renderer, detail panel, interaction state |
| `docs/Roadmap.md` | Mark Phase 4 design decision resolved |

### Files unchanged

| File | Reason |
|---|---|
| `src/components/bento/BentoSkills.tsx` | Separate consumer of skills — used in project cards, unrelated to the SkillTree section |
| `portfolio.json` | No new data required — project titles in skill records match existing titles |
| `src/index.css` | No new tokens needed — uses existing palette + border tokens |
| All atom components | `WindowCard`, `Badge`, `Text` — new consumers only, no internal changes |

### New component (extraction threshold)

If `SkillTree.tsx` grows beyond ~200 lines, extract `SkillDetailPanel.tsx` as a sibling molecule. Defer until after first implementation to avoid premature extraction.

---

## 11. Open Questions — Confirm Before Building

| # | Question | Default if not answered |
|---|---|---|
| Q1 | **Proficiency levels accurate?** Review Section 4 table, column `Prof`. | As proposed |
| Q2 | **Years values accurate?** All estimated — especially skills before Idle TD (pre-2018). | As proposed |
| Q3 | **Keep Metaverse & NFTs at V5 (2/5)?** Or replace with something that better represents you? | Keep |
| Q4 | **Hierarchy rationale — any parent/child relationships that feel wrong?** Review Section 3. | As proposed |
| Q5 | **Mobile: inline expand or hide detail panel on mobile entirely?** | Inline expand |
| Q6 | **Descriptions: one sentence each — are these accurate?** Review Section 4, column `Description`. | As proposed |

---

*Proposal v2 · SkillTree Section · 2026-06-17*
*Direction: hierarchical branching tree with CSS connecting lines + bottom detail panel*
