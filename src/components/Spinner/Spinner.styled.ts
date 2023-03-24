import { keyframes } from '@emotion/react';
import tw, { css, styled } from 'twin.macro';

const spinnerColorInherit = tw`stroke-inherit`;
const spinnerColorPrimary = tw`stroke-blue-500`;
const spinnerColorSuccess = tw`stroke-green-500`;
const spinnerColorError = tw`stroke-red-500`;
const spinnerColorWarning = tw`stroke-yellow-500`;
const spinnerColorInfo = tw`stroke-gray-500`;
const spinnerColorWhite = tw`stroke-white`;

export const SpinnerColors = {
  inherit: spinnerColorInherit,
  primary: spinnerColorPrimary,
  success: spinnerColorSuccess,
  error: spinnerColorError,
  warning: spinnerColorWarning,
  info: spinnerColorInfo,
  white: spinnerColorWhite,
};
const rotate = keyframes`
  0% {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  100% {
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }
`;
export const SpinnerContainer = styled('svg')(() => [
  tw`
    h-full
    aspect-square
  `,
  css`
    animation: ${rotate} linear 1.4s infinite;
  `,
]);

const circleAnimation = keyframes`
  0% {
    stroke-dasharray: 0, 200;
    stroke-dashoffset: 0;
  }
  50%{
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -10;
  }
  100%{
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -150;
  }
`;
export const SpinnerCircle = styled('circle')(() => [
  tw`
    fill-transparent
  `,
  css`
    animation: ${circleAnimation} ease-in-out 1.4s infinite;
  `,
]);
