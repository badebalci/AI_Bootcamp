# User Story: Select Project and View Its Tasks

**Story ID:** US-0002  
**Title:** Select Project and View Its Tasks  
**Epic:** EPIC-002 - Multi-Project Support  
**Priority:** P0  
**Status:** TO DO  
**Created Date:** May 7, 2026  
**Sprint:** Sprint 1 (May 15-29)  

---

## User Story

### Story Statement

**As a** freelancer managing multiple client projects  
**I want to** click on a project name to select it and see only that project's tasks  
**So that** I can focus on one client's work at a time without seeing other projects' tasks  

---

## Context

### Background
After creating multiple projects, users need to select which project to work on. The board should display only the selected project's tasks, providing a focused work environment. This is critical for Jordan (Freelancer) who manages 3-5 active projects.

### Related Work
- **Related Stories:** US-0001 (Create Project), US-0005 (Persist Selection)
- **Dependencies:** US-0001 must be complete (projects must exist)
- **Related Epic:** EPIC-002 (Multi-Project Support)

---

## Acceptance Criteria

- [ ] **Criterion 1:** Project selector dropdown displays all created projects with task counts  
  *Test: Dropdown shows "Client A (5 tasks)", "Client B (2 tasks)", etc.*

- [ ] **Criterion 2:** User clicks on a project name and board updates to show only that project's tasks  
  *Test: Click "Client A", board shows only Client A's 5 tasks in all columns*

- [ ] **Criterion 3:** Other projects' tasks are hidden (board shows empty state if project has no tasks)  
  *Test: Click "Client B", see 2 tasks, Client A's tasks are no longer visible*

- [ ] **Criterion 4:** Selected project is visually highlighted in dropdown  
  *Test: After selecting project, it appears bold/highlighted in dropdown*

- [ ] **Criterion 5:** Board updates within 300ms of selecting a project  
  *Test: Select project, verify visual update within 300ms*

---

## Additional Acceptance Scenarios

### Happy Path
1. User clicks project selector dropdown
2. Dropdown shows list of projects: "Client A (5)", "Client B (2)", "Personal (8)"
3. User clicks on "Client A"
4. Dropdown closes
5. Board updates to show only Client A's tasks (5 tasks across To Do, In Progress, Done columns)
6. Dropdown header now shows "Client A" as selected project
7. New tasks created default to Client A

### Edge Cases & Alternate Flows

**Edge Case 1:** Select project with no tasks
- Precondition: Project "Client B" has 0 tasks
- User clicks "Client B"
- Expected: Board shows empty state ("No tasks in To Do", "No tasks in In Progress", etc.)
- Task creation defaults to Client B

**Edge Case 2:** Select project while creating task
- Precondition: User has modal open to create task in Project A
- User clicks dropdown and selects Project B
- Expected: Either close modal and switch projects, or keep modal open and create in Project B
- Suggest: Close modal and switch

**Edge Case 3:** Rapid project switching
- Precondition: User is a power user
- User rapidly clicks between projects
- Expected: No errors, board updates correctly on each switch
- No tasks from wrong project appear

**Edge Case 4:** Select same project again
- Precondition: "Client A" is already selected
- User clicks dropdown and selects "Client A" again
- Expected: No change, board continues showing Client A's tasks

**Error Case:** Project deleted during selection
- Precondition: User tries to select deleted project (edge case)
- Expected: Default to available project or show error
- Suggest: Not possible in MVP (no concurrent deletion)

---

## Technical Notes

### Implementation Hints (Optional)
- Filter tasks in board: `tasks.filter(t => t.projectId === selectedProjectId)`
- Store currentProjectId in React Context or state
- Update all components displaying tasks to use filter
- Dropdown shows project count from filtered task list
- Keyboard shortcut: Ctrl+P opens dropdown and allows selection

### Technical Constraints
- Must handle projects with 0 tasks (show empty state)
- Task filtering must be efficient (<300ms for 50 tasks)
- Project switching must not lose unsaved data (check US-0001 save status)

