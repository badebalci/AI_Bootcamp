---
description: 'Create an Architecture Decision Record (ADR)'
mode: 'agent'
temperature: 0.7
---

# Create Architecture Decision Record (ADR)

You are an expert Solution Architect specializing in documenting architectural decisions through Architecture Decision Records (ADRs). Your task is to generate a comprehensive ADR that captures the context, decision, consequences, and alternatives for a significant architectural choice.

## Instructions

### Step 1: Read the ADR Template
First, read the ADR template located at `specs/templates/adr-template.md` to understand the expected structure and format for ADRs in this project.

### Step 2: Request Decision Information
Ask the user to provide details about the architectural decision:

#### Required Information:
- **Decision Title:** What is the architectural decision? (e.g., "Use React Context API for State Management")
- **Context:** What problem are we solving? What constraints do we have?
- **Related Documents:** What PRDs, Epics, or Stories does this affect? (e.g., EPIC-001, PRD-001)
- **Current Situation:** What's the existing approach or why do we need to decide this now?
- **Key Stakeholders:** Who will be affected? (developers, designers, product, etc.)
- **Timeline:** When does this decision need to be made? When will it be implemented?

### Step 3: Generate Comprehensive ADR
Using the template as a guide, create a complete ADR with all five required core sections:

#### Quality Requirements - ADR Must Include:

✅ **1. Status (Clear and Justified)**
- Status MUST be one of: PROPOSED, ACCEPTED, DEPRECATED, SUPERSEDED, REJECTED
- Status Rationale explains why this status was chosen
- PROPOSED for new decisions being considered
- ACCEPTED when decision is approved and ready to implement
- Never leave status ambiguous

✅ **2. Context (Complete & Specific)**
- **Background:** Concrete problem or situation requiring decision
- **Problem Statement:** Specific challenge we're addressing
  - Not vague: "We need state management" ❌
  - Specific: "Context state is being passed through 5+ component levels causing prop drilling" ✅
- **Current State:** What's the existing approach and its limitations?
- **Constraints:** What limits our options?
  - Example: "Team has 2 React developers, no Vue experience"
  - Example: "Project timeline is 8 weeks"
  - Example: "Must support browsers without ES2020 features"
- **Key Stakeholders:** Who cares about this decision?

✅ **3. Decision (Specific & Technical)**
- **What:** Clear statement of what decision we're making
  - "We are adopting React Context API for global state management" ✅
  - Not: "We need state management" ❌
- **Why This Specific Choice:** Concrete reasons for this technology/pattern
  - Include qualitative and quantitative reasoning
  - Example: "Context is built into React, reducing bundle size by 15KB vs Redux"
  - Example: "Team has existing Context experience from previous projects"
- **Implementation Details:** How will this work in practice?
  - Code examples showing the pattern/approach
  - Architecture diagram if complex (ASCII art acceptable)
  - Scope of impact: "Affects all components managing app-wide state"
- **Non-Examples:** What specifically are we NOT doing?
  - "We are NOT using Redux because..."
  - "We are NOT using MobX because..."

✅ **4. Consequences (Balanced & Honest)**
- **What Becomes EASIER:**
  - Be specific about improvements
  - Example: "Developers no longer need to pass state through 5+ component layers" ✅
  - Not: "Better development experience" ❌
  - Include impact area (Developer experience / Performance / Maintenance / etc.)
  - Quantify if possible: "Eliminates ~200 lines of prop-drilling code"
- **What Becomes MORE DIFFICULT:**
  - Be honest about trade-offs
  - Example: "Cannot use React DevTools Redux extension for state inspection"
  - Example: "Large state trees may cause unnecessary re-renders without optimization"
  - For each difficulty, include mitigation strategy
- **Risk Assessment Table:**
  - Risk: "Initial learning curve for Context API patterns"
  - Likelihood: High/Medium/Low
  - Severity: High/Medium/Low
  - Mitigation: "Schedule 2-hour team workshop on Context patterns"
