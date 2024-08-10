import type { TaskStatus } from "../enums";

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
}

/**
 * Represents data for updating task
 */
export type UpdateTaskData = Pick<Task, "id"> &
  Partial<Pick<Task, "description" | "status">>;

/**
 * Represents JSON structure of tasks in file
 */
export interface TaskFile {
  lastId: number;
  tasks: Task[];
}
