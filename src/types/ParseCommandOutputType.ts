import { CatCommand } from '../use-cases/CatCommand';
import { ExitCommand } from '../use-cases/ExitCommand';
import { LSCommand } from '../use-cases/LSCommand';
import { PWDCommand } from '../use-cases/PWDCommand';
import { HistoryCommand } from '../use-cases/HistoryCommand';
import { NoOpCommand } from '../use-cases/NoOpCommand';

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
