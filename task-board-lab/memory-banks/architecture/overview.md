# Architecture Overview — Task Board Lab

**Project:** Personal Task Board (MVP)  
**Version:** 1.0  
**Last Updated:** May 10, 2026  
**Owner:** Development Team  

---

## Purpose

This document describes the system architecture, technology stack, and deployment strategy for the Personal Task Board project. It serves as a reference for architectural decisions, trade-offs, and implementation guidance.

---

## 1. System Architecture

### 1.1 Architecture Pattern

**Pattern: Client-Only Single Page Application (SPA)**

**Rationale:**
- **Zero Backend Overhead:** Targets solo developers and students who need instant setup without server infrastructure
- **Offline-First Design:** Core feature requirement—users work without internet connectivity
- **Reduced Complexity:** Eliminates backend development, DevOps, and deployment overhead within bootcamp timeline
- **Data Ownership:** Users own their data locally, addressing privacy concerns without compliance overhead
- **Scalability:** Unlimited user capacity without server costs (each user runs their own instance)

**Trade-offs:**
- ❌ No real-time collaboration in MVP (Phase 2 may add via peer sync or backend)
- ❌ No cross-device sync (data stays on one device; export/import for backup)
- ✅ No authentication overhead
- ✅ No database operations
- ✅ Works offline immediately

### 1.2 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser Environment                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React SPA (Single Page App)                │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         Presentation Layer (UI Components)       │ │ │
│  │  │  • Kanban Board View                             │ │ │
│  │  │  • Task Cards                                    │ │ │
│  │  │  • Project Selector                              │ │ │
│  │  │  • Dialogs & Modals                              │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                        ↓                                │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │        State Management Layer (React Hooks)      │ │ │
│  │  │  • Task Store (Context API)                      │ │ │
│  │  │  • Project Store (Context API)                   │ │ │
│  │  │  • UI State (Local Component State)              │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                        ↓                                │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │      Business Logic Layer (Hooks & Utils)        │ │ │
│  │  │  • Task Operations (CRUD)                        │ │ │
│  │  │  • Project Management                            │ │ │
│  │  │  • Status Transitions                            │ │ │
│  │  │  • Data Validation                               │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                        ↓                                │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │       Data Persistence Layer (localStorage)      │ │ │
│  │  │  • Projects Collection                           │ │ │
│  │  │  • Tasks Collection                              │ │ │
│  │  │  • App State Snapshots                           │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                        ↓                                │ │
│  │         Browser localStorage API (5-10MB)            │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Core Components

#### Component 1: Presentation Layer
**Responsibility:** Render UI and capture user interactions

**Key Components:**
- `KanbanBoard` — Main board view with three columns (To Do, In Progress, Done)
- `TaskCard` — Draggable task card component
- `ProjectSelector` — Project dropdown and switcher
- `TaskCreationModal` — Quick task entry dialog
- `KeyboardShortcutsOverlay` — Help overlay with shortcut reference
- `StorageWarning` — Alert when localStorage approaching quota

**Design Pattern:** Functional components with React hooks, composition-based architecture

#### Component 2: State Management Layer
**Responsibility:** Maintain application state and provide access to all components

**Architecture:**
- **Context API:** Two main contexts
  - `ProjectContext` — Current project, project list, project operations
  - `TaskContext` — All tasks, task operations, filtering by project
- **Custom Hooks:** 
  - `useProjects()` — Project CRUD operations
  - `useTasks()` — Task CRUD and status operations
  - `useLocalStorage()` — Direct localStorage access with debouncing

**Data Flow:** Components → Hooks → Context → localStorage

**Rationale:** Context API sufficient for MVP (no complex state trees); hooks provide cleaner API than Redux

#### Component 3: Business Logic Layer
**Responsibility:** Implement core features (CRUD, validation, status transitions)

**Key Functions:**
- `createTask(title, projectId)` → Task
- `updateTaskStatus(taskId, newStatus)` → void
- `deleteTask(taskId)` → void
- `createProject(name)` → Project
- `deleteProject(projectId)` → void
- `selectProject(projectId)` → void
- `validateTask(task)` → ValidationResult
- `exportData()` → JSON
- `importData(json)` → void

