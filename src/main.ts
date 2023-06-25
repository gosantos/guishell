import 'reflect-metadata';
import { container } from 'tsyringe';
import { Controller } from './controller/Controller.js';
import { stdinInterface } from './infra/StdinInterface.js';
import { ParseCommand } from './use-cases/ParseCommand.js';
import { LSCommand } from './use-cases/LSCommand.js';
import { exitInterface } from './infra/ExitInterface.js';
import { ExitCommand } from './use-cases/ExitCommand.js';
import { FSInterface } from './infra/FSInterface.js';

container.register('stdinInterface', { useValue: stdinInterface });
container.register('exitInterface', { useValue: exitInterface });
container.register('fsInterface', { useClass: FSInterface });

container.resolve(ExitCommand);
container.resolve(LSCommand);
container.resolve(ParseCommand);
const controller = container.resolve(Controller);

controller.run();
