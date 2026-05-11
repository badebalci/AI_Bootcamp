export const PROJECT_NAME_MAX_LENGTH = 255;

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateProjectInput {
  name: string;
}

export interface UpdateProjectInput {
  name?: string;
}

export type ProjectId = Project["id"];
