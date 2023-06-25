import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export class LSCommand {
  constructor(@inject('fsInterface') private readonly fsInterface: any) {}

  execute(path = './'): void {
    try {
      const res = this.fsInterface.readdirSync(path);
      console.log(res.join('\n'));
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }
}
