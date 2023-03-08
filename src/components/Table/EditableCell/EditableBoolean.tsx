import { CellContext, RowData } from '@tanstack/react-table';

import { Checkbox } from '../../Checkbox';

export const EditableBoolean = <TData extends RowData>({
  getValue,
  row: { index },
  column: { id, columnDef },
  table,
}: CellContext<TData, unknown>) => {
  const value = getValue();
  const updateData = table.options?.meta?.updateData;
  const headerName = columnDef.header?.toString().toLocaleLowerCase() ?? '';
  const onChange = (isSelected: boolean) => {
    updateData?.(index, id, isSelected);
  };
  return (
    <Checkbox
      aria-label={headerName}
      animate={false}
      isSelected={value as boolean}
      onChange={onChange}
    />
  );
};
