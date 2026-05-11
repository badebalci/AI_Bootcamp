# Domain Glossary — Task Board Lab

**Project:** Personal Task Board  
**Last Updated:** May 10, 2026  
**Version:** 1.0  

---

## Purpose

This glossary defines domain-specific terminology used in the Task Board Lab project. These terms represent key concepts, entities, and patterns unique to the personal task management domain. All team members and AI assistants should use these terms consistently when discussing the project.

---

## Core Domain Terms

### 1. Task

**Definition:**  
A unit of work representing a single action or item that needs to be completed within a project. Tasks are the atomic building blocks of the task board—they cannot be broken down further in the MVP.

**Context:**  
Tasks are the primary data entity in the system. Every task belongs to exactly one project and moves through three states (Todo, In Progress, Done) during its lifecycle. Understanding task lifecycle is critical for building features around task management.

**Characteristics:**
- Has a unique ID (UUID)
- Contains a title (1-100 characters)
- Belongs to exactly one Project
- Has a Status (todo | in_progress | done)
- Has creation and completion timestamps
- Optional: notes or detailed description (future phases)

**Example Usage:**
- "Create a task for fixing the login bug in the Auth project"
- "Move this task to In Progress when you start working on it"
- "When you're done, move the task to the Done column"
- "The user created 5 tasks this week"

**Related Terms:** Project, Task Status, Column

**Code Reference:**
```typescript
interface Task {
  id: string;              // Unique identifier
  projectId: string;       // Parent project
  title: string;           // Task description
  status: TaskStatus;      // Current state
  createdAt: Date;         // When task was created
  completedAt?: Date;      // When task was marked done
}
```

---

### 2. Project

**Definition:**  
A container that groups related tasks together. Projects represent distinct contexts (e.g., client work, personal side project, learning initiative) where tasks are organized.

**Context:**  
Projects are the secondary data entity. The app supports multiple projects, allowing users to maintain separate task boards for different work contexts. Project switching is a core navigation pattern in the MVP.

**Characteristics:**
- Has a unique ID (UUID)
- Has a user-provided name (e.g., "Client A - Website", "Personal LLM App")
- Contains zero or more Tasks
- Has creation and update timestamps
- Shows task count in selector (e.g., "Project Name (5 tasks)")

**Example Usage:**
- "Switch to the Client A project to see their tasks"
- "Create a new project called 'Learning React'"
- "This project has 12 tasks across all statuses"
- "Delete the project when the client work is complete"

**Related Terms:** Task, Project Selector, Task Count

**Code Reference:**
```typescript
interface Project {
  id: string;              // Unique identifier
  name: string;            // User-provided project name
  createdAt: Date;         // When project was created
  updatedAt: Date;         // Last modification time
}
```

---

### 3. Task Status

**Definition:**  
The current state of a task in its lifecycle. There are three possible statuses in the MVP: Todo, In Progress, and Done. Task status indicates progress through the workflow.

**Context:**  
Task status is the primary way users track progress. Changing status is the most common user action (moving tasks between columns). Status changes are persisted immediately to localStorage to prevent data loss.

**Valid States:**
- **Todo** — Task is identified but not yet started (default state for new tasks)
- **In Progress** — User is actively working on the task
- **Done** — Task is completed and no longer requires action

**Status Transitions:**
```
Todo ↔ In Progress ↔ Done
```
Users can move tasks backward and forward between any columns (no one-way restriction in MVP).

**Example Usage:**
- "Drag this task to In Progress when you start working"
- "The task status is not saved; try dragging it again"
- "How many tasks are in Done? 8"
- "All completed tasks should be moved to Done to keep the board clean"

**Related Terms:** Task, Column, Kanban Board

**Code Reference:**
```typescript
type TaskStatus = 'todo' | 'in_progress' | 'done';

// Status mapping to columns
const STATUS_TO_COLUMN = {
  'todo': 'To Do',
  'in_progress': 'In Progress',
  'done': 'Done',
};
```

---

### 4. Column

**Definition:**  
A vertical section of the Kanban board that displays all tasks with the same status. Columns are visual groupings representing task status stages.

