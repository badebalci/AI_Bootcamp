import {
  CreateProjectInput,
  PROJECT_NAME_MAX_LENGTH,
  Project,
  ProjectId,
  UpdateProjectInput,
} from "../models/project";

const PROJECTS_STORAGE_KEY = "task-board.projects";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export class ProjectValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectValidationError";
  }
}

export class ProjectStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectStorageError";
  }
}

export class ProjectNotFoundError extends Error {
  constructor(projectId: string) {
    super(`Project not found: ${projectId}`);
    this.name = "ProjectNotFoundError";
  }
}

function normalizeProjectName(name: string): string {
  return name.trim();
}

function validateProjectName(name: string): void {
  if (!name) {
    throw new ProjectValidationError("Project name required");
  }

  if (name.length > PROJECT_NAME_MAX_LENGTH) {
    throw new ProjectValidationError(
      `Project name must be ${PROJECT_NAME_MAX_LENGTH} characters or fewer`
    );
  }
}

function nowIsoString(): string {
  return new Date().toISOString();
}

function createProjectId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isQuotaExceededError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const errorAsDom = error as DOMException;
  return (
    errorAsDom.name === "QuotaExceededError" ||
    errorAsDom.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
    errorAsDom.code === 22 ||
    errorAsDom.code === 1014
  );
}

function parseProjects(raw: string | null): Project[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Project =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "name" in item &&
        "createdAt" in item &&
        "updatedAt" in item
    );
  } catch {
    return [];
  }
}

export class ProjectRepository {
  private readonly storage: StorageLike;
  private readonly storageKey: string;

  constructor(storage: StorageLike = localStorage, storageKey = PROJECTS_STORAGE_KEY) {
    this.storage = storage;
    this.storageKey = storageKey;
  }

  list(): Project[] {
    return this.readAll();
  }

  getById(projectId: ProjectId): Project | null {
    return this.readAll().find((project) => project.id === projectId) ?? null;
  }

  create(input: CreateProjectInput): Project {
    const name = normalizeProjectName(input.name);
    validateProjectName(name);

    const timestamp = nowIsoString();
    const newProject: Project = {
      id: createProjectId(),
      name,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const projects = this.readAll();
    projects.push(newProject);
    this.writeAll(projects);

    return newProject;
  }

  update(projectId: ProjectId, input: UpdateProjectInput): Project {
    const projects = this.readAll();
    const index = projects.findIndex((project) => project.id === projectId);

    if (index === -1) {
      throw new ProjectNotFoundError(projectId);
    }

    const currentProject = projects[index];
    let nextName = currentProject.name;

    if (typeof input.name === "string") {
      nextName = normalizeProjectName(input.name);
      validateProjectName(nextName);
    }

    const updated: Project = {
      ...currentProject,
      name: nextName,
      updatedAt: nowIsoString(),
    };

    projects[index] = updated;
    this.writeAll(projects);

    return updated;
  }

  delete(projectId: ProjectId): void {
    const projects = this.readAll();
    const nextProjects = projects.filter((project) => project.id !== projectId);

    if (nextProjects.length === projects.length) {
      throw new ProjectNotFoundError(projectId);
    }

    this.writeAll(nextProjects);
  }

  private readAll(): Project[] {
    return parseProjects(this.storage.getItem(this.storageKey));
  }

  private writeAll(projects: Project[]): void {
    try {
      this.storage.setItem(this.storageKey, JSON.stringify(projects));
    } catch (error) {
      if (isQuotaExceededError(error)) {
        throw new ProjectStorageError(
          "Storage full, please delete old projects or export data"
        );
      }

      throw new ProjectStorageError("Failed to persist project data");
    }
  }
}

export { PROJECTS_STORAGE_KEY };
