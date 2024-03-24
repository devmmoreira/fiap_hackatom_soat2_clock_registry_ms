import { ClockRegistryRepository } from '@infra/prisma/repositories/ClockRegistryRepository';
import { IClockRegistryRepository } from 'repositories/IClockRegistryRepository';
import { container } from 'tsyringe';

container.registerSingleton<IClockRegistryRepository>('ClockRegistryRepository', ClockRegistryRepository);
