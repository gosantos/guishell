import { CatCommand } from '../use-cases/CatCommand.js';
import { ExitCommand } from '../use-cases/ExitCommand.js';
import { LSCommand } from '../use-cases/LSCommand.js';
import { PWDCommand } from '../use-cases/PWDCommand.js';
import { HistoryCommand } from '../use-cases/HistoryCommand.js';
import { NoOpCommand } from '../use-cases/NoOpCommand.js';

type Runner =
  | LSCommand
  | ExitCommand
  | CatCommand
  | PWDCommand
  | HistoryCommand
  | NoOpCommand;

export type ParseCommandOutputType = {
  runner: Runner;
  args: string;
};
