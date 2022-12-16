import { getDayOfWeek, isSameDay } from '@internationalized/date';
import { useRef } from 'react';
import {
  AriaCalendarCellProps,
  mergeProps,
  useCalendarCell,
  useFocusRing,
  useLocale,
} from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
}
export function CalendarCell({ state, date }: CalendarCellProps) {
  const ref = useRef(null);

  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell(
    {
      date,
    },
    state,
    ref
  );

  // The start and end date of the selected range will have
  // an emphasized appearance.
  const isSelectionStart = state.visibleRange
    ? isSameDay(date, state.visibleRange.start)
    : isSelected;
  const isSelectionEnd = state.visibleRange
    ? isSameDay(date, state.visibleRange.end)
    : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`py-0.5 relative ${isFocusVisible ? 'z-10' : 'z-0'}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        tw="w-10 h-10"
        className={`w-10 h-10 outline-none group ${
          isRoundedLeft ? 'rounded-l-full' : ''
        } ${isRoundedRight ? 'rounded-r-full' : ''} ${
          isSelected ? (isInvalid ? 'bg-red-300' : 'bg-vioconst-300') : ''
        } ${isDisabled ? 'disabled' : ''}`}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center ${
            isDisabled && !isInvalid ? 'text-gray-400' : ''
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible
              ? 'ring-2 group-focus:z-2 ring-vioconst-600 ring-offset-2'
              : ''
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? isInvalid
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-vioconst-600 text-white hover:bg-vioconst-700'
              : ''
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !isDisabled && !(isSelectionStart || isSelectionEnd)
              ? isInvalid
                ? 'hover:bg-red-400'
                : 'hover:bg-vioconst-400'
              : ''
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? 'hover:bg-vioconst-100' : ''
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}
