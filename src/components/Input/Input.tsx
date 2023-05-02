import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { BaseInput, InputProps } from './BaseInput';
import { Copy, CopyProps } from './Copy';
import { Password, PasswordProps } from './Password';

export interface CompoundedComponent
  extends ForwardRefExoticComponent<
    InputProps & RefAttributes<HTMLInputElement>
  > {
  Password: ForwardRefExoticComponent<
    PasswordProps & RefAttributes<HTMLInputElement>
  >;
  Copy: ForwardRefExoticComponent<CopyProps & RefAttributes<HTMLInputElement>>;
}

const Input = BaseInput as CompoundedComponent;
Input.Password = Password;
Input.Copy = Copy;

export default Input;
