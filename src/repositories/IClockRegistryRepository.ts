import { ICreateClockRegistryDTO } from '@dtos/ICreateClockRegistryDTO';
import { IClockRegistry } from '@models/IClockRegistry';

export interface IClockRegistryRepository {
  getRegistriesByUserId(id: string, sort?: 'asc' | 'desc'): Promise<IClockRegistry[]>;
  getRegistriesOfCurrentDayByUserId(id: string, sort?: 'asc' | 'desc'): Promise<IClockRegistry[]>;
  createRegistry(data: ICreateClockRegistryDTO): Promise<IClockRegistry>;
}
