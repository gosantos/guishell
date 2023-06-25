import { autoInjectable } from 'tsyringe';
import { LSCommand } from './LSCommand.js';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType.js';
import { ExitCommand } from './ExitCommand.js';
import { PWDCommand } from './PWDCommand.js';

@autoInjectable()
export class ParseCommand {
  constructor(
    private readonly lsCommand: LSCommand,
    private readonly exitCommand: ExitCommand,
    private readonly pwdCommand: PWDCommand,
  ) {}

  execute(input: string): ParseCommandOutputType {
    const mapCommandToRunner = {
      ls: this.lsCommand,
      exit: this.exitCommand,
      pwd: this.pwdCommand,
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
