import { createCalendar, DateDuration } from '@internationalized/date';
import { useRef } from 'react';
import { AriaCalendarProps, useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';

import { DateValue } from '../DatePicker';
import {
  CalendarContainer,
  CalendarWrapper,
  MonthsWrapper,
  NextMonthButton,
  NextMonthIcon,
  PrevMonthButton,
  PrevMonthIcon,
} from './Calendar.styled';
import Month from './Month';

interface CalendarProps<T extends DateValue> extends AriaCalendarProps<T> {
  visibleDuration?: DateDuration;
  onChange?: (value: DateValue) => void;
}
export function Calendar<T extends DateValue>({
  visibleDuration = { months: 2 },
  ...props
}: CalendarProps<T>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
    visibleDuration,
  });
  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  return (
    <CalendarContainer {...calendarProps} ref={ref}>
      <CalendarWrapper>
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
      </CalendarWrapper>
    </CalendarContainer>
  );
}
