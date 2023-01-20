import { useEffect, useRef } from 'react';
import { AriaCheckboxProps, useCheckbox, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';

import {
  ChecboxIcon,
  CheckboxContainer,
  CheckboxWrapper,
} from './Checkbox.styled';

interface CheckBoxProps extends AriaCheckboxProps {}

export default function Checkbox(props: CheckBoxProps) {
  const { isIndeterminate } = props;
  const state = useToggleState(props);
  const oldState = useRef(state.isSelected);
  /* useEffect(() => {
    if (oldState.current !== state.isSelected) {
      console.log('change');
      oldState.current = state.isSelected;
    }
  }, [state.isSelected]); */
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const checkboxState = {
    isSelected: state.isSelected,
    isIndeterminate,
  };
  return (
    <CheckboxContainer className="group">
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      <CheckboxWrapper {...checkboxState} aria-hidden="true">
        <ChecboxIcon viewBox="0 0 18 18">
          {isIndeterminate ?? false ? (
            <polyline
              points="4 9 14 9"
              fill="none"
              strokeWidth={3}
              strokeDasharray={22}
              strokeDashoffset={isIndeterminate ?? false ? 44 : 66}
              style={{
                transition: 'all 400ms',
              }}
            />
          ) : (
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
          )}
        </ChecboxIcon>
      </CheckboxWrapper>
      {props.children !== null && <span>{props.children}</span>}
    </CheckboxContainer>
  );
}
