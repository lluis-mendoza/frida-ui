import tw, { css, styled } from 'twin.macro';

interface ToggleButtonProps {
  isSelected: boolean;
  block: boolean;
  isDisabled?: boolean;
  isFocusVisible?: boolean;
}
export const StyledToggleButton = styled.button(
  ({ isSelected, block, isDisabled, isFocusVisible }: ToggleButtonProps) => [
    tw`
    relative
    inline-flex
    truncate
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
    !isSelected && tw`bg-gray-300! text-gray-500! stroke-gray-500!`,
    isSelected && tw`text-white! stroke-white!`,
    block && tw`w-full`,
    isFocusVisible && tw`ring-[3px]`,
    isDisabled &&
      tw`cursor-not-allowed (ring-0 bg-gray-200/[var(--tw-bg-opacity)] text-gray-400 border-gray-300 stroke-gray-400)!`,
    tw`bg-opacity-90! hover:bg-opacity-100!`,
    // Flickering text
    css`
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
    `,
  ]
);

export const toggleButtonColorPrimary = tw`ring-blue-300 bg-blue-500 text-blue-500 border-blue-500 stroke-blue-500`;
export const toggleButtonColorSuccess = tw`ring-green-300 bg-green-500 text-green-500 border-green-500 stroke-green-500`;
export const toggleButtonColorError = tw`ring-red-300 bg-red-500 text-red-500 border-red-500 stroke-red-500`;
export const toggleButtonColorWarning = tw`ring-yellow-300 bg-yellow-500 text-yellow-500 border-yellow-500 stroke-yellow-500`;
export const toggleButtonColorInfo = tw`ring-gray-300 bg-gray-500 text-gray-500 border-gray-500 stroke-gray-500`;

export const toggleButtonSizeLarge = tw`text-lg px-5 h-14 min-w-[3.5rem]`;
export const toggleButtonSizeMedium = tw`text-base px-4 h-12 min-w-[3rem]`;
export const toggleButtonSizeSmall = tw`text-xs px-3 h-8 min-w-[2rem]`;

export const ToggleButtonColors = {
  primary: toggleButtonColorPrimary,
  success: toggleButtonColorSuccess,
  error: toggleButtonColorError,
  warning: toggleButtonColorWarning,
  info: toggleButtonColorInfo,
};
export const ToggleButtonSizes = {
  sm: toggleButtonSizeSmall,
  md: toggleButtonSizeMedium,
  lg: toggleButtonSizeLarge,
};
