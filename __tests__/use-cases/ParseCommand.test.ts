import { container } from 'tsyringe';
import { LSCommand } from '../../src/use-cases/LSCommand';
import { ParseCommand } from '../../src/use-cases/ParseCommand';
import { ExitCommand } from '../../src/use-cases/ExitCommand';
import { PWDCommand } from '../../src/use-cases/PWDCommand';
import { FSInterface } from '../../src/infra/FSInterface';
import { ExitInterface } from '../../src/infra/ExitInterface';
import { CatCommand } from '../../src/use-cases/CatCommand';
import { NoOpCommand } from '../../src/use-cases/NoOpCommand';
import { HistoryCommand } from '../../src/use-cases/HistoryCommand';
import { SaveCommand } from '../../src/use-cases/SaveCommand';

describe('ParseCommand', () => {
  let parseCommand: ParseCommand;
  const fsInterface = jest.fn() as unknown as FSInterface;
  const exitInterface = jest.fn() as unknown as ExitInterface;

  beforeEach(() => {
    jest.clearAllMocks();
    container.register('exitInterface', { useValue: exitInterface });
    container.register('fsInterface', { useValue: fsInterface });

    fsInterface.appendFileSync = jest.fn().mockReturnValue(undefined);

    container.resolve(LSCommand);
    container.resolve(ExitCommand);
    container.resolve(PWDCommand);
    container.resolve(CatCommand);
    container.resolve(NoOpCommand);
    container.resolve(HistoryCommand);
    container.resolve(SaveCommand);

    parseCommand = container.resolve(ParseCommand);
  });
  test('should return a list of folders and files', () => {
    const input = 'ls';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(LSCommand);
    expect(args).toBe('');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should return an empty list when there are no files or folders', () => {
    fsInterface.readdirSync = jest.fn().mockReturnValue([]);
    const input = 'ls foo';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(LSCommand);
    expect(args).toBe('foo');

    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should throw an error when the command is not found', () => {
    const input = 'foo';
    expect(() => parseCommand.execute('foo')).toThrow('Command not found');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should return an exit command', () => {
    const input = 'exit';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(ExitCommand);
    expect(args).toBe('');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should return an exit command with args', () => {
    const input = 'exit 1';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(ExitCommand);
    expect(args).toBe('1');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should print current directory when pwd', () => {
    fsInterface.realpathSync = jest.fn().mockReturnValue('./some/dir');
    const input = 'pwd';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(PWDCommand);
    expect(args).toBe('');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should select cat command', () => {
    const input = 'cat';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(CatCommand);
    expect(args).toBe('');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should select noop command', () => {
    const input = '';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(NoOpCommand);
    expect(args).toBe('');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should select history command', () => {
    const input = 'history';
    const { runner, args } = parseCommand.execute(input)[0];

    expect(runner).toBeInstanceOf(HistoryCommand);
    expect(args).toBe('');
    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });

  test('should parse a ls and a cat command with a pipe', () => {
    const input = 'ls | cat filename.txt';
    const commands = parseCommand.execute(input);

    expect(commands[0].runner).toBeInstanceOf(LSCommand);
    expect(commands[0].args).toBe('');

    expect(commands[1].runner).toBeInstanceOf(CatCommand);
    expect(commands[1].args).toBe('filename.txt');

    expect(fsInterface.appendFileSync).toHaveBeenCalledWith(
      'history.txt',
      input + '\n',
    );
  });
});
