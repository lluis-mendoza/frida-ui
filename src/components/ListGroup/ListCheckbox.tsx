import { Node } from '@react-types/shared';
import { useGridListSelectionCheckbox } from 'react-aria';
import { ListState } from 'react-stately';

import { Checkbox } from '../Checkbox';

interface ListCheckboxProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}
export function ListCheckbox({ item, state }: ListCheckboxProps) {
  const { checkboxProps } = useGridListSelectionCheckbox(
    { key: item.key },
    state
  );
  return <Checkbox {...checkboxProps} />;
}
