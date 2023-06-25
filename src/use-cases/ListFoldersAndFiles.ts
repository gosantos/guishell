import { autoInjectable } from 'tsyringe';
import { FSInterface } from '../infra/FSInterface.js';

@autoInjectable()
export class ListFoldersAndFiles {
  constructor(private readonly fsInterface: FSInterface) {}

  execute(path: string): string[] {
    return this.fsInterface.readdirSync(path);
  }
}
