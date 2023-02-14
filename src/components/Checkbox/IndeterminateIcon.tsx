import { motion } from 'framer-motion';

interface IndeterminateIconProps {
  animate: boolean;
}
const IndeterminateIcon = ({ animate }: IndeterminateIconProps) => {
  const animation = animate
    ? { initial: { strokeDashoffset: 66 }, animate: { strokeDashoffset: 44 } }
    : { strokeDashofset: 44 };
  return (
    <motion.polyline
      points="4 9 14 9"
      fill="none"
      strokeWidth={3}
      strokeDasharray={22}
      {...animation}
    />
  );
};

export default IndeterminateIcon;
