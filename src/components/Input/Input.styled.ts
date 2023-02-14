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