**Context:**  
The Kanban board displays three columns (To Do, In Progress, Done) corresponding to the three task statuses. Columns are the primary UI organizing principle. Users interact with columns when:
- Viewing tasks in a specific status
- Dragging tasks between columns to change status
- Seeing the count of tasks in each status
- Scrolling within a column that exceeds viewport height

**Characteristics:**
- Fixed at 3 columns in MVP (cannot be customized)
- Each column maps to one TaskStatus
- Column header shows count (e.g., "To Do (5)")
- Shows "No tasks" message when empty
- Scrollable if height exceeds 600px
- Takes 33% width on desktop (equal widths)

**Column Mapping:**
| Column Name | Task Status | Display Order |
|-------------|------------|---------------|
| To Do | todo | First (leftmost) |
| In Progress | in_progress | Middle |
| Done | done | Last (rightmost) |

**Example Usage:**
- "Drag the task from the To Do column to the In Progress column"
- "How many tasks are in the Done column?"
- "The task didn't move to the right column; check the drag & drop is working"
- "All columns should be visible on desktop without horizontal scrolling"

**Related Terms:** Kanban Board, Task Status, Task

**Code Reference:**
```typescript
const COLUMNS = [
  { status: 'todo' as const, label: 'To Do' },
  { status: 'in_progress' as const, label: 'In Progress' },
  { status: 'done' as const, label: 'Done' },
];
```

---

### 5. Kanban Board

**Definition:**  
The main visual display of the task management system. A Kanban board is a grid of three columns (To Do, In Progress, Done) that displays tasks for the currently selected project organized by their status.

**Context:**  
The Kanban board is the central UI component and primary user interface. It's the main metaphor users interact with. Understanding Kanban principles is important for maintaining UI consistency and user expectations.

**Kanban Principles Applied:**
- **Visualize Work:** All tasks visible at a glance
- **Limit Work in Progress:** Users can see how many tasks are in each stage
- **Manage Flow:** Drag & drop enables status changes
- **Make Policies Explicit:** Task count and status are visible

**Characteristics:**
- Shows all tasks for the currently selected Project
- Three columns with equal width (33% each on desktop)
- Column headers show task count
- Tasks displayed as draggable cards
- Empty state shows "No tasks" message
- Responsive layout (stacks on mobile, horizontal on desktop)

**Example Usage:**
- "The Kanban board shows all tasks for the current project"
- "Check the board to see what's in progress"
- "The board should update within 300ms when switching projects"
- "Design the Kanban board layout first"

**Related Terms:** Column, Task, Project, Task Status

---

### 6. Keyboard-First Interface

**Definition:**  
A design philosophy where the application prioritizes keyboard navigation and shortcuts as the primary input method, with mouse/touch as secondary options. A keyboard-first interface assumes users prefer keyboard for speed and efficiency.

**Context:**  
One of the core product goals (Goal 2: "Reduce task management friction by providing keyboard-first interface"). The keyboard-first approach differentiates Task Board from competitors like Jira or Asana, which are GUI-first. This is critical for the persona of Alex (Solo Developer) who "prefers CLI and keyboard shortcuts over GUI."

**Keyboard-First Elements:**
- **Shortcuts for all major actions:**
  - Ctrl+N (Cmd+N on Mac): Create new task
  - Ctrl+P (Cmd+P on Mac): Open project switcher
  - Ctrl+D (Cmd+D on Mac): Mark task as done
  - Arrow keys: Navigate between tasks and columns
  - Shift+Right/Left: Move task between columns
  - Escape: Close dialogs and deselect

- **Focus management:** Keyboard users can navigate the entire app without touching the mouse
- **Accessibility:** All features accessible via keyboard (WCAG 2.1 AA requirement)
- **Muscle memory:** Power users develop keyboard habits and don't need to switch context

**Example Usage:**
- "Press Ctrl+N to create a new task without breaking focus from coding"
- "The app is keyboard-first; all features should work with keyboard shortcuts"
- "Test that keyboard navigation works as expected"
- "Alex prefers keyboard-first because it reduces context switching"

**Related Terms:** Accessibility, User Experience, Keyboard Shortcuts

