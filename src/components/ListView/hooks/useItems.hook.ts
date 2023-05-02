import { Collection, Node } from '@react-types/shared';
import { Key, useCallback, useEffect, useMemo, useState } from 'react';

export interface ItemData<T> {
  node: Node<T>;
  expanded: boolean;
  childItems: Array<ItemData<T>>;
}

export function useItems<T>(collection: Collection<Node<T>>) {
  const [itemsData, setItemsData] = useState<Array<ItemData<T>>>([]);

  const getToggleExpandedHandler = useCallback((key: Key) => {
    setItemsData((items) => {
      const updatedItems = [...items];
      function searchItem(items: Array<ItemData<T>>) {
        items.forEach((item) => {
          if (item.node.key === key) {
            item.expanded = !item.expanded;
          } else if (item.childItems.length > 0) {
            searchItem(item.childItems);
          }
        });
      }
      searchItem(updatedItems);
      return updatedItems;
    });
  }, []);
  const items = useMemo(
    () =>
      (function getItems(items): Array<ItemData<T>> {
        const result: Array<ItemData<T>> = [];
        items.forEach((item) => {
          result.push(item);
          if (item.expanded && item.childItems.length > 0) {
            result.push(...getItems([...item.childItems]));
          }
        });
        return result;
      })(itemsData),
    [itemsData]
  );
  useEffect(() => {
    const getItems = (nodes: Array<Node<T>>): Array<ItemData<T>> => {
      const result: Array<ItemData<T>> = [];
      nodes.forEach((node) => {
        result.push({
          node,
          expanded: false,
          childItems: node.hasChildNodes
            ? Array.from(getItems([...node.childNodes]))
            : [],
        });
      });
      return result;
    };
    setItemsData(getItems(Array.from(collection)));
  }, [collection]);

  return { items, getToggleExpandedHandler };
}
