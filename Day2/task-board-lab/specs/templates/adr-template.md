# Architecture Decision Record (ADR) Template

**ADR ID:** [ADR-NUMBER]  
**Title:** [CONCISE DECISION TITLE]  
**Date:** [YYYY-MM-DD]  
**Author(s):** [NAME(S)]  

---

## 1. Status

**Choose one:**
- [ ] PROPOSED - New decision under consideration
- [ ] ACCEPTED - Decision has been approved and will be implemented
- [ ] DEPRECATED - Previously accepted but no longer valid
- [ ] SUPERSEDED - Replaced by another ADR (reference: ADR-XXX)
- [ ] REJECTED - Decision was considered but not adopted

**Status Rationale:** [Brief explanation of why this status was chosen]

---

## 2. Context

### Background
[Describe the situation that prompted this decision. Include relevant project constraints, technical limitations, or business requirements.]

### Problem Statement
[What specific problem or challenge are we trying to solve? Be concrete.]

### Current State
[What is the current approach or architecture? What are its limitations?]

### Constraints
[What constraints limit our options? (e.g., team skills, project timeline, budget, existing tech stack)]

### Key Stakeholders
- [Stakeholder 1]: [Their concern/perspective]
- [Stakeholder 2]: [Their concern/perspective]
- [Team/Role]: [Their perspective]

---

## 3. Decision

### What are we proposing/making?
[Clearly state the architectural change or decision being made.]

### Specific Technology/Pattern Being Adopted
**Technology/Pattern Name:** [e.g., "React Context API for State Management"]

**Why this specific choice:**
- [Reason 1]
- [Reason 2]
- [Reason 3]

### Implementation Details
[How will this be implemented? Provide enough detail that a developer can understand the approach.]

**Key components:**
1. [Component/Layer 1]: [Brief description]
2. [Component/Layer 2]: [Brief description]
3. [Component/Layer 3]: [Brief description]

**Code Example (if applicable):**
```typescript
// Example: How will this look in code?
// This helps developers understand the practical application

export const TaskContext = React.createContext<TaskContextType>({});

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Implementation details
};
```

### Scope of Impact
- **Affects:** [List components, modules, or systems affected]
- **Does NOT affect:** [List systems explicitly not affected by this decision]

---

## 4. Consequences

### What becomes EASIER?

**Positive Consequences:**
- [ ] **Consequence 1:** [Description of what improves]
  - *Impact area:* [Developer experience / Performance / Maintenance / etc.]
  - *Benefit:* [Quantifiable or qualitative benefit]

- [ ] **Consequence 2:** [Description of what improves]
  - *Impact area:* [Developer experience / Performance / Maintenance / etc.]
  - *Benefit:* [Quantifiable or qualitative benefit]

- [ ] **Consequence 3:** [Description of what improves]
  - *Impact area:* [Developer experience / Performance / Maintenance / etc.]
  - *Benefit:* [Quantifiable or qualitative benefit]

### What becomes MORE DIFFICULT?

**Negative Consequences / Trade-offs:**
- [ ] **Consequence 1:** [Description of what becomes harder]
  - *Impact area:* [Learning curve / Performance / etc.]
  - *Mitigation:* [How can we mitigate this?]

- [ ] **Consequence 2:** [Description of what becomes harder]
  - *Impact area:* [Learning curve / Performance / etc.]
  - *Mitigation:* [How can we mitigate this?]

### Risk Assessment
| Risk | Likelihood | Severity | Mitigation Strategy |
|------|-----------|----------|-------------------|
| [Risk 1] | H/M/L | H/M/L | [How to prevent/handle] |
| [Risk 2] | H/M/L | H/M/L | [How to prevent/handle] |

### Long-term Implications
- **Maintenance:** [Will this be easier or harder to maintain over time?]
- **Scalability:** [How does this affect future scaling?]
- **Flexibility:** [Does this lock us into a path or keep options open?]
- **Team Knowledge:** [Does the team need to learn new skills? Will hiring be easier/harder?]

---

## 5. Alternatives Considered

