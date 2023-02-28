import { BiSearch } from 'react-icons/bi';
import tw, { css, styled } from 'twin.macro';

export const Container = tw.div`
  relative
  flex-1
`;
interface AutoSizeContainerProps {
  height: number;
  width: number;
}
export const AutoSizeContainer = styled.div(
  ({ height, width }: AutoSizeContainerProps) => [
    tw`
    overflow-auto
  `,
    css`
      height: ${height}px;
      width: ${width}px;
    `,
  ]
);
export const TableContainer = tw.table`
  w-full
  h-full
`;
export const BodyContainer = tw.tbody`
  outline-none
  h-full
`;
export const HeaderContainer = tw.thead`
  inset-0
  sticky
  z-10
`;
interface RowProps {
  height?: number;
  width?: number;
}
export const Row = styled.tr(({ height, width }: RowProps) => [
  tw`
  flex
  w-full
  border-b
  border-gray-300/40
  border-solid`,
  height !== undefined &&
    css`
      height: ${height}px;
    `,
  width !== undefined &&
    css`
      width: ${width}px;
    `,
]);

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
      hover:bg-gray-100/[0.75]
    `,
    isFocused && tw`bg-blue-200 hover:bg-blue-300/[0.75]`,
    isSelected && tw`bg-blue-200 hover:bg-blue-300/[0.75]`,
    isDisabled &&
      tw`bg-gray-50 hover:bg-gray-50 [&>*]:(text-gray-500! ) cursor-not-allowed`,
  ]
);

interface CellProps {
  width: number;
}
export const Cell = styled.td(({ width }: CellProps) => [
  tw`
    items-center
    inline-flex
    text-left
    px-4
    overflow-hidden
    h-full
  `,

  css`
    width: ${width}px;
  `,
]);

export const BodyCell = tw(Cell)`
  text-gray-800
  font-normal
  text-base
`;
export const HeaderCell = styled(Cell)(() => [
  tw`
    relative
    text-gray-700
    font-semibold
    text-base
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
  $isFiltered: boolean;
}
export const FilterSearchIcon = styled(BiSearch)(
  ({ $isFiltered }: FilterSearchIconProps) => [
    tw`stroke-[0.05rem]`,
    $isFiltered && tw`text-blue-600`,
  ]
);
