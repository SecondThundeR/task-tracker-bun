import { INVALID_TASK_DESCRIPTION } from "../../constants";
import { addTaskToFile } from "../../utils";

/**
 * Adds task via CLI
 *
 * @description If task description is incorrect, error will be logged out
 *
 * @param args CLI arguments with task description
 */
export async function addTask(args: string[]) {
  const [taskDescription] = args;

  if (!taskDescription) {
    console.error(INVALID_TASK_DESCRIPTION);
    return;
  }

  const { id } = await addTaskToFile(taskDescription);
  console.log(`Task added successfully (ID: ${id})`);
}
