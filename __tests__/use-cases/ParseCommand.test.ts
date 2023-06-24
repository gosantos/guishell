import { FsWrapper } from '../../src/infra/FsWrapper.js';
import { ListFoldersAndFiles } from '../../src/use-cases/ListFoldersAndFiles.js';
import { ParseCommand } from '../../src/use-cases/ParseCommand.js';

describe('ParseCommand', () => {
  let parseCommand: ParseCommand;
  let listFoldersAndFiles: ListFoldersAndFiles;
  const fsWrapper = jest.fn() as unknown as FsWrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    listFoldersAndFiles = new ListFoldersAndFiles({ fsWrapper });
    parseCommand = new ParseCommand({ listFoldersAndFiles });
  });
  test('should return a list of folders and files', () => {
    fsWrapper.readdirSync = jest.fn().mockReturnValue(['folder1', 'folder2']);
    const lsCommand = parseCommand.execute('ls');
    const foo = lsCommand.execute('path');
    expect(foo).toEqual(['folder1', 'folder2']);
  });

  test('should return an empty list when there are no files or folders', () => {
    fsWrapper.readdirSync = jest.fn().mockReturnValue([]);
    const lsCommand = parseCommand.execute('ls');
    const foo = lsCommand.execute('path');
    expect(foo).toEqual([]);
  });

  test('should throw an error when the command is not found', () => {
    expect(() => parseCommand.execute('foo')).toThrow('Command not found');
  });
});
