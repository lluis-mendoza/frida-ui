import tw, { css, styled } from 'twin.macro';

import { ListRowSize } from './ListView';

const itemSizeSmall = 40;
const itemSizeMedium = 47;
const itemsSizeLarge = 54;

export const ItemSizes = {
  sm: itemSizeSmall,
  md: itemSizeMedium,
  lg: itemsSizeLarge,
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
    inline-flex
    flex-col
    flex-1
  `,
]);
interface ListViewWrapperProps {
  itemsToShow?: number;
  maxItemsToShow?: number;
  rowSize: ListRowSize;
}
export const ListViewWrapper = styled.div(
  ({ itemsToShow, maxItemsToShow, rowSize }: ListViewWrapperProps) => [
    tw`
      relative
      flex-1
    `,
    itemsToShow &&
      css`
        height: ${itemsToShow * ItemSizes[rowSize]}px;
      `,
    maxItemsToShow &&
      css`
        max-height: ${maxItemsToShow * ItemSizes[rowSize]}px;
      `,
  ]
);

interface ListRowWrapperProps {
  isSelected: boolean;
  isFirstItem: boolean;
  isDisabled: boolean;
}
export const ListRowWrapper = styled.div(
  ({ isSelected, isFirstItem, isDisabled }: ListRowWrapperProps) => [
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
    isFirstItem && tw`border-t-0`,
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
`;
