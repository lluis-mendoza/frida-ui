import { KeyboardEvent } from 'react';
import { useVirtual } from 'react-virtual';

import { useTableContext } from './Table.context';
import { BodyContainer, Row } from './Table.styled';
import { useTableContainerContext } from './TableContainer';
import TableRow from './TableRow';

const TableBody = () => {
  const { table, enableKeyboard, rowFocused, onKeyboardUpdate } =
    useTableContext();
  const { containerRef } = useTableContainerContext();
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    parentRef: containerRef,
    size: rows.length,
    overscan: 4,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start ?? 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end ?? 0)
      : 0;
  const handleKeyDown = (e: KeyboardEvent<HTMLTableSectionElement>) => {
    if (
      !(enableKeyboard ?? false) ||
      rowFocused === null ||
      onKeyboardUpdate === undefined
    )
      return;
    e.preventDefault();
    const key = e.key;
    if (key === 'ArrowUp' && rowFocused > 0) {
      onKeyboardUpdate(rowFocused - 1);
      // listRef.current?.scrollToItem(rowFocused - 1, 'smart');
    } else if (key === 'ArrowDown' && rowFocused < rows.length - 1) {
      onKeyboardUpdate(Number(rowFocused + 1));
      // listRef.current?.scrollToItem(rowFocused + 1, 'smart');
    }
  };
  return (
    <BodyContainer tabIndex={0} onKeyDown={handleKeyDown}>
      {paddingTop > 0 && <Row style={{ height: paddingTop }} />}
      {virtualRows.map((virtualRow, index) => (
        <TableRow key={index} index={virtualRow.index} />
      ))}
      {paddingBottom > 0 && <Row style={{ height: paddingBottom }} />}
    </BodyContainer>
  );
};

export default TableBody;
