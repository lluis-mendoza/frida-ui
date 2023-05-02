import { AnimatePresence } from 'framer-motion';
import { Key, useRef, useState } from 'react';
import { useButton, useComboBox, useFilter, useFocusWithin } from 'react-aria';
import { ComboBoxStateOptions, useComboBoxState } from 'react-stately';

import {
  FieldButton,
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
import { SelectorIcon, StyledInput } from './ComboBox.styled';

export interface ComboBoxProps<T extends object>
  extends ComboBoxStateOptions<T>,
    FieldProps {
  items?: Iterable<T>;
  value?: Key | null | undefined;
  onChange?: ((key: Key) => any) | undefined;
}

export default function ComboBox<T extends object>({
  size = 'md',
  variant = 'default',
  errorMessage,
  value,
  onChange,
  block,
  className,
  ...props
}: ComboBoxProps<T>) {
  const _props = {
    ...props,
    placeholder: props.placeholder ?? 'Seleccione...',
    selectedKey: value === undefined ? props.selectedKey : value,
    onSelectionChange: onChange ?? props.onSelectionChange,
  };

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({
    ..._props,
    defaultFilter: contains,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { label, isDisabled, isRequired } = _props;
  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ..._props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const [isFocusWithin, setFocusWithin] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin),
  });
  return (
    <FieldContainer block={block} className={className}>
      {label !== undefined ? (
        <Label {...labelProps} isRequired={isRequired}>
          {label}
        </Label>
      ) : null}
      <FieldWrapper
        {...focusWithinProps}
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
        ref={wrapperRef}
      >
        <StyledInput
          {...inputProps}
          onClick={state.open}
          onBlur={state.close}
          ref={inputRef}
        />
        <FieldButton {...buttonProps} ref={buttonRef}>
          <SelectorIcon
            css={FieldIconSizes[size]}
            isFocusWithin={isFocusWithin}
          />
        </FieldButton>
      </FieldWrapper>
      {errorMessage !== undefined ? (
        <FieldError>{errorMessage}</FieldError>
      ) : null}
      <AnimatePresence>
        {state.isOpen && (
          <Popover
            state={state}
            popoverRef={popoverRef}
            triggerRef={wrapperRef}
            placement="bottom start"
            isNonModal
            maxHeight={200}
            width={wrapperRef.current?.offsetWidth}
            tw="mt-1"
          >
            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
          </Popover>
        )}
      </AnimatePresence>
    </FieldContainer>
  );
}
