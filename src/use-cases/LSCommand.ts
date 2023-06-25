import { autoInjectable } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface.js';

@autoInjectable()
export class LSCommand {
  constructor(private readonly fsInterface: FSInterface) {}

  execute(path = './'): void {
    const res = this.fsInterface.readdirSync(path);
    console.log(res.join('\n'));
  }
}
