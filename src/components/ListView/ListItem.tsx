import { Key, MouseEvent, useRef } from 'react';
import { useGridListItem } from 'react-aria';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { ListState } from 'react-stately';

import { ItemData } from './hooks';
import { ListCheckbox } from './ListCheckbox';
import { RowSize } from './ListView';
import { ListRow, ListRowWrapper, RowSizes } from './ListView.styled';

interface ListItemProps<T> {
  index: number;
  state: ListState<T>;
  items: Array<ItemData<T>>;
  getToggleExpandedHandler: (key: Key) => void;
  rowSize: RowSize;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
}

export function ListItem<T>({
  index,
  state,
  items,
  getToggleExpandedHandler,
  rowSize,
  onClick,
  onDoubleClick,
}: ListItemProps<T>) {
  const ref = useRef(null);
  const item = items[index];
  const { node, expanded } = items[index];
  const { rowProps, gridCellProps, isSelected, isDisabled, isPressed } =
    useGridListItem({ node }, state, ref);
  const listCellState = {
    isSelected,
    isDisabled,
    isPressed,
  };
  const showCheckbox =
    state.selectionManager.selectionMode !== 'none' &&
    state.selectionManager.selectionBehavior === 'toggle';
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    const eventDetail = event.detail;
    if (eventDetail === 1) onClick?.(index);
    else if (eventDetail === 2) onDoubleClick?.(index);
  };
  return (
    <ListRowWrapper
      {...rowProps}
      {...listCellState}
      key={index}
      isFirstItem={index === 0}
      onClick={handleClick}
      style={{ height: RowSizes[rowSize] }}
      ref={ref}
    >
      <ListRow
        {...gridCellProps}
        onClick={() => getToggleExpandedHandler(item.node.key)}
        style={{ paddingLeft: node.level * 30 }}
      >
        {showCheckbox && <ListCheckbox item={item} state={state} />}
        {node.hasChildNodes ? (
          expanded ? (
            <IoIosRemove tw="w-6 h-6 fill-blue-500 -ml-2" />
          ) : (
            <IoIosAdd tw="w-6 h-6 fill-blue-500 -ml-2" />
          )
        ) : null}
        {node.rendered}
      </ListRow>
    </ListRowWrapper>
  );
}
