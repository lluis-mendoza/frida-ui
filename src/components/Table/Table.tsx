/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ColumnDef,
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
  InitialTableState,
  OnChangeFn,
  PaginationTableState,
  RowData,
  RowSelectionState,
  RowSelectionTableState,
  SortingTableState,
  useReactTable,
  VisibilityTableState,
} from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';

import { TableProvider } from './Table.context';
import { RowFocused } from './Table.model';
import { TableContainer } from './Table.styled';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { createSelectionColumn } from './TableSelection';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    // filterType?: FilterType;
    // editable?: boolean;
    // editableProps?: EditableProps;
    autoSize?: boolean;
    showOverflow?: boolean;
  }
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

interface TableProps<TData extends RowData> {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  initialState?: InitialTableState;
  state?: Partial<
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
  rowSelection?: RowSelectionState;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  groupBy?: GroupingState;
  toggleAllRowsExpanded?: boolean;
  loading?: boolean;
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
  onKeyboardUpdate?: (index: number) => void;
  rowFocused?: RowFocused;
  enableKeyboard?: boolean;
  scrollDown?: boolean;
  setScrollDown?: (data: boolean) => void;
}
const Table = <TData extends RowData>({
  data,
  columns,
  initialState,
  state,
  rowSelection,
  setRowSelection,
  groupBy,
  toggleAllRowsExpanded,
  loading,
  rowFocused = null,
  updateData,
  onClick,
  onDoubleClick,
  onKeyboardUpdate,
  enableKeyboard,
  scrollDown,
  setScrollDown,
}: TableProps<TData>) => {
  useEffect(() => {
    console.log(columns);
  }, [columns]);
  const defaultColumn = useMemo(
    () => ({
      size: 250,
    }),
    []
  );
  const _initialState = useMemo(() => initialState, [initialState]);
  const _state = useMemo(() => state, [state]);
  const _columns = useMemo(() => {
    let cols = columns;
    if (rowSelection !== undefined) {
      cols = [createSelectionColumn(), ...columns];
    }
    return cols;
  }, [columns, rowSelection]);

  const table = useReactTable({
    data,
    columns: _columns,
    defaultColumn,
    initialState: _initialState,
    state: _state,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContext = {
    table,
    onClick,
    onDoubleClick,
    onKeyboardUpdate,
    scrollDown,
    setScrollDown,
    rowFocused,
    enableKeyboard,
    loading,
  };
  return (
    <TableContainer>
      <TableProvider {...tableContext}>
        <TableHeader />
        <TableBody />
      </TableProvider>
    </TableContainer>
  );
};

export default Table;
