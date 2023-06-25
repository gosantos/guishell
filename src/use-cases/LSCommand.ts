import { autoInjectable, inject } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface';

@autoInjectable()
export class LSCommand {
  constructor(
    @inject('fsInterface') private readonly fsInterface: FSInterface,
  ) {}

  execute(path: string): void {
    path = path === '' ? '.' : path;

    const res = this.fsInterface.readdirSync(path);
    console.log(res.join('\n'));
  }
}
