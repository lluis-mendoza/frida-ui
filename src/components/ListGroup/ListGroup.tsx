import { useRef } from 'react';
import {
  AriaGridListOptions,
  LabelAriaProps,
  useGridList,
  useLabel,
} from 'react-aria';
import { ListProps, useListState } from 'react-stately';

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
  const state = useListState(props);
  const ref = useRef(null);
  const { gridProps } = useGridList(props, state, ref);
  const { labelProps, fieldProps } = useLabel(props);
  return (
    <ListGroupContainer>
      <Label {...labelProps}>{props.label}</Label>
      <ListGroupWrapper
        {...gridProps}
        {...fieldProps}
        ref={ref}
        className="list"
      >
        {Array.from(state.collection).map((item) => (
          <ListItem key={item.key} item={item} state={state} size={rowSize} />
        ))}
      </ListGroupWrapper>
    </ListGroupContainer>
  );
}
