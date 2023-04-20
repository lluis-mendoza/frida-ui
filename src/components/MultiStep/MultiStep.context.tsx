import { createContext, useContext } from 'react';

import useMultiStep, { MultiStepState } from './hooks/useMultiStep';
import { MultiStep, MultiStepProps } from './MultiStep';

interface IProps extends MultiStepProps {}

export interface IMultiStepContext extends MultiStepState {}

const MultiStepContext = createContext<IMultiStepContext>({
  next: () => undefined,
  back: () => undefined,
  setStep: () => undefined,
  currentStep: 0,
  previousStep: 0,
});

export const MultiStepProvider = ({ children, ...props }: IProps) => {
  const state = useMultiStep({});

  return (
    <MultiStepContext.Provider value={state}>
      <MultiStep {...props}>{children}</MultiStep>
    </MultiStepContext.Provider>
  );
};

export const useMultiStepContext = () => {
  const context = useContext(MultiStepContext);
  if (context === undefined) {
    throw new Error('MultiStepContext must be used within a MultiStepProvider');
  }
  return context;
};
