import * as fs from 'fs';

export class FsWrapper {
  constructor(private readonly fs: any) {}

  readdirSync(path: string): string[] {
    return this.fs.readdirSync(path).map((file: string) => file);
  }
}

export const fsWrapper = new FsWrapper(fs);
