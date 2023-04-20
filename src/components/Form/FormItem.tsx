import React, { ReactElement } from 'react';
import {
  FieldErrors,
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
  errors?: FieldErrors;
  adaptToFormValue?: (value: any) => any;
  adaptToValue?: (value: any) => any;
}
export function FormItem<TFormValues extends Record<string, unknown>>({
  children,
  errors,
  adaptToFormValue = (value) => value,
  adaptToValue = (value) => value,
  ...controllerProps
}: FormItemProps<TFormValues>) {
  const { name } = controllerProps;
  const {
    field: { value, onChange },
  } = useController(controllerProps);
  const error = errors?.[name];
  const variant = error !== undefined ? 'error' : 'default';
  return (
    <React.Fragment>
      {React.cloneElement(children, {
        value: adaptToValue(value),
        onChange: (value: any) => onChange(adaptToFormValue(value)),
        variant,
        errorMessage: error?.message,
      })}
    </React.Fragment>
  );
}
