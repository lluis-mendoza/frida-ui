import {
  CalendarDate,
  DateValue,
  getDayOfWeek,
  getLocalTimeZone,
  isSameDay,
  isSameMonth,
  isToday,
} from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { useEffect, useRef, useState } from 'react';
import {
  AriaCalendarCellProps,
  mergeProps,
  useCalendarCell,
  useFocusRing,
  useLocale,
} from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

import { DayCell } from './Calendar.styled';
import { PreviewDates, previewDatesService } from './services';

interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  currentMonth: CalendarDate;
}
function isDateValue(value: any) {
  return (value as DateValue)?.day !== undefined;
}
function isRangeValue<T>(value: any) {
  return (value as RangeValue<T>)?.start !== undefined;
}
function isInsideRange(value: DateValue, range: RangeValue<DateValue>) {
  return range.start.compare(value) <= 0 && range.end.compare(value) >= 0;
}

export function CalendarCell({ state, date, currentMonth }: CalendarCellProps) {
  const ref = useRef(null);
  const [previewDates, setPreviewDates] = useState<PreviewDates>(null);
  const { cellProps, buttonProps, formattedDate } = useCalendarCell(
    {
      date,
    },
    state,
    ref
  );
  const value = state.value;
  const anchorDate = (state as RangeCalendarState)?.anchorDate;
  const isAnchorDate = anchorDate !== null && isSameDay(anchorDate, date);

  useEffect(() => {
    console.log(anchorDate);
  }, [anchorDate]);
  const isSelected =
    (isDateValue(value) && date.compare(value as DateValue) === 0) ||
    (isRangeValue(value) && anchorDate !== null
      ? isSameDay(anchorDate, date)
      : isInsideRange(date, value as RangeValue<DateValue>));
  useEffect(() => {
    const previewDatesSubject$ = previewDatesService
      .getSubject()
      .subscribe((_previewDates) => setPreviewDates(_previewDates));
    return () => previewDatesSubject$.unsubscribe();
  }, []);

  const timeZone = getLocalTimeZone();
  const isOutsideMonth = !isSameMonth(currentMonth, date);
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isStartWeek = dayOfWeek === 0;
  const isStartMonth = date.day === 1;
  const isEndWeek = dayOfWeek === 6;
  const isEndMonth = date.day === date.calendar.getDaysInMonth(date);

  const isDatePreview = (previewDates as DateValue)?.compare?.(date) === 0;
  const isDateEqualDateRangeStart =
    (previewDates as RangeValue<DateValue>)?.start !== undefined &&
    isSameDay(date, (previewDates as RangeValue<DateValue>).start);
  const isDateEqualDateRangeEnd =
    (previewDates as RangeValue<DateValue>)?.end !== undefined &&
    isSameDay(date, (previewDates as RangeValue<DateValue>).end);

  const isPreview =
    isDatePreview ||
    (isRangeValue(previewDates) &&
      isInsideRange(date, previewDates as RangeValue<DateValue>));

  const isPreviewStart =
    isDatePreview || isDateEqualDateRangeStart || isStartWeek || isStartMonth;

  const isPreviewEnd =
    isDatePreview || isDateEqualDateRangeEnd || isEndWeek || isEndMonth;

  const selectionRange = state as RangeCalendarState;
  const hasSelectionRange = selectionRange?.value?.start !== undefined;
  const isStartSelectionRange =
    hasSelectionRange && isSameDay(date, selectionRange.value.start);
  const isEndSelectionRange =
    hasSelectionRange && isSameDay(date, selectionRange.value.end);

  const isSelectedStart =
    isSelected &&
    (!hasSelectionRange ||
      isAnchorDate ||
      isStartSelectionRange ||
      isStartWeek ||
      isStartMonth);
  const isSelectedEnd =
    isSelected &&
    (!hasSelectionRange ||
      isAnchorDate ||
      isEndSelectionRange ||
      isEndWeek ||
      isEndMonth);

  const { focusProps } = useFocusRing();

  return (
    <td {...cellProps}>
      <DayCell
        {...mergeProps(buttonProps, focusProps)}
        isToday={isToday(date, timeZone)}
        isOutsideMonth={isOutsideMonth}
        isPreview={isPreview}
        isPreviewStart={isPreviewStart}
        isPreviewEnd={isPreviewEnd}
        isSelected={isSelected}
        isSelectedStart={isSelectedStart}
        isSelectedEnd={isSelectedEnd}
        ref={ref}
      >
        {formattedDate}
      </DayCell>
    </td>
  );
}
