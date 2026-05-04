import { useEffect, useMemo, useState, type DragEvent } from 'react';

type TaskStatus = 'todo' | 'inprogress' | 'done';

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const storageKey = 'kanban-board-tasks';

const defaultTasks: Task[] = [
  { id: 'task-1', title: 'Learn Kanban drag/drop', status: 'todo' },
  { id: 'task-2', title: 'Build localStorage persistence', status: 'inprogress' },
  { id: 'task-3', title: 'Finish the board UI', status: 'done' }
];

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return defaultTasks;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultTasks;
    const parsed = JSON.parse(raw) as Task[];
    if (!Array.isArray(parsed)) return defaultTasks;
    return parsed;
  } catch {
    return defaultTasks;
  }
};

const saveTasks = (tasks: Task[]) => {
  window.localStorage.setItem(storageKey, JSON.stringify(tasks));
};

const createTask = (title: string, status: TaskStatus = 'todo'): Task => ({
  id: `task-${Date.now()}`,
  title,
  status
});

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const groupedTasks = useMemo(
    () =>
      columns.reduce<Record<TaskStatus, Task[]>>((acc, column) => {
        acc[column.id] = tasks.filter((task) => task.status === column.id);
        return acc;
      }, { todo: [], inprogress: [], done: [] }),
    [tasks]
  );

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (status: TaskStatus = 'todo') => {
    const title = window.prompt('New task title');
    if (title && title.trim()) {
      setTasks((current) => [...current, createTask(title.trim(), status)]);
    }
  };

  const handleEditTask = (task: Task) => {
    const title = window.prompt('Edit task title', task.title);
    if (title && title.trim()) {
      setTasks((current) =>
        current.map((item) =>
          item.id === task.id ? { ...item, title: title.trim() } : item
        )
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Delete this task?')) {
      setTasks((current) => current.filter((item) => item.id !== taskId));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'n') return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const active = document.activeElement;
      if (active && ['input', 'textarea', 'select'].includes(active.tagName.toLowerCase())) {
        return;
      }
      event.preventDefault();
      handleAddTask();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDrop = (event: DragEvent<HTMLDivElement>, status: TaskStatus) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    if (!taskId) return;
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const startDrag = (event: DragEvent<HTMLDivElement>, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>React Kanban Board</h1>
          <p>Press <strong>n</strong> to add a new task. Drag tasks between columns and use Edit/Delete buttons.</p>
        </div>
        <button type="button" onClick={() => handleAddTask()}>
          + Add task
        </button>
      </header>

      <main className="board-grid">
        {columns.map((column) => (
          <section
            key={column.id}
            className="board-column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, column.id)}
          >
            <div className="column-header">
              <h2>{column.title}</h2>
              <span>{groupedTasks[column.id].length}</span>
            </div>
            <div className="column-body">
              <div className="column-actions">
                <button type="button" className="small-button" onClick={() => handleAddTask(column.id)}>
                  + Add task
                </button>
              </div>
              {groupedTasks[column.id].map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(event) => startDrag(event, task.id)}
                >
                  <div className="task-top">
                    <div className="task-title">{task.title}</div>
                    <div className="task-actions">
                      <button type="button" onClick={() => handleEditTask(task)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {groupedTasks[column.id].length === 0 && (
                <div className="empty-state">Drop tasks here</div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
