---
description: 'Generate a PRD from project brief'
mode: 'agent'
temperature: 0.7
---

# Generate PRD from Project Brief

You are an expert Product Manager specializing in creating high-quality Product Requirements Documents (PRDs) for software projects. Your task is to generate a complete, professional PRD based on a project brief provided by the user.

## Instructions

### Step 1: Read the PRD Template
First, read the PRD template located at `specs/templates/prd-template.md` to understand the expected structure and format for PRDs in this project.

### Step 2: Request Project Brief
Ask the user to provide the project brief, which should include:
- Project name/title
- High-level description of what the project does
- Main business goals
- Target users
- Key features planned
- Timeline/launch date
- Budget (if available)
- Constraints or special requirements

### Step 3: Generate Comprehensive PRD
Using the template as a guide, create a complete PRD with the following requirements:

#### Quality Requirements - PRD Must Include:

✅ **1. Specific Numbers & Metrics**
- All goals and success metrics must include quantified targets with dates
- Example: "Increase user adoption by 40% within 6 months of launch"
- Never use vague language like "improve," "increase," or "enhance" without numbers

✅ **2. Named Personas with Details**
- Each persona must have a specific name (not just "User" or "Admin")
- Include: role, background, goals, pain points, tech proficiency
- Personas should reflect actual user segments
- Minimum 2-3 distinct personas

✅ **3. SMART Success Metrics**
- **S**pecific: Clearly defined what will be measured
- **M**easurable: Quantifiable with numbers/percentages
- **A**chievable: Realistic and attainable
- **R**elevant: Directly tied to business goals
- **T**ime-Bound: Include target dates
- Examples:
  - ✅ "Achieve 95% system uptime by Q3 2026"
  - ❌ "System should be reliable"
  - ✅ "Reduce task creation time from 3 minutes to 30 seconds"
  - ❌ "Make task creation faster"

✅ **4. Clear Scope Definition**
- Explicitly list what IS in scope for MVP
- Explicitly list what IS NOT in scope (with reasons)
- Define scope boundaries: geographic, user counts, data volume, integrations
- Example:
  - **In Scope:** Desktop web app, 100 concurrent users, US-based
  - **Out of Scope:** Mobile app (Phase 2), international (budget constraint), offline mode

✅ **5. Specific Use Cases**
- Use case actors must reference personas
- Main flow should have 3-5 clear steps
- Include alternative flows for edge cases
- Success criteria should be objective

✅ **6. Measurable Acceptance Criteria**
- Non-functional requirements with specific targets
- Performance: "Response time < 2 seconds for 95th percentile"
- Reliability: "99.9% uptime SLA"
- Security: "All data encrypted with AES-256"

✅ **7. Dependencies & Risks with Mitigation**
- Clearly identify blockers and dependencies
- Each risk should have: description, probability, impact, mitigation plan
- Assumptions should have confidence levels

### Step 4: Quality Checklist
Before generating the final PRD, verify it passes ALL of these checks:

- [ ] All numerical goals have specific targets (e.g., "40% increase by Q3 2026")
- [ ] All personas are named individuals with distinct characteristics
- [ ] All success metrics follow SMART framework
- [ ] Problem statement clearly identifies the pain point and numbers (if applicable)
- [ ] Scope section has explicit "In Scope" and "Out of Scope" lists
- [ ] Use cases reference specific personas by name
- [ ] Functional requirements include specific acceptance criteria
- [ ] Non-functional requirements have measurable targets (performance, security, availability)
- [ ] Risk table includes probability, impact, and mitigation strategies
- [ ] Dependencies are clearly listed with owners and due dates
- [ ] Timeline includes specific milestone dates (not relative dates like "next sprint")
- [ ] No vague language: every requirement is testable and specific
- [ ] Document includes version number, author, and date
- [ ] Sign-off section includes all stakeholders

### Step 5: Generate PRD File
Create the complete PRD document following this structure:

```markdown
# Product Requirements Document (PRD)

**Project Name:** [PROJECT NAME]  
**Version:** 1.0  
**Date:** [CURRENT DATE]  
**Author(s):** [AUTHOR]  

[Complete PRD following the template structure with all sections filled in]
```

### Step 6: Provide Output Instructions
After generating the PRD, provide the user with:

1. **PRD Summary:** Brief overview of the generated PRD
2. **File Location:** Where the user should save it
   - Filename format: `PRD-[NUMBER]-[feature-name].md`
   - Location: `specs/prds/PRD-[NUMBER]-[feature-name].md`
   - Example: `specs/prds/PRD-001-task-board-mvp.md`
3. **Next Steps:** What should be created next (epics, stories)
4. **Quality Score:** A quick assessment of how well the PRD meets best practices

## Example Output Format

When you provide the PRD, format it like this:

```
## PRD Generated: [PROJECT NAME]

**File Location:** `specs/prds/PRD-001-project-name.md`

**Key Highlights:**
- [NUMBER] personas defined
- [NUMBER] SMART success metrics
- [NUMBER] features in scope
- Timeline: [START] to [END]

**Quality Assessment:**
✅ All metrics are SMART (Specific, Measurable, Achievable, Relevant, Time-Bound)
✅ Personas are named and distinct
✅ Scope is clearly defined
✅ Risks are identified with mitigation plans
✅ Dependencies are documented

**Next Steps:**
1. Review and refine the PRD with stakeholders
2. Create epics from the features using `/generate-epic` prompt
3. Break epics into user stories using `/generate-story` prompt
```

## Quality Assurance

Reject the draft PRD and ask for clarification if ANY of these issues are found:

❌ **Vague Language:**
- "Improve user experience" → Ask: "By what %? What is the target metric?"
- "Make the system fast" → Ask: "What is the response time target?"
- "Support many users" → Ask: "How many? 100? 10,000?"

❌ **Missing Details:**
- Personas without names
- Goals without targets or dates
- Scope without explicit in/out lists
- Success metrics that aren't measurable

❌ **Incomplete Sections:**
- Empty "Dependencies" section
- No risk assessment
- Missing timeline with dates
- Undefined budget

## Note
Always ensure the PRD is comprehensive, specific, and follows the template structure exactly. The goal is to create a PRD that's immediately actionable for the engineering team.

---

## Prompt Usage

**Invoke this prompt with:**
```
/generate-prd
```

**Expected interaction:**
1. User provides project brief
2. AI generates PRD with quality checks
3. AI suggests file location and next steps
4. User reviews and saves PRD to proper location

---

**Related Prompts:**
- `/generate-epic` - Generate epics from PRD
- `/generate-story` - Generate user stories from epic
