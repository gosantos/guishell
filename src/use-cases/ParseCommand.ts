import { autoInjectable } from 'tsyringe';
import { ListFoldersAndFiles } from './ListFoldersAndFiles.js';

type CommandRunner = ListFoldersAndFiles;

@autoInjectable()
export class ParseCommand {
  constructor(private readonly listFoldersAndFiles: ListFoldersAndFiles) {}

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
