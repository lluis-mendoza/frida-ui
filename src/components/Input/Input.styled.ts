import tw, { css, styled } from 'twin.macro';

export const StyledInput = styled.input(() => [
  tw`
  w-full
  outline-none
  appearance-none
  bg-inherit
  text-inherit
  [-moz-appearance:_textfield]
  [&::-webkit-outer-spin-button]:m-0
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:m-0
  [&::-webkit-inner-spin-button]:appearance-none
  `,
  css`
    &[disabled] {
      cursor: inherit;
    }
  `,
]);
