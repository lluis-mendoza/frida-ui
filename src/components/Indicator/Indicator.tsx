import { ReactNode } from 'react';

import {
  indicatorColors,
  indicatorPositions,
  StyledIndicator,
} from './Indicator.styled';

export type IndicatorColor = 'green' | 'yellow' | 'blue' | 'red' | 'gray';
export type IndicatorPostion =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';
interface StatusLightProps {
  children: ReactNode;
  color?: IndicatorColor;
  position?: IndicatorPostion;
}
export function Indicator({
  children,
  color = 'green',
  position = 'top-end',
}: StatusLightProps) {
  return (
    <StyledIndicator
      css={[indicatorColors[color], indicatorPositions[position]]}
    >
      {children}
    </StyledIndicator>
  );
}
