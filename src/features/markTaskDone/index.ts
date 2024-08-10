import { INVALID_TASK_ID } from "../../constants";
import { TaskStatus } from "../../enums";
import { isTaskIdIncorrect, updateTaskInFile } from "../../utils";

/**
 * Marks task as "Done" via CLI
 *
 * @description If task ID is incorrect, error will be logged out
 *
 * @param args CLI arguments with task ID
 */
export async function markTaskDone(args: string[]) {
  const [taskId] = args;

  if (isTaskIdIncorrect(taskId)) {
    console.error(INVALID_TASK_ID);
    return;
  }

  try {
    await updateTaskInFile({
      id: +taskId,
      status: TaskStatus.Done,
    });
    console.log(`Task marked as "Done" successfully (ID: ${taskId})`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to mark task as "Done". Details: ${error.message}`);
    } else {
      console.error(
        `Failed to mark task as "Done" due to unknown error: ${JSON.stringify(
          error,
          null,
          4
        )}`
      );
    }
  }
}
