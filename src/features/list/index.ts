import { AVAILABLE_STATUSES_STRING } from "../../constants";
import { TaskStatus } from "../../enums";
import type { Task } from "../../types";
import { getTasksFromFile, isTaskStatusIncorrect } from "../../utils";

/**
 * Prints tasks data to console
 *
 * @description When called without arguments, lists all available tasks.
 * Otherwise, filters by task status
 *
 * @param args List tasks arguments
 */
export async function listTasks(args: string[]) {
  const [taskStatus] = args;
  const tasks = await getTasksFromFile();

  if (!taskStatus) {
    logListOfTasks(tasks);
    return;
  }

  if (isTaskStatusIncorrect(taskStatus)) {
    console.error(
      `You have provided incorrect task status. Available statuses: ${AVAILABLE_STATUSES_STRING}`
    );
    return;
  }

  const filteredTasks = tasks.filter((task) => task.status === taskStatus);
  logListOfTasks(filteredTasks);
}

/**
 * Logs out array of tasks tasks
 *
 * @description If there are no tasks in array, returns stub text
 *
 * @param tasks Array of tasks
 */
function logListOfTasks(tasks: Task[]) {
  if (tasks.length === 0) {
    console.log("There are no available tasks");
    return;
  }

  tasks.forEach(({ id, description, status, createdAt, updatedAt }) => {
    const taskStatusEmoji = getTaskStatusEmoji(status);
    const createdAtString = new Date(createdAt).toLocaleString();
    const updatedAtString = new Date(updatedAt).toLocaleString();
    const taskUpdatedString =
      createdAt !== updatedAt ? ` (Updated at ${updatedAtString})` : "";

    console.log(`${taskStatusEmoji} ${id}. ${description}`);
    console.log(`Created at ${createdAtString}.${taskUpdatedString}`);
  });
}

/**
 * Converts status of task to emoji variant
 *
 * @param taskStatus Status of task
 * @returns Emoji of status
 */
function getTaskStatusEmoji(taskStatus: Task["status"]) {
  switch (taskStatus) {
    case TaskStatus.Todo:
      return "🎯";
    case TaskStatus.InProgress:
      return "⌛";
    case TaskStatus.Done:
      return "✅";
  }
}
