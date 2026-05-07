# Task Board Lab - Project Conventions

**Last Updated:** May 7, 2026  
**Version:** 1.0  

---

## Project Overview

This document establishes conventions for the **Task Board Lab** project. All AI assistants and developers should follow these conventions when working on this project.

**Project:** Task Board Lab  
**Type:** Specification & Project Management System  
**Goal:** Create a structured approach to managing PRDs, Epics, and User Stories  

---

## 1. Technology Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** React Context API or hooks
- **Styling:** CSS/Tailwind (TBD)
- **Data Persistence:** localStorage (browser-based, no backend)

### Development Tools
- **Package Manager:** npm or yarn
- **Version Control:** Git
- **Code Quality:** ESLint, Prettier (recommended)

### Key Constraints
- **No Backend Server:** All data is stored in browser localStorage
- **No Database:** In-memory state management only
- **Single Page Application (SPA):** Client-side routing only
- **Offline-First:** Application should work offline

---

## 2. Specification Structure

All specification documents are organized in the `specs/` directory with clear subdirectories for different artifact types.

### Directory Layout

```
task-board-lab/
├── specs/
│   ├── templates/          # Template files for creating new specs
│   │   ├── prd-template.md
│   │   ├── epic-template.md
│   │   ├── story-template.md
│   │   └── adr-template.md
│   ├── prds/               # Product Requirements Documents
│   │   └── [PRD_ID]-[project-name].md
│   ├── epics/              # Epic specifications
│   │   └── [EPIC_ID]-[epic-name].md
│   ├── stories/            # User stories
│   │   └── [STORY_ID]-[story-name].md
│   └── decisions/          # Architecture Decision Records
│       └── [ADR_ID]-[decision-name].md
├── src/                    # React source code
├── public/                 # Static assets
├── agents.md               # This file - project conventions
├── README.md               # Project overview
└── package.json
```

### Document Storage Rules

| Document Type | Directory | File Pattern | Example |
|---|---|---|---|
| PRD | `specs/prds/` | `PRD-[NUMBER]-[slug].md` | `PRD-001-task-board-mvp.md` |
| Epic | `specs/epics/` | `EPIC-[NUMBER]-[slug].md` | `EPIC-001-user-authentication.md` |
| Story | `specs/stories/` | `US-[NUMBER]-[slug].md` | `US-001-display-task-list.md` |
| ADR | `specs/decisions/` | `ADR-[NUMBER]-[slug].md` | `ADR-001-react-context-for-state.md` |

---

## 3. Naming Conventions

### PRD (Product Requirements Document) Naming

**Pattern:** `PRD-[NUMBER]-[descriptive-slug].md`

- **[NUMBER]:** Sequential 3-digit number (001, 002, 003, etc.)
- **[descriptive-slug]:** Kebab-case, 2-4 words describing the project

**Examples:**
- ✅ `PRD-001-task-board-mvp.md`
- ✅ `PRD-002-user-collaboration-features.md`
- ✅ `PRD-003-reporting-analytics.md`

**Inside the file:**
- Use metadata: `Project Name:`, `Version:`, `Date:`
- Reference format in headers: `PRD-001`

### Epic Naming

**Pattern:** `EPIC-[NUMBER]-[descriptive-slug].md`

- **[NUMBER]:** Sequential 3-digit number (001, 002, 003, etc.)
- **[descriptive-slug]:** Kebab-case, 2-3 words describing the epic

**Examples:**
- ✅ `EPIC-001-user-authentication.md`
- ✅ `EPIC-002-task-management-core.md`
- ✅ `EPIC-003-advanced-filtering.md`

**Inside the file:**
- Use metadata: `Epic ID:`, `Epic Title:`, `Status:`
- Link to parent PRD: `Related PRD Section(s): PRD-001`

### User Story Naming

**Pattern:** `US-[NUMBER]-[descriptive-slug].md`

- **[NUMBER]:** Sequential 4-digit number (0001, 0002, 0003, etc.)
- **[descriptive-slug]:** Kebab-case, 2-3 words describing the user action

**Examples:**
- ✅ `US-0001-display-task-list.md`
- ✅ `US-0002-add-new-task.md`
- ✅ `US-0003-mark-task-complete.md`

**Inside the file:**
- Use metadata: `Story ID:`, `Title:`, `Epic:`
- Link to parent epic: `Epic: EPIC-002`

### Architecture Decision Record (ADR) Naming

**Pattern:** `ADR-[NUMBER]-[descriptive-slug].md`

- **[NUMBER]:** Sequential 3-digit number (001, 002, 003, etc.)
- **[descriptive-slug]:** Kebab-case, 2-4 words describing the architectural decision

**Examples:**
- ✅ `ADR-001-react-context-state-management.md`
- ✅ `ADR-002-localStorage-for-persistence.md`
- ✅ `ADR-003-vite-over-create-react-app.md`

