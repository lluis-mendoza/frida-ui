import { CellContext, RowData } from '@tanstack/react-table';
import { useState } from 'react';

import { Input } from '../../Input';

export const EditableString = <TData extends RowData>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<TData, unknown>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const updateData = table.options?.meta?.updateData;
  const onChange = (_value: string) => {
    setValue(_value);
  };
  const onBlur = () => {
    updateData?.(index, id, value);
  };
  return (
    <Input
      size="sm"
      value={value as string}
      onChange={onChange}
      onBlur={onBlur}
      block
    />
  );
};
