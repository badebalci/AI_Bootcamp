# User Story: Delete Project

**Story ID:** US-0003  
**Title:** Delete Project and Confirm Action  
**Epic:** EPIC-002 - Multi-Project Support  
**Priority:** P1  
**Status:** TO DO  
**Created Date:** May 7, 2026  
**Sprint:** Sprint 1 (May 15-29)  

---

## User Story

### Story Statement

**As a** freelancer finishing a client project  
**I want to** delete a project and all its tasks  
**So that** I can keep my task board clean and remove completed client work  

---

## Context

### Background
Users may want to clean up completed projects or remove old client work. Deleting a project should remove all associated tasks. This requires a confirmation dialog to prevent accidental deletion of all project tasks at once.

### Related Work
- **Related Stories:** US-0001 (Create Project), US-0002 (Select Project)
- **Dependencies:** US-0001 (projects must exist to delete)
- **Related Epic:** EPIC-002 (Multi-Project Support)

---

## Acceptance Criteria

- [ ] **Criterion 1:** User can right-click on project in dropdown to see Delete option  
  *Test: Right-click project, context menu appears with "Delete" option*

- [ ] **Criterion 2:** Clicking Delete shows confirmation dialog with project name and task count  
  *Test: Confirmation dialog shows "Delete 'Client A' and all 5 tasks?"*

- [ ] **Criterion 3:** User can confirm deletion (clicking "Delete" button or pressing Enter)  
  *Test: Click "Delete" button, project and tasks removed*

- [ ] **Criterion 4:** User can cancel deletion (clicking "Cancel" or pressing Escape)  
  *Test: Press Escape, dialog closes, project unchanged*

- [ ] **Criterion 5:** After deletion, selected project switches to next available project or default  
  *Test: Delete "Client A", board switches to "Client B"*

---

## Additional Acceptance Scenarios

### Happy Path
1. User right-clicks on "Client A" project in dropdown
2. Context menu appears with options: "Select", "Delete"
3. User clicks "Delete"
4. Confirmation modal appears: "Delete 'Client A' and all 5 tasks? This cannot be undone."
5. Two buttons: "Delete" (red) and "Cancel" (gray)
6. User clicks "Delete"
7. Modal closes
8. Project is removed from dropdown
9. Board switches to next project
10. All 5 tasks from Client A are gone

### Edge Cases & Alternate Flows

**Edge Case 1:** Delete project with no tasks
- Precondition: Project "Empty Project" has 0 tasks
- User right-clicks and selects Delete
- Expected: Confirmation shows "Delete 'Empty Project' and all 0 tasks?"
- Delete works same way

**Edge Case 2:** Delete currently selected project
- Precondition: "Client A" is currently selected
- User deletes "Client A"
- Expected: Project deleted, board switches to next available project
- If only project, show default empty state

**Edge Case 3:** Delete last project
- Precondition: Only one project exists
- User deletes it
- Expected: Project deleted, board shows "Create new project to get started"
- Can create new project immediately

**Edge Case 4:** Rapid deletion
- Precondition: User is deleting projects quickly
- User deletes multiple projects in succession
- Expected: Each deletion confirmed separately, all work correctly

**Error Case:** Deletion fails due to storage error
- Precondition: Storage error occurs during deletion
- Expected: Error message "Failed to delete project, please try again"
- Project remains in list

---

## Technical Notes

### Implementation Hints (Optional)
- Use right-click context menu (or dropdown menu with trash icon)
- Confirmation modal with 2 buttons: Delete (destructive/red) and Cancel
- localStorage delete: remove project, remove all tasks with matching projectId
- Switch to next project: find first project that isn't deleted, or show default
- Keyboard support: keyboard shortcut or context menu navigation

### Technical Constraints
- Deletion is permanent (no undo in MVP, Phase 2 feature)
- All tasks with matching projectId must be deleted
- Must handle last project deletion gracefully
- Must update selectedProjectId if deleted project was selected

