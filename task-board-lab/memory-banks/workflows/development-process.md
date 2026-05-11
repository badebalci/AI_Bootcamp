# Development Workflow — Task Board Lab

Project: Personal Task Board  
Last Updated: May 11, 2026  
Version: 1.0  
Audience: Developers and AI assistants

---

## 1) Purpose And Scope

This document defines the required workflow from idea to production for Task Board Lab.

This workflow is normative:

- MUST means mandatory.
- SHOULD means recommended unless there is a documented reason not to.
- MAY means optional.

Applies to:

- Feature work
- Bug fixes
- Refactors
- Documentation changes that alter behavior expectations

---

## 2) End-To-End Process (Idea To Production)

### Stage 0: Intake And Clarification

Entry sources:

- PRD updates in specs/prds/
- Epic/story creation in specs/epics/ and specs/stories/
- Defect reports

Required outputs:

- A single source work item (story, bug, or chore)
- Clear acceptance criteria (testable, unambiguous)
- Definition of done attached to the work item

Gate (MUST pass):

- Problem statement exists
- User/value impact is explicit
- Scope is bounded (in scope / out of scope)

### Stage 1: Planning And Design

Required actions:

- Link work item to parent artifact (PRD/Epic/Story)
- Identify impacted modules and risks
- Confirm data model and persistence impact (localStorage implications)
- If architecture changes, create/update ADR in specs/decisions/

Required outputs:

- Task breakdown (implementation + tests + docs)
- Test plan (unit/integration/e2e scope)
- Rollout risk level (low/medium/high)

Gate (MUST pass):

- Acceptance criteria mapped to planned tests
- Non-functional concerns considered (performance, reliability, offline behavior)

### Stage 2: Implementation (Feature Branch)

Required actions:

- Create branch using GitHub Flow naming rules (see Section 3)
- Implement smallest viable increment that satisfies acceptance criteria
- Write/maintain tests with code changes
- Update related specs if behavior changed

Gate (MUST pass before PR):

- Code builds locally
- Lint/typecheck pass
- Required tests pass
- Coverage thresholds met (Section 5)

### Stage 3: Pull Request And Review

Required actions:

- Open PR early (draft allowed), finalize when ready
- Complete PR template and checklist
- Request at least 1 reviewer
- Resolve all blocking comments

Gate (MUST pass):

- CI checks all green
- Required approvals obtained
- No unresolved blocking conversations

### Stage 4: Merge And Release

Required actions:

- Rebase or update branch from main before merge if needed
- Use squash merge unless repository policy states otherwise
- Ensure commit message is descriptive and traceable to work item

Gate (MUST pass):

- main remains deployable
- Release notes/changelog updated when user-visible behavior changed

### Stage 5: Production Verification

Required actions:

- Verify critical user flows in production
- Monitor errors and regressions for agreed observation window
- If regression found, execute rollback procedure (Section 6)

Completion criteria:

- Post-deploy checks passed
- Work item moved to Done with links to PR and release artifact

---

## 3) Branching Strategy — GitHub Flow

### Source Of Truth

- main is always production-ready.
- All changes are made via short-lived branches off main.
- No direct pushes to main.

### Branch Naming (MUST)

Pattern:

- type/short-description

Allowed types:

- feature
- fix
- chore
- docs
- refactor
- test

Examples:

- feature/project-selector-state
- fix/persist-selected-project
- docs/update-deployment-workflow

Rules:

- Use lowercase kebab-case only
- Keep branch life <= 3 days when possible
- Keep PR size targeted (prefer < 400 changed lines excluding generated files)

### Sync And Hygiene Rules

- MUST branch from latest main.
- SHOULD sync with main at least daily for active branches.
- MUST delete branch after merge.
- MUST not reuse merged branch names.

---

## 4) Pull Request Process And Code Review Checklist

### PR Requirements (MUST)

Each PR must include:

- Linked work item or spec reference
- Problem summary and solution summary
- Explicit test evidence (what ran, what passed)
- Risk/impact note
- Screenshots or recordings for UI changes
- Rollback notes for medium/high-risk changes

### PR Size And Scope

- SHOULD keep one logical change per PR.
- MUST avoid mixing refactor and feature behavior unless justified.
- MUST split large changes when review quality would degrade.

### Review Policy

- Minimum approvals: 1
- For high-risk changes (state model, persistence, routing): 2 approvals recommended
- Author MUST resolve all blocking review comments before merge

### Code Review Checklist (Blocking)

Reviewers MUST verify:

- Correctness:
  - Behavior matches acceptance criteria
  - Edge cases and failure states handled
- Safety:
  - No data-loss behavior introduced
  - localStorage migrations/backward compatibility considered
- Quality:
  - Clear naming and readable logic
  - No dead code or debug artifacts
- Tests:
  - New behavior has tests
  - Regressions covered
  - Coverage gates met
- Maintainability:
  - Architecture boundaries respected
  - Specs/docs updated when behavior changed

Non-blocking but expected:

- UX consistency with current UI patterns
- Performance sanity for list rendering and persistence operations

### Merge Criteria (MUST)

PR can merge only when:

- CI status checks pass
- Approval requirement met
- No blocking comments unresolved
- Branch up to date with merge target (as required by repo settings)

---

## 5) Testing Strategy And Coverage Requirements

### Test Pyramid

1. Unit tests

- Scope: utility functions, hooks, reducers/state transitions, validators
- Goal: fast feedback and branch/path coverage for core logic

