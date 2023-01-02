import { keyframes } from '@emotion/react';
import tw, { css, styled } from 'twin.macro';

const PulseAnimation = keyframes`
0% {
    opacity: 1;
}
50% {
    opacity: 0.4;
}
100% {
    opacity: 1;
}
`;
export const StyledSkeleton = styled.span(() => [
  tw`
        block
        h-auto
        rounded-md
        bg-black/[0.11]
        flex-1
    `,
  css`
    animation: ${PulseAnimation} 1.5s ease-in-out 0.5s infinite;
    &::before {
      content: '\\00a0';
    }
  `,
]);
