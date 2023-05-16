import { Collection, Node } from '@react-types/shared';
import { useRef } from 'react';
import {
  AriaGridListOptions,
  LabelAriaProps,
  useGridList,
  useLabel,
} from 'react-aria';
import { ListProps, useListState } from 'react-stately';
import { useVirtual } from 'react-virtual';

import { useItems } from './hooks';
import { ListItem } from './ListItem';
import {
  Label,
  ListRow,
  ListViewContainer,
  ListViewWrapper,
} from './ListView.styled';

export type RowSize = 'sm' | 'md' | 'lg';

interface ListViewProps<T>
  extends AriaGridListOptions<T>,
    ListProps<T>,
    LabelAriaProps {
  rowSize?: RowSize;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
}

export default function ListView<T extends object>({
  rowSize = 'md',
  onClick,
  onDoubleClick,
  ...props
}: ListViewProps<T>) {
  const state = useListState(props);
  const { collection } = state;
  const { items, getToggleExpandedHandler } = useItems(
    collection as Collection<Node<T>>
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { gridProps } = useGridList(
    { ...props, isVirtualized: true },
    state,
    containerRef
  );
  const { labelProps, fieldProps } = useLabel(props);

  const itemData = {
    rowSize,
    state,
    items,
    getToggleExpandedHandler,
    onClick,
    onDoubleClick,
  };
  const rowVirtualizer = useVirtual({
    parentRef: containerRef,
    size: items.length,
    overscan: 4,
  });
  const { virtualItems, totalSize } = rowVirtualizer;
  const paddingTop =
    virtualItems.length > 0 ? virtualItems?.[0]?.start ?? 0 : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end ?? 0)
      : 0;
  return (
    <ListViewContainer>
      {props.label !== undefined && (
        <Label {...labelProps}>{props.label}</Label>
      )}
      <ListViewWrapper {...gridProps} {...fieldProps} ref={containerRef}>
        {paddingTop > 0 && <ListRow style={{ height: paddingTop }} />}
        {virtualItems.map((virtualRow, index) => (
          <ListItem key={index} index={virtualRow.index} {...itemData} />
        ))}
        {paddingBottom > 0 && <ListRow style={{ height: paddingBottom }} />}
      </ListViewWrapper>
    </ListViewContainer>
  );
}
