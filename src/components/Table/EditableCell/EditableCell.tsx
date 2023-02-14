import { CellContext, RowData } from '@tanstack/react-table';
import React from 'react';

import { EditableBoolean } from './EditableBoolean';
import { EditableString } from './EditableString';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditableTextProps {}
interface EditableNumberProps {
  min?: number;
  max?: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditableBooleanProps {}
export type EditableProps =
  | EditableTextProps
  | EditableNumberProps
  | EditableBooleanProps;
export type EditableTypes = 'boolean' | 'number' | 'string';

export const EditableCell = <TData extends RowData>(
  props: CellContext<TData, unknown>
) => {
  const value = props.getValue();
  const cellType = typeof value;
  const editableCells = {
    boolean: EditableBoolean,
    number: EditableString,
    string: EditableString,
  };
  const renderEditableCell = () => {
    if (
      cellType !== 'undefined' &&
      Object.keys(editableCells).find((p) => p === cellType) !== null
    ) {
      const Component = editableCells[cellType as EditableTypes];
      return <Component {...props} />;
    }
    return <EditableString {...props} />;
  };
  return <React.Fragment>{renderEditableCell()}</React.Fragment>;
};