**Design Impact:**
- Dialog/modal opens with focus on primary input (task title field)
- Tab order is logical and predictable
- Keyboard shortcuts displayed in help overlay (? key)
- Arrow keys navigate task list, Shift+arrows move between columns

---

### 7. Offline-First Architecture

**Definition:**  
A system design pattern where the application functions completely without internet connectivity. Data is stored locally in the browser (localStorage) rather than on a remote server. Offline-first means the app is "online by default, offline capable" — it works with or without internet.

**Context:**  
Offline-first is a core architectural decision (Decision 1 in architecture overview). It directly addresses user pain points from the PRD: "Most solutions require internet connectivity to remote servers" and "internet-dependent tools cause sync issues."

**Offline-First Implications:**
- **Data Storage:** All data persists in browser localStorage (no server)
- **No Internet Required:** Users can work on tasks without internet
- **No Login/Authentication:** No user accounts or authentication needed
- **No Sync:** Changes don't sync across devices in MVP (acceptable trade-off)
- **User Owns Data:** Tasks stay on user's device; they own their data
- **Instant Launch:** App loads instantly without waiting for server

**Characteristics:**
- localStorage is primary persistence layer (5-10MB quota)
- JSON export/import for backups
- No API calls to external servers
- Works in airplane mode
- No connectivity checks or error handling for network timeouts

**Example Usage:**
- "The app is offline-first; users don't need internet to use it"
- "Save data to localStorage; don't make API calls"
- "Provide export/import for users who want to back up their data"
- "Test the app in airplane mode to verify offline capability"

**Related Terms:** localStorage, Data Persistence, Browser-Based

**Trade-offs:**
- ✅ No server infrastructure cost
- ✅ Instant app launch
- ✅ User data ownership
- ❌ No cross-device sync (Phase 2 feature)
- ❌ No real-time collaboration

---

## Supporting Domain Terms

### Data Persistence

**Definition:**  
The mechanism by which the application saves and retrieves user data across browser sessions. In Task Board, data persists using browser localStorage with manual export/import backups.

**Related Concepts:**
- **localStorage:** Browser API providing 5-10MB storage per domain
- **Debouncing:** Writes delayed by 500ms to batch changes and improve performance
- **Export:** Download user data as JSON file (backup)
- **Import:** Load previously exported JSON file back into app

**Example Usage:**
- "Data persists to localStorage immediately when the user creates a task"
- "Debounce localStorage writes to avoid excessive I/O"
- "Users should export their data weekly as backup"

---

### Project Selector

**Definition:**  
The UI component that displays all projects and allows users to switch between them. Located in the header, the project selector is a dropdown menu showing project names and task counts.

**Features:**
- Dropdown list of all projects
- Task count for each project (e.g., "Client A - Website (5 tasks)")
- "Create new project" option at bottom
- Delete project option with confirmation
- Keyboard shortcut: Ctrl+P to open selector
- Arrow keys to navigate, Enter to select

**Example Usage:**
- "Click the project selector to switch projects"
- "The project selector remembers the last selected project"
- "Create a new project from the dropdown"

---

### Drag & Drop

**Definition:**  
The user interaction pattern where users click and hold a task card, drag it to a different column, and release to move the task and change its status. Drag & drop is the primary method for changing task status in the MVP.

**Implementation Details:**
- Uses HTML5 Drag & Drop API (browser-native)
- Visual feedback: task opacity 0.7 while dragging
- Drop zone highlighting when dragging over column
- Completes within 500ms for responsive feel
- Works on desktop browsers (Chrome, Firefox, Safari, Edge)

**Alternative Interaction:**
- Keyboard shortcut: Select task with arrow keys, press Shift+Right to move to next column
- Right-click context menu: "Move to In Progress" (future phase)

**Example Usage:**
- "Drag the task to the In Progress column when you start working"
- "The drag & drop should feel smooth and responsive (<500ms)"
- "Test drag & drop on multiple browsers"

---

### Keyboard Shortcuts

**Definition:**  
Keyboard key combinations that trigger application actions without using the mouse. Shortcuts are essential for the keyboard-first interface.

