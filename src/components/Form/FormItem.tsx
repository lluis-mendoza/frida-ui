import { cloneElement, Fragment, ReactElement } from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName> {
  children: ReactElement;
}
export function FormItem<TFormValues extends Record<string, unknown>>({
  children,
  ...controllerProps
}: FormItemProps<TFormValues>) {
  const { field } = useController(controllerProps);

  const value = field.value;
  return (
    <Fragment>
      {cloneElement(children, { value, onChange: field.onChange })}
    </Fragment>
  );
}
