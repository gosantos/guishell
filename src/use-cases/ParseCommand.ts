import { autoInjectable } from 'tsyringe';
import { LSCommand } from './LSCommand.js';

type CommandRunner = LSCommand;

@autoInjectable()
export class ParseCommand {
  constructor(private readonly listFoldersAndFiles: LSCommand) {}

  execute(command: string): CommandRunner {
    const [commandName, ..._args] = command.split(' ');
    if ('ls' === commandName) {
      console.log({ commandName, _args });
      return this.listFoldersAndFiles;
    } else {
      throw new Error('Command not found');
    }
  }
}
