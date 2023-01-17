import { createRef, useRef } from 'react';
import {
  AriaGridListOptions,
  LabelAriaProps,
  useGridList,
  useLabel,
} from 'react-aria';
import { ListProps, useListState } from 'react-stately';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import {
  Label,
  ListGroupContainer,
  ListGroupWrapper,
  ListRowSize,
} from './ListGroup.styled';
import { ListItem } from './ListItem';

interface ListGroupProps<T>
  extends AriaGridListOptions<T>,
    ListProps<T>,
    LabelAriaProps {
  rowSize?: ListRowSize;
}
export default function ListGroup<T extends object>({
  rowSize = 'md',
  ...props
}: ListGroupProps<T>) {
  const listRef = createRef<List>();
  const state = useListState(props);
  const ref = useRef(null);
  const { gridProps } = useGridList(props, state, ref);
  const { labelProps, fieldProps } = useLabel(props);
  const items = Array.from(state.collection);
  return (
    <ListGroupContainer>
      <Label {...labelProps}>{props.label}</Label>
      <ListGroupWrapper {...gridProps} {...fieldProps} ref={ref} tabIndex={0}>
        <AutoSizer disableWidth style={{ width: '100%' }}>
          {({ height }) => (
            <List
              height={height - 1}
              itemCount={items.length}
              width={400}
              style={{
                minWidth: '100%',
              }}
              itemSize={47}
              ref={listRef}
              useIsScrolling
            >
              {({ index, style }) => {
                const item = items[index];
                return (
                  <div key={index} style={style}>
                    <ListItem
                      item={item}
                      state={state}
                      size={rowSize}
                      isFirstItem={index === 0}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </ListGroupWrapper>
    </ListGroupContainer>
  );
}
