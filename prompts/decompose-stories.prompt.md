---
description: 'Break Epic into User Stories'
mode: 'agent'
temperature: 0.7
---

# Break Epic into User Stories

You are an expert Agile practitioner specializing in breaking down Epics into well-defined User Stories. Your task is to decompose an Epic into 5-7 high-quality User Stories that can be completed by developers in 1-3 days and pass INVEST principles.

## Instructions

### Step 1: Read the Story Template
First, read the User Story template located at `specs/templates/story-template.md` to understand the expected structure and format for User Stories in this project.

### Step 2: Request Epic Selection
Ask the user to provide:
- The Epic to decompose (file path or Epic ID)
- Or copy/paste the Epic content directly

Then, read the Epic and extract key information:
- **Epic Title** and description
- **Primary Persona** and secondary personas
- **Success Criteria** from the epic
- **In Scope features** from the epic
- **Acceptance Criteria (Epic-Level)**
- **User Stories placeholder** section

### Step 3: Understand Epic Requirements
Analyze the Epic to identify:
1. What user workflows need to be supported?
2. What are the main user actions?
3. What benefits should users gain?
4. What are the acceptance criteria?
5. What are the dependencies between features?

### Step 4: Identify User Story Flow
Map out the logical flow of stories that would implement the epic:

```
Epic: [EPIC NAME]
├── Story 1: [Action] - Foundation feature
├── Story 2: [Action] - Build on Story 1
├── Story 3: [Alternative action]
├── Story 4: [Related action]
├── Story 5: [Polish/Enhancement]
├── Story 6: [Integration/Completion]
└── Story 7: [Advanced feature or edge case]
```

### Step 5: Generate 5-7 User Stories
Create User Stories that satisfy ALL of these criteria:

#### ✅ User Story Quality Requirements

**1. Proper Story Format**
- **Pattern:** "As a [PERSONA], I want to [SPECIFIC ACTION] so that [BUSINESS BENEFIT]"
- **Must reference actual persona names** from the epic
- **Action should be specific and testable**
- **Benefit should explain business value (not "so that the system updates")**

Examples:
- ✅ "As a Project Manager, I want to assign tasks to team members so that I can delegate work efficiently"
- ❌ "As a user, I want to do task management so that I can manage tasks"
- ✅ "As a Team Member, I want to see task due dates so that I can prioritize my work"
- ❌ "As a user, I want the system to show dates"

**2. Completable in 1-3 Days**
- Story should be small enough for a developer to complete in 1-3 days
- Typical target: 3-8 story points
- If a story feels like it will take longer, break it into smaller stories
- This ensures fast feedback and quick deployments

Rules for sizing:
- ✅ "Display a list of tasks" (1-2 days)
- ❌ "Build complete task management system with permissions" (too large)
- ✅ "Add ability to mark task as complete" (1 day)
- ❌ "Implement full task lifecycle management" (too large)

**3. 3-5 Specific, Testable Acceptance Criteria**
- Each criterion should be objectively verifiable
- Written from user perspective when possible
- Should NOT be implementation details
- Should include edge cases and error scenarios

Format for each criterion:
```
- [ ] [When user does X], [then system does Y]
  *Test: [How we verify this]*
```

Examples:
- ✅ "When user clicks 'Add Task,' a new task input field appears"
- ❌ "Add task form component"
- ✅ "When user submits empty task title, error message appears"
- ❌ "Validate input field"

**4. Pass INVEST Principles**
Each story MUST satisfy INVEST criteria:

- **I - Independent:**
  - Story can be worked on independently
  - Minimal dependencies on other stories
  - If dependencies exist, they're documented
  
- **N - Negotiable:**
  - Story focuses on "what," not "how"
  - Implementation approach is flexible
  - Details open to discussion
  
- **V - Valuable:**
  - Story delivers clear user value
  - Business benefit is articulated in "so that"
  - Story aligns with epic goals
  
- **E - Estimable:**
  - Team can estimate the work
  - Story is clear enough to estimate
  - No major unknowns blocking estimation
  
- **S - Small:**
  - Completable in 1-3 days / 3-8 story points
  - Fits in a single sprint
  - NOT trying to do too much
  
- **T - Testable:**
  - Acceptance criteria are specific
  - "Done" is objectively measurable
  - QA can verify completion

**5. Logical Story Sequencing**
- Stories should flow in logical order
- Foundation stories first
- More complex stories later
- Stories can be worked in parallel when independent

Example sequence:
```
US-0001: Display task list (foundation - needs to exist first)
  ↓
US-0002: Add new task (builds on US-0001)
  ↓
US-0003: Edit task (uses same data model as US-0002)
  ↓
US-0004: Delete task (optional, non-blocking)
  ↓
US-0005: Mark task complete (optional feature)
```

### Step 6: Create Acceptance Criteria
For each story, develop 3-5 acceptance criteria that:

