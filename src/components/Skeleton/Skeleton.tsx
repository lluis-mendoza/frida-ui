import { StyledSkeleton } from './Skeleton.styled';

interface SkeletonProps {}
export default function Skeleton(props: SkeletonProps) {
  return <StyledSkeleton {...props} />;
}
