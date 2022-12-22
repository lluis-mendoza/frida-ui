import { useRef } from 'react';
import { AriaCheckboxProps, useCheckbox, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';

import {
  ChecboxIcon,
  CheckboxContainer,
  CheckboxWrapper,
} from './Checkbox.styled';

interface CheckBoxProps extends AriaCheckboxProps {}

export default function Checkbox(props: CheckBoxProps) {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);

  const checkboxState = {
    isSelected: state.isSelected,
  };
  return (
    <CheckboxContainer className="group">
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      <CheckboxWrapper {...checkboxState} aria-hidden="true">
        <ChecboxIcon viewBox="0 0 18 18">
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            style={{
              transition: 'all 400ms',
            }}
          />
        </ChecboxIcon>
      </CheckboxWrapper>
      <span>{props.children}</span>
    </CheckboxContainer>
  );
}
