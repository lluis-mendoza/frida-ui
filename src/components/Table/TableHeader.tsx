/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { flexRender, Header } from '@tanstack/react-table';
import useScrollbarSize from 'react-scrollbar-size';

import { useTableContext } from './Table.context';
import {
  CellContent,
  ColumnResizer,
  HeaderCell,
  HeaderContainer,
  HeaderRow,
} from './Table.styled';
import { TableFilter } from './TableFilters';

const TableHeader = () => {
  const { table } = useTableContext();
  const headers = table.getHeaderGroups();
  const rowHeight = 47;
  const { width: scrollbarWidth } = useScrollbarSize();
  const fixColumnOrder = (headers: Array<Header<any, unknown>>) =>
    table
      .getAllColumns()
      .map((column) => headers.find((cell) => cell.column.id === column.id)!);
  return (
    <HeaderContainer>
      {headers.map((headerGroup) => (
        <HeaderRow
          key={headerGroup.id}
          scrollbarWidth={scrollbarWidth}
          height={rowHeight}
        >
          {fixColumnOrder(headerGroup.headers).map((header) => (
            <HeaderCell
              key={header.id}
              data-column-index={header.index}
              width={header.getSize()}
            >
              <CellContent>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </CellContent>
              {header.column.getCanFilter() ? (
                <TableFilter column={header.column} table={table} />
              ) : null}
              <ColumnResizer
                {...{
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                }}
              />
            </HeaderCell>
          ))}
        </HeaderRow>
      ))}
    </HeaderContainer>
  );
};

export default TableHeader;
