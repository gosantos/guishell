import { autoInjectable } from 'tsyringe';
import { ListFoldersAndFiles } from './ListFoldersAndFiles.js';

type ParseCommandDependencies = {
  listFoldersAndFiles: ListFoldersAndFiles;
};

type CommandRunner = ListFoldersAndFiles;

@autoInjectable()
export class ParseCommand {
  constructor(private readonly dependencies: ParseCommandDependencies) {}

  execute(command: string): CommandRunner {
    if ('ls' === command) {
      return this.dependencies.listFoldersAndFiles;
    } else {
      throw new Error('Command not found');
    }
  }
}
