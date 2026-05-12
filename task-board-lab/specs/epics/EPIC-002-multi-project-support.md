# Epic: Multi-Project Support

**Epic ID:** EPIC-002  
**Epic Title:** Multi-Project Support - Organize Tasks Across Projects  
**Status:** NOT STARTED  
**Priority:** P0  
**Created Date:** May 7, 2026  
**Last Updated:** May 7, 2026  

---

## 1. Epic Title

**Multi-Project Support - Organize Tasks Across Projects**

> *Enable developers to create multiple projects and switch between them, keeping tasks organized by project*

---

## 2. Description

This epic adds project management capabilities on top of the core task board. Developers often work on 2-3 projects simultaneously (side projects, freelance work, learning). This epic lets them create projects, switch between them, and see project-specific tasks. Each project maintains its own task board, helping developers stay focused on one project at a time.

**Related PRD Section(s):** PRD-001, Section 4.1 (Feature 4), Use Case 3

---

## 3. Business Context

### 3.1 Why This Epic?
The PRD identified two key personas who manage multiple projects: Jordan (Freelancer managing 3-5 projects) and Alex (Solo Developer with 2-3 side projects). Without project support, all tasks would be in one pile, defeating the purpose of the task board. This epic enables the "focus on one thing at a time" workflow.

### 3.2 Business Value
- **Quantified Benefit:** Support developers managing 2-3 projects without performance degradation, enabling adoption by freelancers (Jordan persona)
- **Timeline:** Complete by June 5, 2026 to integrate with Phase 1 before Phase 2 testing

---

## 4. Primary Persona

**Persona Name:** Jordan - The Freelancer

**Description:**
- **Role:** Freelance developer juggling multiple client projects
- **Pain Point Addressed:** Currently forgets which project needs attention, loses tasks in mixed task lists, needs quick project overview for status reports
- **Expected Benefit:** Can switch between project boards instantly, maintain separate task lists per client, track which project is active

**Secondary Personas (if applicable):**
- **Alex (Solo Developer):** Manages side projects, needs to focus on one project at a time
- **Sam (Student Developer):** Manages multiple learning projects and assignments

---

## 5. Success Criteria

### 5.1 Functional Success Criteria
- [ ] **Criterion 1:** Users can create 2-3 projects without performance impact - Target: <300ms project creation, board switch time
- [ ] **Criterion 2:** Project switching shows only that project's tasks - Target: 100% accuracy
- [ ] **Criterion 3:** Creating tasks defaults to current project - Target: 100% of created tasks go to selected project
- [ ] **Criterion 4:** Current project persists across sessions - Target: 100% remember last used project

### 5.2 User Adoption Criteria
- [ ] **Criterion 1:** Users with 2+ projects spend equal time on each - Target: 50/50 time split across projects
- [ ] **Criterion 2:** Project switching happens 3+ times per session - Target: 70% of active users switch projects

### 5.3 Quality/Performance Criteria
- [ ] **Criterion 1:** Project dropdown shows within 200ms - Target: Instant visual feedback
- [ ] **Criterion 2:** Project switch completes within 300ms - Target: Fast context switch
- [ ] **Criterion 3:** Data isolation (tasks only show for selected project) - Target: 100% accuracy

---

## 6. Scope & Complexity

### 6.1 Complexity Estimate
**Estimated Complexity:** **MEDIUM**

**Justification for Complexity:**
- Extends data model from single to multi-project
- Adds project selector UI/UX
- Requires filtering tasks by project ID
- localStorage schema change
- Moderate complexity, builds on EPIC-001 foundation

### 6.2 Scope Statement

#### In Scope
- Create new project (name input, add to list)
- Project selector dropdown in header
- Display project count and task count
- Switch to project and show only that project's tasks
- Delete project with confirmation
- Default to last viewed project
- localStorage persistence for projects
- Project creation modal/dialog

#### Out of Scope (Future Epics/Releases)
- **Project descriptions/notes** - Phase 2 (name only for MVP)
- **Project archiving** - Phase 2 (delete is sufficient)
- **Project ordering/sorting** - Phase 2 (alphabetical OK for <3 projects)
- **Project sharing/collaboration** - Phase 3 (single-user for MVP)
- **Project templates** - Phase 2 (manual creation only)

### 6.3 Estimated Effort
- **Estimated Story Points:** 13 points
- **Estimated Team Size:** 1 developer
- **Estimated Timeline:** 2 weeks (parallel with EPIC-001 finalization, complete by June 1, 2026)
- **Confidence Level:** HIGH

---

## 7. Dependencies

### 7.1 Internal Dependencies

