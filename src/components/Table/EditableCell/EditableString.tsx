import { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Input } from '../../Input';

export const EditableString = <TData extends RowData>({
  getValue,
  row: { index },
  column: { id, columnDef },
  table,
}: CellContext<TData, unknown>) => {
  const value = getValue();
  const [innerValue, setInnerValue] = useState(value);
  const headerName = columnDef.header?.toString().toLocaleLowerCase() ?? '';

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const updateData = table.options?.meta?.updateData;
  const onChange = (_value: string) => {
    setInnerValue(_value);
  };
  const onBlur = () => {
    updateData?.(index, id, innerValue);
  };
  return (
    <Input
      size="sm"
      aria-label={headerName}
      value={innerValue as string}
      onChange={onChange}
      onBlur={onBlur}
      block
    />
  );
};
