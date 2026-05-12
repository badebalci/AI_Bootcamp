# Output Without Memory Banks

## 1- Task Description
Build the core project data layer for a personal task board application.

The goal is to support creating, listing, updating, and deleting projects while keeping the data persisted in browser storage. This implementation should stay lightweight and not depend on a memory bank architecture.

## 2- What to Build
Create a TypeScript module composed of the following parts:

- A project model that defines the shape of project data and input contracts.
- A project repository service that handles CRUD operations.
- A module entry point that re-exports models and services for easy importing.

Expected files:

- output-without-memory-banks/src/models/project.ts
- output-without-memory-banks/src/services/projectRepository.ts
- output-without-memory-banks/src/index.ts

## 3- Requirements
The solution should satisfy these requirements:

- Define a Project type with id, name, createdAt, and updatedAt.
- Define CreateProjectInput and UpdateProjectInput interfaces.
- Enforce project name validation:
- Name is required after trim.
- Max name length is 255 characters.
- Persist projects in localStorage under a single key: task-board.projects.
- Support repository methods:
- list()
- getById(projectId)
- create(input)
- update(projectId, input)
- delete(projectId)
- Generate unique project ids using crypto.randomUUID when available, otherwise fallback.
- Return domain-specific errors:
- ProjectValidationError
- ProjectNotFoundError
- ProjectStorageError
- Handle corrupted or non-array storage payloads safely by returning an empty project list.
- Detect quota-related storage failures and expose a clear user-facing error message.

## 4- Acceptance Criteria
The implementation is accepted when all of the following are true:

- Creating a project with a valid name stores it and returns the created object.
- Creating or updating with an empty or too-long name throws ProjectValidationError.
- Listing projects returns all persisted projects from localStorage.
- Fetching by unknown id returns null.
- Updating an unknown id throws ProjectNotFoundError.
- Deleting an unknown id throws ProjectNotFoundError.
- Quota exceeded errors are converted to ProjectStorageError with a meaningful message.
- Generic persistence failures are converted to ProjectStorageError.
- Invalid JSON or malformed payload in storage does not crash and returns an empty array.
- Index module exports project model types and repository service.

## 5- Implementation Without Memory Banks
This implementation uses a direct localStorage repository pattern without a memory-bank abstraction.

Summary of what was implemented:

- Model contracts in project.ts:
- PROJECT_NAME_MAX_LENGTH = 255
- Project, CreateProjectInput, UpdateProjectInput, and ProjectId types
- Repository behavior in projectRepository.ts:
- Input normalization via trim
- Validation and typed errors
- JSON parse guard with fallback to []
- CRUD operations over an in-memory array synchronized to localStorage
- Robust write error handling with quota detection
- Public exports in index.ts:
- Re-export model and repository modules

Output characteristics:

- Simple and framework-agnostic TypeScript design
- Browser-friendly persistence using localStorage
- Predictable error contracts for UI or application-layer handling
- No dependency on external memory bank components
