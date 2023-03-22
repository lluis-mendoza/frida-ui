import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { BaseInput, InputProps } from './BaseInput';
import { Password, PasswordProps } from './Password';

export interface CompoundedComponent
  extends ForwardRefExoticComponent<
    InputProps & RefAttributes<HTMLInputElement>
  > {
  Password: ForwardRefExoticComponent<
    PasswordProps & RefAttributes<HTMLInputElement>
  >;
}

const Input = BaseInput as CompoundedComponent;
Input.Password = Password;
export default Input;
