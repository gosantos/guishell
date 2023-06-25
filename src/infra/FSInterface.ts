import * as fs from 'fs';

export interface FSInterface {
  readdirSync(path: string): string[];
  realpathSync(path: string): string;
  readFileSync(path: string): Buffer;
}

export const fsInterface: FSInterface = fs;