2. Integration tests

- Scope: component interactions, context/provider integration, localStorage integration
- Goal: verify user flows across multiple components

3. End-to-end tests

- Scope: critical journeys (project create/select/delete, task visibility, persistence across reload)
- Goal: production-like confidence for key workflows

### Minimum Required Coverage (MUST)

Global thresholds:

- Lines >= 80%
- Statements >= 80%
- Functions >= 80%
- Branches >= 70%

Changed-file thresholds:

- Lines >= 85%
- Functions >= 85%
- Branches >= 75%

Critical modules thresholds (state, storage, migration logic):

- Lines >= 90%
- Functions >= 90%
- Branches >= 85%

### Required Test Cases Per Change

For each new or modified behavior, PR MUST include:

- Happy path test(s)
- At least one edge case test
- At least one failure/invalid input test (when applicable)

For bug fixes, PR MUST include:

- Reproduction test that fails before fix and passes after fix

### CI Enforcement

CI MUST fail when:

- Any required test suite fails
- Coverage thresholds are below required values
- Typecheck/lint checks fail

Temporary exemptions:

- Allowed only with documented rationale in PR
- Must include follow-up work item with due date

---

## 6) Deployment Process

### Manual Steps

1. Pre-deployment readiness (MUST)

- Confirm the merge commit on main passed full CI (tests, lint, typecheck, coverage gates)
- Confirm release notes/changelog entry exists for user-visible changes
- Confirm rollback owner is assigned for medium/high-risk changes
- Confirm rollback target (last known-good version/tag/SHA) is documented

2. Release preparation (MUST)

- Create/confirm release tag format: vMAJOR.MINOR.PATCH (or repo standard)
- Record deployment metadata: target environment, version tag, commit SHA, deployer, timestamp
- Confirm no active incident or deployment freeze window

3. Production deployment (MUST)

- Deploy from main only
- Use approved deployment command/pipeline trigger only (no ad-hoc script changes during release)
- Announce deployment start in team channel with version/tag and estimated completion time

### Automated Steps

The CI/CD system MUST automatically perform:

- Build application artifact from main
- Run lint, typecheck, and all required test suites
- Enforce coverage thresholds from Section 5
- Publish/store build artifact and associated metadata
- Deploy artifact to target environment
- Emit deployment status (success/failure), version, and commit SHA

The CI/CD system SHOULD automatically perform:

- Basic post-deploy smoke check job
- Notification to team channel on success/failure

### Verification

Deployment is considered successful only when all checks below pass:

1. Technical checks (MUST)

- Deployment job completed successfully
- Deployed version/tag and commit SHA match intended release
- No severe runtime/console errors observed in initial check window

2. Functional smoke checks (MUST)

- Load app
- Create/select/delete project
- View tasks by selected project
- Reload and verify persisted selection/data

3. Observability checks (MUST)

- Error rate remains within normal baseline
- No critical alert triggered for at least 15 minutes post-deploy

4. Sign-off (MUST)

- Mark deployment record as Verified
- Link release metadata back to PR/work item

### Rollback Procedure

Rollback MUST be initiated if any trigger occurs:

- Data loss or corruption risk detected
- Core flow broken for a significant user segment
- Error rate exceeds agreed threshold for 15+ minutes
- Critical security or privacy issue identified

Rollback steps (MUST):

1. Incident declaration

- Declare incident and assign incident owner
- Freeze further deployments until service is stabilized

2. Select rollback strategy

- Preferred: redeploy previous known-good release
- Alternative: revert offending commit(s) on main via urgent PR

3. Execute rollback

- Run approved rollback pipeline or deploy command
- Confirm rolled-back version/tag/SHA in environment metadata

4. Validate rollback

- Re-run functional smoke checks listed above
- Confirm error metrics and alerts return to baseline

5. Communicate and document

- Post incident summary: timeline, impact, root cause, resolution
- Create follow-up actions (tests, safeguards, monitoring improvements)

Forward-fix policy:

- For low-risk issues with a fast, validated fix, forward-fix MAY be used instead of rollback
- Decision owner: incident owner + tech lead
- Decision and rationale MUST be documented in incident notes

---

## 7) Definition Of Done (DoD)

A change is Done only if all are true:

- Acceptance criteria met
- Tests implemented and passing
- Coverage requirements met
- PR approved and merged via GitHub Flow
- Docs/specs updated where needed
- Deployment verified or release-ready with documented plan

---

## 8) AI Assistant Execution Rules

When an AI assistant performs development tasks, it MUST:

- Read related PRD/Epic/Story before implementation
- Follow branch naming and PR checklist rules exactly
- Generate tests alongside code changes
- Report any unmet gate explicitly (do not silently bypass)
- Update related documentation when behavior/process changes

When blocked, AI assistant SHOULD:

- Propose smallest safe alternative
- Ask for explicit override when a MUST requirement cannot be met

---

## 9) Quick Operational Checklist

Before PR:

- [ ] Branch follows GitHub Flow naming
- [ ] Lint/typecheck/tests pass
- [ ] Coverage gates pass
- [ ] Specs/docs updated

Before merge:

- [ ] Reviewer approval(s) complete
- [ ] CI green
- [ ] No blocking comments

Before/after deploy:

- [ ] Deploy from main
- [ ] Record version/tag/SHA
- [ ] Smoke tests pass
- [ ] Rollback plan ready/executed if needed
