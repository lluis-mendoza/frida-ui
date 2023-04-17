import { ReactNode, useRef } from 'react';
import {
  AriaToggleButtonProps,
  mergeProps,
  useFocusRing,
  useToggleButton,
} from 'react-aria';
import { ToggleProps, useToggleState } from 'react-stately';

import {
  StyledToggleButton,
  ToggleButtonColors,
  ToggleButtonSizes,
} from './ToggleButton.styled';

export type ToggleButtonSize = 'sm' | 'md' | 'lg';
export type ToggleButtonColor =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

export interface ToggleButtonProps extends AriaToggleButtonProps, ToggleProps {
  size?: ToggleButtonSize;
  color?: ToggleButtonColor;
  block?: boolean;
  prefix?: ReactNode;
  sufix?: ReactNode;
  className?: string;
}

export default function ToggleButton({
  color = 'primary',
  size = 'md',
  block = false,
  prefix,
  sufix,
  className,
  ...props
}: ToggleButtonProps) {
  const ref = useRef(null);
  const state = useToggleState(props);
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);
  const { isDisabled, children } = props;
  const { isSelected } = state;
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <StyledToggleButton
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      isFocusVisible={isFocusVisible}
      isDisabled={isDisabled}
      isPressed={isPressed}
      isSelected={isSelected}
      block={block}
      css={[ToggleButtonColors[color], ToggleButtonSizes[size]]}
      className={className}
    >
      {prefix}
      {children}
      {sufix}
    </StyledToggleButton>
  );
}
