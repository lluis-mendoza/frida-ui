import React, { createContext, useContext, useRef, useState } from 'react';

export interface IMultiStepContext {
  next: () => void;
  back: () => void;
  step: number;
  oldStep: number;
}
const MultiStepContext = createContext<IMultiStepContext>({
  next: () => undefined,
  back: () => undefined,
  step: 0,
  oldStep: 0,
});

interface DatePickerProviderProps {
  children?: React.ReactNode;
}

export const MultiStepProvider = ({ children }: DatePickerProviderProps) => {
  const [step, setStep] = useState(0);
  const oldStep = useRef(0);
  const next = () => {
    oldStep.current = step;
    setStep(step + 1);
  };
  const back = () => {
    oldStep.current = step;
    setStep(step - 1);
  };
  return (
    <MultiStepContext.Provider
      value={{ next, back, step, oldStep: oldStep.current }}
    >
      {children}
    </MultiStepContext.Provider>
  );
};

export const useMultiStep = () => {
  const context = useContext(MultiStepContext);
  if (context === undefined) {
    throw new Error(
      'MultiStepContext must be used within a DatePickerProvider'
    );
  }
  return context;
};
