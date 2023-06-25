import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class NoOpCommand {
  execute(): void {
    // no op
  }
}