**Implementation:** Pure functions in utility modules, no side effects

#### Component 4: Data Persistence Layer
**Responsibility:** Serialize/deserialize app state to/from localStorage

**Operations:**
- `saveState(appState)` — Debounced write to localStorage (500ms)
- `loadState()` → AppState — Load from localStorage on app init
- `clearState()` — Wipe localStorage
- `getStorageUsage()` → { used: KB, available: KB } — Monitor quota
- `exportJSON()` → string — User-downloadable backup
- `importJSON(string)` → AppState — Load from uploaded file

**Data Format:**
```typescript
interface AppState {
  projects: Project[];        // Array of all projects
  tasks: Task[];              // Array of all tasks
  currentProjectId: string;   // Currently selected project
  lastUpdated: number;        // Timestamp of last change
  version: string;            // Schema version for migrations
}

interface Project {
  id: string;                 // UUID v4
  name: string;               // User-provided name
  createdAt: number;          // Timestamp
  updatedAt: number;          // Timestamp
}

interface Task {
  id: string;                 // UUID v4
  projectId: string;          // Foreign key to Project
  title: string;              // Task description
  status: TaskStatus;         // "todo" | "in_progress" | "done"
  createdAt: number;          // Timestamp
  completedAt?: number;       // Timestamp when marked done
  order: number;              // Sort order within column
}
```

**Storage Allocation:**
- Target: <2MB for 100 typical tasks across 3 projects
- Warning at 8MB (80% of 10MB quota)
- Error at 9.5MB with user options to export or delete old data

---

## 2. Technology Stack

### 2.1 Frontend Framework & Build

| Layer | Technology | Version | Purpose | Rationale |
|-------|-----------|---------|---------|-----------|
| **UI Framework** | React | 18 | Component-based UI rendering | Modern, Hooks-first, excellent TypeScript support |
| **Build Tool** | Vite | 4.x | Development and production bundling | 10x faster than Webpack, optimized for ES modules, <1s HMR |
| **Language** | TypeScript | 4.9+ | Type-safe JavaScript | Catches errors early, better IDE support, cleaner refactoring |
| **Package Manager** | npm or yarn | Latest | Dependency management | npm ships with Node.js, yarn for deterministic lockfiles |
| **Runtime** | Node.js | 18+ | Development environment | LTS version, solid ES module support |

### 2.2 State Management

| Component | Technology | Purpose | Rationale |
|-----------|-----------|---------|-----------|
| **State Container** | React Context API | Global app state | Lightweight for MVP, avoids Redux complexity |
| **State Hooks** | Custom React Hooks | Business logic | Encapsulates state logic, reusable across components |
| **Performance** | React.memo, useMemo | Prevent unnecessary renders | Optimize re-renders, especially for Kanban board |

**Data Flow:**
- Components dispatch actions via custom hooks
- Hooks update Context state
- Context subscribers re-render
- State changes trigger localStorage persistence (debounced)

### 2.3 Styling & UI

| Component | Technology | Purpose | Rationale |
|-----------|-----------|---------|-----------|
| **CSS Framework** | Tailwind CSS (TBD) or vanilla CSS | Styling | Tailwind: rapid development; Vanilla: zero dependencies |
| **Styling Approach** | CSS Modules or CSS-in-JS | Component scoping | Avoid naming conflicts, easier maintenance |
| **Icons** | SVG inline or Heroicons | UI icons | Lightweight, customizable, no external requests |
| **Drag & Drop** | HTML5 Drag & Drop API | Task movement | Native browser API, no library overhead |

**Accessibility:** WCAG 2.1 Level AA compliance
- Keyboard navigation with arrow keys
- Focus management in modals
- Color contrast ≥4.5:1
- ARIA labels on interactive elements

### 2.4 Data Persistence

| Component | Technology | Purpose | Rationale |
|-----------|-----------|---------|-----------|
| **Primary Storage** | localStorage API | Persistent task data | Browser-native, 5-10MB quota, synchronous access |
| **Export Format** | JSON | User backups & migration | Human-readable, portable, easy to parse |
| **Data Structure** | TypeScript interfaces | Type safety | Compile-time validation of data shape |

