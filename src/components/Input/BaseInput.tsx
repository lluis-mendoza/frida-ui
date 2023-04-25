import { useObjectRef } from '@react-aria/utils';
import { forwardRef, ReactNode } from 'react';
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

export interface InputProps extends AriaTextFieldProps, FieldProps {
  prefix?: ReactNode;
  sufix?: ReactNode;
}

export const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      size = 'md',
      variant = 'default',
      prefix,
      sufix,
      block,
      className,
      errorMessage,
      ...props
    },
    forwardRef
  ) {
    const ref = useObjectRef(forwardRef);
    const { label, isDisabled, isRequired } = props;
    const { labelProps, inputProps } = useTextField(props, ref);
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
          <StyledInput {...inputProps} ref={ref} />
          {sufix}
        </FieldWrapper>
        {errorMessage !== undefined ? (
          <FieldError>{errorMessage}</FieldError>
        ) : null}
      </FieldContainer>
    );
  }
);
