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
import { useEffect, useMemo, useRef, useState } from 'react';
import useScrollbarSize from 'react-scrollbar-size';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';

import { TableProvider } from './Table.context';
import { FilterType, RowFocused } from './Table.model';
import { AutoSizeContainer, Container, TableContainer } from './Table.styled';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { createSelectionColumn } from './TableSelection';

const defaultColSize = 150;

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType?: FilterType;
    editable?: boolean;
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
  rowsDisabled?: number[];
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
  rowsDisabled = [],
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [grouping, setGrouping] = useState<GroupingState>(groupBy);
  const { width: scrollbarWidth } = useScrollbarSize();

  const getTableWidth = () => containerRef.current?.offsetWidth;
  const [tableWidth, setTableWidth] = useState<number | undefined>(
    getTableWidth()
  );
  const handleResize = (size: Size) => {
    setTableWidth(size.width);
  };

  const _data = useMemo(
    () => (loading ?? false ? Array(30).fill({}) : data),
    [loading, data]
  );
  const defaultColumn = useMemo(
    () => ({
      size: defaultColSize,
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
    const hasAutoSizeColumns = cols.some(({ meta }) => meta?.autoSize);
    if (!hasAutoSizeColumns) {
      return cols;
    }
    const columnsWidth = cols.reduce(
      (sum, { size = defaultColSize }) => sum + size,
      0
    );
    const _tableWidth = tableWidth ?? columnsWidth;
    const extraSize = _tableWidth - columnsWidth - scrollbarWidth;
    if (extraSize <= 0) return cols;

    const columnsWithAutoSize = columns.filter(({ meta }) => meta?.autoSize);
    const extraSizePerColumn = extraSize / columnsWithAutoSize.length;
    return cols.map((col) => {
      const { meta, size = defaultColSize } = col;
      return meta?.autoSize ?? false
        ? { ...col, size: size + extraSizePerColumn }
        : col;
    });
  }, [_state, columns, tableWidth, scrollbarWidth]);

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
  });
  const tableContext = {
    table,
    containerRef,
    onClick,
    onDoubleClick,
    onKeyboardUpdate,
    scrollDown,
    setScrollDown,
    rowFocused,
    rowsDisabled,
    enableKeyboard,
    loading,
  };
  return (
    <TableProvider {...tableContext}>
      <Container>
        <AutoSizer onResize={handleResize}>
          {({ height, width }) => (
            <AutoSizeContainer height={height} width={width} ref={containerRef}>
              <TableContainer>
                <TableHeader />
                <TableBody />
              </TableContainer>
            </AutoSizeContainer>
          )}
        </AutoSizer>
      </Container>
    </TableProvider>
  );
};

export default Table;
