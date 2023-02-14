import { CalendarDate, getWeeksInMonth } from '@internationalized/date';
import { AriaCalendarGridProps, useCalendarGrid, useLocale } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

import { WeekDay, WeekDays } from './Calendar.styled';
import { CalendarCell } from './CalendarCell';

interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState | RangeCalendarState;
  startDate: CalendarDate;
}
export function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0">
      <WeekDays {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <WeekDay key={index}>{day}</WeekDay>
          ))}
        </tr>
      </WeekDays>
      <tbody>
        {Array.from(Array(weeksInMonth).keys()).map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, props.startDate)
              .map((date, i) =>
                date !== null ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={props.startDate}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
