import { exit } from 'process';

export interface ExitInterface {
  (code?: number): never;
}

export const exitInterface: ExitInterface = exit;