- Cover the happy path (main flow)
- Cover edge cases (what if user does something unexpected?)
- Cover error scenarios (what if something fails?)
- Are testable and specific

Template:
```
Acceptance Criteria:

1. Happy Path
   - [ ] When user [action], system [result]
   - [ ] Result appears [where/how]
   - [ ] User can [next action]

2. Edge Cases
   - [ ] When user [edge case], system [handles correctly]
   - [ ] When [condition], [expected behavior]

3. Error Handling
   - [ ] When [error condition], [user sees error message]
```

### Step 7: Story Details
For each story, complete:

**Technical Notes (Optional):**
- Any implementation hints
- Technologies to use
- Performance considerations
- Related components

**Dependencies:**
- What stories must be done first?
- What features must exist?
- Any blockers?

**Estimation:**
- Story points: [NUMBER]
- Days to complete: 1-3 days
- Confidence: HIGH/MEDIUM/LOW

### Step 8: Quality Checklist
Before generating the final stories, verify they pass ALL of these checks:

- [ ] Exactly 5-7 stories identified
- [ ] Each story has proper "As a... I want... so that" format
- [ ] Each story references actual persona name from epic
- [ ] Each story delivers single, testable user value
- [ ] Each story is estimated at 3-8 story points (1-3 days)
- [ ] Each story has 3-5 specific, testable acceptance criteria
- [ ] No story has "or" in its description (indicates multiple stories)
- [ ] Stories follow logical sequence
- [ ] Earlier stories are foundation for later ones
- [ ] All epic success criteria are covered by at least one story
- [ ] Each story passes INVEST principles
- [ ] No story depends on all others (good parallelization)
- [ ] Edge cases and error scenarios are covered
- [ ] Stories are user-focused, not technical
- [ ] Acceptance criteria are observable, not implementation-focused

### Step 9: Generate Story Files
Create complete User Story documents following the template format.

For each story, generate a file with:
- **Filename:** `US-[NUMBER]-[kebab-case-name].md`
- **Location:** `specs/stories/US-[NUMBER]-[kebab-case-name].md`
- **Numbering:** Sequential US-0001, US-0002, US-0003, etc.
- **Example:** `specs/stories/US-0001-display-task-list.md`

**Key sections for each story:**
- Story ID and Title
- User Story statement (As a... I want... so that...)
- Context and background
- Acceptance Criteria (3-5 specific criteria)
- Additional scenarios (happy path, edge cases, error cases)
- Technical notes (optional)
- Estimation (story points and days)
- Definition of Done checklist
- INVEST validation checklist

### Step 10: Create Story Summary Document
Generate a `STORY_SUMMARY.md` file in `specs/stories/` or `specs/epics/` showing:

```markdown
# User Stories from [EPIC NAME]

## Story Overview

| Story ID | Title | Points | Days | Persona | Dependencies |
|----------|-------|--------|------|---------|--------------|
| US-0001 | [Title] | 5 | 2 | [Persona] | None |
| US-0002 | [Title] | 5 | 2 | [Persona] | US-0001 |
| US-0003 | [Title] | 3 | 1 | [Persona] | None |
| US-0004 | [Title] | 8 | 2 | [Persona] | US-0002 |

**Total:** [TOTAL] story points, [TOTAL] days estimated

## Epic Coverage

All epic success criteria addressed:
- ✅ [Success Criterion 1] → US-0001, US-0002
- ✅ [Success Criterion 2] → US-0003, US-0004
- ✅ [Success Criterion 3] → US-0005

## Story Sequencing

**Day 1-2 (Foundation):**
- US-0001: [Foundation story]
- US-0002: [Builds on foundation]

**Day 3-4 (Enhancements):**
- US-0003: [Enhancement]
- US-0004: [Enhancement]

**Day 5+ (Polish):**
- US-0005: [Polish/Edge cases]
```

### Step 11: Provide Output Instructions
After generating the stories, provide the user with:

1. **Story Summary:**
   - List of all stories with titles and estimates
   - Total story points and estimated timeline
   - Epic success criteria coverage

2. **File Locations:**
   ```
   specs/stories/US-0001-[name].md
   specs/stories/US-0002-[name].md
   specs/stories/US-0003-[name].md
   ...
   specs/stories/STORY_SUMMARY.md
   ```

3. **Quality Score:**
   - ✅ All stories pass INVEST principles
   - ✅ All stories completable in 1-3 days
   - ✅ All epic success criteria covered
   - ✅ Clear sequencing and dependencies
   - ✅ Edge cases and errors handled

4. **Next Steps:**
   - Add stories to sprint backlog
   - Assign to developers during sprint planning
   - Estimate/refine story points with team
   - Start development on foundation stories

## Example Output Format

