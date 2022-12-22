import tw, { styled } from 'twin.macro';

export const InputContainer = tw.div`
    flex
    flex-col
`;

export const InputWrapper = styled.div(() => [
  tw`
    relative
    inline-flex
    flex-row
    items-center
    rounded-md
    overflow-hidden
    shadow-sm
    border-2
    border-solid
    focus-within:ring-1
    `,
]);
export const StyledInput = styled.input(() => [
  tw`
  w-full
  outline-none
  appearance-none
  bg-inherit
  text-inherit
  `,
]);

export const InputVariants = {
  default: tw`border-gray-300 focus-within:border-blue-600/[.70]`,
  warning: tw`border-amber-600 focus-within:border-amber-600/[.70]`,
  error: tw``,
};
export const InputSizes = {
  sm: tw`px-3 py-1`,
  md: tw`px-3 py-1`,
  lg: tw`px-3 py-1`,
  xl: tw`px-4 py-3 text-xl`,
};
