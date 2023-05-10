/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderTableState,
  ColumnPinningTableState,
  ColumnSizingTableState,
  ExpandedTableState,
  FiltersTableState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  GroupingTableState,
  PaginationTableState,
  RowData,
  RowSelectionState,
  RowSelectionTableState,
  SortingTableState,
  useReactTable,
  VisibilityTableState,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { TableProvider } from './Table.context';
import { DEFAULT_COL_SIZE, FilterType, RowFocused } from './Table.model';
import TableBody from './TableBody';
import { TableContainer } from './TableContainer';
import TableHeader from './TableHeader';
import { createSelectionColumn } from './TableSelection';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType?: FilterType;
    editable?: boolean;
    sticky?: boolean;
    autoSize?: boolean;
    showOverflow?: boolean;
  }
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type TableState = Partial<
  VisibilityTableState &
    ColumnOrderTableState &
    ColumnPinningTableState &
    FiltersTableState &
    SortingTableState &
    ExpandedTableState &
    GroupingTableState &
    ColumnSizingTableState &
    PaginationTableState &
    RowSelectionTableState
>;
export interface TableProps<TData extends RowData> {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  initialState?: TableState;
  state?: TableState;
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  isRowDisabled?: (data: TData) => boolean;
  onRowSelectionChange?: (data: RowSelectionState) => void;
  onGroupingChange?: (data: GroupingState) => void;
  onColumnFiltersChange?: (data: ColumnFiltersState) => void;
  isLoading?: boolean;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
  onKeyboardUpdate?: (index: number) => void;
  rowFocused?: RowFocused;
  enableKeyboard?: boolean;
}
const Table = <TData extends RowData>({
  data,
  columns,
  initialState,
  state,
  onRowSelectionChange,
  onGroupingChange,
  onColumnFiltersChange,
  isLoading = false,
  isRowDisabled = () => false,
  rowFocused = null,
  updateData,
  onClick,
  onDoubleClick,
  onKeyboardUpdate,
  enableKeyboard,
}: TableProps<TData>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? []
  );
  const [grouping, setGrouping] = useState<GroupingState>(
    initialState?.grouping ?? []
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );

  const _data = useMemo(
    () => (isLoading ?? false ? Array(30).fill({}) : data),
    [isLoading, data]
  );
  const defaultColumn = useMemo(
    () => ({
      size: DEFAULT_COL_SIZE,
      minSize: 20,
    }),
    []
  );
  const _columns = useMemo(() => {
    const { rowSelection } = state ?? {};
    let cols = columns;
    if (rowSelection !== undefined) {
      cols = [createSelectionColumn(), ...columns];
    }
    return cols;
  }, [state, columns]);

  const table = useReactTable({
    data: _data,
    columns: _columns,
    defaultColumn,
    initialState,
    state: {
      grouping,
      columnFilters,
      rowSelection,
      ...state,
    },
    columnResizeMode: 'onChange',
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
    autoResetAll: false,
  });
  const tableState = table.getState();
  const {
    rowSelection: _rowSelection,
    grouping: _grouping,
    columnFilters: _columnFilters,
  } = tableState;

  useEffect(() => {
    onRowSelectionChange?.(_rowSelection);
  }, [_rowSelection, onRowSelectionChange]);
  useEffect(() => {
    onGroupingChange?.(_grouping);
  }, [_grouping, onGroupingChange]);
  useEffect(() => {
    onColumnFiltersChange?.(_columnFilters);
  }, [_columnFilters, onColumnFiltersChange]);

  useEffect(() => {
    if (isLoading) table.setGrouping([]);
  }, [isLoading, table]);

  const tableContext = {
    table,
    onClick,
    onDoubleClick,
    onKeyboardUpdate,
    rowFocused,
    isRowDisabled,
    enableKeyboard,
    isLoading,
  };

  return (
    <TableProvider {...tableContext}>
      <TableContainer>
        <TableHeader />
        <TableBody />
      </TableContainer>
    </TableProvider>
  );
};

export default Table;