### Performance Requirements
- Project switch: <300ms (visual update)
- Task filtering: <100ms for <100 tasks
- Dropdown render: <200ms

---

## Design & UX

### Wireframes/Mockups
- Dropdown showing all projects with selected state (bold/highlight)
- Board columns show empty state if project has no tasks
- Header shows current project name

### Design Specifications
- Selected project: bold text, background highlight
- Hover state: light gray background
- Task counts in parentheses: "Client A (5)"
- Smooth transition between projects (fade or slide animation)

### Accessibility Requirements
- **WCAG Level:** AA
- **Requirements:**
  - Dropdown keyboard accessible (arrow keys, Enter)
  - Selected project announced to screen readers
  - Task count announced
  - Focus visible on dropdown items

---

## Estimation

### Story Points
**Estimate:** 5 story points

**Estimation Method:** Fibonacci

**Confidence Level:** HIGH

**Justification:**
- Task filtering logic (simple filtering function)
- State management (update currentProjectId)
- UI updates (dropdown selection, board refresh)
- Moderate complexity but well-scoped

---

## Definition of Done

This story is complete when:

✅ **Development:**
- [ ] Project filtering logic implemented
- [ ] Task filtering by projectId working
- [ ] Dropdown displays selected project
- [ ] Board updates when project changes
- [ ] State management for currentProjectId
- [ ] Keyboard support for project selection (arrow keys)

✅ **Testing:**
- [ ] Manual testing: Switch between projects
- [ ] Manual testing: Verify only selected project's tasks shown
- [ ] Manual testing: Empty project shows empty state
- [ ] Manual testing: Task counts accurate
- [ ] Performance: Project switch <300ms

✅ **Code Quality:**
- [ ] Code review completed
- [ ] No console errors
- [ ] Efficient filtering (no unnecessary re-renders)
- [ ] Comments on filtering logic

✅ **Integration:**
- [ ] Works with EPIC-001 task board
- [ ] New tasks go to selected project
- [ ] No interference with drag-drop functionality

✅ **Accessibility:**
- [ ] Dropdown keyboard navigation works
- [ ] Selected project state clear visually
- [ ] Screen reader announces project change

---

## INVEST Validation Checklist

| Principle | Status | Notes |
|-----------|--------|-------|
| **I** - Independent | ✅ PASS | Depends on US-0001 (minor) |
| **N** - Negotiable | ✅ PASS | UI details flexible (animation, styling) |
| **V** - Valuable | ✅ PASS | Enables core multi-project workflow |
| **E** - Estimable | ✅ PASS | Clear filtering and state management |
| **S** - Small | ✅ PASS | 5 points, 2-3 days |
| **T** - Testable | ✅ PASS | Specific, observable criteria |

**Overall INVEST Quality:** ✅ EXCELLENT

---

## Subtasks (Optional)

### Development Subtasks
- [ ] Add currentProjectId to React state/Context
- [ ] Implement task filtering function (projectId match)
- [ ] Update board component to use filtered tasks
- [ ] Update dropdown to show selected state
- [ ] Add project count calculation
- [ ] Implement project switch handler
- [ ] Add keyboard support (arrow keys, Enter)

### Testing Subtasks
- [ ] Test filtering shows only selected project's tasks
- [ ] Test task counts are accurate per project
- [ ] Test empty project shows empty state
- [ ] Test rapid project switching
- [ ] Test keyboard navigation in dropdown
- [ ] Cross-browser testing

---

## Questions & Discussion

### Open Questions
- Should selected project persist across page reload? (Yes, see US-0005)
- What animation for project switch? (Suggest: fade or slide)
- Should task creation default to selected project? (Yes, handled in EPIC-001)

---

## Story History

| Version | Date | Updated By | Status | Changes |
|---------|------|-----------|--------|---------|
| 1.0 | May 7, 2026 | Developer | DRAFT | Initial story |

---

**Story Owner:** Developer  
**Last Updated:** May 7, 2026
