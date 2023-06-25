import { container } from 'tsyringe';
import { LSCommand } from '../../src/use-cases/LSCommand.js';
import { ParseCommand } from '../../src/use-cases/ParseCommand.js';
import { ExitCommand } from '../../src/use-cases/ExitCommand.js';
import { PWDCommand } from '../../src/use-cases/PWDCommand.js';
import { FSInterface } from '../../src/infra/FSInterface.js';
import { ExitInterface } from '../../src/infra/ExitInterface.js';
import { CatCommand } from '../../src/use-cases/CatCommand.js';
import { NoOpCommand } from '../../src/use-cases/NoOpCommand.js';
import { HistoryCommand } from '../../src/use-cases/HistoryCommand.js';

describe('ParseCommand', () => {
  let parseCommand: ParseCommand;
  const fsInterface = jest.fn() as unknown as FSInterface;
  const exitInterface = jest.fn() as unknown as ExitInterface;
  beforeEach(() => {
    jest.clearAllMocks();
    container.register('exitInterface', { useValue: exitInterface });
    container.register('fsInterface', { useValue: fsInterface });
    container.resolve(LSCommand);
    container.resolve(ExitCommand);
    container.resolve(PWDCommand);
    container.resolve(CatCommand);
    container.resolve(NoOpCommand);
    parseCommand = container.resolve(ParseCommand);
  });
  test('should return a list of folders and files', () => {
    const { runner, args } = parseCommand.execute('ls');

    expect(runner).toBeInstanceOf(LSCommand);
    expect(args).toBeUndefined();
  });

  test('should return an empty list when there are no files or folders', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue([]);
    const { runner, args } = parseCommand.execute('ls foo');

    expect(runner).toBeInstanceOf(LSCommand);
    expect(args).toBe('foo');
  });

  test('should throw an error when the command is not found', () => {
    expect(() => parseCommand.execute('foo')).toThrow('Command not found');

    expect(() => parseCommand.execute('')).toThrow('Command not found');
  });

  test('should return an exit command', () => {
    const { runner, args } = parseCommand.execute('exit');

    expect(runner).toBeInstanceOf(ExitCommand);
    expect(args).toBeUndefined();
  });

  test('should return an exit command with args', () => {
    const { runner, args } = parseCommand.execute('exit 1');

    expect(runner).toBeInstanceOf(ExitCommand);
    expect(args).toBe('1');
  });

  test('should print current directory when pwd', () => {
    fsInterface.realpathSync = jest.fn().mockReturnValue('./some/dir');
    const { runner, args } = parseCommand.execute('pwd');

    expect(runner).toBeInstanceOf(PWDCommand);
    expect(args).toBe(undefined);
  });

  test('should select cat command', () => {
    const { runner, args } = parseCommand.execute('cat');

    expect(runner).toBeInstanceOf(CatCommand);
    expect(args).toBe(undefined);
  });

  test('should select noop command', () => {
    const { runner, args } = parseCommand.execute('');

    expect(runner).toBeInstanceOf(NoOpCommand);
    expect(args).toBe(undefined);
  });

  test('should select history command', () => {
    const { runner, args } = parseCommand.execute('history');

    expect(runner).toBeInstanceOf(HistoryCommand);
    expect(args).toBe(undefined);
  });
});
