import { NO_TASK_WITH_ID, TASKS_FILE_NAME } from "../constants";
import { TaskStatus } from "../enums";
import type { Task, TaskFile, UpdateTaskData } from "../types";

import { getJSONFromFile } from "./file";

const GET_JSON_FAIL_SAFE_OPTIONS = {
  throwError: false,
  defaultValue: { lastId: 0, tasks: [] },
};

/**
 * Get array of tasks from file
 *
 * @description If file not exist on the system, empty tasks array
 * will be returned
 *
 * When something happens while reading file contents, error message
 * will be logged and empty tasks array will be returned
 *
 * @returns Array of tasks
 */
export async function getTasksFromFile() {
  try {
    const tasksData = await getJSONFromFile<TaskFile>(TASKS_FILE_NAME);

    if (!tasksData) {
      return [];
    }

    return tasksData.tasks;
  } catch (error: unknown) {
    let errorMessage = "Failed to read file with tasks.";

    if (error instanceof SyntaxError) {
      errorMessage += ` Maybe it is corrupted. Here is error message: ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage += ` Something unknown happened. Here is error message: ${error.message}`;
    } else {
      errorMessage += ` Something unknown happened. Here is details: ${JSON.stringify(
        error,
        null,
        4
      )}`;
    }

    console.error(errorMessage);
    return [];
  }
}

/**
 * Adds new task to file
 *
 * @param description Task description
 * @returns New task data
 */
export async function addTaskToFile(description: Task["description"]) {
  const { lastId, tasks } = (await getJSONFromFile<TaskFile>(
    TASKS_FILE_NAME,
    GET_JSON_FAIL_SAFE_OPTIONS
  )) as TaskFile;

  const newId = lastId + 1;
  const createTimestamp = Date.now();
  const newTask: Task = {
    id: newId,
    description,
    status: TaskStatus.Todo,
    createdAt: createTimestamp,
    updatedAt: createTimestamp,
  };

  await Bun.write(
    TASKS_FILE_NAME,
    JSON.stringify({ lastId: newId, tasks: [...tasks, newTask] })
  );

  return newTask;
}

/**
 * Updates existing task in file
 *
 * @description If there is no task with provided ID, function will throw an
 * error
 *
 * Also, description and status are optional. That means, that user can provide
 * only description/status or both values at the same time
 *
 * @param taskData Task ID and new description/status
 * @returns Updated task data
 */
export async function updateTaskInFile({
  id,
  description,
  status,
}: UpdateTaskData) {
  const { lastId, tasks } = (await getJSONFromFile<TaskFile>(
    TASKS_FILE_NAME,
    GET_JSON_FAIL_SAFE_OPTIONS
  )) as TaskFile;

  const taskToUpdate = tasks.find((task) => task.id === id);
  if (!taskToUpdate) {
    throw new Error(`${NO_TASK_WITH_ID} ${id}`);
  }

  const updatedTask: Task = {
    ...taskToUpdate,
    description: description ?? taskToUpdate.description,
    status: status ?? taskToUpdate.status,
    updatedAt: Date.now(),
  };

  await Bun.write(
    TASKS_FILE_NAME,
    JSON.stringify({
      lastId,
      tasks: tasks.map((task) => (task.id === id ? updatedTask : task)),
    })
  );

  return updatedTask;
}

/**
 * Deletes existing task from file
 *
 * @description If there is no task with provided ID, function will throw an
 * error
 *
 * @param taskId ID of task to delete
 * @returns Deleted task data
 */
export async function deleteTaskFromFile(taskId: Task["id"]) {
  const { lastId, tasks } = (await getJSONFromFile<TaskFile>(
    TASKS_FILE_NAME,
    GET_JSON_FAIL_SAFE_OPTIONS
  )) as TaskFile;

  const taskToDelete = tasks.find((task) => task.id === taskId);
  if (!taskToDelete) {
    throw new Error(`${NO_TASK_WITH_ID} ${taskId}`);
  }

  await Bun.write(
    TASKS_FILE_NAME,
    JSON.stringify({
      lastId,
      tasks: tasks.filter((task) => task.id !== taskId),
    })
  );

  return taskToDelete;
}
