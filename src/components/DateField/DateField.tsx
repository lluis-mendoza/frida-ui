import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import { AriaDateFieldProps, useDateField, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import { DateValue } from '../DatePicker';
import { DateSegment } from '../TimeField/DateSegment';

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
    <div {...fieldProps} ref={ref} tw="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}
