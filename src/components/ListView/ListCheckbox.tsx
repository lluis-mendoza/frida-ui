import { Node } from '@react-types/shared';
import { useGridListSelectionCheckbox } from 'react-aria';
import { ListState } from 'react-stately';

import { Checkbox } from '../Checkbox';

interface ListCheckboxProps {
  node: Node<unknown>;
  state: ListState<unknown>;
}
export function ListCheckbox({ node, state }: ListCheckboxProps) {
  const { checkboxProps } = useGridListSelectionCheckbox(
    { key: node.key },
    state
  );
  return <Checkbox {...checkboxProps} animate={false} />;
}
