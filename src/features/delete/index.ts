import { INVALID_TASK_ID } from "../../constants";
import { deleteTaskFromFile, isTaskIdIncorrect } from "../../utils";

/**
 * Deletes task via CLI
 *
 * @description If task ID is incorrect, error will be logged out
 *
 * @param args CLI arguments with task ID
 */
export async function deleteTask(args: string[]) {
  const [taskId] = args;

  if (isTaskIdIncorrect(taskId)) {
    console.error(INVALID_TASK_ID);
    return;
  }

  try {
    await deleteTaskFromFile(+taskId);
    console.log(`Task deleted successfully (ID: ${taskId})`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to delete task. Details: ${error.message}`);
    } else {
      console.error(
        `Failed to delete task due to unknown error: ${JSON.stringify(
          error,
          null,
          4
        )}`
      );
    }
  }
}
