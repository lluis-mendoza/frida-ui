import tw, { css, styled } from 'twin.macro';

export const TooltipContainer = styled.div(() => [
  tw`
        relative
        inline-block
        text-center
        after:(transition ease-in-out duration-150)
        before:(transition ease-in-out duration-150)
    `,
  css`
    --tooltip-offset: calc(100% + 1px + var(--tooltip-tail, 0px));
    --tooltip-tail: 4px;
    --tooltip-tail-offset: calc(100% + 1px - var(--tooltip-tail));
    &:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: var(--tooltip-tail, 0);
      width: 0;
      height: 0;
      display: block;
      transform: translate(-50%);
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
      top: auto;
      left: 50%;
      right: auto;
      bottom: var(--tooltip-tail-offset);
      opacity: 0;
    }
    &:hover:after,
    &:active:after {
      opacity: 1;
    }
    &:before {
      position: absolute;
      pointer-events: none;
      z-index: 1;
      content: var(--tw-content);
      --tw-content: attr(data-tip);
      max-width: 20rem;
      border-radius: 0.5rem;
      padding: 0.4rem 0.5rem;
      font-size: 1rem;
      line-height: 1.25rem;
      color: white;
      width: max-content;
      transform: translate(-50%);
      top: auto;
      left: 50%;
      right: auto;
      bottom: var(--tooltip-offset);
      opacity: 0;
    }
    &:hover:before,
    &:active:before {
      opacity: 1;
    }
  `,
]);

const tooltipColorGreen = tw`before:bg-green-500 after:border-t-green-500`;
const tooltipColorYellow = tw`before:bg-yellow-500 after:border-t-yellow-500`;
const tooltipColorBlue = tw`before:bg-blue-500 after:border-t-blue-500`;
const tooltipColorRed = tw`before:bg-red-500 after:border-t-red-500`;
const tooltipColorGray = tw`before:bg-gray-500 after:border-t-gray-500`;

export const tooltipColors = {
  green: tooltipColorGreen,
  yellow: tooltipColorYellow,
  blue: tooltipColorBlue,
  red: tooltipColorRed,
  gray: tooltipColorGray,
};
