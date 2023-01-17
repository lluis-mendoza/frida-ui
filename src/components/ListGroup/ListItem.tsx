import { Node } from '@react-types/shared';
import { useRef } from 'react';
import { useGridListItem } from 'react-aria';
import { ListState } from 'react-stately';

import { ListCheckbox } from '../ListGroup/ListCheckbox';
import {
  ListRow,
  ListRowSize,
  ListRowSizes,
  ListRowWrapper,
} from './ListGroup.styled';

interface ListItemProps {
  size: ListRowSize;
  item: Node<unknown>;
  state: ListState<unknown>;
  isFirstItem: boolean;
}
export function ListItem({ item, state, size, isFirstItem }: ListItemProps) {
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
    <ListRowWrapper
      {...rowProps}
      {...listCellState}
      isFirstItem={isFirstItem}
      css={ListRowSizes[size]}
      ref={ref}
    >
      <ListRow {...gridCellProps}>
        {showCheckbox && <ListCheckbox item={item} state={state} />}
        {item.rendered}
      </ListRow>
    </ListRowWrapper>
  );
}
