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

interface SpinnerProps {
  color?: SpinnerColor;
  className?: string;
  strokeWidth?: string;
}
export default function Spinner({
  color = 'primary',
  className,
  strokeWidth = '8%',
}: SpinnerProps) {
  return (
    <SpinnerContainer
      xmlns="http://www.w3.org/2000/svg"
      viewBox="22 22 44 44"
      className={className}
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
