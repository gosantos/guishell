import 'reflect-metadata';
import { container } from 'tsyringe';
import { Controller } from './controller/Controller.js';
import { stdinInterface } from './infra/StdinInterface.js';
import { ParseCommand } from './use-cases/ParseCommand.js';
import { LSCommand } from './use-cases/LSCommand.js';
import { exitInterface } from './infra/ExitInterface.js';
import { ExitCommand } from './use-cases/ExitCommand.js';
import { fsInterface } from './infra/FSInterface.js';
import { CatCommand } from './use-cases/CatCommand.js';
import { NoOpCommand } from './use-cases/NoOpCommand.js';

container.register('stdinInterface', { useValue: stdinInterface });
container.register('exitInterface', { useValue: exitInterface });
container.register('fsInterface', { useValue: fsInterface });

container.resolve(ExitCommand);
container.resolve(LSCommand);
container.resolve(ParseCommand);
container.resolve(CatCommand);
container.resolve(NoOpCommand);
const controller = container.resolve(Controller);

controller.run();