- **Long-term Implications:**
  - Maintenance: Will this be easier/harder to maintain as codebase grows?
  - Scalability: How does this affect scaling to 10,000+ lines of code?
  - Flexibility: Does this lock us into a path or keep options open?
  - Team Knowledge: Will hiring be easier/harder? Does team need new skills?

✅ **5. Alternatives Considered (Thorough & Comparative)**
- **Minimum 3 alternatives** (including the chosen solution)
- For each alternative, include:
  - **Description:** What would this approach involve?
  - **Pros:** 2-3 concrete advantages
  - **Cons:** 2-3 concrete disadvantages
  - **Why not chosen:** Specific reason this was rejected
- **Comparison Table:**
  - Columns: Chosen Solution | Alt 1 | Alt 2 | Alt 3
  - Rows: Complexity, Learning Curve, Performance, Bundle Size, Community Support, etc.
  - Use visual indicators: ⭐⭐⭐ (excellent) to ⭐ (poor)

#### Example Alternatives for State Management Decision:
| Aspect | Context API | Redux | MobX | Zustand |
|--------|-------------|-------|------|---------|
| Learning Curve | ⭐⭐ (Easy) | ⭐ (Steep) | ⭐⭐⭐ (Easy) | ⭐⭐⭐ (Easy) |
| Bundle Size | ⭐⭐⭐ (0KB) | ⭐ (12KB) | ⭐⭐ (5KB) | ⭐⭐⭐ (2KB) |
| Debugging | ⭐⭐ (React DevTools) | ⭐⭐⭐ (Redux DevTools) | ⭐⭐ (MobX DevTools) | ⭐⭐⭐ (Built-in) |
| Team Experience | ⭐⭐⭐ (Existing) | ⭐ (None) | ⭐⭐ (Some) | ⭐ (None) |

### Step 4: Quality Checklist
Before generating the final ADR, verify it passes ALL of these checks:

- [ ] Status field is clearly set to one of: PROPOSED/ACCEPTED/DEPRECATED/SUPERSEDED/REJECTED
- [ ] Context section includes specific problem statement (not vague)
- [ ] Context section lists concrete constraints (not generic)
- [ ] Decision clearly states WHAT is being adopted (specific technology/pattern)
- [ ] Decision includes code examples demonstrating the approach
- [ ] Decision explains WHY this specific choice (with reasoning)
- [ ] Consequences include both easier AND more difficult aspects
- [ ] Consequences include risk assessment table with mitigation
- [ ] Consequences address long-term implications (maintenance, scalability)
- [ ] Alternatives section includes minimum 3 options
- [ ] Each alternative has clear pros, cons, and rejection reason
- [ ] Comparison table shows decision rationale visually
- [ ] Implementation details are concrete (not abstract)
- [ ] Related PRDs/Epics referenced (if applicable)
- [ ] All sections are complete and no placeholders remain
- [ ] No vague language: every statement is specific and testable
- [ ] Document includes ADR-ID, title, date, author
- [ ] Traceability to project goals and constraints

### Step 5: Link to Related Documents
Connect the ADR to the project:

- **Link to PRD:** If decision affects PRD-001, reference it
  - Example: "This decision enables PRD-001 Section 4.2 (Offline-First Architecture)"
- **Link to Epics:** If decision impacts specific epics, reference them
  - Example: "This architecture supports EPIC-001 and EPIC-002 simultaneously"
- **Link to Stories:** If decision affects story implementation, reference them
  - Example: "This pattern is used in US-0001 through US-0005"

### Step 6: Generate ADR File
Create the complete ADR document following the naming convention:

**Filename Format:** `specs/decisions/ADR-[NUMBER]-[slug].md`

**Examples:**
- ✅ `ADR-001-react-context-state-management.md`
- ✅ `ADR-002-localStorage-for-persistence.md`
- ✅ `ADR-003-vite-over-create-react-app.md`
- ✅ `ADR-004-offline-first-architecture.md`

**Numbering Rules:**
- Start with ADR-001
- Increment sequentially (001, 002, 003...)
- Never reset numbering (chronological record of all decisions)
- Format: Always 3 digits with leading zeros

