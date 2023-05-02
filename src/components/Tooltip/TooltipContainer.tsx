import { AriaTooltipProps, mergeProps, useTooltip } from 'react-aria';
import { TooltipTriggerState } from 'react-stately';

import {
  StyledTooltip,
  TooltipColors,
  TooltipPlacements,
} from './Tooltip.styled';

export type TooltipColor = 'primary' | 'success' | 'info' | 'warning' | 'error';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipContainerProps extends AriaTooltipProps {
  color?: TooltipColor;
  placement?: TooltipPlacement;
  state: TooltipTriggerState;
  children: React.ReactNode;
}
export default function TooltipContainer({
  color = 'primary',
  placement = 'top',
  state,
  children,
  ...props
}: TooltipContainerProps) {
  const { tooltipProps } = useTooltip(props, state);
  return (
    <StyledTooltip
      {...mergeProps(props, tooltipProps)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      css={[TooltipColors[color], TooltipPlacements[placement]]}
    >
      {children}
    </StyledTooltip>
  );
}
