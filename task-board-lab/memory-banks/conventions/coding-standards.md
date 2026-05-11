# Coding Standards — Task Board Lab

**Project:** Personal Task Board  
**Language:** TypeScript + React 18  
**Last Updated:** May 10, 2026  
**Version:** 1.0  

---

## Purpose

This document establishes coding standards for the Task Board Lab project. All developers and AI assistants must follow these standards to maintain code consistency, readability, quality, and maintainability.

---

## 1. Naming Conventions

### 1.1 General Rules

| Category | Convention | Examples | Notes |
|----------|-----------|----------|-------|
| **Variables** | camelCase | `taskTitle`, `isCompleted`, `userCount` | Descriptive, avoid single letters (except loop counters) |
| **Constants** | UPPER_SNAKE_CASE | `MAX_TASKS_PER_PROJECT`, `STORAGE_KEY_PROJECTS` | All caps, underscores between words |
| **Functions** | camelCase, verb-first | `createTask()`, `handleClick()`, `validateEmail()` | Start with action verb |
| **Classes** | PascalCase | `TaskManager`, `ProjectStore`, `KanbanBoard` | Capitalize each word, noun-based |
| **Types/Interfaces** | PascalCase | `Task`, `Project`, `AppState`, `FormProps` | Capitalize, add `I` prefix only if needed (avoid redundancy) |
| **Enums** | PascalCase | `TaskStatus`, `ProjectAction`, `ErrorType` | PascalCase for enum name and values |
| **Files** | Depends on content | See section 1.2 below | Match exported content |
| **Directories** | kebab-case (or camelCase) | `components/`, `utils/`, `hooks/`, `types/` | Lowercase, separate words with hyphens |

### 1.2 File & Directory Naming

#### Component Files (React)

**Pattern:** PascalCase, match component name

```typescript
// ✅ GOOD
src/components/TaskCard.tsx          // Exports <TaskCard />
src/components/ProjectSelector.tsx   // Exports <ProjectSelector />
src/components/KanbanBoard.tsx       // Exports <KanbanBoard />

// ❌ BAD
src/components/taskCard.tsx          // Lowercase
src/components/TaskCardComponent.tsx // Redundant "Component"
src/components/TASKCARD.tsx          // ALL CAPS
```

#### Utility/Hook Files (Non-React)

**Pattern:** camelCase, descriptive

```typescript
// ✅ GOOD
src/utils/localStorage.ts        // localStorage utilities
src/utils/validation.ts          // Validation functions
src/hooks/useTasks.ts            // Custom hook
src/hooks/useProjects.ts         // Custom hook

// ❌ BAD
src/utils/util.ts               // Too vague
src/hooks/tasks.ts              // Should be use* pattern
src/hooks/UseTasksHook.tsx      // Wrong extension, wrong casing
```

#### Type Definition Files

**Pattern:** camelCase or matching interface name

```typescript
// ✅ GOOD
src/types/index.ts              // All types exported here
src/types/task.ts               // Task-related types
src/types/project.ts            // Project-related types

// ❌ BAD
src/types/Task.ts               // Don't use PascalCase for files
src/types/types.ts              // Too generic
```

#### Test Files

**Pattern:** Match source file + `.test.ts` or `.spec.ts`

```typescript
// ✅ GOOD
src/components/TaskCard.test.tsx
src/utils/validation.test.ts
src/hooks/useTasks.test.ts

// ❌ BAD
src/components/__tests__/TaskCard.tsx  // Don't nest in __tests__
src/test/TaskCard.test.tsx             // Keep tests near source
```

#### Directory Structure

```typescript
src/
├── components/              // React components only
│   ├── TaskCard.tsx
│   ├── ProjectSelector.tsx
│   └── KanbanBoard.tsx
├── hooks/                   // Custom React hooks
│   ├── useTasks.ts
│   └── useProjects.ts
├── utils/                   // Utility functions
│   ├── localStorage.ts
│   ├── validation.ts
│   └── helpers.ts
├── types/                   // TypeScript type definitions
│   └── index.ts
├── context/                 // React Context providers
│   ├── TaskContext.tsx
│   └── ProjectContext.tsx
├── constants.ts             // Global constants
├── App.tsx                  // Root component
└── main.tsx                 // Entry point
```

