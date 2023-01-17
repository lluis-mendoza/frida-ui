/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { flexRender, Header } from '@tanstack/react-table';
import { Fragment } from 'react';

import { useTableContext } from './Table.context';
import { HeaderCell, HeaderRow } from './Table.styled';
import { TableFilter } from './TableFilters';

const TableHeader = () => {
  const { table } = useTableContext();
  const headers = table.getHeaderGroups();
  const fixColumnOrder = (headers: Array<Header<any, unknown>>) =>
    table
      .getAllColumns()
      .map((column) => headers.find((cell) => cell.column.id === column.id)!);
  return (
    <Fragment>
      {headers.map((headerGroup) => (
        <HeaderRow key={headerGroup.id}>
          {fixColumnOrder(headerGroup.headers).map((header) => (
            <HeaderCell
              key={header.id}
              data-column-index={header.index}
              width={header.getSize()}
              autoSize={
                Boolean(header.column.columnDef?.meta?.autoSize) || false
              }
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanFilter() ? (
                <TableFilter column={header.column} table={table} />
              ) : null}
            </HeaderCell>
          ))}
        </HeaderRow>
      ))}
    </Fragment>
  );
};

export default TableHeader;
