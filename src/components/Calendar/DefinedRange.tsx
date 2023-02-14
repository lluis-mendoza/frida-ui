import { DateValue, isSameDay } from '@internationalized/date';
import { RangeCalendarState } from 'react-stately';

import { StaticDateRange } from '../DateRangePicker';
import { defaultStaticRanges } from '../DateRangePicker/DateRangePicker.utils';
import { StaticRangeButton, StaticRangeWrapper } from './Calendar.styled';
import { previewDatesService } from './services';

interface DefinedRangeProps {
  staticDateRanges?: StaticDateRange[];
  state: RangeCalendarState;
}
export function DefinedRange({
  staticDateRanges = defaultStaticRanges,
  state,
}: DefinedRangeProps) {
  const selectedDates = state.value;

  const handleClick = (startDate: DateValue, endDate: DateValue) => {
    state.setValue({ start: startDate, end: endDate });
  };
  const handleMouseOver = (startDate: DateValue, endDate: DateValue) => {
    previewDatesService.next({ start: startDate, end: endDate });
  };
  const handleMouseLeave = () => {
    previewDatesService.next(null);
  };
  return (
    <StaticRangeWrapper>
      {staticDateRanges.map((staticRange) => {
        const { label, startDate, endDate } = staticRange;
        const isSelected =
          isSameDay(startDate, selectedDates.start) &&
          isSameDay(endDate, selectedDates.end);
        return (
          <StaticRangeButton
            key={label}
            onMouseOver={() => handleMouseOver(startDate, endDate)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(startDate, endDate)}
            isSelected={isSelected}
          >
            {label}
          </StaticRangeButton>
        );
      })}
    </StaticRangeWrapper>
  );
}
