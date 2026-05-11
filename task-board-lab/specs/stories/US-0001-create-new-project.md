# User Story: Create New Project

**Story ID:** US-0001  
**Title:** Create New Project  
**Epic:** EPIC-002 - Multi-Project Support  
**Priority:** P0  
**Status:** TO DO  
**Created Date:** May 7, 2026  
**Sprint:** Sprint 1 (May 15-29)  

---

## User Story

### Story Statement

**As a** Freelancer managing multiple client projects  
**I want to** create a new project with a custom name  
**So that** I can organize tasks for different clients separately  

---

## Context

### Background
Currently, all tasks exist in a single default project. Jordan (Freelancer persona) manages 3-5 active projects for different clients. She needs a way to create distinct projects to keep client work organized and separate.

### Related Work
- **Related Stories:** US-0002 (Select Project), US-0005 (Persist Project)
- **Dependencies:** None (foundation story)
- **Related Epic:** EPIC-002 (Multi-Project Support)

---

## Acceptance Criteria

- [ ] **Criterion 1:** User can click "Create new project" option in project selector dropdown  
  *Test: Clicking dropdown shows "Create new project..." option at bottom*

- [ ] **Criterion 2:** Clicking "Create new project" opens a modal with text input field for project name  
  *Test: Modal appears with labeled input "Project Name" and focus on input field*

- [ ] **Criterion 3:** User can type project name (e.g., "Client A - Website") and project name persists correctly  
  *Test: Type "Client A - Website", verify text appears in input field*

- [ ] **Criterion 4:** Pressing Enter or clicking Create button creates the project  
  *Test: Press Enter, project appears in dropdown list with (0 tasks) count*

- [ ] **Criterion 5:** New project appears in dropdown list immediately after creation  
  *Test: After creation, dropdown shows new project with task count "0"*

---

## Additional Acceptance Scenarios

### Happy Path
1. User clicks project selector dropdown in header
2. User sees "Create new project..." option at bottom
3. User clicks "Create new project..."
4. Modal appears with "Project Name" input field
5. Focus automatically moves to input field
6. User types project name (e.g., "Client A - Website")
7. User presses Enter to create
8. Modal closes
9. New project appears in dropdown list
10. Board shows empty state (0 tasks)
11. New project is now selected

### Edge Cases & Alternate Flows

**Edge Case 1:** User cancels project creation
- Precondition: Project creation modal is open
- User presses Escape key or clicks Cancel button
- Modal closes without creating project
- Dropdown list unchanged

**Edge Case 2:** User creates project with empty name
- Precondition: Modal is open, input field is empty
- User presses Enter
- Expected: Error message appears "Project name required"
- Create button remains disabled

**Edge Case 3:** User creates duplicate project name
- Precondition: Project "Client A" already exists
- User types "Client A" and presses Enter
- Expected: Success (allow duplicates, or show warning - design decision)
- Created project appears in list

**Edge Case 4:** Project name with special characters
- Precondition: Modal is open
- User types "Client A - Website (2024) & More"
- Expected: Project name saved exactly as typed
- Appears in dropdown correctly

**Error Case:** localStorage quota exceeded
- Precondition: Browser storage is nearly full
- User tries to create project
- Expected: Error message "Storage full, please delete old projects or export data"
- Project not created

---

## Technical Notes

### Implementation Hints (Optional)
- Use React Modal component (Headless UI or custom)
- Store project in localStorage with unique UUID
- Project data structure: `{id: UUID, name: string, createdAt: Date}`
- Debounce localStorage write
- Show success toast notification after creation

### Technical Constraints
- Project name max length: 255 characters (practical limit)
- localStorage quota: ~5MB per domain (check before write)
- No backend API, localStorage only

### Performance Requirements
- Modal open: <200ms
- Project creation: <500ms
- localStorage write: <300ms

---

## Design & UX

### Wireframes/Mockups
- Modal design with centered input field
- Clear "Create" and "Cancel" buttons
- Help text: "Enter a project name to organize your tasks"

### Design Specifications
- Modal width: 400px on desktop, 90% on mobile
- Input placeholder: "e.g., Client A - Website"
- Button focus state clear (2px outline)

### Accessibility Requirements
- **WCAG Level:** AA
- **Requirements:**
  - Modal has role="dialog" and aria-labelledby
  - Input field has associated label
  - Focus trap in modal (Tab cycles through buttons)
  - Escape closes modal
  - Clear error messages announced

---

## Estimation

### Story Points
**Estimate:** 5 story points

**Estimation Method:** Fibonacci (1, 2, 3, 5, 8...)

**Confidence Level:** HIGH

**Justification:**
- UI modal component (small component, standard pattern)
- localStorage write (simple operation)
- Form input validation (minimal validation)
- No complex logic or dependencies

---

## Definition of Done

This story is complete when:

✅ **Development:**
- [ ] Modal component created and styled
- [ ] Form input field with label
- [ ] Create and Cancel buttons functional
- [ ] Keyboard support (Enter creates, Escape closes)
- [ ] localStorage write on success
- [ ] Auto-focus on input field

✅ **Testing:**
- [ ] Manual testing: Create project successfully
- [ ] Manual testing: Cancel creation
- [ ] Manual testing: Empty name validation
- [ ] Manual testing: Modal closes after creation
- [ ] Modal appears/disappears smoothly

✅ **Code Quality:**
- [ ] Code review completed
- [ ] No console errors or warnings
- [ ] Follows project style guide
- [ ] Comments added for complex logic

✅ **Integration:**
- [ ] Integrated with project selector dropdown
- [ ] New project appears in dropdown immediately
- [ ] No regressions to existing functionality

✅ **Accessibility:**
- [ ] Focus trap works
- [ ] Escape key closes modal
- [ ] Form inputs labeled correctly
- [ ] Error messages clear and announced

---

## INVEST Validation Checklist

| Principle | Status | Notes |
|-----------|--------|-------|
| **I** - Independent | ✅ PASS | Can work on independently, no blockers |
| **N** - Negotiable | ✅ PASS | Implementation flexible (modal style, animation) |
| **V** - Valuable | ✅ PASS | Directly enables project organization (user benefit) |
| **E** - Estimable | ✅ PASS | Team can estimate (straightforward modal + form) |
| **S** - Small | ✅ PASS | 5 points, 2-3 days (fits in sprint) |
| **T** - Testable | ✅ PASS | Acceptance criteria specific and observable |

**Overall INVEST Quality:** ✅ EXCELLENT

---

## Subtasks (Optional)

### Development Subtasks
- [ ] Create Modal component structure
- [ ] Add input field with label and validation
- [ ] Implement Create and Cancel buttons
- [ ] Add keyboard support (Enter, Escape)
- [ ] Generate UUID for new project
- [ ] Write project to localStorage
- [ ] Update project list in dropdown
- [ ] Add success toast notification

### Testing Subtasks
- [ ] Test successful project creation
- [ ] Test Cancel button
- [ ] Test empty name validation
- [ ] Test Escape key closes modal
- [ ] Test Enter key creates project
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

---

## Questions & Discussion

### Open Questions
- Should duplicate project names be allowed? (Suggest: Yes, for MVP)
- What's the max project name length? (Suggest: 255 characters, practical limit)
- Should projects be deletable after creation? (Yes, covered in separate story US-0004)

---

## Story History

| Version | Date | Updated By | Status | Changes |
|---------|------|-----------|--------|---------|
| 1.0 | May 7, 2026 | Developer | DRAFT | Initial story |

---

**Story Owner:** Developer  
**Last Updated:** May 7, 2026
