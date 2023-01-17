import { CalendarDateTime, Time, ZonedDateTime } from '@internationalized/date';
import { useRef } from 'react';
import { AriaTimeFieldProps, useLocale, useTimeField } from 'react-aria';
import { BiTime } from 'react-icons/bi';
import { useTimeFieldState } from 'react-stately';

import {
  FieldButton,
  FieldContainer,
  FieldSize,
  FieldSizes,
  FieldVariant,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { DateSegment } from './DateSegment';

type TimeValue = Time | CalendarDateTime | ZonedDateTime;

interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T> {
  onChange?: (value: TimeValue) => void;
  size?: FieldSize;
  variant?: FieldVariant;
}
export default function TimeField<T extends TimeValue>({
  size = 'md',
  variant = 'default',
  ...props
}: TimeFieldProps<T>) {
  const { locale } = useLocale();
  const { label } = props;
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const ref = useRef(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <FieldContainer>
      <Label {...labelProps}>{label}</Label>
      <FieldWrapper
        {...fieldProps}
        css={[FieldVariants[variant], FieldSizes[size]]}
      >
        <div tw="flex flex-row">
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </div>
        <FieldButton>
          <BiTime />
        </FieldButton>
      </FieldWrapper>
    </FieldContainer>
  );
}
