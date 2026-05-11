# User Story: Persist Current Project Selection

**Story ID:** US-0004  
**Title:** Remember Selected Project Across Browser Sessions  
**Epic:** EPIC-002 - Multi-Project Support  
**Priority:** P0  
**Status:** TO DO  
**Created Date:** May 7, 2026  
**Sprint:** Sprint 1 (May 15-29)  

---

## User Story

### Story Statement

**As a** developer working on a specific project  
**I want to** have the app remember which project I was working on when I close the browser  
**So that** I can return to my current project immediately without having to select it again  

---

## Context

### Background
Users should have a seamless experience where their last-used project is automatically selected when they return to the app. This improves user experience and reduces friction when resuming work.

### Related Work
- **Related Stories:** US-0002 (Select Project), US-0001 (Create Project)
- **Dependencies:** US-0002 must be complete (project selection must work)
- **Related Epic:** EPIC-002 (Multi-Project Support)

---

## Acceptance Criteria

- [ ] **Criterion 1:** When user closes browser and reopens app, the last selected project is automatically selected  
  *Test: Select "Client A", close browser, reopen, "Client A" is selected*

- [ ] **Criterion 2:** Board displays the correct project's tasks on page reload  
  *Test: Last project's tasks appear without user action*

- [ ] **Criterion 3:** Project selection persists across multiple sessions (not just one page reload)  
  *Test: Close and reopen browser 3 times, project remains consistent*

- [ ] **Criterion 4:** If selected project was deleted, default to first available project  
  *Test: Select "Client A", delete it in another session, reload shows next project*

- [ ] **Criterion 5:** New project selection is saved within 500ms (debounced)  
  *Test: Change project, wait <500ms, close browser, verify new project loads*

---

## Additional Acceptance Scenarios

### Happy Path
1. User selects "Client B" project
2. Board shows Client B's tasks
3. User closes browser tab/window
4. User reopens app in same browser
5. "Client B" is automatically selected
6. Board shows Client B's tasks without user action
7. User can immediately create/edit tasks in Client B

### Edge Cases & Alternate Flows

**Edge Case 1:** No projects exist on reload
- Precondition: User deleted all projects
- User reopens app
- Expected: Show "No projects" message with option to create project
- Default to first created project when new one is added

**Edge Case 2:** Selected project was deleted
- Precondition: User selects "Client A", another tab deletes it
- First tab reloads
- Expected: Switch to next available project
- Show notification (Phase 2)

**Edge Case 3:** First time user (no prior selection)
- Precondition: New user, no stored project selection
- User opens app for first time
- Expected: Default to first project (if exists) or show empty state
- Suggest: "Default Project" is created automatically

**Edge Case 4:** Browser clears localStorage
- Precondition: User or browser clears all localStorage
- User reopens app
- Expected: Defaults to first project or empty state
- No error, graceful degradation

**Edge Case 5:** Multiple tabs/windows
- Precondition: User has 2 tabs open with different projects
- Tab A: "Client A", Tab B: "Client B"
- User switches to Tab B, changes to "Personal", closes Tab B
- User returns to Tab A
- Expected: Tab A still shows "Client A" (not affected by Tab B change)
- Each tab has independent state

---

## Technical Notes

### Implementation Hints (Optional)
- Store currentProjectId in localStorage: `{ currentProjectId: "uuid-123" }`
- On app load (useEffect), retrieve currentProjectId from localStorage
- On project selection change, update localStorage immediately (debounced)
- Verify project exists before loading (check against projects list)
- Fallback: if project doesn't exist, use first project or default

### Technical Constraints
- Must handle case where stored projectId doesn't exist (deleted project)
- localStorage key should be consistent: "taskboard_currentProjectId"
- Debounce write to avoid excessive localStorage updates
- Handle privacy mode / incognito (localStorage might be read-only)

### Performance Requirements
- Load on startup: <100ms (reading from localStorage)
- Save on change: <500ms (debounced write)
- No performance degradation with multiple sessions

---

## Design & UX

### Wireframes/Mockups
- No visible UI change (persistence is transparent to user)
- Project dropdown shows saved project as selected
- Board loads with saved project's tasks

### Design Specifications
- Persistence is invisible to user
- No loading indicator needed (fast enough)
- Graceful handling of missing project (no error shown to user)

### Accessibility Requirements
- **WCAG Level:** AA
- **Requirements:**
  - Page loads in correct state (no focus jump)
  - Project name announced on load
  - Task list accessible after load

---

## Estimation

### Story Points
**Estimate:** 3 story points

**Estimation Method:** Fibonacci

**Confidence Level:** HIGH

**Justification:**
- Simple localStorage read/write
- Minimal logic (retrieve on load, save on change)
- No UI complexity
- Smaller story than project creation/switching

---

## Definition of Done

This story is complete when:

✅ **Development:**
- [ ] currentProjectId stored in localStorage
- [ ] On app load, retrieve and set stored projectId
- [ ] On project selection change, update localStorage
- [ ] Debouncing implemented (500ms)
- [ ] Fallback to first project if stored project doesn't exist
- [ ] Handle privacy/incognito mode gracefully

✅ **Testing:**
- [ ] Manual testing: Project persists after reload
- [ ] Manual testing: Multiple reloads maintain project
- [ ] Manual testing: Deleted project handled gracefully
- [ ] Manual testing: Empty project list handled
- [ ] Manual testing: Multiple tabs don't interfere

✅ **Code Quality:**
- [ ] Code review completed
- [ ] Error handling for localStorage errors
- [ ] Comments on persistence logic
- [ ] Follows project style guide

✅ **Integration:**
- [ ] Works with US-0002 (project selection)
- [ ] Works with US-0003 (project deletion)
- [ ] No interference with task operations

---

## INVEST Validation Checklist

| Principle | Status | Notes |
|-----------|--------|-------|
| **I** - Independent | ✅ PASS | Independent of other stories |
| **N** - Negotiable | ✅ PASS | Implementation flexible |
| **V** - Valuable | ✅ PASS | Improves user experience |
| **E** - Estimable | ✅ PASS | Simple localStorage operations |
| **S** - Small | ✅ PASS | 3 points, 1-2 days |
| **T** - Testable | ✅ PASS | Observable persistence |

**Overall INVEST Quality:** ✅ EXCELLENT

---

## Subtasks (Optional)

### Development Subtasks
- [ ] Create localStorage helper for currentProjectId
- [ ] Add useEffect to load saved projectId on app startup
- [ ] Add localStorage update on project change
- [ ] Implement debouncing for save
- [ ] Add fallback logic for deleted project
- [ ] Error handling for localStorage quota/errors
- [ ] Handle privacy mode gracefully

### Testing Subtasks
- [ ] Test persistence after page reload
- [ ] Test persistence after browser close/reopen
- [ ] Test deleted project handling
- [ ] Test multiple browser windows
- [ ] Test privacy/incognito mode
- [ ] Check browser DevTools Storage tab

---

## Questions & Discussion

### Open Questions
- Should persistence be per browser or synced across devices? (Suggest: Per browser for MVP, cloud sync Phase 3)
- What if localStorage is disabled? (Suggest: Default to first project, no error)

---

## Story History

| Version | Date | Updated By | Status | Changes |
|---------|------|-----------|--------|---------|
| 1.0 | May 7, 2026 | Developer | DRAFT | Initial story |

---

**Story Owner:** Developer  
**Last Updated:** May 7, 2026
