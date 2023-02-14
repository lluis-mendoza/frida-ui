import { CellContext, RowData } from '@tanstack/react-table';

import { Checkbox } from '../../Checkbox';

export const EditableBoolean = <TData extends RowData>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<TData, unknown>) => {
  const value = getValue();
  const updateData = table.options?.meta?.updateData;
  const onChange = (isSelected: boolean) => {
    updateData?.(index, id, isSelected);
  };
  return <Checkbox isSelected={value as boolean} onChange={onChange} />;
};
