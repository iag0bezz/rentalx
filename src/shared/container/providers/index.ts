import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementantions/DayjsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
