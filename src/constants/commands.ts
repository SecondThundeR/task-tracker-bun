import { Commands } from "../enums";

export const AVAILABLE_COMMANDS = [
  Commands.Add,
  Commands.Update,
  Commands.Delete,
  Commands.MarkInProgress,
  Commands.MarkDone,
  Commands.List,
];
export const AVAILABLE_COMMANDS_LIST = AVAILABLE_COMMANDS.join(", ");
