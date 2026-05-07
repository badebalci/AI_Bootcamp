# User Story: Show Task Count Per Project in Dropdown

**Story ID:** US-0005  
**Title:** Display Task Count Per Project in Dropdown  
**Epic:** EPIC-002 - Multi-Project Support  
**Priority:** P1  
**Status:** TO DO  
**Created Date:** May 7, 2026  
**Sprint:** Sprint 1 (May 15-29)  

---

## User Story

### Story Statement

**As a** developer managing multiple projects  
**I want to** see how many tasks each project has in the dropdown  
**So that** I can quickly see which projects have pending work without switching to each one  

---

## Context

### Background
Task counts provide useful at-a-glance information about project workload. Jordan (Freelancer) can see which client projects are busiest and prioritize accordingly. This is a small quality-of-life improvement.

### Related Work
- **Related Stories:** US-0001 (Create Project), US-0002 (Select Project)
- **Dependencies:** US-0002 (project selection must work)
- **Related Epic:** EPIC-002 (Multi-Project Support)

---

## Acceptance Criteria

- [ ] **Criterion 1:** Project dropdown shows task count next to each project name  
  *Test: Dropdown displays "Client A (5 tasks)", "Client B (2 tasks)"*

- [ ] **Criterion 2:** Task count is accurate and updates when tasks are created/deleted  
  *Test: Create task in Client A, count changes from (4) to (5)*

- [ ] **Criterion 3:** Count includes tasks from all columns (To Do, In Progress, Done)  
  *Test: 5 tasks total across all columns shows as (5)*

- [ ] **Criterion 4:** Empty project shows (0 tasks) or no count  
  *Test: Empty project shows either "Empty Project" or "Empty Project (0)"*

- [ ] **Criterion 5:** Task count updates in real-time when tasks are moved between projects (if implemented)  
  *Test: Move task from Client A to Client B, counts update immediately*

---

## Additional Acceptance Scenarios

### Happy Path
1. User opens project dropdown
2. Dropdown shows:
   - "Client A (5)"
   - "Client B (2)"
   - "Personal (8)"
3. User sees at a glance which projects have work
4. User creates a new task in Client A
5. Dropdown count updates to "(6)" for Client A
6. User deletes a task from Client B
7. Dropdown count updates to "(1)" for Client B

### Edge Cases & Alternate Flows

**Edge Case 1:** Project with no tasks
- Precondition: Project "Empty Project" has 0 tasks
- User opens dropdown
- Expected: Shows "Empty Project (0)" or "Empty Project"
- When task added, count shows (1)

**Edge Case 2:** Task count changes while dropdown is open
- Precondition: Dropdown is open, another tab creates task
- Task created in open project
- Expected: Count updates while dropdown remains open
- Suggest: Real-time update (not mandatory for MVP)

**Edge Case 3:** Very large task count
- Precondition: Project has 100+ tasks
- User opens dropdown
- Expected: Shows full count "(127)" without truncation
- No performance issues

**Edge Case 4:** Task moved between projects
- Precondition: User drags task from Project A to Project B
- Expected: Count for A decreases, count for B increases
- Requires task movement to update projectId

---

## Technical Notes

### Implementation Hints (Optional)
- Calculate count: `tasks.filter(t => t.projectId === project.id).length`
- Memoize calculation to avoid recalculation on every render
- Update on task creation, deletion, or project switch
- Format: "Project Name (X)" or "Project Name (X tasks)"

### Technical Constraints
- Must efficiently calculate count for each project
- Should not cause performance issues with 100+ tasks
- Count must stay in sync with actual tasks array
- No backend API, calculated client-side

### Performance Requirements
- Dropdown render: <200ms (including count calculation)
- Count update: <100ms after task operation
- Memory: No significant increase with count calculation

---

## Design & UX

### Wireframes/Mockups
- Dropdown item format: "Project Name (5)"
- Count in parentheses, right-aligned or after name
- Consistent formatting for all projects

### Design Specifications
- Font size: Same as project name
- Color: Slightly dimmed (gray-600 or similar)
- Format: Always show count, even if 0
- Example: "Client A (5)" or "Project Name (0)"

### Accessibility Requirements
- **WCAG Level:** AA
- **Requirements:**
  - Count announced by screen readers
  - Format: "Client A, 5 tasks" for screen reader clarity
  - aria-label: "Client A with 5 tasks"

---

## Estimation

### Story Points
**Estimate:** 3 story points

**Estimation Method:** Fibonacci

**Confidence Level:** HIGH

**Justification:**
- Simple calculation (filter and count)
- Minimal UI change (text addition)
- No complex logic
- Quick implementation

---

## Definition of Done

This story is complete when:

✅ **Development:**
- [ ] Task count calculated for each project
- [ ] Count displayed in dropdown
- [ ] Count updates on task creation
- [ ] Count updates on task deletion
- [ ] Count updates on project switch
- [ ] Performance acceptable (<200ms dropdown render)

✅ **Testing:**
- [ ] Manual testing: Count displays correctly
- [ ] Manual testing: Count updates on task add/delete
- [ ] Manual testing: Empty project shows (0)
- [ ] Manual testing: Large counts display properly
- [ ] Performance testing: No lag with 100 tasks

✅ **Code Quality:**
- [ ] Code review completed
- [ ] Count calculation efficient (memoized if needed)
- [ ] Comments on calculation logic
- [ ] Follows project style guide

✅ **Integration:**
- [ ] Works with US-0002 (project selection)
- [ ] Updates with EPIC-001 task operations
- [ ] No performance impact on board

---

## INVEST Validation Checklist

| Principle | Status | Notes |
|-----------|--------|-------|
| **I** - Independent | ✅ PASS | Independent of other stories |
| **N** - Negotiable | ✅ PASS | Display format flexible |
| **V** - Valuable | ✅ PASS | Quick project overview benefit |
| **E** - Estimable | ✅ PASS | Simple calculation |
| **S** - Small | ✅ PASS | 3 points, 1 day |
| **T** - Testable | ✅ PASS | Observable count display |

**Overall INVEST Quality:** ✅ EXCELLENT

---

## Subtasks (Optional)

### Development Subtasks
- [ ] Create function to count tasks per project
- [ ] Update dropdown rendering to include count
- [ ] Add count update on task creation
- [ ] Add count update on task deletion
- [ ] Add aria-label for accessibility
- [ ] Optimize with memoization if needed

### Testing Subtasks
- [ ] Test count accuracy
- [ ] Test count updates
- [ ] Test with 0, 5, 50, 100+ tasks
- [ ] Test performance with large counts
- [ ] Accessibility check with screen reader

---

## Questions & Discussion

### Open Questions
- Should count include Done tasks or only active? (Suggest: Include all)
- What format for very large numbers (1000+)? (Suggest: Full number, Phase 2: abbreviate)

---

## Story History

| Version | Date | Updated By | Status | Changes |
|---------|------|-----------|--------|---------|
| 1.0 | May 7, 2026 | Developer | DRAFT | Initial story |

---

**Story Owner:** Developer  
**Last Updated:** May 7, 2026
