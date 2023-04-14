import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepContainerProps {
  children: ReactNode;
  step: number;
  oldStep: number;
}

const StepContainer = ({ children, step, oldStep }: StepContainerProps) => {
  return (
    <motion.div
      tw="relative block"
      initial={{ x: step > oldStep ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{
        x: step > oldStep ? '100%' : '-100%',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      transition={{ ease: 'linear', duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default StepContainer;
