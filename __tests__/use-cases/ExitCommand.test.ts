import { container } from 'tsyringe';
import { ExitCommand } from '../../src/use-cases/ExitCommand.js';

describe('ExitCommand', () => {
  const exitInterface = jest.fn();

  let exitCommand: ExitCommand;

  beforeEach(() => {
    jest.clearAllMocks();
    container.registerInstance('exitInterface', exitInterface);
    exitCommand = container.resolve(ExitCommand);
  });

  test('should exit the program', () => {
    container.register('exitInterface', {
      useValue: jest.fn(),
    });
    exitCommand.execute();
    expect(exitInterface).toHaveBeenCalledWith(0);
  });
});
