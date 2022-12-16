import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import {
  AriaCalendarProps,
  useCalendar,
  useDateFormatter,
  useLocale,
} from 'react-aria';
import { useCalendarState } from 'react-stately';

import { DateValue } from '../DatePicker';
import { CalendarGrid } from './CalendarGrid';

interface CalendarProps<T extends DateValue> extends AriaCalendarProps<T> {
  visibleMonths?: number;
  onChange?: (value: DateValue) => void;
}
export function Calendar<T extends DateValue>(props: CalendarProps<T>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  });
  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps} ref={ref} tw="inline-block text-gray-800">
      <div tw="flex items-center pb-4">
        <h2 tw="flex-1 font-bold text-xl ml-2">
          {monthDateFormatter.format(
            state.visibleRange.start.toDate(state.timeZone)
          )}
        </h2>
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