### 1.3 Variable Naming

#### Booleans

**Pattern:** is/has/can/should + descriptive

```typescript
// ✅ GOOD
const isLoading = true;
const hasError = false;
const canDelete = true;
const shouldRefresh = false;

// ❌ BAD
const loading = true;        // Ambiguous
const deleted = true;        // Looks like past tense
const refresh = true;        // Unclear intent
const flag = true;           // Non-descriptive
```

#### Collections

**Pattern:** Plural or descriptive

```typescript
// ✅ GOOD
const tasks: Task[] = [];
const projects: Project[] = [];
const taskMap = new Map<string, Task>();
const projectIds: string[] = [];

// ❌ BAD
const task: Task[] = [];             // Singular for array
const project_list: Project[] = [];  // snake_case
const allProjects: Project[] = [];   // "all" is redundant
```

#### Callbacks/Handlers

**Pattern:** on/handle + event + action

```typescript
// ✅ GOOD
const handleTaskCreate = (title: string) => { };
const handleTaskDelete = (id: string) => { };
const onProjectChange = (projectId: string) => { };
const onDragStart = (e: DragEvent) => { };

// ❌ BAD
const createTask = () => { };        // Ambiguous with business logic
const doDelete = () => { };          // Non-standard prefix
const onTask = () => { };            // Too vague
```

#### Private Variables

**Pattern:** No special prefix needed in TypeScript

```typescript
// ✅ GOOD
class TaskStore {
  private tasks: Task[] = [];
  private currentProject: Project | null = null;
  
  private validateTask(task: Task): boolean { }
}

// ❌ BAD (JavaScript practice, not needed in TypeScript)
class TaskStore {
  _tasks: Task[] = [];          // JavaScript convention
  #tasks: Task[] = [];          // Private field, avoid unless necessary
}
```

---

## 2. File Structure & Organization

### 2.1 Component File Structure

**Pattern:** Consistent organization from top to bottom

```typescript
// TaskCard.tsx
// 1. Imports (external libraries first, then local)
import React, { useState, useCallback } from 'react';
import { Task } from '../types';
import { deleteTask } from '../utils/taskOps';
import './TaskCard.css';

// 2. Type definitions
interface TaskCardProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

// 3. Constants (if any)
const DRAG_HANDLE_ID = 'task-drag-handle';

// 4. Component definition
export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onTaskUpdate,
  onTaskDelete,
}) => {
  // Hooks at top
  const [isEditing, setIsEditing] = useState(false);

  // Callbacks
  const handleDelete = useCallback(() => {
    onTaskDelete(task.id);
  }, [task.id, onTaskDelete]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer?.setData('taskId', task.id);
  }, [task.id]);

  // Render
  return (
    <div className="task-card" draggable onDragStart={handleDragStart}>
      <h3>{task.title}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

// 5. Named exports only (avoid default exports)
export default TaskCard;  // ❌ Avoid this
```

**Rationale:**
- Consistent order aids readability
- Hooks at top, before logic
- Exports at end
- No hoisting surprises

### 2.2 Utility File Structure

```typescript
// utils/localStorage.ts
// 1. Type definitions
interface StorageData {
  tasks: Task[];
  projects: Project[];
}

// 2. Constants
const STORAGE_KEY_TASKS = 'taskboard:tasks';
const STORAGE_KEY_PROJECTS = 'taskboard:projects';
const DEBOUNCE_DELAY = 500;

// 3. Exported functions (order: simple → complex)
export function getStorageUsage(): { used: number; available: number } {
  // Implementation
}

export function saveTasks(tasks: Task[]): void {
  // Implementation with debouncing
}

export function loadTasks(): Task[] {
  // Implementation
}

// 4. Internal helper functions
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  // Implementation
}

function validateStorageData(data: unknown): data is StorageData {
  // Implementation
}
```

### 2.3 Hook File Structure

