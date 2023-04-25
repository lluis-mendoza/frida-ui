import { ReactNode } from 'react';
import { AriaTooltipProps, mergeProps, useTooltip } from 'react-aria';
import { TooltipTriggerState } from 'react-stately';

import {
  StyledTooltip,
  tooltipColors,
  tooltipPlacements,
} from './Tooltip.styled';

export type TooltipColor = 'green' | 'yellow' | 'blue' | 'red' | 'gray';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps extends AriaTooltipProps {
  children: ReactNode;
  state?: TooltipTriggerState;
  color?: TooltipColor;
  placement?: TooltipPlacement;
}
export default function Tooltip({
  color = 'blue',
  placement = 'top',
  state,
  children,
  ...props
}: TooltipProps) {
  const { tooltipProps } = useTooltip(props, state);
  return (
    <StyledTooltip
      {...mergeProps(props, tooltipProps)}
      css={[tooltipColors[color], tooltipPlacements[placement]]}
    >
      {children}
    </StyledTooltip>
  );
}
