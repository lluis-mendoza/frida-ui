import { KeyboardEvent } from 'react';
import { useVirtual } from 'react-virtual';

import { Empty } from '../Empty';
import { useTableContext } from './Table.context';
import { BodyCell, BodyContainer, EmptyContainer, Row } from './Table.styled';
import TableRow from './TableRow';

const TableBody = () => {
  const { table, containerRef, enableKeyboard, rowFocused, onKeyboardUpdate } =
    useTableContext();
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: containerRef,
    size: rows.length,
    overscan: 10,
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
  const isEmpty = rows.length === 0;
  if (isEmpty)
    return (
      <BodyContainer>
        <EmptyContainer width={containerRef.current?.offsetWidth}>
          <BodyCell>
            <Empty />
          </BodyCell>
        </EmptyContainer>
      </BodyContainer>
    );
  return (
    <BodyContainer tabIndex={0} onKeyDown={handleKeyDown}>
      {paddingTop > 0 && <Row height={paddingTop} />}
      {virtualRows.map((virtualRow, index) => (
        <TableRow key={index} index={virtualRow.index} />
      ))}
      {paddingBottom > 0 && <Row height={paddingBottom} />}
    </BodyContainer>
  );
};

export default TableBody;
