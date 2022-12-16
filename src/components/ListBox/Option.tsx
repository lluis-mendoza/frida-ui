import type { Node } from '@react-types/shared';
import { useRef } from 'react';
import { useOption } from 'react-aria';
import { ListState } from 'react-stately';

import { StyledOption } from './ListBox.styled';

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}
export default function Option({ item, state }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isDisabled, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );
  const optionState = {
    isSelected,
    isDisabled,
    isFocused,
  };
  return (
    <StyledOption {...optionProps} {...optionState} ref={ref}>
      {item.rendered}
    </StyledOption>
  );
}
