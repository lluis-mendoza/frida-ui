import { EmptyIcon, EmptyText, EmptyWrapper } from './Empty.styled';

export default function Empty() {
  return (
    <EmptyWrapper>
      <EmptyIcon />
      <EmptyText>Sin datos</EmptyText>
    </EmptyWrapper>
  );
}
