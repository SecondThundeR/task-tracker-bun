import { AVAILABLE_COMMANDS_LIST } from "../constants";
import { Commands } from "../enums";
import {
  addTask,
  deleteTask,
  listTasks,
  markTaskDone,
  markTaskInProgress,
  updateTask,
} from "../features";
import type { CLIData } from "../types";

const SLICE_START = 2;

/**
 * Extracting arguments from CLI starting from 3rd element, excluding
 * Bun's binary and entrypoint script paths
 *
 * @params argv Arguments from process.argv
 * @returns Object with script commands and its arguments
 */
export function extractDataFromCLI(argv: string[]): CLIData {
  const [command, ...args] = argv.slice(SLICE_START);
  return { command, args };
}

/**
 * Routes CLI command/args to related command handler
 *
 * @description If passed CLI command is empty or unknown, error will be logged
 * to the console
 *
 * @param cliData Data from CLI (command, args)
 */
export async function handleCLIData({ command, args }: CLIData) {
  if (!command) {
    console.error(
      `You haven't passed any command. Available commands: ${AVAILABLE_COMMANDS_LIST}`
    );
    return;
  }

  switch (command) {
    case Commands.Add:
      await addTask(args);
      break;
    case Commands.Update:
      await updateTask(args);
      break;
    case Commands.Delete:
      await deleteTask(args);
      break;
    case Commands.MarkInProgress:
      await markTaskInProgress(args);
      break;
    case Commands.MarkDone:
      await markTaskDone(args);
      break;
    case Commands.List:
      await listTasks(args);
      break;
    default:
      console.error("Unknown command! Please, try again");
      break;
  }
}
