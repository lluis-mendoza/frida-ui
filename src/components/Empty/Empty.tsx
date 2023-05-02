import {
  EmptyIcon,
  EmptyIconSizes,
  EmptyText,
  EmptyWrapper,
} from './Empty.styled';

type EmptySize = 'sm' | 'md' | 'lg';

export interface EmptyProps {
  size?: EmptySize;
}
export default function Empty({ size = 'md' }: EmptyProps) {
  return (
    <EmptyWrapper>
      <EmptyIcon css={[EmptyIconSizes[size]]} />
      <EmptyText>Sin datos</EmptyText>
    </EmptyWrapper>
  );
}
