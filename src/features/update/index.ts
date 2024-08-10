import { INVALID_TASK_DESCRIPTION, INVALID_TASK_ID } from "../../constants";
import { updateTaskInFile, isTaskIdIncorrect } from "../../utils";

/**
 * Updates task via CLI
 *
 * @description If task ID or task description is incorrect, error will be logged out
 *
 * @param args CLI arguments with task ID and task description
 */
export async function updateTask(args: string[]) {
  const [taskId, taskDescription] = args;

  if (isTaskIdIncorrect(taskId)) {
    console.error(INVALID_TASK_ID);
    return;
  }

  if (!taskDescription) {
    console.error(INVALID_TASK_DESCRIPTION);
    return;
  }

  try {
    await updateTaskInFile({ id: +taskId, description: taskDescription });
    console.log(`Task updated successfully (ID: ${taskId})`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to update task. Details: ${error.message}`);
    } else {
      console.error(
        `Failed to update task due to unknown error: ${JSON.stringify(
          error,
          null,
          4
        )}`
      );
    }
  }
}
