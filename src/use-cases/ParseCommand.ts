import { ListFoldersAndFiles } from './ListFoldersAndFiles.js';

type ParseCommandDependencies = {
  listFoldersAndFiles: ListFoldersAndFiles;
};


type CommandRunner = ListFoldersAndFiles

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
