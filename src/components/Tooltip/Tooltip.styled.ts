import tw, { css, styled } from 'twin.macro';

export const StyledTooltip = styled.span(() => [
  tw`
  absolute
  z-10
  max-w-[10rem]
  rounded
  px-2
  py-1
  text-white
`,
  css`
    &:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 5px;
      width: 0;
      height: 0;
      display: block;
    }
  `,
]);
const tooltipPlacementTop = tw`bottom-full mb-2 left-1/2 -translate-x-1/2 after:(border-x-transparent border-b-transparent left-1/2 -translate-x-1/2 top-full)`;
const tooltipPlacementBottom = tw`top-full mt-2 left-1/2 -translate-x-1/2 after:(border-x-transparent border-t-transparent left-1/2 -translate-x-1/2 bottom-full)`;
const tooltipPlacementLeft = tw`right-full mr-2 top-1/2 -translate-y-1/2 after:(border-y-transparent border-r-transparent top-1/2 -translate-y-1/2 left-full)`;
const tooltipPlacementRight = tw`left-full ml-2 top-1/2 -translate-y-1/2 after:(border-y-transparent border-l-transparent top-1/2 -translate-y-1/2 right-full)`;

export const tooltipPlacements = {
  top: tooltipPlacementTop,
  bottom: tooltipPlacementBottom,
  left: tooltipPlacementLeft,
  right: tooltipPlacementRight,
};
const tooltipColorGreen = tw`bg-green-500 after:border-green-500`;
const tooltipColorYellow = tw`bg-yellow-500 after:border-yellow-500`;
const tooltipColorBlue = tw`bg-blue-500 after:border-blue-500`;
const tooltipColorRed = tw`bg-red-500 after:border-red-500`;
const tooltipColorGray = tw`bg-gray-500 after:border-gray-500`;

export const tooltipColors = {
  green: tooltipColorGreen,
  yellow: tooltipColorYellow,
  blue: tooltipColorBlue,
  red: tooltipColorRed,
  gray: tooltipColorGray,
};
