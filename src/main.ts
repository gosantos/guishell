import 'reflect-metadata';
import { container } from 'tsyringe';
import { Controller } from './controller/Controller';
import { stdinInterface } from './infra/StdinInterface';
import { ParseCommand } from './use-cases/ParseCommand';
import { LSCommand } from './use-cases/LSCommand';
import { exitInterface } from './infra/ExitInterface';
import { ExitCommand } from './use-cases/ExitCommand';
import { fsInterface } from './infra/FSInterface';
import { CatCommand } from './use-cases/CatCommand';
import { NoOpCommand } from './use-cases/NoOpCommand';
import { SaveCommand } from './use-cases/SaveCommand';
import { HistoryCommand } from './use-cases/HistoryCommand';

container.register('stdinInterface', { useValue: stdinInterface });
container.register('exitInterface', { useValue: exitInterface });
container.register('fsInterface', { useValue: fsInterface });

container.resolve(ExitCommand);
container.resolve(LSCommand);
container.resolve(SaveCommand);
container.resolve(CatCommand);
container.resolve(NoOpCommand);
container.resolve(HistoryCommand);
container.resolve(ParseCommand);
const controller = container.resolve(Controller);

controller.run();