**Inside the file:**
- Use metadata: `ADR ID:`, `Title:`, `Status:` (PROPOSED/ACCEPTED/DEPRECATED/SUPERSEDED/REJECTED)
- Include all required sections: Context, Decision, Consequences, Alternatives

### ID Sequencing Rules

- **PRDs:** Numbered 001, 002, 003... (reset for each major product area if needed)
- **Epics:** Numbered 001, 002, 003... (can reference PRD: EPIC-001 = under PRD-001)
- **Stories:** Numbered 0001, 0002, 0003... (nested under epics)
- **ADRs:** Numbered 001, 002, 003... (chronological, never reset)

---

## 4. File Organization & Structure

### PRD Organization

```
specs/prds/
├── PRD-001-task-board-mvp.md
│   └── Contains: Overview, User Personas, Use Cases, Requirements
├── PRD-002-collaboration-features.md
└── PRD-003-analytics-reporting.md
```

**PRD Guidelines:**
- Each PRD is a single file
- One project/product initiative per PRD
- Reference related PRDs if necessary
- Include version history in metadata

### Epic Organization

```
specs/epics/
├── EPIC-001-user-authentication.md
│   └── References: PRD-001, links to related stories
├── EPIC-002-task-management-core.md
└── EPIC-003-advanced-filtering.md
```

**Epic Guidelines:**
- Each epic maps to a major feature area
- Include parent PRD reference
- List user stories to be created (placeholder section)
- Track epic status: NOT STARTED → IN PROGRESS → COMPLETED

### Story Organization

```
specs/stories/
├── US-0001-display-task-list.md
│   └── References: EPIC-002, User story format with AC
├── US-0002-add-new-task.md
├── US-0003-mark-task-complete.md
├── US-0004-delete-task.md
└── US-0005-edit-task-title.md
```

**Story Guidelines:**
- One user story per file
- Include parent epic reference
- Clear acceptance criteria
- INVEST validation
- Estimated story points

### ADR Organization

```
specs/decisions/
├── ADR-001-react-context-state-management.md
│   └── Status: ACCEPTED, References: Tech Stack decision
├── ADR-002-localStorage-for-persistence.md
├── ADR-003-vite-over-create-react-app.md
└── ADR-004-offline-first-architecture.md
```

**ADR Guidelines:**
- One architectural decision per file
- Include Status field (PROPOSED/ACCEPTED/DEPRECATED/SUPERSEDED/REJECTED)
- All five core sections: Context, Decision, Consequences, Alternatives Considered
- Link to related PRDs, Epics, Stories
- Include implementation details and code examples when applicable

---

## 5. Specification Cross-References

### How to Link Documents

Use clear reference patterns in documents:

**PRD → Epic:**
```
Related PRD Section(s): PRD-001 (Section 4.1 - Core Features)
```

**Epic → Stories:**
```
Related Epics: EPIC-002-task-management-core
User Stories to be Created: (list of US-XXXX)
```

**Story → Epic:**
```
Epic: EPIC-002-task-management-core
Priority: P1
```

**Story → PRD:**
```
Derived From: PRD-001, Section 4.1
```

### Traceability Matrix (Optional)

Create a `specs/TRACEABILITY.md` file to track relationships:

```markdown
# Traceability Matrix

| PRD | Epic | Stories | Status |
|-----|------|---------|--------|
| PRD-001 | EPIC-001 | US-0001, US-0002, US-0003 | Active |
| PRD-001 | EPIC-002 | US-0004, US-0005 | Planning |
```

---

## 6. Workflow & Conventions

### Creating New Specifications

1. **For a new Product (PRD):**
   - Copy `specs/templates/prd-template.md`
   - Name it `PRD-[NUMBER]-[slug].md`
   - Save to `specs/prds/`
   - Update metadata and fill in sections

2. **For a new Epic:**
   - Copy `specs/templates/epic-template.md`
   - Name it `EPIC-[NUMBER]-[slug].md`
   - Save to `specs/epics/`
   - Link to parent PRD
   - Fill in sections

3. **For a new User Story:**
   - Copy `specs/templates/story-template.md`
   - Name it `US-[NUMBER]-[slug].md`
   - Save to `specs/stories/`
   - Link to parent Epic
   - Complete INVEST validation

4. **For an Architecture Decision (ADR):**
   - Copy `specs/templates/adr-template.md`
   - Name it `ADR-[NUMBER]-[slug].md`
   - Save to `specs/decisions/`
   - Complete all five required sections
   - Set Status to PROPOSED initially
   - Link to related PRDs/Epics when applicable

### Status Tracking

All specification documents should include a **Status** field:

- **Draft:** Initial creation, not yet reviewed
- **In Review:** Awaiting feedback/approval
- **Approved:** Ready for implementation
- **In Progress:** Currently being worked on
- **On Hold:** Temporarily paused
- **Completed:** Finished and deployed

---

## 7. AI Assistant Guidelines

### When Creating Specifications

AI assistants should:

