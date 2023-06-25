import { container } from 'tsyringe';
import { PWDCommand } from '../../src/use-cases/PWDCommand.js';

describe('PWDCommand', () => {
  const fsInterface = jest.fn() as unknown as any;
  let pwdCommand: PWDCommand;

  beforeEach(() => {
    jest.clearAllMocks();
    container.register('fsInterface', { useValue: fsInterface });
    pwdCommand = container.resolve(PWDCommand);
  });
  test('should return the current directory', () => {
    fsInterface.realPathSync = jest.fn().mockReturnValue('./some/dir');

    pwdCommand.execute('');

    expect(fsInterface.realPathSync).toHaveBeenCalledWith('./');
  });

  test('should throw an error when too many args', () => {
    const pwdCommand = container.resolve(PWDCommand);

    expect(() => pwdCommand.execute('foo')).toThrow('pwd: too many arguments');
  });

  test('should not when being called with undefined', () => {
    const pwdCommand = container.resolve(PWDCommand);

    expect(() => pwdCommand.execute(undefined)).not.toThrow(
      'pwd: too many arguments',
    );
  });
});
