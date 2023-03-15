/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MouseEvent } from 'react';

import { useTouch } from '../../hooks/useTouch.hook';
import { useTableContext } from './Table.context';
import { BodyRow } from './Table.styled';
import TableCell from './TableCell';

interface TableRowProps {
  index: number;
}
const TableRow = ({ index }: TableRowProps) => {
  const { table, onClick, onDoubleClick, rowFocused, rowsDisabled } =
    useTableContext();
  const { rows } = table.getRowModel();

  const rowHeight = 47;
  const isSingleGrouped = rows[index].subRows.length === 1;
  const row = isSingleGrouped ? rows[index].subRows[0] : rows[index];
  const { id } = row;

  const isSelected = row.getIsSelected();
  const isFocused = rowFocused !== null && rowFocused === row.index;
  const isDisabled = rowsDisabled?.includes(index);
  const cells = table
    .getAllColumns()
    .map((col) => row.getAllCells().find((cell) => cell.column.id === col.id)!);

  const handleClick = (event: MouseEvent<HTMLTableRowElement>) => {
    if (isDisabled) return;
    const eventDetail = event.detail;
    if (eventDetail === 1) onClick?.(row.index);
    else if (eventDetail === 2) onDoubleClick?.(row.index);
  };
  const onTouch = () => {
    onClick?.(row.index);
  };
  const onDoubleTouch = () => {
    onDoubleClick?.(row.index);
  };
  const handleTouchStart = useTouch(onTouch, onDoubleTouch);
  return (
    <BodyRow
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      key={id}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
      style={{ height: rowHeight }}
    >
      {cells.map((cell, index) => (
        <TableCell cell={cell} key={index} isSingleGrouped={isSingleGrouped} />
      ))}
    </BodyRow>
  );
};

export default TableRow;
