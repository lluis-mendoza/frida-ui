import { DateDuration, endOfMonth } from '@internationalized/date';
import { useDateFormatter } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

import { CapitalizeFirstLetter } from '../../utilities/capitalize-first-letter.utility';
import { MonthName, MonthWrapper } from './Calendar.styled';
import { CalendarGrid } from './CalendarGrid';

interface MonthProps {
  state: CalendarState | RangeCalendarState;
  offset: DateDuration;
}
export default function Month({ state, offset = {} }: MonthProps) {
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  const monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  });

  return (
    <MonthWrapper>
      <MonthName>
        {CapitalizeFirstLetter(
          monthDateFormatter.format(startDate.toDate(state.timeZone))
        )}
      </MonthName>
      <CalendarGrid state={state} startDate={startDate} endDate={endDate} />
    </MonthWrapper>
  );
}
