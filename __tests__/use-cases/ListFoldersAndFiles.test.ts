import { FSInterface } from '../../src/infra/FSInterface.js';
import { LSCommand } from '../../src/use-cases/LSCommand.js';
import * as fs from 'fs';

describe('ListFoldersAndFiles', () => {
  let listFoldersAndFiles: LSCommand;
  const fsInterface = jest.fn() as unknown as FSInterface;

  beforeEach(async () => {
    jest.clearAllMocks();
    listFoldersAndFiles = new LSCommand(fsInterface);
  });
  test('should return a list of folders and files', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue(['folder1', 'folder2']);
    expect(listFoldersAndFiles.execute('path')).toEqual(['folder1', 'folder2']);
  });

  test('should return an empty list when there are no files or folders', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue([]);
    expect(listFoldersAndFiles.execute('path')).toEqual([]);
  });

  test('should return an empty list when there is no path', () => {
    const res = fs.readdirSync('./');

    console.log({ res });
  });
});
