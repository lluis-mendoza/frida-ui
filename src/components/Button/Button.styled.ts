import tw, { css, styled } from 'twin.macro';

interface ButtonProps {
  block: boolean;
  isDisabled: boolean;
  isPressed: boolean;
  isFocusVisible: boolean;
  isLoading: boolean;
}

export const StyledButton = styled.button(
  ({
    block,
    isDisabled,
    isFocusVisible,
    isLoading,
    isPressed,
  }: ButtonProps) => [
    tw`
    relative
    inline-flex
    truncate
    appearance-none
    cursor-pointer
    select-none
    flex-nowrap
    items-center
    justify-center
    text-center
    transition-all
    duration-[250ms]
    ease-in-out
    rounded
    outline-none
    gap-2
    `,
    isPressed && tw`transform scale-95`,
    block && tw`w-full`,
    isDisabled && tw`cursor-not-allowed`,
    isFocusVisible && tw`ring-[3px]`,
    (isLoading || isDisabled) &&
      tw`(ring-0 bg-gray-200/[var(--tw-bg-opacity)] text-gray-400 border-gray-300 stroke-gray-400)!`,
    // Flickering text
    css`
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
    `,
  ]
);

const buttonText = tw`bg-opacity-0 hover:bg-opacity-10`;
const buttonContained = tw`text-gray-50 bg-opacity-90 hover:bg-opacity-100 stroke-white`;
const buttonOutlined = tw`border-2 border-solid bg-opacity-0 hover:bg-opacity-5`;

const buttonColorPrimary = tw`ring-blue-300 bg-blue-500 text-blue-500 border-blue-500 stroke-blue-500`;
const buttonColorSuccess = tw`ring-green-300 bg-green-500 text-green-500 border-green-500 stroke-green-500`;
const buttonColorError = tw`ring-red-300 bg-red-500 text-red-500 border-red-500 stroke-red-500`;
const buttonColorWarning = tw`ring-yellow-300 bg-yellow-500 text-yellow-500 border-yellow-500 stroke-yellow-500`;
const buttonColorInfo = tw`ring-gray-300 bg-gray-500 text-gray-500 border-gray-500 stroke-gray-500`;

const buttonSizeLarge = tw`text-lg px-5 h-14 min-w-[3.5rem]`;
const buttonSizeMedium = tw`text-base px-4 h-12 min-w-[3rem]`;
const buttonSizeSmall = tw`text-xs px-3 h-8 min-w-[2rem]`;

export const ButtonColors = {
  primary: buttonColorPrimary,
  success: buttonColorSuccess,
  error: buttonColorError,
  warning: buttonColorWarning,
  info: buttonColorInfo,
};
export const ButtonVariants = {
  text: buttonText,
  contained: buttonContained,
  outlined: buttonOutlined,
};
export const ButtonSizes = {
  sm: buttonSizeSmall,
  md: buttonSizeMedium,
  lg: buttonSizeLarge,
};

export const buttonSpinnerSizeLarge = tw`w-7 h-7`;
export const buttonSpinnerSizeMedium = tw`w-5 h-5`;
export const buttonSpinnerSizeSmall = tw`w-4 h-4`;

export const ButtonSpinnerSizes = {
  sm: buttonSpinnerSizeSmall,
  md: buttonSpinnerSizeMedium,
  lg: buttonSpinnerSizeLarge,
};
