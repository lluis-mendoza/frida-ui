import { TailSpin } from 'react-loading-icons';

import {
  SpinnerColors,
  SpinnerSizes,
  SpinnerStrokeWidth,
  SpinnerVariants,
} from './Spinner.styled';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'primary' | 'success' | 'info' | 'warning' | 'error';
type SpinnerVariant = 'text' | 'contained' | 'outlined';

interface SpinnerProps {
  variant?: SpinnerVariant;
  color?: SpinnerColor;
  size?: SpinnerSize;
}
export default function Spinner({
  variant = 'contained',
  color = 'primary',
  size = 'md',
}: SpinnerProps) {
  return (
    <TailSpin
      css={[SpinnerColors[color], SpinnerVariants[variant], SpinnerSizes[size]]}
      strokeWidth={SpinnerStrokeWidth[size]}
    />
  );
}
