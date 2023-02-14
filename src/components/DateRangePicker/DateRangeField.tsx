import { CalendarDate, isSameDay } from '@internationalized/date';
import { AriaDatePickerProps } from 'react-aria';

import { DateField } from '../DateField';
import { StaticDateRange } from './DateRangePicker';
import { DateFieldContainer, StaticRangeLabel } from './DateRangePicker.styled';
import { defaultStaticRanges } from './DateRangePicker.utils';

interface DateRangeFieldProps {
  startFieldProps: AriaDatePickerProps<CalendarDate>;
  endFieldProps: AriaDatePickerProps<CalendarDate>;
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
      <DateField {...startFieldProps} />
      <span aria-hidden="true" tw="px-2">
        -
      </span>
      <DateField {...endFieldProps} />
    </DateFieldContainer>
  );
}
