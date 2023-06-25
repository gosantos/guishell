import { autoInjectable } from 'tsyringe';
import { FsWrapper } from '../infra/FSInterface.js';

type ListFoldersAndFilesDependencies = {
  fsWrapper: FsWrapper;
};

@autoInjectable()
export class ListFoldersAndFiles {
  private readonly fsWrapper: FsWrapper;

  constructor(
    listFoldersAndFilesDependencies: ListFoldersAndFilesDependencies,
  ) {
    this.fsWrapper = listFoldersAndFilesDependencies.fsWrapper;
  }

  execute(path: string): string[] {
    return this.fsWrapper.readdirSync(path);
  }
}
