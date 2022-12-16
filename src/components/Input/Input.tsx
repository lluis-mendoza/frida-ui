import { ReactNode, useRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';

import {
  FieldContainer,
  FieldSize,
  FieldSizes,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { InputVariants, StyledInput } from './Input.styled';
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
}

function Input({
  size = 'md',
  type = InputType.TEXT,
  variant = 'default',
  prefix,
  sufix,
  block,
  ...props
}: InputProps) {
  const ref = useRef(null);
  const { label } = props;
  const { labelProps, inputProps } = useTextField(props, ref);
  return (
    <FieldContainer block={block}>
      {label !== null ? <Label {...labelProps}>{label}</Label> : null}
      <FieldWrapper css={[InputVariants[variant], FieldSizes[size]]}>
        {prefix}
        <StyledInput {...inputProps} type={type} />
        {sufix}
      </FieldWrapper>
    </FieldContainer>
  );
}

Input.Password = Password;
export default Input;
