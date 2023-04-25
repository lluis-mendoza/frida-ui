import tw, { styled } from 'twin.macro';

export const CheckboxContainer = tw.label`
    inline-flex
    items-center
    relative
`;
export const CheckboxInput = tw.input`
  absolute
  inset-0
  w-full
  h-full
  opacity-0
`;

export const checkboxSizeLarge = tw`text-lg h-8 w-8`;
export const checkboxSizeMedium = tw`text-base h-5 w-5`;
export const checkboxSizeSmall = tw`text-xs h-4 w-4`;

export const CheckboxSizes = {
  sm: checkboxSizeSmall,
  md: checkboxSizeMedium,
  lg: checkboxSizeLarge,
};
interface CheckboxState {
  isSelected: boolean;
  isIndeterminate: boolean;
}
export const CheckboxWrapper = styled.span(
  ({ isSelected, isIndeterminate }: CheckboxState) => [
    tw`
        rounded
        border-gray-300
        border-2
        flex
        flex-shrink-0
        justify-center
        items-center
    `,
    (isIndeterminate || isSelected) &&
      tw`
    bg-blue-600
    border-blue-600
    focus-within:border-blue-400
    focus-within:hover:border-blue-500
  `,
    isSelected &&
      tw`

        focus-within:ring-1
    `,
  ]
);

export const ChecboxIcon = tw.svg`
    stroke-gray-100
    h-full
    w-full
`;
