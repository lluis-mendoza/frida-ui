import { DateValue } from '@internationalized/date';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { AriaDatePickerProps, useButton, useDatePicker } from 'react-aria';
import { BiCalendarEvent as CalendarIcon } from 'react-icons/bi';
import { useDatePickerState } from 'react-stately';

import {
  FieldButton,
  FieldContainer,
  FieldError,
  FieldIconSizes,
  FieldProps,
  FieldSizes,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { Calendar } from '../Calendar/Calendar';
import { DateFieldContent } from '../DateField';
import { Dialog } from '../Dialog';
import { Popover } from '../Popover';

interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T>,
    FieldProps {}

export function DatePicker<T extends DateValue>({
  size = 'md',
  variant = 'default',
  block,
  className,
  errorMessage,
  ...props
}: DatePickerProps<T>) {
  const state = useDatePickerState(props);
  const ref = useRef(null);
  const { label, isDisabled, isRequired } = props;
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
    <FieldContainer block={block} className={className}>
      {label !== undefined ? (
        <Label {...labelProps} isRequired={isRequired}>
          {label}
        </Label>
      ) : null}
      <FieldWrapper
        {...groupProps}
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
        ref={ref}
      >
        <DateFieldContent {...fieldProps} />
        <FieldButton {...buttonProps} ref={buttonRef}>
          <CalendarIcon css={FieldIconSizes[size]} />
        </FieldButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
      <AnimatePresence>
        {state.isOpen && (
          <Popover
            triggerRef={ref}
            state={state}
            placement="bottom start"
            tw="mt-2"
          >
            <Dialog {...dialogProps}>
              <Calendar {...calendarProps} />
            </Dialog>
          </Popover>
        )}
      </AnimatePresence>
    </FieldContainer>
  );
}
