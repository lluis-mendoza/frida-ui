import { ForwardedRef, forwardRef, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import { InputProps, InputType } from './BaseInput';
import Input from './Input';

export interface PasswordProps extends InputProps {}

export const Password = forwardRef(function Password(
  { ...props }: PasswordProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Input
      {...props}
      ref={ref}
      type={showPassword ? InputType.TEXT : InputType.PASSWORD}
      sufix={
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {!showPassword ? <BiHide /> : <BiShow />}
        </button>
      }
    />
  );
});
