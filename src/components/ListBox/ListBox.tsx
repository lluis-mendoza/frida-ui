import {
  AriaLabelingProps,
  CollectionBase,
  DOMProps,
  FocusEvents,
  FocusStrategy,
  MultipleSelection,
} from '@react-types/shared';
import { Fragment, ReactNode, useRef } from 'react';
import { useListBox } from 'react-aria';
import { ListState, useListState } from 'react-stately';

import { Label } from '../../styled-components';
import { List } from './ListBox.styled';
import { ListBoxSection } from './ListBoxSection';
import Option from './Option';

type ListBoxSize = 'sm' | 'md' | 'lg';
interface ListBoxProps<T>
  extends CollectionBase<T>,
    MultipleSelection,
    FocusEvents,
    DOMProps,
    AriaLabelingProps {
  size?: ListBoxSize;
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state?: ListState<unknown>;
  autoFocus?: boolean | FocusStrategy;
  shouldFocusWrap?: boolean;
  label?: ReactNode;
}
export default function ListBox<T extends object>({
  state,
  listBoxRef,
  ...props
}: ListBoxProps<T>) {
  const internalState = useListState(props);
  const _state = state ?? internalState;
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxProps, labelProps } = useListBox(props, _state, ref);
  return (
    <Fragment>
      {props.label !== null && <Label {...labelProps}>{props.label}</Label>}
      <List {...listBoxProps} ref={ref}>
        {Array.from(_state.collection).map((item) =>
          item.type === 'section' ? (
            <ListBoxSection key={item.key} section={item} state={_state} />
          ) : (
            <Option key={item.key} item={item} state={_state} />
          )
        )}
      </List>
    </Fragment>
  );
}
