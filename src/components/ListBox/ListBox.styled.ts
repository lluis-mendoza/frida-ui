import tw, { styled } from 'twin.macro';

export const List = tw.ul`
    w-full
    overflow-auto
    outline-none
`;
export const ItemSection = tw.li`
    pt-2
`;

export const SectionTitle = tw.span`
    text-xs
    font-bold
    uppercase
    text-gray-500
    mx-3
`;
interface OptionStateProps {
  isFocused: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}
export const StyledOption = styled.li(
  ({ isFocused, isSelected, isDisabled }: OptionStateProps) => [
    tw`
          m-1
          rounded-md
          py-2
          px-2
          text-sm
          outline-none
          cursor-default
          flex
          items-center
          justify-between
          text-gray-700
      `,
    (isFocused || isSelected) && tw`text-blue-800 bg-blue-200`,
    isDisabled && tw`text-gray-200`,
    isSelected && tw`font-bold`,
  ]
);
