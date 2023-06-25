import * as fs from 'fs';

export class FsWrapper {
  readdirSync(path: string): string[] {
    return fs.readdirSync(path).map((file: string) => file);
  }
}
