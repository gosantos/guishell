import { autoInjectable, inject } from 'tsyringe';
import { ParseCommand } from '../use-cases/ParseCommand.js';
import { StdinInterface } from '../infra/StdinInterface.js';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType.js';

@autoInjectable()
export class Controller {
  constructor(
    @inject('stdinInterface') private stdinInterface: StdinInterface,
    private parseCommand: ParseCommand,
  ) {}

  run(): void {
    this.stdinInterface.on('line', (input) => {
      try {
        this.parseCommand
          .execute(input)
          .forEach((command: ParseCommandOutputType) => {
            const { runner, args } = command;
            runner.execute(args);
          });
      } catch (e) {
        console.error(e.message);
      }
    });
  }
}
