import { useRef } from 'react';
import { AriaTabListProps, useTabList } from 'react-aria';
import { useTabListState } from 'react-stately';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabList, TabsContainer } from './Tabs.styled';

interface TabsProps<T> extends AriaTabListProps<T> {}

export default function Tabs<T extends object>(props: TabsProps<T>) {
  const state = useTabListState(props);
  const ref = useRef(null);
  const { tabListProps } = useTabList(props, state, ref);
  return (
    <TabsContainer>
      <TabList {...tabListProps} ref={ref}>
        {Array.from(state.collection).map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            orientation={props.orientation}
          />
        ))}
      </TabList>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </TabsContainer>
  );
}
