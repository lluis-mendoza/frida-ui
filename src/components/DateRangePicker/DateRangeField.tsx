import { CalendarDate, DateValue, isSameDay } from '@internationalized/date';
import { AriaDatePickerProps } from 'react-aria';

import { DateFieldContent } from '../DateField';
import { StaticDateRange } from './DateRangePicker';
import { DateFieldContainer, StaticRangeLabel } from './DateRangePicker.styled';
import { defaultStaticRanges } from './DateRangePicker.utils';

interface DateRangeFieldProps {
  startFieldProps: AriaDatePickerProps<DateValue>;
  endFieldProps: AriaDatePickerProps<DateValue>;
  staticDateRanges?: StaticDateRange[];
}
export function DateRangeField({
  startFieldProps,
  endFieldProps,
  staticDateRanges = defaultStaticRanges,
}: DateRangeFieldProps) {
  const startDateProps = startFieldProps.value as CalendarDate;
  const endDateProps = endFieldProps.value as CalendarDate;

  if (startDateProps != null && endDateProps != null) {
    const staticRange = staticDateRanges.find(
      ({ startDate, endDate }) =>
        isSameDay(startDateProps, startDate) && isSameDay(endDateProps, endDate)
    );
    if (staticRange !== undefined)
      return <StaticRangeLabel>{staticRange.label}</StaticRangeLabel>;
  }
  return (
    <DateFieldContainer>
      <DateFieldContent {...startFieldProps} granularity="day" />
      <span aria-hidden="true" tw="px-2">
        -
      </span>
      <DateFieldContent {...endFieldProps} granularity="day" />
    </DateFieldContainer>
  );
}
