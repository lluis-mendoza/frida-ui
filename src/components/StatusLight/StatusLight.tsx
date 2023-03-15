import { ReactNode } from 'react';

import { StatusLightColors, StyledStatusLight } from './StatusLight.styled';

export type StatusLightColor = 'green' | 'yellow' | 'blue' | 'red' | 'gray';
interface StatusLightProps {
  children: ReactNode;
  color?: StatusLightColor;
}
export function StatusLight({ children, color = 'green' }: StatusLightProps) {
  return (
    <StyledStatusLight css={[StatusLightColors[color]]}>
      {children}
    </StyledStatusLight>
  );
}
