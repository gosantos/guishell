import { FSInterface } from '../../src/infra/FSInterface.js';
import { LSCommand } from '../../src/use-cases/LSCommand.js';
import { ParseCommand } from '../../src/use-cases/ParseCommand.js';

describe('ParseCommand', () => {
  let parseCommand: ParseCommand;
  let listFoldersAndFiles: LSCommand;
  const fsWrapper = jest.fn() as unknown as FSInterface;
  beforeEach(() => {
    jest.clearAllMocks();
    listFoldersAndFiles = new LSCommand(fsWrapper);
    parseCommand = new ParseCommand(listFoldersAndFiles);
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
