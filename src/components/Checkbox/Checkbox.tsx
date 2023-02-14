import { useRef } from 'react';
import { AriaCheckboxProps, useCheckbox } from 'react-aria';
import { ToggleProps, useToggleState } from 'react-stately';

import {
  ChecboxIcon,
  CheckboxContainer,
  CheckboxInput,
  CheckboxSizes,
  CheckboxWrapper,
} from './Checkbox.styled';
import IndeterminateIcon from './IndeterminateIcon';
import SelectedIcon from './SelectedIcon';

type CheckboxSize = 'sm' | 'md' | 'lg';
interface CheckBoxProps extends AriaCheckboxProps, ToggleProps {
  animate?: boolean;
  size?: CheckboxSize;
}

function Checkbox({ animate = true, size = 'md', ...props }: CheckBoxProps) {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { isSelected } = state;
  const { isIndeterminate } = props;
  const renderIcon = () => {
    if (isIndeterminate ?? false)
      return <IndeterminateIcon animate={animate} />;
    if (isSelected) return <SelectedIcon animate={animate} />;
    return null;
  };
  return (
    <CheckboxContainer css={CheckboxSizes[size]}>
      <CheckboxInput {...inputProps} ref={ref} />
      <CheckboxWrapper
        css={CheckboxSizes[size]}
        isSelected={isSelected}
        isIndeterminate={isIndeterminate}
        aria-hidden={true}
      >
        <ChecboxIcon viewBox="0 0 18 18">{renderIcon()}</ChecboxIcon>
      </CheckboxWrapper>
      {props.children !== undefined && <span>{props.children}</span>}
    </CheckboxContainer>
  );
}

export default Checkbox;
