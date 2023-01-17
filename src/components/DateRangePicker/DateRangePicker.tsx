import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { useRef } from 'react';
import {
  AriaDatePickerProps,
  AriaDateRangePickerProps,
  useButton,
  useDateRangePicker,
} from 'react-aria';
import { BiCalendarEvent as CalendarIcon } from 'react-icons/bi';
import { useDateRangePickerState } from 'react-stately';

import {
  FieldButton,
  FieldContainer,
  FieldError,
  FieldSize,
  FieldSizes,
  FieldVariant,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { RangeCalendar } from '../Calendar/RangeCalendar';
import { DateValue } from '../DatePicker';
import { Dialog } from '../Dialog';
import { Popover } from '../Popover';
import { DateRangeField } from './DateRangeField';

export { RangeValue } from '@react-types/shared';
export interface StaticDateRange {
  label: string;
  startDate: CalendarDateTime;
  endDate: CalendarDateTime;
}
interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T> {
  size?: FieldSize;
  variant?: FieldVariant;
  onChange?: (value: RangeValue<DateValue>) => void;
  className?: string;
  staticDateRange?: StaticDateRange;
}

export function DateRangePicker<T extends DateValue>({
  size = 'md',
  variant = 'default',
  className,
  errorMessage,
  ...props
}: DateRangePickerProps<T>) {
  const state = useDateRangePickerState(props);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps: triggerProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);
  const { buttonProps } = useButton(triggerProps, buttonRef);
  return (
    <FieldContainer className={className}>
      <Label {...labelProps}>{props.label}</Label>
      <FieldWrapper
        {...groupProps}
        css={[FieldVariants[variant], FieldSizes[size]]}
        ref={ref}
      >
        <DateRangeField
          startFieldProps={startFieldProps as AriaDatePickerProps<CalendarDate>}
          endFieldProps={endFieldProps as AriaDatePickerProps<CalendarDate>}
        />
        <FieldButton {...buttonProps} ref={buttonRef}>
          <CalendarIcon />
        </FieldButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps}>
            <RangeCalendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </FieldContainer>
  );
}
