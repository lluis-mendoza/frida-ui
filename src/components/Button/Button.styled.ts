import tw, { styled } from 'twin.macro';

interface ButtonProps {
  block?: boolean;
  isDisabled?: boolean;
}
export const StyledButton = styled.button(
  ({ block, isDisabled }: ButtonProps) => [
    tw`
    relative
    appearance-none
    rounded
    font-semibold
    inline-flex
    items-center
    justify-center
    transition-all
    duration-[250ms]
    ease-in
    select-none
    whitespace-nowrap
    border-none
    outline-none
    focus:ring-[3px]
    gap-2
  `,
    (block ?? false) && tw`w-full`,
    (isDisabled ?? false) && tw`cursor-not-allowed opacity-40`,
  ]
);

export const buttonText = tw`bg-opacity-0 hover:bg-opacity-10`;
export const buttonContained = tw`text-gray-50 bg-opacity-90 hover:bg-opacity-100`;
export const buttonOutlined = tw`border-2 !border-solid bg-opacity-0 hover:bg-opacity-5`;

export const buttonColorPrimary = tw`ring-blue-300 bg-blue-500 text-blue-500 border-blue-500`;
export const buttonColorSuccess = tw`ring-green-300 bg-green-500 text-green-500 border-green-500`;
export const buttonColorError = tw`ring-red-300 bg-red-500 text-red-500 border-red-500`;
export const buttonColorWarning = tw`ring-yellow-300 bg-yellow-500 text-yellow-500 border-yellow-500`;
export const buttonColorInfo = tw`ring-gray-300 bg-gray-500 text-gray-500 border-gray-500`;

export const buttonSizeLarge = tw`text-lg px-5 h-12 min-w-[3rem]`;
export const buttonSizeMedium = tw`text-base px-3 h-11 min-w-[3rem]`;
export const buttonSizeSmall = tw`text-xs px-2 h-6 min-w-[1.5rem]`;

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
