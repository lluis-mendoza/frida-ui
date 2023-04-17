import { AnimatePresence } from 'framer-motion';
import { Key, useRef } from 'react';
import {
  AriaSelectOptions,
  HiddenSelect,
  useButton,
  useSelect,
} from 'react-aria';
import { SelectProps as SelectStateProps, useSelectState } from 'react-stately';

import {
  FieldContainer,
  FieldError,
  FieldIconSizes,
  FieldProps,
  FieldSizes,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { ListBox } from '../ListBox';
import { Popover } from '../Popover';
import { SelectButton, SelectorIcon, SelectValue } from './Select.styled';

interface SelectProps<T extends object>
  extends SelectStateProps<T>,
    AriaSelectOptions<T>,
    FieldProps {
  value?: Key | null | undefined;
  onChange?: ((key: Key) => any) | undefined;
}
export default function Select<T extends object>({
  size = 'md',
  variant = 'default',
  errorMessage,
  value,
  onChange,
  block,
  className,
  ..._props
}: SelectProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const props = {
    ..._props,
    selectedKey: value === undefined ? _props.selectedKey : value,
    onSelectionChange: onChange ?? _props.onSelectionChange,
  };
  const state = useSelectState(props);
  const { label, name, isDisabled, isRequired } = props;
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    buttonRef
  );
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const hasValue =
    state.selectedItem !== null && state.selectedItem !== undefined;
  return (
    <FieldContainer block={block} className={className}>
      {label !== undefined ? (
        <Label {...labelProps} isRequired={isRequired}>
          {label}
        </Label>
      ) : null}
      <HiddenSelect
        state={state}
        triggerRef={buttonRef}
        label={label}
        name={name}
      />
      <FieldWrapper
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
        ref={wrapperRef}
      >
        <SelectButton {...buttonProps} ref={buttonRef}>
          <SelectValue {...valueProps} hasValue={hasValue}>
            {hasValue ? state.selectedItem.rendered : 'Seleccione...'}
          </SelectValue>
          <SelectorIcon css={[FieldIconSizes[size]]} />
        </SelectButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
      <AnimatePresence>
        {state.isOpen && (
          <Popover
            state={state}
            triggerRef={wrapperRef}
            placement="bottom start"
            isNonModal
            maxHeight={200}
            width={wrapperRef.current?.offsetWidth}
            tw="mt-1"
          >
            <ListBox {...menuProps} state={state} />
          </Popover>
        )}
      </AnimatePresence>
    </FieldContainer>
  );
}
