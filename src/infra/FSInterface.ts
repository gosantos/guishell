import * as fs from 'fs';

export interface FSInterface {
  readdirSync(path: string): string[];
  realpathSync(path: string): string;
}

export const fsInterface: FSInterface = fs;