**MVP Shortcuts:**
| Shortcut | Action | Platform |
|----------|--------|----------|
| Ctrl+N | Create new task | Windows/Linux |
| Cmd+N | Create new task | macOS |
| Ctrl+P | Open project switcher | Windows/Linux |
| Cmd+P | Open project switcher | macOS |
| Ctrl+D | Mark task as done | Windows/Linux |
| Cmd+D | Mark task as done | macOS |
| Arrow Keys | Navigate between tasks | All |
| Shift+Right | Move task to next column | All |
| Shift+Left | Move task to previous column | All |
| Escape | Close dialogs, deselect task | All |
| ? | Show shortcuts help | All |

**Example Usage:**
- "Press Ctrl+N to open the task creation dialog"
- "Use Shift+Right Arrow to move a task to the next column"
- "Display keyboard shortcut help with the ? key"

---

### User Personas

**Definition:**  
Archetypal users representing different segments using the task board. Understanding personas helps design features and prioritize functionality.

**MVP Personas:**

#### Alex - The Solo Developer
- 5 years professional experience
- Manages 2-3 personal projects
- Uses daily (30-45 minutes)
- **Key Need:** Fast task entry, keyboard navigation, instant access
- **Preference:** Keyboard shortcuts, no friction

#### Jordan - The Freelancer
- 8 years experience, manages 3-5 projects
- Uses 2-3 times daily (10-15 minutes each)
- **Key Need:** Project organization, task sorting, offline capability
- **Preference:** Drag-and-drop, quick status overview

#### Sam - The Student Developer
- 2 years experience, manages 5-8 learning projects
- Uses 3-4 times per week (15-30 minutes)
- **Key Need:** Simple interface, free to use, no friction
- **Preference:** Low cognitive load, intuitive UI

**Example Usage:**
- "Alex needs keyboard shortcuts; drag & drop is secondary"
- "Jordan needs offline capability for client work"
- "Test the feature with all three personas in mind"

---

### Success Metrics

**Definition:**  
Measurable targets defining whether the MVP has achieved its goals. Metrics are tracked over time to evaluate product success.

**Key Success Metrics:**
- **500 DAU (Daily Active Users)** by Q4 2026
- **80% of task operations** completable via keyboard by Q3 2026
- **Page load <2 seconds** on 4G network
- **99.5% data reliability** (zero unintended data loss)
- **Task persists** immediately after creation

**Example Usage:**
- "We succeeded if we reach 500 DAU by end of 2026"
- "The metric shows we're failing if page load exceeds 2 seconds"
- "Track task persistence success rate"

---

## Term Index

Quick lookup by category:

**Data Entities:**
- Task
- Project

**UI/UX:**
- Kanban Board
- Column
- Project Selector
- Drag & Drop

**Architecture/Design:**
- Offline-First Architecture
- Data Persistence
- Keyboard-First Interface
- Keyboard Shortcuts

**Users & Success:**
- User Personas
- Task Status
- Success Metrics

---

## Terminology Style Guide

When writing about Task Board, use these terms consistently:

**✅ DO:**
- "Create a task" (not "add a task" or "make a task")
- "Switch projects" (not "navigate to project")
- "Drag the task to In Progress" (not "move the task" — be specific about method)
- "Mark as Done" (not "complete the task" — "Done" is the status name)
- "The column shows 5 tasks" (not "the board shows")
- "Keyboard-first interface" (not "keyboard-centric")
- "Offline-first app" (not "offline-only" — it works online too)

**❌ DON'T:**
- "Add a subtask" (not in MVP scope)
- "Assign to user" (no multi-user support)
- "Sync to cloud" (offline-first, no backend)
- "Prioritize tasks" (priority levels in Phase 2)
- "Archive projects" (delete only in MVP)
- "Push to server" (no server)

---

## Related Documentation

- **PRD:** [specs/prds/PRD-001-personal-taskboard-mvp.md](../../specs/prds/PRD-001-personal-taskboard-mvp.md)
- **Architecture:** [memory-banks/architecture/overview.md](../architecture/overview.md)
- **Coding Standards:** [memory-banks/conventions/coding-standards.md](../conventions/coding-standards.md)

---

**Last Updated:** May 10, 2026  
**Owner:** Development Team  
**Status:** Active  
**Next Review:** June 15, 2026 (Post-MVP Phase 1)
