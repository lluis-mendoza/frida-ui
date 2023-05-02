import tw, { styled } from 'twin.macro';

const rowSizeSmall = 40;
const rowSizeMedium = 47;
const rowsSizeLarge = 54;

export const RowSizes = {
  sm: rowSizeSmall,
  md: rowSizeMedium,
  lg: rowsSizeLarge,
};

export const Label = tw.label`
  text-sm
  font-semibold
  text-slate-500
  leading-tight
  mb-1
`;

export const ListViewContainer = styled.div(() => [
  tw`
    relative
    h-full
    w-full
    overflow-auto
    scroll-smooth
    inline-flex
    flex-col
  `,
]);
export const ListViewWrapper = tw.div`
  relative
  flex-1
  overflow-auto
`;

interface ListRowWrapperProps {
  isSelected: boolean;
  isFirstrow: boolean;
  isDisabled: boolean;
}
export const ListRowWrapper = styled.div(
  ({ isSelected, isFirstrow, isDisabled }: ListRowWrapperProps) => [
    tw`
    relative
    h-full
    w-full
    min-w-full
    outline-none
    cursor-default
    px-3
    border-gray-300
    border-t-[1px]
    hover:bg-gray-100
    `,
    isSelected &&
      tw`
      bg-blue-200/75
      hover:bg-blue-200
    `,
    isFirstrow && tw`border-t-0`,
    isDisabled && tw`bg-gray-50`,
  ]
);

export const ListRow = tw.div`
    relative
    min-w-full
    w-full
    h-full
    inline-flex
    items-center
    gap-4
    font-semibold
    text-gray-800
    stroke-gray-800
    fill-gray-800
    truncate
`;
