import { Column, Table } from '@tanstack/react-table';
import React from 'react';

import { SearchFilter } from './SearchFilter';
import { SelectFilter } from './SelectFilter';

export const TableFilter = ({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) => {
  const filterType = column.columnDef.meta?.filterType;
  const filters = {
    search: SearchFilter,
    select: SelectFilter,
  };
  const renderFilter = () => {
    if (
      filterType !== undefined &&
      Object.keys(filters).find((p) => p === filterType) != null
    ) {
      const Component = filters[filterType];
      return <Component column={column} table={table} />;
    }
    return <SearchFilter column={column} table={table} />;
  };
  return <React.Fragment>{renderFilter()}</React.Fragment>;
};
