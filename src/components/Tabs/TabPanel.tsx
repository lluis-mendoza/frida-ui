import { useRef } from 'react';
import { AriaTabPanelProps, useTabPanel } from 'react-aria';
import { TabListState } from 'react-stately';

import { TabContent } from './Tabs.styled';

interface TabPanelProps<T> extends AriaTabPanelProps {
  state: TabListState<T>;
}
export function TabPanel<T extends object>({
  state,
  ...props
}: TabPanelProps<T>) {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <TabContent {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </TabContent>
  );
}
