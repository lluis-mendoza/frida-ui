import { Fragment, RefObject, useRef } from 'react';
import { AriaListBoxOptions, useListBox } from 'react-aria';
import { ListState } from 'react-stately';

import { Label } from '../../styled-components';
import { List } from './ListBox.styled';
import { ListBoxSection } from './ListBoxSection';
import Option from './Option';

interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  listBoxRef?: RefObject<HTMLUListElement>;
  state: ListState<T>;
}

export default function ListBox<T extends object>({
  state,
  ...props
}: ListBoxProps<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const { label, listBoxRef = ref } = props;
  const { listBoxProps, labelProps } = useListBox(props, state, listBoxRef);

  return (
    <Fragment>
      {label !== undefined ? <Label {...labelProps}>{label}</Label> : null}
      <List {...listBoxProps} ref={listBoxRef}>
        {Array.from(state.collection).map((item) =>
          item.type === 'section' ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <Option key={item.key} item={item} state={state} />
          )
        )}
      </List>
    </Fragment>
  );
}
