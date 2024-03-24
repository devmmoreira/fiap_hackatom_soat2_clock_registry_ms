import { inject, injectable } from 'tsyringe';
import { IClockRegistryRepository } from 'repositories/IClockRegistryRepository';
import AppError from '@errors/AppError';
import dayjs from 'dayjs';
import { verifyIfIsBusinessDay } from '@utils/verifyIfIsBusinessDay';
import { ClockRegistryCategory, IClockRegistryCategory } from '@models/IClockRegistry';

interface IRequest {
  userId: string;
}

@injectable()
export class MarkRegistryUseCase {
  constructor(
    @inject('ClockRegistryRepository')
    private clockRegistryRepository: IClockRegistryRepository,
  ) {}

  private getNextCategory(currentCategory?: IClockRegistryCategory): IClockRegistryCategory {
    switch (currentCategory) {
      case ClockRegistryCategory.START_PERIOD:
        return ClockRegistryCategory.START_LUNCH;
      case ClockRegistryCategory.START_LUNCH:
        return ClockRegistryCategory.END_LUNCH;
      case ClockRegistryCategory.END_LUNCH:
        return ClockRegistryCategory.END_PERIOD;
      default:
        return ClockRegistryCategory.START_PERIOD;
    }
  }

  async execute({ userId }: IRequest): Promise<void> {
    const registries = await this.clockRegistryRepository.getRegistriesOfCurrentDayByUserId(userId, 'desc');

    const lastRegistry = registries.shift();

    if (lastRegistry?.category === ClockRegistryCategory.END_PERIOD) {
      throw new AppError('You have already made the maximum number of appointments on this day, please contact your manager!', 400);
    }

    const markDate = dayjs();

    const newRegistry = {
      userId: userId,
      category: this.getNextCategory(lastRegistry?.category),
      is_business_day: verifyIfIsBusinessDay(markDate.toDate()),
      marked_at: markDate.toDate(),
    };

    await this.clockRegistryRepository.createRegistry(newRegistry);
  }
}
