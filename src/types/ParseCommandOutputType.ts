import { LSCommand } from '../use-cases/LSCommand.js';

type LSCommandOutputType = {
  runner: LSCommand;
  args: string;
};

export type ParseCommandOutputType = LSCommandOutputType;
