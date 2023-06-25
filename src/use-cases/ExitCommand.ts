import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export class ExitCommand {
  constructor(@inject('exitInterface') private readonly exitInterface: any) {}

  execute(): void {
    this.exitInterface(0);
  }
}
