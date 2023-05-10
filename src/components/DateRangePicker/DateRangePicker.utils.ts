import {
  endOfMonth,
  endOfWeek,
  parseAbsoluteToLocal,
  startOfMonth,
  startOfWeek,
} from '@internationalized/date';

import { StaticDateRange } from './DateRangePicker';

const locale = 'es-ES';

const startToday = parseAbsoluteToLocal(
  new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
);
const endToday = parseAbsoluteToLocal(
  new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
);

export const defaultStaticRanges: StaticDateRange[] = [
  {
    label: 'Hoy',
    startDate: startToday,
    endDate: endToday,
  },
  {
    label: 'Ayer',
    startDate: startToday.subtract({ days: 1 }),
    endDate: endToday.subtract({ days: 1 }),
  },
  {
    label: 'Esta semana',
    startDate: startOfWeek(startToday, locale),
    endDate: endOfWeek(endToday, locale),
  },
  {
    label: 'La semana pasada',
    startDate: startOfWeek(startToday.subtract({ days: 7 }), locale),
    endDate: endOfWeek(endToday.subtract({ days: 7 }), locale),
  },
  {
    label: 'Este mes',
    startDate: startOfMonth(startToday),
    endDate: endOfMonth(endToday),
  },
  {
    label: 'El mes pasado',
    startDate: startOfMonth(startToday.subtract({ months: 1 })),
    endDate: endOfMonth(endToday.subtract({ months: 1 })),
  },
];
