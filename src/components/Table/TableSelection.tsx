import { ColumnDef, RowData } from '@tanstack/react-table';
import { Row } from 'react-stately';

import { Checkbox } from '../Checkbox';

export function createSelectionColumn<
  TData extends RowData
>(): ColumnDef<TData> {
  return {
    id: 'select',
    size: 20,
    header: ({ table }) => (
      <Checkbox
        {...{
          isSelected: table.getIsAllRowsSelected(),
          isIndeterminate: table.getIsSomeRowsSelected(),
          onChange: (e) => table.toggleAllRowsSelected(e),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          defaultSelected: row.getIsSelected(),
          isIndeterminate: row.getIsSomeSelected(),
          onChange: (e) => row.toggleSelected(e),
        }}
      />
    ),
  };
}
