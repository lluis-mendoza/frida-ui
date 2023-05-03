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
import { useMemo, useState } from 'react';

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

export interface TableProps<TData extends RowData> {
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
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  isRowDisabled?: (data: TData) => boolean;
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
  onRowSelectionChange,
  isRowDisabled = () => false,
  groupBy = [],
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [grouping, setGrouping] = useState<GroupingState>(groupBy);

  const _data = useMemo(
    () => (loading ?? false ? Array(30).fill({}) : data),
    [loading, data]
  );
  const defaultColumn = useMemo(
    () => ({
      size: DEFAULT_COL_SIZE,
      minSize: 20,
    }),
    []
  );
  const _initialState = useMemo(() => initialState, [initialState]);
  const _state = useMemo(() => state, [state]);
  const _columns = useMemo(() => {
    const { rowSelection } = _state ?? {};
    let cols = columns;
    if (rowSelection !== undefined) {
      cols = [createSelectionColumn(), ...columns];
    }
    return cols;
  }, [_state, columns]);

  const table = useReactTable({
    data: _data,
    columns: _columns,
    defaultColumn,
    initialState: _initialState,
    state: {
      grouping,
      columnFilters,
      ..._state,
    },
    columnResizeMode: 'onChange',
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onRowSelectionChange,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
    autoResetAll: false,
  });
  const tableContext = {
    table,
    onClick,
    onDoubleClick,
    onKeyboardUpdate,
    scrollDown,
    setScrollDown,
    rowFocused,
    isRowDisabled,
    enableKeyboard,
    loading,
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
