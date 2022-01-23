import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const compare = dayjs(end_date_utc).diff(start_date_utc, 'hours');

    return compare;
  }

  convertToUTC(date: Date): string {
    const convert = dayjs(date).utc().local().format();

    return convert;
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const compare = dayjs(end_date_utc).diff(start_date_utc, 'days');

    return compare;
  }
}

export { DayjsDateProvider };
