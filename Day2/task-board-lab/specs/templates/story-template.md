# User Story Template

**Story ID:** [US-XXX]  
**Title:** [CLEAR, CONCISE TITLE]  
**Epic:** [EPIC NAME OR ID]  
**Priority:** [P0 / P1 / P2 / P3]  
**Status:** [TO DO / IN PROGRESS / IN REVIEW / DONE]  
**Created Date:** [DATE]  
**Sprint:** [SPRINT NUMBER]  

---

## User Story

### Story Statement

**As a** [PERSONA NAME]  
**I want to** [SPECIFIC ACTION OR FEATURE]  
**So that** [BUSINESS VALUE OR BENEFIT]  

> **Guidance:** Keep each part concise and focused. The "so that" should explain the business value, not the "how."
> 
> ❌ Bad: As a user, I want to click a button so that the system updates
> ✅ Good: As a customer, I want to save my items to a wishlist so that I can find them quickly later

---

## Context

### Background
[Provide additional context about why this story is needed. What problem does it solve? What's the current situation?]

### Related Work
- **Related Stories:** [US-XXX], [US-XXX]
- **Dependencies:** [Other stories that must be completed first]
- **Blocked By:** [Stories currently blocking this one]

---

## Acceptance Criteria

[Define what "Done" means. These should be specific, testable, and written in user perspective when possible.]

**Acceptance Criteria (3-5 specific, measurable conditions):**

- [ ] **Criterion 1:** [SPECIFIC, TESTABLE CONDITION]  
  *Test: [How we'll verify this works]*

- [ ] **Criterion 2:** [SPECIFIC, TESTABLE CONDITION]  
  *Test: [How we'll verify this works]*

- [ ] **Criterion 3:** [SPECIFIC, TESTABLE CONDITION]  
  *Test: [How we'll verify this works]*

- [ ] **Criterion 4:** [SPECIFIC, TESTABLE CONDITION]  
  *Test: [How we'll verify this works]*

- [ ] **Criterion 5:** [SPECIFIC, TESTABLE CONDITION]  
  *Test: [How we'll verify this works]*

> **Guidance:** Acceptance criteria should:
> - Be testable (you can verify each one)
> - Use clear, observable language
> - Avoid implementation details
> - Cover edge cases and error scenarios
> - Be specific with expected values/thresholds
>
> ❌ Bad: "The system should work well" or "User should be able to save"
> ✅ Good: "When user clicks 'Save,' the item is stored in database within 2 seconds"

---

## Additional Acceptance Scenarios

### Happy Path
[Describe the ideal/main flow through this story]

1. User [ACTION]
2. System [RESPONSE]
3. User [ACTION]
4. System [RESULT]
5. Expected outcome: [FINAL STATE]

### Edge Cases & Alternate Flows

**Edge Case 1:** [SCENARIO]
- Precondition: [WHAT MUST BE TRUE]
- Expected Behavior: [WHAT SHOULD HAPPEN]

**Edge Case 2:** [SCENARIO]
- Precondition: [WHAT MUST BE TRUE]
- Expected Behavior: [WHAT SHOULD HAPPEN]

**Error Case:** [ERROR SCENARIO]
- Precondition: [WHAT MUST BE TRUE]
- Expected Behavior: [HOW SYSTEM SHOULD RESPOND]

---

## Technical Notes

### Implementation Hints (Optional)
[Provide optional guidance for developers. This is NOT required, but can help with implementation.]

- **Suggested Approach:** [How to implement this feature]
- **Technologies:** [Any specific tech to use or avoid]
- **Database Changes:** [Any schema modifications needed]
- **API Changes:** [Any new endpoints or modifications]
- **UI/UX Notes:** [Design considerations]

### Technical Constraints
[Any technical limitations or considerations?]

- [CONSTRAINT 1]
- [CONSTRAINT 2]

### Performance Requirements
[Any performance SLAs for this story?]

- **Response Time:** [Max X seconds for typical operation]
- **Throughput:** [X requests per second]
- **Data Volume:** [Expected data size]

---

## Design & UX

### Wireframes/Mockups
[Link to design files or mockups if available]

- [Design Link]: [LOCATION OR URL]
- [Prototype]: [LOCATION OR URL]

### Design Specifications
[Any specific design requirements or patterns to follow?]

- [SPECIFICATION 1]
- [SPECIFICATION 2]

### Accessibility Requirements
[WCAG compliance level? Accessibility considerations?]

- **WCAG Level:** [A / AA / AAA]
- **Requirements:** [SPECIFIC ACCESSIBILITY NEEDS]

---

## Estimation

### Story Points
**Estimate:** [NUMBER] story points

**Estimation Method:** [FIBONACCI: 1, 2, 3, 5, 8, 13, 21]

**Confidence Level:** [HIGH / MEDIUM / LOW]

**Justification:**
[Why this estimate? What complexity factors influenced this?]

### Time Estimate (Optional Alternative)
**Estimated Days:** [X days]  
**Breakdown:**
- Development: [X days]
- Testing/QA: [X days]
- Review/Refinement: [X days]

---

## Definition of Done

This story is complete when:

✅ **Development:**
- [ ] Code written and self-reviewed
- [ ] Code committed to feature branch
- [ ] All acceptance criteria met
- [ ] No hardcoded values or TODO comments
- [ ] Code follows project style guide

✅ **Testing:**
- [ ] Developer tested locally
- [ ] Unit tests written and passing (if applicable)
- [ ] Integration tests passing (if applicable)
- [ ] Manual testing completed by developer
- [ ] QA testing completed and approved

✅ **Code Quality:**
- [ ] Peer code review completed (≥2 reviewers)
- [ ] No critical/high severity issues
- [ ] No technical debt added
- [ ] Linting/static analysis passing

✅ **Documentation:**
- [ ] Code comments added where complex
- [ ] API documentation updated (if applicable)
- [ ] User documentation updated (if applicable)
- [ ] Help/FAQ updated (if applicable)

✅ **Deployment Readiness:**
- [ ] Merged to main/develop branch
- [ ] Ready for staging environment
- [ ] Deployment notes prepared
- [ ] Rollback plan documented (if applicable)

---

## INVEST Validation Checklist

> **INVEST** is an acronym for good user stories. This story should satisfy these principles:

### I - Independent
- [ ] This story can be worked on independently
- [ ] Minimal dependencies on other stories
- [ ] If dependencies exist, they are documented above

**Independent Assessment:** [This story is independent because... OR Has dependencies: ...]

### N - Negotiable
- [ ] Details are open to discussion and negotiation
- [ ] Story focuses on "what," not "how"
- [ ] Implementation approach is flexible

**Negotiability Notes:** [What aspects are negotiable? What's fixed?]

### V - Valuable
- [ ] Story delivers clear value to the user/business
- [ ] "So that" clearly articulates the benefit
- [ ] Story aligns with product goals

**Value Assessment:** [How does this story deliver value?]

### E - Estimable
- [ ] Team can reasonably estimate the work
- [ ] Story is clear enough to estimate
- [ ] No major unknowns that block estimation

**Estimability Notes:** [Any uncertainties? Assumptions in estimate?]

### S - Small
- [ ] Story is small enough to complete in one sprint
- [ ] Typical target: 3-8 story points / 2-5 days
- [ ] If larger, consider breaking into smaller stories

**Size Validation:** [Is this story appropriately sized?]

**If Too Large:** [Should this be split? Suggested split...]

### T - Testable
- [ ] Acceptance criteria are specific and testable
- [ ] "Done" is objectively measurable
- [ ] QA can verify completion

**Testability Assessment:** [How will we test this? Are criteria clear and specific?]

---

### INVEST Summary
| Principle | Status | Notes |
|-----------|--------|-------|
| **I** - Independent | ☐ PASS / ☐ NEEDS WORK | [NOTES] |
| **N** - Negotiable | ☐ PASS / ☐ NEEDS WORK | [NOTES] |
| **V** - Valuable | ☐ PASS / ☐ NEEDS WORK | [NOTES] |
| **E** - Estimable | ☐ PASS / ☐ NEEDS WORK | [NOTES] |
| **S** - Small | ☐ PASS / ☐ NEEDS WORK | [NOTES] |
| **T** - Testable | ☐ PASS / ☐ NEEDS WORK | [NOTES] |

**Overall INVEST Quality:** ☐ EXCELLENT | ☐ GOOD | ☐ NEEDS REFINEMENT

---

## Subtasks (Optional)

[Break down the implementation into concrete tasks, if helpful for the team]

### Development Subtasks
- [ ] [SUBTASK 1]: [DESCRIPTION]
- [ ] [SUBTASK 2]: [DESCRIPTION]
- [ ] [SUBTASK 3]: [DESCRIPTION]

### Testing Subtasks
- [ ] [TEST SUBTASK 1]: [DESCRIPTION]
- [ ] [TEST SUBTASK 2]: [DESCRIPTION]

### Documentation Subtasks
- [ ] [DOC SUBTASK 1]: [DESCRIPTION]

---

## Questions & Discussion

### Open Questions
[What questions need to be answered before development starts?]

- **Q1:** [QUESTION] - Assigned to: [PERSON]
- **Q2:** [QUESTION] - Assigned to: [PERSON]

### Product Manager Notes
[Notes from product discussions, customer feedback, etc.]

[NOTES HERE]

---

## Collaboration & Sign-Off

### Discussion Notes
[Track discussion during refinement or planning]

- **Date:** [DATE] - [NOTES FROM DISCUSSION]
- **Date:** [DATE] - [NOTES FROM DISCUSSION]

### Approval

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Manager | [NAME] | [DATE] | ☐ Approved / ☐ Pending |
| Tech Lead | [NAME] | [DATE] | ☐ Approved / ☐ Pending |
| Assigned Developer | [NAME] | [DATE] | ☐ Accepted / ☐ Pending |

---

## Story History

| Version | Date | Updated By | Status | Changes |
|---------|------|-----------|--------|---------|
| 1.0 | [DATE] | [NAME] | CREATED | Initial story |
| 1.1 | [DATE] | [NAME] | REFINED | [CHANGES MADE] |
| 1.2 | [DATE] | [NAME] | APPROVED | [CHANGES MADE] |

---

## Useful Links & References

- **Epic:** [Link to Epic]
- **Design:** [Link to Design File]
- **Related Docs:** [Links to related documentation]
- **API Reference:** [Links to API docs if applicable]

---

**Story Owner:** [NAME]  
**Last Updated:** [DATE]  
**Next Review Date:** [DATE]
