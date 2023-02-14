import { ReactNode } from 'react';

import { TooltipContainer } from './Tooltip.styled';

export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right';
export type TooltipColor = 'black' | 'blue' | 'red' | 'green' | 'yellow';

interface TooltipProps {
  data: string;
  children: ReactNode;
  direction?: TooltipDirection;
  color?: TooltipColor;
}
export default function Tooltip({
  data,
  children,
  color = 'black',
  direction = 'top',
}: TooltipProps) {
  return <TooltipContainer data-tip={data}>{children}</TooltipContainer>;
}