```typescript
// hooks/useTasks.ts
import { useContext, useCallback } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Task } from '../types';

export function useTasks() {
  const context = useContext(TaskContext);
  
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }

  const { tasks, dispatch } = context;

  // Derive data
  const tasksByProject = useCallback(
    (projectId: string) => tasks.filter(t => t.projectId === projectId),
    [tasks],
  );

  // Action creators
  const createTask = useCallback(
    (title: string, projectId: string) => {
      dispatch({ type: 'CREATE_TASK', payload: { title, projectId } });
    },
    [dispatch],
  );

  const updateTaskStatus = useCallback(
    (taskId: string, status: Task['status']) => {
      dispatch({ type: 'UPDATE_STATUS', payload: { taskId, status } });
    },
    [dispatch],
  );

  return {
    tasks,
    tasksByProject,
    createTask,
    updateTaskStatus,
  };
}
```

---

## 3. Code Organization & Patterns

### 3.1 Imports Organization

**Pattern:** Group and sort imports

```typescript
// ✅ GOOD: External → Internal → Types → Styles
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TaskCard } from './TaskCard';
import { useProjects } from '../hooks/useProjects';
import { saveTasks } from '../utils/localStorage';

import type { Task, Project } from '../types';

import './TaskList.css';

// ❌ BAD: Jumbled
import './TaskList.css';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../types';
import { useProjects } from '../hooks/useProjects';
import React from 'react';
```

**Order:**
1. External libraries (React, third-party packages)
2. Internal components
3. Internal hooks/utilities
4. Type-only imports (`import type`)
5. Stylesheet imports

**Sorting:** Alphabetical within each group (helps avoid duplicates)

### 3.2 Function Organization

**Pattern:** Exports first, helpers last

```typescript
// utils/validation.ts

// Export at top
export function validateTaskTitle(title: string): ValidationResult {
  const trimmed = title.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Title too long' };
  }
  
  return { valid: true };
}

export function validateProject(project: unknown): boolean {
  return isValidProject(project);
}

// Internal helpers (no export)
function isValidProject(project: unknown): boolean {
  if (typeof project !== 'object' || project === null) return false;
  
  const p = project as Record<string, unknown>;
  return (
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    p.name.length > 0
  );
}
```

### 3.3 React Component Patterns

#### Functional Components with Hooks

```typescript
// ✅ GOOD: Hooks-first, clean organization
interface KanbanBoardProps {
  projectId: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const { tasks, updateTaskStatus } = useTasks();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const projectTasks = tasks.filter(t => t.projectId === projectId);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task['status']) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTaskId) {
      updateTaskStatus(draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  return (
    <div className="kanban-board">
      {/* Columns */}
    </div>
  );
};
```

#### Custom Hooks

```typescript
// ✅ GOOD: Encapsulates logic, returns clean API
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Failed to save ${key} to localStorage:`, error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue] as const;
}
```

### 3.4 TypeScript Patterns

#### Type Definitions

```typescript
// ✅ GOOD: Clear, explicit types
interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  createdAt: Date;
  completedAt?: Date;
}

type TaskStatus = Task['status'];

interface CreateTaskPayload {
  title: string;
  projectId: string;
}

// ❌ BAD: Too loose
interface Task {
  [key: string]: any;
}

// ❌ BAD: Unnecessarily complex
type Task = {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
} & Timestamps & Partial<CompletionInfo>;
```

#### Union Types & Discriminated Unions

```typescript
// ✅ GOOD: For action dispatchers
type TaskAction =
  | { type: 'CREATE_TASK'; payload: CreateTaskPayload }
  | { type: 'DELETE_TASK'; payload: { taskId: string } }
  | { type: 'UPDATE_STATUS'; payload: { taskId: string; status: TaskStatus } };

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'CREATE_TASK':
      return [...state, createTask(action.payload)];
    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.payload.taskId);
    case 'UPDATE_STATUS':
      return state.map(t =>
        t.id === action.payload.taskId
          ? { ...t, status: action.payload.status }
          : t,
      );
  }
}
```

#### Generics for Reusability

```typescript
// ✅ GOOD: Generic hook for any localStorage value
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation
}

// ✅ GOOD: Generic filter function
export function filterByProperty<T, K extends keyof T>(
  items: T[],
  property: K,
  value: T[K],
): T[] {
  return items.filter(item => item[property] === value);
}

