import { TaskStatus } from "../enums";

export const AVAILABLE_STATUSES = [
  TaskStatus.Todo,
  TaskStatus.InProgress,
  TaskStatus.Done,
];
export const AVAILABLE_STATUSES_STRING = AVAILABLE_STATUSES.join(", ");
