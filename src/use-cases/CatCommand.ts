import { autoInjectable, inject } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface';

@autoInjectable()
export class CatCommand {
  constructor(
    @inject('fsInterface') private readonly fsInterface: FSInterface,
  ) {}

  execute(args: string): void {
    if (args && args.length == 0) throw new Error('cat: missing arguments');

    const res = this.fsInterface.readFileSync(args);

    console.log(res.toString());
  }
}
