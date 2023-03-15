import tw, { styled } from 'twin.macro';

export const StyledIndicator = styled.span(() => [
  tw`
      absolute
      whitespace-nowrap
      inline-flex
      items-center
      justify-center
      z-10
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      px-2
    `,
]);

const indicatorColorGreen = tw`bg-green-500`;
const indicatorColorYellow = tw`bg-yellow-500`;
const indicatorColorBlue = tw`bg-blue-500`;
const indicatorColorRed = tw`bg-red-500`;
const indicatorColorGray = tw`bg-gray-500`;

export const indicatorColors = {
  green: indicatorColorGreen,
  yellow: indicatorColorYellow,
  blue: indicatorColorBlue,
  red: indicatorColorRed,
  gray: indicatorColorGray,
};

const indicatorTopStart = tw`right-0 top-0`;
const indicatorTopCenter = tw`right-1/2 top-0`;
const indicatorTopEnd = tw`left-0 top-0`;
const indicatorMiddleStart = tw`right-0 top-1/2`;
const indicatorMiddleCenter = tw`right-1/2 top-1/2`;
const indicatorMiddleEnd = tw`left-0 top-1/2`;
const indicatorBottomStart = tw`right-0 bottom-0`;
const indicatorBottomCenter = tw`right-1/2 bottom-0`;
const indicatorBottomEnd = tw`left-0 bottom-0`;

export const indicatorPositions = {
  'top-start': indicatorTopStart,
  'top-center': indicatorTopCenter,
  'top-end': indicatorTopEnd,
  'middle-start': indicatorMiddleStart,
  'middle-center': indicatorMiddleCenter,
  'middle-end': indicatorMiddleEnd,
  'bottom-start': indicatorBottomStart,
  'bottom-center': indicatorBottomCenter,
  'bottom-end': indicatorBottomEnd,
};
