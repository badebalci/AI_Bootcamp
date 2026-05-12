# Coding Standards: Personal Task Board

**Project:** Personal Task Board  
**Language/Stack:** TypeScript + React 18  
**Last Updated:** May 12, 2026  
**Version:** 1.2

## Naming Conventions

- **Files**: PascalCase for React components; camelCase for hooks, services, and utility modules; kebab-case for directories.
- **Classes**: PascalCase.
- **Functions/Variables**: camelCase, with verb-first function names.
- **Constants**: UPPER_SNAKE_CASE.
- **Database Tables**: Not applicable in MVP (offline-first, no backend database). If introduced later, use snake_case plural table names.

## File Structure

Project folder organization:

- `memory-banks/`: architecture, domain, conventions, and workflow documentation.
- `specs/`: PRDs, epics, stories, and templates.
- `output-with-memory-bank/src/`: memory-assisted implementation variant.
- `output-without-memory-banks/src/`: baseline implementation variant.

Source-of-truth rule:

- Behavior and implementation details belong in source files under the `src/` folders and related tests.
- Product intent belongs in `specs/`.
- Standards and domain language belong in `memory-banks/`.

## Code Organization

- Maximum function length: 50 lines target (exceptions allowed for clear orchestration code with review approval).
- One class per file: Yes, unless tightly coupled private helper classes are required.
- DRY principle: Extract shared logic once repeated behavior appears in 2+ locations or creates maintenance risk.

## Comments

- Docstrings required for: exported public APIs, shared utility modules, and complex domain logic.
- Inline comments: use only for non-obvious rationale, constraints, or trade-offs.
- TODOs format: `// TODO(username): Description`.

## Testing Requirements

- Test types: unit and integration required; E2E recommended for critical user flows.
- Coverage targets: 70% minimum overall, with priority on domain-critical logic.
- Test file naming: `*.test.ts` / `*.test.tsx` (or `*.spec.*` if consistently adopted in a folder).
- Test organization: mirror `src/` structure and colocate tests near source modules.

## Error Handling

- Error response format: typed/domain-specific errors with clear message, code/category, and actionable recovery guidance when possible.
- Logging requirements: log unexpected errors, boundary failures, and persistence failures; avoid logging sensitive user data.
- Exception types: use custom domain errors (for example: validation, storage, not-found) and avoid silent catches.

## Quality Criteria

- Definition of "done":
  - Requirements traceable to story/PRD are met.
  - Type checks, linting, and tests pass.
  - No leftover debug statements.
  - User-facing behavior matches MVP expectations.
- Code review checklist:
  - Naming and structure follow this standard.
  - Logic is readable, typed, and maintainable.
  - Error handling and edge cases are covered.
  - Tests validate behavior, not implementation internals.
  - Documentation is updated only where source-of-truth changed.
- Performance expectations:
  - Page load under 2 seconds.
  - Typical UI feedback under 300 ms.
  - Drag-and-drop feedback under 500 ms.

## Project-Specific Conventions

- Domain vocabulary alignment:
  - Use canonical terms from `memory-banks/domain/glossary.md` in code comments, PRs, and docs.
  - Status values must remain `todo`, `in_progress`, `done` for MVP.
- Architectural constraints:
  - Keep MVP offline-first; no mandatory backend/network dependency for core task/project flows.
  - Do not introduce server-oriented abstractions in MVP paths unless explicitly approved by an ADR.
- Persistence conventions:
  - Treat persisted data as untrusted input and validate on read boundaries.
  - Use versioned persistence payloads for forward-compatible migrations when schema changes.
- Interaction conventions:
  - Keyboard-first parity is required for core actions (create, select/switch project, change status, complete task).
  - Pointer interactions (for example drag and drop) must have non-pointer alternatives.
- Module boundaries:
  - Keep domain models and business rules in dedicated modules; avoid mixing with UI rendering concerns.
  - Keep side effects (storage, IO, browser APIs) out of pure transformation functions.
- Pull request guardrails:
  - Any change to status model, persistence shape, or keyboard behavior must include tests and a brief risk note.
  - Any glossary term change must update `memory-banks/domain/glossary.md` in the same PR.

## References

- `specs/prds/PRD-001-personal-taskboard-mvp.md`
- `memory-banks/architecture/overview.md`
- `memory-banks/domain/glossary.md`
- `memory-banks/workflows/development-process.md`

**Owner:** Development Team  
**Status:** Active  
**Next Review:** June 15, 2026
