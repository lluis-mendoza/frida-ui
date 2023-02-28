type AlertVariant = 'error' | 'warning' | 'success';

interface AlertProps {
  variant: AlertVariant;
}
function Alert({ variant }: AlertProps) {
  return <div>Alert</div>;
}

export default Alert;
