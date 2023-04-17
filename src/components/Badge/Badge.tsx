import { ReactNode } from 'react';

import {
  BadgeColors,
  BadgeSizes,
  BadgeVariants,
  StyledBadge,
} from './Badge.styled';

export type BadgeSize = 'xs' | 'sm' | 'md';
export type BadgeColor = 'green' | 'yellow' | 'blue' | 'red' | 'gray';
export type BadgeVariant = 'contained' | 'outlined';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
}
export default function Badge({
  children,
  color = 'blue',
  variant = 'outlined',
  size = 'md',
}: BadgeProps) {
  return (
    <StyledBadge
      css={[BadgeColors[color], BadgeVariants[variant], BadgeSizes[size]]}
    >
      {children}
    </StyledBadge>
  );
}
