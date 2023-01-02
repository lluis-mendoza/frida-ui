import tw, { styled } from 'twin.macro';

export const CheckboxContainer = tw.label`
    flex
    items-center
`;

interface CheckboxState {
  isSelected: boolean;
  isIndeterminate: boolean;
}
export const CheckboxWrapper = styled.div(
  ({ isSelected, isIndeterminate }: CheckboxState) => [
    tw`
        rounded
        border-gray-300
        border-2
        w-5
        h-5
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
    w-3
    h-3
`;
