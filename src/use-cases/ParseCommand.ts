import { autoInjectable } from 'tsyringe';
import { LSCommand } from './LSCommand.js';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType.js';
import { ExitCommand } from './ExitCommand.js';
import { PWDCommand } from './PWDCommand.js';
import { CatCommand } from './CatCommand.js';
import { NoOpCommand } from './NoOpCommand.js';

@autoInjectable()
export class ParseCommand {
  constructor(
    private readonly lsCommand: LSCommand,
    private readonly exitCommand: ExitCommand,
    private readonly pwdCommand: PWDCommand,
    private readonly catCommand: CatCommand,
    private readonly noopCommand: NoOpCommand,
  ) {}

  execute(input: string): ParseCommandOutputType {
    input = input.trim();

    const mapCommandToRunner = {
      ls: this.lsCommand,
      exit: this.exitCommand,
      pwd: this.pwdCommand,
      cat: this.catCommand,
      '': this.noopCommand,
    };

    const [commandName, args] = input.split(' ');

    const command = mapCommandToRunner[commandName];
    if (!command) throw new Error('Command not found');

    return {
      runner: mapCommandToRunner[commandName],
      args: args,
    };
  }
}
