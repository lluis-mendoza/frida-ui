import { ReactNode, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

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
  const { isDisabled } = props;
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <StyledButton
      {...buttonProps}
      isDisabled={isDisabled}
      block={block}
      ref={ref}
      css={[ButtonColors[color], ButtonVariants[variant], ButtonSizes[size]]}
      className={className}
    >
      {(loading ?? false) && (
        <Spinner variant={variant} color={color} size={size} />
      )}
      {prefix}
      {props.children}
      {sufix}
    </StyledButton>
  );
}
