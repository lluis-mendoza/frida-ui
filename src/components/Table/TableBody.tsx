import { createRef, KeyboardEvent, MouseEvent } from 'react';
import useScrollbarSize from 'react-scrollbar-size';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { useTableContext } from './Table.context';
import { BodyContainer } from './Table.styled';
import TableRow from './TableRow';

const TableBody = () => {
  const {
    table,
    onClick,
    onDoubleClick,
    scrollDown,
    setScrollDown,
    enableKeyboard,
    rowFocused,
  } = useTableContext();

  const listRef = createRef<List>();
  const { rows } = table.getRowModel();
  const { width } = useScrollbarSize();

  const totalColumnSize =
    table
      .getAllFlatColumns()
      .map((column) => column.getSize() + 40)
      .reduce((partialSum, a) => partialSum + a, 0) + width;

  const handleClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
    const eventDetail = event.detail;
    if (eventDetail === 1 && onClick != null) onClick(index);
    else if (eventDetail === 2 && onDoubleClick != null) onDoubleClick(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (
      !(enableKeyboard ?? false) ||
      rowFocused === null ||
      onClick === undefined
    )
      return;
    e.preventDefault();
    const key = e.key;
    if (key === 'ArrowUp' && rowFocused > 0) onClick(rowFocused - 1);
    else if (key === 'ArrowDown' && rowFocused < rows.length - 1)
      onClick(rowFocused + 1);
  };
  return (
    <BodyContainer tabIndex={0} onKeyDown={handleKeyDown}>
      <AutoSizer disableWidth style={{ width: '100%' }}>
        {({ height }) => (
          <List
            height={height - 1}
            itemCount={rows.length}
            width={totalColumnSize}
            style={{
              minWidth: '100%',
            }}
            itemSize={47}
            ref={listRef}
            useIsScrolling
          >
            {({ index, style }) => {
              const row = rows[index];
              return (
                <div
                  key={index}
                  style={style}
                  onClick={(e) => handleClick(e, index)}
                >
                  <TableRow row={row} />
                </div>
              );
            }}
          </List>
        )}
      </AutoSizer>
    </BodyContainer>
  );
};
export default TableBody;
