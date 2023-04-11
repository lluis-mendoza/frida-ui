import { AnimatePresence } from 'framer-motion';
import { ReactElement, useRef, useState } from 'react';

import { MultiStepProvider } from './MultiStep.context';
import StepContainer from './StepContainer';

export interface MultiStepProps {
  children: ReactElement[];
}
export default function MultiStep({ children }: MultiStepProps) {
  const [step, setStep] = useState(0);
  const oldStep = useRef(0);
  const providerProps = { step, setStep, oldStep };
  return (
    <MultiStepProvider {...providerProps}>
      <AnimatePresence initial={false}>
        {children.map((stepContent, index) =>
          step === index ? (
            <StepContainer key={index} step={step} oldStep={0}>
              {stepContent}
            </StepContainer>
          ) : null
        )}
      </AnimatePresence>
    </MultiStepProvider>
  );
}
