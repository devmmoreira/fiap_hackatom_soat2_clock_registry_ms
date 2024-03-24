import { IClockRegistryCategory } from '@models/IClockRegistry';

export interface ICreateClockRegistryDTO {
  userId: string;
  category: IClockRegistryCategory;
  is_business_day: boolean;
  marked_at: Date;
}
