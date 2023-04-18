import { CalendarDateTime } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import {
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
  FieldIconSizes,
  FieldProps,
  FieldSizes,
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
export type DateRangeValue = RangeValue<DateValue>;
interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T>,
    FieldProps {
  onChange?: (value: RangeValue<DateValue>) => void;
  staticDateRange?: StaticDateRange;
}

export function DateRangePicker<T extends DateValue>({
  size = 'md',
  variant = 'default',
  className,
  errorMessage,
  block,
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
  const { isDisabled, isRequired } = props;
  const { buttonProps } = useButton(triggerProps, buttonRef);
  return (
    <FieldContainer block={block} className={className}>
      <Label {...labelProps} isRequired={isRequired}>
        {props.label}
      </Label>
      <FieldWrapper
        {...groupProps}
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
        ref={ref}
      >
        <DateRangeField
          startFieldProps={startFieldProps}
          endFieldProps={endFieldProps}
        />
        <FieldButton {...buttonProps} ref={buttonRef}>
          <CalendarIcon css={FieldIconSizes[size]} />
        </FieldButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
      <AnimatePresence>
        {state.isOpen && (
          <Popover triggerRef={ref} state={state} placement="bottom start">
            <Dialog {...dialogProps}>
              <RangeCalendar {...calendarProps} />
            </Dialog>
          </Popover>
        )}
      </AnimatePresence>
    </FieldContainer>
  );
}
