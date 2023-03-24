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
  color = 'inherit',
  className,
  strokeWidth = '4px',
}: SpinnerProps) {
  return (
    <SpinnerContainer className={className}>
      <SpinnerCircle
        css={SpinnerColors[color]}
        r={`calc( 50% - ${strokeWidth})`}
        cx="50%"
        cy="50%"
      />
    </SpinnerContainer>
  );
}
