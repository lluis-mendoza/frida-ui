import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { useMultiStep } from './MultiStep.context';

interface StepContainerProps {
  children: ReactNode;
  index: number;
}

const StepContainer = ({ children, index }: StepContainerProps) => {
  const { step, oldStep } = useMultiStep();
  if (step !== index) return null;
  return (
    <motion.div
      tw="inline"
      initial={{ x: step > oldStep ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{
        x: step > oldStep ? '100%' : '-100%',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default StepContainer;
