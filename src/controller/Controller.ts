import { autoInjectable, inject } from 'tsyringe';
import { ParseCommand } from '../use-cases/ParseCommand.js';
import { StdinInterface } from '../infra/StdinInterface.js';

@autoInjectable()
export class Controller {
  constructor(
    @inject('stdinInterface') private stdinInterface: StdinInterface,
    private parseCommand: ParseCommand,
  ) {}

  run(): void {
    this.stdinInterface.on('line', (line) => {
      this.parseCommand.execute(line);
    });
  }
}
