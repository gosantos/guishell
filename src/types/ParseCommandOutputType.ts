import { ExitCommand } from '../use-cases/ExitCommand.js';
import { LSCommand } from '../use-cases/LSCommand.js';

type LSCommandOutputType = {
  runner: LSCommand;
  args: string;
};

type ExitCommandOutputType = {
  runner: ExitCommand;
  args: string;
};

export type ParseCommandOutputType =
  | LSCommandOutputType
  | ExitCommandOutputType;