1. ✅ Follow the naming conventions exactly
2. ✅ Save files to the correct subdirectory
3. ✅ Include all required metadata fields
4. ✅ Provide placeholder guidance text
5. ✅ Maintain cross-references between documents
6. ✅ Use consistent formatting (Markdown)
7. ✅ Include validation checklists (e.g., INVEST for stories)

### When Updating Specifications

AI assistants should:

1. ✅ Preserve existing metadata (ID, creation date)
2. ✅ Update version number and last updated date
3. ✅ Add entry to document history
4. ✅ Maintain cross-reference consistency
5. ✅ Update related documents if needed

### When Referencing Specifications

AI assistants should:

1. ✅ Use full file paths: `specs/prds/PRD-001-task-board-mvp.md`
2. ✅ Reference by ID in text: `PRD-001`, `EPIC-002`, `US-0003`
3. ✅ Maintain traceability links
4. ✅ Validate all references exist

---

## 8. Example Workflow

### Scenario: Create a new user story

1. **Check parent epic exists:**
   - Verify `specs/epics/EPIC-002-task-management-core.md` exists

2. **Determine story number:**
   - Check latest story: `US-0003-mark-task-complete.md`
   - Next story should be: `US-0004-[action].md`

3. **Create from template:**
   - Copy `specs/templates/story-template.md`
   - Save as `specs/stories/US-0004-delete-task.md`

4. **Fill in metadata:**
   ```
   Story ID: US-0004
   Title: Delete a Task
   Epic: EPIC-002
   ```

5. **Complete user story:**
   - Write: "As a [persona], I want to [action] so that [benefit]"
   - Define 3-5 acceptance criteria
   - Validate INVEST principles
   - Add to parent epic's story list

6. **Reference in epic:**
   - Update `specs/epics/EPIC-002-task-management-core.md`
   - Add `US-0004` to user stories section

---

## 9. Technology-Specific Notes

### React Component Structure

When implementing stories in React:

```typescript
// File: src/components/TaskList.tsx
// Related to: US-0001-display-task-list.md

import React from 'react';

export const TaskList: React.FC = () => {
  // Implementation based on story AC
};
```

### localStorage Data Model

```typescript
// File: src/utils/storage.ts
// Related to: PRD-001 (Data requirements section)

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
```

### No Backend Implications

- All state lives in React components or Context
- Data persists via localStorage
- No API calls to server
- Implement offline-first patterns

---

## 10. Document Template Locations

| Document Type | Template Location |
|---|---|
| PRD | `specs/templates/prd-template.md` |
| Epic | `specs/templates/epic-template.md` |
| User Story | `specs/templates/story-template.md` |
| ADR | `specs/templates/adr-template.md` |

---

## 11. Common Mistakes to Avoid

❌ **DO NOT:**
- Use random numbering for IDs
- Mix document types in wrong directories
- Create duplicate PRDs/Epics/Stories/ADRs
- Forget to update cross-references
- Store specs outside `specs/` directory
- Use non-kebab-case slugs
- Miss the INVEST validation for stories
- Create ADRs without all five required sections
- Leave ADRs in PROPOSED status indefinitely

✅ **DO:**
- Follow naming conventions exactly
- Update metadata (version, date, history)
- Link related documents
- Use templates as starting point
- Validate all acceptance criteria are testable
- Keep slugs concise and descriptive
- Update ADR status after decisions are made
- Include trade-offs and alternatives in ADRs

---

## 12. Contact & Updates

**Project Owner:** [PROJECT OWNER NAME]  
**Last Updated:** May 7, 2026  
**Next Review:** [DATE]  

For questions about these conventions, refer to the project README or contact the project lead.

---

## Quick Reference Card

```
📁 Directory Structure:
  specs/prds/        → Product Requirements Documents
  specs/epics/       → Epic Specifications
  specs/stories/     → User Stories
  specs/decisions/   → Architecture Decision Records (ADRs)
  specs/templates/   → Reusable templates for all documents

📝 File Naming:
  PRD:   PRD-[NUMBER]-[slug].md        (e.g., PRD-001-task-board-mvp.md)
  Epic:  EPIC-[NUMBER]-[slug].md       (e.g., EPIC-001-authentication.md)
  Story: US-[NUMBER]-[slug].md         (e.g., US-0001-display-tasks.md)
  ADR:   ADR-[NUMBER]-[slug].md        (e.g., ADR-001-state-management.md)

🔗 Cross-References:
  PRD → Epic → Story (parent relationships)
  ADRs link to affected PRDs/Epics/Stories
  Always link up to parent document

⚙️ Tech Stack:
  React 18 + Vite + TypeScript
  localStorage (no backend)
  Offline-first SPA

✅ Best Practices:
  - Use templates
  - Follow naming conventions
  - Maintain cross-references
  - Validate INVEST for stories
  - Include all 5 sections in ADRs
  - Update document history & status
  - Use kebab-case for slugs
```

---

**End of Conventions Document**
