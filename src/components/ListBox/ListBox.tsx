import { Fragment, useRef } from 'react';
import { AriaListBoxOptions, useListBox } from 'react-aria';
import { ListState } from 'react-stately';

import { Label } from '../../styled-components';
import { List } from './ListBox.styled';
import { ListBoxSection } from './ListBoxSection';
import Option from './Option';

interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  state: ListState<T>;
}

export default function ListBox<T extends object>({
  state,
  ...props
}: ListBoxProps<T>) {
  const { label } = props;
  const ref = useRef(null);
  const { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <Fragment>
      <Label {...labelProps}>{label}</Label>
      <List {...listBoxProps} ref={ref}>
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
