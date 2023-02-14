import { Fragment, ReactNode, useRef } from 'react';
import { AriaToggleButtonProps, useToggleButton } from 'react-aria';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { Item, ItemProps, ToggleProps, useToggleState } from 'react-stately';

import { ButtonGrouped } from './ItemGrouped.styled';

export interface ItemGroupedProps<T>
  extends Omit<ToggleProps, 'children'>,
    Omit<AriaToggleButtonProps, 'children'>,
    ItemProps<T> {}
export default function ItemGrouped<T>({
  children,
  ...props
}: ItemGroupedProps<T>) {
  const ref = useRef(null);
  const state = useToggleState(props);
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);
  return (
    <Item>
      <ButtonGrouped {...buttonProps} ref={ref}>
        {isPressed ? (
          <IoIosRemove tw="w-6 h-6 fill-blue-500" />
        ) : (
          <IoIosAdd tw="w-6 h-6 fill-blue-500" />
        )}
      </ButtonGrouped>
      {children}
    </Item>
  );
}
