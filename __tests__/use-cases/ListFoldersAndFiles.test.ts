import { FsWrapper } from '../../src/infra/FSInterface.js';
import { ListFoldersAndFiles } from '../../src/use-cases/ListFoldersAndFiles.js';

describe('ListFoldersAndFiles', () => {
  let listFoldersAndFiles: ListFoldersAndFiles;
  const fsWrapper = jest.fn() as unknown as FsWrapper;

  beforeEach(async () => {
    jest.clearAllMocks();
    listFoldersAndFiles = new ListFoldersAndFiles({ fsWrapper });
  });
  test('should return a list of folders and files', () => {
    fsWrapper.readdirSync = jest.fn().mockReturnValue(['folder1', 'folder2']);
    expect(listFoldersAndFiles.execute('path')).toEqual(['folder1', 'folder2']);
  });

  test('should return an empty list when there are no files or folders', () => {
    fsWrapper.readdirSync = jest.fn().mockReturnValue([]);
    expect(listFoldersAndFiles.execute('path')).toEqual([]);
  });
});
