import { Key, useRef } from 'react';
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
  FieldError,
  FieldProps,
  FieldSize,
  FieldSizes,
  FieldVariant,
  FieldVariants,
  FieldWrapper,
  Label,
} from '../../styled-components';
import { ListBox } from '../ListBox';
import { Popover } from '../Popover';
import { SelectButton, SelectValue } from './Select.styled';

interface SelectProps<T extends object>
  extends SelectStateProps<T>,
    AriaSelectOptions<T>,
    FieldProps {
  size?: FieldSize;
  variant?: FieldVariant;
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
  const refWrapper = useRef<HTMLDivElement>(null);
  const refButton = useRef(null);
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
    refButton
  );
  const { buttonProps } = useButton(triggerProps, refButton);
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
        triggerRef={refButton}
        label={label}
        name={name}
      />
      <FieldWrapper
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
        tw="min-w-[10rem]"
        ref={refWrapper}
      >
        <SelectButton {...buttonProps} ref={refButton}>
          <SelectValue {...valueProps} hasValue={hasValue}>
            {hasValue ? state.selectedItem.rendered : 'Seleccione...'}
          </SelectValue>
          <SelectorIcon />
        </SelectButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
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
