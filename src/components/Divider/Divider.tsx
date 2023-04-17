import { ReactNode } from 'react';

import { StyledDivider } from './Divider.styled';

export interface DividerProps {
  children?: ReactNode;
  horizontal?: boolean;
}
export default function Divider({
  children,
  horizontal = false,
}: DividerProps) {
  return <StyledDivider horizontal={horizontal}>{children}</StyledDivider>;
}