| Dependency | Type | Status | Owner | Due Date | Notes |
|------------|------|--------|-------|----------|-------|
| EPIC-001: Task Management Core | EPIC | IN PROGRESS | Developer | June 5 | Must have working board before adding projects |
| Data Model Extension | DESIGN | ON-TRACK | Developer | May 15 | Add projectId to Task, create Project interface |
| localStorage Schema Migration | TECH | PLANNED | Developer | May 25 | Handle upgrade from single to multi-project data |

### 7.2 External Dependencies
[No external dependencies]

### 7.3 Blockers & Risks
- **Blocker 1:** Must wait for EPIC-001 core board to be complete (dependency)

---

## 8. Key Assumptions

- **Assumption 1:** Users will have 2-3 projects maximum in MVP (not 10+) - **Confidence:** HIGH
- **Assumption 2:** Dropdown selector is sufficient UX (not drag-to-reorder) - **Confidence:** HIGH
- **Assumption 3:** localStorage quota sufficient for multi-project data - **Confidence:** HIGH
- **Assumption 4:** Current project selection persists across browser sessions - **Confidence:** HIGH

---

## 9. Technical Considerations

### 9.1 Architecture Impact
- **Data Model:** Add `projectId` field to Task, create Project interface
- **State Management:** Add currentProjectId to AppState, update task filtering
- **Storage:** Migrate localStorage on first load if needed
- **Filtering:** Query tasks where task.projectId === currentProjectId

### 9.2 Technology Stack
- **Framework:** React 18 (same as EPIC-001)
- **State:** Context API with currentProjectId management
- **UI:** Dropdown component for project selector
- **Persistence:** localStorage with schema versioning

### 9.3 Infrastructure Requirements
- **Server:** None (client-side only)
- **Database:** None (localStorage only)
- **Migration:** Handle old single-project format on first load

### 9.4 Performance Considerations
- **Project Switching:** <300ms (fast context switch)
- **Dropdown Rendering:** <200ms (show immediately)
- **Task Filtering:** Efficient with <50 tasks per project
- **Scroll Performance:** No degradation with 3 projects × 50 tasks

---

## 10. Acceptance Criteria (Epic-Level)

This epic is complete when:

- [ ] Project selector dropdown displays in header
- [ ] Users can create a new project with name
- [ ] Creating a project adds it to dropdown list
- [ ] Selecting a project switches board to show only that project's tasks
- [ ] New tasks default to current project
- [ ] Deleting a project removes all its tasks (with confirmation)
- [ ] Project and current selection persist to localStorage
- [ ] Last viewed project loads on page refresh
- [ ] Task counts update correctly per project
- [ ] No data loss or cross-project contamination
- [ ] Performance remains smooth with 3 projects × 50 tasks
- [ ] All user stories acceptance criteria met
- [ ] WCAG 2.1 AA accessibility maintained
- [ ] Manual testing across browsers complete

---

## 11. User Stories

*User stories to be created using `/decompose-stories` prompt*

### Anticipated User Stories (4-5 stories)

**Story 1:** Create New Project
- **Priority:** P0
- **Story Points:** 5
- **Status:** NOT STARTED

**Story 2:** Select Project and View Its Tasks
- **Priority:** P0
- **Story Points:** 5
- **Status:** NOT STARTED

**Story 3:** Show Task Count Per Project
- **Priority:** P1
- **Story Points:** 3
- **Status:** NOT STARTED

**Story 4:** Delete Project
- **Priority:** P1
- **Story Points:** 3
- **Status:** NOT STARTED

**Story 5:** Persist Current Project Selection
- **Priority:** P0
- **Story Points:** 3
- **Status:** NOT STARTED

---

## 12. Design & UX Considerations

### 12.1 UI/UX Impact
- **Header Layout:** Project selector dropdown in top-left (prominent position)
- **Dropdown:** Shows all projects with task count (e.g., "Client A (5 tasks)")
- **Create Option:** "Create new project..." at bottom of dropdown
- **Current Indicator:** Selected project highlighted/bold
- **Default:** Starts with "Default" project or first created project

### 12.2 Design Resources Needed
- [ ] Project selector dropdown design
- [ ] Project creation modal/dialog
- [ ] Delete confirmation modal design
- [ ] Visual hierarchy for project indicators

### 12.3 Accessibility Requirements
- **WCAG Level:** AA (Level 2.1)
- **Requirements:**
  - Dropdown keyboard accessible (arrow keys, Enter)
  - Delete confirmation requires explicit confirmation
  - Task counts announced to screen readers
  - Focus visible on all interactive elements

---

## 13. Risk Assessment

### 13.1 Key Risks

