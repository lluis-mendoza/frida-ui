import { useGridListSelectionCheckbox } from 'react-aria';
import { ListState } from 'react-stately';

import { Checkbox } from '../Checkbox';
import { ItemData } from './hooks';

interface ListCheckboxProps<T> {
  item: ItemData<T>;
  state: ListState<T>;
}
export function ListCheckbox<T>({ item, state }: ListCheckboxProps<T>) {
  const { node } = item;
  const { checkboxProps } = useGridListSelectionCheckbox(
    { key: node.key },
    state
  );

  return <Checkbox {...checkboxProps} animate={false} />;
}
