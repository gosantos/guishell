import { FSInterface } from '../../src/infra/FSInterface.js';
import { LSCommand } from '../../src/use-cases/LSCommand.js';
import { ParseCommand } from '../../src/use-cases/ParseCommand.js';

describe('ParseCommand', () => {
  let parseCommand: ParseCommand;
  let listFoldersAndFiles: LSCommand;
  const fsInterface = jest.fn() as unknown as FSInterface;
  beforeEach(() => {
    jest.clearAllMocks();
    listFoldersAndFiles = new LSCommand(fsInterface);
    parseCommand = new ParseCommand(listFoldersAndFiles);
  });
  test('should return a list of folders and files', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue(['folder1', 'folder2']);
    const { runner, args } = parseCommand.execute('ls');

    runner.execute(args);

    expect(fsInterface.readdirSync).toHaveBeenCalledWith('./');
  });

  test('should return an empty list when there are no files or folders', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue([]);
    const { runner, args } = parseCommand.execute('ls foo');

    runner.execute(args);

    expect(fsInterface.readdirSync).toHaveBeenCalledWith('foo');
  });

  test('should throw an error when the command is not found', () => {
    expect(() => parseCommand.execute('foo')).toThrow('Command not found');
  });
});
