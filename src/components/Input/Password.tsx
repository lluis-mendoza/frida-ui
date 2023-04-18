import { ForwardedRef, forwardRef, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import { FieldButton, FieldIconSizes } from '../../styled-components';
import { BaseInput, InputProps } from './BaseInput';

export interface PasswordProps extends InputProps {}

export const Password = forwardRef(function Password(
  props: PasswordProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { size = 'md' } = props;
  return (
    <BaseInput
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      sufix={
        <FieldButton
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <BiHide css={FieldIconSizes[size]} />
          ) : (
            <BiShow css={FieldIconSizes[size]} />
          )}
        </FieldButton>
      }
    />
  );
});