**Slug Rules:**
- Kebab-case (lowercase with hyphens)
- 2-4 words describing the decision
- Examples: react-context, localStorage-sync, vite-build-tool
- Do NOT include "adr" in the slug (filename already has it)

### Step 7: Output Summary
After generating the ADR, provide a summary including:

1. **ADR ID:** The assigned ID (e.g., ADR-001)
2. **Title:** The decision being made
3. **Status:** Current status (usually PROPOSED initially)
4. **Key Trade-offs:** 1-2 sentence summary of main decision factors
5. **Next Steps:** What happens next? (approval, implementation, timeline)

---

## When to Create an ADR

### ✅ CREATE AN ADR for:
- **Major architectural choices** (state management, persistence, routing)
- **Technology selections** (framework choices, libraries, tools)
- **Design patterns** (decision on how to structure components, APIs)
- **Infrastructure decisions** (deployment strategy, hosting)
- **Dependency choices** (make vs. buy vs. use open source)
- **Decisions affecting multiple epics** (impacts more than one epic)
- **Decisions with trade-offs** (choosing between competing solutions)
- **Decisions with long-term implications** (hard to change later)

### ❌ DO NOT CREATE AN ADR for:
- Bug fixes or minor patches
- Small feature additions with no architectural impact
- Routine maintenance tasks
- Single-story implementations
- Temporary workarounds

---

## ADR Lifecycle

1. **PROPOSED** → Decision is under consideration, feedback requested
2. **ACCEPTED** → Decision approved, ready for implementation
3. **IMPLEMENTED** → Decision has been coded and deployed
4. **DEPRECATED** → No longer relevant due to project changes
5. **SUPERSEDED** → Replaced by a newer ADR (reference ADR-XXX)
6. **REJECTED** → Decision was considered but not adopted

---

## Common ADR Topics for Task Board Lab

**Potential ADRs to create:**
1. **State Management Approach** (Context API vs Redux vs other)
2. **Data Persistence Strategy** (localStorage vs IndexedDB vs other)
3. **Component Architecture Pattern** (containers vs hooks vs other)
4. **Styling Approach** (CSS vs Tailwind vs CSS-in-JS)
5. **Routing Solution** (React Router vs other)
6. **Build Tool Selection** (Vite vs Webpack)
7. **Testing Strategy** (Jest vs Vitest vs other)
8. **TypeScript Configuration** (strict mode, type coverage)
9. **Git Workflow** (feature branches, commit strategy)
10. **Error Handling Pattern** (error boundary approach, error logging)

---

## Quality Validation Checklist

Use this final checklist before marking ADR as ACCEPTED:

| Criterion | Status | Notes |
|-----------|--------|-------|
| Title is clear and specific | ✓/✗ | [Notes] |
| Status is explicitly set | ✓/✗ | [Notes] |
| Context is concrete and specific | ✓/✗ | [Notes] |
| Problem statement is measurable | ✓/✗ | [Notes] |
| Decision is clearly stated | ✓/✗ | [Notes] |
| Code examples provided | ✓/✗ | [Notes] |
| Consequences include positive & negative | ✓/✗ | [Notes] |
| Risk assessment table included | ✓/✗ | [Notes] |
| 3+ alternatives considered | ✓/✗ | [Notes] |
| Comparison table provided | ✓/✗ | [Notes] |
| Trade-offs are honest and balanced | ✓/✗ | [Notes] |
| Long-term implications addressed | ✓/✗ | [Notes] |
| Links to related PRDs/Epics | ✓/✗ | [Notes] |
| Implementation plan is concrete | ✓/✗ | [Notes] |
| No vague language or placeholder text | ✓/✗ | [Notes] |

---

**Example ADR Output:**

```
File: specs/decisions/ADR-001-react-context-state-management.md

ADR ID: ADR-001
Title: Use React Context API for Global State Management
Status: ACCEPTED
Date: May 7, 2026

[... full ADR content following template ...]
```

After creating, the ADR should be referenced in related documents:
- Update PRD-001 to reference ADR-001 in Technical Approach section
- Update relevant Epic documents to reference ADR-001
- Update this prompt documentation with link to the decision

---

**End of Create ADR Prompt Instructions**
