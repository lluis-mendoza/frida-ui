import { RowData } from '@tanstack/react-table';

import { Checkbox } from '../../Checkbox';
import { EditableCellProps } from './EditableCell';

export const EditableBoolean = <TData extends RowData>({
  context: {
    getValue,
    row: { index, subRows },
    column: { id, columnDef },
    table,
  },
  isGrouped,
}: EditableCellProps<TData>) => {
  const value = isGrouped ? subRows.every((e) => e.getValue(id)) : getValue();
  const indeterminate = isGrouped ? subRows.some((e) => e.getValue(id)) : false;
  const updateData = table.options?.meta?.updateData;
  const headerName = columnDef.header?.toString().toLocaleLowerCase() ?? '';

  const onChange = (isSelected: boolean) => {
    if (isGrouped) {
      subRows.forEach((e) => updateData?.(e.index, id, isSelected));
    } else updateData?.(index, id, isSelected);
  };
  return (
    <Checkbox
      aria-label={headerName}
      animate={false}
      isSelected={value as boolean}
      isIndeterminate={indeterminate}
      onChange={onChange}
    />
  );
};
