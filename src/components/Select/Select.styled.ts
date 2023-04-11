import { TbSelector } from 'react-icons/tb';
import tw, { styled } from 'twin.macro';

export const SelectButton = tw.button`
    outline-none
    inline-flex
    flex-row
    items-center
    justify-around
    w-full
    h-full
    gap-2
    text-gray-800
`;

export const SelectValue = styled.span(
  ({ hasValue }: { hasValue: boolean }) => [
    tw`
      whitespace-nowrap
    `,
    !hasValue && tw`!text-gray-400`,
  ]
);

export const SelectorIcon = tw(TbSelector)`text-gray-400`;
