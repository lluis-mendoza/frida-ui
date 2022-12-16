import tw, { styled } from 'twin.macro';

export const ListGroupContainer = tw.div`
    relative
    flex
    flex-col
    w-full
`;
export const ListGroupWrapper = tw.div`
  relative
  inline-flex
  flex-col
`;
export const Label = tw.span`
  text-sm
  font-semibold
  text-slate-500
  leading-tight
`;
interface ListRowProps {
  isSelected: boolean;
}

export type ListRowSize = 'sm' | 'md' | 'lg';
const listRowSizeLarge = tw`text-lg px-5 h-12 min-w-[3rem]`;
const listRowMedium = tw`text-base px-3 h-11 min-w-[3rem]`;
const listRowSmall = tw`text-xs px-2 h-6 min-w-[1.5rem]`;

export const ListRowSizes = {
  sm: listRowSmall,
  md: listRowMedium,
  lg: listRowSizeLarge,
};

export const ListRow = styled.div(({ isSelected }: ListRowProps) => [
  tw`
        relative
        outline-none
        cursor-default
        inline-flex
        flex-row
        w-full
        items-center
        px-3
        border-gray-300
        border-t
        first:border-t-0
    `,
  isSelected &&
    tw`
        bg-blue-200/75
        hover:bg-blue-200
        !border-blue-600
        border-t
    `,
]);

export const ListCell = tw.div`
    relative
    inline-flex
    flex-row
    items-center
    justify-center
    gap-4
    font-semibold
    text-gray-800
    stroke-gray-800
    fill-gray-800
`;
