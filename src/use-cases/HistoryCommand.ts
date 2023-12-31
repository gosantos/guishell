import { autoInjectable } from 'tsyringe';
import { CatCommand } from './CatCommand';

@autoInjectable()
export class HistoryCommand {
  constructor(private readonly catCommand: CatCommand) {}

  execute(): void {
    this.catCommand.execute('history.txt');
  }
}
