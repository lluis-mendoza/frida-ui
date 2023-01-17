import { ReactNode, RefObject, useRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';

import {
  FieldContainer,
  FieldError,
  FieldSize,
  FieldSizes,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { StyledInput } from './Input.styled';
import Password from './Password';

export type InputVariant = 'default' | 'warning' | 'error';
export enum InputType {
  NUMBER = 'number',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEXT = 'text',
  HIDDEN = 'hidden',
  CHECKBOX = 'checkbox',
}
export interface InputProps extends AriaTextFieldProps {
  size?: FieldSize;
  type?: InputType;
  variant?: InputVariant;
  prefix?: ReactNode;
  sufix?: ReactNode;
  block?: boolean;
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
  inputRef,
  errorMessage,
  className,
  ...props
}: InputProps) {
  const ref = useRef(null);
  const { label } = props;
  const { labelProps, inputProps } = useTextField(props, ref);
  return (
    <FieldContainer block={block} className={className}>
      {label !== undefined ? <Label {...labelProps}>{label}</Label> : null}
      <FieldWrapper css={[FieldVariants[variant], FieldSizes[size]]}>
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
