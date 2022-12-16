import { useRef } from 'react';
import {
  AriaSelectOptions,
  HiddenSelect,
  useButton,
  useFocusRing,
  useSelect,
} from 'react-aria';
import { SelectProps as SelectStateProps, useSelectState } from 'react-stately';

import { FieldWrapper, Label } from '../../styled-components';
import { ListBox } from '../ListBox';
import { Popover } from '../Popover';

interface SelectProps<T extends object>
  extends SelectStateProps<T>,
    AriaSelectOptions<T> {}
export default function Select<T extends object>(props: SelectProps<T>) {
  const ref = useRef(null);
  const state = useSelectState(props);

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  const { buttonProps } = useButton(triggerProps, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <FieldWrapper>
      <Label {...labelProps}>{props.label}</Label>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      {/* <Button {...mergeProps(buttonProps, focusProps)} ref={ref}>
        <Value {...valueProps} hasValue={state.selectedItem !== null}>
          {state.selectedItem !== null
            ? state.selectedItem.rendered
            : 'Select an option'}
        </Value>
        <SelectorIcon />
          </Button> */}
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </FieldWrapper>
  );
}