### Alternative 1: [NAME OF ALTERNATIVE]
**Description:** [What would this approach involve?]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why not chosen:** [Brief explanation of why we didn't go with this]

---

### Alternative 2: [NAME OF ALTERNATIVE]
**Description:** [What would this approach involve?]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why not chosen:** [Brief explanation of why we didn't go with this]

---

### Alternative 3: [NAME OF ALTERNATIVE]
**Description:** [What would this approach involve?]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why not chosen:** [Brief explanation of why we didn't go with this]

---

### Comparison Table

| Aspect | Chosen Solution | Alt 1 | Alt 2 | Alt 3 |
|--------|-----------------|-------|-------|-------|
| **Implementation Complexity** | Low | Medium | High | Low |
| **Team Learning Curve** | Minimal | Steep | Steep | Moderate |
| **Performance** | Excellent | Good | Excellent | Fair |
| **Maintainability** | High | High | Low | Medium |
| **Scalability** | Excellent | Good | Excellent | Fair |
| **Community Support** | Strong | Very Strong | Niche | Moderate |

---

## 6. Implementation Plan

### Phase 1: Preparation
- [ ] Task 1: [Specific action]
- [ ] Task 2: [Specific action]
- [ ] Task 3: [Specific action]

### Phase 2: Implementation
- [ ] Task 1: [Specific action]
- [ ] Task 2: [Specific action]

### Phase 3: Validation & Testing
- [ ] Task 1: [Specific action]
- [ ] Task 2: [Specific action]

### Timeline
| Phase | Duration | Start Date | End Date |
|-------|----------|-----------|----------|
| Preparation | [X days] | [Date] | [Date] |
| Implementation | [X days] | [Date] | [Date] |
| Testing | [X days] | [Date] | [Date] |

---

## 7. Validation & Acceptance Criteria

This ADR is complete when:

- [ ] **Technical Validation**
  - [ ] Code example demonstrates the approach
  - [ ] Proof of concept (if needed) is working
  - [ ] Performance benchmarks meet expectations (if applicable)

- [ ] **Documentation**
  - [ ] All sections filled out completely
  - [ ] Code examples provided
  - [ ] Implementation plan created

- [ ] **Stakeholder Alignment**
  - [ ] All stakeholders reviewed
  - [ ] Concerns addressed
  - [ ] Decision approved by [DECISION MAKER]

- [ ] **Team Readiness**
  - [ ] Team has necessary skills (or training plan exists)
  - [ ] Resources allocated
  - [ ] Blockers identified and mitigated

---

## 8. References & Related Documents

### Related ADRs
- [ADR-001: Architecture Decision Record Format](./ADR-001-adr-format.md)
- [ADR-XXX: Previous related decision](./ADR-XXX.md)

### External References
- [Link to documentation](https://example.com)
- [Link to research](https://example.com)
- [Link to RFC/Spec](https://example.com)

### Related Project Documents
- [PRD-001: Product Requirements](../prds/PRD-001-task-board-mvp.md)
- [EPIC-001: Related Epic](../epics/EPIC-001-task-management-core.md)

---

## 9. Decision Record & History

| Date | Author | Change | Status |
|------|--------|--------|--------|
| [Date] | [Name] | Initial creation | DRAFT |
| [Date] | [Name] | [What changed] | [Status] |
| [Date] | [Name] | [What changed] | [Status] |

---

## 10. Discussion & Questions

### Open Questions
- **Question 1:** [Unanswered question from review]
  - *Proposed resolution:* [How to address]

- **Question 2:** [Unanswered question from review]
  - *Proposed resolution:* [How to address]

### Team Comments
- **[Team Member Name]:** [Their perspective or concern]
- **[Team Member Name]:** [Their perspective or concern]

---

## 11. Appendix

### A. Glossary
[Define any technical terms that may be unfamiliar to readers]

- **Term 1:** [Definition]
- **Term 2:** [Definition]

### B. Detailed Analysis
[Additional technical deep-dives, benchmarks, or analysis that supports the decision]

### C. Links to Implementation
Once implemented, update these links:
- **Repository branch:** [Link to branch or commit]
- **Test coverage:** [Link to test results]
- **Documentation:** [Link to generated docs]

---

**ADR Status:** [PROPOSED / ACCEPTED / DEPRECATED / SUPERSEDED / REJECTED]  
**Last Updated:** [DATE]  
**Next Review Date:** [DATE - for deprecated/superseded ADRs]

---

## Quick Reference

**When to create an ADR:**
✅ Major architectural decisions
✅ Technology choices affecting team
✅ Important design patterns
✅ Trade-offs with long-term implications

**When NOT to create an ADR:**
❌ Minor bug fixes
❌ Small feature additions
❌ Refactoring without architectural impact
❌ Routine maintenance

**Template Usage Tips:**
- Keep decisions focused (one decision per ADR)
- Be concrete and specific
- Address trade-offs honestly
- Include code examples when helpful
- Get stakeholder input before finalizing
