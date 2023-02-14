/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MouseEvent } from 'react';

import { useTableContext } from './Table.context';
import { BodyRow } from './Table.styled';
import TableCell from './TableCell';

interface TableRowProps {
  index: number;
}
const TableRow = ({ index }: TableRowProps) => {
  const { table, onClick, onDoubleClick, rowFocused } = useTableContext();
  const { rows } = table.getRowModel();
  const rowHeight = 47;
  const isSingleGrouped = rows[index].subRows.length === 1;
  const row = isSingleGrouped ? rows[index].subRows[0] : rows[index];
  const { id } = row;
  const isSelected = row.getIsSelected();
  const cells = table
    .getAllColumns()
    .map((col) => row.getAllCells().find((cell) => cell.column.id === col.id)!);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const eventDetail = event.detail;
    if (eventDetail === 1 && onClick != null) onClick(row.index);
    else if (eventDetail === 2 && onDoubleClick != null)
      onDoubleClick(row.index);
  };
  return (
    <BodyRow
      onClick={handleClick}
      key={id}
      isSelected={isSelected}
      isFocused={rowFocused !== null && rowFocused === row.index}
      height={rowHeight}
    >
      {cells.map((cell, index) => (
        <TableCell cell={cell} key={index} isSingleGrouped={isSingleGrouped} />
      ))}
    </BodyRow>
  );
};

export default TableRow;
