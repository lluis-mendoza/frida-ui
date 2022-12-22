import tw, { css, styled } from 'twin.macro';

export const TableContainer = tw.div`
  flex-1
  flex
  flex-col
  overflow-hidden
`;
export const BodyContainer = tw.div`
    flex
    flex-auto   
`;

export const Row = tw.div`
    inline-flex
    h-[47px]
    w-full
    min-w-full
    border-b
    border-gray-300/40
    border-solid
`;
export const HeaderRow = tw(Row)`
    bg-gray-100
`;
interface BodyRowProps {
  isSelected: boolean;
  isFocused: boolean;
}
export const BodyRow = styled(Row)(
  ({ isSelected, isFocused }: BodyRowProps) => [isFocused && tw`bg-blue-200`]
);

interface CellProps {
  width?: number;
  autoSize?: boolean;
}
export const Cell = styled.div(({ width, autoSize }: CellProps) => [
  tw`
    items-center
    inline-flex
    text-left
    mx-5
    my-auto
    `,
  width != null &&
    css`
      min-width: ${width}px;
      width: ${width}px;
    `,
  (autoSize ?? false) &&
    tw`
        flex-1
    `,
]);

export const BodyCell = tw(Cell)`
  text-gray-800
  font-medium
  text-base
`;
export const HeaderCell = tw(Cell)`
    text-blue-500
    font-semibold
    text-base
`;
