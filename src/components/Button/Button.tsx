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
  ButtonVariants,
  StyledButton,
} from './Button.styled';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary' | 'success' | 'info' | 'warning' | 'error';
type ButtonVariant = 'text' | 'contained' | 'outlined';

interface ButtonProps extends AriaButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  block?: boolean;
  prefix?: ReactNode;
  sufix?: ReactNode;
  loading?: boolean;
  className?: string;
}

export default function Button({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  block,
  prefix,
  sufix,
  loading,
  className,
  ...props
}: ButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <StyledButton
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      isFocusVisible={isFocusVisible}
      block={block}
      css={[ButtonColors[color], ButtonVariants[variant], ButtonSizes[size]]}
      className={className}
    >
      {(loading ?? false) && <Spinner tw="p-[5px]" />}
      {prefix}
      {props.children}
      {sufix}
    </StyledButton>
  );
}
