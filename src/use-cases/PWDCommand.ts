import { inject, injectable } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface';

@injectable()
export class PWDCommand {
  constructor(
    @inject('fsInterface') private readonly fsInterface: FSInterface,
  ) {}

  execute(args: string): void {
    if (args && args.length != 0) throw new Error('pwd: too many arguments');

    const res = this.fsInterface.realpathSync('./');

    console.log(res);
  }
}
