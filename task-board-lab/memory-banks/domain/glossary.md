# Domain Glossary: Personal Task Board

**Project:** Personal Task Board  
**Last Updated:** May 12, 2026  
**Version:** 1.2

## Task

**Definition:** A unit of work tracked on the board.

**Context:** Tasks are the main planning object in the product and the primary signal of day-to-day progress.

**Example:** "Create a task to draft the keyboard shortcuts help overlay."

---

## Project

**Definition:** A container that groups related tasks under one work context.

**Relationships:** A project contains many tasks; one task belongs to exactly one project.

---

## Task Status

**Definition:** The lifecycle stage of a task.

**Context:** Status organizes board columns and shows whether work is pending, active, or completed.

**Example:** A task moves from Todo to In Progress, then to Done.

---

## Column

**Definition:** A visual grouping that displays tasks sharing the same status.

**Relationships:** Each column maps to one task status and belongs to the Kanban Board layout.

---

## Kanban Board

**Definition:** The primary workspace showing tasks in status-based columns.

**Context:** It is the central interaction surface for monitoring and updating work.

**Example:** Users review the board each morning to decide what to start next.

---

## Keyboard-First Interface

**Definition:** A design approach where core product actions are efficient through keyboard navigation and shortcuts.

**Relationships:** Depends on keyboard shortcuts, focus management, and accessible interaction patterns.

---

## Offline-First Architecture

**Definition:** An architecture that keeps the app fully usable without internet connectivity.

**Context:** This supports reliability, fast startup, and user data ownership.

**Example:** Users can update project tasks in airplane mode with no service dependency.

---

## Data Persistence

**Definition:** The mechanism that retains projects and tasks across sessions.

**Relationships:** Supports offline-first behavior and data reliability goals.

---

## Project Selector

**Definition:** The interface control used to switch the active project.

**Context:** It keeps current work context explicit and reduces navigation friction.

**Example:** "Open project selector and switch from Learning React to Client A."

---

## Drag and Drop

**Definition:** A direct manipulation interaction for moving tasks between status columns.

**Relationships:** Updates task status and refreshes Kanban board grouping.

---

## Terminology Style Guide

Use these conventions consistently in product copy, code comments, tickets, and documentation.

**Preferred language:**

- "Create a task" (not "add" or "make").
- "Switch projects" (not "navigate to project").
- "Mark as Done" (use status name as written).
- "In Progress" as the display label and `in_progress` as the status token.
- "Offline-first" and "keyboard-first" with hyphenation.

**Avoid in MVP scope:**

- Multi-user terms such as "assignee" or "team member".
- Backend/cloud terms such as "sync to server" or "push to cloud".
- Workflow terms not in MVP status model (for example "Blocked", "Archived").

**Capitalization and token rules:**

- Use title case for UI status labels: Todo, In Progress, Done.
- Use lowercase snake_case for machine-readable status tokens.
- Treat "Project" and "Task" as domain entities in architecture/docs; use lowercase in general prose unless at sentence start.

---

## Key Business Rules

### Single Project Ownership

**Rule:** Every task must belong to exactly one project.
**Rationale:** Prevents ambiguous ownership and keeps project reporting accurate.
**Example:** A task cannot appear in both "Client A" and "Personal" at the same time.

### Fixed MVP Status Model

**Rule:** Tasks use only three statuses in MVP: Todo, In Progress, Done.
**Rationale:** Keeps workflow clear, lightweight, and consistent.
**Example:** "Blocked" is not a valid MVP status.

### Offline Availability

**Rule:** Core task and project operations must function without internet access.
**Rationale:** Offline-first is a core product promise and architectural decision.
**Example:** Creating, editing, and moving tasks must still work during network loss.

### Keyboard Coverage for Core Actions

**Rule:** Core interactions must be operable via keyboard-first workflows.
**Rationale:** The primary persona values speed and low context switching.
**Example:** Users can create and move tasks without relying on pointer-only actions.

## Related Documentation

- `specs/prds/PRD-001-personal-taskboard-mvp.md`
- `memory-banks/architecture/overview.md`
- `memory-banks/conventions/coding-standards.md`
- `memory-banks/workflows/development-process.md`

**Owner:** Development Team  
**Status:** Active  
**Next Review:** June 15, 2026 (Post-MVP Phase 1)
