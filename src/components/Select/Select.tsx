import { useRef } from 'react';
import {
  AriaSelectOptions,
  HiddenSelect,
  useButton,
  useSelect,
} from 'react-aria';
import { BiChevronDown as SelectorIcon } from 'react-icons/bi';
import { SelectProps as SelectStateProps, useSelectState } from 'react-stately';

import {
  FieldContainer,
  FieldSize,
  FieldSizes,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { ListBox } from '../ListBox';
import { Popover } from '../Popover';
import { SelectButton, SelectValue } from './Select.styled';

interface SelectProps<T extends object>
  extends SelectStateProps<T>,
    AriaSelectOptions<T> {
  size?: FieldSize;
}
export default function Select<T extends object>({
  size = 'md',
  ...props
}: SelectProps<T>) {
  const refWrapper = useRef<HTMLDivElement>(null);
  const refButton = useRef(null);
  const state = useSelectState(props);

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    refButton
  );

  const { buttonProps } = useButton(triggerProps, refButton);

  return (
    <FieldContainer>
      <Label {...labelProps}>{props.label}</Label>
      <HiddenSelect
        state={state}
        triggerRef={refButton}
        label={props.label}
        name={props.name}
      />
      <FieldWrapper css={FieldSizes[size]} tw="min-w-[10rem]" ref={refWrapper}>
        <SelectButton {...buttonProps} ref={refButton}>
          <SelectValue {...valueProps} hasValue={state.selectedItem !== null}>
            {state.selectedItem !== null
              ? state.selectedItem.rendered
              : 'Seleccione...'}
          </SelectValue>
          <SelectorIcon />
        </SelectButton>
      </FieldWrapper>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={refWrapper}
          placement="bottom start"
          width={refWrapper.current?.offsetWidth}
          tw="mt-1"
        >
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </FieldContainer>
  );
}
