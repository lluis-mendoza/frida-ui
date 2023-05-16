import { motion } from 'framer-motion';
import { Fragment, ReactElement, useEffect, useState } from 'react';

export interface MultiStepProps {
  children: ReactElement[];
  duration?: number;
  currentStep: number;
  previousStep: number;
}

export function MultiStep({
  children,
  duration = 0.3,
  currentStep,
  previousStep,
}: MultiStepProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentStep === previousStep) return;
    setIsAnimating(true);
  }, [currentStep, previousStep]);

  return (
    <Fragment>
      <motion.div
        key={currentStep}
        tw="block p-2"
        initial={{
          x:
            currentStep === previousStep
              ? 0
              : currentStep > previousStep
              ? '100%'
              : '-100%',
        }}
        animate={{ x: 0 }}
        transition={{ ease: 'linear', duration }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {children[currentStep]}
      </motion.div>
      {isAnimating && (
        <motion.div
          key={previousStep}
          tw="absolute w-full h-full top-0 left-0 p-2"
          initial={{ x: 0 }}
          animate={{ x: currentStep < previousStep ? '100%' : '-100%' }}
          transition={{ ease: 'linear', duration }}
        >
          {children[previousStep]}
        </motion.div>
      )}
    </Fragment>
  );
}
