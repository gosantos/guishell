import 'reflect-metadata';
import { container } from 'tsyringe';
import { Controller } from './controller/Controller.js';
import { stdinInterface } from './infra/StdinInterface.js';
import { ParseCommand } from './use-cases/ParseCommand.js';
import { LSCommand } from './use-cases/LSCommand.js';

container.register('stdinInterface', { useValue: stdinInterface });

container.resolve(LSCommand);
container.resolve(ParseCommand);
const controller = container.resolve(Controller);

controller.run();
