import {
  endOfMonth,
  endOfWeek,
  getLocalTimeZone,
  startOfMonth,
  startOfWeek,
  Time,
  toCalendarDateTime,
  today,
} from '@internationalized/date';

import { StaticDateRange } from './DateRangePicker';

const timeZone = getLocalTimeZone();
const locale = 'es-ES';
const startTime = new Time(0, 0, 0);
const endTime = new Time(23, 59, 59);

export const defaultStaticRanges: StaticDateRange[] = [
  {
    label: 'Hoy',
    startDate: today(timeZone),
    endDate: today(timeZone),
  },
  {
    label: 'Ayer',
    startDate: today(timeZone).subtract({ days: 1 }),
    endDate: today(timeZone).subtract({ days: 1 }),
  },
  {
    label: 'Esta semana',
    startDate: startOfWeek(today(timeZone), locale),
    endDate: endOfWeek(today(timeZone), locale),
  },
  {
    label: 'La semana pasada',
    startDate: startOfWeek(today(timeZone).subtract({ weeks: 1 }), locale),
    endDate: endOfWeek(today(timeZone).subtract({ weeks: 1 }), locale),
  },
  {
    label: 'Este mes',
    startDate: startOfMonth(today(timeZone)),
    endDate: endOfMonth(today(timeZone)),
  },
  {
    label: 'El mes pasado',
    startDate: startOfMonth(today(timeZone).subtract({ months: 1 })),
    endDate: endOfMonth(today(timeZone).subtract({ months: 1 })),
  },
].map((e) => ({
  ...e,
  startDate: toCalendarDateTime(e.startDate, startTime),
  endDate: toCalendarDateTime(e.endDate, endTime),
}));
