import tw, { styled } from 'twin.macro';

export const SelectButton = tw.button`
    outline-none
    inline-flex
    flex-row
    items-center
    justify-between
    w-full
`;

export const SelectValue = styled.span(
  ({ hasValue }: { hasValue: boolean }) => [!hasValue && tw`!text-gray-400`]
);
