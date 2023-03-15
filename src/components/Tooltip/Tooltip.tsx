import { ReactNode } from 'react';

import { tooltipColors, TooltipContainer } from './Tooltip.styled';

export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right';
export type TooltipColor = 'green' | 'yellow' | 'blue' | 'red' | 'gray';

interface TooltipProps {
  data: string;
  children: ReactNode;
  color?: TooltipColor;
}
export default function Tooltip({
  data,
  children,
  color = 'green',
}: TooltipProps) {
  return (
    <TooltipContainer data-tip={data} css={[tooltipColors[color]]}>
      {children}
    </TooltipContainer>
  );
}
