import { FsWrapper, fsWrapper } from '../infra/FsWrapper.js';

type ListFoldersAndFilesDependencies = {
  fsWrapper: FsWrapper;
};

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

export const listFoldersAndFiles = new ListFoldersAndFiles({ fsWrapper });
