import * as fs from 'fs';

export interface FSInterface {
  readdirSync(path: string): string[];
  realpathSync(path: string): string;
  readFileSync(path: string): Buffer;
  appendFileSync(path: string, data: string): void;
}

export const fsInterface: FSInterface = fs;
