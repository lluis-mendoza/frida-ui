import { SplitProps as SplitJSProps } from 'react-split';

import { StyledSplit } from './Split.styled';

interface SplitProps extends SplitJSProps {
  children: JSX.Element | JSX.Element[];
}
export default function Split({ children, ...props }: SplitProps) {
  return <StyledSplit {...props}>{children}</StyledSplit>;
}
