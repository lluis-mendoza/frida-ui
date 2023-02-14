import { Key, useCallback, useState } from 'react';

export type Keys = Set<Key>;
export type Selection = 'all' | Keys;
export interface KeysSelectionState {
  selectedKeys: Keys;
  setSelectedKeys: (data: Selection) => void;
  reset: () => void;
  hasItems: () => boolean;
  numItems: () => number;
}
export const EmptyKeysSelectionState: KeysSelectionState = {
  selectedKeys: new Set(),
  setSelectedKeys: () => undefined,
  reset: () => undefined,
  hasItems: () => false,
  numItems: () => 0,
};
export const useSelectedKeys = (): KeysSelectionState => {
  const [selectedKeys, setSelectedKeys] = useState<Keys>(new Set());
  const reset = () => {
    setSelectedKeys(new Set());
  };
  const hasItems = useCallback(() => {
    return selectedKeys.size > 0;
  }, [selectedKeys]);
  const numItems = useCallback(() => {
    return selectedKeys.size;
  }, [selectedKeys]);
  const handleChange = useCallback((selection: 'all' | Set<Key>) => {
    if (selection !== 'all') setSelectedKeys(selection);
  }, []);
  return {
    selectedKeys,
    setSelectedKeys: handleChange,
    reset,
    hasItems,
    numItems,
  };
};
