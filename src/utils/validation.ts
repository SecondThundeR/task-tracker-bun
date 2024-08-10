import { AVAILABLE_STATUSES } from "../constants";
import type { TaskStatus } from "../enums";

/**
 * Checks if passed task ID from CLI is incorrect
 *
 * @description Validator checks for 3 things:
 * - Is task ID undefined or null
 * - Is task ID NaN
 * - Is task ID less than 1
 *
 * @param taskId Task ID from CLI argument
 * @returns Result of validation
 */
export function isTaskIdIncorrect(taskId?: string) {
  return taskId == undefined || isNaN(+taskId) || +taskId < 1;
}

/**
 * Checks if passed task status from CLI is incorrect
 *
 * @param taskId Task status from CLI argument
 * @returns Result of validation
 */
export function isTaskStatusIncorrect(taskStatus: string) {
  return !AVAILABLE_STATUSES.includes(taskStatus as TaskStatus);
}
