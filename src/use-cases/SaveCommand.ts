import { autoInjectable, inject } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface.js';

@autoInjectable()
export class SaveCommand {
  constructor(
    @inject('fsInterface') private readonly fsInterface: FSInterface,
  ) {}

  execute(line: string): void {
    this.fsInterface.appendFileSync('history.txt', line + '\n');
  }
}
