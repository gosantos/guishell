import 'reflect-metadata';
import { container } from 'tsyringe';
import { Controller } from './controller/Controller.js';
import { stdinInterface } from './infra/StdinInterface.js';
import { ParseCommand } from './use-cases/ParseCommand.js';
import { ListFoldersAndFiles } from './use-cases/ListFoldersAndFiles.js';

container.register('stdinInterface', { useValue: stdinInterface });

container.resolve(ListFoldersAndFiles);
container.resolve(ParseCommand);
const controller = container.resolve(Controller);

controller.run();
