import {
  createCalendar,
  DateDuration,
  isSameDay,
} from '@internationalized/date';
import { useEffect, useRef } from 'react';
import {
  AriaRangeCalendarProps,
  useLocale,
  useRangeCalendar,
} from 'react-aria';
import { useRangeCalendarState } from 'react-stately';

import { DateValue } from '../DatePicker';
import { RangeValue } from '../DateRangePicker';
import {
  CalendarContainer,
  MonthsWrapper,
  NextMonthButton,
  NextMonthIcon,
  PrevMonthButton,
  PrevMonthIcon,
  RangeCalendarWrapper,
} from './Calendar.styled';
import { DefinedRange } from './DefinedRange';
import Month from './Month';
import { previewDatesService } from './services';

interface RangeCalendarProps<T extends DateValue>
  extends AriaRangeCalendarProps<T> {
  visibleDuration?: DateDuration;
  onChange?: (value: RangeValue<DateValue>) => void;
}
export function RangeCalendar<T extends DateValue>({
  visibleDuration = { months: 2 },
  ...props
}: RangeCalendarProps<T>) {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
    visibleDuration,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    props,
    state,
    ref
  );
  useEffect(() => {
    if (
      isSameDay(state.highlightedRange.start, state.value.start) &&
      isSameDay(state.highlightedRange.end, state.value.end)
    ) {
      previewDatesService.setSubject(null);
    } else previewDatesService.setSubject(state.highlightedRange);
  }, [state.highlightedRange, state.value]);

  return (
    <CalendarContainer {...calendarProps} ref={ref}>
      <RangeCalendarWrapper>
        <DefinedRange state={state} />
        <MonthsWrapper>
          <PrevMonthButton {...prevButtonProps}>
            <PrevMonthIcon />
          </PrevMonthButton>
          <NextMonthButton {...nextButtonProps}>
            <NextMonthIcon />
          </NextMonthButton>
          {Array(visibleDuration.months)
            .fill(null)
            .map((_, i) => (
              <Month key={i} state={state} offset={{ months: i }} />
            ))}
        </MonthsWrapper>
      </RangeCalendarWrapper>
    </CalendarContainer>
  );
}
