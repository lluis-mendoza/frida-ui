import { ColumnDef, RowData } from '@tanstack/react-table';

import { Checkbox } from '../Checkbox';

export function createSelectionColumn<
  TData extends RowData
>(): ColumnDef<TData> {
  return {
    id: 'select',
    size: 20 + 16 * 2,
    minSize: 20 + 16 * 2,
    maxSize: 20 + 16 * 2,
    header: ({ table }) => (
      <Checkbox
        animate={false}
        aria-label={`select column`}
        {...{
          isSelected: table.getIsAllRowsSelected(),
          isIndeterminate: table.getIsSomeRowsSelected(),
          onChange: table.toggleAllRowsSelected,
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        animate={false}
        key={row.index}
        aria-label={`Select row with id: ${row.id}`}
        {...{
          defaultSelected: row.getIsSelected(),
          isIndeterminate: row.getIsSomeSelected(),
          onChange: row.toggleSelected,
        }}
      />
    ),
    aggregatedCell: ({ row }) => (
      <Checkbox
        animate={false}
        key={row.index}
        aria-label={`Select row with id: ${row.id}`}
        {...{
          defaultSelected: row.getIsSelected(),
          isIndeterminate: row.getIsSomeSelected(),
          onChange: row.toggleSelected,
        }}
      />
    ),
  };
}
