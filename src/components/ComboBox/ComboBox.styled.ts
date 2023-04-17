import { FaChevronDown } from 'react-icons/fa';
import tw, { css, styled } from 'twin.macro';
export const StyledInput = styled.input(() => [
  tw`
    w-full
    outline-none
    appearance-none
    bg-inherit
    text-inherit
    `,
  css`
    &[disabled] {
      cursor: inherit;
    }
  `,
]);

interface SelectorIconProps {
  isFocusWithin: boolean;
}
export const SelectorIcon = styled(FaChevronDown)(
  ({ isFocusWithin }: SelectorIconProps) => [
    tw`text-gray-400 p-[0.15rem]`,
    isFocusWithin && tw`text-gray-600`,
  ]
);
