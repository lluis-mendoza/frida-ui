import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import { AriaDateFieldProps, useDateField, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import {
  FieldContainer,
  FieldError,
  FieldProps,
  FieldSizes,
  FieldVariants,
  FieldWrapper,
  Label,
  Row,
} from '../../styled-components';
import { DateValue } from '../DatePicker';
import { DateSegment } from './DateSegment';

interface DateFieldProps<T extends DateValue>
  extends AriaDateFieldProps<T>,
    FieldProps {}
export function DateField<T extends DateValue>({
  block,
  className,
  size = 'md',
  variant = 'default',
  label,
  errorMessage,
  ...props
}: DateFieldProps<T>) {
  const { locale } = useLocale();
  const { isDisabled } = props;
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps, labelProps } = useDateField(props, state, ref);
  return (
    <FieldContainer block={block} className={className}>
      {label !== undefined ? <Label {...labelProps}>{label}</Label> : null}
      <FieldWrapper
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
      >
        <Row {...fieldProps} ref={ref}>
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </Row>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
    </FieldContainer>
  );
}
