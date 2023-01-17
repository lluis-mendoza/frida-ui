import { Fragment, useRef } from 'react';
import {
  AriaGridListOptions,
  LabelAriaProps,
  useGridList,
  useLabel,
} from 'react-aria';
import { ListProps, useListState } from 'react-stately';

import { ListItem } from './ListItem';
import { ListRowSize, ListViewContainer } from './ListView.styled';

interface ListViewProps<T>
  extends AriaGridListOptions<T>,
    ListProps<T>,
    LabelAriaProps {
  rowSize?: ListRowSize;
}

export default function ListView<T extends object>({
  rowSize = 'md',
  ...props
}: ListViewProps<T>) {
  const state = useListState(props);
  const ref = useRef(null);
  const { gridProps } = useGridList(props, state, ref);
  const { labelProps, fieldProps } = useLabel(props);
  return (
    <Fragment>
      {props.label !== undefined && (
        <label {...labelProps}>{props.label}</label>
      )}
      <ListViewContainer
        {...gridProps}
        {...fieldProps}
        ref={ref}
        className="list"
      >
        {Array.from(state.collection).map((item) => (
          <ListItem key={item.key} item={item} state={state} size={rowSize} />
        ))}
      </ListViewContainer>
    </Fragment>
  );
}
