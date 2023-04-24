import { createRef, useRef } from 'react';
import {
  AriaGridListOptions,
  LabelAriaProps,
  useGridList,
  useLabel,
} from 'react-aria';
import { ListProps, useListState } from 'react-stately';
import { FixedSizeList as List } from 'react-window';

import { useItems } from './hooks';
import { ListItem } from './ListItem';
import {
  ItemSizes,
  Label,
  ListViewContainer,
  ListViewWrapper,
} from './ListView.styled';

export type ListRowSize = 'sm' | 'md' | 'lg';

interface ListViewProps<T>
  extends AriaGridListOptions<T>,
    ListProps<T>,
    LabelAriaProps {
  rowSize?: ListRowSize;
  itemsToShow?: number;
  maxItemsToShow?: number;
  height?: number | string;
  maxHeight?: number | string;
}

export default function ListView<T extends object>({
  rowSize = 'md',
  itemsToShow,
  maxItemsToShow,
  height,
  maxHeight,
  ...props
}: ListViewProps<T>) {
  const state = useListState(props);
  const { items, getToggleExpandedHandler } = useItems(state.collection);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = createRef<List>();
  const { gridProps } = useGridList(
    { ...props, isVirtualized: true },
    state,
    ref
  );
  const { labelProps, fieldProps } = useLabel(props);

  const itemData = {
    state,
    items,
    getToggleExpandedHandler,
  };

  return (
    <ListViewContainer>
      {props.label !== undefined && (
        <Label {...labelProps}>{props.label}</Label>
      )}
      <ListViewWrapper
        {...gridProps}
        {...fieldProps}
        itemsToShow={itemsToShow}
        maxItemsToShow={maxItemsToShow}
        rowSize={rowSize}
        style={{ height, maxHeight }}
        ref={ref}
      >
        <List
          height={ref.current?.clientHeight ?? 0}
          itemCount={items.length}
          width={ref.current?.clientWidth ?? 0}
          itemSize={ItemSizes[rowSize]}
          itemData={itemData}
          ref={listRef}
          useIsScrolling
        >
          {ListItem}
        </List>
      </ListViewWrapper>
    </ListViewContainer>
  );
}
