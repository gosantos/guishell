import { autoInjectable } from 'tsyringe';
import { LSCommand } from './LSCommand.js';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType.js';
import { ExitCommand } from './ExitCommand.js';
import { PWDCommand } from './PWDCommand.js';
import { CatCommand } from './CatCommand.js';
import { NoOpCommand } from './NoOpCommand.js';
import { HistoryCommand } from './HistoryCommand.js';
import { SaveCommand } from './SaveCommand.js';

@autoInjectable()
export class ParseCommand {
  constructor(
    private readonly lsCommand: LSCommand,
    private readonly exitCommand: ExitCommand,
    private readonly pwdCommand: PWDCommand,
    private readonly catCommand: CatCommand,
    private readonly noopCommand: NoOpCommand,
    private readonly historyCommand: HistoryCommand,
    private readonly saveCommand: SaveCommand,
  ) {}

  execute(input: string): ParseCommandOutputType[] {
    this.saveCommand.execute(input);

    const mapCommandToRunner: {
      [key: string]: ParseCommandOutputType['runner'];
    } = {
      ls: this.lsCommand,
      exit: this.exitCommand,
      pwd: this.pwdCommand,
      cat: this.catCommand,
      history: this.historyCommand,
      '': this.noopCommand,
    };

    return input.split('|').map((item: string) => {
      const [commandName, args] = item.split(' ');
      const command = mapCommandToRunner[commandName];

      if (!command) throw new Error('Command not found');

      return {
        runner: command,
        args: (args || '').trim(),
      };
    });
  }
}
