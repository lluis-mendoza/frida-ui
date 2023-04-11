import { AnimatePresence } from 'framer-motion';
import { ReactElement } from 'react';

import { MultiStepProvider } from './MultiStep.context';
import StepContainer from './StepContainer';

export type Step = () => ReactElement;
export interface MultiStepProps {
  steps: Step[];
}
export default function MultiStep({ steps }: MultiStepProps) {
  return (
    <MultiStepProvider>
      <AnimatePresence initial={false}>
        {steps.map((stepContent, index) => (
          <StepContainer key={index} index={index}>
            {stepContent()}
          </StepContainer>
        ))}
      </AnimatePresence>
    </MultiStepProvider>
  );
}
