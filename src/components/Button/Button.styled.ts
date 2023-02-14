import tw, { css, styled } from 'twin.macro';

interface ButtonProps {
  block?: boolean;
  isDisabled?: boolean;
  isFocusVisible?: boolean;
}

export const StyledButton = styled.button(
  ({ block, isDisabled, isFocusVisible }: ButtonProps) => [
    tw`
    inline-flex
    flex-shrink-0
    appearance-none
    cursor-pointer
    select-none
    flex-wrap
    items-center
    justify-center
    text-center
    transition-all
    duration-[250ms]
    ease-in-out
    rounded
    outline-none
    gap-2
    active:focus:(
      transform
      scale-95
    )
    `,
    (block ?? false) && tw`w-full`,
    (isDisabled ?? false) && tw`cursor-not-allowed opacity-40`,
    (isFocusVisible ?? false) && tw`ring-[3px]`,
    // Flickering text
    css`
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
    `,
  ]
);

export const buttonText = tw`bg-opacity-0 hover:bg-opacity-10`;
export const buttonContained = tw`text-gray-50 bg-opacity-90 hover:bg-opacity-100`;
export const buttonOutlined = tw`border-2 border-solid bg-opacity-0 hover:bg-opacity-5`;

export const buttonColorPrimary = tw`ring-blue-300 bg-blue-500 text-blue-500 border-blue-500`;
export const buttonColorSuccess = tw`ring-green-300 bg-green-500 text-green-500 border-green-500`;
export const buttonColorError = tw`ring-red-300 bg-red-500 text-red-500 border-red-500`;
export const buttonColorWarning = tw`ring-yellow-300 bg-yellow-500 text-yellow-500 border-yellow-500`;
export const buttonColorInfo = tw`ring-gray-300 bg-gray-500 text-gray-500 border-gray-500`;

export const buttonSizeLarge = tw`text-lg px-5 h-14 min-w-[3.5rem]`;
export const buttonSizeMedium = tw`text-base px-4 h-12 min-w-[3rem]`;
export const buttonSizeSmall = tw`text-xs px-3 h-8 min-w-[2rem]`;

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
