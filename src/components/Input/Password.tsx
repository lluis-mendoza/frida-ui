import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

import Input, { InputProps, InputType } from './Input';
export interface PasswordProps extends InputProps {}

export default function Password({ ...props }: PasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Input
      {...props}
      type={showPassword ? InputType.TEXT : InputType.PASSWORD}
      sufix={
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {!showPassword ? <BiHide /> : <BiShow />}
        </button>
      }
    />
  );
}
