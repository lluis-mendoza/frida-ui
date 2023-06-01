import { HTMLProps } from 'react';

import { StyledSkeleton } from './Skeleton.styled';

interface SkeletonProps extends HTMLProps<HTMLSpanElement> { }
export default function Skeleton(props: SkeletonProps) {
  return <StyledSkeleton {...props} />;
}
