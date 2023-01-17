import {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from '@internationalized/date';
import { useRef } from 'react';
import { AriaDatePickerProps, useButton, useDatePicker } from 'react-aria';
import { BiCalendarEvent as CalendarIcon } from 'react-icons/bi';
import { useDatePickerState } from 'react-stately';

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
import { Calendar } from '../Calendar/Calendar';
import { DateField } from '../DateField/DateField';
import { Dialog } from '../Dialog';
import { Popover } from '../Popover';

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime;
interface DatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {
  size?: FieldSize;
  variant?: FieldVariant;
}
export function DatePicker<T extends DateValue>({
  size = 'md',
  variant = 'default',
  errorMessage,
  ...props
}: DatePickerProps<T>) {
  const state = useDatePickerState(props);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps: triggerProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(triggerProps, buttonRef);
  return (
    <FieldContainer>
      <Label {...labelProps}>{props.label}</Label>
      <FieldWrapper
        {...groupProps}
        css={[FieldVariants[variant], FieldSizes[size]]}
        ref={ref}
      >
        <DateField {...fieldProps} />
        <FieldButton {...buttonProps} ref={buttonRef}>
          <CalendarIcon />
        </FieldButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
      {false && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </FieldContainer>
  );
}
// state.isOpen
