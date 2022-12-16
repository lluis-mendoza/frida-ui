import { RangeValue } from '@react-types/shared';
import { useRef } from 'react';
import {
  AriaDateRangePickerProps,
  useButton,
  useDateRangePicker,
} from 'react-aria';
import { BiCalendarEvent as CalendarIcon } from 'react-icons/bi';
import { useDateRangePickerState } from 'react-stately';

import {
  FieldContainer,
  FieldSize,
  FieldSizes,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { RangeCalendar } from '../Calendar/RangeCalendar';
import { DateField } from '../DateField/DateField';
import { DateValue } from '../DatePicker';
import { Dialog } from '../Dialog';
import { Popover } from '../Popover';

interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T> {
  size?: FieldSize;
  onChange?: (value: RangeValue<DateValue>) => void;
  className?: string;
}
export function DateRangePicker<T extends DateValue>({
  size = 'md',
  className,
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
      <FieldWrapper {...groupProps} css={[FieldSizes[size]]} ref={ref}>
        <div tw="inline-flex">
          <DateField {...startFieldProps} />
          <span aria-hidden="true" tw="px-2">
            -
          </span>
          <DateField {...endFieldProps} />
        </div>
        <button {...buttonProps} ref={buttonRef}>
          <CalendarIcon />
        </button>
      </FieldWrapper>
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
