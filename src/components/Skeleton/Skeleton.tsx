import { StyledSkeleton } from './Skeleton.styled';

interface SkeletonProps extends HTMLSpanElement {}
export default function Skeleton(props: SkeletonProps) {
  return <StyledSkeleton {...props} />;
}
