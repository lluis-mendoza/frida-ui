import { ReactNode, useRef } from 'react';
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from 'react-aria';

import Spinner from '../Spinner/Spinner';
import {
  ButtonColors,
  ButtonSizes,
  ButtonSpinnerSizes,
  ButtonVariants,
  StyledButton,
} from './Button.styled';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'success' | 'info' | 'warning' | 'error';
export type ButtonVariant = 'text' | 'contained' | 'outlined';

interface ButtonProps extends AriaButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  block?: boolean;
  prefix?: ReactNode;
  sufix?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  block = false,
  prefix,
  sufix,
  isLoading = false,
  className,
  ...props
}: ButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { isDisabled } = props;
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <StyledButton
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      isFocusVisible={isFocusVisible}
      isDisabled={isDisabled}
      block={block}
      css={[ButtonColors[color], ButtonVariants[variant], ButtonSizes[size]]}
      isLoading={isLoading}
      className={className}
    >
      {isLoading ? (
        <Spinner color="inherit" css={[ButtonSpinnerSizes[size]]} />
      ) : (
        prefix
      )}
      {props.children}
      {sufix}
    </StyledButton>
  );
}
