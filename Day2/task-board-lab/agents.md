# Project Conventions - Task Board Lab

This file establishes conventions for the Task Board Lab project to ensure consistency across specifications, code, and team communication.

## Tech Stack

### Frontend

- **Markup:** HTML5
- **Styling:** CSS3
- **Graphics:** Canvas API (for game rendering and visualization)
- **Language:** TypeScript
- **State Management:** localStorage (client-side persistence only)
- **Backend:** None (fully client-side application)

### Development Environment

- **Build Tool:** [To be determined based on team preference]
- **Package Manager:** npm or yarn
- **Version Control:** Git

### Key Constraints

- No external backend API calls
- All data persists to browser localStorage
- Canvas API for any graphical game elements
- TypeScript for type safety and maintainability

---

## Specification Structure

All product specifications, epics, and user stories follow a strict hierarchy and storage convention.

### Directory Layout

```
project-root/
├── specs/
│   ├── templates/
│   │   ├── prd-template.md           (Template for Product Requirements)
│   │   ├── epic-template.md          (Template for Epics)
│   │   ├── user-story-template.md    (Template for User Stories)
│   │   └── WORKFLOW-GUIDE.md         (How to use templates)
│   ├── prds/
│   │   └── [product-name]-prd.md    (Filled-in PRDs)
│   ├── epics/
│   │   └── [epic-name]-epic.md      (Filled-in Epics)
│   └── stories/
│       └── [story-id]-story.md      (Filled-in User Stories)
└── .github/
    └── prompts/
        └── [agent-prompts].md       (AI agent instructions)
```

### Storage Locations

- **PRDs:** `specs/prds/` — High-level product documentation
- **Epics:** `specs/epics/` — Feature-level breakdowns
- **Stories:** `specs/stories/` — Implementation-level tasks
- **Templates:** `specs/templates/` — Reusable templates and guides

---

## Naming Conventions

### PRD Files

**Format:** `specs/prds/[product-name]-prd.md`

**Examples:**

- `specs/prds/multiplayer-card-game-prd.md`
- `specs/prds/user-authentication-prd.md`
- `specs/prds/game-lobby-system-prd.md`

**Rules:**

- Use lowercase, hyphen-separated names
- Include "prd" suffix for clarity
- Be specific about what the PRD covers

### Epic Files

**Format:** `specs/epics/[epic-name]-epic.md`

**Examples:**

- `specs/epics/user-auth-epic.md`
- `specs/epics/lobby-matchmaking-epic.md`
- `specs/epics/gameplay-engine-epic.md`
- `specs/epics/card-deck-management-epic.md`

**Rules:**

- Use lowercase, hyphen-separated names
- Include "epic" suffix
- Reference parent PRD in the epic document
- Group related stories by epic

### User Story Files

**Format:** `specs/stories/[story-id]-[story-slug]-story.md`

**Examples:**

- `specs/stories/auth-001-email-signup-story.md`
- `specs/stories/auth-002-password-reset-story.md`
- `specs/stories/lobby-001-create-game-room-story.md`
- `specs/stories/gameplay-001-play-card-story.md`

**Rules:**

- Prefix with story ID (e.g., `auth-001`, `lobby-001`)
- Use lowercase, hyphen-separated slugs
- Include "story" suffix
- Include epic reference in story content

### Story ID Format

`[epic-abbreviation]-[sequence-number]`

**Examples:**

- `auth-001`, `auth-002` — User Auth epic stories
- `lobby-001`, `lobby-002` — Lobby System epic stories
- `game-001`, `game-002` — Gameplay epic stories

---

## File Organization Best Practices

### Root Level

```
task-board-lab/
├── src/                  (Source code - organized by feature)
├── specs/                (All specification documents)
├── .github/              (GitHub-specific files and agent prompts)
├── README.md             (Project overview)
├── agents.md             (This file - project conventions)
└── package.json          (NPM configuration)
```

### Source Code Organization

```
src/
├── components/           (Reusable UI components)
├── game/                 (Game logic and engine)
├── storage/              (localStorage wrapper/utilities)
├── types/                (TypeScript type definitions)
├── styles/               (Global CSS files)
└── index.ts              (Entry point)
```

### Specification Document References

Each document should link to related files:

- **PRD** → Links to Epic files
- **Epic** → Links to parent PRD and child Story files
- **Story** → Links to parent Epic

**Example linking in markdown:**

```markdown
- **Epic:** [User Authentication](../epics/user-auth-epic.md)
- **Related Stories:**
  - [Email Signup](auth-001-email-signup-story.md)
  - [Password Reset](auth-002-password-reset-story.md)
```

---

## AI Assistant Guidelines

When working with this project, follow these conventions:

### When Creating New Specifications

1. Use the appropriate template from `specs/templates/`
2. Follow the naming conventions exactly
3. Link related documents (PRD ↔ Epic ↔ Story)
4. Update the parent document with links to children

### When Creating New Code

1. Use TypeScript with strict mode enabled
2. Store game state in localStorage using the wrapper utilities
3. Use Canvas API for any game visualizations
4. Organize code by feature, not by type (components/game/etc., not controllers/models)

### When Making Decisions

1. Check `agents.md` first (this file) for conventions
2. Review relevant spec templates in `specs/templates/`
3. Maintain consistency with existing patterns
4. Ask for clarification rather than assume

---

## Specification Workflow Summary

### Creating a New Feature

1. **Write PRD** → `specs/prds/[name]-prd.md`
   - Define overall product goals and personas
   - Document success metrics

2. **Break into Epics** → `specs/epics/[epic-name]-epic.md`
   - Identify major feature components
   - Estimate complexity (S/M/L)
   - Link to parent PRD

3. **Create Stories** → `specs/stories/[id]-[slug]-story.md`
   - Define actionable tasks
   - Write acceptance criteria
   - Link to parent Epic

4. **Implement** → `src/[feature]/`
   - Follow TypeScript and Canvas API conventions
   - Use localStorage for data persistence
   - Reference story acceptance criteria

5. **Verify** → Check Definition of Done in story document

---

## Version Control

### Commit Messages

When committing spec changes:

- `docs(spec): add prd for [feature-name]`
- `docs(spec): create epic [epic-name]`
- `docs(spec): add user stories for [epic-name]`

When committing code:

- `feat(component): implement [feature]`
- `fix(game): resolve [issue]`
- `refactor(storage): improve localStorage wrapper`

---

## Questions & Updates

If you encounter a situation not covered by these conventions:

1. Document your decision in this file
2. Ensure it aligns with the existing patterns
3. Communicate the new convention to the team
4. Update this file for future consistency
