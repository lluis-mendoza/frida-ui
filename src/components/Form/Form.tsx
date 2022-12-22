import { FormHTMLAttributes, ReactNode } from 'react';

import { FormItem } from './FormItem';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
function Form({ children, ...formProps }: FormProps) {
  return <form {...formProps}>{children}</form>;
}

Form.Item = FormItem;
export default Form;
