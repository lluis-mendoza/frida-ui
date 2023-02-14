import { ReactNode } from 'react';

import { ToastContainer } from './Toast.styled';

interface ToastProps {
  children: ReactNode;
}

function Toast({ children }: ToastProps) {
  return <ToastContainer>{children}</ToastContainer>;
}

export default Toast;
