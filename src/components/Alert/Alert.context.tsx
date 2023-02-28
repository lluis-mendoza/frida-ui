import { createContext, useContext, useEffect, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { Alert, AlertProps } from './Alert';
import { useAlert } from './hooks';

interface IProps {
  children: JSX.Element | JSX.Element[];
}
interface QueueAlertProps extends Omit<AlertProps, 'state'> {}

export interface IAlertContext {}
export const AlertContextEmptyState: IAlertContext = {};
const AlertContext = createContext<IAlertContext>(AlertContextEmptyState);

export const AlertProvider = ({ children }: IProps) => {
  return (
    <AlertContext.Provider value={{ raiseAlert }}>
      <TransitionGroup>
        {currentAlert !== null && (
          <Transition timeout={{ exit: 200 }}>
            <Alert state={state} {...currentAlert} />
          </Transition>
        )}
      </TransitionGroup>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('AlertContext must be used within a AlertProvider');
  }
  return context;
};
