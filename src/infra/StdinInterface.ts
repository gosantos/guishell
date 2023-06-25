import * as readline from 'readline';

export type StdinInterface = readline.Interface;

export const stdinInterface: StdinInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
