import { autoInjectable } from 'tsyringe';
import { LSCommand } from './LSCommand.js';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType.js';
import { ExitCommand } from './ExitCommand.js';

@autoInjectable()
export class ParseCommand {
  constructor(
    private readonly lsCommand: LSCommand,
    private readonly exitCommand: ExitCommand,
  ) {}

  execute(input: string): ParseCommandOutputType {
    const [commandName, args] = input.split(' ');

    if (!commandName) throw new Error('Command not found');

    if ('ls' === commandName) {
      return {
        runner: this.lsCommand,
        args: args,
      };
    } else if ('exit' === commandName) {
      return {
        runner: this.exitCommand,
        args: args,
      };
    } else {
      throw new Error('Command not found');
    }
  }
}
