import { autoInjectable, inject } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface.js';

@autoInjectable()
export class LSCommand {
  constructor(
    @inject('fsInterface') private readonly fsInterface: FSInterface,
  ) {}

  execute(path = './'): void {
    try {
      const res = this.fsInterface.readdirSync(path);
      console.log(res.join('\n'));
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }
}
