import { ExitCommand } from '../use-cases/ExitCommand.js';
import { LSCommand } from '../use-cases/LSCommand.js';

export type ParseCommandOutputType = {
  runner: LSCommand | ExitCommand;
  args: string;
};
