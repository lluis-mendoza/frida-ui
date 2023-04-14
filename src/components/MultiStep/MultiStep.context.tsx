import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
} from 'react';

export interface IMultiStepContext {
  next: (index?: number) => void;
  back: (index?: number) => void;
  step: number;
  oldStep: number;
}
const MultiStepContext = createContext<IMultiStepContext>({
  next: () => undefined,
  back: () => undefined,
  step: 0,
  oldStep: 0,
});

interface MultiStepProviderProps {
  children?: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  oldStep: MutableRefObject<number>;
}

export const MultiStepProvider = ({
  children,
  step,
  setStep,
  oldStep,
}: MultiStepProviderProps) => {
  const next = (index = 1) => {
    setStep((_step) => {
      oldStep.current = _step;
      return _step + index;
    });
  };
  const back = (index = 1) => {
    setStep((_step) => {
      oldStep.current = _step;
      return _step - index;
    });
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
    throw new Error('MultiStepContext must be used within a MultiStepProvider');
  }
  return context;
};
