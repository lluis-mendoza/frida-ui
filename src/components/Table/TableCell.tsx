import { Cell, flexRender, RowData } from '@tanstack/react-table';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

import { Skeleton } from '../Skeleton';
import { EditableCell } from './EditableCell';
import { useTableContext } from './Table.context';
import { BodyCell, CellContent, CellGrouped } from './Table.styled';

interface Props<TData extends RowData> {
  cell: Cell<TData, unknown>;
  isSingleGrouped: boolean;
}

const TableCell = <TData extends RowData>({
  cell,
  isSingleGrouped,
}: Props<TData>) => {
  const { isLoading } = useTableContext();
  const meta = cell.column.columnDef.meta;
  const sticky = meta?.sticky ?? false;
  const subRowsLength = cell.row.subRows.length;

  const renderCell = (cell: Cell<TData, unknown>) => {
    const depth = cell.row.depth - Number(isSingleGrouped);
    if (isLoading ?? false) return <Skeleton />;
    if (meta?.editable ?? false) return <EditableCell {...cell.getContext()} />;

    if (cell.getIsGrouped())
      return (
        <CellGrouped onClick={cell.row.getToggleExpandedHandler()}>
          {cell.row.getIsExpanded() ? (
            <IoIosRemove tw="w-6 h-6 fill-blue-500" />
          ) : (
            <IoIosAdd tw="w-6 h-6 fill-blue-500" />
          )}
          <CellContent>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
            {` (${subRowsLength})`}
          </CellContent>
        </CellGrouped>
      );
    if (cell.getIsAggregated())
      return (
        <CellContent>
          {flexRender(
            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
            cell.getContext()
          )}
        </CellContent>
      );
    if (cell.getIsPlaceholder())
      return (
        <CellContent css={{ paddingLeft: depth * 30 }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </CellContent>
      );
    return (
      <CellContent>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </CellContent>
    );
  };
  return (
    <BodyCell key={cell.id} sticky={sticky} width={cell.column.getSize()}>
      {renderCell(cell)}
    </BodyCell>
  );
};

export default TableCell;