// Usage
const incompleteTasks = filterByProperty(tasks, 'status', 'todo');
```

---

## 4. Comments & Documentation

### 4.1 When to Comment

**✅ DO comment:**
- Complex logic or algorithms (why, not what)
- Non-obvious design decisions
- Workarounds or hacks with context
- Edge cases and gotchas
- Integration points between modules
- Performance-critical sections

**❌ DON'T comment:**
- Self-explanatory code (use clear naming instead)
- Loop bodies that do what the loop name suggests
- Comments that repeat the code

### 4.2 Comment Patterns

#### Block Comments (Complex Logic)

```typescript
// Calculate storage quota percentage to warn user
// localStorage is typically 5-10MB per domain; this is important
// for users with many tasks and large notes.
const storagePercentage = (usedBytes / MAX_STORAGE_BYTES) * 100;
if (storagePercentage > 80) {
  showStorageWarning();
}
```

#### Inline Comments (Non-Obvious Code)

```typescript
// Debounce localStorage writes to avoid excessive I/O
// without debouncing, every keystroke would trigger a write
const debouncedSave = debounce(() => saveState(state), 500);
```

#### JSDoc for Public APIs

```typescript
/**
 * Creates a new task in the specified project.
 * 
 * @param title - The task title (1-100 characters)
 * @param projectId - The parent project ID
 * @returns The created task with auto-generated ID and timestamp
 * @throws {ValidationError} if title is invalid
 * 
 * @example
 * const task = createTask('Fix login bug', 'proj-123');
 * console.log(task.id); // "task-abc123"
 */
export function createTask(title: string, projectId: string): Task {
  validateTaskTitle(title);
  
  return {
    id: uuidv4(),
    title,
    projectId,
    status: 'todo',
    createdAt: new Date(),
  };
}
```

#### TODO Comments

```typescript
// ✅ GOOD: Specific, actionable
// TODO: Implement virtual scrolling for >50 tasks (PERF-123)
// TODO: Add data validation before localStorage (SEC-456)

// ❌ BAD: Too vague
// TODO: fix this
// TODO: make it faster
```

### 4.3 Code Documentation

#### README for modules

```typescript
/**
 * localStorage utilities for task-board app
 * 
 * Features:
 * - Automatic debouncing of writes (500ms)
 * - Safe JSON serialization with error handling
 * - Storage quota monitoring
 * 
 * @module utils/localStorage
 */
```

---

## 5. Error Handling

### 5.1 Error Types

```typescript
// types/errors.ts

/**
 * Application-specific error types
 */

