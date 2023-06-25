import { FSInterface } from '../../src/infra/FSInterface.js';
import { ListFoldersAndFiles } from '../../src/use-cases/ListFoldersAndFiles.js';

describe('ListFoldersAndFiles', () => {
  let listFoldersAndFiles: ListFoldersAndFiles;
  const fsInterface = jest.fn() as unknown as FSInterface;

  beforeEach(async () => {
    jest.clearAllMocks();
    listFoldersAndFiles = new ListFoldersAndFiles(fsInterface);
  });
  test('should return a list of folders and files', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue(['folder1', 'folder2']);
    expect(listFoldersAndFiles.execute('path')).toEqual(['folder1', 'folder2']);
  });

  test('should return an empty list when there are no files or folders', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue([]);
    expect(listFoldersAndFiles.execute('path')).toEqual([]);
  });
});