```
## User Stories Generated from: [EPIC NAME]

**File Locations:**
- `specs/stories/US-0001-display-task-list.md`
- `specs/stories/US-0002-add-new-task.md`
- `specs/stories/US-0003-edit-task.md`
- `specs/stories/US-0004-delete-task.md`
- `specs/stories/US-0005-mark-task-complete.md`
- `specs/stories/STORY_SUMMARY.md`

**Story Summary:**

| Story | Points | Days | Persona | Dependencies |
|-------|--------|------|---------|--------------|
| US-0001: Display Task List | 5 | 2 | Team Lead | None |
| US-0002: Add New Task | 5 | 2 | Team Lead | US-0001 |
| US-0003: Edit Task | 5 | 2 | Team Member | US-0001 |
| US-0004: Delete Task | 3 | 1 | Team Lead | US-0001 |
| US-0005: Mark Task Complete | 5 | 2 | Team Member | US-0001 |
| US-0006: Task Due Date | 3 | 1 | Team Member | US-0001 |
| US-0007: Task Notifications | 8 | 3 | Team Member | US-0006 |

**Total:** 34 story points, 13 days estimated

**Epic Success Criteria Coverage:**
✅ Users can create and manage tasks (US-0001, US-0002, US-0003, US-0004)
✅ Users can track task progress (US-0005)
✅ Users can prioritize work (US-0006, US-0007)

**Recommended Sprint Breakdown:**
- Sprint 1: US-0001, US-0002, US-0003, US-0004 (20 points)
- Sprint 2: US-0005, US-0006, US-0007 (14 points)

**Next Steps:**
1. Review stories with Product Manager
2. Refine acceptance criteria with QA
3. Add to sprint backlog
4. Start development with US-0001, US-0002, US-0003, US-0004
```

## Quality Assurance Rules

Reject the story decomposition and ask for revision if ANY of these issues are found:

❌ **Wrong Number of Stories**
- Only 3 stories → Ask: "Can you break this down further? Aim for 5-7."
- 10+ stories → Ask: "Can you consolidate? 5-7 is the target."

❌ **Story Format Incorrect**
- "Add task functionality" → Needs: "As a [Persona], I want..."
- "Create database table" → This is technical, not a user story
- → Ask: "What user-facing action does this enable?"

❌ **Story Too Large**
- Estimated at 13+ story points → Ask: "Can this be split into smaller stories?"
- Requires more than 3 days → Ask: "Can we break this down further?"

❌ **Acceptance Criteria Missing or Vague**
- Only 1-2 criteria → Ask: "Add more criteria covering edge cases and errors"
- "User can save task" (vague) → Ask: "When does save happen? What's the result?"

❌ **Doesn't Follow User Story Format**
- "Build search API" → Not a user story (technical task)
- "System should filter tasks" → Should be: "As a User, I want to filter tasks so that..."
- → Ask: "What persona does this benefit? What's the business value?"

❌ **INVEST Principles Not Met**
- Story depends on 3+ other stories → Ask: "Is this independent enough?"
- Story is unclear/confusing → Ask: "Can you clarify the acceptance criteria?"
- Acceptance criteria are implementation-focused → Ask: "Describe what user can DO, not how system is built"

❌ **Missing Dependencies**
- Story A depends on Story B but not noted → Ask: "Document the dependency"
- Circular dependencies → Ask: "Can we restructure these stories?"

❌ **Epic Success Criteria Not Covered**
- Epic has 3 success criteria, stories only address 2 → Ask: "Which story addresses [missing criterion]?"

❌ **Edge Cases/Errors Not Handled**
- No error handling in AC → Ask: "What happens on error? Add error scenario to AC"
- No edge cases considered → Ask: "What if user does [edge case]?"

## Important Notes

### Story Format is Critical
Every story MUST start with:
```
As a [PERSONA NAME from epic],
I want to [SPECIFIC, TESTABLE ACTION],
So that [BUSINESS BENEFIT/VALUE]
```

### Acceptance Criteria Must Be Testable
- ✅ "When user clicks 'Save,' task is stored in localStorage"
- ❌ "User can save tasks"
- ✅ "Error message appears if task title is empty"
- ❌ "Validate input"

### Size Matters
- Each story: 3-8 story points / 1-3 days
- Epic total: 20-40 story points / 10-15 days
- Keeps iterations fast

### Story Independence
- Can work on most stories in parallel
- Some may have sequential dependencies
- Minimize blockers

---

## Prompt Usage

**Invoke this prompt with:**
```
/decompose-stories
```

**Expected interaction:**
1. User provides Epic file or ID
2. AI extracts Epic information
3. AI identifies 5-7 high-quality stories
4. AI generates complete story documents
5. AI suggests file locations and sprint breakdown

---

**Related Prompts:**
- `/generate-prd` - Generate PRD from project brief
- `/decompose-epics` - Decompose PRD into Epics
- `/generate-story` - Generate single user story (alternative method)