export class ValidationError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class StorageError extends Error {
  constructor(message: string, public readonly key?: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string, public readonly id?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
```

### 5.2 Error Handling Patterns

#### Try-Catch with Specific Error Types

```typescript
// ✅ GOOD: Specific error handling
export function loadTasksFromStorage(): Task[] {
  try {
    const data = localStorage.getItem('tasks');
    if (!data) return [];
    
    const tasks = JSON.parse(data) as Task[];
    validateTaskArray(tasks);
    return tasks;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Corrupted JSON, reset storage
      console.error('Corrupted tasks data, resetting');
      localStorage.removeItem('tasks');
      return [];
    }
    
    if (error instanceof ValidationError) {
      console.error('Invalid tasks data:', error.message);
      return [];
    }
    
    // Unknown error, re-throw
    throw error;
  }
}
```

#### Validation Before Operations

```typescript
// ✅ GOOD: Validate early
export function updateTaskStatus(taskId: string, status: TaskStatus): void {
  // Validate inputs first
  if (!taskId || taskId.trim() === '') {
    throw new ValidationError('Task ID cannot be empty', 'taskId');
  }
  
  const validStatuses = ['todo', 'in_progress', 'done'];
  if (!validStatuses.includes(status)) {
    throw new ValidationError(`Invalid status: ${status}`, 'status');
  }
  
  // Then proceed
  const task = findTask(taskId);
  if (!task) {
    throw new NotFoundError(`Task not found: ${taskId}`, taskId);
  }
  
  task.status = status;
  saveTask(task);
}
```

#### Error Boundaries (React)

```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 6. Testing Standards

### 6.1 Test File Organization

**Pattern:** Mirror source structure with `.test.ts` suffix

```
src/
├── components/
│   ├── TaskCard.tsx
│   └── TaskCard.test.tsx
├── utils/
│   ├── validation.ts
│   └── validation.test.ts
├── hooks/
│   ├── useTasks.ts
│   └── useTasks.test.ts
```

### 6.2 Test Naming & Structure

```typescript
// utils/validation.test.ts

describe('validation', () => {
  describe('validateTaskTitle', () => {
    // ✅ GOOD: Descriptive test names
    it('should reject empty titles', () => {
      const result = validateTaskTitle('');
      expect(result.valid).toBe(false);
    });

    it('should reject titles longer than 100 characters', () => {
      const longTitle = 'a'.repeat(101);
      const result = validateTaskTitle(longTitle);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('should accept valid titles with trimming', () => {
      const result = validateTaskTitle('  Valid Task  ');
      expect(result.valid).toBe(true);
    });

    // ✅ GOOD: Test edge cases
    it('should handle special characters in title', () => {
      const result = validateTaskTitle('Task with @#$% symbols');
      expect(result.valid).toBe(true);
    });
  });
});

// ❌ BAD: Vague names
it('works', () => { });
it('test 1', () => { });

// ❌ BAD: Testing implementation details
it('calls localStorage.getItem', () => { });
```

### 6.3 Test Patterns

#### Unit Tests

```typescript
// hooks/useTasks.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useTasks } from './useTasks';

describe('useTasks', () => {
  it('should create a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask('New task', 'proj-123');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('New task');
  });
});
```

#### Component Tests

```typescript
// components/TaskCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import { Task } from '../types';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    projectId: 'proj-1',
    title: 'Test task',
    status: 'todo',
    createdAt: new Date(),
  };

  it('should render task title', () => {
    render(
      <TaskCard
        task={mockTask}
        onTaskUpdate={jest.fn()}
        onTaskDelete={jest.fn()}
      />,
    );

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('should call onTaskDelete when delete button clicked', () => {
    const onTaskDelete = jest.fn();
    render(
      <TaskCard
        task={mockTask}
        onTaskUpdate={jest.fn()}
        onTaskDelete={onTaskDelete}
      />,
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(onTaskDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
```

### 6.4 Testing Best Practices

```typescript
// ✅ DO
- Test behavior, not implementation
- Use descriptive test names
- Keep tests focused (one thing per test)
- Use mocks for external dependencies
- Test edge cases and error conditions
- Maintain test-to-code ratio ~1:1 (minimum)

// ❌ DON'T
- Test implementation details (like if localStorage was called)
- Use vague test names
- Test multiple behaviors in one test
- Use real API calls or localStorage in tests
- Skip error cases
- Leave skipped tests (`it.skip` or `describe.skip`)
```

---

## 7. Code Quality Criteria

### 7.1 TypeScript Strict Mode

**Required Configuration:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Rationale:** Catch errors at compile-time, not runtime

### 7.2 ESLint Configuration

**Recommended rules:**

```javascript
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-console': 'warn',              // Warn on console.log
    'no-debugger': 'error',            // Error on debugger
    'no-var': 'error',                 // Require const/let
    'prefer-const': 'error',           // Use const where possible
    'eqeqeq': ['error', 'always'],    // === over ==
    'no-unused-vars': 'off',           // TypeScript handles this
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',         // TypeScript replaces PropTypes
  },
};
```

### 7.3 Prettier Configuration

**Standard formatting:**

```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
};
```

### 7.4 Code Complexity Metrics

| Metric | Target | Tool |
|--------|--------|------|
| **Cyclomatic Complexity** | <5 per function | ESLint complexity |
| **Function Length** | <50 lines | Manual review |
| **File Length** | <300 lines | Manual review |
| **Code Duplication** | <3% | sonarjs/no-duplicate-string |
| **Test Coverage** | >70% | Jest |

### 7.5 Performance Criteria

```typescript
// Performance benchmarks for mvp
const PERF_TARGETS = {
  pageLoad: 2000,           // milliseconds
  interactionResponse: 300, // milliseconds
  dragDropLatency: 500,     // milliseconds
  storageWrite: 500,        // milliseconds (debounced)
  memoryUsage: 50 * 1024,   // kilobytes
} as const;

// Monitor in development
if (process.env.NODE_ENV === 'development') {
  // Use Performance API
  const start = performance.now();
  // ... operation ...
  const duration = performance.now() - start;
  if (duration > PERF_TARGETS.interactionResponse) {
    console.warn(`Operation took ${duration}ms (target: ${PERF_TARGETS.interactionResponse}ms)`);
  }
}
```

### 7.6 Code Review Checklist

Before merging code:

- [ ] All tests passing (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No console.log() or debugger statements left
- [ ] Functions have clear, descriptive names
- [ ] Complex logic has comments explaining why
- [ ] Error handling covers failure cases
- [ ] No secrets or sensitive data in code
- [ ] Performance meets targets (<300ms for user actions)
- [ ] Accessibility maintained (WCAG 2.1 AA)
- [ ] Documentation updated if needed

---

## 8. Style Guide Examples

### 8.1 Good vs Bad Code

#### Example 1: Function Organization

```typescript
// ❌ BAD: Mixed concerns, unclear
function saveData() {
  const items = localStorage.getItem('data');
  const parsed = JSON.parse(items || '[]');
  const filtered = parsed.filter(item => !item.deleted);
  const sorted = filtered.sort((a, b) => b.date - a.date);
  
  // Now save?
  localStorage.setItem('data', JSON.stringify(sorted));
  
  return sorted;
}

// ✅ GOOD: Single responsibility, clear intent
function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TASKS);
    const data = raw ? JSON.parse(raw) : [];
    validateTaskArray(data);
    return data;
  } catch (error) {
    logError('Failed to load tasks', error);
    return [];
  }
}

function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  } catch (error) {
    logError('Failed to save tasks', error);
  }
}
```

#### Example 2: React Components

```typescript
// ❌ BAD: Too many responsibilities
export const ProjectBoard = ({ projectId, userId, onUpdate }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  useEffect(() => {
    // Loads tasks
    // Saves to localStorage
    // Notifies parent
    // All mixed together
  }, [projectId, userId]);

  return (
    // Massive render with everything inline
  );
};

// ✅ GOOD: Single responsibility
interface ProjectBoardProps {
  projectId: string;
  onTaskUpdate: (task: Task) => void;
}

export const ProjectBoard: React.FC<ProjectBoardProps> = ({
  projectId,
  onTaskUpdate,
}) => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  const projectTasks = tasks
    .filter(t => t.projectId === projectId)
    .filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="project-board">
      <TaskFilter value={filter} onChange={setFilter} />
      <TaskList tasks={projectTasks} onUpdate={onTaskUpdate} />
    </div>
  );
};
```

#### Example 3: Type Safety

```typescript
// ❌ BAD: Loose types
interface Task {
  [key: string]: any;
}

function updateTask(task: Task, updates: any): any {
  return { ...task, ...updates };
}

// ✅ GOOD: Explicit types
interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  createdAt: Date;
  completedAt?: Date;
}

type UpdateTaskPayload = Partial<Omit<Task, 'id' | 'projectId' | 'createdAt'>>;

function updateTask(task: Task, updates: UpdateTaskPayload): Task {
  return {
    ...task,
    ...updates,
    updatedAt: new Date(),
  };
}
```

---

## 9. Common Patterns to Avoid

| Pattern | Problem | Solution |
|---------|---------|----------|
| `any` type | Defeats TypeScript purpose | Use explicit types, generics, or `unknown` |
| `console.log` in production | Pollutes logs, performance | Use logger, remove in build |
| Prop drilling | Hard to maintain, verbose | Use Context API or hooks |
| Mutating state | Causes bugs, hard to debug | Always create new objects (immutability) |
| Magic numbers | Non-obvious, hard to maintain | Extract to named constants |
| Catch all | Silent failures, hard to debug | Catch specific errors, re-throw unknown |
| No error boundaries | App crashes on error | Wrap components, handle gracefully |
| Untested code | Regressions not caught | Test business logic, at least smoke tests |

---

## 10. Git & Commit Standards

### 10.1 Commit Message Format

**Pattern:** `[TYPE] Brief description (max 50 chars)`

```
✅ GOOD:
  [feat] Add task deletion with confirmation modal
  [fix] Resolve localStorage quota overflow error
  [refactor] Simplify TaskList component logic
  [test] Add validation.test.ts for edge cases
  [docs] Update README with keyboard shortcuts
  [chore] Update dependencies

❌ BAD:
  fixed bug
  update code
  WIP
  asdf
```

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`

### 10.2 Branch Naming

**Pattern:** `[TYPE]/[description]`

```
✅ GOOD:
  feature/task-creation
  bugfix/localStorage-overflow
  refactor/component-simplification
  docs/architecture-overview

❌ BAD:
  my-feature
  fix
  temp-changes
  wip-stuff
```

---

## 11. Security Best Practices

### 11.1 Input Validation

```typescript
// ✅ GOOD: Always validate user input
export function createTask(title: string, projectId: string): Task {
  // Validate inputs
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle || trimmedTitle.length === 0) {
    throw new ValidationError('Task title cannot be empty');
  }
  
  if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    throw new ValidationError(`Title exceeds ${MAX_TITLE_LENGTH} characters`);
  }
  
