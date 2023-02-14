import tw, { css, styled } from 'twin.macro';

export type ListRowSize = 'sm' | 'md' | 'lg';
const itemSizeSmall = 40;
const itemSizeMedium = 47;
const itemsSizeLarge = 54;

export const ItemSizes = {
  sm: itemSizeSmall,
  md: itemSizeMedium,
  lg: itemsSizeLarge,
};
const listRowSizeLarge = tw`text-lg px-5 h-12 min-w-[3rem]`;
const listRowMedium = tw`text-base px-3 h-11 min-w-[3rem]`;
const listRowSmall = tw`text-xs px-2 h-6 min-w-[1.5rem]`;

export const ListRowSizes = {
  sm: listRowSmall,
  md: listRowMedium,
  lg: listRowSizeLarge,
};
export const Label = tw.label`
  text-sm
  font-semibold
  text-slate-500
  leading-tight
  mb-1
`;

interface ListViewContainerProps {
  heightAuto?: boolean;
  maxHeight?: string;
}
export const ListViewContainer = styled.div(
  ({ heightAuto, maxHeight }: ListViewContainerProps) => [
    tw`
  relative
  inline-flex
  flex-col
  w-full
  `,
    (heightAuto ?? false) && tw`h-full`,
    maxHeight !== undefined &&
      css`
        max-height: ${maxHeight};
      `,
  ]
);
interface ListViewWrapperProps {
  itemsToShow?: number;
  maxItemsToShow?: number;
  rowSize: ListRowSize;
}
export const ListViewWrapper = styled.div(
  ({ itemsToShow, maxItemsToShow, rowSize }: ListViewWrapperProps) => [
    tw`
      relative
      flex
      flex-col
      h-full
    `,
    itemsToShow !== undefined &&
      css`
        height: ${itemsToShow * ItemSizes[rowSize] + itemsToShow}px;
      `,
    maxItemsToShow !== undefined &&
      css`
        max-height: ${maxItemsToShow * ItemSizes[rowSize] + maxItemsToShow}px;
      `,
  ]
);

interface ListRowWrapperProps {
  isSelected: boolean;
  isFirstItem: boolean;
}
export const ListRowWrapper = styled.div(
  ({ isSelected, isFirstItem }: ListRowWrapperProps) => [
    tw`
    relative
    h-full
    w-auto!
    min-w-full
    outline-none
    cursor-default
    px-3
    border-gray-300
    border-t-[1px]
    `,
    isSelected &&
      tw`
      bg-blue-200/75
      hover:bg-blue-200
    `,
    isFirstItem && tw`border-t-0`,
  ]
);

export const ListRow = tw.div`
    relative
    min-w-full
    h-full
    inline-flex
    items-center
    gap-4
    font-semibold
    text-gray-800
    stroke-gray-800
    fill-gray-800
`;
