import { ReactNode, RefObject, useRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';

import {
  FieldContainer,
  FieldError,
  FieldProps,
  FieldSizes,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { StyledInput } from './Input.styled';
import Password from './Password';

export enum InputType {
  NUMBER = 'number',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEXT = 'text',
  HIDDEN = 'hidden',
  CHECKBOX = 'checkbox',
}
export interface InputProps extends AriaTextFieldProps, FieldProps {
  type?: InputType;
  prefix?: ReactNode;
  sufix?: ReactNode;
  inputRef?: RefObject<HTMLInputElement>;
  className?: string;
}

function Input({
  size = 'md',
  type = InputType.TEXT,
  variant = 'default',
  prefix,
  sufix,
  block,
  className,
  inputRef,
  errorMessage,
  ...props
}: InputProps) {
  const ref = useRef(null);
  const { label, isDisabled, isRequired } = props;
  const { labelProps, inputProps } = useTextField(props, ref);
  console.log(labelProps);
  return (
    <FieldContainer block={block} className={className}>
      {label !== undefined ? (
        <Label {...labelProps} isRequired={isRequired}>
          {label}
        </Label>
      ) : null}
      <FieldWrapper
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
      >
        {prefix}
        <StyledInput {...inputProps} type={type} ref={inputRef} />
        {sufix}
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
    </FieldContainer>
  );
}

Input.Password = Password;
export default Input;
