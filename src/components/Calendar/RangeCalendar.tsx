import { createCalendar } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { useRef } from 'react';
import {
  AriaRangeCalendarProps,
  useLocale,
  useRangeCalendar,
} from 'react-aria';
import { useRangeCalendarState } from 'react-stately';

import { DateValue } from '../DatePicker';
import { CalendarGrid } from './CalendarGrid';

interface RangeCalendarProps<T extends DateValue>
  extends AriaRangeCalendarProps<T> {
  visibleMonths?: number;
  onChange?: (value: RangeValue<DateValue>) => void;
}
export function RangeCalendar<T extends DateValue>(
  props: RangeCalendarProps<T>
) {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  return (
    <div {...calendarProps} ref={ref} className="inline-block">
      <div className="flex items-center pb-4">
        <h2 className="flex-1 font-bold text-xl ml-2">{title}</h2>
        {/* <CalendarButton {...prevButtonProps}>
              <ChevronLeftIcon className="h-6 w-6" />
            </CalendarButton>
            <CalendarButton {...nextButtonProps}>
              <ChevronRightIcon className="h-6 w-6" />
      </CalendarButton> */}
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