  if (!/^[a-zA-Z0-9\s\-_.!?()]+$/.test(trimmedTitle)) {
    throw new ValidationError('Title contains invalid characters');
  }
  
  // Safe to use
  return { id: uuidv4(), title: trimmedTitle, projectId, /* ... */ };
}
```

### 11.2 Secure localStorage Usage

```typescript
// ✅ GOOD: No sensitive data in localStorage
function saveAppState(state: AppState): void {
  // Never store passwords, tokens, or PII
  const safeState = {
    projects: state.projects,
    tasks: state.tasks,
    // NOT: authToken, password, email, etc.
  };
  
  localStorage.setItem('appState', JSON.stringify(safeState));
}

// ✅ GOOD: Sanitize user input in display
function displayTaskTitle(title: string): string {
  // Prevent XSS by escaping HTML
  return title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

---

## 12. Documentation Standards

### 12.1 README for Modules

```typescript
/**
 * Task management utilities
 * 
 * This module provides core task operations including CRUD operations,
 * status transitions, and validation.
 * 
 * Features:
 * - Create, read, update, delete tasks
 * - Validate task data before persistence
 * - Transition task statuses (todo → in_progress → done)
 * 
 * Usage:
 * ```typescript
 * const task = createTask('My task', 'proj-123');
 * updateTaskStatus(task.id, 'in_progress');
 * ```
 * 
 * @module utils/taskOps
 * @see {@link ../types/index.ts} for Task interface
 */
```

### 12.2 CHANGELOG Format

```markdown
# Changelog

## [1.0.0] - 2026-05-15

### Added
- Kanban board with drag & drop
- Keyboard shortcuts (Ctrl+N, Ctrl+P, Ctrl+D)
- localStorage persistence with export/import

### Fixed
- Storage quota warning at 80% usage
- Cross-browser drag & drop compatibility

### Changed
- Project selector now shows task count
```

---

## 13. Quick Reference Checklist

Before committing code:

- [ ] **Naming:** camelCase, PascalCase, UPPER_SNAKE_CASE used correctly
- [ ] **Structure:** Imports → Types → Constants → Implementation → Exports
- [ ] **Comments:** Only for "why", not "what"; JSDoc for public APIs
- [ ] **Errors:** Specific error types, proper handling, no silent failures
- [ ] **Tests:** Unit tests for utils, component tests for React, >70% coverage
- [ ] **TypeScript:** No `any`, strict mode enabled, all types defined
- [ ] **Linting:** `npm run lint` passes with no errors
- [ ] **Performance:** Interactions <300ms, load <2s, Lighthouse ≥80
- [ ] **Security:** No sensitive data exposed, input validated
- [ ] **Accessibility:** Keyboard navigation works, WCAG AA compliance
- [ ] **Git:** Descriptive commit message, appropriate branch name

---

## References

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** May 10, 2026  
**Owner:** Development Team  
**Status:** Active  
**Next Review:** June 15, 2026 (Post-MVP Phase 1)
