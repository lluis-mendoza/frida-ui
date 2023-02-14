import { createCalendar, DateValue } from '@internationalized/date';
import { useRef } from 'react';
import { AriaDateFieldProps, useDateField, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import { Row } from '../../styled-components';
import { DateSegment } from './DateSegment';

interface DateFieldContentProps<T extends DateValue>
  extends AriaDateFieldProps<T> {}
export function DateFieldContent<T extends DateValue>(
  props: DateFieldContentProps<T>
) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <Row {...fieldProps} ref={ref}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </Row>
  );
}
