import { AnimatePresence } from 'framer-motion';
import { Key, useRef } from 'react';
import { useButton, useComboBox, useFilter } from 'react-aria';
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
  ..._props
}: ComboBoxProps<T>) {
  const props = {
    ..._props,
    selectedKey: value === undefined ? _props.selectedKey : value,
    onSelectionChange: onChange ?? _props.onSelectionChange,
  };

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ..._props, defaultFilter: contains });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { label, isDisabled, isRequired } = props;
  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );
  const { buttonProps } = useButton(triggerProps, buttonRef);
  return (
    <FieldContainer block={block} className={className}>
      {label !== undefined ? (
        <Label {...labelProps} isRequired={isRequired}>
          {label}
        </Label>
      ) : null}
      <FieldWrapper
        css={[FieldVariants[variant], FieldSizes[size]]}
        isDisabled={isDisabled}
        ref={wrapperRef}
      >
        <StyledInput {...inputProps} ref={inputRef} />
        <FieldButton {...buttonProps} ref={buttonRef}>
          <SelectorIcon css={FieldIconSizes[size]} />
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
