import { SVGAttributes } from 'react';

import {
  SpinnerCircle,
  SpinnerColors,
  SpinnerContainer,
} from './Spinner.styled';

type SpinnerColor =
  | 'inherit'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'white';

interface SpinnerProps<T> extends SVGAttributes<T> {
  color?: SpinnerColor;
  strokeWidth?: string;
}
export default function Spinner<T>({
  color = 'primary',
  strokeWidth = '8%',
  ...props
}: SpinnerProps<T>) {
  return (
    <SpinnerContainer
      xmlns="http://www.w3.org/2000/svg"
      viewBox="22 22 44 44"
      {...props}
    >
      <SpinnerCircle
        cx="44"
        cy="44"
        r="20"
        css={SpinnerColors[color]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </SpinnerContainer>
  );
}
