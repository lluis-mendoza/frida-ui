import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import { AriaDateFieldProps, useDateField, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import { DateValue } from '../DatePicker';
import { DateFieldWrapper } from './DateField.styled';
import { DateSegment } from './DateSegment';

interface DateFieldProps<T extends DateValue> extends AriaDateFieldProps<T> {}
export function DateField<T extends DateValue>(props: DateFieldProps<T>) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <DateFieldWrapper {...fieldProps} ref={ref}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </DateFieldWrapper>
  );
}
