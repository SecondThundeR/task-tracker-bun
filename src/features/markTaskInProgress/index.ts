import { INVALID_TASK_ID } from "../../constants";
import { TaskStatus } from "../../enums";
import { isTaskIdIncorrect, updateTaskInFile } from "../../utils";

/**
 * Marks task as "In progress" via CLI
 *
 * @description If task ID is incorrect, error will be logged out
 *
 * @param args CLI arguments with task ID
 */
export async function markTaskInProgress(args: string[]) {
  const [taskId] = args;

  if (isTaskIdIncorrect(taskId)) {
    console.error(INVALID_TASK_ID);
    return;
  }

  try {
    await updateTaskInFile({
      id: +taskId,
      status: TaskStatus.InProgress,
    });
    console.log(`Task marked as "In progress" successfully (ID: ${taskId})`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Failed to mark task as "In progress". Details: ${error.message}`
      );
    } else {
      console.error(
        `Failed to mark task as "In progress" due to unknown error: ${JSON.stringify(
          error,
          null,
          4
        )}`
      );
    }
  }
}
