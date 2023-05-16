import { BiSearch } from 'react-icons/bi';
import tw, { css, styled } from 'twin.macro';

export const Container = tw.div`
  relative
  h-full
  w-full
  overflow-auto
  scroll-smooth
`;

export const TableElement = tw.table`w-full`;
export const BodyContainer = tw.tbody`outline-none`;
export const HeaderContainer = tw.thead`sticky top-0 z-10`;

export const Row = tw.tr`
  flex
  w-full
  border-b
  border-gray-300/40
  border-solid`;

export const HeaderRow = tw(Row)`
  bg-gray-100
`;
interface BodyRowProps {
  isSelected: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}
export const BodyRow = styled(Row)(
  ({ isSelected, isFocused, isDisabled }: BodyRowProps) => [
    tw`
    bg-white
      hover:bg-gray-100/[0.75]
    `,
    isFocused && tw`bg-blue-200 hover:bg-blue-300/[0.75]`,
    isSelected && tw`bg-blue-200 hover:bg-blue-300/[0.75]`,
    isDisabled &&
      tw`bg-gray-50 hover:bg-gray-50 [&>*]:(text-gray-500! ) cursor-not-allowed`,
  ]
);

const Cell = tw`items-center inline-flex text-left px-4 overflow-hidden h-full bg-inherit select-none`;

interface BodyCellProps {
  width: number;
}
export const BodyCell = styled.td(({ width }: BodyCellProps) => [
  Cell,
  tw`
    text-gray-800
    font-normal
    text-base
  `,
  css`
    width: ${width}px;
  `,
]);
interface HeaderCellProps {
  width: number;
}
export const HeaderCell = styled.th(({ width }: HeaderCellProps) => [
  Cell,
  tw`
  text-gray-700
    font-semibold
    text-base
    sticky
  `,
  css`
    width: ${width}px;
  `,
]);

export const EmptyContainer = tw(Row)`
  h-full
  inset-0
  inline-flex
  items-center
  justify-center
  sticky
`;
export const CellContent = tw.div`
  text-ellipsis
  whitespace-nowrap
  overflow-hidden
`;
export const CellGrouped = styled.button(() => [
  tw`
  inline-flex
  items-center
  gap-1
  font-semibold
  text-gray-700
`,
]);
export const ColumnResizer = styled.div(() => [
  tw`
    absolute
    top-1/2
    transform
    -translate-y-1/2
    w-[5px]
    h-[1.6rem]
    right-0 
    cursor-col-resize

  `,
  tw`
    before:(
      absolute
      left-1/2
      transform
      translate-x-1/2
      h-full
      w-[1px]
      bg-gray-300
    )
  `,
]);
export const FilterButton = tw.button`
  outline-none
  relative
  appearance-none
  rounded
  border-none
  select-none
  hover:bg-gray-200
  p-1
  mx-[0.2rem]
`;
interface FilterSearchIconProps {
  isFiltered: boolean;
}
export const FilterSearchIcon = styled(BiSearch, {
  shouldForwardProp: (prop: any) => prop !== 'isFiltered',
})(({ isFiltered }: FilterSearchIconProps) => [
  tw`stroke-[0.05rem]`,
  isFiltered && tw`text-blue-600`,
]);
