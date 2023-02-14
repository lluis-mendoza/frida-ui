import { CSSProperties, Key, useRef } from 'react';
import { useGridListItem } from 'react-aria';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { ListState } from 'react-stately';

import { ListCheckbox } from './ListCheckbox';
import { ItemInfo } from './ListView';
import { ListRow, ListRowWrapper } from './ListView.styled';

interface ListItemData<T> {
  state: ListState<T>;
  items: Array<ItemInfo<T>>;
  getToggleExpandedHandler: (key: Key) => void;
}
interface ListItemProps<T> {
  index: number;
  style: CSSProperties;
  data: ListItemData<T>;
}

export function ListItem<T>({ index, style, data }: ListItemProps<T>) {
  const ref = useRef(null);
  const { state, items, getToggleExpandedHandler } = data;
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
  return (
    <ListRowWrapper
      {...rowProps}
      {...listCellState}
      style={style}
      key={index}
      isFirstItem={index === 0}
      ref={ref}
    >
      <ListRow
        {...gridCellProps}
        onClick={() => getToggleExpandedHandler(item.node.key)}
        style={{ paddingLeft: node.level ?? 0 * 30 }}
      >
        {node.hasChildNodes ? (
          expanded ? (
            <IoIosRemove tw="w-6 h-6 fill-blue-500" />
          ) : (
            <IoIosAdd tw="w-6 h-6 fill-blue-500" />
          )
        ) : null}
        {showCheckbox && <ListCheckbox node={node} state={state} />}
        {node.rendered}
      </ListRow>
    </ListRowWrapper>
  );
}
