import { useObjectRef } from '@react-aria/utils';
import { forwardRef, ReactNode } from 'react';
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function BaseButton(
  {
    variant = 'contained',
    color = 'primary',
    size = 'md',
    block = false,
    prefix,
    sufix,
    isLoading = false,
    className,
    ...props
  },
  forwardedRef
) {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps } = useButton(props, ref);
  const { isDisabled, children } = props;
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <StyledButton
      {...mergeProps(focusProps, buttonProps)}
      ref={forwardedRef}
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
      {children}
      {sufix}
    </StyledButton>
  );
});

export default Button;
