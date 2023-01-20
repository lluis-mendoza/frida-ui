import { ReactNode, useRef } from 'react';
import { AriaDialogProps, useDialog } from 'react-aria';

export interface DialogProps extends AriaDialogProps {
  title?: string;
  children: ReactNode;
}
export function Dialog({ title, children, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}