### Performance Requirements
- Deletion: <500ms (update localStorage and UI)
- Task removal: Efficient filtering of tasks array
- UI update: <300ms after confirmation

---

## Design & UX

### Wireframes/Mockups
- Right-click context menu on project name
- Confirmation modal with clear warning
- Delete button styled destructively (red)
- Task count displayed in confirmation

### Design Specifications
- Context menu: simple list, dark background
- Confirmation modal: centered, prominent warning text
- Delete button: red/destructive color (#d32f2f or similar)
- Cancel button: gray/neutral color
- Warning text: "This cannot be undone."

### Accessibility Requirements
- **WCAG Level:** AA
- **Requirements:**
  - Context menu keyboard accessible (arrow keys)
  - Confirmation dialog has proper focus management
  - Delete button clearly marked as destructive
  - Task count announced
  - Escape key cancels deletion

---

## Estimation

### Story Points
**Estimate:** 5 story points

**Estimation Method:** Fibonacci

**Confidence Level:** HIGH

**Justification:**
- Context menu implementation (standard pattern)
- Confirmation dialog (similar to US-0001 modal)
- localStorage deletion (straightforward)
- Project switching logic (already implemented in US-0002)

---

## Definition of Done

This story is complete when:

✅ **Development:**
- [ ] Right-click context menu implemented
- [ ] Confirmation modal shows project name and task count
- [ ] Delete button removes project and all tasks
- [ ] Cancel button closes modal without changes
- [ ] Escape key closes modal
- [ ] Project switching handled after deletion
- [ ] localStorage updated

✅ **Testing:**
- [ ] Manual testing: Delete project successfully
- [ ] Manual testing: Cancel deletion
- [ ] Manual testing: Delete last project
- [ ] Manual testing: Board switches correctly
- [ ] Manual testing: All tasks removed

✅ **Code Quality:**
- [ ] Code review completed
- [ ] No console errors
- [ ] Comments on deletion logic
- [ ] Follows project style guide

✅ **Integration:**
- [ ] Works with EPIC-001 and US-0002
- [ ] Board updates correctly after deletion
- [ ] Task list updated

✅ **Accessibility:**
- [ ] Context menu keyboard accessible
- [ ] Modal focus management correct
- [ ] Escape closes modal
- [ ] Destructive action clearly marked

---

## INVEST Validation Checklist

| Principle | Status | Notes |
|-----------|--------|-------|
| **I** - Independent | ✅ PASS | Can be done independently |
| **N** - Negotiable | ✅ PASS | UI details flexible |
| **V** - Valuable | ✅ PASS | Allows users to manage projects |
| **E** - Estimable | ✅ PASS | Straightforward implementation |
| **S** - Small | ✅ PASS | 5 points, 2-3 days |
| **T** - Testable | ✅ PASS | Specific, observable criteria |

**Overall INVEST Quality:** ✅ EXCELLENT

---

## Subtasks (Optional)

### Development Subtasks
- [ ] Implement right-click context menu
- [ ] Create confirmation modal component
- [ ] Implement delete handler (remove project and tasks)
- [ ] Handle project switching after deletion
- [ ] Update localStorage
- [ ] Add keyboard support (Escape, Enter)

### Testing Subtasks
- [ ] Test successful deletion
- [ ] Test cancel deletion
- [ ] Test delete last project
- [ ] Test rapid deletions
- [ ] Test task removal verification
- [ ] Cross-browser context menu behavior

---

## Questions & Discussion

### Open Questions
- Should there be an undo feature? (Suggest: Phase 2)
- Should deletion be soft-delete or permanent? (Suggest: Permanent for MVP)
- Should there be a trash/recycle bin? (Suggest: Phase 2 feature)

---

## Story History

| Version | Date | Updated By | Status | Changes |
|---------|------|-----------|--------|---------|
| 1.0 | May 7, 2026 | Developer | DRAFT | Initial story |

---

**Story Owner:** Developer  
**Last Updated:** May 7, 2026
