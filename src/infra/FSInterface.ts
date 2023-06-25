import * as fs from 'fs';
import { injectable } from 'tsyringe';

@injectable()
export class FSInterface {
  readdirSync(path: string): string[] {
    return fs.readdirSync(path);
  }

  realPathSync(path: string): string {
    return fs.realpathSync(path);
  }
}
