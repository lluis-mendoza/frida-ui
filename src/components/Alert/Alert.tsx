import {
  AlertContainer,
  AlertIcon,
  AlertIcons,
  AlertVariants,
  CloseButton,
  CloseIcon,
} from './Alert.styled';

type AlertVariant = 'error' | 'warning' | 'success' | 'info';

export interface AlertProps {
  variant: AlertVariant;
  message: string;
  onClose?: () => void;
}
export function Alert({ variant, message, onClose }: AlertProps) {
  return (
    <AlertContainer css={[AlertVariants[variant]]}>
      <AlertIcon>{AlertIcons[variant]}</AlertIcon>
      {message}
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
    </AlertContainer>
  );
}
