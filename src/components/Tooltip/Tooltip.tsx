import { AnimatePresence } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { TooltipTriggerProps, useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';

import { Container, Trigger } from './Tooltip.styled';
import TooltipContainer, { TooltipContainerProps } from './TooltipContainer';

interface TooltipProps
  extends Omit<TooltipContainerProps, 'state'>,
    TooltipTriggerProps {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
}
export default function Tooltip({
  children,
  tooltip,
  className,
  ...props
}: TooltipProps) {
  const state = useTooltipTriggerState({
    ...props,
    delay: 100,
  });
  const ref = useRef(null);
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);
  return (
    <Container className={className}>
      <Trigger ref={ref} {...triggerProps}>
        {children}
      </Trigger>
      <AnimatePresence>
        {state.isOpen && (
          <TooltipContainer state={state} {...tooltipProps} {...props}>
            {tooltip}
          </TooltipContainer>
        )}
      </AnimatePresence>
    </Container>
  );
}
