import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CellContext, RowData } from '@tanstack/react-table';

import { TypeWithKey } from '../../../utilities/type-with-key';
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

export interface EditableCellProps<TData extends unknown> {
  context: CellContext<TData, unknown>;
  isGrouped: boolean;
}
const editableCells: TypeWithKey<
  <TData extends unknown>(props: EditableCellProps<TData>) => EmotionJSX.Element
> = {
  boolean: EditableBoolean,
  number: EditableString,
  string: EditableString,
};
export const EditableCell = <TData extends RowData>(
  context: CellContext<TData, unknown>
) => {
  const columnId = context.column.id;
  const value = context.getValue();
  const isGrouped = context.row.subRows.length > 0;
  const cellType = isGrouped
    ? typeof context.row.subRows[0].getValue(columnId)
    : typeof value;
  const Component = editableCells[cellType] ?? EditableString;
  return <Component context={context} isGrouped={isGrouped} />;
};
