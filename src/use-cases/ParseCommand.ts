import { autoInjectable } from 'tsyringe';
import { LSCommand } from './LSCommand.js';
import { ParseCommandOutputType } from '../types/ParseCommandOutputType.js';

@autoInjectable()
export class ParseCommand {
  constructor(private readonly lsCommand: LSCommand) {}

  execute(input: string): ParseCommandOutputType {
    const [commandName, args] = input.split(' ');
    if ('ls' === commandName) {
      return {
        runner: this.lsCommand,
        args: args,
      };
    } else {
      throw new Error('Command not found');
    }
  }
}