**Storage Strategy:**
- **Write Pattern:** Debounced (500ms) to avoid excessive I/O
- **Read Pattern:** Load on app initialization
- **Sync:** One-way (app → storage), no cross-tab sync in MVP
- **Backup:** Manual export (downloadable JSON), recommend weekly

### 2.5 Developer Tools

| Tool | Purpose | Configuration |
|------|---------|-----------------|
| **ESLint** | Code quality linting | TypeScript-aware, strict rules |
| **Prettier** | Code formatting | Single line width: 80-100 chars |
| **TypeScript** | Type checking | `strict: true`, `skipLibCheck: true` |
| **Vite Config** | Build configuration | Optimized chunks, source maps for development |

---

## 3. Deployment

### 3.1 Deployment Strategy

**Model: Static Site Hosting**

**Target Platforms:**
1. **Primary:** GitHub Pages (free, integrated with repo)
2. **Alternatives:** Vercel, Netlify (both offer free tiers)

**Rationale:**
- No backend infrastructure needed (client-only)
- Zero cost for MVP (important for volunteer bootcamp effort)
- Simple CI/CD (push to main → auto-deploy)
- Global CDN distribution (GitHub Pages backed by Fastly)
- HTTPS by default

### 3.2 Deployment Pipeline

```
Developer Push to main
        ↓
GitHub Actions Workflow Triggers
        ↓
┌─────────────────────────────┐
│  1. Build Stage             │
│  - npm install              │
│  - npm run build (Vite)     │
│  - Compile TypeScript       │
│  - Output: dist/ folder     │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│  2. Test Stage (Optional)   │
│  - npm run lint             │
│  - npm run type-check       │
│  - Unit tests (if added)    │
└─────────────────────────────┘
        ↓
┌─────────────────────────────┐
│  3. Deploy Stage            │
│  - Copy dist/ to gh-pages   │
│  - Commit to gh-pages branch│
│  - GitHub Pages rebuilds    │
└─────────────────────────────┘
        ↓
Live at: https://[org].github.io/task-board-lab/
```

