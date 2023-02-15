import { Node } from '@react-types/shared';
import {
  createRef,
  Key,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AriaGridListOptions,
  LabelAriaProps,
  useGridList,
  useLabel,
} from 'react-aria';
import { ListProps, useListState } from 'react-stately';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { ListItem } from './ListItem';
import {
  ItemSizes,
  Label,
  ListRowSize,
  ListViewContainer,
  ListViewWrapper,
} from './ListView.styled';

interface ListViewProps<T>
  extends AriaGridListOptions<T>,
    ListProps<T>,
    LabelAriaProps {
  rowSize?: ListRowSize;
  width?: number | string;
  itemsToShow?: number;
  maxItemsToShow?: number;
  heightAuto?: boolean;
  maxHeight?: string;
}
export interface ItemInfo<T> {
  node: Node<T>;
  expanded: boolean;
  childNodes: Array<ItemInfo<T>>;
}
export default function ListView<T extends object>({
  rowSize = 'md',
  itemsToShow,
  maxItemsToShow,
  width: customWidth,
  heightAuto,
  maxHeight,
  ...props
}: ListViewProps<T>) {
  const [items, setItems] = useState<Array<ItemInfo<T>>>([]);
  const state = useListState(props);
  const ref = useRef(null);
  const listRef = createRef<List>();
  const { gridProps } = useGridList(
    { ...props, isVirtualized: true },
    state,
    ref
  );
  const { labelProps, fieldProps } = useLabel(props);
  function getToggleExpandedHandler(key: Key) {
    setItems((items) => {
      const updatedItems = [...items];
      function searchItem(items: Array<ItemInfo<T>>) {
        items.forEach((item) => {
          if (item.node.key === key) {
            item.expanded = !item.expanded;
          } else if (item.node.hasChildNodes) {
            searchItem(item.childNodes);
          }
        });
      }
      searchItem(updatedItems);
      return updatedItems;
    });
  }
  const getItems = useCallback((nodes: Array<Node<T>>): Array<ItemInfo<T>> => {
    const result: Array<ItemInfo<T>> = [];
    nodes.forEach((node) => {
      result.push({
        node,
        expanded: false,
        childNodes: node.hasChildNodes
          ? Array.from(getItems([...node.childNodes]))
          : [],
      });
    });
    return result;
  }, []);

  useEffect(() => {
    setItems(getItems(Array.from(state.collection)));
  }, [getItems, state.collection]);
  const flatItems = useMemo(
    () =>
      (function getItems(items): Array<ItemInfo<T>> {
        const result: Array<ItemInfo<T>> = [];
        items.forEach((item) => {
          result.push(item);
          if (item.expanded && item.node.hasChildNodes) {
            result.push(...getItems([...item.childNodes]));
          }
        });
        return result;
      })(items),
    [items]
  );
  const itemData = {
    state,
    items: flatItems,
    getToggleExpandedHandler,
  };
  return (
    <ListViewContainer heightAuto={heightAuto} maxHeight={maxHeight}>
      {props.label !== undefined && (
        <Label {...labelProps}>{props.label}</Label>
      )}
      <ListViewWrapper
        {...gridProps}
        {...fieldProps}
        itemsToShow={itemsToShow ?? flatItems.length}
        maxItemsToShow={maxItemsToShow}
        rowSize={rowSize}
        ref={ref}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height - 1}
              itemCount={flatItems.length}
              width={width - 1}
              itemSize={ItemSizes[rowSize]}
              itemData={itemData}
              ref={listRef}
              useIsScrolling
            >
              {ListItem}
            </List>
          )}
        </AutoSizer>
      </ListViewWrapper>
    </ListViewContainer>
  );
}
