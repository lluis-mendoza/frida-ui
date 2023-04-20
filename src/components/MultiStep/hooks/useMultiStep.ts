import { useCallback, useState } from 'react';

export interface MultiStepStateProps {
  defaultStep?: number;
  maxSteps?: number;
}
export interface MultiStepState {
  currentStep: number;
  previousStep: number;
  next: (index?: number) => void;
  back: (index?: number) => void;
  setStep: (index: number) => void;
}
const useMultiStep = ({
  defaultStep = 0,
  maxSteps,
}: MultiStepStateProps): MultiStepState => {
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [previousStep, setPreviousStep] = useState(defaultStep);

  const next = useCallback(
    (index = 1) => {
      setCurrentStep((_currentStep) => {
        if (maxSteps && _currentStep + index >= maxSteps) return _currentStep;
        setPreviousStep(_currentStep);
        return _currentStep + index;
      });
    },
    [maxSteps]
  );
  const back = useCallback((index = 1) => {
    setCurrentStep((_currentStep) => {
      if (_currentStep - index <= 0) return _currentStep;
      setPreviousStep(_currentStep);
      return _currentStep - index;
    });
  }, []);
  const setStep = useCallback(
    (index: number) => {
      setCurrentStep((_currentStep) => {
        if ((maxSteps && index >= maxSteps) ?? index < 0) return _currentStep;
        setPreviousStep(_currentStep);
        return index;
      });
    },
    [maxSteps]
  );

  return {
    currentStep,
    previousStep,
    next,
    back,
    setStep,
  };
};

export default useMultiStep;
