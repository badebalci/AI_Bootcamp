# Output With Memory Bank

## 1- Task Description
Build the core project data layer for a personal task board application, aligned with memory-bank conventions and standards.

The goal is to support creating, listing, updating, and deleting projects while persisting data in browser storage, with implementation choices informed by repository memory and coding standards.

## 2- What to Build
Create a TypeScript module composed of the following parts:

- A project model that defines project data and input contracts.
- A project repository service that handles CRUD operations with resilient storage behavior.
- A module entry point that re-exports models and services.

Expected files:

- output-with-memory-bank/src/models/project.ts
- output-with-memory-bank/src/services/projectRepository.ts
- output-with-memory-bank/src/index.ts

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
- Generate unique project ids using globalThis.crypto.randomUUID when available, otherwise fallback.
- Return domain-specific errors:
- ProjectValidationError
- ProjectNotFoundError
- ProjectStorageError
- Handle corrupted or non-array storage payloads safely by returning an empty project list.
- Detect quota-related storage failures and expose a clear user-facing error message.
- Resolve default storage safely and throw a storage error when localStorage is unavailable.

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
- Running in an environment without localStorage throws ProjectStorageError.
- Index module exports project model types and repository service.

## 5- Implementation Without Memory Banks
Baseline implementation behavior without memory-bank guidance:

- Uses ISO string timestamps for createdAt and updatedAt.
- Uses constructor default storage = localStorage directly.
- Parses storage payload with shape checks based on property existence.
- Provides the same CRUD surface and domain errors.

Memory-bank-informed output improvements in output-with-memory-bank:

- Uses numeric timestamps (Date.now()) for createdAt and updatedAt.
- Uses a stricter ProjectRecord type guard for id, name, createdAt, and updatedAt.
- Uses resolveDefaultStorage() to validate localStorage availability explicitly.
- Uses globalThis for platform-safe access patterns.