**GitHub Actions Workflow:**
```yaml
name: Build & Deploy
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3.3 Environments

| Environment | Purpose | Branch | Deployment | URL |
|-------------|---------|--------|------------|-----|
| **Development** | Local machine | feature/* | None (local only) | http://localhost:5173 |
| **Staging** | Pre-release testing | develop (optional) | Manual or auto | TBD |
| **Production** | Live users | main | Automatic on push | https://[org].github.io/task-board-lab/ |

**MVP Approach:** Push directly to main (no staging); use feature branches for development

### 3.4 Deployment Checklist

Before deploying to production:

- [ ] All tests passing (`npm run lint`, `npm run build`)
- [ ] No console errors in development build
- [ ] Keyboard shortcuts tested in latest browsers (Chrome, Firefox, Safari, Edge)
- [ ] localStorage persistence verified
- [ ] Performance benchmarks met (<2s load time, <300ms interactions)
- [ ] Accessibility check (keyboard nav, color contrast)
- [ ] Data export/import functions tested
- [ ] Cross-browser testing (desktop viewports)
- [ ] Mobile responsive design verified
- [ ] GitHub Pages configuration correct (base URL, CNAME if applicable)

### 3.5 Performance Optimization

**Build Optimization:**
- Code splitting: Separate vendor and app code
- Tree-shaking: Remove unused code
- Minification: Gzip compression for faster transfer
- Asset optimization: Inline small SVGs, optimize images

**Runtime Optimization:**
- Lazy component loading: React.lazy() for large features (Phase 2)
- Memoization: React.memo for stable components
- Debounced localStorage writes (500ms batch window)
- Virtual scrolling for large task lists (Phase 2, if needed)

**Target Metrics:**
- **Page Load:** <2 seconds on 4G (Lighthouse: ≥80)
- **Time to Interactive:** <1.5 seconds
- **First Contentful Paint:** <800ms
- **Largest Contentful Paint:** <1.5 seconds
- **Cumulative Layout Shift:** <0.1

### 3.6 Monitoring & Observability

**Monitoring Approach:** Lightweight client-side telemetry (privacy-first)

**Metrics Collected (Optional, Opt-In):**
- Page load time (Performance API)
- Task creation rate (anonymous, no user ID)
- Error count and type
- Browser and OS information

**Data Storage:** No external tracking; all client-side or exported by users

**Observability Tools:**
- Browser DevTools (React Profiler, Lighthouse)
- Error boundaries (custom error logging)
- localStorage inspection (for debugging user issues)

**No External Dependencies:** Avoid Google Analytics, Sentry, or similar for MVP (privacy concern)

---

## 4. Key Architectural Decisions

### Decision 1: No Backend Server

**Decision:** Client-only SPA with localStorage persistence

**Rationale:**
- Eliminates need for backend development, testing, deployment
- Supports offline-first requirement
- Zero infrastructure costs
- Data ownership stays with users
- Fits bootcamp timeline and resource constraints

**Trade-offs:**
- ❌ No real-time sync across devices or users (MVP acceptable)
- ❌ No server-side validation (client-side sufficient for MVP)
- ✅ Unlimited horizontal scalability (each client is independent)
- ✅ No authentication/authorization complexity
- ✅ Instant app launch without network requests

**Future Path:** Phase 2 could add optional backend for sync (Firebase, Supabase) or peer-to-peer sync

---

### Decision 2: Context API over Redux/Zustand

**Decision:** React Context API + custom hooks for state management

**Rationale:**
- Built-in to React, zero additional dependencies
- Sufficient complexity for MVP (simple tasks + projects)
- Hooks-based API aligns with modern React patterns
- Easier to understand for learners during bootcamp

**Trade-offs:**
- ❌ Performance overhead for large state trees (not an issue for MVP scope)
- ❌ Prop drilling workaround needed (mitigated by hooks)
- ✅ Minimal bundle size overhead
- ✅ No learning curve for Redux/Zustaind
- ✅ Easy to refactor if needed later

**Upgrade Path:** Can move to Zustand/Redux if state complexity increases in Phase 2

---

### Decision 3: Vite + TypeScript

**Decision:** Vite build tool with TypeScript for type safety

**Rationale:**
- **Vite:** 10x faster builds than Webpack, <1s HMR, optimized for modern apps
- **TypeScript:** Catches errors at compile time, better IDE support, safer refactoring
- Both are industry-standard, well-documented, large community

**Trade-offs:**
- ✅ Slightly steeper learning curve than JavaScript
- ✅ Build step required (mitigated by Vite's speed)
- ✅ Bundle size slightly larger (offset by tree-shaking, <50KB impact)
- ✅ Robust type system prevents runtime errors

---

### Decision 4: HTML5 Drag & Drop API

**Decision:** Native browser drag & drop instead of library (react-beautiful-dnd, react-dnd)

**Rationale:**
- Zero dependencies, native browser API
- Sufficient for MVP (simple Kanban columns)
- No additional bundle size
- Works offline without external requests

**Trade-offs:**
- ❌ Less polished UX than libraries (no animations between columns)
- ❌ Cross-browser quirks require testing
- ✅ Significantly smaller bundle
- ✅ No library dependency management
- ✅ Easy to upgrade to library later if needed

**Fallback:** Add react-beautiful-dnd in Phase 2 if UX feedback demands it

---

### Decision 5: GitHub Pages Deployment

**Decision:** Deploy to GitHub Pages for hosting

**Rationale:**
- Free tier sufficient for MVP
- Integrated with GitHub repository (source of truth)
- Automatic CI/CD via GitHub Actions
- No credit card or DevOps infrastructure needed
- HTTPS by default

**Trade-offs:**
- ❌ Domain name tied to GitHub username (can use custom domain later)
- ❌ No dynamic backend possible (acceptable for MVP)
- ✅ Zero cost
- ✅ Simple one-command deployment
- ✅ Reliable global CDN (Fastly)

**Alternative Paths:** Vercel/Netlify both support identical workflow with more customization

---

## 5. Technology Decisions Rationale Table

| Decision | Choice | Why This | Why Not Alternatives |
|----------|--------|---------|----------------------|
| Framework | React 18 | Industry standard, hooks-first, excellent TypeScript support | Vue (smaller community), Svelte (less job market) |
| Build Tool | Vite | 10x faster HMR, optimized ES module bundling, minimal config | Webpack (too complex), esbuild (no dev server) |
| Language | TypeScript | Type safety, better IDE support, catches errors early | JavaScript (fewer safeguards), Elm (learning curve) |
| State Mgmt | Context API | Built-in, sufficient for MVP, no extra deps | Redux (overkill), Mobx (complexity) |
| Styling | CSS/Tailwind | Rapid development, utility-first, large community | Styled-components (JS overhead), SASS (compilation step) |
| Persistence | localStorage | Browser-native, synchronous, 5-10MB quota | IndexedDB (more complex), cookies (size limited) |
| Deployment | GitHub Pages | Free, automatic CI/CD, simple setup | AWS (cost, complexity), Heroku (cost) |

---

## 6. Architecture Constraints & Limitations

### Constraints

1. **Storage Limit:** 5-10MB localStorage quota (typical browser)
   - Mitigation: Monitor usage, warn at 80%, offer export/purge options

2. **Single Browser/Device:** No cross-device sync in MVP
   - Mitigation: Manual export/import for backup, Phase 2 for sync

3. **No Real-Time Collaboration:** Can't share board with other users
   - Mitigation: Phase 2 feature with backend/WebSocket support

4. **No Offline Sync:** Changes made while offline don't merge with server
   - Acceptable for MVP (single-device assumption)

5. **No Server-Side Validation:** All validation client-side
   - Acceptable since no untrusted data source

### Performance Limits

| Metric | Limit | Mitigation |
|--------|-------|-----------|
| Tasks per project | ~100 before slowdown | Virtual scrolling in Phase 2 |
| Total projects | ~10-20 before UI lag | Pagination in Phase 2 |
| Page load time | Target: <2 seconds | Code splitting, lazy loading |
| Drag & drop latency | Target: <500ms | Debounced rendering |
| localStorage writes | Debounced 500ms | Batch writes, reduce churn |

---

## 7. Future Extensibility

### Phase 2 Enhancements (Post-MVP)

- **Real-Time Sync:** Add Firebase or Supabase for cross-device sync
- **Subtasks:** Nested task support with collapsible display
- **Filtering & Search:** Search tasks by title, filter by project/tag
- **Task Priority:** Add priority levels (low, medium, high)
- **Recurring Tasks:** Template tasks with recurrence rules
- **Time Tracking:** Track time spent on tasks, generate reports

### Phase 3+ Features

- **Collaboration:** Share boards with team members
- **Notifications:** Email/push reminders for tasks
- **Integrations:** GitHub, Slack, Calendar webhooks
- **Mobile App:** Native iOS/Android apps
- **Offline Sync:** Service Workers for offline data sync

### Architectural Extensibility

- **Plugin System:** Custom task types or columns via plugins
- **API Layer:** GraphQL API for external integrations
- **Data Export:** Support multiple formats (CSV, Trello, Asana)

---

## 8. Glossary

- **SPA:** Single Page Application — app loads once, no full page refreshes
- **Vite:** Frontend build tool, optimized for speed and ES modules
- **Context API:** React feature for global state without prop drilling
- **localStorage:** Browser API for persistent key-value storage (5-10MB)
- **Drag & Drop API:** Native browser API for mouse drag interactions
- **GitHub Pages:** Free static site hosting by GitHub
- **Kanban:** Visual workflow management with columns for status stages
- **TypeScript:** Superset of JavaScript with optional static typing

---

## 9. References & Resources

- [React 18 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MDN localStorage Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [HTML Drag & Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [GitHub Pages Documentation](https://pages.github.com)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Project PRD](../prds/PRD-001-personal-taskboard-mvp.md)

---

**Last Updated:** May 10, 2026  
**Next Review:** Post-MVP Phase 1 (June 15, 2026)  
**Owner:** Development Team  
**Status:** Active (MVP Development)
