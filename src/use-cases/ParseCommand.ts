import { autoInjectable } from 'tsyringe';
import { ListFoldersAndFiles } from './ListFoldersAndFiles.js';

type CommandRunner = ListFoldersAndFiles;

@autoInjectable()
export class ParseCommand {
  constructor(private readonly listFoldersAndFiles: ListFoldersAndFiles) {}

  execute(command: string): CommandRunner {
    if ('ls' === command) {
      return this.listFoldersAndFiles;
    } else {
      throw new Error('Command not found');
    }
  }
}
