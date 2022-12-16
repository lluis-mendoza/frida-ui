import { DOMProps, Node, Orientation } from '@react-types/shared';
import { useRef } from 'react';
import { useTab } from 'react-aria';
import { TabListState } from 'react-stately';

import { Slider, TabItem } from './Tabs.styled';

interface TabProps<T> extends DOMProps {
  item: Node<T>;
  state: TabListState<T>;
  isDisabled?: boolean;
  orientation?: Orientation;
}
export function Tab<T>({ item, state, orientation }: TabProps<T>) {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps, isSelected, isDisabled } = useTab({ key }, state, ref);
  return (
    <TabItem
      {...tabProps}
      isSelected={isSelected}
      isDisabled={isDisabled}
      ref={ref}
    >
      {rendered}
      {state.selectedKey === key ? <Slider layoutId="tabSelector" /> : null}
    </TabItem>
  );
}
