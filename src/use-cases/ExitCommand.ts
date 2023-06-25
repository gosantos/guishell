import { autoInjectable, inject } from 'tsyringe';
import { ExitInterface } from '../infra/ExitInterface.js';

@autoInjectable()
export class ExitCommand {
  constructor(
    @inject('exitInterface') private readonly exitInterface: ExitInterface,
  ) {}

  execute(): void {
    this.exitInterface(0);
  }
}
