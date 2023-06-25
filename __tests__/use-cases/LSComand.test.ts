import { FSInterface } from '../../src/infra/FSInterface';
import { LSCommand } from '../../src/use-cases/LSCommand';

describe('LSCommand', () => {
  let lsCommand: LSCommand;
  const fsInterface = jest.fn() as unknown as FSInterface;

  beforeEach(async () => {
    jest.clearAllMocks();
    lsCommand = new LSCommand(fsInterface);
  });
  test('should return a list of folders and files', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    fsInterface.readdirSync = jest.fn().mockReturnValue(['folder1', 'folder2']);
    lsCommand.execute('path');
    expect(spyConsoleLog).toHaveBeenCalledWith('folder1\nfolder2');
  });

  test('should return an empty list when there are no files or folders', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    fsInterface.readdirSync = jest.fn().mockReturnValue([]);
    lsCommand.execute('path');
    expect(spyConsoleLog).toHaveBeenCalledWith('');
  });
});
