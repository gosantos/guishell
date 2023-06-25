import { autoInjectable, inject } from 'tsyringe';
import { ParseCommand } from '../use-cases/ParseCommand';
import { StdinInterface } from '../infra/StdinInterface';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType';

@autoInjectable()
export class Controller {
  constructor(
    @inject('stdinInterface') private stdinInterface: StdinInterface,
    private parseCommand: ParseCommand,
  ) {}

  run(): void {
    this.stdinInterface.on('line', (input) => {
      try {
        const commands = this.parseCommand.execute(input);
        commands.forEach((command: ParseCommandOutputType) => {
          const { runner, args } = command;
          runner.execute(args);
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  }
}
