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

export const SelectorIcon = styled(FaChevronDown)(() => [tw`text-gray-400`]);
