import { inject, injectable } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface.js';

@injectable()
export class PWDCommand {
  constructor(
    @inject('fsInterface') private readonly fsInterface: FSInterface,
  ) {}

  execute(args: string): void {
    if (args && args.length != 0) throw new Error('pwd: too many arguments');

    const res = this.fsInterface.realPathSync('./');

    console.log(res);
  }
}
