import * as fs from 'fs';

export class FSInterface {
  readdirSync(path: string): string[] {
    return fs.readdirSync(path).map((file: string) => file);
  }
}
