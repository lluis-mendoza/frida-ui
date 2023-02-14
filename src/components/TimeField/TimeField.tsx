import { CalendarDateTime, Time, ZonedDateTime } from '@internationalized/date';
import { useRef } from 'react';
import { AriaTimeFieldProps, useLocale, useTimeField } from 'react-aria';
import { BiTime } from 'react-icons/bi';
import { useTimeFieldState } from 'react-stately';

import {
  FieldContainer,
  FieldProps,
  FieldSizes,
  FieldVariants,
  FieldWrapper,
  Label,
  Row,
} from '../../styled-components';
import { DateSegment } from './DateSegment';

type TimeValue = Time | CalendarDateTime | ZonedDateTime;

interface TimeFieldProps<T extends TimeValue>
  extends AriaTimeFieldProps<T>,
    FieldProps {
  onChange?: (value: TimeValue) => void;
}
export default function TimeField<T extends TimeValue>({
  size = 'md',
  variant = 'default',
  block,
  className,
  errorMessage,
  ...props
}: TimeFieldProps<T>) {
  const { locale } = useLocale();
  const { label, isDisabled } = props;
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const ref = useRef(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);
  return (
    <FieldContainer>
      {label !== undefined ? <Label {...labelProps}>{label}</Label> : null}
      <FieldWrapper
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
      >
        <Row {...fieldProps}>
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </Row>
        <div>
          <BiTime tw="h-6 w-6" />
        </div>
      </FieldWrapper>
    </FieldContainer>
  );
}
