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

  private mapCommandToRunner = {
    ls: this.lsCommand,
    exit: this.exitCommand,
  };

  execute(input: string): ParseCommandOutputType {
    const [commandName, args] = input.split(' ');

    const command = this.mapCommandToRunner[commandName];
    if (!command) throw new Error('Command not found');

    return {
      runner: command,
      args,
    };
  }
}