| Risk | Description | Probability | Impact | Mitigation Strategy | Owner |
|------|-------------|-------------|--------|-------------------|-------|
| Data Loss During Migration | localStorage schema change causes data loss on upgrade | LOW | HIGH | Test migration path extensively, keep old data as fallback, Phase 1 alert to backup | Developer |
| Project Switching Performance | Slow filtering of large task lists on project switch | LOW | MEDIUM | Test with 100+ tasks, optimize queries, Phase 2 virtualisation if needed | Developer |
| Accidental Project Deletion | User deletes project with all tasks without realizing | MEDIUM | HIGH | Require confirmation dialog, show "X tasks will be deleted", offer undo in Phase 2 | Developer |
| Cross-Project Task Contamination | Task appears in wrong project due to filtering bug | LOW | HIGH | Thorough test coverage, verify projectId on every task query | Developer |

---

## 14. Timeline & Milestones

### 14.1 Phases

| Phase | Description | Duration | Target Start | Target End | Deliverables |
|-------|-------------|----------|--------------|-----------|--------------|
| Phase 1 | Project creation & switching UI | 1 week | May 22 | May 29 | Project selector, creation modal |
| Phase 2 | Task filtering & data persistence | 1 week | May 29 | June 5 | Project-specific task views, localStorage |
| Phase 3 | Integration with EPIC-001 | 2 days | June 3 | June 5 | Full integration testing |

### 14.2 Key Milestones
- **Milestone 1:** Project selector UI complete (May 26)
- **Milestone 2:** Task filtering by project working (June 1)
- **Milestone 3:** Integrated with core board (June 5)

---

## 15. Resources & Team

### 15.1 Team Composition

| Role | Person/Team | Hours/Week | Availability |
|------|-------------|-----------|--------------|
| Frontend Developer | Solo Developer | 8 hours | 40% |
| QA/Tester | Developer (self) | 2 hours | 10% |

### 15.2 Skills Required
- React state management with multiple components
- localStorage querying and filtering
- Data model design (relationships)
- UI/UX for dropdown and modal components

---

## 16. Success Metrics & Measurement

### 16.1 Metrics to Track

| Metric | Baseline | Target | Measurement Method | Owner |
|--------|----------|--------|-------------------|-------|
| Project Switch Time | N/A | <300ms | Performance profiling | Developer |
| Data Integrity | N/A | 100% (no cross-project contamination) | Manual testing, automated tests | Developer |
| Persistence Accuracy | N/A | 100% (correct project on reload) | Browser DevTools inspection | Developer |

### 16.2 Post-Launch Review
- **Review Date:** June 8, 2026 (after EPIC-003 integration)
- **Metrics Review Owner:** Developer
- **Success Definition:** Project switching is smooth, all tasks correctly isolated, no data loss

---

## 17. Communication & Stakeholders

### 17.1 Key Stakeholders

| Stakeholder | Role | Interest | Update Frequency |
|------------|------|----------|------------------|
| Developer | Owner/Builder | Technical delivery | Daily |
| Persona: Jordan | End User | Multi-project capability | Weekly feedback |
| Beta Testers | End User | Project organization usability | Weekly |

### 17.2 Communication Plan
- **Status Reporting:** Weekly GitHub issue updates
- **Demo Schedule:** June 5 demo with EPIC-001 and EPIC-003
- **User Feedback:** Collect feedback on project switcher UX from beta testers

---

## 18. Definition of Done

This epic is considered **DONE** when:

✅ **Development:**
- [ ] All user stories completed and merged
- [ ] Project selector functional in header
- [ ] Projects create, delete, switch correctly
- [ ] Tasks correctly filtered by project
- [ ] All acceptance criteria from stories met

✅ **Quality & Testing:**
- [ ] Cross-browser testing completed
- [ ] No data loss or contamination bugs
- [ ] Project switching is smooth and responsive
- [ ] localStorage persistence verified

✅ **Integration:**
- [ ] Integrated with EPIC-001 task board
- [ ] Board shows correct project's tasks
- [ ] New tasks go to selected project
- [ ] No conflicts or regressions

✅ **Documentation:**
- [ ] Data model updated in README
- [ ] Project structure documented
- [ ] Migration logic commented

---

## 19. Appendices

### A. Related Documents
- **PRD:** [PRD-001-personal-taskboard-mvp.md](../prds/PRD-001-personal-taskboard-mvp.md)
- **Related Epics:** EPIC-001 (Task Management Core), EPIC-003 (Keyboard-First Features)
- **Data Model:** Project interface and projectId in Task

### B. Glossary
- **Project:** Container for related tasks
- **Context Switching:** Moving focus from one project to another
- **Data Isolation:** Tasks in one project don't appear in another

### C. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Manager | Developer | May 7, 2026 | __________ |
| Epic Owner | Developer | May 7, 2026 | __________ |

---

## Document History

| Version | Date | Author | Status | Changes |
|---------|------|--------|--------|---------|
| 1.0 | May 7, 2026 | Developer | DRAFT | Initial epic specification |

---

**Last Updated:** May 7, 2026  
**Epic Owner:** Developer  
**Next Review Date:** May 22, 2026 (start of project phase)
