/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Cell, flexRender, Row, RowData } from '@tanstack/react-table';

import { useTableContext } from './Table.context';
import { BodyCell, BodyRow } from './Table.styled';

interface TableRowProps<TData extends RowData> {
  row: Row<TData>;
}
const TableRow = <TData extends RowData>({ row }: TableRowProps<TData>) => {
  const { table, rowFocused } = useTableContext();

  const _row = row.subRows.length === 1 ? row.subRows[0] : row;
  const isSelected = _row.getIsSelected();
  const fixColumnOrder = (cells: Array<Cell<TData, unknown>>) =>
    table
      .getAllColumns()
      .map((column) => cells.find((cell) => cell.column.id === column.id)!);

  return (
    <BodyRow
      data-row-index={_row.index}
      key={_row.id}
      isSelected={isSelected}
      isFocused={rowFocused !== null && rowFocused === _row.index}
    >
      {fixColumnOrder(_row.getAllCells()).map((cell) => (
        <BodyCell key={cell.id} width={cell.column.getSize()}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </BodyCell>
      ))}
    </BodyRow>
  );
};

export default TableRow;
