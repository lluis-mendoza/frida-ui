import { Node } from '@react-types/shared';
import { useRef } from 'react';
import { useGridListItem } from 'react-aria';
import { ListState } from 'react-stately';

import { ListCheckbox } from '../ListGroup/ListCheckbox';
import {
  ListCell,
  ListRow,
  ListRowSize,
  ListRowSizes,
} from './ListView.styled';

interface ListItemProps {
  size: ListRowSize;
  item: Node<unknown>;
  state: ListState<unknown>;
}
export function ListItem({ item, state, size }: ListItemProps) {
  const ref = useRef(null);
  const { rowProps, gridCellProps, isSelected, isDisabled, isPressed } =
    useGridListItem({ node: item }, state, ref);
  const listCellState = {
    isSelected,
    isDisabled,
    isPressed,
  };
  const showCheckbox =
    state.selectionManager.selectionMode !== 'none' &&
    state.selectionManager.selectionBehavior === 'toggle';

  return (
    <ListRow
      {...rowProps}
      {...listCellState}
      css={ListRowSizes[size]}
      ref={ref}
    >
      <ListCell {...gridCellProps}>
        {showCheckbox && <ListCheckbox item={item} state={state} />}
        {item.rendered}
      </ListCell>
    </ListRow>
  );
}
